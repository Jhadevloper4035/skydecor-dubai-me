import { appendFile, mkdir } from "fs/promises";
import path from "path";

import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_TEXT_LENGTH = 2500;
const DEFAULT_LEADS_FILE = "/tmp/skydecor-contact-leads.jsonl";

const cleanText = (value, maxLength = 240) =>
  String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

const cleanList = (value) =>
  Array.isArray(value)
    ? value.map((item) => cleanText(item, 120)).filter(Boolean).slice(0, 20)
    : [];

const getLeadFilePath = () =>
  process.env.CONTACT_LEADS_FILE || DEFAULT_LEADS_FILE;

const storeLead = async (lead) => {
  const leadFilePath = getLeadFilePath();
  await mkdir(path.dirname(leadFilePath), { recursive: true });
  await appendFile(leadFilePath, `${JSON.stringify(lead)}\n`, "utf8");
};

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid inquiry payload." },
      { status: 400 }
    );
  }

  if (cleanText(payload.website)) {
    return NextResponse.json({
      data: { leadId: "accepted" },
      message: "Inquiry received.",
    });
  }

  const lead = {
    id: crypto.randomUUID(),
    source: "contact-page",
    submittedAt: new Date().toISOString(),
    name: cleanText(payload.name, 120),
    email: cleanText(payload.email, 180).toLowerCase(),
    phone: cleanText(payload.phone, 40),
    company: cleanText(payload.company, 160),
    city: cleanText(payload.city, 120),
    inquiryType: cleanText(payload.inquiryType, 120),
    productLineup: cleanList(payload.productLineup),
    message: cleanText(payload.message, MAX_TEXT_LENGTH),
    metadata: {
      userAgent: cleanText(request.headers.get("user-agent"), 300),
      referrer: cleanText(request.headers.get("referer"), 300),
      ip:
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "",
    },
  };

  if (!lead.name || !lead.email || !lead.phone || !lead.message) {
    return NextResponse.json(
      { message: "Please fill all required fields." },
      { status: 400 }
    );
  }

  try {
    await storeLead(lead);
  } catch (error) {
    console.error("Unable to store contact lead:", error);
    return NextResponse.json(
      { message: "Unable to submit your inquiry right now." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      data: { leadId: lead.id },
      message: "Inquiry received.",
    },
    { status: 201 }
  );
}

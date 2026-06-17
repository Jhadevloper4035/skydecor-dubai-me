import { appendFile, mkdir } from "fs/promises";
import path from "path";

import { NextResponse } from "next/server";

export const runtime = "nodejs";

const DEFAULT_PRODUCT_INQUIRIES_FILE = "/tmp/skydecor-product-inquiries.jsonl";
const MAX_TEXT_LENGTH = 2500;

const cleanText = (value, maxLength = 240) =>
  String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

const getProductInquiriesFilePath = () =>
  process.env.PRODUCT_INQUIRIES_FILE || DEFAULT_PRODUCT_INQUIRIES_FILE;

const storeProductInquiry = async (productInquiry) => {
  const filePath = getProductInquiriesFilePath();
  await mkdir(path.dirname(filePath), { recursive: true });
  await appendFile(filePath, `${JSON.stringify(productInquiry)}\n`, "utf8");
};

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid product inquiry payload." },
      { status: 400 }
    );
  }

  if (cleanText(payload.website)) {
    return NextResponse.json({
      data: { productInquiry: { id: "accepted" } },
      message: "Product inquiry received.",
    });
  }

  const productInquiry = {
    id: crypto.randomUUID(),
    source: "product-detail",
    submittedAt: new Date().toISOString(),
    productCode: cleanText(payload.productCode, 120).toUpperCase(),
    productName: cleanText(payload.productName, 180),
    name: cleanText(payload.name, 120),
    email: cleanText(payload.email, 180).toLowerCase(),
    phone: cleanText(payload.phone, 40),
    companyName: cleanText(payload.companyName, 160),
    quantity: Math.max(1, Number(payload.quantity) || 1),
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

  if (
    !productInquiry.productCode ||
    !productInquiry.name ||
    !productInquiry.email ||
    !productInquiry.phone
  ) {
    return NextResponse.json(
      { message: "Please fill all required fields." },
      { status: 400 }
    );
  }

  try {
    await storeProductInquiry(productInquiry);
  } catch (error) {
    console.error("Unable to store product inquiry:", error);
    return NextResponse.json(
      { message: "Unable to submit your product inquiry right now." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      data: { productInquiry },
      message: "Product inquiry received.",
    },
    { status: 201 }
  );
}

import { NextResponse } from "next/server";

export const runtime = "nodejs";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://127.0.0.1:8001/api/v1";

const cleanEmail = (value) => String(value || "").trim().toLowerCase();

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid newsletter signup." },
      { status: 400 }
    );
  }

  const email = cleanEmail(payload.email);

  if (!email) {
    return NextResponse.json(
      { message: "Please enter your email address." },
      { status: 400 }
    );
  }

  const response = await fetch(`${API_BASE_URL}/newsletter-subscribers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": request.headers.get("user-agent") || "Skydecor frontend",
    },
    body: JSON.stringify({ email, source: "footer" }),
  });

  const data = await response.json().catch(() => ({}));

  return NextResponse.json(
    {
      data: data.data,
      message: response.ok
        ? "Thank you for subscribing."
        : data.message || "Unable to subscribe right now.",
    },
    { status: response.status }
  );
}

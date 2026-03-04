import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source, platforms } = body;

    // ── Validation ──────────────────────────────────────────────────
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }
    if (!source || typeof source !== "string") {
      return NextResponse.json(
        { error: "Please tell us how you heard about us" },
        { status: 400 }
      );
    }
    if (!Array.isArray(platforms) || platforms.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one platform" },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // ── Airtable ─────────────────────────────────────────────────────
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = encodeURIComponent("Waitlist Signups");

    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableName}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Email: cleanEmail,
            Source: source,
            Platforms: platforms.join(", "),
            "Created At": new Date().toISOString(),
          },
        }),
      }
    );

    if (!airtableRes.ok) {
      const error = await airtableRes.json();
      throw new Error(error.error?.message ?? "Airtable error");
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[Waitlist error]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";

export interface WaitlistEntry {
  email: string;
  source: string;
  platforms: string[];
  createdAt: string;
}

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

    const entry: WaitlistEntry = {
      email: email.toLowerCase().trim(),
      source,
      platforms,
      createdAt: new Date().toISOString(),
    };

    // ── Database integration (TODO) ─────────────────────────────────
    //
    // Supabase example:
    //
    //   import { createClient } from "@supabase/supabase-js";
    //   const supabase = createClient(
    //     process.env.NEXT_PUBLIC_SUPABASE_URL!,
    //     process.env.SUPABASE_SERVICE_ROLE_KEY!
    //   );
    //   const { error } = await supabase.from("waitlist").insert([entry]);
    //   if (error) throw error;
    //
    // Until then, log entry to server console:
    console.log("[Waitlist signup]", entry);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[Waitlist error]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

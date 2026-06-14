// app/api/inquiries/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createInquiry, getAllInquiries } from "@/lib/inquiryService";
import { sendInquiryNotification } from "@/lib/mailer";
import { isUnderCooldown, recordSubmission, getRemainingSecs } from "@/lib/cooldownService";

// Validation schema (replaces @Valid + DTO annotations)
const InquirySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name is too long" }),

  email: z.string().email({ message: "Invalid email address" }),

  phone: z.string().optional(),

  service: z.string().optional(),

  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

// POST /api/inquiries
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate
    const result = InquirySchema.safeParse(body);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      return NextResponse.json({ errors: fieldErrors }, { status: 400 });
    }

    // Check cooldown — prevent spam from same email+phone combo
    const { email, phone = "" } = result.data;
    if (isUnderCooldown(email, phone)) {
      const remainingSecs = getRemainingSecs(email, phone);
      const mins = Math.ceil(remainingSecs / 60);
      return NextResponse.json(
        {
          message: `Please wait ${mins} minute${mins > 1 ? "s" : ""} before submitting another inquiry.`,
          retryAfter: remainingSecs,
        },
        { status: 429, headers: { "Retry-After": remainingSecs.toString() } },
      );
    }

    // Save
    const inquiry = createInquiry(result.data);

    // Record submission time for cooldown
    recordSubmission(email, phone);

    // Fire-and-forget email notification — does not block the response
    void sendInquiryNotification(inquiry);

    return NextResponse.json(
      { message: "Inquiry submitted successfully", data: inquiry },
      { status: 201 },
    );
  } catch (err) {
    console.error("[POST /api/inquiries]", err);
    return NextResponse.json(
      { message: "Internal server error. Please try again." },
      { status: 500 },
    );
  }
}

// GET /api/inquiries  (view all submissions)
export async function GET() {
  try {
    const inquiries = getAllInquiries();
    return NextResponse.json({ data: inquiries, total: inquiries.length });
  } catch (err) {
    console.error("[GET /api/inquiries]", err);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 },
    );
  }
}

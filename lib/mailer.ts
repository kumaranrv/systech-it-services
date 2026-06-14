// lib/mailer.ts
// Sends email notifications via Gmail SMTP using nodemailer.
// Requires SMTP_USER and SMTP_PASS (Gmail App Password) in environment variables.

import nodemailer from "nodemailer";
import type { InquiryRecord } from "./db";

function createTransport() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error(
      "SMTP_USER and SMTP_PASS environment variables must be set to send emails.",
    );
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

function buildEmailHtml(inquiry: InquiryRecord): string {
  const service = inquiry.service || "—";
  const phone = inquiry.phone || "—";
  const date = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(inquiry.createdAt));

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#1d4ed8;padding:24px 32px;">
              <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;">
                🛠 Systech IT Services
              </p>
              <p style="margin:4px 0 0;font-size:13px;color:#bfdbfe;">New inquiry received</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">

                <tr>
                  <td style="padding-bottom:16px;border-bottom:1px solid #f1f5f9;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;">Full Name</p>
                    <p style="margin:0;font-size:15px;color:#0f172a;font-weight:600;">${escapeHtml(inquiry.name)}</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid #f1f5f9;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;">Email</p>
                    <p style="margin:0;font-size:15px;color:#2563eb;">
                      <a href="mailto:${escapeHtml(inquiry.email)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(inquiry.email)}</a>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid #f1f5f9;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;">Phone</p>
                    <p style="margin:0;font-size:15px;color:#0f172a;">${escapeHtml(phone)}</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid #f1f5f9;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;">Service Requested</p>
                    <p style="margin:0;font-size:15px;color:#0f172a;">${escapeHtml(service)}</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:16px 0 0;">
                    <p style="margin:0 0 8px;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;">Message</p>
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;">
                      <p style="margin:0;font-size:14px;color:#334155;line-height:1.6;white-space:pre-wrap;">${escapeHtml(inquiry.message)}</p>
                    </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0;">
              <p style="margin:0;font-size:12px;color:#94a3b8;">
                Received on ${date} &nbsp;·&nbsp; ID: ${inquiry.id}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();
}

function buildEmailText(inquiry: InquiryRecord): string {
  return [
    "New Inquiry — Systech IT Services",
    "=".repeat(40),
    `Name:    ${inquiry.name}`,
    `Email:   ${inquiry.email}`,
    `Phone:   ${inquiry.phone || "—"}`,
    `Service: ${inquiry.service || "—"}`,
    "",
    "Message:",
    inquiry.message,
    "",
    `Received: ${inquiry.createdAt}`,
    `ID: ${inquiry.id}`,
  ].join("\n");
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Send a new-inquiry notification email.
 * Failures are logged but do NOT throw — the inquiry is already saved, so
 * a transient SMTP error should not return a 500 to the user.
 */
export async function sendInquiryNotification(
  inquiry: InquiryRecord,
): Promise<void> {
  try {
    const transporter = createTransport();
    const recipient = process.env.NOTIFY_EMAIL ?? "kumaransda16@gmail.com";

    await transporter.sendMail({
      from: `"Systech IT Services" <${process.env.SMTP_USER}>`,
      to: recipient,
      replyTo: inquiry.email,
      subject: `New Inquiry from ${inquiry.name}${inquiry.service ? ` — ${inquiry.service}` : ""}`,
      text: buildEmailText(inquiry),
      html: buildEmailHtml(inquiry),
    });

    console.info(
      `[mailer] Inquiry notification sent to ${recipient} (id: ${inquiry.id})`,
    );
  } catch (err) {
    console.error("[mailer] Failed to send inquiry notification:", err);
  }
}

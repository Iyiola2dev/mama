import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    await resend.emails.send({
      from: "Pearl's Answer <onboarding@resend.dev>",
      to: "iyioladan11@gmail.com",
      subject: "💖 She said YES!!!",
      html: `
        <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 2rem; background: #fff5e6; border-radius: 12px;">
          <h1 style="color: #8B0037; font-size: 2rem; margin-bottom: 0.5rem;">She said YES! 🎉</h1>
          <p style="color: #3d0020; font-size: 1.1rem; line-height: 1.7;">
            Pearl clicked <strong>Yes! 💖</strong> on your girlfriend proposal page.
          </p>
          <p style="color: #3d0020; font-size: 1.1rem; line-height: 1.7;">
            You're officially the luckiest person alive. Go celebrate! 🥂
          </p>
          <hr style="border: 1px solid #FFB6C1; margin: 1.5rem 0;" />
          <p style="color: #999; font-size: 0.8rem;">Sent from your "For Pearl 💕" website.</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Email send failed:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

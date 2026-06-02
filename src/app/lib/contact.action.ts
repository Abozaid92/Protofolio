"use server";

import { z } from "zod";
import { Resend } from "resend";

// 1. تهيئة Resend بمفتاح البيئة السري
const resend = new Resend(process.env.RESEND_API_KEY);

// 2. تحديد نوع البيانات المتوقعة للـ State عشان الـ Type Safety
export type FormState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
  };
} | null;

// 3. عمل Schema صارمة للتحقق من البيانات بالـ Zod
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export async function sendContactMessage(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  // 🔥 فخ الـ Honeypot: لو البوت ملا الحقل المخفي ده، هنوهمه إن الإرسال نجح بس مش هنعمل حاجة
  const botTrap = formData.get("website_hp");
  if (botTrap && botTrap.toString().length > 0) {
    return {
      success: true,
      message: "Your message has been deployed successfully. Speak soon!",
    };
  }

  // 4. استخراج البيانات وعمل Validation لها
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  // إذا كانت البيانات غير صالحة، نرجع الأخطاء فوراً للكلاينت
  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, subject, message } = validatedFields.data;

  try {
    // 5. إرسال الإيميل عبر الـ API الخاص بـ Resend
    const { data, error } = await resend.emails.send({
      // الميزود الافتراضي لو لسه مبربطش دومين خاص بيك
      from: "Portfolio Contact <onboarding@resend.dev>",

      // إيميلك الشخصي اللي عاوزه يستقبل الرسائل الحقيقية
      to: "ebrahim.abozaid567@gmail.com'",

      replyTo: email,

      subject: `⚡ [Portfolio Lead] - ${subject}`,

      // تصميم الإيميل اللي هيوصلك في الـ Inbox بشكل شيك جداً
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 24px; background-color: #0b0f19; color: #f3f4f6; max-width: 600px; margin: 0 auto; border-radius: 12px; border: 1px solid #1f2937;">
          <h2 style="color: #10b981; font-size: 20px; font-weight: 700; margin-top: 0; border-bottom: 1px solid #1f2937; padding-bottom: 12px;">
            🚨 New Incoming Message
          </h2>
          
          <div style="margin-bottom: 16px;">
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #9ca3af; font-family: monospace;">SENDER NAME</p>
            <p style="margin: 0; font-size: 15px; font-weight: 600; color: #ffffff;">${name}</p>
          </div>
          
          <div style="margin-bottom: 16px;">
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #9ca3af; font-family: monospace;">SENDER EMAIL</p>
            <p style="margin: 0; font-size: 15px;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></p>
          </div>
          
          <div style="margin-bottom: 24px;">
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #9ca3af; font-family: monospace;">SUBJECT</p>
            <p style="margin: 0; font-size: 15px; color: #e5e7eb; font-weight: 500;">${subject}</p>
          </div>
          
          <div>
            <p style="margin: 0 0 8px 0; font-size: 12px; color: #9ca3af; font-family: monospace;">MESSAGE CONTENT</p>
            <div style="background-color: #030712; border: 1px solid #1f2937; padding: 16px; border-radius: 8px; color: #f3f4f6; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>
        </div>
      `,
    });

    // لو حصلت مشكلة من ناحية سيرفر Resend
    if (error) {
      console.error("Resend Core Error:", error);
      return {
        success: false,
        message: "Failed to dispatch email via Resend Provider.",
      };
    }

    // النجاح التام!
    return {
      success: true,
      message: "Your message has been deployed successfully. Speak soon!",
    };
  } catch (err) {
    console.error("Critical Runtime Error:", err);
    return {
      success: false,
      message: "An internal server error occurred. Please try again later.",
    };
  }
}

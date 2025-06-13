
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationEmailRequest {
  email: string;
  confirmationUrl: string;
  name?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, confirmationUrl, name }: ConfirmationEmailRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "Aasha AI Seva <onboarding@resend.dev>",
      to: [email],
      subject: "Confirm your email - Aasha AI Seva",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin-bottom: 10px;">Aasha AI Seva</h1>
            <p style="color: #6b7280; margin: 0;">Your AI Health Companion</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Welcome${name ? ` ${name}` : ''}!</h2>
            <p style="color: #4b5563; margin-bottom: 20px;">
              Thank you for signing up for Aasha AI Seva. To complete your registration and start using our AI-powered health services, please confirm your email address.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${confirmationUrl}" 
                 style="background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Confirm Your Email
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
              If the button doesn't work, you can copy and paste this link into your browser:
              <br>
              <a href="${confirmationUrl}" style="color: #2563eb; word-break: break-all;">${confirmationUrl}</a>
            </p>
          </div>
          
          <div style="background: #ecfdf5; border: 1px solid #10b981; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <h3 style="color: #065f46; margin-bottom: 10px;">🏥 What you can do with Aasha AI Seva:</h3>
            <ul style="color: #047857; margin: 0; padding-left: 20px;">
              <li>Get instant AI health consultations</li>
              <li>Manage your medications and set reminders</li>
              <li>Book doctor appointments</li>
              <li>Access emergency services</li>
              <li>Track your health records securely</li>
            </ul>
          </div>
          
          <div style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px;">
            <p>If you didn't create an account, you can safely ignore this email.</p>
            <p>© 2024 Aasha AI Seva. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    console.log("Confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-confirmation-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

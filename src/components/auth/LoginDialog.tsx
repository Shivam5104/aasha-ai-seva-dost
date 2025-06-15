import React, { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { useAuth } from "./AuthProvider";
import { toast } from "sonner";
import { EmailSentPanel } from "./EmailSentPanel";
import { LoginTabs } from "./LoginTabs";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const { signIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [resending, setResending] = useState(false);
  const [lastEmail, setLastEmail] = useState<string>("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resendConfirmationEmail = async () => {
    setResending(true);
    try {
      const { error } = await signUp(lastEmail, formData.password, {
        full_name: formData.fullName,
        phone: formData.phone,
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      });
      if (error) {
        toast.error("Could not resend email: " + error.message);
      } else {
        toast.success("Confirmation email resent to " + lastEmail);
      }
    } catch (err: any) {
      toast.error("Resend failed. Please try again later.");
      console.error("Resend confirmation error:", err);
    } finally {
      setResending(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signIn(formData.email, formData.password);

      if (error) {
        if (error.message.toLowerCase().includes("email not confirmed")) {
          toast.error(
            "Please check your email and click the confirmation link before signing in."
          );
        } else {
          toast.error(error.message || "Sign in failed");
        }
      } else {
        toast.success("Welcome back!");
        onOpenChange(false);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Sign-in error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signUp(formData.email, formData.password, {
        full_name: formData.fullName,
        phone: formData.phone,
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      });
      if (error) {
        toast.error(error.message || "Could not create account");
        setEmailSent(false);
      } else {
        setEmailSent(true);
        setLastEmail(formData.email);
        toast.success(
          "Account created! Please check your email to confirm your account."
        );
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Signup error:", error);
      setEmailSent(false);
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <EmailSentPanel
          open={open}
          onOpenChange={onOpenChange}
          lastEmail={lastEmail}
          resending={resending}
          resendConfirmationEmail={resendConfirmationEmail}
          setEmailSent={setEmailSent}
        />
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <LoginTabs
        formData={formData}
        handleInputChange={handleInputChange}
        handleSignIn={handleSignIn}
        handleSignUp={handleSignUp}
        loading={loading}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        resending={resending}
        resendConfirmationEmail={resendConfirmationEmail}
      />
    </Dialog>
  );
}

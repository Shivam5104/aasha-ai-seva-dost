
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, CheckCircle } from "lucide-react";

interface EmailSentPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lastEmail: string;
  resending: boolean;
  resendConfirmationEmail: () => void;
  setEmailSent: (sent: boolean) => void;
}

export function EmailSentPanel({
  open,
  onOpenChange,
  lastEmail,
  resending,
  resendConfirmationEmail,
  setEmailSent,
}: EmailSentPanelProps) {
  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle className="text-center text-2xl font-bold text-blue-600 dark:text-blue-400">
          Check Your Email
        </DialogTitle>
      </DialogHeader>
      <div className="text-center py-8">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full">
            <Mail className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Confirmation Email Sent!</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We've sent a confirmation email to{" "}
          <strong className="text-blue-700 dark:text-blue-300">{lastEmail}</strong>. Please check your inbox
          and click the confirmation link to activate your account.
        </p>
        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-center mb-2">
            <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-300 mr-2" />
            <span className="font-medium text-blue-800 dark:text-blue-200">Next Steps:</span>
          </div>
          <ol className="text-sm text-blue-700 dark:text-blue-300 text-left space-y-1">
            <li>1. Check your email inbox (and spam folder)</li>
            <li>2. Click the confirmation link in the email</li>
            <li>3. Return here to sign in with your credentials</li>
          </ol>
        </div>
        <Button
          onClick={() => {
            setEmailSent(false);
            onOpenChange(false);
          }}
          className="w-full mb-3"
        >
          Got it, I'll check my email
        </Button>
        <Button
          variant="outline"
          disabled={resending}
          onClick={resendConfirmationEmail}
          className="w-full"
        >
          {resending ? "Resending..." : "Resend Confirmation Email"}
        </Button>
      </div>
    </DialogContent>
  );
}

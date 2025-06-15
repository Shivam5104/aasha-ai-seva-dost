
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface SignInFormProps {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
  handleSignIn: (e: React.FormEvent) => void;
  loading: boolean;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  resending: boolean;
  resendConfirmationEmail: () => void;
}
export function SignInForm({
  formData,
  handleInputChange,
  handleSignIn,
  loading,
  showPassword,
  setShowPassword,
  resending,
  resendConfirmationEmail
}: SignInFormProps) {
  return (
    <>
      <form onSubmit={handleSignIn} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signin-email" className="text-foreground">Email</Label>
          <Input
            id="signin-email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
            className="text-foreground"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signin-password" className="text-foreground">Password</Label>
          <div className="relative">
            <Input
              id="signin-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              required
              className="text-foreground pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      <div className="text-sm text-center text-gray-500 dark:text-gray-300 mt-3">
        Didn't get a confirmation email?{" "}
        <Button
          variant="link"
          size="sm"
          className="inline p-0 h-auto align-baseline"
          disabled={resending}
          onClick={resendConfirmationEmail}
        >
          Resend Email
        </Button>
      </div>
    </>
  );
}

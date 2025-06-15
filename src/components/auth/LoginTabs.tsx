
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";

interface LoginTabsProps {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
  handleSignIn: (e: React.FormEvent) => void;
  handleSignUp: (e: React.FormEvent) => void;
  loading: boolean;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  resending: boolean;
  resendConfirmationEmail: () => void;
}
export function LoginTabs(props: LoginTabsProps) {
  return (
    <Tabs defaultValue="signin" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <SignInForm
          formData={props.formData}
          handleInputChange={props.handleInputChange}
          handleSignIn={props.handleSignIn}
          loading={props.loading}
          showPassword={props.showPassword}
          setShowPassword={props.setShowPassword}
          resending={props.resending}
          resendConfirmationEmail={props.resendConfirmationEmail}
        />
      </TabsContent>
      <TabsContent value="signup">
        <SignUpForm
          formData={props.formData}
          handleInputChange={props.handleInputChange}
          handleSignUp={props.handleSignUp}
          loading={props.loading}
          showPassword={props.showPassword}
          setShowPassword={props.setShowPassword}
        />
      </TabsContent>
    </Tabs>
  );
}

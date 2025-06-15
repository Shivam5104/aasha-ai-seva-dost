
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { User, Phone, Calendar, MapPin, Eye, EyeOff } from "lucide-react";

interface SignUpFormProps {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
  handleSignUp: (e: React.FormEvent) => void;
  loading: boolean;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}
export function SignUpForm({
  formData,
  handleInputChange,
  handleSignUp,
  loading,
  showPassword,
  setShowPassword
}: SignUpFormProps) {
  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="signup-name" className="text-foreground">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="signup-name"
              placeholder="Full Name"
              className="pl-10 text-foreground"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-phone" className="text-foreground">Phone</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="signup-phone"
              placeholder="Phone Number"
              className="pl-10 text-foreground"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-email" className="text-foreground">Email</Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          required
          className="text-foreground"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password" className="text-foreground">Password</Label>
        <div className="relative">
          <Input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
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
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="signup-dob" className="text-foreground">Date of Birth</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="signup-dob"
              type="date"
              className="pl-10 text-foreground"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-gender" className="text-foreground">Gender</Label>
          <select
            id="signup-gender"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={formData.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="signup-city" className="text-foreground">City</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="signup-city"
              placeholder="City"
              className="pl-10 text-foreground"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-state" className="text-foreground">State</Label>
          <Input
            id="signup-state"
            placeholder="State"
            value={formData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            className="text-foreground"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-pincode" className="text-foreground">Pincode</Label>
          <Input
            id="signup-pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={(e) => handleInputChange("pincode", e.target.value)}
            className="text-foreground"
          />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}

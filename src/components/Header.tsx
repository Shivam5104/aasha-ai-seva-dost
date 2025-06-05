
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, Bell, Menu } from 'lucide-react';
import { useAuth } from './auth/AuthProvider';
import { LoginDialog } from './auth/LoginDialog';
import { UserProfile } from './auth/UserProfile';
import LanguageSelector from './LanguageSelector';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Header() {
  const { user } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">
                Aasha AI Seva
              </h1>
              <p className="text-xs text-gray-500">Your Health Companion</p>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <LanguageSelector 
              selectedLanguage="english" 
              onLanguageChange={(lang) => console.log('Language changed:', lang)} 
            />
            
            {user ? (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                
                <Popover open={showUserProfile} onOpenChange={setShowUserProfile}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0">
                    <UserProfile onClose={() => setShowUserProfile(false)} />
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <Button onClick={() => setShowLoginDialog(true)}>
                Sign In
              </Button>
            )}
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <LoginDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog} 
      />
    </header>
  );
}

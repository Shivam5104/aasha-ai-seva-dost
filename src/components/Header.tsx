
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, Bell, Menu } from 'lucide-react';
import { useAuth } from './auth/AuthProvider';
import { useLanguage } from '@/contexts/LanguageContext';
import { LoginDialog } from './auth/LoginDialog';
import { UserProfile } from './auth/UserProfile';
import LanguageSelector from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Header() {
  const { user } = useAuth();
  const { language, setLanguage, translations } = useLanguage();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-700 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Responsive header layout */}
        <div className="flex flex-col md:flex-row justify-between items-center md:h-16 gap-2 md:gap-0 py-3 md:py-0">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Aasha AI Seva</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {translations.health_companion}
            </p>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3 mt-2 md:mt-0 w-full md:w-auto justify-end">
            <div className="flex items-center space-x-2">
              <LanguageSelector 
                selectedLanguage={language} 
                onLanguageChange={setLanguage} 
              />
              <ThemeToggle />
            </div>

            {user ? (
              <div className="flex items-center space-x-1">
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
              <Button className="ml-2" onClick={() => setShowLoginDialog(true)}>
                {translations.sign_in}
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

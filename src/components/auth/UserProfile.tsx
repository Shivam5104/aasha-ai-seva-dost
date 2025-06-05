
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User, Heart, Calendar, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';

interface UserProfileProps {
  onClose: () => void;
}

interface Profile {
  full_name: string | null;
  phone: string | null;
  date_of_birth: string | null;
  gender: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  medical_conditions: string[] | null;
  allergies: string[] | null;
  current_medications: string[] | null;
}

export function UserProfile({ onClose }: UserProfileProps) {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Signed out successfully');
      onClose();
    }
  };

  if (loading) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex items-center justify-center p-6">
          <div className="text-center">Loading profile...</div>
        </CardContent>
      </Card>
    );
  }

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
    : user?.email?.[0].toUpperCase() || 'U';

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-4">
        <div className="flex flex-col items-center space-y-2">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">
              {profile?.full_name || 'Welcome!'}
            </CardTitle>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {profile?.phone && (
          <div className="flex items-center space-x-3">
            <Phone className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{profile.phone}</span>
          </div>
        )}

        {profile?.city && (
          <div className="flex items-center space-x-3">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-sm">
              {profile.city}{profile.state && `, ${profile.state}`}
            </span>
          </div>
        )}

        {profile?.date_of_birth && (
          <div className="flex items-center space-x-3">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm">
              Born: {new Date(profile.date_of_birth).toLocaleDateString()}
            </span>
          </div>
        )}

        {profile?.medical_conditions && profile.medical_conditions.length > 0 && (
          <div className="flex items-start space-x-3">
            <Heart className="h-4 w-4 text-gray-500 mt-0.5" />
            <div className="text-sm">
              <div className="font-medium">Medical Conditions:</div>
              <div className="text-gray-600">{profile.medical_conditions.join(', ')}</div>
            </div>
          </div>
        )}

        <div className="pt-4 space-y-2">
          <Button variant="outline" className="w-full" onClick={onClose}>
            <User className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
          
          <Button variant="outline" className="w-full text-red-600 hover:text-red-700" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

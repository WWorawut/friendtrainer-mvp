import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

export const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-[400px] space-y-8">
          <div className="space-y-2 text-left">
            <h1 className="font-heading text-[32px] leading-tight">
              โค้ชส่วนตัว
            </h1>
            <div className="space-y-1">
              <p className="text-lg font-heading">
                ที่พร้อมอยู่ไปกับคุณ
              </p>
              <p className="text-lg font-heading">
                ทุกช่วงเวลา
              </p>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm text-gray-500 mb-4 font-heading">
              มารู้จักโค้ชของคุณด้วย
            </p>
            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              variant="outline"
              className="w-full h-12 bg-white hover:bg-gray-50 border border-gray-300 rounded-full shadow-sm"
            >
              <img 
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                alt="" 
                className="w-5 h-5 mr-2"
              />
              Continue with Google
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
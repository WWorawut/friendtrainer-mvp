import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LoginScreen } from '@/components/login-screen';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js'; // Import Session type

// Import Onboarding Step components
import { Step1 } from '@/components/onboarding/step1'; 
import { Step2 } from '@/components/onboarding/step2'; // <--- Import Component ใหม่

// Placeholder components for other screens
const ChatScreen = () => <div className="p-8 font-heading">Chat Screen (Placeholder)</div>;

// Component that checks auth and profile status and navigates
const AuthNavigator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // State to track if initial auth/profile check is loading
  const [session, setSession] = useState<Session | null>(null); // State to hold the user session
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null); // State to track onboarding status

  useEffect(() => {
    // --- Development Bypass Logic ---
    // Check if the application is running in development mode
    if (import.meta.env.DEV) {
      console.log('Running in Development mode. Bypassing real auth check for testing Onboarding.');
      // Simulate a logged-in state for a new user (not onboarded)
      setSession({} as Session); // Simulate a non-null session object
      setIsOnboarded(false); // Simulate user is NOT onboarded
      setLoading(false); // Loading is complete
      return; // Exit this effect early in development
    }
    // --- End Development Bypass Logic ---


    // --- Production Auth Logic (This runs ONLY in Production or when bypass is off) ---
    console.log('Running in Production mode or bypass is off. Using real auth check.');
    // This effect runs once on mount to set up the real auth state change listener

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, currentSession) => {
        setSession(currentSession); // Always update the session state

        if (currentSession) {
          // User is authenticated, now check onboarding status
          try {
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('is_onboarded')
              .eq('id', currentSession.user.id)
              .single();

            if (error && error.code !== 'PGRST116') {
                 console.error('Error fetching profile:', error);
                 setIsOnboarded(false); // Assume user needs onboarding on error
             } else if (!profile) {
                 setIsOnboarded(false); // Assume user needs onboarding
             }
            else {
              setIsOnboarded(profile.is_onboarded); // Set onboarding status from profile data
            }
          } catch (error) {
            console.error('Unexpected error checking user profile:', error);
            setIsOnboarded(false); // Assume user needs onboarding on error
          } finally {
             setLoading(false);
          }
        } else {
          // No session, user is logged out
          setIsOnboarded(null); // Reset onboarding status if logged out
          setLoading(false); // Authentication check is complete
        }
      }
    );

    // Cleanup subscription when the component unmounts
    return () => {
      subscription.unsubscribe();
    };
    // --- End Production Auth Logic ---

  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // This effect handles the actual navigation based on the state changes (session, isOnboarded, loading)
  useEffect(() => {
    // Only attempt to navigate after the initial loading check is complete
    if (!loading) {
      if (session) {
        // User is authenticated (either real session or simulated in dev)
        // Navigate based on onboarding status once it's determined
        if (isOnboarded === false) {
          // User is authenticated but not onboarded (real or simulated)
          // Check current path to avoid unnecessary navigation if already on an onboarding step
          if (!window.location.pathname.startsWith('/onboarding/')) {
             navigate('/onboarding/step1'); // Navigate to the first onboarding step
          }
        } else if (isOnboarded === true) {
          // User is authenticated and onboarded (real)
          navigate('/chat');
        }
      } else {
        // User is not authenticated (real)
        navigate('/login');
      }
    }
  }, [loading, session, isOnboarded, navigate]); // Dependencies ensure this effect reacts to changes in these states

  // Optionally, render a loading indicator while determining the initial route
  if (loading) {
    return <div className="p-8 font-heading">Loading application...</div>;
  }

  // This component primarily manages state and navigation.
  // It doesn't render the main UI content itself, that's done by <Routes>.
  return null;
};


function App() {
  // App component sets up the BrowserRouter and Routes
  return (
    <BrowserRouter>
      {/* Render AuthNavigator inside BrowserRouter so it can use useNavigate */}
      {/* AuthNavigator will handle the initial redirection based on auth state and onboarding */}
      <AuthNavigator />

      <Routes>
        {/* Public route for login */}
        <Route path="/login" element={<LoginScreen />} />

        {/* Onboarding Step Routes */}
        <Route path="/onboarding/step1" element={<Step1 />} /> {/* Assuming NameScreen is step 1 */}
        <Route path="/onboarding/step-2" element={<Step2 />} /> {/* <--- เพิ่ม Route ใหม่ */}
        {/* Add more onboarding steps here */}


        {/* Protected route for Chat */}
        <Route path="/chat" element={<ChatScreen />} />

        {/* Optional: Redirect any unknown paths to login or handle 404 */}
         <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

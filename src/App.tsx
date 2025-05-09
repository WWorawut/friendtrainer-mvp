    import { useEffect, useState } from 'react';
    import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
    import { LoginScreen } from '@/components/login-screen';
    import { supabase } from '@/lib/supabase';
    import { Session } from '@supabase/supabase-js'; // Import Session type

    // Import Onboarding Step components
    import { Step1 } from '@/components/onboarding/step1';
    import { Step2 } from '@/components/onboarding/step2';
    import { Step3 } from '@/components/onboarding/step3'; // Corrected Import for Step 3

    // Placeholder components for other screens
    const ChatScreen = () => {
      console.log('Rendering ChatScreen Placeholder'); // Log when ChatScreen is rendered
      return <div className="p-8 font-heading">Chat Screen (Placeholder)</div>;
    };

    // Component that checks auth and profile status and navigates
    const AuthNavigator = () => {
      console.log('AuthNavigator component starts rendering'); // Log when AuthNavigator renders
      const navigate = useNavigate();
      const [loading, setLoading] = useState(true);
      const [session, setSession] = useState<Session | null>(null);
      const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);

      useEffect(() => {
        console.log('AuthNavigator useEffect (listener setup) runs'); // Log when the first useEffect runs

        // --- Development Bypass Logic ---
        if (import.meta.env.DEV) {
          console.log('Running in Development mode. Bypassing real auth check for testing Onboarding.');
          setSession({} as Session);
          setIsOnboarded(false);
          setLoading(false);
          console.log('AuthNavigator Dev Bypass finished. State: session=', !!session, ' isOnboarded=', isOnboarded, ' loading=', false); // Log final state in bypass
          return;
        }
        // --- End Development Bypass Logic ---

        // --- Production Auth Logic ---
        console.log('Running in Production mode or bypass is off. Using real auth check.');
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (_event, currentSession) => {
            console.log('AuthNavigator onAuthStateChange triggered. Event:', _event, ' Session:', !!currentSession); // Log when auth state changes
            setSession(currentSession);

            if (currentSession) {
              console.log('AuthNavigator: User is authenticated. Checking profile...'); // Log if authenticated
              try {
                const { data: profile, error } = await supabase
                  .from('profiles')
                  .select('is_onboarded')
                  .eq('id', currentSession.user.id)
                  .single();

                if (error && error.code !== 'PGRST116') {
                     console.error('AuthNavigator: Error fetching profile:', error);
                     setIsOnboarded(false);
                 } else if (!profile) {
                     console.log('AuthNavigator: No profile found.');
                     setIsOnboarded(false);
                 }
                else {
                  console.log('AuthNavigator: Profile found. is_onboarded=', profile.is_onboarded);
                  setIsOnboarded(profile.is_onboarded);
                }
              } catch (error) {
                console.error('AuthNavigator: Unexpected error checking user profile:', error);
                setIsOnboarded(false);
              } finally {
                 setLoading(false);
                 console.log('AuthNavigator: Profile check finished. State: session=', !!currentSession, ' isOnboarded=', isOnboarded, ' loading=', false); // Log final state after profile check
              }
            } else {
              console.log('AuthNavigator: User is NOT authenticated.'); // Log if not authenticated
              setIsOnboarded(null);
              setLoading(false);
              console.log('AuthNavigator: Auth check finished. State: session=', false, ' isOnboarded=', null, ' loading=', false); // Log final state after auth check
            }
          }
        );

        return () => {
          console.log('AuthNavigator useEffect (listener cleanup) runs'); // Log when cleanup runs
          subscription.unsubscribe();
        };
      }, []);

      useEffect(() => {
        console.log('AuthNavigator useEffect (navigation) runs. State: loading=', loading, ' session=', !!session, ' isOnboarded=', isOnboarded); // Log when the second useEffect runs

        if (!loading) {
          console.log('AuthNavigator: Loading finished. Deciding navigation...'); // Log if loading finished
          if (session) {
            console.log('AuthNavigator: Session exists. Checking onboarding status...'); // Log if session exists
            if (isOnboarded === false) {
              console.log('AuthNavigator: User not onboarded. Navigating to /onboarding/step1'); // Log before navigating
              // Check current path to avoid unnecessary navigation if already on an onboarding step
              if (!window.location.pathname.startsWith('/onboarding/')) { // Simplified check for any onboarding path
                 navigate('/onboarding/step1');
              } else {
                 console.log('AuthNavigator: Already on an onboarding path, not navigating.'); // Log if already on onboarding path
              }
            } else if (isOnboarded === true) {
              console.log('AuthNavigator: User onboarded. Navigating to /chat'); // Log before navigating
              navigate('/chat');
            } else {
              console.log('AuthNavigator: Session exists, but onboarding status is null/undefined. Waiting or error?'); // Log if onboarding status is unexpected
            }
          } else {
            console.log('AuthNavigator: No session. Navigating to /login'); // Log before navigating
            navigate('/login');
          }
        } else {
           console.log('AuthNavigator: Still loading...'); // Log if still loading
        }
      }, [loading, session, isOnboarded, navigate]);

      console.log('AuthNavigator component finishes rendering. Loading state:', loading); // Log when AuthNavigator finishes rendering

      if (loading) {
        console.log('AuthNavigator: Rendering Loading indicator.'); // Log if rendering loading
        return <div className="p-8 font-heading">Loading application...</div>;
      }

      console.log('AuthNavigator: Rendering null (Router takes over).'); // Log if rendering null
      return null;
    };


    function App() {
      console.log('App component starts rendering'); // Log when App renders
      return (
        <BrowserRouter>
          {console.log('App: Inside BrowserRouter')} {/* Log inside BrowserRouter */}
          <AuthNavigator />

          <Routes>
            {console.log('App: Inside Routes')} {/* Log inside Routes */}
            {/* Public route for login */}
            <Route path="/login" element={<LoginScreen />} />

            {/* Onboarding Step Routes */}
            <Route path="/onboarding/step1" element={<Step1 />} />
            <Route path="/onboarding/step2" element={<Step2 />} />
            <Route path="/onboarding/step3" element={<Step3 />} />

            {/* Protected route for Chat */}
            <Route path="/chat" element={<ChatScreen />} />

            {/* Optional: Redirect any unknown paths to login or handle 404 */}
             <Route path="*" element={<Navigate to="/login" replace />} />

          </Routes>
          {console.log('App: After Routes')} {/* Log after Routes */}
        </BrowserRouter>
      );
    }

    export default App;
    
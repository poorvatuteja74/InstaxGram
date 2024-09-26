import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext'; // Adjust path as necessary
import { getUserData } from '../services/userService'; // Adjust path as necessary
import { supabase } from '../lib/supabase'; // Adjust path as necessary

const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

const MainLayout = () => {
  const { setAuth, setUserData, user } = useAuth(); // Added user for debugging
  console.log('Current user:', user); // Check if user is received from context
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session user:', session?.user?.id);

      if (session) {
        setAuth(session?.user);
        updateUserData(session?.user);
        router.replace('/home');
      } else {
        setAuth(null);
        router.replace('/welcome');
      }
    });

    // Cleanup the listener on unmount
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const updateUserData = async (user) => {
    let res = await getUserData(user?.id);
    console.log('got user data:', res);
    if (res.success) setUserData(res.data);
  };

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default _layout;
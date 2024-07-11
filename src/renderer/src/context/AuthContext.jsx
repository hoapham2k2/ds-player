import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../../../main/supabase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthen, setIsAuthen] = useState(false);

  useEffect(() => {
    const authenApplication = async () => {
      const deviceID = await window.api.getDeviceID();
      const { data, error } = await supabase.from('players').select().eq('device_id', deviceID);
      if (error) {
        console.log(error);
      }

      if (data.length === 0) {
        console.log('No device ID found');
        setIsAuthen(false);
        return;
      }
      setIsAuthen(true);
      console.log('Device ID:', deviceID);
      console.log('Data:', data);
      console.log('Is Authen:', isAuthen);

      const subscription = supabase
        .channel('schema-db-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'players'
          },
          (payload) => {
            console.log('Table players changes with payload:', payload);
            if (payload.new.device_id === deviceID) {
              console.log('Device ID matches');
              setIsAuthen(true);
            } else {
              console.log('Device ID does not match');
              setIsAuthen(false);
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeSubscription(subscription);
      };
    };

    authenApplication();
  }, []);

  return <AuthContext.Provider value={{ isAuthen }}>{children}</AuthContext.Provider>;
};

export const  useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

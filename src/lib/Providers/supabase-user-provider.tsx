'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Subscription } from '../supabase/supabase.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AuthUser } from '@supabase/supabase-js';
import { userSubscriptionStatus } from '../supabase/queries';
import { useToast } from '@/components/ui/use-toast';

type SubscriptionModalContextType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  subscription: Subscription | null;
  user: AuthUser | null;
};

const SubscriptionModalContext = createContext<SubscriptionModalContextType>({
  open: false,
  setOpen: () => {},
  subscription: null,
  user: null,
});

export const useSubscriptionModal = () => {
  return useContext(SubscriptionModalContext);
};

export const SubscriptionModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        console.log(user)
        setUser(user);
        const { data, error } = await userSubscriptionStatus(user.id);
        if (data) setSubscription(data);
        if (error) {
          toast({
            title: 'Unexpected Error',
            description:
              'Oppse! An unexpected error happened. Try again later.',
          });
        }
      }
    };
    getUser();
  }, [supabase, toast]);

  return (
    <SubscriptionModalContext.Provider value={{ user, open, setOpen, subscription }}>
      {children}
    </SubscriptionModalContext.Provider>
  );
};
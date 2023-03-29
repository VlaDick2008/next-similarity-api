'use client';

import React from 'react';
import { signOut } from 'next-auth/react';

import { Button } from './Button';
import { toast } from './Toast';

interface SignOutButtonProps {}

const SignOutButton: React.FC<SignOutButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const signUserOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
    } catch (err) {
      toast({
        title: 'Cannot sign out',
        message: 'Please try again later',
        type: 'error',
      });
    }
  };

  return (
    <Button onClick={signUserOut} isLoading={isLoading}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;

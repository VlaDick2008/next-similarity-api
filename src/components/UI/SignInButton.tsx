'use client';

import React from 'react';
import { signIn } from 'next-auth/react';

import { Button } from './Button';
import { toast } from './Toast';

interface SignInButtonProps {}

const SignInButton: React.FC<SignInButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn('google');
    } catch (err) {
      toast({
        title: 'Cannot sign in',
        message: 'Please try again later',
        type: 'error',
      });
    }
  };

  return (
    <Button onClick={signInWithGoogle} isLoading={isLoading}>
      Sign In
    </Button>
  );
};

export default SignInButton;

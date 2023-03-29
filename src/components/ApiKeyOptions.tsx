'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createApiKey } from '@/constants/create-api-key';
import { revokeApiKey } from '@/constants/revoke-api-key';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './UI/DropdownMenu';
import { Button } from './UI/Button';
import { toast } from './UI/Toast';

interface ApiKeyOptionsProps {
  apiKeyKey: string;
}

const ApiKeyOptions: React.FC<ApiKeyOptionsProps> = ({ apiKeyKey }) => {
  const router = useRouter();
  const [isCreatingNew, setIsCreatingNew] = React.useState<boolean>(false);
  const [isRevoking, setIsRevoking] = React.useState<boolean>(false);

  const createNewApiKey = async () => {
    setIsCreatingNew(true);
    try {
      await revokeApiKey();
      await createApiKey();
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error creating new API key',
        message: 'Please try again later.',
        type: 'error',
      });
    } finally {
      setIsCreatingNew(false);
    }
  };

  const revokeCurrentApiKey = async () => {
    setIsRevoking(true);
    try {
      await revokeApiKey();
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error revoking your API key',
        message: 'Please try again later.',
        type: 'error',
      });
    } finally {
      setIsRevoking(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isCreatingNew || isRevoking} asChild>
        <Button variant="ghost" className="flex gap-2 items-center">
          <p>{isCreatingNew ? 'Creating new key' : isRevoking ? 'Revoking key' : 'Options'}</p>
          {isCreatingNew || isRevoking ? <Loader2 className="animate-spin h-4 w-4" /> : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(apiKeyKey);

            toast({
              title: 'Copied',
              message: 'API key copied to clipboard',
              type: 'success',
            });
          }}
        >
          Copy
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={createNewApiKey}>Create new key</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={revokeCurrentApiKey}>Revoke key</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApiKeyOptions;

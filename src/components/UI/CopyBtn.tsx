'use client';

import React, { ButtonHTMLAttributes } from 'react';
import { Button } from './Button';
import { toast } from './Toast';
import { cn } from '@/lib/utils';
import { Copy } from 'lucide-react';

interface CopyBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueToCopy: string;
}

const CopyBtn: React.FC<CopyBtnProps> = ({ valueToCopy, className, ...props }) => {
  return (
    <Button
      {...props}
      onClick={() => {
        navigator.clipboard.writeText(valueToCopy);
        toast({
          title: 'Copied!',
          message: 'API key copied to clipboard',
          type: 'success',
        });
      }}
      variant="ghost"
      className={className}
    >
      <Copy className="h-5 w-5" />
    </Button>
  );
};

export default CopyBtn;

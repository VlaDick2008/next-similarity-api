import { ApiKey } from '@prisma/client';
import { type ZodIssue } from 'zod';

export interface CreateApiData {
  err: string | ZodIssue[] | null;
  createdApiKey: ApiKey | null;
}

export interface RevokeApiData {
  err: string | ZodIssue[] | null;
  success: boolean;
}

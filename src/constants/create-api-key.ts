import { CreateApiData } from '@/types/api';

export async function createApiKey() {
  const res = await fetch('/api/api-key/create');
  const data = (await res.json()) as CreateApiData;

  if (data.err || !data.createdApiKey) {
    if (data.err instanceof Array) {
      throw new Error(data.err.join(' '));
    }

    throw new Error(data.err ?? 'Something went wrong');
  }

  return data.createdApiKey.key;
}

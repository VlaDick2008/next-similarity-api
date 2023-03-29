import type { RevokeApiData } from '@/types/api';
import { withMethods } from '@/lib/api-middlewares/with-methods';
import { authOptions } from '@/lib/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/db';
import { z } from 'zod';

const handler = async (req: NextApiRequest, res: NextApiResponse<RevokeApiData>) => {
  try {
    const user = await getServerSession(req, res, authOptions).then((res) => res?.user);

    if (!user) {
      return res.status(401).json({ err: 'Unauthorized', success: false });
    }

    const validApiKey = await db.apiKey.findFirst({
      where: {
        userId: user.id,
        enabled: true,
      },
    });

    if (!validApiKey) {
      return res.status(500).json({ err: 'This api key could not be revoked', success: false });
    }

    await db.apiKey.update({
      where: {
        id: validApiKey.id,
      },
      data: {
        enabled: false,
      },
    });

    return res.status(200).json({ err: null, success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ err: err.issues, success: false });
    }

    res.status(500).json({ err: 'Unkwown error', success: false });
  }
};

export default withMethods(['POST'], handler);

import { nanoid } from 'nanoid';
import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '@/lib/auth';
import { CreateApiData } from '@/types/api';
import { db } from '@/lib/db';
import { z } from 'zod';
import { withMethods } from '@/lib/api-middlewares/with-methods';

const handler = async (req: NextApiRequest, res: NextApiResponse<CreateApiData>) => {
  try {
    const user = await getServerSession(req, res, authOptions).then((res) => res?.user);

    if (!user) {
      return res
        .status(401)
        .json({ err: 'Unauthorized to perfom this action', createdApiKey: null });
    }

    const existingApiKey = await db.apiKey.findFirst({
      where: {
        userId: user.id,
        enabled: true,
      },
    });

    if (existingApiKey) {
      return res
        .status(400)
        .json({ err: 'You allready have a valid API key', createdApiKey: null });
    }

    const createdApiKey = await db.apiKey.create({
      data: {
        userId: user.id,
        key: nanoid(),
      },
    });

    return res.status(200).json({ err: null, createdApiKey });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ err: err.issues, createdApiKey: null });
    }

    return res.status(500).json({ err: 'Something went wrong', createdApiKey: null });
  }
};

export default withMethods(['GET'], handler);

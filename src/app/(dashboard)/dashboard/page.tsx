import React from 'react';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';

import ApiDashboard from '@/components/ApiDashboard';
import RequestApiKey from '@/components/RequestApiKey';

interface DashboardProps {}

export const metadata: Metadata = {
  title: 'Similarity API | Dashboard',
  description: 'Free and open-source text similarity API.',
};

const Dashboard = async () => {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();

  const apiKey = await db.apiKey.findFirst({
    where: {
      userId: user.user.id,
      enabled: true,
    },
  });

  return (
    //@ts-expect-error Server Component
    <div className="max-w-7xl mx-auto mt-16">{apiKey ? <ApiDashboard /> : <RequestApiKey />}</div>
  );
};

export default Dashboard;

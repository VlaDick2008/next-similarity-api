import React from 'react';
import type { Metadata } from 'next';

import Heading from '@/components/UI/Heading';
import Paragraph from '@/components/UI/Paragraph';
import DocumentationTabs from '@/components/DocumentationTabs';

import 'simplebar-react/dist/simplebar.min.css';

export const metadata: Metadata = {
  title: 'Similarity API | Documentation',
  description: 'Free and open-source text similarity API.',
};

const Documentation = () => {
  return (
    <div className="container max-w-7xl mx-auto mt-12">
      <div className="flex flex-col items-center gap-6">
        <Heading>Making a request</Heading>
        <Paragraph>api/v1/similarity</Paragraph>

        <DocumentationTabs />
      </div>
    </div>
  );
};

export default Documentation;

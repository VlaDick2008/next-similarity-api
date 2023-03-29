import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

import Heading from '@/components/UI/Heading';
import Paragraph from '@/components/UI/Paragraph';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Similarity API | Home',
  description: 'Free and open-source text similarity API',
};

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-x-hidden">
      <div className="container pt-32 max-w-7xl mx-auto w-full h-full">
        <div className="h-full gap-6 flex flex-col justify-start lg:justify-center items-center lg:items-start">
          <Heading size="lg" className="three-d text-black dark:text-light-gold">
            Easily determine <br /> text similarity.
          </Heading>
          <Paragraph className="max-w-xl lg:text-left">
            With the Text Similarity API, you can easily determine the similarity between two pieces
            of text with a free{' '}
            <Link
              href="/login"
              className="underline underline-offset-2 text-black dark:text-light-gold"
            >
              API key
            </Link>
            .
          </Paragraph>

          <div className="relative w-full max-w-lg lg:max-w-3xl lg:left-1/2 aspect-square lg:absolute">
            <Image
              className="img-shadow"
              quality={100}
              style={{ objectFit: 'contain' }}
              fill
              priority
              src="/typewriter.png"
              alt="typewriter"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

'use client';

import React from 'react';
import SimpleBar from 'simplebar-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './UI/Tabs';
import Code from './Code';
import { nodejs, python } from '@/constants/documentation-code';

const DocumentationTabs = () => {
  return (
    <Tabs defaultValue="nodejs" className="max-w-2xl w-full">
      <TabsList>
        <TabsTrigger value="nodejs">NodeJS</TabsTrigger>
        <TabsTrigger value="python">Python</TabsTrigger>
      </TabsList>
      <TabsContent value="nodejs">
        <SimpleBar forceVisible="y">
          <Code animated code={nodejs} language="javascript" show />
        </SimpleBar>
      </TabsContent>
      <TabsContent value="python">
        <SimpleBar forceVisible="y">
          <Code animated code={python} language="python" show />
        </SimpleBar>
      </TabsContent>
    </Tabs>
  );
};

export default DocumentationTabs;

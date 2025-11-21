import * as React from 'react';
import { JSX } from 'react';

export type ChatMessage = {
  type: 'bot' | 'user';
  content: string | JSX.Element;
};

export type ChatOption = {
  id: string;
  label: string;
  response: string;
  icon?: React.ReactNode;
};
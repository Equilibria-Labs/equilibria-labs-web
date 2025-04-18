'use client';

import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAlternativeTheme } from '@/hooks/useAlternativeTheme';
import QuestionAnswerChat from '@/components/common/QuestionAnswerChat';
import Box from '@/components/structure/Box';
import { getTimeOfDayGreeting } from '@/helpers/time';

export default function ReframeStarter() {
  const [input, setInput] = useState('');
  const [fadeIn, setFadeIn] = useState(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const { setRandomTheme } = useAlternativeTheme();

  // Focus input on load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle fade-in effect
  useEffect(() => {
    if (!fadeIn) {
      const timer = setTimeout(() => setFadeIn(true), 100);
      return () => clearTimeout(timer);
    }
  }, [fadeIn]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFadeIn(false);
    setRandomTheme();
    setTimeout(() => {
      // Store the response in sessionStorage before navigating
      sessionStorage.setItem('initialResponse', input);
      router.push('/reframe');
    }, 300);
  };

  return (
    <Box>
      <QuestionAnswerChat
        displayedQuestion={`What's on your mind ${getTimeOfDayGreeting()}?`}
        isTyping={false}
        isAssistantMessage={true}
        input={input}
        onInputChange={handleInputChange}
        onSubmit={handleFormSubmit}
        isLoading={false}
        fadeIn={fadeIn}
        inputRef={inputRef}
      />
    </Box>
  );
}

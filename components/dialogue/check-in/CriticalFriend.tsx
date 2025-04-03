'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';
import { useAlternativeTheme } from '@/hooks/useAlternativeTheme';
import QuestionAnswerChat from '@/components/common/QuestionAnswerChat';

interface CriticalFriendProps {
  onComplete?: () => void;
}

export default function CriticalFriend({ onComplete }: CriticalFriendProps) {
  const [isTyping, setIsTyping] = useState(false);
  const [displayedQuestion, setDisplayedQuestion] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [fadeIn, setFadeIn] = useState(true);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
  } = useChat({
    api: '/api/critical-friend',
    onFinish: () => {
      setIsTyping(true);
      setTypingIndex(0);
      setDisplayedQuestion('');
    },
  });

  const { setRandomTheme } = useAlternativeTheme();

  console.log(onComplete);
  // Get the current question from the messages
  const currentQuestion =
    messages.length > 0 && messages[messages.length - 1].role === 'assistant'
      ? messages[messages.length - 1].content
      : '';

  // Typing animation effect
  useEffect(() => {
    if (isTyping && typingIndex < currentQuestion.length) {
      const timer = setTimeout(() => {
        setDisplayedQuestion(prev => prev + currentQuestion[typingIndex]);
        setTypingIndex(typingIndex + 1);
      }, 10); // Speed of typing

      return () => clearTimeout(timer);
    } else if (isTyping && typingIndex >= currentQuestion.length) {
      setIsTyping(false);
    }
  }, [isTyping, typingIndex, currentQuestion]);

  // Initial question setup
  useEffect(() => {
    if (messages.length === 0) {
      append({
        role: 'assistant',
        content: '',
      });
    }
  }, [messages, append]);

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFadeIn(false);
    setRandomTheme();
    setTimeout(() => {
      handleSubmit(e);
    }, 300);
  };

  return (
    <QuestionAnswerChat
      displayedQuestion={displayedQuestion}
      isTyping={isTyping}
      isAssistantMessage={messages[messages.length - 1]?.role === 'assistant'}
      input={input}
      onInputChange={handleInputChange}
      onSubmit={handleFormSubmit}
      isLoading={isLoading}
      fadeIn={fadeIn}
      inputRef={inputRef}
    />
  );
}

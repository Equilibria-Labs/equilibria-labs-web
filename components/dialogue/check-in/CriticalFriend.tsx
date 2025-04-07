'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { useAlternativeTheme } from '@/hooks/useAlternativeTheme';
import QuestionAnswerChat from '@/components/common/QuestionAnswerChat';
import { CRITICAL_FRIEND_MAX_MESSAGES } from '@/config/critical-friend';

export default function CriticalFriend() {
  const [isTyping, setIsTyping] = useState(false);
  const [displayedQuestion, setDisplayedQuestion] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [fadeIn, setFadeIn] = useState(true);
  const [hasInitialResponse, setHasInitialResponse] = useState(false);
  const MAX_MESSAGES = CRITICAL_FRIEND_MAX_MESSAGES; // @todo: make this dynamic

  const { messages, input, handleInputChange, handleSubmit, status, append } =
    useChat({
      api: '/api/critical-friend',
      onFinish: () => {
        // Wait for fade out to complete, then clear content and start new sequence
        setTimeout(() => {
          setDisplayedQuestion('');
          setRandomTheme();
          setFadeIn(true);
          setTimeout(() => {
            setIsTyping(true);
            setTypingIndex(0);
            // Refocus the input after the animation sequence
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }, 300); // Start typing after fade in
        }, 300); // Wait for fade out
      },
    });

  const { setRandomTheme } = useAlternativeTheme();

  // Initial setup effect
  useEffect(() => {
    if (messages.length === 0) {
      const initialResponse = sessionStorage.getItem('initialResponse');
      if (initialResponse) {
        setHasInitialResponse(true);
        append({
          role: 'user',
          content: initialResponse,
        });
        sessionStorage.removeItem('initialResponse');
      }
    }
  }, [messages, append]);

  // Get the current question from the messages
  const currentQuestion =
    messages.length > 0 && messages[messages.length - 1].role === 'assistant'
      ? messages[messages.length - 1].content
      : '';

  // Typing animation effect
  useEffect(() => {
    if (isTyping && typingIndex < currentQuestion.length) {
      const timer = setTimeout(() => {
        setDisplayedQuestion(currentQuestion.substring(0, typingIndex + 1));
        setTypingIndex(typingIndex + 1);
      }, 10); // Speed of typing

      return () => clearTimeout(timer);
    } else if (isTyping && typingIndex >= currentQuestion.length) {
      setIsTyping(false);
      // Focus the input after typing animation completes with a delay
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100); // Add delay before focusing
    }
  }, [isTyping, typingIndex, currentQuestion]);

  // Focus input on load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Remove the automatic fade-in effect since we're handling it manually
  useEffect(() => {
    if (!fadeIn) {
      const timer = setTimeout(() => {
        setDisplayedQuestion(''); // Clear the text when fade out completes
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [fadeIn]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageCount >= MAX_MESSAGES) {
      // Optionally handle max messages reached
      console.log('Max messages reached');
      return;
    }
    setFadeIn(false); // Start by fading out
    setMessageCount(prev => prev + 1);
    handleSubmit(e);
  };

  return hasInitialResponse ? (
    <QuestionAnswerChat
      displayedQuestion={displayedQuestion}
      isTyping={isTyping}
      isAssistantMessage={messages[messages.length - 1]?.role === 'assistant'}
      input={input}
      onInputChange={handleInputChange}
      onSubmit={handleFormSubmit}
      isLoading={status === 'streaming'}
      fadeIn={fadeIn}
      inputRef={inputRef}
    />
  ) : null;
}

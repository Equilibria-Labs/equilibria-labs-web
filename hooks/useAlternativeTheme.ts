import { useTheme } from 'next-themes';
import { useState } from 'react';

const TOTAL_THEMES = 4;

export const useAlternativeTheme = () => {
  const { setTheme } = useTheme();
  const [currentThemeIndex, setCurrentThemeIndex] = useState(1);

  const setSpecificTheme = (themeNumber: number) => {
    if (themeNumber < 1 || themeNumber > TOTAL_THEMES) {
      throw new Error(`Theme number must be between 1 and ${TOTAL_THEMES}`);
    }
    setCurrentThemeIndex(themeNumber);
    setTheme(`theme-${themeNumber}`);
  };

  const setRandomTheme = () => {
    const randomThemeNumber = Math.floor(Math.random() * TOTAL_THEMES) + 1;
    setCurrentThemeIndex(randomThemeNumber);
    setTheme(`theme-${randomThemeNumber}`);
  };

  const setNextTheme = () => {
    const nextThemeNumber = (currentThemeIndex % TOTAL_THEMES) + 1;
    setCurrentThemeIndex(nextThemeNumber);
    setTheme(`theme-${nextThemeNumber}`);
  };

  return {
    setSpecificTheme,
    setRandomTheme,
    setNextTheme,
    currentThemeIndex,
  };
};

'use client';

import { Button } from '../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Laptop, Moon, Sun, Palette } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 16;

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return (
          <Sun
            key='light'
            size={ICON_SIZE}
            className={'text-muted-foreground'}
          />
        );
      case 'dark':
        return (
          <Moon
            key='dark'
            size={ICON_SIZE}
            className={'text-muted-foreground'}
          />
        );
      case 'system':
        return (
          <Laptop
            key='system'
            size={ICON_SIZE}
            className={'text-muted-foreground'}
          />
        );
      default:
        return (
          <Palette
            key='custom'
            size={ICON_SIZE}
            className={'text-muted-foreground'}
          />
        );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size={'sm'}>
          {getThemeIcon()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-content' align='start'>
        <DropdownMenuRadioGroup value={theme} onValueChange={e => setTheme(e)}>
          <DropdownMenuRadioItem className='flex gap-2' value='light'>
            <Sun size={ICON_SIZE} className='text-muted-foreground' />
            <span>Light</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className='flex gap-2' value='dark'>
            <Moon size={ICON_SIZE} className='text-muted-foreground' />
            <span>Dark</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className='flex gap-2' value='system'>
            <Laptop size={ICON_SIZE} className='text-muted-foreground' />
            <span>System</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className='flex gap-2' value='deep-teal'>
            <Palette size={ICON_SIZE} className='text-muted-foreground' />
            <span>Deep Teal</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className='flex gap-2' value='steel-blue'>
            <Palette size={ICON_SIZE} className='text-muted-foreground' />
            <span>Steel Blue</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className='flex gap-2' value='smoky-mustard'>
            <Palette size={ICON_SIZE} className='text-muted-foreground' />
            <span>Smoky Mustard</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className='flex gap-2' value='dark-aubergine'>
            <Palette size={ICON_SIZE} className='text-muted-foreground' />
            <span>Dark Aubergine</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ThemeSwitcher };

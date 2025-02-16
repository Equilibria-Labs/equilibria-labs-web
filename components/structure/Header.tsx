import React from 'react';
import Logo from './Logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Row from '@/components/structure/Row';
import { createClient } from '@/utils/supabase/server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Header = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header
      data-component='Header'
      className='px-4 py-2 max-w-maxWidth mx-auto'
    >
      <Row isFullWidth justify='space-between' align='center'>
        {/* <Logo /> */}
        {user ? (
          <Avatar>
            <AvatarImage
              src={
                user.user_metadata?.avatar_url || '/images/circle-gradient.svg'
              }
              alt={user.email || ''}
            />
            <AvatarFallback>
              {user.email?.[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className='flex gap-2'>
            <Link href='/sign-in'>
              {' '}
              <Button size='sm' variant={'outline'}>
                Sign in
              </Button>
            </Link>
          </div>
        )}
      </Row>
    </header>
  );
};

export default Header;

import { Metadata } from 'next';
import {
  HeadingSmall,
  Heading,
  HeadingLarge,
  BodyText,
} from '@/components/common/Typography';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'The Sleep Lab | Equilibria',
  description:
    'Take a sleep test to see how you sleep and get a personalized sleep report',
};

export default function SleepReportWelcome() {
  return (
    <>
      <HeadingSmall>The Sleep Lab</HeadingSmall>
      <HeadingLarge className='text-center'>
        I&apos;m Equilibria, you can call me Libby.
      </HeadingLarge>
      <Heading>
        Spend 2 mins answering a few questions to get a personalized sleep
        report
      </Heading>
      <BodyText>
        My free sleep report will make recommendations based on evidence-based
        sleep science and is personalised by AI.
      </BodyText>
      <Link href='/sleep-report'>
        <Button className='lg w-full'>Take the sleep test</Button>
      </Link>
    </>
  );
}

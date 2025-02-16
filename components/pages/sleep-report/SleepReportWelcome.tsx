import { Metadata } from 'next';
import {
  Heading,
  HeadingLarge,
  BodyText,
  HeadingSmall,
} from '@/components/common/Typography';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Box from '@/components/structure/Box';
import List, { ListItem } from '@/components/common/List';

export const metadata: Metadata = {
  title: 'The Sleep Lab | Equilibria',
  description:
    'Take a sleep test to see how you sleep and get a personalized sleep report',
};

export default function SleepReportWelcome() {
  return (
    <Box>
      <HeadingLarge className='text-center'>
        Start Your Journey to Restful Sleep
      </HeadingLarge>
      <HeadingSmall>
        CBT-I has been shown to be more effective than sleep medications in the
        long term, with fewer side effects and a lower likelihood of relapse.
      </HeadingSmall>
      <BodyText>
        Our gold standard, personalised sleep training program takes just 10
        minutes per day, with most users seeing a significant improvement within
        2 weeks
      </BodyText>

      <BodyText>
        Chronic sleep problems significantly impact both mental and physical
        health. Improving sleep quality and quantity has been proven to help
        improve;
      </BodyText>
      <List>
        <ListItem>anxiety, depression and stress</ListItem>
        <ListItem>heart disease, diabetes, immune function</ListItem>
        <ListItem>sex. Lol</ListItem>
        <ListItem>heart disease</ListItem>
      </List>
      <Link href='/sleep-report'>
        <Button className='lg w-full'>Get started today</Button>
      </Link>
    </Box>
  );
}

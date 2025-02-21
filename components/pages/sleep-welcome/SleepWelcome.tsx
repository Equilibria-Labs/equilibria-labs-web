import { Metadata } from 'next';
import {
  Heading,
  HeadingLarge,
  BodyText,
  HeadingSmall,
  SmallText,
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
    <Box shouldRise>
      <HeadingLarge className='text-center'>Unlock Better Sleep</HeadingLarge>
      <Heading className='text-secondary text-center'>
        Clinically Proven Techniques to Break the Cycle of Insomnia and Restore
        Your Sleep.
      </Heading>
      <HeadingSmall>
        Join Thousands of Happy Sleepers. Claim Your Free Sleep Assessment! Take
        your First Step Towards Better Sleep
      </HeadingSmall>

      <BodyText>
        No more tossing and turning. No more pills. Break the insomnia cycle.
      </BodyText>
      <List>
        <ListItem>lower anxiety, stress and depression </ListItem>
        <ListItem>Wake up feeling refreshed and energised.</ListItem>
        <ListItem>better immune function</ListItem>

        <ListItem>
          Feel immediate difference in your mood, productivity, and overall
          well-being
        </ListItem>
        <ListItem>
          Improve your sleep habits with personalized, science-backed methods
        </ListItem>
      </List>
      <Link href='/sleep-isi'>
        <Button className='lg w-full'>{`What's your sleep score?`}</Button>
      </Link>
      <SmallText className='text-center'>Takes 1 minute to complete</SmallText>
    </Box>
  );
}

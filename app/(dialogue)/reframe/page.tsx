import { Metadata } from 'next';
import ReframePage from '@/components/pages/reframe/ReframePage';

export const metadata: Metadata = {
  title: 'Check In | Equilibria',
  description: 'Daily check-in to track your symptoms, mood, and activities',
};

export default function Page() {
  return <ReframePage />;
}

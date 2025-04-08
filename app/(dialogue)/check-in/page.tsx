import { Metadata } from 'next';
import CheckInPage from '@/components/pages/check-in/CheckInPage';

export const metadata: Metadata = {
  title: 'Check In | Equilibria',
  description: 'Daily check-in to track your symptoms, mood, and activities',
};

export default function Page() {
  return <CheckInPage />;
}

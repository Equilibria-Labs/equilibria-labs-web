import SleepWelcome from '@/components/pages/sleep-welcome/SleepWelcome';
import HeaderBodyAndNavLayout from '@/components/layouts/HeaderBodyAndNavLayout';

export default async function Today() {
  return (
    <HeaderBodyAndNavLayout>
      <SleepWelcome />
    </HeaderBodyAndNavLayout>
  );
}

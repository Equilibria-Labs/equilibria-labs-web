// import SleepWelcome from '@/components/pages/sleep-welcome/SleepWelcome';
import TodayPage from '@/components/pages/today/TodayPage';
import HeaderBodyAndNavLayout from '@/components/layouts/HeaderBodyAndNavLayout';

export default async function Today() {
  return (
    <HeaderBodyAndNavLayout>
      <TodayPage />
    </HeaderBodyAndNavLayout>
  );
}

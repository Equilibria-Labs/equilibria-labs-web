// import InsomniaQuiz from '../components/insomnia-severity-quiz/insomnia-severity-quiz';
import SleepReportWelcome from '@/components/pages/sleep-report/SleepReportWelcome';
import HeaderBodyAndNavLayout from '@/components/layouts/HeaderBodyAndNavLayout';
export default async function Today() {
  return (
    <HeaderBodyAndNavLayout>
      <SleepReportWelcome />
    </HeaderBodyAndNavLayout>
  );
}

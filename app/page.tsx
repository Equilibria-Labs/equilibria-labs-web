// import InsomniaQuiz from '../components/insomnia-severity-quiz/insomnia-severity-quiz';
import Welcome from '@/components/pages/welcome/Welcome';
import HeaderBodyAndNavLayout from '@/components/layouts/HeaderBodyAndNav';
export default async function Home() {
  console.log('Home page rendering');
  // Add error boundary or try-catch if needed
  return (
    <>
      <HeaderBodyAndNavLayout>
        <Welcome />
      </HeaderBodyAndNavLayout>
    </>
  );
}

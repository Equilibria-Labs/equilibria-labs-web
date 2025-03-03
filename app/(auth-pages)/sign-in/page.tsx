import { SignInForm } from '@/components/account/SignInForm';
import { Message } from '@/components/account/form-message';

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return <SignInForm message={searchParams} />;
}

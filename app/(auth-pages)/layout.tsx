import HeaderBodyAndNavLayout from '@/components/layouts/HeaderBodyAndNav';

export default function AuthPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HeaderBodyAndNavLayout>{children}</HeaderBodyAndNavLayout>;
}

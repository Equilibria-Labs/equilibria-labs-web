import HeaderBodyAndNavLayout from '@/components/layouts/HeaderBodyAndNavLayout';

export default function AuthPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HeaderBodyAndNavLayout>{children}</HeaderBodyAndNavLayout>;
}

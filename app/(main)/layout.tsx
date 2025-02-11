import HeaderBodyAndNavLayout from '@/components/layouts/HeaderBodyAndNav';
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HeaderBodyAndNavLayout>{children}</HeaderBodyAndNavLayout>;
}

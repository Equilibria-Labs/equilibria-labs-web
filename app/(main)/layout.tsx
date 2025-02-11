import HeaderBodyAndNavLayout from '@/components/layouts/HeaderBodyAndNavLayout';
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HeaderBodyAndNavLayout>{children}</HeaderBodyAndNavLayout>;
}

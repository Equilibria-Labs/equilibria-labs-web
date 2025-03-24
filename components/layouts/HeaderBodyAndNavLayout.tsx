import Header from '@/components/structure/Header';
import SunriseHeader from '@/components/graphics/SunriseHeader';
import Body from '@/components/structure/Body';
import BottomNav from '@/components/navigation/BottomNav';

export default function HeaderBodyAndNavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Body>{children}</Body>
      <BottomNav />
    </>
  );
}

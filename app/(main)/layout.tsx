import Header from '@/components/structure/Header';
import SunriseHeader from '@/components/graphics/SunriseHeader';
import Body from '@/components/structure/Body';
import BottomNav from '@/components/structure/BottomNav';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SunriseHeader>
        <Header />
      </SunriseHeader>
      <Body>{children}</Body>
      <BottomNav />
    </>
  );
}

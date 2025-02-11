import DarkBackground from '@/components/structure/DarkBackground';
import Body from '@/components/structure/Body';

export default function DarkDialogueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DarkBackground>
        <Body>{children}</Body>
      </DarkBackground>
    </>
  );
}

import DarkBackground from '@/components/structure/DarkBackground';
import Body from '@/components/structure/Body';

export default function DialogueLayout({
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

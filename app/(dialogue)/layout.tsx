import DarkDialogueLayout from '@/components/layouts/DarkDialogueLayout';

export default function DialogueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DarkDialogueLayout>{children}</DarkDialogueLayout>;
}

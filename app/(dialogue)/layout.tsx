import DialogueLayoutComponent from '@/components/layouts/DialogueLayout';

export default function DialogueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DialogueLayoutComponent>{children}</DialogueLayoutComponent>;
}

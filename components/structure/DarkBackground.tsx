export default function DarkBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-component='DarkBackground'
      className='bg-foreground text-background min-h-screen w-full flex items-center justify-center'
    >
      {children}
    </div>
  );
}

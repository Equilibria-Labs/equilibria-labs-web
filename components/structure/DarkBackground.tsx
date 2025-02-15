export default function DarkBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-component='DarkBackground'
      className='bg-foreground text-background min-h-screen w-full flex justify-center pt-16'
    >
      {children}
    </div>
  );
}

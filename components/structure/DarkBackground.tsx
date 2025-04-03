export default function DarkBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-component='DarkBackground'
      className='bg-background text-foreground min-h-screen w-full flex justify-center'
    >
      {children}
    </div>
  );
}

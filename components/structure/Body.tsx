export default function Body({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-component='Body'
      className='flex flex-col gap-8 max-w-maxWidth p-4 w-full'
    >
      {children}
    </div>
  );
}

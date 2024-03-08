import Link from 'next/link';

export default function Footer() {
  return (
    <div className="bg-secondary w-full flex justify-center items-center p-1">
      <p className="text-primary font-bold">
        Developed by{' '}
        <Link
          href={'https://www.linkedin.com/in/luciano-de-carolis-36a751148/'}
          target="_blank"
          className="underline hover:text-slate-500"
        >
          Luciano De Carolis
        </Link>{' '}
        - Argentina 2024 🏆
      </p>
    </div>
  );
}

import Link from 'next/link';

type Props = React.PropsWithChildren<{
  href?: string;
  className?: string;
  onClick?: () => void;
}>;

const cx = (...c: (string | undefined)[]) => c.filter(Boolean).join(' ');

export function Button({ href, className, children, onClick }: Props) {
  const cls = cx(
    'inline-flex items-center justify-center rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800',
    className
  );
  return href ? (
    <Link href={href} className={cls}>{children}</Link>
  ) : (
    <button className={cls} onClick={onClick}>{children}</button>
  );
}

export function GhostButton({ href, className, children, onClick }: Props) {
  const cls = cx(
    'inline-flex items-center justify-center rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50',
    className
  );
  return href ? (
    <Link href={href} className={cls}>{children}</Link>
  ) : (
    <button className={cls} onClick={onClick}>{children}</button>
  );
}
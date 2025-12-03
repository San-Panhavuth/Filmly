export type Role = 'guest' | 'filmmaker' | 'organizer' | 'admin';

const ADMIN_EMAILS = ['admin@filmly.dev', 'dev@filmly.dev'];
const ORGANIZER_EMAILS = ['organizer@test.org', 'events@sample.org'];

const ADMIN_DOMAINS = ['filmly.dev'];
const ORGANIZER_HINT = '+org'; // any email containing +org becomes organizer

export function resolveRoleForLogin(email: string): Role {
  const e = email.trim().toLowerCase();
  if (!e) return 'guest';

  const domain = e.split('@')[1] ?? '';

  if (ADMIN_EMAILS.includes(e) || ADMIN_DOMAINS.includes(domain)) return 'admin';
  if (ORGANIZER_EMAILS.includes(e) || e.includes(ORGANIZER_HINT)) return 'organizer';

  return 'filmmaker';
}
export const parseCookies = <O extends {[key: string]: string}>(headerCookie: string): O => {
  const cookies = headerCookie
    .split('; ')
    .map((cookie) => cookie.split('='));
  return Object.fromEntries(cookies);
};

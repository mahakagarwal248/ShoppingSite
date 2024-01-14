import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });

export function addCookie(key, value) {
  cookies.set(key, value);
}

export function getCookie(key) {
  return cookies.get(key);
}

export function removeCookie(key) {
  return cookies.remove(key);
}

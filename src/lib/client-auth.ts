'use client';

import Cookies from 'js-cookie';

const TOKEN_NAME = 'admin_token';

export const setToken = (token: string) => {
  Cookies.set(TOKEN_NAME, token, {
    expires: 1, // 1 day
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
};

export const getToken = () => {
  return Cookies.get(TOKEN_NAME);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_NAME);
};

export const isAuthenticated = () => {
  return !!getToken();
};

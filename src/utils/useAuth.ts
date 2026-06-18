import { useCallback, useMemo } from "react";
import { useCookies } from "react-cookie";
import type { AuthUser, JwtPayload, UserProfile } from "./types";

const TOKEN_COOKIE = "dppc_token";
const PROFILE_COOKIE = "dppc_profile";
const ACCESS_COOKIE = "dppc_access";

const cookieOptions = {
  path: "/",
  secure: import.meta.env.PROD,
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

/**
 * Decode a JWT payload from its base64url segment without verifying signature.
 */
export const decodeJwtPayload = (token?: string): JwtPayload | null => {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(normalized);
    const json = decodeURIComponent(
      decoded
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
};

export const isTokenExpired = (token?: string): boolean => {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return !token;
  return payload.exp * 1000 < Date.now();
};

/**
 * Redirect to the login screen, preserving the intended destination via
 * a `?redirect=` query param.
 */
export const goToLogin = (): void => {
  const { pathname, search } = window.location;
  const redirect = encodeURIComponent(`${pathname}${search}`);
  if (pathname !== "/") {
    window.location.href = `/?redirect=${redirect}`;
  } else {
    window.location.href = "/";
  }
};

export const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    TOKEN_COOKIE,
    PROFILE_COOKIE,
    ACCESS_COOKIE,
  ]);

  const token: string | undefined = cookies[TOKEN_COOKIE];
  const profile: UserProfile | undefined = cookies[PROFILE_COOKIE];
  const permissions: string[] = useMemo(
    () => cookies[ACCESS_COOKIE] ?? [],
    [cookies]
  );

  const login = useCallback(
    (user: AuthUser) => {
      setCookie(TOKEN_COOKIE, user.token, cookieOptions);
      if (user.profile) setCookie(PROFILE_COOKIE, user.profile, cookieOptions);
      if (user.permissions)
        setCookie(ACCESS_COOKIE, user.permissions, cookieOptions);
    },
    [setCookie]
  );

  const logout = useCallback(() => {
    removeCookie(TOKEN_COOKIE, { path: "/" });
    removeCookie(PROFILE_COOKIE, { path: "/" });
    removeCookie(ACCESS_COOKIE, { path: "/" });
  }, [removeCookie]);

  const isAuthenticated = useMemo(
    () => Boolean(token) && !isTokenExpired(token),
    [token]
  );

  const effectivePermissions = permissions;

  const hasPermission = useCallback(
    (permission: string) => effectivePermissions.includes(permission),
    [effectivePermissions]
  );

  const hasAnyPermission = useCallback(
    (perms: string[]) => perms.some((p) => effectivePermissions.includes(p)),
    [effectivePermissions]
  );

  return {
    login,
    logout,
    isAuthenticated,
    token,
    user: profile,
    effectivePermissions,
    hasPermission,
    hasAnyPermission,
  };
};

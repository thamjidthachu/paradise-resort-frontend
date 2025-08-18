export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  const access = typeof window !== "undefined" ? localStorage.getItem("access_token") : null
  const headers = {
    ...(init.headers || {}),
    ...(access ? { Authorization: `Bearer ${access}` } : {}),
  }
  return fetch(input, { ...init, headers })
}
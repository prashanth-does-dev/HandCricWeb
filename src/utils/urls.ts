const BASE_URL = import.meta.env.DEV ? "http://localhost:3000" : ""

export const LOGIN_ROUTE = BASE_URL + "/api/auth/login"
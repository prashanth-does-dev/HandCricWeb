import { jwtDecode } from "jwt-decode";

export function getUserPayload(token: string) {
    if (token) {
        try {
            const userPayload = jwtDecode(token)
            return userPayload;
        } catch (E) {
            return null;
        }
    } else {
        return null;
    }
}

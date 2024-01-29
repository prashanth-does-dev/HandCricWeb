import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { tokenAtomWithPersistence } from "../states/global";
import { jwtDecode } from "jwt-decode";

function isLoggedIn(token: string) {
  try {
    const userPayload = jwtDecode(token);
    if (userPayload) {
      return (userPayload!.exp as number) > Date.now() / 1000;
    } else {
      return false;
    }
  } catch (E) {
    return null;
  }
}

// * LAYOUT FOR MAKING ROUTES PRIVATE
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const PrivateRoute: (props: any) => any = () => {
  const location = useLocation();
  const query = useQueryClient();
  const [token, setToken] = useAtom(tokenAtomWithPersistence);

  console.log("token", token);

  if (!token) {
    query.clear();
    console.log("Runnig");
    setToken("null");
    return (
      <Navigate
        to={`/login?next=${location.pathname}${location.search}`}
        replace
      />
    );
  }

  if (!isLoggedIn(token!)) {
    alert("Your session has expired! Please login again to continue..");
    query.clear();
    setToken("null");
    return (
      <Navigate
        to={`/login?next=${location.pathname}${location.search}`}
        replace
      />
    );
  }
  return <Outlet />;
};

export default PrivateRoute;

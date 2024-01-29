import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import axios from "axios";
import { LOGIN_ROUTE } from "../../utils/urls";
import { useSetAtom } from "jotai";
import { tokenAtomWithPersistence, userAtom } from "../../states/global";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const setUser = useSetAtom(userAtom);
  const setToken = useSetAtom(tokenAtomWithPersistence);

  const navigate = useNavigate();
  const nextUrl = location.search.substring(6).trim();

  const googleResponse = async (res: CredentialResponse) => {
    try {
      const tokenId = res.credential;
      const response = await axios.post(LOGIN_ROUTE, { tokenId });
      if (response.status === 200 || response.status === 201) {
        setUser({
          username: response.data.user.username,
          uuid: response.data.user._id,
          profile_image: response.data.user.profile_image,
          status: response.data.user.status,
          isAuth: true,
        });
        setToken(response.data.token);
        if (nextUrl !== null && nextUrl !== "") {
          return navigate(nextUrl);
        } else return navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("THIS IS THE ERROR", err);
    }
  };

  return (
    <GoogleLogin
      width={275}
      shape="rectangular"
      useOneTap={true}
      theme={"filled_blue"}
      onSuccess={async (credentialResponse) => {
        googleResponse(credentialResponse);
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}

export default LoginPage;

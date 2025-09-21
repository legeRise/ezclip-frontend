import { useEffect, useContext } from "react";
import googleOneTap from "google-one-tap";
import { googleOneTapLogin, getUserInfo } from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";

const OneTapLogin = ({ onAuth }) => {
  const { setUserInfo } = useContext(UserContext);

  useEffect(() => {
    const options = {
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      auto_select: false,
      cancel_on_tap_outside: false,
      context: "signin",
    };

    googleOneTap(options, async (response) => {
      try {
        const data = await googleOneTapLogin(response.credential);
        if (data.access) {
          localStorage.setItem("access", data.access);
          localStorage.setItem("refresh", data.refresh);
          const userInfo = await getUserInfo();
          setUserInfo(userInfo);
          if (onAuth) onAuth(true);
        } else {
          if (onAuth) onAuth(false);
        }
      } catch (err) {
        if (onAuth) onAuth(false);
      }
    });
  }, [onAuth, setUserInfo]);

  return null; // One Tap UI appears automatically
};

export default OneTapLogin;

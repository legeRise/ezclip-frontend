import { useState, useContext } from "react";
import { signInWithGoogle, getUserInfo } from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";

export function useGoogleSignIn(setIsAuthenticated) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const { setUserInfo } = useContext(UserContext);

  const handleGoogleSignIn = async (credentialResponse) => {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const data = await signInWithGoogle(credentialResponse?.credential);
      if (data.access) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        const userInfo = await getUserInfo();
        setUserInfo(userInfo);
        setResult(data);
        if (setIsAuthenticated) setIsAuthenticated(true); // <-- update auth status
      } else {
        setError(data.message || "Google sign-in failed");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleGoogleSignIn, loading, error, result };
}
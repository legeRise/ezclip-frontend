import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { activateAccount } from "../services/authService";
import StatusMessage from "../components/ui/StatusMessage";

const ActivateAccount = () => {
  const { uid, token } = useParams();
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (uid && token) {
      const activate = async () => {
        try {
          await activateAccount(uid, token);
          setStatus("success");
          setMessage("Your account has been activated! Redirecting to login...");
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 1500); // 1.5 seconds delay
        } catch (error) {
          setStatus("error");
          setMessage("Invalid or Expired Activation Link");
        }
      };
      activate();
    }
  }, [uid, token]);

return (
    <div className="flex justify-center min-w-1 p-4 sm:p-8">
        {status === "pending" && (
            <StatusMessage
                message="Activating your account..."
                type="info"
            />
        )}
        {status === "success" && (
            <StatusMessage
                message={message}
                type="success"
            />
        )}
        {status === "error" && (
            <StatusMessage
                message={message}
                type="error"
            />
        )}
    </div>
);
};

export default ActivateAccount;

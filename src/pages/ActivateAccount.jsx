import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { activateAccount } from "../services/authService";
import { Card, CardContent } from "@/components/shadcn/card";
import { Alert, AlertDescription } from "@/components/shadcn/alert";
import { Loader2, CheckCircle2, XCircle, Mail } from "lucide-react";

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
          }, 1500);
        } catch (error) {
          setStatus("error");
          setMessage("Invalid or Expired Activation Link");
        }
      };
      activate();
    }
  }, [uid, token, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl border-primary/10">
        <CardContent className="pt-8 pb-8">
          {status === "pending" && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-primary animate-pulse" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">Activating Your Account</h2>
                <p className="text-muted-foreground">
                  Please wait while we verify your activation link...
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-primary">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Activating...</span>
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <Alert className="bg-green-500/10 border-green-500/20">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  {message}
                </AlertDescription>
              </Alert>
            </div>
          )}

          {status === "error" && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                <XCircle className="w-8 h-8 text-destructive" />
              </div>
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertDescription>
                  {message}
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivateAccount;

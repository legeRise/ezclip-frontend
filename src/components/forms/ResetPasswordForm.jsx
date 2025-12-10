import React, { useState } from "react";
import { confirmPasswordReset } from "../../services/authService";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { Alert, AlertDescription } from '@/components/shadcn/alert';
import { Loader2, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

const ResetPasswordForm = () => {
  const { uid, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setIsSuccess(false);
    
    if (newPassword !== confirmPassword) {
      setStatus("Passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setStatus("Password must be at least 8 characters long.");
      return;
    }
    
    setLoading(true);
    try {
      await confirmPasswordReset(uid, token, newPassword, confirmPassword);
      setStatus("Your password has been reset successfully. Redirecting to login...");
      setIsSuccess(true);
      setTimeout(() => navigate("/login", { replace: true }), 2000);
    } catch (err) {
      setStatus(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {status && (
        <Alert variant={isSuccess ? "default" : "destructive"} className={isSuccess ? "border-primary/50 bg-primary/10" : ""}>
          {isSuccess ? (
            <CheckCircle2 className="h-4 w-4 text-primary" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertDescription className={isSuccess ? "text-primary" : ""}>{status}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          type="password"
          maxLength={150}
          placeholder="Enter new password (min. 8 characters)"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          maxLength={150}
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Resetting...
          </>
        ) : (
          <>
            <Lock className="mr-2 h-4 w-4" />
            Reset Password
          </>
        )}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;

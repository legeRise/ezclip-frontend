import React, { useState } from "react";
import { requestPasswordReset } from "../../services/authService";
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { Alert, AlertDescription } from '@/components/shadcn/alert';
import { Loader2, Mail, Info } from 'lucide-react';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    setIsSuccess(false);
    try {
      await requestPasswordReset(email);
      setStatus("A password reset link has been sent to your email.");
      setIsSuccess(true);
    } catch (err) {
      setStatus(err.message);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {status && (
        <Alert variant={isSuccess ? "default" : "destructive"} className={isSuccess ? "border-primary/50 bg-primary/10" : ""}>
          <Info className={`h-4 w-4 ${isSuccess ? "text-primary" : ""}`} />
          <AlertDescription className={isSuccess ? "text-primary" : ""}>{status}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          maxLength={150}
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Mail className="mr-2 h-4 w-4" />
            Send Reset Link
          </>
        )}
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;

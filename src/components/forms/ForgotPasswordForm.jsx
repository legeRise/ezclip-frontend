
import React, { useState } from "react";
import { requestPasswordReset } from "../../services/authService";
import StatusMessage from "../ui/StatusMessage";
import Button from "../ui/Button";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      await requestPasswordReset(email);
      setStatus("A password reset link has been sent.");
    } catch (err) {
      setStatus(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      {status && <StatusMessage message={status} type="info" />}
      <input
        type="email"
        maxLength={150}
        placeholder="Email"
        className="w-full p-3 border border-gray-300 rounded-xl mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button
        type="submit"
        text={loading ? "Sending..." : "Send Reset Link"}
        loading={loading}
        disabled={loading}
      />
    </form>
  );
};

export default ForgotPasswordForm;

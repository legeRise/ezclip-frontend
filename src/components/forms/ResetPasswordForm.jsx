import React, { useState } from "react";
import { confirmPasswordReset } from "../../services/authService";
import StatusMessage from "../ui/StatusMessage";
import Button from "../ui/Button";
import { useParams, useNavigate } from "react-router-dom";

const ResetPasswordForm = () => {
  const { uid, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    if (newPassword !== confirmPassword) {
      setStatus("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await confirmPasswordReset(uid, token, newPassword, confirmPassword);
      setStatus("Your password has been reset successfully. You can now log in.");
      setTimeout(() => navigate("/login", { replace: true }), 2000);
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
        type="password"
        maxLength={150}
        placeholder="New Password"
        className="w-full p-2 text-sm border border-gray-300 rounded-xl mb-2"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <input
        type="password"
        maxLength={150}
        placeholder="Confirm New Password"
        className="w-full p-2 text-sm border border-gray-300 rounded-xl mb-2"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <Button
        type="submit"
        text={loading ? "Resetting..." : "Reset Password"}
        loading={loading}
        disabled={loading}
      />
    </form>
  );
};

export default ResetPasswordForm;


import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";
import FormLayout from "../Layouts/FormLayout";

const ForgotPasswordPage = () => {
  const heading = <span className="text-base font-semibold">Forgot Password</span>;
  const description = <span className="text-sm text-gray-500">Enter your email to receive a password reset link.</span>;
  const form = <ForgotPasswordForm />;
  return (
    <FormLayout
      heading={heading}
      description={description}
      form={form}
    />
  );
};

export default ForgotPasswordPage;

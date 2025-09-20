import ResetPasswordForm from "../components/forms/ResetPasswordForm";
import FormLayout from "../Layouts/FormLayout";

const ResetPasswordPage = () => {
  const heading = <span className="text-base font-semibold">Reset Password</span>;
  const description = <span className="text-sm text-gray-500">Enter your new password below.</span>;
  const form = <ResetPasswordForm />;
  return (
    <FormLayout
      heading={heading}
      description={description}
      form={form}
    />
  );
};

export default ResetPasswordPage;

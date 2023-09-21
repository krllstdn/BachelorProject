import InputField from "./InputField";
import Button from "../buttons/Button";
import BlurredBackdrop from "../wrappers/BlurredBackdrop";
import ModalContainer from "../wrappers/ModalContainer";

function LoginPanel() {
  return (
    <BlurredBackdrop>
      <ModalContainer className="w-128 pr-10 pl-10 pt-6 pb-8">
        <h1 className="text-center text-2xl font-semibold mb-6">Login</h1>
        <InputField key="login" name="Login" text="Login: " />
        <InputField
          key="password"
          type="password"
          name="Password"
          text="Password: "
        />
        <div className="mt-7">
          <Button name="Login" />
        </div>
      </ModalContainer>
    </BlurredBackdrop>
  );
}

export default LoginPanel;

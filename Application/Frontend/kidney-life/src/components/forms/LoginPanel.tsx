import InputField from "./InputField";
import Button from "../buttons/Button";

function LoginPanel() {
  return (
    <div className="login-panel">
      <div
        className="absolute top-0 left-0 z-10 flex justify-center 
                 items-center bg-opacity-10 bg-primary backdrop-blur-sm 
                 h-screen w-screen"
      >
        <div
          className="relative w-128 bg-secondary pr-10 pl-10 pt-6 pb-8
                            rounded-md border-2 border-primary"
        >
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
        </div>
      </div>
    </div>
  );
}

export default LoginPanel;

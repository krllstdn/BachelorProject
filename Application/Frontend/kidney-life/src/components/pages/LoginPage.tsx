import LoginPanel from "../forms/LoginPanel";
import { useEffect } from "react";

function LoginPage() {
  useEffect(() => {
    document.title = "Login | KidneyLife";
  }, []);

  return (
    <div>
      <LoginPanel />
    </div>
  );
}

export default LoginPage;

import NavBar from "../layout/Navbar";
import InputField from "../forms/InputField";
import SelectField from "../forms/SelectField";
import { doctorSpecialization } from "../../helpers/constants";
import { useState } from "react";
import { SetterMap } from "../../helpers/usePatientData";
import Button from "../buttons/Button";

function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [hospital, setHospital] = useState("");

  const setters: SetterMap = {
    firstName: setFirstName,
    lastName: setLastName,
    email: setEmail,
    login: setLogin,
    password: setPassword,
    confirmPassword: setConfirmPassword,
    licenseNumber: setLicenseNumber,
    specialization: setSpecialization,
    hospital: setHospital,
  };

  const setByKey = (key: string, value: string) => {
    const setter = setters[key];
    if (setter) {
      setter(value);
    }
  };

  //   const handleInputChange = (key: string, value: string) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setByKey(name, value);
  };

  return (
    <div>
      <div className="navbar">
        <NavBar />
      </div>
      <div className="flex justify-center">
        <div className="w-1/2 p-12">
          <h1 className="text-center text-4xl font-semibold pb-6">Register</h1>
          <InputField
            text="First Name:"
            key="firstName"
            name="First Name"
            value={firstName}
            onChange={handleInputChange}
          />
          <InputField
            text="Last Name:"
            key="lastName"
            name="Last Name"
            value={lastName}
            onChange={handleInputChange}
          />
          <InputField
            text="Email:"
            key="email"
            name="Email"
            value={email}
            onChange={handleInputChange}
          />
          <InputField
            text="Login:"
            key="login"
            name="Login"
            value={login}
            onChange={handleInputChange}
          />
          <InputField
            text="Password:"
            key="password"
            name="Password"
            type="password"
            value={password}
            onChange={handleInputChange}
          />
          <InputField
            text="Confirm Password:"
            key="confirmPassword"
            name="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={handleInputChange}
          />
          <InputField
            text="Medical License Number:"
            key="licenseNumber"
            name="Medical License Number"
            value={licenseNumber}
            onChange={handleInputChange}
          />
          <SelectField
            text="Specialization:"
            key="specialization"
            name="Specialization"
            options={doctorSpecialization}
            value={specialization}
            onChange={handleInputChange}
          />
          <InputField
            text="Hospital:"
            key="hospital"
            name="Hospital"
            value={hospital}
            onChange={handleInputChange}
          />
          <div className="mt-7">
            <Button name="Register" onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

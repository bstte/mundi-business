// Signup.jsx
import React, { useState } from "react";
import EmailStep from "./EmailStep";
import OtpStep from "./OtpStep";
import DetailsStep from "./DetailsStep";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  switch (step) {
    case 1:
      return <EmailStep email={email} setEmail={setEmail} nextStep={nextStep} />;
    case 2:
      return (
        <OtpStep
          email={email}
          otp={otp}
          setOtp={setOtp}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 3:
      return (
        <DetailsStep
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          prevStep={prevStep}
        />
      );
    default:
      return <EmailStep email={email} setEmail={setEmail} nextStep={nextStep} />;
  }
};

export default Signup;

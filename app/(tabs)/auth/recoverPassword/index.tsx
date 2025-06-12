import { ReactNode, useState } from "react";
import RecoverAccountPhase1 from "./recoverAccountPhase1";
import RecoverAccountPhase2 from "./recoverAccountPhase2";
import RecoverAccountPhase3 from "./recoverAccountPhase3";

interface IRecoverAccountPhase1 {
  children: ReactNode;
}
const RecoverAccount = ({ children }: IRecoverAccountPhase1) => {
  const [email, setEmail] = useState("");
    const [step, setStep] = useState(1);

  return (
      <>
      {step === 1 && (
        <RecoverAccountPhase1
          getEmail={e => setEmail(e)}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <RecoverAccountPhase2
          email={email}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <RecoverAccountPhase3
          onBack={() => setStep(2)}
          onFinish={()=>setStep(1)}
        />
      )}
    </>
  );
};

export default RecoverAccount;

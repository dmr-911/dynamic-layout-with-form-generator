"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
// import Step1 from "./Step1";
// import Step2 from "./Step2";
// import Step3 from "./Step3";
import Sidebar from "./Sidebar";
import { form } from "./stepperFormData";

const Form = ({ step, restParams }) => {
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  // Load data from cookie if available
  useEffect(() => {
    const cookieData = JSON.parse(Cookie.get("formData") || "{}");
    if (cookieData) {
      setFormData(cookieData);
    }
  }, [step]);

  const handleNextStep = (newData) => {
    const updatedData = { ...formData, [`step${step}`]: newData };
    setFormData(updatedData);
    Cookie.set("formData", JSON.stringify(updatedData));
    router.push(`/form?step=${Number(step) + 1}`);
  };

  const handleSkipStep = () => {
    router.push(`/form?step=${Number(step) + 1}`);
  };

  const handleSubmit = async (newData) => {
    const updatedData = { ...formData, [`step${step}`]: newData };
    setFormData(updatedData);
    Cookie.set("formData", JSON.stringify(updatedData));
    setIsSubmitted(true);
  };

  const renderStep = () => {
    const currentStep = Number(step);

    // if (currentStep === 1) {
    //   return (
    //     <Step1 onNext={handleNextStep} formData={formData[`step1`] || {}} />
    //   );
    // } else if (currentStep === 2) {
    //   return (
    //     <Step2
    //       onNext={handleNextStep}
    //       formData={formData[`step2`] || {}}
    //       onSkip={handleSkipStep}
    //     />
    //   );
    // } else if (currentStep === 3) {
    //   return (
    //     <Step3
    //       onNext={handleNextStep}
    //       formData={formData[`step3`] || {}}
    //       onSubmit={handleSubmit}
    //     />
    //   );
    // } else {
    //   router.push("/form?step=1");
    // }

    return null;
  };

  const steps = form.map((item) => ({ step: item.step, label: item.label }));
  const currentStepContent = form.find(
    (item) => item.step === Number(step)
  )?.content;

  return (
    <>
      <div className="flex px-4">
        <Sidebar steps={steps} step={step} formData={formData} />
        <div className="w-3/4 p-4">
          {renderStep()}
          <pre className="dark:text-white">
            {isSubmitted ? JSON.stringify(formData, null, 2) : null}
          </pre>
        </div>
        <div
          className="w-1/4 p-4"
          dangerouslySetInnerHTML={{ __html: currentStepContent || "" }}
        />
      </div>
    </>
  );
};

export default Form;

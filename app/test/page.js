// "use client";
// import React, { useEffect, useState } from "react";
// import DynamicForm from "@/R&D/GridDynamicLayout";
// import { form } from "@/R&D/StepperForm/stepperFormData";
// import Cookie from "js-cookie";
// import Sidebar from "@/R&D/StepperForm/Sidebar";

// const Test = () => {
//   const [formData, setFormData] = useState({});
//   const [currentStep, setCurrentStep] = useState(0);
//   const step = currentStep + 1;
//   const isLastStep = currentStep === form.length - 1;

//   // Load data from cookie if available
//   useEffect(() => {
//     const cookieData = JSON.parse(Cookie.get("formData") || "{}");
//     if (cookieData) {
//       setFormData(cookieData);
//     }
//   }, [step]);

//   const handleNext = (newData) => {
//     if (!isLastStep) {
//       setCurrentStep(currentStep + 1);
//     }
//     const updatedData = { ...formData, [`step${step}`]: newData };
//     setFormData(updatedData);
//     Cookie.set("formData", JSON.stringify(updatedData));
//     router.push(`/form?step=${Number(step) + 1}`);
//   };

//   const handleBack = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleSubmit = async (newData) => {
//     const updatedData = { ...formData, [`step${step}`]: newData };
//     setFormData(updatedData);
//     console.log("submitted values", updatedData);
//     Cookie.set("formData", JSON.stringify(updatedData));
//   };

//   const steps = form.map((item) => ({ step: item.step, label: item.label }));

//   return (
//     <div>
//       <div className="stepper-form-container flex">
//         <Sidebar steps={steps} step={currentStep + 1} formData={formData} />
//         <div className="form-container">
//           <DynamicForm
//             dynamicLayoutData={form[currentStep].form}
//             onSubmit={isLastStep ? handleSubmit : handleNext}
//             currentStep={currentStep}
//           />
//         </div>
//         <div className="content-container">
//           <div
//             dangerouslySetInnerHTML={{
//               __html: form[currentStep].content,
//             }}
//           />
//         </div>
//         <div className="navigation-buttons">
//           {currentStep > 0 && (
//             <button type="button" onClick={handleBack}>
//               Back
//             </button>
//           )}
//           <button type="button" onClick={handleNext}>
//             {isLastStep ? "Submit" : "Next"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Test;

"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DynamicForm from "@/R&D/GridDynamicLayout";
import { form } from "@/R&D/StepperForm/stepperFormData";
import Cookie from "js-cookie";
import Sidebar from "@/R&D/StepperForm/Sidebar";

const Test = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryStep = searchParams.get("step");

  const initialStep = queryStep ? parseInt(queryStep, 10) - 1 : 0;
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(initialStep);

  const step = currentStep + 1;
  const isLastStep = currentStep === form.length - 1;

  // Load data from cookie if available
  useEffect(() => {
    const cookieData = JSON.parse(Cookie.get("formData") || "{}");
    if (cookieData) {
      setFormData(cookieData);
    }
  }, []);

  // Update step based on query parameter
  useEffect(() => {
    if (queryStep) {
      setCurrentStep(parseInt(queryStep, 10) - 1);
    }
  }, [queryStep]);

  const handleNext = (newData) => {
    const updatedData = { ...formData, [`step${step}`]: newData };
    setFormData(updatedData);
    Cookie.set("formData", JSON.stringify(updatedData));

    if (!isLastStep) {
      router.push(`/test?step=${step + 1}`);
    } else {
      handleSubmit(newData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      router.push(`/test?step=${step - 1}`);
    }
  };

  const handleSubmit = async (newData) => {
    const updatedData = { ...formData, [`step${step}`]: newData };
    setFormData(updatedData);
    Cookie.set("formData", JSON.stringify(updatedData));
    console.log("submitted values", updatedData);
    // You can add your submission logic here (e.g., API call)
  };

  const steps = form.map((item) => ({ step: item.step, label: item.label }));

  return (
    <div>
      <div className="stepper-form-container flex">
        <Sidebar steps={steps} step={currentStep + 1} formData={formData} />
        <div className="form-container">
          <DynamicForm
            dynamicLayoutData={form[currentStep].form}
            onSubmit={handleNext}
            currentStep={currentStep}
            initialValues={formData[`step${step}`] || {}}
          />
        </div>
        <div className="content-container">
          <div
            dangerouslySetInnerHTML={{
              __html: form[currentStep].content,
            }}
          />
        </div>
        <div className="navigation-buttons">
          {currentStep > 0 && (
            <button type="button" onClick={handleBack}>
              Back
            </button>
          )}
          <button
            type="button"
            onClick={() => handleNext(formData[`step${step}`])}
          >
            {isLastStep ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Test;

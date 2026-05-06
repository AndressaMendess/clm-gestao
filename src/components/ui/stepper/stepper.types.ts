export type StepperStatus = "complete" | "current" | "upcoming";

export type StepperItem = {
  id: string;
  label: string;
};

export type StepperProps = {
  steps: StepperItem[];
  currentStep: number;
  className?: string;
  ariaLabel?: string;
};


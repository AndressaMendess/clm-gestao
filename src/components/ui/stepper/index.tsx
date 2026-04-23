import { Check } from "lucide-react";

import { cn } from "@/src/lib/utils";

export type StepperStatus = "complete" | "current" | "upcoming";

type StepperItem = {
  id: string;
  label: string;
};

type StepperProps = {
  steps: StepperItem[];
  currentStep: number;
  className?: string;
  ariaLabel?: string;
};

function getStepStatus(stepNumber: number, currentStep: number): StepperStatus {
  if (stepNumber < currentStep) {
    return "complete";
  }

  if (stepNumber === currentStep) {
    return "current";
  }

  return "upcoming";
}

export function Stepper({ steps, currentStep, className, ariaLabel = "Progresso" }: StepperProps) {
  return (
    <ol className={cn("stepper", className)} aria-label={ariaLabel}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const status = getStepStatus(stepNumber, currentStep);
        const isComplete = status === "complete";
        const hasConnector = index < steps.length - 1;

        return (
          <li key={step.id} className="stepper__item">
            <div className="stepper__indicator-row">
              <span className={cn("stepper__indicator", `stepper__indicator--${status}`)} aria-hidden="true">
                {isComplete ? <Check /> : stepNumber}
              </span>
              {hasConnector ? (
                <span
                  className={cn(
                    "stepper__connector",
                    isComplete ? "stepper__connector--complete" : "stepper__connector--upcoming"
                  )}
                  aria-hidden="true"
                />
              ) : null}
            </div>
            <span className={cn("stepper__label", status === "current" && "stepper__label--current")}>{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
}

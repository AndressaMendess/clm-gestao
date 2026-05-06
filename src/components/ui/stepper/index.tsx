import { Check } from "lucide-react";

import { cn } from "@/src/lib/utils";
import { stepperConnectorStyles, stepperIndicatorStyles, stepperStyles } from "./stepper.styles";
import type { StepperProps, StepperStatus } from "./stepper.types";

export type { StepperItem, StepperProps, StepperStatus } from "./stepper.types";

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
    <ol className={cn(stepperStyles(), className)} aria-label={ariaLabel}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const status = getStepStatus(stepNumber, currentStep);
        const isComplete = status === "complete";
        const hasConnector = index < steps.length - 1;

        return (
          <li key={step.id} className="stepper__item">
            <div className="stepper__indicator-row">
              <span className={stepperIndicatorStyles({ status })} aria-hidden="true">
                {isComplete ? <Check /> : stepNumber}
              </span>
              {hasConnector ? (
                <span
                  className={stepperConnectorStyles({ status: isComplete ? "complete" : "upcoming" })}
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

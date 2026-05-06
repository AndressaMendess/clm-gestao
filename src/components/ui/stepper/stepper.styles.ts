import { cva } from "class-variance-authority";

export const stepperStyles = cva("stepper");

export const stepperIndicatorStyles = cva("stepper__indicator", {
  variants: {
    status: {
      complete: "stepper__indicator--complete",
      current: "stepper__indicator--current",
      upcoming: "stepper__indicator--upcoming"
    }
  }
});

export const stepperConnectorStyles = cva("stepper__connector", {
  variants: {
    status: {
      complete: "stepper__connector--complete",
      upcoming: "stepper__connector--upcoming"
    }
  }
});


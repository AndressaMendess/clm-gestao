export type ExtractionConfidence = "high" | "medium" | "low";

export type ConfidenceBadgeProps = {
  level: ExtractionConfidence;
  source?: string;
};


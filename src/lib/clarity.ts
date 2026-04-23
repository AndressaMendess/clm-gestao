const CLARITY_SCRIPT_ID = "clarity-tracker-script";

type ClarityFunction = ((...args: unknown[]) => void) & { q?: unknown[][] };

export function initializeClarity(projectId: string | undefined): void {
  if (!projectId || typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  if (document.getElementById(CLARITY_SCRIPT_ID)) {
    return;
  }

  const clarityWindow = window as Window & { clarity?: ClarityFunction };
  if (!clarityWindow.clarity) {
    const clarityQueue: ClarityFunction = (...args: unknown[]) => {
      clarityQueue.q = clarityQueue.q || [];
      clarityQueue.q.push(args);
    };
    clarityWindow.clarity = clarityQueue;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${projectId}`;
  script.id = CLARITY_SCRIPT_ID;

  const firstScript = document.getElementsByTagName("script")[0];
  firstScript?.parentNode?.insertBefore(script, firstScript);
}

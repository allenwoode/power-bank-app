import { createContext, useContext } from "react";

interface OnboardingContextType {
  hasSeenIntro: boolean | null;
  setHasSeenIntro: (value: boolean) => void;
}

export const OnboardingContext = createContext<OnboardingContextType>({
  hasSeenIntro: null,
  setHasSeenIntro: () => {},
});

export const useOnboarding = () => useContext(OnboardingContext);

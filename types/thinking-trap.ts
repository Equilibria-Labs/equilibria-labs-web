export type ThinkingTrap = {
  id: string;
  name: string;
  description: string;
  question: string;
  unbalancedExample: string;
  balancedExample: string;
  icon: React.ComponentType<{ className?: string }>;
};

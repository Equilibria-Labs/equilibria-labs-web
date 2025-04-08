export type ThinkingTrapId =
  | 'catastrophizing'
  | 'fortune-telling'
  | 'black-and-white'
  | 'mind-reading'
  | 'over-generalizing'
  | 'negative-filter'
  | 'should-statements'
  | 'emotional-reasoning'
  | 'disqualifying-the-positive'
  | 'labelling'
  | 'personalisation'
  | 'blame';

export type ThinkingTrap = {
  id: ThinkingTrapId;
  name: string;
  description: string;
  question: string;
  unbalancedExample: string;
  balancedExample: string;
  icon: React.ComponentType<{ className?: string }>;
};

export const getTimeOfDayGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 3 && hour < 12) return 'this morning';
  if (hour >= 12 && hour < 18) return 'this afternoon';
  if (hour >= 18 && hour < 23) return 'this evening';
  return 'tonight';
};

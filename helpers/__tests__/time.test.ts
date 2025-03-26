import { getTimeOfDayGreeting } from '../time';

describe('getTimeOfDayGreeting', () => {
  const mockDate = (hours: number) => {
    // Mock the Date object to return a specific hour
    const mockDate = new Date();
    jest.spyOn(mockDate, 'getHours').mockReturnValue(hours);
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('returns "this morning" between 3:00 and 11:59', () => {
    mockDate(8);
    expect(getTimeOfDayGreeting()).toBe('this morning');
  });

  test('returns "this afternoon" between 12:00 and 17:59', () => {
    mockDate(15);
    expect(getTimeOfDayGreeting()).toBe('this afternoon');
  });

  test('returns "this evening" between 18:00 and 22:59', () => {
    mockDate(20);
    expect(getTimeOfDayGreeting()).toBe('this evening');
  });

  test('returns "tonight" between 23:00 and 2:59', () => {
    mockDate(1);
    expect(getTimeOfDayGreeting()).toBe('tonight');

    mockDate(23);
    expect(getTimeOfDayGreeting()).toBe('tonight');
  });
});

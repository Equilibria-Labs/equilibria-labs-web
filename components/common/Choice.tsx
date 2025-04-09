import { RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ButtonText } from '@/components/common/Typography';
import {
  Check,
  Clock1,
  Clock2,
  Clock3,
  Clock4,
  Clock5,
  Clock6,
  Clock7,
  Clock8,
  Clock9,
  Clock10,
  Clock11,
  Clock12,
  ClockAlert,
  Calendar,
  Calendar1,
  CalendarCheck,
  CalendarCheck2,
  CalendarClock,
  CalendarDays,
  CalendarHeart,
  CalendarMinus,
  CalendarOff,
  CalendarPlus,
  CalendarRange,
  CalendarSearch,
  CalendarX,
  CalendarX2,
  Cloud,
  CloudCog,
  CloudDrizzle,
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudMoon,
  CloudOff,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
  Signal,
  SignalHigh,
  SignalLow,
  SignalMedium,
  SignalZero,
  Angry,
  Annoyed,
  Smile,
  Laugh,
  Meh,
  Frown,
  BedSingle,
  X,
} from 'lucide-react';
import { Choice as ChoiceType, ChoiceValue } from '@/types';

// Blank icon component that renders an empty space
const BlankIcon = () => <div className='w-5 h-5' aria-hidden='true' />;

// Define the specific icons we want to allow
const CHOICE_ICONS = {
  // Special icons
  blank: BlankIcon,

  // Bed icons
  bedSingle: BedSingle,

  // Calendar icons
  calendar: Calendar,
  calendar1: Calendar1,
  calendarCheck: CalendarCheck,
  calendarCheck2: CalendarCheck2,
  calendarClock: CalendarClock,
  calendarDays: CalendarDays,
  calendarHeart: CalendarHeart,
  calendarMinus: CalendarMinus,
  calendarOff: CalendarOff,
  calendarPlus: CalendarPlus,
  calendarRange: CalendarRange,
  calendarSearch: CalendarSearch,
  calendarX: CalendarX,
  calendarX2: CalendarX2,

  // Clock icons
  clock1: Clock1,
  clock2: Clock2,
  clock3: Clock3,
  clock4: Clock4,
  clock5: Clock5,
  clock6: Clock6,
  clock7: Clock7,
  clock8: Clock8,
  clock9: Clock9,
  clock10: Clock10,
  clock11: Clock11,
  clock12: Clock12,
  clockAlert: ClockAlert,
  // Weather icons
  cloud: Cloud,
  cloudCog: CloudCog,
  cloudDrizzle: CloudDrizzle,
  cloudFog: CloudFog,
  cloudHail: CloudHail,
  cloudLightning: CloudLightning,
  cloudMoon: CloudMoon,
  cloudOff: CloudOff,
  cloudRain: CloudRain,
  cloudSnow: CloudSnow,
  cloudSun: CloudSun,
  sun: Sun,

  // Signal icons
  signal: Signal,
  signalHigh: SignalHigh,
  signalMedium: SignalMedium,
  signalLow: SignalLow,
  signalZero: SignalZero,

  // Emotion icons
  angry: Angry,
  annoyed: Annoyed,
  smile: Smile,
  laugh: Laugh,
  meh: Meh,
  frown: Frown,

  // Check and cross icons
  check: Check,
  x: X,
} as const;

export type ChoiceIconName = keyof typeof CHOICE_ICONS;

interface ChoiceProps {
  choice: ChoiceType;
  onChange: (value: ChoiceValue) => void;
  next: () => void;
  type: 'radio' | 'checkbox';
  checked?: boolean;
  iconName?: ChoiceIconName;
}

export function Choice({
  choice,
  onChange,
  next,
  type,
  checked,
  iconName,
}: ChoiceProps) {
  const handleClick = async () => {
    if (type === 'checkbox') {
      await onChange(choice.value);
    } else if (type === 'radio') {
      await onChange(choice.value);
      next();
    }
  };

  // Convert the choice value to a string for the RadioGroupItem
  const radioValue =
    choice.value.stringValue ??
    (choice.value.numericValue !== undefined
      ? String(choice.value.numericValue)
      : '');

  const IconComponent = iconName ? CHOICE_ICONS[iconName] : null;

  return (
    <div
      key={choice.choiceId}
      className={`relative flex items-center justify-between rounded-xl p-4 cursor-pointer transition-colors ${
        checked
          ? 'bg-primary/75 text-primary-foreground'
          : 'bg-secondary/75 text-secondary-foreground hover:bg-secondary hover:bg-opacity-50'
      }`}
    >
      <div className='absolute inset-0 z-10' onClick={handleClick} />
      {type === 'radio' ? (
        <RadioGroupItem
          value={radioValue}
          id={choice.choiceId}
          className='sr-only'
        />
      ) : (
        <Checkbox
          id={choice.choiceId}
          checked={checked}
          onCheckedChange={() => onChange(choice.value)}
          className='hidden'
        />
      )}
      <div className='flex items-center gap-3 flex-1'>
        {IconComponent && (
          <IconComponent className='w-5 h-5' aria-hidden='true' />
        )}
        <Label htmlFor={choice.choiceId} className='cursor-pointer text-lg'>
          <ButtonText>{choice.text}</ButtonText>
        </Label>
      </div>
      {checked && <Check className='w-6 h-6 text-white' aria-hidden='true' />}
    </div>
  );
}

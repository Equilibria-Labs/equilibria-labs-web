import React from 'react';

interface EquilibriaIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function EquilibriaIcon({
  className,
  width = 24,
  height = 24,
}: EquilibriaIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 1024 1024'
      preserveAspectRatio='xMidYMid meet'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g clipPath='url(#equilibria-clip)'>
        <path fill='url(#equilibria-grad-b)' d='M0 0h1024v765H0z' />
        <circle
          cx='512.746'
          cy='508.268'
          r='169.423'
          fill='url(#equilibria-grad-c)'
        />
        <path
          d='M-16.42 613.505s155.242-38.811 256.747-29.855c113.084 9.978 171.607 54.445 285.107 56.723 135.336 2.717 204.976-65.679 340.339-65.679 105.982 0 174.647 29.563 174.647 29.563v520.953H-16.42V613.505Z'
          fill='url(#equilibria-grad-d)'
        />
        <path
          d='M-11.942 692.328s105.983-58.216 207.487-49.26c113.085 9.978 220.867 73.85 334.368 76.128 135.335 2.717 209.453-36.116 344.816-36.116 105.982 0 170.171 54.029 170.171 54.029v466.931H-11.942V692.328Z'
          fill='url(#equilibria-grad-e)'
        />
        <path
          d='M-8.96 765.761s98.52-38.81 200.024-29.854c140.315 12.381 219.373 108.182 332.874 110.46 135.335 2.717 123.896-52.244 313.471-43.288 105.864 5.001 195.541 43.288 195.541 43.288l14.93 457.413H-8.96V765.761Z'
          fill='url(#equilibria-grad-f)'
        />
        <path
          d='M-16.384 883.898s-4.787-59.437 97.025-55.23c152.257 6.291 183.604 95.533 413.482 95.533 135.362 0 162.705-38.81 352.279-29.854 105.864 5.002 186.588 55.23 186.588 55.23l7.47 472.343H-16.384V883.898Z'
          fill='#324242'
        />
      </g>
      <defs>
        <linearGradient
          id='equilibria-grad-b'
          x1='512'
          y1='0'
          x2='512'
          y2='765'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#F8D247' />
          <stop offset='1' stopColor='#FF6F00' />
        </linearGradient>
        <linearGradient
          id='equilibria-grad-c'
          x1='512.746'
          y1='338.845'
          x2='512.746'
          y2='677.691'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='.25' stopColor='#F8D247' />
          <stop offset='.5' stopColor='#FDB74E' />
          <stop offset='.75' stopColor='#FF6F00' />
        </linearGradient>
        <linearGradient
          id='equilibria-grad-d'
          x1='-16.42'
          y1='807.557'
          x2='1040.42'
          y2='819.499'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#40E0D0' />
          <stop offset='1' stopColor='#38A08A' />
        </linearGradient>
        <linearGradient
          id='equilibria-grad-e'
          x1='1044.9'
          y1='765.761'
          x2='-11.942'
          y2='783.674'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#38A08A' />
          <stop offset='1' stopColor='#2E6246' />
        </linearGradient>
        <linearGradient
          id='equilibria-grad-f'
          x1='1047.88'
          y1='885.178'
          x2='-8.956'
          y2='873.236'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#2E6246' />
          <stop offset='1' stopColor='#324242' />
        </linearGradient>
        <clipPath id='equilibria-clip'>
          <path
            d='M0 512C0 229.23 229.23 0 512 0s512 229.23 512 512-229.23 512-512 512S0 794.77 0 512Z'
            fill='#fff'
          />
        </clipPath>
      </defs>
    </svg>
  );
}

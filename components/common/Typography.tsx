import React from 'react';

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
};

export const Title: React.FC<TypographyProps> = ({
  children,
  className = '',
}) => (
  <h1 className={`font-title text-title font-semibold ${className}`}>
    {children}
  </h1>
);

export const HeadingLarge: React.FC<TypographyProps> = ({
  children,
  className = '',
}) => (
  <h2 className={`font-heading text-heading-lg ${className}`}>{children}</h2>
);

export const Heading: React.FC<TypographyProps> = ({
  children,
  className = '',
}) => <h3 className={`font-heading text-heading ${className}`}>{children}</h3>;

export const HeadingSmall: React.FC<TypographyProps> = ({
  children,
  className = '',
}) => (
  <h4 className={`font-body text-heading-sm font-bold ${className}`}>
    {children}
  </h4>
);

export const ButtonText: React.FC<TypographyProps> = ({
  children,
  className = '',
}) => (
  <label className={`font-body text-body font-bold ${className}`}>
    {children}
  </label>
);

export const LabelText: React.FC<TypographyProps> = ({
  children,
  className = '',
}) => (
  <label className={`font-label text-label ${className}`}>{children}</label>
);

export const LabelTextBold: React.FC<TypographyProps> = ({
  children,
  className = '',
}) => (
  <label className={`font-label text-label-bold ${className}`}>
    {children}
  </label>
);

export const BodyText: React.FC<TypographyProps> = ({
  children,
  className = '',
}) => <p className={`font-body text-body ${className}`}>{children}</p>;

export const BodyTextLarge: React.FC<TypographyProps> = ({
  children,
  className = '',
}) => <p className={`font-body text-heading ${className}`}>{children}</p>;

export const InputText: React.FC<TypographyProps> = ({
  children,
  className = '',
}) => <span className={`font-input text-input ${className}`}>{children}</span>;

export const SmallText: React.FC<TypographyProps> = ({
  children,
  className = '',
}) => (
  <small className={`font-small text-small ${className}`}>{children}</small>
);

export interface NavLinkProps {
    text: string;
    href?: string;
  }
  
  export interface InputFieldProps {
    label: string;
    type?: string;
    hasIcon?: boolean;
    iconSrc?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    id?: string;
  }
  
  export interface DropdownProps {
    label: string;
    value: string;
    options: string[];
    onChange?: (value: string) => void;
  }
  
  export interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    type?: 'button' | 'submit';
    onClick?: () => void;
    className?: string;
  }

  export interface FileUploadProps {
    label: string;
  }

  export interface SocialIconProps {
    src: string;
    alt: string;
  }

  export interface PolicyCardProps {
    icon: string;
    title: string;
    points: string[];
  }

  export interface PricingPlanProps {
    title: string;
    price: string;
    features: string[];
    buttonText: string;
  }
  
  export interface NavigationItemProps {
    label: string;
  }

  
export interface NewsletterFormProps {
  onSubmit: (email: string) => void;
}
export interface PricingFooterLinkProps {
  label: string;
  href: string;
}
export interface PaymentMethodProps {
  title: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export interface AdvantageItemProps {
  text: string;
}

export interface TestimonialProps {
  text: string;
  author: string;
}

export interface HowItWorksStepProps {
  number: string;
  title: string;
  description: string;
}

export interface FeatureCardProps {
  imageSrc: string;
  title: string;
  description: string;
}
export interface InputFieldProps {
  label: string;
  className?: string;
}

export interface SearchBarProps {
  placeholder: string;
  onSearch: (value: string) => void;
}
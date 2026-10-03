import {
  Menu,
  X,
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  Clock,
  ExternalLink,
  Check,
  type LucideProps,
} from "lucide-react";

// Standard UI icons are thin wrappers around lucide-react, so the whole system
// uses a single icon set. Original names and default sizes are preserved so
// existing call sites keep working unchanged.
//
// Note: lucide-react no longer ships brand/social logos, so the Facebook,
// Instagram, YouTube and LinkedIn marks below remain as small custom SVGs.

interface IconProps {
  size?: number;
}

export function FacebookIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function InstagramIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function YoutubeIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  );
}

export function LinkedinIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function MenuIcon({ size = 24, ...props }: LucideProps) {
  return <Menu size={size} {...props} />;
}

export function CloseIcon({ size = 24, ...props }: LucideProps) {
  return <X size={size} {...props} />;
}

export function ArrowRightIcon({ size = 16, ...props }: LucideProps) {
  return <ArrowRight size={size} {...props} />;
}

export function MapPinIcon({ size = 20, ...props }: LucideProps) {
  return <MapPin size={size} {...props} />;
}

export function MailIcon({ size = 20, ...props }: LucideProps) {
  return <Mail size={size} {...props} />;
}

export function PhoneIcon({ size = 20, ...props }: LucideProps) {
  return <Phone size={size} {...props} />;
}

export function ClockIcon({ size = 20, ...props }: LucideProps) {
  return <Clock size={size} {...props} />;
}

export function ExternalLinkIcon({ size = 14, ...props }: LucideProps) {
  return <ExternalLink size={size} {...props} />;
}

export function CheckIcon({ size = 24, ...props }: LucideProps) {
  return <Check size={size} {...props} />;
}

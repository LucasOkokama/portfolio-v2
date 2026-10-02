import type { IIconName } from './icons.type';

export interface ILocalizedText {
  pt: string;
  en: string;
}

export type AvailabilityStatus = 'available' | 'unavailable';

export interface IContactLink {
  icon: IIconName;
  website: ILocalizedText;
  href: string;
  label: ILocalizedText;
}

export interface ISectionProfile {
  name: string;
  role: ILocalizedText;
  clock: {
    city: string;
    timezone: string;
  };
  contacts: {
    links: IContactLink[];
  };
  highlights: ILocalizedText[];
  availability: {
    status: AvailabilityStatus;
    available: ILocalizedText;
    unavailable: ILocalizedText;
  };
  biography: {
    title: ILocalizedText;
    description: ILocalizedText;
  };
}

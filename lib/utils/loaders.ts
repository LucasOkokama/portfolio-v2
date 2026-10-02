import profileData from '@/contents/profile.json';
import tecnologiesData from '@/contents/technologies.json';
import type { ISectionProfile } from '@/types/profile.type';
import type { ISectionTechnology } from '@/types/technologies.type';

// DTL --> REMOVE "as" IN THE FUTURE
export const profile = profileData as ISectionProfile;
export const technologies = tecnologiesData as ISectionTechnology;

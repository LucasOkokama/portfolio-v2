import profileData from '@/contents/profile.json';
import type { IProfile } from '@/types/contents.type';

// DTL --> REMOVE "as" IN THE FUTURE
export const profile = profileData as IProfile;

import aboutMeData from '@/contents/aboutMe.json';
import technologiesData from '@/contents/technologies.json';
import { sectionAboutMeSchema } from '@/schemas/zod/aboutme';
import { sectionTechnologySchema } from '@/schemas/zod/technologies';

export const aboutMe = sectionAboutMeSchema.parse(aboutMeData);
export const technologies = sectionTechnologySchema.parse(technologiesData);

import aboutMeData from '@/contents/aboutMe.json';
import projectsData from '@/contents/projects.json';
import technologiesData from '@/contents/technologies.json';
import { sectionAboutMeSchema } from '@/schemas/zod/aboutme';
import { sectionProjectsSchema } from '@/schemas/zod/projects';
import { sectionTechnologySchema } from '@/schemas/zod/technologies';

export const aboutMe = sectionAboutMeSchema.parse(aboutMeData);
export const technologies = sectionTechnologySchema.parse(technologiesData);
export const projects = sectionProjectsSchema.parse(projectsData);

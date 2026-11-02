import aboutMeData from '@/contents/aboutMe.json';
import projectsData from '@/contents/projects.json';
import technologiesData from '@/contents/technologies.json';
import { sectionAboutMeSchema } from '@/schemas/zod/aboutme.schema';
import { sectionProjectsSchema } from '@/schemas/zod/projects.schema';
import { sectionTechnologySchema } from '@/schemas/zod/technologies.schema';

export const aboutMe = sectionAboutMeSchema.parse(aboutMeData);
export const technologies = sectionTechnologySchema.parse(technologiesData);
export const projects = sectionProjectsSchema.parse(projectsData);

import { ResumeExperience } from "./resume-experience.interface";

export interface Resume {
  firstName: string;
  lastName: string;
  title?: string;
  backgroundImageUrl?: string;
  phoneNumber?: string;
  email: string;
  address: string;
  experiences: ResumeExperience[];
  summary: string;
  linkedin: string;
}
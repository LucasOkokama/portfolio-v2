import type { IIconName } from './icons.type';
import type { ILocalizedText } from './profile.type';

export interface ITechnologyGroup {
  icon: IIconName;
  title: ILocalizedText;
  description: ILocalizedText;
  techs: {
    label: string;
    icon: IIconName;
  }[];
}

export interface ISectionTechnology {
  sectionName: ILocalizedText;
  technologyGroups: ITechnologyGroup[];
}

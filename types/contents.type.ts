export interface ILocalizedText {
  pt: string;
  en: string;
}

export interface IProfile {
  name: string;
  role: ILocalizedText;
  contact: {
    curriculum: ILocalizedText;
  };
}

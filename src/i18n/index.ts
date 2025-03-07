import i18n from 'i18next';
import numeral from 'numeral';
import {initReactI18next} from 'react-i18next';
import english from './languages/en.json';

const numberFormatter = (value: any, format?: string) =>
  numeral(value).format(format);

const initalizeI18Next = () => {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    interpolation: {
      format: (value: any, format: string | undefined) =>
        numberFormatter(value, format),
    },
    lng: 'en',
    react: {
      useSuspense: false,
    },
    resources: {
      en: {
        translation: english,
      },
    },
  });
};

export default {initalizeI18Next};

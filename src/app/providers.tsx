'use client';

import { IntlProvider } from 'react-intl';
import { getLanguage, registerLocale, getLocale } from '@/i18n';
import EN_US_LOCALE from '@/i18n/locales/en-US.json';
import ZH_CN_LOCALE from '@/i18n/locales/zh-CN.json';
import Header from '@/layout/header';
import Footer from '@/layout/footer';

registerLocale('en-US', EN_US_LOCALE);
registerLocale('zh-CN', ZH_CN_LOCALE);

export function Providers({ children }: { children: React.ReactNode }) {
  const lang = getLanguage();
  const messages = getLocale(lang);

  return (
    <IntlProvider locale={lang} messages={messages}>
      <Header />
      {children}
      <Footer />
    </IntlProvider>
  );
}
'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'tr' | 'de';

const LangContext = createContext<{ lang: Lang; toggleLang: () => void; otherLangLabel: string }>({
  lang: 'tr',
  toggleLang: () => {},
  otherLangLabel: 'DE',
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('tr');

  useEffect(() => {
    const saved = window.localStorage.getItem('ihs-lang');
    if (saved === 'tr' || saved === 'de') setLang(saved);
  }, []);

  const toggleLang = () =>
    setLang((l) => {
      const next = l === 'tr' ? 'de' : 'tr';
      window.localStorage.setItem('ihs-lang', next);
      return next;
    });

  return (
    <LangContext.Provider value={{ lang, toggleLang, otherLangLabel: lang === 'tr' ? 'DE' : 'TR' }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);

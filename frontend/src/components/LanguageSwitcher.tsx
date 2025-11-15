"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const path = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(path);
  };

  return (
    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/10">
      <button
        onClick={() => switchLocale('en')}
        className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
          locale === 'en'
            ? 'bg-[#00CED1] text-black'
            : 'text-white/60 hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('tr')}
        className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
          locale === 'tr'
            ? 'bg-[#00CED1] text-black'
            : 'text-white/60 hover:text-white'
        }`}
      >
        TR
      </button>
    </div>
  );
}

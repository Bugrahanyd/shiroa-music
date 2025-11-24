'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { useLanguage } from '@/lib/language-context';
import { 
  Home, Heart, Music, ShoppingCart, Mic, Palette
} from 'lucide-react';

interface ThemeStory {
  id: string;
  name: string;
  color: string;
  stories: {
    en: string;
    tr: string;
  };
}

const themeStories: ThemeStory[] = [
  {
    id: 'dark',
    name: 'Night',
    color: 'bg-gradient-to-br from-gray-900 via-slate-800 to-black',
    stories: {
      en: 'In the depths of midnight, when the world sleeps and dreams take flight, the Night theme emerges as a sanctuary for creators. This is the realm where shadows dance with silver moonlight, where the darkness becomes a canvas for infinite possibilities. Born from the quiet hours when inspiration strikes hardest, Night embodies the solitude of creation—those precious moments when melodies are born from silence and rhythms emerge from the heartbeat of the night. Every gradient whispers secrets of the cosmos, every shadow tells stories of dreams that come alive when daylight fades. This theme represents the profound beauty found in darkness, the mysterious energy that flows through artists when the world around them grows still. It is here, in this digital twilight, where the most authentic music is born.',
      tr: 'Gece yarısının derinliklerinde, dünya uyurken ve rüyalar kanat çırparken, Gece teması yaratıcılar için bir sığınak olarak ortaya çıkar. Bu, gölgelerin gümüş ay ışığıyla dans ettiği, karanlığın sonsuz olasılıkların tuvali haline geldiği alemdir. İlhamın en sert vurduğu sessiz saatlerden doğan Gece, yaratımın yalnızlığını temsil eder—melodilerin sessizlikten doğduğu ve ritmlerin gecenin kalp atışından çıktığı o değerli anlar. Her gradyan kozmosun sırlarını fısıldar, her gölge gün ışığı solarken canlanmaya başlayan rüyaların hikayelerini anlatır. Bu tema, karanlıkta bulunan derin güzelliği, çevreleri sessizleştiğinde sanatçıların içinden akan gizemli enerjiyi temsil eder. İşte burada, bu dijital alacakaranlıkta, en otantik müzik doğar.'
    }
  },
  {
    id: 'light',
    name: 'Day',
    color: 'bg-gradient-to-br from-sky-400 via-blue-200 to-white',
    stories: {
      en: 'As dawn breaks and sunlight floods the world with golden warmth, the Day theme celebrates the energy of new beginnings and endless possibilities. This is the realm of clarity and focus, where bright blues merge with pristine whites to create a canvas of pure inspiration. Day represents the optimism of morning coffee conversations, the clarity of focused creative sessions, and the joy of collaborative music-making. It embodies transparency, openness, and the beautiful vulnerability of sharing your art with the world. Every element radiates with the promise of productivity, every interaction sparkles with the potential for breakthrough moments. This theme captures the essence of those perfect studio sessions when everything clicks, when melodies flow like sunlight through windows, and when the creative process feels as natural as breathing. It is the digital embodiment of hope, progress, and the endless pursuit of musical perfection.',
      tr: 'Şafak sökerken ve güneş ışığı dünyayı altın sıcaklığıyla kaplarken, Gün teması yeni başlangıçların enerjisini ve sonsuz olasılıkları kutlar. Bu, berraklık ve odaklanmanın alanıdır; parlak mavilerin bembeyaz renklerle birleşerek saf ilhamın tuvalini yarattığı yer. Gün, sabah kahvesi sohbetlerinin iyimserliğini, odaklanmış yaratıcı seansların berraklığını ve işbirlikçi müzik yapmanın neşesini temsil eder. Şeffaflığı, açıklığı ve sanatınızı dünyayla paylaşmanın güzel kırılganlığını somutlaştırır. Her element verimlilik vadiyle ışıldar, her etkileşim çığır açıcı anların potansiyeliyle parıldar. Bu tema, her şeyin yerli yerine oturduğu, melodilerin pencerelerden süzülen güneş ışığı gibi aktığı ve yaratıcı sürecin nefes almak kadar doğal hissedildiği o mükemmel stüdyo seanslarının özünü yakalar.'
    }
  },
  {
    id: 'japanese',
    name: 'Sakura',
    color: 'bg-gradient-to-br from-pink-300 via-pink-200 to-purple-200',
    stories: {
      en: 'Inspired by the fleeting beauty of cherry blossoms and the profound Japanese philosophy of mono no aware, the Sakura theme embodies the bittersweet awareness of life\'s impermanence. This is where tradition meets innovation, where ancient wisdom flows through modern digital landscapes. Soft pinks and gentle purples create a serene atmosphere that celebrates the delicate balance between strength and fragility, between the eternal and the ephemeral. Sakura represents the beauty found in transient moments—those perfect musical phrases that exist for just a heartbeat before transforming into something new. It speaks to the artist\'s soul about accepting change as part of life\'s natural rhythm, about finding profound peace in the knowledge that every creation is both precious and temporary. This theme captures the essence of mindful creativity, where every note is placed with intention, every silence holds meaning, and every composition becomes a meditation on the beautiful impermanence of art.',
      tr: 'Kiraz çiçeklerinin geçici güzelliğinden ve Japon mono no aware felsefesinin derinliğinden ilham alan Sakura teması, yaşamın geçiciliğinin acı tatlı farkındalığını temsil eder. Bu, geleneğin yenilikle buluştuğu, kadim bilgeliğin modern dijital manzaralardan aktığı yerdir. Yumuşak pembeler ve nazik morlar, güç ile kırılganlık, sonsuz ile geçici arasındaki narin dengeyi kutlayan huzurlu bir atmosfer yaratır. Sakura, geçici anlarda bulunan güzelliği temsil eder—yeni bir şeye dönüşmeden önce sadece bir kalp atışı kadar var olan o mükemmel müzikal cümleler. Sanatçının ruhuna, değişimi yaşamın doğal ritminin bir parçası olarak kabul etmekten, her yaratımın hem değerli hem de geçici olduğu bilgisinde derin huzur bulmaktan bahseder. Bu tema, her notanın kasıtla yerleştirildiği, her sessizliğin anlam taşıdığı ve her kompozisyonun sanatın güzel geçiciliği üzerine bir meditasyon haline geldiği bilinçli yaratıcılığın özünü yakalar.'
    }
  },
  {
    id: 'neon',
    name: 'Cyber',
    color: 'bg-gradient-to-br from-purple-900 via-violet-800 to-fuchsia-900',
    stories: {
      en: 'Welcome to the digital frontier, where reality bends and possibilities multiply beyond imagination. The Cyber theme pulses with electric energy, painting the interface in vivid purples and electric violets that seem to glow from within the very fabric of cyberspace. This is the realm of digital natives, where artificial intelligence meets human creativity in a symphony of code and consciousness. Every interaction feels like navigating through a cyberpunk dreamscape, where algorithms dance with intuition and data streams flow like rivers of liquid light. Cyber represents the future of music creation, where the boundaries between human and machine blur into something entirely new and beautiful. It embodies the raw power of technology harnessed for artistic expression, the electric thrill of pushing creative boundaries, and the infinite potential that emerges when innovation meets inspiration. This theme is for the pioneers, the digital architects of sound who dare to explore uncharted territories of musical possibility.',
      tr: 'Gerçekliğin büküldüğü ve olasılıkların hayal gücünün ötesinde çoğaldığı dijital sınıra hoş geldiniz. Cyber teması elektrik enerjisiyle nabız atar, arayüzü siber uzayın dokusunun içinden parlar gibi görünen canlı morlar ve elektrik menekşeleriyle boyar. Bu, yapay zekanın insan yaratıcılığıyla kod ve bilinç senfonisinde buluştuğu dijital yerlilerin alanıdır. Her etkileşim, algoritmaların sezgiyle dans ettiği ve veri akışlarının sıvı ışık nehirleri gibi aktığı bir cyberpunk rüya manzarasında gezinmek gibi hissedilir. Cyber, insan ve makine arasındaki sınırların tamamen yeni ve güzel bir şeye bulanıklaştığı müzik yaratımının geleceğini temsil eder. Sanatsal ifade için kullanılan teknolojinin ham gücünü, yaratıcı sınırları zorlama elektrik heyecanını ve yenilik ilhamla buluştuğunda ortaya çıkan sonsuz potansiyeli somutlaştırır. Bu tema, müzikal olasılığın keşfedilmemiş topraklarını keşfetmeye cesaret eden öncüler, dijital ses mimarları içindir.'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset',
    color: 'bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600',
    stories: {
      en: 'As the sun dips below the horizon, painting the sky in brilliant oranges, passionate pinks, and deep purples, the Sunset theme captures that magical golden hour when day transforms into night. This is the time of reflection and contemplation, of winding down and watching dreams take shape against the backdrop of a burning sky. Sunset embodies the warmth of Los Angeles evenings, the romance of twilight recording sessions, and the nostalgic beauty of endings that promise new beginnings. It represents the perfect balance between energy and tranquility, between the vibrant creativity of day and the mysterious inspiration of night. This theme speaks to those moments when music becomes more than sound—when it becomes emotion painted in audio, when melodies carry the weight of memories and rhythms pulse with the heartbeat of human experience. Sunset is for the dreamers, the storytellers, the artists who understand that the most beautiful music often emerges from the spaces between light and shadow.',
      tr: 'Güneş ufkun altına batarken gökyüzünü parlak turuncular, tutkulu pembeler ve derin morlara boyarken, Sunset teması gündüzün geceye dönüştüğü o büyülü altın saati yakalar. Bu, yansıtma ve düşünce zamanı, sakinleşme ve yanan bir gökyüzü fonunda hayallerin şekil aldığını izleme zamanıdır. Sunset, Los Angeles akşamlarının sıcaklığını, alacakaranlık kayıt seanslarının romantizmini ve yeni başlangıçlar vaat eden sonların nostaljik güzelliğini temsil eder. Enerji ile huzur arasındaki, günün canlı yaratıcılığı ile gecenin gizemli ilhamı arasındaki mükemmel dengeyi temsil eder. Bu tema, müziğin sesten fazlası haline geldiği anları konuşur—sesle boyanmış duygu haline geldiğinde, melodilerin anıların ağırlığını taşıdığı ve ritmlerin insan deneyiminin kalp atışıyla nabız attığı anlar. Sunset, hayalperestler, hikaye anlatıcıları, en güzel müziğin çoğunlukla ışık ve gölge arasındaki boşluklardan çıktığını anlayan sanatçılar içindir.'
    }
  }
];

export default function Sidebar() {
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeStory, setActiveStory] = useState<string | null>(null);
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const { t, language } = useLanguage();

  const isOpen = isPinned || isHovered;

  const menuItems = [
    { icon: Home, label: t('nav.home'), href: '/discover' },
    { icon: Heart, label: t('nav.favorites'), href: '/favorites' },
    { icon: Music, label: t('nav.tracks'), href: '/tracks' },
    { icon: ShoppingCart, label: t('nav.purchases'), href: '/purchases' },
    { icon: Mic, label: t('nav.studio'), href: '/studio', comingSoon: true }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div 
        className={`hidden md:block fixed left-0 top-16 h-[calc(100vh-4rem)] z-30 transition-all duration-300 ${
          isPinned ? 'w-64' : 'w-20 hover:w-64'
        } theme-bg border-r theme-border shadow-2xl`}
        onMouseEnter={() => !isPinned && setIsHovered(true)}
        onMouseLeave={() => !isPinned && setIsHovered(false)}
      >
        {/* Navigation Menu */}
        <nav className="p-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            item.comingSoon ? (
              <div key={item.href} className="relative group">
                <div className="flex items-center gap-3 rounded-lg theme-hover opacity-50 cursor-not-allowed p-3">
                  <item.icon size={22} className="theme-text-secondary flex-shrink-0" />
                  {isOpen && (
                    <>
                      <span className="theme-text-secondary">{item.label}</span>
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full ml-auto">
                        Soon
                      </span>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg theme-hover transition-all hover:scale-105 p-3"
                title={!isOpen ? item.label : ''}
              >
                <item.icon size={22} className="theme-icon flex-shrink-0" />
                {isOpen && (
                  <span className="theme-text font-medium">{item.label}</span>
                )}
              </Link>
            )
          ))}
        </nav>

        {/* Bottom Section - Themes */}
        <div className="absolute bottom-4 left-0 right-0 p-4 space-y-4">
          {/* Pin Button */}
          <button
            onClick={() => setIsPinned(!isPinned)}
            className={`w-full p-3 rounded-lg transition-all hover:scale-105 ${
              isPinned ? 'theme-accent bg-opacity-20' : 'theme-hover'
            } flex items-center gap-2`}
            title={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
          >
            <svg 
              className={`w-6 h-6 transition-transform ${isPinned ? 'rotate-45 theme-accent' : 'theme-text-secondary'} flex-shrink-0`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            {isOpen && (
              <span className="text-sm theme-text-secondary font-medium">
                {isPinned ? t('sidebar.pinned') : t('sidebar.pin')}
              </span>
            )}
          </button>

          {/* Theme Section */}
          <div className="space-y-3">
            <div className={`flex items-center gap-2 ${!isOpen ? 'justify-center' : ''}`}>
              <Palette size={18} className="theme-icon flex-shrink-0" />
              {isOpen && <span className="text-sm theme-text-secondary font-medium">{t('sidebar.theme')}</span>}
            </div>
            
            {/* Theme Grid - Fixed Size, No Layout Shift */}
            <div className={`grid gap-2 ${!isOpen ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {themeStories.map((themeItem) => {
                let hoverTimeout: NodeJS.Timeout;
                
                return (
                  <div
                    key={themeItem.id}
                    className={`relative ${themeItem.id === 'sunset' && isOpen ? 'col-span-2' : ''}`}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setTheme(themeItem.id);
                      }}
                      onMouseEnter={() => {
                        hoverTimeout = setTimeout(() => {
                          setActiveStory(themeItem.id);
                        }, 800);
                      }}
                      onMouseLeave={() => {
                        clearTimeout(hoverTimeout);
                        setActiveStory(null);
                      }}
                      className={`w-full h-12 p-3 rounded-xl border transition-colors duration-200 cursor-pointer ${
                        theme === themeItem.id 
                          ? 'border-white/40 shadow-lg ring-2 ring-white/20' 
                          : 'border-white/10 hover:border-white/20'
                      } ${themeItem.color}`}
                      title={themeItem.name}
                    >
                      {isOpen && (
                        <span className="text-xs font-bold text-white drop-shadow-lg">
                          {themeItem.name}
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Theme Story Modal - Fixed Center */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card border border-white/20 p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-2xl rounded-3xl">
            {(() => {
              const story = themeStories.find(t => t.id === activeStory);
              if (!story) return null;
              
              return (
                <>
                  <div className="flex items-center gap-6 mb-8">
                    <div className={`w-20 h-20 rounded-2xl ${story.color} shadow-xl`}></div>
                    <div>
                      <h3 className="text-4xl font-bold theme-text font-orbitron mb-2">
                        {story.name}
                      </h3>
                      <p className="theme-text-secondary text-lg">
                        {language === 'tr' ? 'Tema Hikayesi' : 'Theme Story'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="prose prose-lg max-w-none">
                    <p className="theme-text-secondary text-lg leading-relaxed text-justify">
                      {story.stories[language]}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => setActiveStory(null)}
                    className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-xl font-bold hover:scale-105 transition-all shadow-lg"
                  >
                    {language === 'tr' ? 'Kapat' : 'Close'}
                  </button>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 theme-bg border-t-2 theme-border backdrop-blur-md bg-opacity-95">
        <div className="flex items-center justify-around px-2 py-3">
          {menuItems.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 p-2 rounded-lg theme-hover transition-all active:scale-95"
            >
              <item.icon size={20} className="theme-text-secondary" />
              <span className="text-[10px] theme-text-secondary font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Mail, Instagram, ArrowUpRight, Github, Linkedin, Menu, X } from 'lucide-react';
import Lenis from 'lenis';
import SeoManager from './components/SeoManager';
import StructuredData from './components/StructuredData';

interface SiteContent {
  hero: {
    subHeader: string;
    title: string;
    titleItalic: string;
    description: string;
  };
  philosophy: {
    tag: string;
    title: string;
    titleItalic: string;
    pillars: {
      title: string;
      desc: string;
      tag: string;
      img: string;
    }[];
  };
  about: {
    tag: string;
    title: string;
    titleItalic: string;
    paragraphs: string[];
    quote: string;
    image: string;
  };
  contact: {
    tag: string;
    title: string;
    titleItalic: string;
    email: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    github: string;
  };
  footer: {
    copyright: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  lastUpdated: string;
}

const DEFAULT_CONTENT: SiteContent = {
  hero: {
    subHeader: "Digital Product Designer",
    title: "MENN",
    titleItalic: "Maestro",
    description: "Creating digital products that turn ideas into results."
  },
  philosophy: {
    tag: "Philosophy",
    title: "Simple, functional,",
    titleItalic: "meaningful.",
    pillars: [
      {
        title: "Digital Product Creator",
        desc: "At just 13, MENN Maestro is already building and selling digital products that provide real value. From idea to execution, each product is practical, functional, and designed to make a tangible impact.",
        img: "https://i.postimg.cc/XJCsX0CR/Digital-Product-Creator.webp",
        tag: "Creation"
      },
      {
        title: "Vision & Ambition",
        desc: "Driven by curiosity and big goals, MENN approaches every project with focus and purpose. Some aspirations lie a little further ahead—like the precision and performance of a BMW M5 F90—serving as inspiration for everything he creates.",
        img: "https://i.postimg.cc/ZnJ6ZkFd/Vision-Ambition.webp",
        tag: "Mindset"
      },
      {
        title: "Authentic Early Experience",
        desc: "Starting young gives MENN a rare advantage: hands-on experience in digital creation, problem-solving, and entrepreneurship. This early exposure is building a foundation for long-term success, setting him apart from peers.",
        img: "https://i.postimg.cc/GtjJs3mC/Authentic-Early-Experience.webp",
        tag: "Advantage"
      }
    ]
  },
  about: {
    tag: "The Story",
    title: "Practical, impactful, and",
    titleItalic: "easy to use.",
    paragraphs: [
      "MENN Maestro started at 13 with a vision: to design digital products that are practical, impactful, and easy to use. Every product is built with focus, clarity, and purpose, ensuring real value for users.",
      "Beyond work, MENN is driven by ambition and passion. Some goals lie a little further ahead—like the precision and performance of a BMW M5 F90—serving as inspiration for everything he creates.\nDream car: Corvette C8 🇺🇸 (not eligible here, but still the goal)."
    ],
    quote: "Great products are simple, functional, and meaningful. Each creation is crafted with care, attention to detail, and a commitment to quality that stands the test of time.",
    image: "https://i.postimg.cc/ZnJ6ZkFd/Vision-Ambition.webp"
  },
  contact: {
    tag: "Get in touch",
    title: "Let's build",
    titleItalic: "the future.",
    email: "MennHq@gmail.com",
    instagram: "https://instagram.com/MennHq",
    twitter: "https://x.com/MennHq",
    linkedin: "https://linkedin.com/in/MennHq",
    github: "https://github.com/MennHq"
  },
  footer: {
    copyright: "© 2024 MENN Maestro. All rights reserved."
  },
  seo: {
    title: "MENN Maestro | Digital Product Designer",
    description: "Creating digital products that turn ideas into results. Portfolio of MENN Maestro.",
    keywords: "design, digital products, portfolio, menn maestro"
  },
  lastUpdated: new Date().toISOString()
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [pageKey, setPageKey] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionWord, setTransitionWord] = useState<'menn' | 'maestro'>('menn');
  const [content, setContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('site_content');
    return saved ? JSON.parse(saved) : DEFAULT_CONTENT;
  });
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Migrate old handles to @MennHq if they exist in state/localstorage
    if (
      content.contact.instagram.includes('menn_maestro') || 
      content.contact.twitter.includes('menn_maestro') ||
      content.contact.linkedin.includes('Menn-Maestro') ||
      content.contact.github.includes('MENNISHERE')
    ) {
      const updatedContact = {
        ...content.contact,
        instagram: "https://instagram.com/MennHq",
        twitter: "https://x.com/MennHq",
        linkedin: "https://linkedin.com/in/MennHq",
        github: "https://github.com/MennHq"
      };
      const updated = {
        ...content,
        contact: updatedContact,
        lastUpdated: new Date().toISOString()
      };
      setContent(updated);
      localStorage.setItem('site_content', JSON.stringify(updated));
    }
  }, [content]);



  const triggerTransition = (section: string) => {
    if (section === activeSection || isTransitioning) return;
    
    if (lenisRef.current) lenisRef.current.start();
    setIsTransitioning(true);
    setTransitionWord('menn');
    
    // Switch to Maestro after MENN zooms past
    setTimeout(() => {
      setTransitionWord('maestro');
    }, 400);

    // Change page content
    setTimeout(() => {
      setPageKey(prev => prev + 1);
      setActiveSection(section);
      
      // Scroll to section
      if (section === 'hero') {
        window.scrollTo({ top: 0, behavior: 'auto' });
      } else {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'auto' });
        }
      }
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    }, 800);
  };

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check initial path for deep links / modals
    const path = window.location.pathname.toLowerCase();
    if (path.includes('privacy')) {
      setShowPrivacyModal(true);
    } else if (path.includes('terms')) {
      setShowTermsModal(true);
    } else if (path.includes('about')) {
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (path.includes('contact')) {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
  };

  return (
    <div className="min-h-screen selection:bg-white selection:text-black">
      <SeoManager 
        currentPathOrSection={activeSection} 
        titleOverride={content.seo.title} 
        descriptionOverride={content.seo.description} 
      />
      <StructuredData />
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="font-serif text-xl font-medium tracking-tight cursor-pointer" onClick={() => triggerTransition('hero')}>
            MENN <span className="italic opacity-50">Maestro</span>
          </div>
          <div className="flex items-center gap-6 md:gap-12 text-xs uppercase tracking-[0.2em] font-medium">
            <div className="hidden md:flex items-center gap-12">
              <button onClick={() => triggerTransition('work')} className="hover:opacity-50 transition-opacity uppercase">Work</button>
              <button onClick={() => triggerTransition('about')} className="hover:opacity-50 transition-opacity uppercase">About</button>
              <button onClick={() => triggerTransition('contact')} className="hover:opacity-50 transition-opacity uppercase">Contact</button>
            </div>
            <button 
              onClick={() => triggerTransition('contact')} 
              className="bg-[linear-gradient(to_top,#2b2b2b_0%,#2d2d2d_5%,#2f2f2f_10%,#323232_15%,#353535_20%,#393939_25%,#3d3d3d_30%,#424242_35%,#474747_40%,#4d4d4d_45%,#545454_50%,#5c5c5c_55%,#656565_60%,#6f6f6f_65%,#7a7a7a_70%,#868686_75%,#949494_80%,#a3a3a3_85%,#b5b5b5_90%,#c9c9c9_95%,#ffffff_100%)] text-black px-5 py-2 rounded-full hover:brightness-110 transition-all uppercase shadow-xl font-bold text-[10px] tracking-wider"
            >
              Let's Talk
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center pointer-events-none"
          >
            <div className="relative flex items-center justify-center w-full h-screen overflow-hidden">
              <AnimatePresence mode="popLayout">
                {transitionWord === 'menn' ? (
                  <motion.div
                    key="menn"
                    initial={{ scale: 0.5, opacity: 0, filter: 'blur(10px)' }}
                    animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ 
                      scale: 15, 
                      opacity: 0, 
                      filter: 'blur(20px)',
                      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute font-serif text-5xl md:text-9xl tracking-tighter font-medium text-white text-center"
                  >
                    MENN
                  </motion.div>
                ) : (
                  <motion.div
                    key="maestro"
                    initial={{ scale: 0.2, opacity: 0, filter: 'blur(20px)' }}
                    animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ 
                      scale: 0.8, 
                      opacity: 0,
                      filter: 'blur(10px)',
                      transition: { duration: 0.4 }
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute font-serif text-5xl md:text-9xl tracking-tighter font-medium italic text-white text-center"
                  >
                    Maestro
                  </motion.div>
                )}
              </AnimatePresence>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grain Overlay */}
      <div className="fixed inset-0 z-[102] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />



        <motion.main
          key={pageKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: 1, // Full delay until transition is complete
            duration: 0.8, 
            ease: "easeOut" 
          }}
        >
          {/* Hero Section */}
          <section id="hero" className="relative h-screen flex flex-col items-start md:items-center justify-center text-left md:text-center px-8 md:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.05),transparent_70%)] md:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, x: -20, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10"
        >
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 0.4, x: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="flex items-center justify-start md:justify-center gap-4 mb-12"
          >
            <div className="w-12 h-[1px] bg-white/30" />
            <span className="text-[9px] uppercase tracking-[0.6em] whitespace-nowrap">{content.hero.subHeader}</span>
            <div className="hidden md:block w-12 h-[1px] bg-white/30" />
          </motion.div>
          <h1 className="font-serif text-[22vw] md:text-[12vw] leading-[0.8] tracking-tighter mb-8">
            {content.hero.title}<br />
            <span className="italic opacity-20">{content.hero.titleItalic}</span>
          </h1>
          <p className="max-w-md md:mx-auto text-lg md:text-xl font-light opacity-70 leading-relaxed">
            {content.hero.description}
          </p>
          
          <div className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => triggerTransition('work')}
              className="bg-[linear-gradient(to_top,#2b2b2b_0%,#2d2d2d_5%,#2f2f2f_10%,#323232_15%,#353535_20%,#393939_25%,#3d3d3d_30%,#424242_35%,#474747_40%,#4d4d4d_45%,#545454_50%,#5c5c5c_55%,#656565_60%,#6f6f6f_65%,#7a7a7a_70%,#868686_75%,#949494_80%,#a3a3a3_85%,#b5b5b5_90%,#c9c9c9_95%,#ffffff_100%)] text-black px-8 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-xl"
            >
              View Work
            </motion.button>
            <button 
              onClick={() => triggerTransition('about')}
              className="text-xs uppercase tracking-[0.3em] flex items-center gap-2 hover:opacity-50 transition-opacity"
            >
              The Vision <ArrowUpRight size={14} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section id="work" className="py-32 px-8 md:px-6 max-w-7xl mx-auto md:text-center">
        <motion.div {...fadeIn} className="mb-24 flex flex-col items-start md:items-center">
          <span className="text-[10px] uppercase tracking-[0.4em] opacity-50 mb-4 block">{content.philosophy.tag}</span>
          <h2 className="font-serif text-5xl md:text-7xl max-w-2xl leading-tight md:mx-auto">
            {content.philosophy.title}<br />
            <span className="italic opacity-50">{content.philosophy.titleItalic}</span>
          </h2>
        </motion.div>

        <div className="flex flex-row md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar -mx-8 px-8 md:mx-0 md:px-0">
          {content.philosophy.pillars.map((pillar, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: i * 0.2 }}
              className="group flex flex-col items-start md:items-center md:text-center flex-shrink-0 w-[280px] md:w-auto snap-center"
            >
              <div className="relative aspect-[4/3] md:aspect-[4/5] w-full overflow-hidden rounded-2xl mb-8 bg-zinc-900">
                <img 
                  src={pillar.img} 
                  alt={pillar.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Shine Ray Effect */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div 
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:[animation:shine_1.2s_ease-in-out_infinite] mix-blend-screen transition-opacity duration-300"
                    style={{ width: '200%' }}
                  />
                </div>
              </div>
              <span className="text-[9px] uppercase tracking-[0.3em] opacity-40 mb-3 block">{pillar.tag}</span>
              <h3 className="text-xl font-medium mb-4">{pillar.title}</h3>
              <p className="text-sm opacity-60 leading-relaxed font-light">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeIn}>
            <span className="text-[10px] uppercase tracking-[0.4em] opacity-50 mb-6 block">{content.about.tag}</span>
            <h2 className="font-serif text-5xl md:text-6xl mb-12 leading-tight">
              {content.about.title} <span className="italic opacity-50">{content.about.titleItalic}</span>
            </h2>
            <div className="space-y-6 text-lg font-light opacity-70 leading-relaxed">
              {content.about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
              <p className="italic text-sm opacity-50 pt-6 border-t border-white/5">
                "{content.about.quote}"
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            {...fadeIn}
            className="relative rounded-2xl overflow-hidden group cursor-pointer"
          >
            <img 
              src={content.about.image} 
              alt="About Image"
              referrerPolicy="no-referrer"
              className="w-full h-auto block group-hover:scale-105 transition-all duration-700"
            />
            
            {/* Shine Ray Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div 
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:[animation:shine_1.2s_ease-in-out_infinite] mix-blend-screen transition-opacity duration-300"
                style={{ width: '200%' }}
              />
            </div>
            
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-48 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />
        
        <motion.div {...fadeIn} className="relative z-10">
          <span className="text-[10px] uppercase tracking-[0.5em] opacity-50 mb-8 block">{content.contact.tag}</span>
          <h2 className="font-serif text-7xl md:text-[10vw] leading-[0.8] tracking-tighter mb-16">
            {content.contact.title}<br />
            <span className="italic opacity-20">{content.contact.titleItalic}</span>
          </h2>
          
          <div className="flex flex-col items-center gap-16 w-full">
            <a 
              href={`mailto:${content.contact.email}`} 
              className="font-serif text-2xl sm:text-4xl md:text-7xl hover:opacity-50 transition-opacity border-b border-white/10 pb-4 break-all px-4"
            >
              {content.contact.email}
            </a>
            
            <a 
              href={content.contact.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-sans text-sm md:text-base tracking-[0.5em] uppercase opacity-40 hover:opacity-100 transition-all duration-500"
            >
              @{content.contact.instagram.split('/').pop()?.toUpperCase()}
            </a>

            <div className="flex gap-8 mt-4 items-center">
              <a href={content.contact.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[18px] h-[18px] opacity-40 hover:opacity-100 transition-opacity cursor-pointer fill-current text-white">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href={content.contact.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer" />
              </a>
              <a href={content.contact.github} target="_blank" rel="noopener noreferrer">
                <Github size={20} className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer" />
              </a>
              <a href={`mailto:${content.contact.email}`}>
                <Mail size={20} className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.2em] opacity-40">
          <div 
            className="font-serif text-sm cursor-pointer select-none" 
            onClick={() => triggerTransition('hero')}
          >
            {content.hero.title} <span className="italic">{content.hero.titleItalic}</span>
          </div>
          <div className="text-center md:text-left flex flex-col items-center md:items-start gap-1">
            <div>{content.footer.copyright}</div>
          </div>
          <div className="flex gap-6 md:gap-8 items-center">
            <a 
              href="/docs" 
              className="hover:opacity-100 cursor-pointer transition-opacity uppercase tracking-widest text-[10px] text-white"
            >
              Docs
            </a>
            <a 
              href="/llms.txt" 
              className="hover:opacity-100 cursor-pointer transition-opacity uppercase tracking-widest text-[10px] text-white"
            >
              LLMs.txt
            </a>
            <button 
              onClick={() => setShowPrivacyModal(true)} 
              className="hover:opacity-100 cursor-pointer transition-opacity uppercase tracking-widest text-[10px] bg-transparent border-none text-white font-sans outline-none"
            >
              Privacy
            </button>
            <button 
              onClick={() => setShowTermsModal(true)} 
              className="hover:opacity-100 cursor-pointer transition-opacity uppercase tracking-widest text-[10px] bg-transparent border-none text-white font-sans outline-none"
            >
              Terms
            </button>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacyModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPrivacyModal(false)}
            className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 cursor-pointer"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-3xl p-8 flex flex-col max-h-[85vh] shadow-2xl overflow-hidden cursor-default"
            >
              <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6">
                <div>
                  <h2 className="text-xl font-serif text-white uppercase tracking-wider">Privacy Policy</h2>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">MennHq Network</p>
                </div>
                <button 
                  onClick={() => setShowPrivacyModal(false)}
                  className="p-2 hover:bg-white/5 rounded-full text-white/45 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-sm text-white/70 font-sans leading-relaxed select-text no-scrollbar">
                <p className="text-[10px] opacity-40 uppercase tracking-widest">Effective Date: June 4, 2026</p>
                
                <section className="space-y-2">
                  <h3 className="font-serif text-white tracking-wide text-lg">1. Introduction</h3>
                  <p>Welcome to <strong>MennHq</strong> (accessible via <a href="https://mennhq.vercel.app" className="underline hover:text-white text-white/90">mennhq.vercel.app</a>), the official platform representing <strong>Menn</strong> (also known as <strong>Menn Maestro</strong> / <strong>Menn Hq</strong>). We value your trust and are fully committed to protecting your online privacy.</p>
                </section>
 
                <section className="space-y-2">
                  <h3 className="font-serif text-white tracking-wide text-lg">2. Information We Collect</h3>
                  <p>As a personal digital display and portfolio, <strong>MennHq</strong> does not actively collect, sell, or process personal identifying information (PII). We do not set tracking, marketing, or behavioral cookies. Any information sent to us through official contact emails (<a href="mailto:MennHq@gmail.com" className="underline hover:text-white text-white/90">MennHq@gmail.com</a>) or verified profile links remains entirely private and is exclusively used to answer your messages.</p>
                </section>
 
                <section className="space-y-2">
                  <h3 className="font-serif text-white tracking-wide text-lg">3. Data Security</h3>
                  <p>The security of the <strong>Menn Maestro</strong> platform and system is of paramount importance to us. We regularly review our integration channels, disable unused dependencies, and cooperate with premium secure cloud infrastructures (like Vercel and secure CDN layers) to deliver top-tier stability and protect our public site code.</p>
                </section>
 
                <section className="space-y-2">
                  <h3 className="font-serif text-white tracking-wide text-lg">4. Outbound Links</h3>
                  <p>Our website features connections to global networks, third-party social services, and other product pages. <strong>MennHq</strong> does not control these destination providers. We strongly recommend reading the respective policies of any external links you choose to click.</p>
                </section>
 
                <section className="space-y-2">
                  <h3 className="font-serif text-white tracking-wide text-lg">5. Future Updates</h3>
                  <p>We reserves the right to review and update this Privacy Policy statement in order to stay compliant with standard global frameworks. All changes will become active on this page immediately upon deployment.</p>
                </section>
 
                <section className="space-y-2 pb-4">
                  <h3 className="font-serif text-white tracking-wide text-lg">6. Contact Information</h3>
                  <p>For inquiries, feedback, or matters related to privacy under the <strong>Menn</strong> identity, please connect with us:</p>
                  <p className="text-white font-medium mt-1">Official Address: <a href="mailto:MennHq@gmail.com" className="underline text-white hover:opacity-80">MennHq@gmail.com</a></p>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
 
      {/* Terms of Service Modal */}
      <AnimatePresence>
        {showTermsModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTermsModal(false)}
            className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 cursor-pointer"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-3xl p-8 flex flex-col max-h-[85vh] shadow-2xl overflow-hidden cursor-default"
            >
              <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6">
                <div>
                  <h2 className="text-xl font-serif text-white uppercase tracking-wider">Terms of Service</h2>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">MennHq Licensing Agreement</p>
                </div>
                <button 
                  onClick={() => setShowTermsModal(false)}
                  className="p-2 hover:bg-white/5 rounded-full text-white/45 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 space-y-6 text-sm text-white/70 font-sans leading-relaxed select-text no-scrollbar">
                <p className="text-[10px] opacity-40 uppercase tracking-widest">Effective Date: June 4, 2026</p>
                
                <section className="space-y-2">
                  <h3 className="font-serif text-white tracking-wide text-lg">1. Acceptance of Terms</h3>
                  <p>By entering and using the site <strong>MennHq</strong> (accessible via <a href="https://mennhq.vercel.app" className="underline hover:text-white text-white/90">mennhq.vercel.app</a>), you fully consent to keep all binding guidelines outlined in our Terms of Service. If you do not agree with these principles, your permission to navigate the site is immediately revoked.</p>
                </section>
 
                <section className="space-y-2">
                  <h3 className="font-serif text-white tracking-wide text-lg">2. Intellectual Ownership</h3>
                  <p>All digital products, original UI workflows, vector design assets, typography layouts, code, screenshots, and visual branding concepts published under the <strong>Menn</strong> / <strong>Menn Maestro</strong> brand are the exclusive property of <strong>Menn Hq</strong>. No materials, assets, or descriptions may be duplicated, scraped, repurposed, or resold without our explicit, written prior legal consent.</p>
                </section>
 
                <section className="space-y-2">
                  <h3 className="font-serif text-white tracking-wide text-lg">3. Disclaimer and Limitations of liability</h3>
                  <p>The materials, showcases, and downloads on <strong>MennHq</strong> are provided strictly on an "as is" and "as available" basis. <strong>Menn</strong> provides no warranties, direct or implied. We shall under no circumstances be held responsible for system interruptions, errors, or files fetched outside our verified domains.</p>
                </section>
 
                <section className="space-y-2">
                  <h3 className="font-serif text-white tracking-wide text-lg">4. User Conduct</h3>
                  <p>Visitors are expected to act reasonably and respectfully. Automated harvesting scripts, bots, unauthorized penetration testing, attempts to bypass the console system, or launching malicious actions against our servers or visitors is strictly prohibited and subject to legal actions.</p>
                </section>
 
                <section className="space-y-2 pb-4">
                  <h3 className="font-serif text-white tracking-wide text-lg">5. Governing Jurisdiction</h3>
                  <p>These terms represent the entire agreement between the visitor and <strong>MennHq</strong>. Any disputes related to the contents of <strong>Menn Maestro</strong> shall be governed by standard electronic information protection laws without regard to conflict of law principles.</p>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

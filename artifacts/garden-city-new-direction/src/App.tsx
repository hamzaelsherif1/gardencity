import { useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  ChevronDown,
  Clock3,
  Compass,
  Globe2,
  MapPin,
  Menu,
  Plane,
  Quote,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const journeyFilters = ['All journeys', 'Cairo', 'Nile', 'Red Sea'];

const journeys = [
  {
    title: 'The Cairo Edit',
    category: 'Cairo',
    duration: '3 nights · private',
    copy: 'The city in full colour: old streets, new tables, and the pyramids at the hour the tour buses leave.',
    image: 'https://images.unsplash.com/photo-1640005438758-861043e64aa5?q=80&w=1400&auto=format&fit=crop',
    featured: true,
  },
  {
    title: 'Afloat on the Nile',
    category: 'Nile',
    duration: '4 nights · small ship',
    copy: 'Sail from Luxor to Aswan, with early access to temples and the river always in view.',
    image: 'https://images.unsplash.com/photo-1648139210543-da574312cda9?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
  {
    title: 'Red Sea Reset',
    category: 'Red Sea',
    duration: '5 nights · tailor-made',
    copy: 'A slower Egypt: clear water, reef days, and desert horizons shaped around your pace.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
];

function useReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className={`flex items-center gap-3 ${light ? 'text-[#f5efdF]' : 'text-[#172447]'}`} data-testid="link-brand">
      <span className="grid h-9 w-9 place-items-center rounded-full border border-current font-display text-lg font-bold">G</span>
      <span className="leading-none">
        <span className="block font-display text-[15px] font-bold tracking-[-.03em]">Garden City</span>
        <span className="font-label mt-1 block text-[8px] font-semibold uppercase tracking-[.18em] opacity-70">Travel · Egypt</span>
      </span>
    </a>
  );
}

function ArrowLink({ children, href, light = false }: { children: ReactNode; href: string; light?: boolean }) {
  return (
    <a href={href} className={`group inline-flex items-center gap-3 font-label text-[11px] font-semibold uppercase tracking-[.13em] ${light ? 'text-[#f5efdf]' : 'text-[#172447]'}`} data-testid={`link-${href.replace('#', '')}`}>
      {children}
      <span className={`grid h-8 w-8 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-1 ${light ? 'bg-[#ff704d] text-[#172447]' : 'bg-[#172447] text-[#f5efdf]'}`}>
        <ArrowUpRight size={14} strokeWidth={2} />
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const navItems = [
    { label: 'The company', href: '#about' },
    { label: 'What we do', href: '#services' },
    { label: 'Journeys', href: '#journeys' },
    { label: 'For partners', href: '#partner' },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#f5efdf]/15 bg-[#172447]/90 text-[#f5efdf] backdrop-blur-xl">
      <div className="container-gct flex h-[76px] items-center justify-between">
        <BrandMark light />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="font-label text-[10px] font-semibold uppercase tracking-[.12em] text-[#f5efdf]/75 transition-colors hover:text-[#ffad65]" data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}>
              {item.label}
            </a>
          ))}
          <a href="#contact" className="group ml-2 inline-flex items-center gap-3 rounded-full bg-[#ff704d] px-4 py-2.5 font-label text-[10px] font-bold uppercase tracking-[.12em] text-[#172447] transition-transform hover:-translate-y-0.5" data-testid="link-nav-contact">
            Start a conversation
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </nav>
        <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((value) => !value)} className="grid h-10 w-10 place-items-center rounded-full border border-[#f5efdf]/30 md:hidden" data-testid="button-mobile-menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav className="container-gct border-t border-[#f5efdf]/15 py-4 md:hidden" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="block border-b border-[#f5efdf]/10 py-3 font-label text-[11px] font-semibold uppercase tracking-[.14em] text-[#f5efdf]/80" data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>
              {item.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="mt-4 block rounded-full bg-[#ff704d] px-4 py-3 text-center font-label text-[10px] font-bold uppercase tracking-[.12em] text-[#172447]" data-testid="link-mobile-contact">Start a conversation</a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[740px] overflow-hidden bg-[#172447] text-[#f5efdf] lg:min-h-[820px]">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1640005438758-861043e64aa5?q=80&w=2400&auto=format&fit=crop" alt="Pyramids of Giza silhouetted at sunset" className="image-drift h-full w-full object-cover opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#172447] via-[#172447]/80 to-[#172447]/10 lg:via-[#172447]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#172447] via-transparent to-[#172447]/30" />
      </div>
      <div className="container-gct relative z-10 flex min-h-[740px] items-end pb-20 pt-32 lg:min-h-[820px] lg:items-center lg:pb-0">
        <div className="w-full max-w-[560px]">
          <p className="hero-in eyebrow mb-6 text-[#ffad65]">Garden City Travel · Egypt DMC since 1985</p>
          <h1 className="hero-in-delay max-w-[540px] font-display text-[clamp(3.6rem,7vw,6.8rem)] font-semibold leading-[.9] tracking-[-.075em] text-[#f5efdf]">
            Egypt,<br /><span className="text-[#ff704d]">in your hands.</span>
          </h1>
          <p className="hero-in-delay-2 mt-8 max-w-[480px] text-[17px] leading-7 text-[#f5efdf]/75 md:text-[19px]">
            The local intelligence behind journeys that feel effortless. Private holidays, partner operations and corporate travel — handled properly, from Cairo to the coast.
          </p>
          <div className="hero-in-delay-3 mt-9 flex flex-wrap items-center gap-5">
            <a href="#journeys" className="group inline-flex items-center gap-4 rounded-full bg-[#ff704d] px-6 py-3.5 font-label text-[11px] font-bold uppercase tracking-[.12em] text-[#172447] transition-transform hover:-translate-y-1" data-testid="link-hero-journeys">
              Find your Egypt
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#partner" className="inline-flex items-center gap-2 font-label text-[11px] font-bold uppercase tracking-[.12em] text-[#f5efdf]/80 transition-colors hover:text-[#ffad65]" data-testid="link-hero-partner">
              I represent a business <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
        <div className="absolute bottom-9 right-0 hidden items-center gap-4 text-[#f5efdf]/50 lg:flex">
          <span className="font-label text-[9px] uppercase tracking-[.2em]">Scroll to explore</span>
          <span className="h-px w-16 bg-[#f5efdf]/40" />
          <ChevronDown size={16} />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 hidden h-20 w-1/3 bg-[#ff704d] lg:block" />
      <div className="absolute bottom-7 left-8 hidden font-label text-[10px] font-semibold uppercase tracking-[.2em] text-[#172447] lg:block">GCT / 40 years on the ground</div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-[#f5efdf] py-24 text-[#172447] md:py-32">
      <div className="container-gct grid gap-16 lg:grid-cols-[.75fr_1.25fr] lg:gap-28">
        <div className="reveal">
          <p className="eyebrow text-[#e95339]">A local point of view</p>
          <div className="mt-8 border-t border-[#172447]/20 pt-5">
            <div className="font-display text-[8rem] font-semibold leading-[.75] tracking-[-.1em] text-[#ff704d] md:text-[10rem]">40</div>
            <p className="mt-7 max-w-[170px] font-label text-[11px] font-semibold uppercase leading-5 tracking-[.12em] text-[#172447]/65">years of making Egypt work beautifully</p>
          </div>
        </div>
        <div className="reveal" style={{ transitionDelay: '120ms' }}>
          <h2 className="max-w-[720px] font-display text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[.96] tracking-[-.065em]">
            You bring the curiosity.<br /><span className="text-[#1c8586]">We bring the way in.</span>
          </h2>
          <div className="mt-10 grid gap-8 border-t border-[#172447]/20 pt-8 md:grid-cols-[1fr_1fr]">
            <p className="text-[16px] leading-7 text-[#172447]/70">Garden City Travel started in Cairo in 1985 with a simple promise: know the place deeply, and make every detail feel considered. Four decades later, our team still owns the ground game.</p>
            <p className="text-[16px] leading-7 text-[#172447]/70">We work with discerning travelers, international agencies and corporate accounts who value a local partner with the range to say yes — and the experience to say no when it matters.</p>
          </div>
          <div className="mt-10">
            <ArrowLink href="#services">Meet the operation</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon, number, title, copy, href }: { icon: ReactNode; number: string; title: string; copy: string; href: string }) {
  return (
    <a href={href} className="group relative flex min-h-[330px] flex-col overflow-hidden bg-[#1c8586] p-7 text-[#f5efdf] transition-colors duration-300 hover:bg-[#172447] md:p-9" data-testid={`link-service-${number}`}>
      <div className="flex items-start justify-between">
        <span className="font-label text-[10px] font-semibold tracking-[.15em] text-[#f5efdf]/55">{number}</span>
        <span className="text-[#ffad65]">{icon}</span>
      </div>
      <div className="mt-auto">
        <h3 className="font-display text-3xl font-semibold tracking-[-.05em]">{title}</h3>
        <p className="mt-3 max-w-[280px] text-[14px] leading-6 text-[#f5efdf]/72">{copy}</p>
        <span className="mt-7 inline-flex items-center gap-2 font-label text-[10px] font-bold uppercase tracking-[.15em] text-[#ffad65]">See what is possible <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></span>
      </div>
      <span className="pointer-events-none absolute -bottom-8 -right-4 font-display text-[11rem] font-bold leading-none text-[#f5efdf]/[.06]">{number}</span>
    </a>
  );
}

function Services() {
  return (
    <section id="services" className="bg-[#e8dfc9] py-24 text-[#172447] md:py-32">
      <div className="container-gct">
        <div className="reveal flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-[#e95339]">One operation, four ways in</p>
            <h2 className="mt-5 max-w-[580px] font-display text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[.95] tracking-[-.07em]">The right kind of<br /><span className="text-[#1c8586]">local advantage.</span></h2>
          </div>
          <p className="max-w-[300px] text-[15px] leading-6 text-[#172447]/65">Different needs. One accountable team. From the first idea to the last transfer, we stay close to the detail.</p>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-[2px] bg-[#e8dfc9] md:grid-cols-2 lg:grid-cols-4">
          <ServiceCard number="01" title="Egypt holidays" copy="Private itineraries, Nile cruises and the Egypt you want to remember." href="#journeys" icon={<Compass size={29} strokeWidth={1.5} />} />
          <ServiceCard number="02" title="Travel partners" copy="A dependable local extension of your brand, built for international agencies." href="#partner" icon={<Globe2 size={29} strokeWidth={1.5} />} />
          <ServiceCard number="03" title="Corporate travel" copy="MICE, VIP movements and business travel with calm, clear control." href="#corporate" icon={<Building2 size={29} strokeWidth={1.5} />} />
          <ServiceCard number="04" title="Transportation" copy="Professional drivers, clean vehicles and dispatch that keeps its word." href="#transport" icon={<Plane size={29} strokeWidth={1.5} />} />
        </div>
      </div>
    </section>
  );
}

function JourneyCard({ journey, index }: { journey: (typeof journeys)[number]; index: number }) {
  return (
    <article className={`group relative overflow-hidden bg-[#172447] text-[#f5efdf] ${journey.featured ? 'md:col-span-2 md:row-span-2 md:min-h-[520px]' : ''}`} data-testid={`card-journey-${index}`}>
      <div className={`${journey.featured ? 'min-h-[490px] md:h-full' : 'h-[320px]'} relative`}>
        <img src={journey.image} alt={journey.title} className="absolute inset-0 h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#172447] via-[#172447]/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <div className="flex items-center gap-3 font-label text-[9px] font-semibold uppercase tracking-[.15em] text-[#ffad65]">
            <span>{journey.category}</span><span className="h-1 w-1 rounded-full bg-[#ffad65]" /><span>{journey.duration}</span>
          </div>
          <h3 className={`mt-3 font-display font-semibold tracking-[-.06em] ${journey.featured ? 'text-4xl md:text-5xl' : 'text-3xl'}`}>{journey.title}</h3>
          <p className="mt-2 max-w-[370px] text-sm leading-6 text-[#f5efdf]/75">{journey.copy}</p>
          <a href="#contact" className="mt-5 inline-flex items-center gap-2 font-label text-[10px] font-bold uppercase tracking-[.14em] text-[#f5efdf] transition-colors hover:text-[#ffad65]" data-testid={`link-journey-${index}`}>Make it yours <ArrowUpRight size={14} /></a>
        </div>
      </div>
    </article>
  );
}

function Journeys() {
  const [filter, setFilter] = useState('All journeys');
  const filtered = journeys.filter((journey) => filter === 'All journeys' || journey.category === filter);
  return (
    <section id="journeys" className="bg-[#f5efdf] py-24 text-[#172447] md:py-32">
      <div className="container-gct">
        <div className="reveal flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-[#e95339]">Start somewhere</p>
            <h2 className="mt-5 font-display text-[clamp(2.6rem,5vw,4.8rem)] font-semibold leading-[.94] tracking-[-.075em]">A first look at<br /><span className="text-[#e95339]">your Egypt.</span></h2>
          </div>
          <div className="flex max-w-full gap-2 overflow-x-auto pb-1 hide-scrollbar" role="tablist" aria-label="Journey categories">
            {journeyFilters.map((item) => (
              <button type="button" key={item} onClick={() => setFilter(item)} className={`whitespace-nowrap rounded-full border px-4 py-2 font-label text-[10px] font-semibold uppercase tracking-[.12em] transition-colors ${filter === item ? 'border-[#172447] bg-[#172447] text-[#f5efdf]' : 'border-[#172447]/20 text-[#172447]/65 hover:border-[#1c8586] hover:text-[#1c8586]'}`} data-testid={`button-filter-${item.toLowerCase().replaceAll(' ', '-')}`}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-12 grid gap-4 md:auto-rows-[minmax(260px,1fr)] md:grid-cols-2">
          {filtered.map((journey, index) => <JourneyCard key={journey.title} journey={journey} index={index} />)}
        </div>
        <div className="reveal mt-10 flex flex-col items-start justify-between gap-5 border-t border-[#172447]/20 pt-6 sm:flex-row sm:items-center">
          <p className="font-label text-[10px] font-semibold uppercase tracking-[.14em] text-[#172447]/55">Every itinerary starts with a conversation, not a checkout page.</p>
          <ArrowLink href="#contact">Build my itinerary</ArrowLink>
        </div>
      </div>
    </section>
  );
}

function Advantage() {
  const points = [
    { icon: <MapPin size={20} />, title: 'Actually on the ground', copy: 'Our team, our supplier relationships, our standards — all in Egypt.' },
    { icon: <ShieldCheck size={20} />, title: 'Designed for scrutiny', copy: 'References, insurance and operating detail available to every serious partner.' },
    { icon: <Clock3 size={20} />, title: 'Available when it matters', copy: 'A responsive team for the moments that do not fit office hours.' },
  ];
  return (
    <section id="transport" className="relative overflow-hidden bg-[#172447] py-24 text-[#f5efdf] md:py-32">
      <div className="absolute -right-32 top-0 h-[520px] w-[520px] rounded-full border border-[#ff704d]/20 md:h-[700px] md:w-[700px]" />
      <div className="absolute -right-16 top-24 h-[370px] w-[370px] rounded-full border border-[#ff704d]/15 md:h-[540px] md:w-[540px]" />
      <div className="container-gct relative grid gap-16 lg:grid-cols-[.8fr_1.2fr] lg:gap-28">
        <div className="reveal">
          <p className="eyebrow text-[#ffad65]">The difference is operational</p>
          <h2 className="mt-6 max-w-[480px] font-display text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-[.92] tracking-[-.075em]">Less friction.<br /><span className="text-[#ff704d]">More Egypt.</span></h2>
          <p className="mt-8 max-w-[380px] text-[16px] leading-7 text-[#f5efdf]/68">A beautiful itinerary is only as good as the person waiting when the flight changes. We make the complex feel quiet.</p>
          <a href="tel:+20233367890" className="mt-10 inline-flex items-center gap-3 border-b border-[#ffad65]/60 pb-2 font-label text-[11px] font-semibold uppercase tracking-[.14em] text-[#ffad65]" data-testid="link-call-team">Call our Cairo team <ArrowUpRight size={14} /></a>
        </div>
        <div className="reveal" style={{ transitionDelay: '120ms' }}>
          <div className="mb-9 flex items-end justify-between border-b border-[#f5efdf]/20 pb-5">
            <span className="font-label text-[10px] font-semibold uppercase tracking-[.15em] text-[#f5efdf]/50">What partners count on</span>
            <span className="font-display text-5xl font-semibold tracking-[-.08em] text-[#ff704d]">24/7</span>
          </div>
          <div>
            {points.map((point, index) => (
              <div key={point.title} className="group relative grid gap-5 border-b border-[#f5efdf]/20 py-7 md:grid-cols-[38px_1fr] md:items-start">
                <span className="text-[#ffad65]">{point.icon}</span>
                <div className="min-w-0">
                  <span className="block font-display text-xl font-semibold tracking-[-.04em]">{point.title}</span>
                  <span className="mt-2 block max-w-[470px] text-[14px] leading-6 text-[#f5efdf]/60">{point.copy}</span>
                </div>
                <span className="absolute left-0 top-14 font-label text-[10px] text-[#f5efdf]/30">{String(index + 1).padStart(2, '0')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnerBlock() {
  return (
    <section id="partner" className="bg-[#e8dfc9] py-24 text-[#172447] md:py-32">
      <div className="container-gct">
        <div className="reveal grid overflow-hidden bg-[#ff704d] lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative min-h-[390px] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=1400&auto=format&fit=crop" alt="Cairo skyline and mosque minarets at dusk" className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-65 transition-transform duration-700 hover:scale-105" />
            <div className="absolute inset-0 bg-[#1c8586]/35" />
            <div className="absolute bottom-7 left-7 font-label text-[10px] font-semibold uppercase tracking-[.16em] text-[#f5efdf]">Cairo / 30.0444° N</div>
          </div>
          <div className="flex flex-col justify-between p-8 md:p-12 lg:p-14">
            <div>
              <p className="eyebrow text-[#172447]/65">For the people behind the trip</p>
              <h2 className="mt-6 max-w-[510px] font-display text-[clamp(2.4rem,4vw,4rem)] font-semibold leading-[.94] tracking-[-.07em]">Your guests see Egypt.<br /><span className="text-[#1c8586]">You see a partner.</span></h2>
              <p className="mt-7 max-w-[440px] text-[15px] leading-6 text-[#172447]/75">Plug in a local team with the range to handle private travel, groups, incentives, VIPs and the unexpected — without diluting your brand.</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {['B2B operations', 'MICE & groups', 'VIP services'].map((item) => <span key={item} className="rounded-full border border-[#172447]/30 px-3.5 py-2 font-label text-[9px] font-semibold uppercase tracking-[.12em]">{item}</span>)}
            </div>
            <a href="#contact" className="group mt-10 inline-flex items-center gap-3 font-label text-[11px] font-bold uppercase tracking-[.14em]" data-testid="link-partner-enquire">Talk partnership <span className="grid h-8 w-8 place-items-center rounded-full bg-[#172447] text-[#f5efdf] transition-transform group-hover:translate-x-1"><ArrowRight size={14} /></span></a>
          </div>
        </div>
        <div id="corporate" className="reveal mt-16 grid gap-8 border-t border-[#172447]/20 pt-8 md:grid-cols-[1fr_1fr] md:gap-16">
          <div>
            <p className="eyebrow text-[#e95339]">For corporate accounts</p>
            <h3 className="mt-4 max-w-[500px] font-display text-3xl font-semibold leading-tight tracking-[-.055em]">Business in Egypt, without the busywork.</h3>
          </div>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <p className="max-w-[390px] text-[15px] leading-6 text-[#172447]/65">Executive transfers, incentive programmes, meetings and events — one local contact, one clear standard, zero drama.</p>
            <a href="#contact" className="whitespace-nowrap font-label text-[10px] font-bold uppercase tracking-[.13em] text-[#1c8586] underline decoration-[#1c8586]/40 underline-offset-8" data-testid="link-corporate-enquire">Plan for your team <ArrowUpRight size={14} className="ml-1 inline" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Voices() {
  return (
    <section className="bg-[#f5efdf] py-24 text-[#172447] md:py-28">
      <div className="container-gct">
        <div className="reveal grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-28">
          <div>
            <p className="eyebrow text-[#e95339]">Good company</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[.95] tracking-[-.06em] md:text-5xl">What the<br /><span className="text-[#1c8586]">industry says.</span></h2>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            <figure className="border-t border-[#172447]/20 pt-5">
              <Quote size={24} className="mb-7 text-[#ff704d]" />
              <blockquote className="font-display text-[22px] font-medium leading-[1.12] tracking-[-.04em]">“The only DMC we've used in Egypt that never once made us look bad in front of a client.”</blockquote>
              <figcaption className="mt-7 font-label text-[10px] font-semibold uppercase tracking-[.12em] text-[#172447]/50">International agency partner · London</figcaption>
            </figure>
            <figure className="border-t border-[#172447]/20 pt-5">
              <Quote size={24} className="mb-7 text-[#ff704d]" />
              <blockquote className="font-display text-[22px] font-medium leading-[1.12] tracking-[-.04em]">“They picked up at 11pm when our group's flight was cancelled — and had a new plan by breakfast.”</blockquote>
              <figcaption className="mt-7 font-label text-[10px] font-semibold uppercase tracking-[.12em] text-[#172447]/50">Corporate travel manager</figcaption>
            </figure>
          </div>
        </div>
        <div className="reveal mt-20 grid gap-5 border-y border-[#172447]/20 py-7 md:grid-cols-[1fr_2fr] md:items-center">
          <p className="font-label text-[10px] font-semibold uppercase tracking-[.15em] text-[#172447]/50">Trusted by the teams behind</p>
          <div className="flex flex-wrap gap-x-8 gap-y-4 font-display text-lg font-semibold tracking-[-.04em] text-[#172447]/55">
            <span>Tour operators</span><span>Agency networks</span><span>Hotel groups</span><span>Corporate desks</span><span>MICE organisers</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#1c8586] py-24 text-[#f5efdf] md:py-32">
      <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full border-[36px] border-[#ffad65]/25 md:h-[520px] md:w-[520px]" />
      <div className="container-gct relative">
        <div className="reveal max-w-[820px]">
          <p className="eyebrow text-[#ffad65]">Let’s make a plan</p>
          <h2 className="mt-6 font-display text-[clamp(3rem,7vw,6.8rem)] font-semibold leading-[.88] tracking-[-.08em]">Where do you<br /><span className="text-[#ff704d]">want to begin?</span></h2>
          <p className="mt-8 max-w-[480px] text-[17px] leading-7 text-[#f5efdf]/72">Tell us what you are picturing, who you are planning for, or what needs fixing on the ground. A real person in Cairo will reply within one business day.</p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a href="mailto:hello@gardencitytravel.com" className="group inline-flex items-center gap-4 rounded-full bg-[#ff704d] px-6 py-3.5 font-label text-[11px] font-bold uppercase tracking-[.12em] text-[#172447] transition-transform hover:-translate-y-1" data-testid="link-contact-email">
              Start an enquiry <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="tel:+20233367890" className="font-label text-[11px] font-bold uppercase tracking-[.12em] text-[#f5efdf]/80 hover:text-[#ffad65]" data-testid="link-contact-phone">+20 2 3336 7890</a>
          </div>
        </div>
        <div className="reveal mt-24 flex flex-col justify-between gap-8 border-t border-[#f5efdf]/25 pt-6 md:flex-row md:items-center">
          <div className="flex items-center gap-3 font-label text-[10px] font-semibold uppercase tracking-[.14em] text-[#f5efdf]/55"><Sparkles size={15} className="text-[#ffad65]" /> Cairo since 1985</div>
          <div className="flex gap-6 font-label text-[10px] font-semibold uppercase tracking-[.14em] text-[#f5efdf]/55"><a href="#about" className="hover:text-[#ffad65]" data-testid="link-footer-about">About</a><a href="#services" className="hover:text-[#ffad65]" data-testid="link-footer-services">Services</a><a href="#contact" className="hover:text-[#ffad65]" data-testid="link-footer-contact">Contact</a></div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  useReveal();
  return (
    <div className="min-h-[100dvh] bg-[#f5efdf]">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Journeys />
        <Advantage />
        <PartnerBlock />
        <Voices />
        <Contact />
      </main>
      <footer className="bg-[#172447] py-6 text-[#f5efdf]/50">
        <div className="container-gct flex flex-col justify-between gap-3 font-label text-[9px] uppercase tracking-[.14em] sm:flex-row">
          <span>© {new Date().getFullYear()} Garden City Travel. Egypt, arranged.</span>
          <span>Licensed destination management company · Cairo, Egypt</span>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
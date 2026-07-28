import React, { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import teaEstate from './assets/tea_estate.jpg';
import ev01 from './assets/past_events/ev-01.png';
import ev02 from './assets/past_events/ev-02.png';
import ev03 from './assets/past_events/ev-03.jpg';
import ev04 from './assets/past_events/ev-04.jpg';
import ev05 from './assets/past_events/ev-05.jpg';
import ev06 from './assets/past_events/ev-06.jpg';
import ev07 from './assets/past_events/ev-07.jpg';
import ev08 from './assets/past_events/ev-08.jpg';
import ev09 from './assets/past_events/ev-09.jpg';
import ev10 from './assets/past_events/ev-10.jpg';
import ev11 from './assets/past_events/ev-11.jpg';
import ev12 from './assets/past_events/ev-12.jpg';
import ev13 from './assets/past_events/ev-13.jpg';
import ev14 from './assets/past_events/ev-14.jpg';
import ev15 from './assets/past_events/ev-15.jpeg'

import president from './assets/comitee_pics/president.png';
import vice_president from './assets/comitee_pics/vicepresident.png';
import as_treasurer from './assets/comitee_pics/ass-treasurer.png';
import coeditor from './assets/comitee_pics/coeditor.png';
import editor from './assets/comitee_pics/editor.png';
import evntmanage from './assets/comitee_pics/eventmanage.png';
import secretary from './assets/comitee_pics/secretary.png';
import smcordinator from './assets/comitee_pics/smcordinator.png';
import treasurer from './assets/comitee_pics/treasurer.png';
import vicesec from './assets/comitee_pics/vice-sec.png';
import cosocial from './assets/comitee_pics/co-social.jpg';

import bogawanthalawa from './assets/area_rep/bogawanthalawa.png';
import dayagama from './assets/area_rep/dayagama.png';
import dickoya from './assets/area_rep/dickoya.png';
import hatton from './assets/area_rep/hatton.png';
import kotagala from './assets/area_rep/kotagala.png';
import maskeliya from './assets/area_rep/maskeliya.png';
import talawakele from './assets/area_rep/talawakale.png';
import watawala from './assets/area_rep/watawala.png';
import norwood from './assets/area_rep/norwood.png';
import nuwaraeliya from './assets/area_rep/nuwaraeliya.png';

// --- HIGH QUALITY STATIC PORTRAIT & LANDSCAPE IMAGES FROM UNSPLASH ---
// Featuring nature, education, study, and Sri Lankan upcountry aesthetic.
const IMAGES = {
  heroBg: teaEstate, // Misty tea gardens of Sri Lanka
  upcoming: [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800", // Graduation/Academic
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800", // Interactive workshop
    "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800", // Study seminar
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800", // Education hall
  ],
  past: [
    "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=800", // Community support
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800", // Philanthropy
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800", // Youth gathering
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
    "https://z-p3-scontent.fcmb9-1.fna.fbcdn.net/v/t39.30808-6/476258211_122173327484274668_2791544314208635422_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEHI_MsSdTdKXYJEhIxe5RU8hCcXX2a7_zyEJxdfZrv_LbFw3F3LAJLuAZczYWwgTBf4xttFC9WRfaphOnaC4ie&_nc_ohc=jClxalDj9TYQ7kNvwGFCZ5j&_nc_oc=AdoGeS5YgchsFJDUPONI99cQFcpVn8QsEnlUpzRUDupYFIDoVv1t5IElK2pn0UUNZ8k&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb9-1.fna&_nc_gid=JhhrfKLlDJOvvKdg0qi44Q&_nc_ss=7a2a8&oh=00_Af5wvvzOYwezzwzn5reo1VULGoqVGZQHQtSFkjhyUwxoJg&oe=6A13C70C?auto=format&fit=crop&q=80&w=800", // School classroom project
  ],
  profiles: [
    president,
    vice_president,
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300"
  ]
};

// --- MOCK DATA ---
const UPCOMING_EVENTS = [
  {
    id: 1,
    title: "No Upcoming Events",
    desc: "Stay tuned to get updates!",
    //date: "July 15, 2026",
    //location: "Town Hall, Nuwara Eliya",
    image: IMAGES.upcoming[1]
  }
];

const PAST_EVENTS = [
  {
    id: 1,
    title: "Awareness Program for O/L Students",
    desc: "An intensive 3-day program fostering synergy, professional ethics, and organizational management for students.",
    date: "May 15, 2024",
    location: "Holy Trinity College (National School), Nuwara Eliya",
    image: ev01
  },
  {
    id: 2,
    title: "University Enrollment Guidance Program",
    desc: "Providing instructions and guidance on applying to universities.",
    date: "June 15, 2024",
    location: "Zoom (Online)",
    image: ev02
  },
  {
    id: 3,
    title: "University Course Selection",
    desc: "Assisting students with university applications and course selection.",
    date: "June 21, 2024",
    location: "Shakthi Education Centre, Hatton",
    image: ev03
  },
  {
    id: 4,
    title: "LinkedIn Awareness Program",
    desc: "Discussing the importance of LinkedIn and how to use it effectively.",
    date: "June 26, 2024",
    location: "Zoom (Online)",
    image: ev04
  },
  {
    id: 5,
    title: "Webinar for A/L Students",
    desc: "In-depth subject revision for English, Tamil, Arts, and Political Science.",
    date: "October 17-20, 2024",
    location: "Zoom (Online)",
    image: ev05
  },
  {
    id: 6,
    title: "CyberHour",
    desc: "Empowering and educating people about online safety, cybersecurity, and digital awareness.",
    date: "February 08, 2025",
    location: "Zoom (Online)",
    image: ev06
  },
  {
    id: 7,
    title: "CV Preparation Workshop",
    desc: "A workshop to help students prepare professional CVs.",
    date: "February 09, 2025",
    location: "Zoom (Online)",
    image: ev07
  },
  {
    id: 8,
    title: "Empower Her: International Women's Day Celebration",
    desc: "A virtual event organized by the Nuwara Eliya Undergraduate Association to celebrate International Women's Day.",
    date: "March 08, 2025",
    location: "Zoom (Online)",
    image: ev08
  },
  {
    id: 9,
    title: "Thalir Vasantham",
    desc: "Thalir Vasantham - Sinhala and Tamil New Year Celebration.",
    date: "April 15, 2025",
    location: "Shri Muththu Vinayagar Devasthanam, Cultural Hall, Kotagala",
    image: ev09
  },
  {
    id: 10,
    title: "Olikkanal 2025",
    desc: "A special event dedicated to celebrating the Vesak festival.",
    date: "May 10, 2025",
    location: "CP/HZ/Ganesha Vidyalayam, Rozella",
    image: ev10
  },
  {
    id: 11,
    title: "Career Guidance Program",
    desc: "Providing career guidance and counseling for O/L students.",
    date: "October 12, 2025",
    location: "CP/HZ/Ganesha Vidyalayam, Rozella",
    image: ev11
  },
  {
    id: 12,
    title: "Tree Planting Campaign",
    desc: "A student-led environmental protection and tree planting campaign, encouraging young minds to take responsibility and act for the betterment of our environment.",
    date: "November 06, 2025",
    location: "CP/HZ/Agraoya Tamil Vidyalayam",
    image: ev12
  },
  {
    id: 13,
    title: "மௌனத்தின் வயது 203",
    desc: "மலையகத் தியாகிகள் தினத்தை அனுஷ்டிக்கும் முகமாக நுவரெலியா இளங்கலை பட்டதாரிகள் சங்கத்தால் ஏற்பாடு செய்யப்பட்டுள்ள சிந்தனைப் பகிர்வு.",
    date: "January 14, 2026",
    location: "Zoom (Online)",
    image: ev13
  },
  {
    id: 14,
    title: "We Are the Children of the Universe",
    desc: "Celebrating the strength, dignity, and equality of women on International Women’s Day.",
    date: "March 08, 2026",
    location: "Zoom (Online)",
    image: ev14
  },
  {
    id: 15,
    title: "GCE O/L Seminar 2026",
    desc: "Learn Today; Lead Tomorrow-Science and maths seminar for O/L Students.",
    date: "July , 2026",
    location: "Wellington T.M.V",
    image: ev15
  }
];

const EXCO_MEMBERS = [
  { name: "Puvanalogini", role: "President", university: "University of Colombo", img: president },
  { name: "Viyanujan", role: "Vice President", university: "University of Ruhuna", img: vice_president },
  { name: "Dhinesh", role: "Secretary", university: "University of Jaffna", img: secretary },
  { name: "Ishalini", role: "Vice Secretary", university: "Eastern University", img: vicesec },
  { name: "Sadhurshika", role: "Treasurer", university: "University of Kelaniya", img: treasurer },
  { name: "Kugapriya", role: "Assistant Treasurer", university: "University of Ruhuna", img: as_treasurer },
  { name: "Saravanapriyan", role: "Social Media Coordinator", university: "Uva Wellassa University", img: smcordinator },
  { name: "Dhawanharan", role: "Co-Social Media Coordinator", university: "Eastern University", img: cosocial },
  { name: "Dharmika", role: "Editor", university: "University of Peradeniya", img: editor },
  { name: "Lakshika", role: "Co-Editor", university: "Uva Wellassa University", img: coeditor },
  { name: "Nimalini", role: "Event Management Coordinator", university: "Sabaragamuwa University", img: evntmanage }
];

const AREA_REPRESENTATIVES = [
  { name: "Sadhana", division: "Kotagala", university: "University of Jaffna", img: kotagala },
  { name: "Dhayalini", division: "Hatton", university: "University of Jaffna", img: hatton },
  { name: "Pramya", division: "Dickoya", university: "Eastern University", img: dickoya },
  { name: "Dhanushk", division: "Norwood", university: "University of Sri Jayewardenepura", img: norwood },
  { name: "Kavishan", division: "Thalawakella", university: "University of Jaffna", img: talawakele },
  { name: "Pavithra", division: "Nuwara Eliya", university: "Sabaragamuwa University", img: nuwaraeliya },
  { name: "Baskaran", division: "Watawala", university: "Eastern University", img: watawala },
  { name: "Thiruselvam", division: "Bogawanthalawa", university: "University of Jaffna", img: bogawanthalawa },
  { name: "Babithra", division: "Dayagama", university: "Vavuniya University", img: dayagama },
  { name: "Loshanya", division: "Maskeliya", university: "University of Jaffna", img: maskeliya }
];

export default function App() {
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'exco' | 'reps'
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Carousel States
  const [upcomingSlide, setUpcomingSlide] = useState(0);
  const [pastSlide, setPastSlide] = useState(0);

  // Simulated Email Contact Form
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sendingState, setSendingState] = useState("idle"); // 'idle' | 'sending' | 'success' | 'error'

  // Scroll Event Listener for transparent to solid dark green header transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNextUpcoming = () => {
    setUpcomingSlide((prev) => (prev + 1) % UPCOMING_EVENTS.length);
  };

  const handlePrevUpcoming = () => {
    setUpcomingSlide((prev) => (prev - 1 + UPCOMING_EVENTS.length) % UPCOMING_EVENTS.length);
  };

  const handleNextPast = () => {
    setPastSlide((prev) => (prev + 1) % PAST_EVENTS.length);
  };

  const handlePrevPast = () => {
    setPastSlide((prev) => (prev - 1 + PAST_EVENTS.length) % PAST_EVENTS.length);
  };

  // Auto-play past events every 4 seconds
  useEffect(() => {
    const t = setInterval(() => {
      setPastSlide((s) => (s + 1) % PAST_EVENTS.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setSendingState("error");
      setTimeout(() => setSendingState("idle"), 4000);
      return;
    }
    setSendingState("sending");
    // Simulate API call
    setTimeout(() => {
      setSendingState("success");
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSendingState("idle"), 5000);
    }, 1500);
  };

  // Filter ExCo / Area Rep list
  const filteredExCo = EXCO_MEMBERS.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredReps = AREA_REPRESENTATIVES.filter(rep =>
    rep.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rep.division.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rep.university.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-emerald-800 selection:text-white transition-all duration-300">

      {/* HEADER / NAVIGATION */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-emerald-950/95 shadow-lg backdrop-blur-md py-3 border-b border-emerald-800/30' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo & Branding */}
          <a href="#hero" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-white overflow-hidden flex items-center justify-center shadow-lg border border-emerald-500/30 group-hover:scale-105 transition-all">
              <img src={logo} alt="NUA Logo" className="w-full h-full object-contain p-1" />
            </div>
            <div>
              <span className={`block font-bold text-lg tracking-wider transition-colors ${scrolled ? 'text-white' : 'text-white drop-shadow-md'}`}>NUA</span>
              <span className="block text-[10px] uppercase tracking-widest text-emerald-400 font-semibold">Nuwara Eliya Undergraduate Association</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#vision" className="text-stone-200 hover:text-white hover:underline underline-offset-8 transition-colors">Vision</a>
            <a href="#events" className="text-stone-200 hover:text-white hover:underline underline-offset-8 transition-colors">Events</a>
            <a href="#exco" className="text-stone-200 hover:text-white hover:underline underline-offset-8 transition-colors">ExCo & Reps</a>
            <a href="#contact" className="text-stone-200 hover:text-white hover:underline underline-offset-8 transition-colors">Contact Us</a>

            <a href="#contact" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-2 rounded-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-md">
              Join Association
            </a>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white p-2 rounded-lg bg-emerald-900/40 border border-emerald-700/50 hover:bg-emerald-800/60 focus:outline-none">
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-emerald-950 border-t border-emerald-900 px-6 py-6 absolute top-full left-0 w-full shadow-2xl space-y-4 animate-fadeIn">
            <a href="#vision" onClick={() => setMobileMenuOpen(false)} className="block text-emerald-100 hover:text-white text-base py-2 font-medium border-b border-emerald-900/60">Vision</a>
            <a href="#events" onClick={() => setMobileMenuOpen(false)} className="block text-emerald-100 hover:text-white text-base py-2 font-medium border-b border-emerald-900/60">Events</a>
            <a href="#exco" onClick={() => setMobileMenuOpen(false)} className="block text-emerald-100 hover:text-white text-base py-2 font-medium border-b border-emerald-900/60">Executive Committee</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-emerald-100 hover:text-white text-base py-2 font-medium border-b border-emerald-900/60">Contact Us</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block bg-emerald-700 text-center text-white py-2.5 rounded-lg font-semibold shadow">Join Association</a>
          </div>
        )}
      </header>

      {/* HERO SECTION WITH LUXURIOUS SCENIC GRADIENT BACKGROUND */}
      <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-emerald-950">

        {/* Cinematic Backdrop Image overlaid with premium dark green gradients */}
        <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 transform scale-105 animate-subtleZoom" style={{ backgroundImage: `url(${IMAGES.heroBg})` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/40 to-emerald-950"></div>

        {/* Elegant Animated Floating Elements mimicking mountain mist / particles */}
        <div className="absolute top-1/4 left-1/10 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/10 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

        {/* Decorative animated dots behind the main title */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              style={{ left: `${6 + i * 8}%`, animationDelay: `${i * 0.45}s` }}
              className="falling-dot"
            />
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center text-white pt-24 pb-12 z-10 flex flex-col items-center">

          <div className="inline-flex items-center space-x-2 bg-emerald-900/60 border border-emerald-700/50 rounded-full px-4 py-1.5 mb-6 shadow-inner animate-slideUp">
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="text-xs uppercase font-semibold tracking-widest text-emerald-200">Learn. Understand.. Teach...</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl text-white drop-shadow-md animate-slideUp leading-tight">
            Nuwara Eliya Undergraduate <span className="bg-gradient-to-r from-emerald-300 via-emerald-100 to-white bg-clip-text text-transparent">Association</span>
          </h1>

          <p className="text-stone-300 text-base sm:text-xl max-w-2xl mb-10 leading-relaxed font-light drop-shadow animate-slideUp">
            Empowering Upcountry society and inspiring Nuwara Eliya through education and guidance.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 animate-slideUp">
            <a href="#vision" className="bg-white hover:bg-stone-100 text-emerald-950 font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2">
              <span>Explore Vision</span>
              <svg className="w-5 h-5 text-emerald-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
            <a href="#events" className="bg-emerald-900/50 hover:bg-emerald-800/50 border border-emerald-500/40 text-white font-bold px-8 py-3.5 rounded-xl shadow transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2">
              <span>View Live Events</span>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
            </a>
          </div>

          {/* Quick Metrics Header Overlay */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 w-full max-w-4xl animate-slideUp">
            {[
              { label: "Active Members", val: "100+" },
              { label: "Universities", val: "10+" },
              { label: "Divisional Sectors", val: "9" },
              { label: "Community Projects", val: "10+" }
            ].map((stat, i) => (
              <div key={i} className="bg-emerald-950/70 border border-emerald-900/50 p-4 rounded-2xl backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.val}</div>
                <div className="text-xs text-emerald-300/80 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* VISION SECTION (CENTER ALIGNED) */}
      <section id="vision" className="py-24 bg-white relative overflow-hidden">

        {/* Subtle decorative background watermarks */}
        <div className="absolute -right-32 top-10 w-96 h-96 rounded-full bg-emerald-50/60 blur-3xl"></div>
        <div className="absolute -left-32 bottom-10 w-96 h-96 rounded-full bg-emerald-50/60 blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">

          {/* Removed: 'Our Core Statement' label per request */}

          <h2 className="text-3xl sm:text-5xl font-extrabold text-emerald-950 mb-8 leading-tight">
            Vision
          </h2>

          <div className="bg-emerald-950 text-white p-8 sm:p-14 rounded-3xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-400"></div>

            {/* Elegant SVG Quote Mark Icon */}
            <div className="absolute top-6 right-8 text-emerald-800 opacity-20 transform group-hover:scale-110 transition-transform duration-500">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 17h3l2-5V7h-6v5h3t-2 5zM3 17h3l2-5V7H2v5h3t-2 5z" />
              </svg>
            </div>

            <p className="text-2xl sm:text-4xl font-serif italic tracking-wide leading-relaxed text-emerald-100 max-w-3xl mx-auto relative z-10">
              "Empowering Upcountry Society"
            </p>

            <div className="mt-8 pt-6 border-t border-emerald-900/80 max-w-md mx-auto relative z-10">
              <p className="text-stone-300 text-sm leading-relaxed">
                By nurturing educational potential, enhancing standard learning resources, and establishing professional leadership frameworks for our youth.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 mt-16 text-left">
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-emerald-900 text-white flex items-center justify-center rounded-xl font-bold mb-4">01</div>
              <h3 className="font-bold text-lg text-emerald-950 mb-2">Education Support</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                We empower under-resourced schools by donating resources, hosting seminars, and offering continuous guidance maps.
              </p>
            </div>

            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-emerald-900 text-white flex items-center justify-center rounded-xl font-bold mb-4">02</div>
              <h3 className="font-bold text-lg text-emerald-950 mb-2">Cultural Unity</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Gathering student talents from the entire district, encouraging cultural growth, and appreciating traditional diversity.
              </p>
            </div>

            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-emerald-900 text-white flex items-center justify-center rounded-xl font-bold mb-4">03</div>
              <h3 className="font-bold text-lg text-emerald-950 mb-2">Welfare Services</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Conducting physical/mental health campaigns and aiding natural disaster response structures throughout upcountry communities.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* EVENTS SECTION */}
      <section id="events" className="py-24 bg-stone-50 relative border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto mb-16">
            {/* Removed: 'Association Timeline' label per request */}
            <h2 className="text-3xl sm:text-5xl font-extrabold text-emerald-950">
              Events & Forums
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-4">
              Explore ongoing events, workshops, and past initiatives orchestrated by our undergraduate units.
            </p>
          </div>

          {/* UPCOMING EVENTS SUb-SECTION */}
          <div className="mb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 border-b border-stone-200 pb-4">
              <div>
                <h3 className="text-xl sm:text-3xl font-bold text-emerald-950 flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block animate-ping"></span>
                  <span>Upcoming Events</span>
                </h3>
                <p className="text-stone-500 text-xs sm:text-sm mt-1">Get involved and secure your seats for our upcoming gatherings.</p>
              </div>
              {/* Carousel controls */}
              <div className="flex space-x-3 mt-4 sm:mt-0">
                <button
                  onClick={handlePrevUpcoming}
                  className="w-11 h-11 rounded-full border border-stone-300 bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 flex items-center justify-center transition-all shadow-sm active:scale-95"
                  aria-label="Previous Upcoming Event"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNextUpcoming}
                  className="w-11 h-11 rounded-full border border-stone-300 bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 flex items-center justify-center transition-all shadow-sm active:scale-95"
                  aria-label="Next Upcoming Event"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* UPCOMING SLIDER CAROUSEL TRACK */}
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl border border-stone-100">
              <div className="flex flex-col md:flex-row min-h-[420px]">

                {/* Event Image */}
                <div className="w-full md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                  <img
                    src={UPCOMING_EVENTS[upcomingSlide].image}
                    alt={UPCOMING_EVENTS[upcomingSlide].title}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 transform scale-100 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-emerald-950/80 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-emerald-500/20">
                    Featured Event
                  </div>
                </div>

                {/* Event Details Content */}
                <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-between bg-white relative">
                  <div>
                    <div className="flex items-center space-x-3 text-emerald-800 text-sm font-bold mb-4">
                      <span className="bg-emerald-100 text-emerald-950 px-3 py-1 rounded-md text-xs tracking-wider uppercase font-semibold">
                        {UPCOMING_EVENTS[upcomingSlide].date}
                      </span>
                      <span className="text-stone-400">•</span>
                      <span className="flex items-center space-x-1 text-xs">
                        <svg className="w-4 h-4 text-emerald-600 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{UPCOMING_EVENTS[upcomingSlide].location}</span>
                      </span>
                    </div>

                    <h4 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mb-4 transition-all duration-300">
                      {UPCOMING_EVENTS[upcomingSlide].title}
                    </h4>

                    <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
                      {UPCOMING_EVENTS[upcomingSlide].desc}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 pt-6 border-t border-stone-100">
                    <button className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-md active:scale-95">
                      Register Now
                    </button>
                    <button className="text-emerald-900 hover:text-emerald-700 font-bold text-sm hover:underline">
                      Inquire Details
                    </button>
                  </div>

                  {/* Dot Nav indicators */}
                  <div className="absolute bottom-4 right-8 flex space-x-2">
                    {UPCOMING_EVENTS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setUpcomingSlide(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${upcomingSlide === idx ? 'w-6 bg-emerald-900' : 'w-2 bg-stone-300'}`}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* PAST EVENTS SUB-SECTION */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 border-b border-stone-200 pb-4">
              <div>
                <h3 className="text-xl sm:text-3xl font-bold text-stone-900 flex items-center space-x-2">
                  <svg className="w-6 h-6 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Past Initiatives</span>
                </h3>
                <p className="text-stone-500 text-xs sm:text-sm mt-1">Take a look at the success milestones achieved by NUA chapters.</p>
              </div>
              {/* Carousel controls */}
              <div className="flex space-x-3 mt-4 sm:mt-0">
                <button
                  onClick={handlePrevPast}
                  className="w-11 h-11 rounded-full border border-stone-300 bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 flex items-center justify-center transition-all shadow-sm active:scale-95"
                  aria-label="Previous Past Event"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNextPast}
                  className="w-11 h-11 rounded-full border border-stone-300 bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 flex items-center justify-center transition-all shadow-sm active:scale-95"
                  aria-label="Next Past Event"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* PAST SLIDER CAROUSEL TRACK */}
            <div className="relative overflow-hidden rounded-3xl bg-stone-900 text-white shadow-xl">
              <div className="flex flex-col md:row-reverse md:flex-row-reverse min-h-[420px]">

                {/* Event Image */}
                <div className="w-full md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                  <img
                    src={PAST_EVENTS[pastSlide].image}
                    alt={PAST_EVENTS[pastSlide].title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute top-4 right-4 bg-stone-950/80 text-stone-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-stone-800">
                    Archived Forum
                  </div>
                </div>

                {/* Event Details Content */}
                <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-between bg-emerald-950 relative">
                  <div>
                    <div className="flex items-center space-x-3 text-emerald-300 text-xs sm:text-sm font-bold mb-4">
                      <span className="bg-emerald-900 text-emerald-100 px-3 py-1 rounded-md text-xs tracking-wider uppercase font-semibold">
                        {PAST_EVENTS[pastSlide].date}
                      </span>
                      <span className="text-emerald-800">•</span>
                      <span className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <span>{PAST_EVENTS[pastSlide].location}</span>
                      </span>
                    </div>

                    <h4 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                      {PAST_EVENTS[pastSlide].title}
                    </h4>

                    <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed mb-6">
                      {PAST_EVENTS[pastSlide].desc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-emerald-900/60">
                    <div className="inline-flex items-center space-x-2 bg-emerald-900/60 border border-emerald-800/80 px-4 py-2 rounded-lg text-emerald-300 font-semibold text-xs uppercase tracking-wider">
                      <span>Status: Successful Completed</span>
                      <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Dot Nav indicators */}
                  <div className="absolute bottom-4 left-8 flex space-x-2">
                    {PAST_EVENTS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPastSlide(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${pastSlide === idx ? 'w-6 bg-emerald-400' : 'w-2 bg-emerald-800'}`}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>


      {/* EXECUTIVE COMMITTEE (EXCO) & AREA REPS SECTION */}
      <section id="exco" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto mb-12">
            {/* Removed: 'NUA Leadership' label per request */}
            <h2 className="text-3xl sm:text-5xl font-extrabold text-emerald-950 mt-3 mb-4">
              Meet Our Councils
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              Explore professional profiles of the elected central Executive Committee and dedicated Sector Area Representatives of the district.
            </p>
          </div>

          {/* Filtering Control Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between bg-stone-50 p-4 rounded-2xl mb-12 border border-stone-200 gap-4">

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {[
                { id: "all", label: "All Officers (19)" },
                { id: "exco", label: "Executive Committee (10)" },
                { id: "reps", label: "Area Representatives (9)" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSearchQuery(""); }}
                  className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-emerald-950 text-white shadow-md' : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Live Search Inputs */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search by name, university..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-stone-400 hover:text-stone-600">
                  Clear
                </button>
              )}
            </div>

          </div>

          {/* LEADERS GRID DISPLAY */}
          <div className="space-y-16">

            {/* 1. EXECUTIVE COMMITTEE (10 FACES) */}
            {(activeTab === "all" || activeTab === "exco") && (
              <div>
                <div className="border-b border-stone-200 pb-4 mb-8">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-emerald-950">
                    Executive Committee 2025/2026
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1">Leading strategy, educational operations, and institutional growth.</p>
                </div>

                {filteredExCo.length === 0 ? (
                  <div className="text-center py-12 text-stone-500">No committee members matched your search.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {filteredExCo.map((member, idx) => (
                      <div key={idx} className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">

                        {/* Member Photo Grid Block with modern overlay effects */}
                        <div className="relative aspect-square overflow-hidden bg-stone-100">
                          <img
                            src={member.img}
                            alt={member.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <span className="text-[10px] text-emerald-300 uppercase tracking-wider font-bold">NUA Executive Body</span>
                          </div>
                        </div>

                        {/* Text Block content */}
                        <div className="p-5">
                          <span className="inline-block bg-emerald-50 text-emerald-900 font-bold px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wider mb-2">
                            {member.role}
                          </span>
                          <h4 className="font-extrabold text-stone-900 group-hover:text-emerald-900 transition-colors line-clamp-1">
                            {member.name}
                          </h4>
                          <p className="text-xs text-stone-500 mt-1 leading-relaxed line-clamp-2 min-h-[2.5rem]">
                            {member.university}
                          </p>

                          {/* Removed: 'Verified Member' label and LinkedIn icon per request */}
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 2. AREA REPRESENTATIVES (9 FACES) */}
            {(activeTab === "all" || activeTab === "reps") && (
              <div>
                <div className="border-b border-stone-200 pb-4 mb-8">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-emerald-950">
                    Area Representatives (9 Regions)
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1">Connecting remote valleys and estates with state academic hubs.</p>
                </div>

                {filteredReps.length === 0 ? (
                  <div className="text-center py-12 text-stone-500">No representatives matched your search.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredReps.map((rep, idx) => (
                      <div key={idx} className="bg-emerald-950 text-white border border-emerald-900 rounded-2xl p-6 flex items-center space-x-5 shadow hover:shadow-xl transition-all duration-300 group">

                        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-emerald-900">
                          <img
                            src={rep.img}
                            alt={rep.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                          />
                        </div>

                        <div className="overflow-hidden">
                          <div className="inline-flex items-center space-x-1 bg-emerald-900 text-emerald-300 text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full mb-1">
                            <svg className="w-3 h-3 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            <span>{rep.division}</span>
                          </div>

                          <h4 className="font-extrabold text-lg text-white group-hover:text-emerald-300 transition-colors truncate">
                            {rep.name}
                          </h4>

                          <p className="text-xs text-stone-300 leading-relaxed truncate mt-1">
                            {rep.university}
                          </p>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      </section>


      {/* CONTACT US SECTION */}
      <section id="contact" className="py-24 bg-emerald-950 text-white relative overflow-hidden">

        {/* Subtle decorative vector mesh mimicking tea foliage or mountains */}
        <div className="absolute inset-0 bg-radial-gradient opacity-10"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-emerald-800/20 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="bg-emerald-900 text-emerald-300 font-bold px-4 py-1 rounded-full text-xs uppercase tracking-widest border border-emerald-800">
              Get in Touch
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold mt-3">
              Contact Us
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mt-4">
              Have inquiries? Reach us today.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">

            {/* Left Column: Direct Address & Contact Information Cards */}
            <div className="lg:col-span-5 space-y-6">

              <div className="bg-emerald-900/40 border border-emerald-800 rounded-3xl p-8 backdrop-blur-sm shadow-xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2 pb-3 border-b border-emerald-800/60">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>Association</span>
                </h3>

                <div className="space-y-4 text-sm sm:text-base">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-emerald-400 tracking-wider mb-1">President / Address</span>
                    <p className="text-stone-200 leading-relaxed font-semibold">
                      President,<br />
                      Nuwara Eliya Undergraduate Association (NUA),<br />
                      <span className="text-stone-300 font-normal italic"></span>
                    </p>
                  </div>

                  <div className="pt-4 border-t border-emerald-800/40">
                    <span className="block text-[10px] uppercase font-bold text-emerald-400 tracking-wider mb-1">Direct Contact No</span>
                    <p className="text-stone-200 font-mono font-medium hover:text-white transition-colors">
                      +94 76 163 2817
                    </p>
                  </div>

                  <div className="pt-4 border-t border-emerald-800/40">
                    <span className="block text-[10px] uppercase font-bold text-emerald-400 tracking-wider mb-1">Official Inquiry Email</span>
                    <p className="text-stone-200 font-mono hover:underline transition-all">
                      nuwaraeliya.ug.association@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Link Grid */}
              <div className="bg-emerald-900/40 border border-emerald-800 rounded-3xl p-8 backdrop-blur-sm shadow-xl">
                <h3 className="text-xl font-bold text-white mb-6">
                  Social Channels
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">

                  <a href="https://web.facebook.com/profile.php?id=61581709840490" className="p-4 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800/80 rounded-2xl group transition-all">
                    <div className="text-emerald-400 group-hover:scale-110 transition-transform mb-2 flex justify-center">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                      </svg>
                    </div>
                    <span className="block text-xs font-semibold text-stone-300">Facebook</span>
                  </a>

                  <a href="https://www.instagram.com/nuwaraeliya_undergraduate/" className="p-4 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800/80 rounded-2xl group transition-all">
                    <div className="text-emerald-400 group-hover:scale-110 transition-transform mb-2 flex justify-center">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </div>
                    <span className="block text-xs font-semibold text-stone-300">Instagram</span>
                  </a>

                  <a href="https://www.linkedin.com/company/nuwara-eliya-undergraduate-association/" className="p-4 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800/80 rounded-2xl group transition-all">
                    <div className="text-emerald-400 group-hover:scale-110 transition-transform mb-2 flex justify-center">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    </div>
                    <span className="block text-xs font-semibold text-stone-300">LinkedIn</span>
                  </a>

                </div>
              </div>

            </div>

            {/* Right Column: Interactive Secure Message Gateway (Form) */}
            <div className="lg:col-span-7 bg-white text-stone-900 rounded-3xl p-8 sm:p-12 shadow-2xl border border-stone-100">
              <h3 className="text-2xl font-extrabold text-emerald-950 mb-2">
                Send Us a Secure Message
              </h3>
              <p className="text-stone-500 text-sm mb-8 leading-relaxed">
                Fill the transmission framework below. Our public representative desk will parse and route your message within 24 standard business hours.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-6">

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 rounded-xl p-3 text-sm focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. name@university.edu"
                    className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 rounded-xl p-3 text-sm focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Detailed Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Write your inquiries here..."
                    className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 rounded-xl p-3 text-sm focus:outline-none transition-all resize-none"
                  ></textarea>
                </div>

                {/* Simulated feedback states (Replaces traditional alert dialogue to fulfill constraint) */}
                {sendingState === "sending" && (
                  <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl flex items-center space-x-3 text-sm animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-emerald-700 animate-ping"></span>
                    <span>Tinkering with server pathways... Sending securely...</span>
                  </div>
                )}

                {sendingState === "success" && (
                  <div className="p-4 bg-emerald-100 text-emerald-950 border border-emerald-300 rounded-xl flex items-center space-x-3 text-sm animate-fadeIn">
                    <svg className="w-5 h-5 text-emerald-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Success! Message received securely by the NUA Secretarial Panel.</span>
                  </div>
                )}

                {sendingState === "error" && (
                  <div className="p-4 bg-rose-50 text-rose-800 border border-rose-200 rounded-xl flex items-center space-x-3 text-sm animate-shake">
                    <svg className="w-5 h-5 text-rose-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Please fill in all the required input forms carefully.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sendingState === "sending"}
                  className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-bold p-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                >
                  {sendingState === "sending" ? "Transmitting..." : "Transmit Message"}
                </button>

              </form>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-emerald-950 border-t border-emerald-900/60 text-stone-400 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm">

          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            <div className="w-8 h-8 rounded-lg bg-white overflow-hidden flex items-center justify-center shadow-md">
              <img src={logo} alt="NUA Logo" className="w-full h-full object-contain p-0.5" />
            </div>
            <div>
              <span className="block font-bold text-white text-base">NUA Media Unit</span>
              <span className="block text-[9px] uppercase tracking-widest text-emerald-400">Since 2024</span>
            </div>
          </div>

          <p className="text-center md:text-right text-xs text-stone-400">
            &copy; 2026 Nuwara Eliya Undergraduate Association (NUA). All Rights Reserved.<br />
          </p>

        </div>
      </footer>

    </div>
  );
}


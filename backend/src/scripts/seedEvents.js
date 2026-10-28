const { supabase } = require('../config/supabase');

const eventsData = [
  {
    title: "Awareness Program for O/L Students",
    description: "An intensive 3-day program fostering synergy, professional ethics, and organizational management for students.",
    date: "May 15, 2024",
    location: "Holy Trinity College (National School), Nuwara Eliya",
    category: "past",
    image_url: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "University Enrollment Guidance Program",
    description: "Providing instructions and guidance on applying to universities.",
    date: "June 15, 2024",
    location: "Zoom (Online)",
    category: "past",
    image_url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "University Course Selection",
    description: "Assisting students with university applications and course selection.",
    date: "June 21, 2024",
    location: "Shakthi Education Centre, Hatton",
    category: "past",
    image_url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "LinkedIn Awareness Program",
    description: "Discussing the importance of LinkedIn and how to use it effectively.",
    date: "June 26, 2024",
    location: "Zoom (Online)",
    category: "past",
    image_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Webinar for A/L Students",
    description: "In-depth subject revision for English, Tamil, Arts, and Political Science.",
    date: "October 17-20, 2024",
    location: "Zoom (Online)",
    category: "past",
    image_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "CyberHour",
    description: "Empowering and educating people about online safety, cybersecurity, and digital awareness.",
    date: "February 08, 2025",
    location: "Zoom (Online)",
    category: "past",
    image_url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "CV Preparation Workshop",
    description: "A workshop to help students prepare professional CVs.",
    date: "February 09, 2025",
    location: "Zoom (Online)",
    category: "past",
    image_url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Empower Her: International Women's Day Celebration",
    description: "A virtual event organized by the Nuwara Eliya Undergraduate Association to celebrate International Women's Day.",
    date: "March 08, 2025",
    location: "Zoom (Online)",
    category: "past",
    image_url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Thalir Vasantham",
    description: "Thalir Vasantham - Sinhala and Tamil New Year Celebration.",
    date: "April 15, 2025",
    location: "Shri Muththu Vinayagar Devasthanam, Cultural Hall, Kotagala",
    category: "past",
    image_url: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Olikkanal 2025",
    description: "A special event dedicated to celebrating the Vesak festival.",
    date: "May 10, 2025",
    location: "CP/HZ/Ganesha Vidyalayam, Rozella",
    category: "past",
    image_url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Career Guidance Program",
    description: "Providing career guidance and counseling for O/L students.",
    date: "October 12, 2025",
    location: "CP/HZ/Ganesha Vidyalayam, Rozella",
    category: "past",
    image_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Tree Planting Campaign",
    description: "A student-led environmental protection and tree planting campaign, encouraging young minds to take responsibility and act for the betterment of our environment.",
    date: "November 06, 2025",
    location: "CP/HZ/Agraoya Tamil Vidyalayam",
    category: "past",
    image_url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "மௌனத்தின் வயது 203",
    description: "மலையகத் தியாகிகள் தினத்தை அனுஷ்டிக்கும் முகமாக நுவரெலியா இளங்கலை பட்டதாரிகள் சங்கத்தால் ஏற்பாடு செய்யப்பட்டுள்ள சிந்தனைப் பகிர்வு.",
    date: "January 14, 2026",
    location: "Zoom (Online)",
    category: "past",
    image_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "We Are the Children of the Universe",
    description: "Celebrating the strength, dignity, and equality of women on International Women’s Day.",
    date: "March 08, 2026",
    location: "Zoom (Online)",
    category: "past",
    image_url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "GCE O/L Seminar 2026",
    description: "Learn Today; Lead Tomorrow-Science and maths seminar for O/L Students.",
    date: "July , 2026",
    location: "Wellington T.M.V",
    category: "past",
    image_url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800",
  },
];

const seedEvents = async () => {
  console.log('--- Seeding Events Table in Supabase ---');
  if (!supabase) {
    console.error('❌ Supabase not initialized.');
    process.exit(1);
  }

  try {
    const { data: existing } = await supabase.from('events').select('id');
    if (existing && existing.length > 0) {
      console.log(`ℹ️ Events table already contains ${existing.length} records. Skipping to prevent duplicates.`);
      process.exit(0);
    }

    const { data, error } = await supabase.from('events').insert(eventsData).select();
    if (error) {
      console.error('❌ Error inserting events:', error.message);
      process.exit(1);
    }

    console.log(`✅ Successfully seeded ${data.length} past events into Supabase!`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Exception:', err);
    process.exit(1);
  }
};

seedEvents();

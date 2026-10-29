const { supabase } = require('../config/supabase');

const excoData = [
  { name: "Puvanalogini", role: "President", category: "exco", university: "University of Colombo", display_order: 1 },
  { name: "Viyanujan", role: "Vice President", category: "exco", university: "University of Ruhuna", display_order: 2 },
  { name: "Dhinesh", role: "Secretary", category: "exco", university: "University of Jaffna", display_order: 3 },
  { name: "Ishalini", role: "Vice Secretary", category: "exco", university: "Eastern University", display_order: 4 },
  { name: "Sadhurshika", role: "Treasurer", category: "exco", university: "University of Kelaniya", display_order: 5 },
  { name: "Kugapriya", role: "Assistant Treasurer", category: "exco", university: "University of Ruhuna", display_order: 6 },
  { name: "Saravanapriyan", role: "Social Media Coordinator", category: "exco", university: "Uva Wellassa University", display_order: 7 },
  { name: "Dhawanharan", role: "Co-Social Media Coordinator", category: "exco", university: "Eastern University", display_order: 8 },
  { name: "Dharmika", role: "Editor", category: "exco", university: "University of Peradeniya", display_order: 9 },
  { name: "Lakshika", role: "Co-Editor", category: "exco", university: "Uva Wellassa University", display_order: 10 },
  { name: "Nimalini", role: "Project Coordinator", category: "exco", university: "Sabaragamuwa University", display_order: 11 },
];

const repsData = [
  { name: "Thiruselvam", role: "Area Representative", area: "Bogawanthalawa", category: "rep", university: "University of Jaffna", display_order: 1 },
  { name: "Babithra", role: "Area Representative", area: "Dayagama", category: "rep", university: "Vavuniya University", display_order: 2 },
  { name: "Pramya", role: "Area Representative", area: "Dickoya", category: "rep", university: "Eastern University", display_order: 3 },
  { name: "Dhayalini", role: "Area Representative", area: "Hatton", category: "rep", university: "University of Jaffna", display_order: 4 },
  { name: "Sadhana", role: "Area Representative", area: "Kotagala", category: "rep", university: "University of Jaffna", display_order: 5 },
  { name: "Loshanya", role: "Area Representative", area: "Maskeliya", category: "rep", university: "University of Jaffna", display_order: 6 },
  { name: "Dhanushk", role: "Area Representative", area: "Norwood", category: "rep", university: "University of Sri Jayewardenepura", display_order: 7 },
  { name: "Pavithra", role: "Area Representative", area: "Nuwara Eliya", category: "rep", university: "Sabaragamuwa University", display_order: 8 },
  { name: "Kavishan", role: "Area Representative", area: "Talawakale", category: "rep", university: "University of Jaffna", display_order: 9 },
  { name: "Baskaran", role: "Area Representative", area: "Watawala", category: "rep", university: "Eastern University", display_order: 10 },
];

const seedCommittee = async () => {
  console.log('--- Seeding Committee & Area Representatives ---');
  if (!supabase) {
    console.error('❌ Supabase not initialized.');
    process.exit(1);
  }

  try {
    const { data: existing } = await supabase.from('committee_members').select('id');
    if (existing && existing.length > 0) {
      console.log(`ℹ️ Committee table already contains ${existing.length} records. Skipping to prevent duplicates.`);
      process.exit(0);
    }

    const allMembers = [...excoData, ...repsData];
    const { data, error } = await supabase.from('committee_members').insert(allMembers).select();
    if (error) {
      console.error('❌ Error inserting committee members:', error.message);
      process.exit(1);
    }

    console.log(`✅ Successfully seeded ${data.length} team members into Supabase!`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Exception during committee seed:', err);
    process.exit(1);
  }
};

seedCommittee();


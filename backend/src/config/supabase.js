const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

let supabase = null;

if (supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder')) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    console.log('[Supabase] Client initialized successfully.');
  } catch (err) {
    console.warn('[Supabase] Initialization warning:', err.message);
  }
} else {
  console.warn('[Supabase] Notice: Placeholder or missing Supabase credentials in backend/.env.');
  console.warn('[Supabase] Update backend/.env with your real project URL and service_role key when ready.');
}

module.exports = {
  supabase,
  bucketName: process.env.SUPABASE_STORAGE_BUCKET || 'nua-photos',
};

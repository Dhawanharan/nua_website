const bcrypt = require('bcryptjs');
const { supabase } = require('../config/supabase');

const seedSuperAdmin = async () => {
  console.log('--- Seeding Super Admin Account ---');

  if (!supabase) {
    console.error('❌ Supabase not configured in .env. Exiting.');
    process.exit(1);
  }

  const name = 'super admin';
  const email = 'superadmin@gmail.com';
  const plainPassword = 'admin@123';
  const privilege = 'super_admin';
  const committee_role = 'President';

  try {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(plainPassword, salt);

    // Check if user already exists
    const { data: existing, error: checkError } = await supabase
      .from('admin_users')
      .select('id, email')
      .ilike('email', email)
      .maybeSingle();

    if (checkError) {
      console.error('❌ Error checking admin_users table:', checkError.message);
      console.log('💡 Ensure the admin_users table has been created in Supabase SQL editor.');
      process.exit(1);
    }

    if (existing) {
      // Update password and privilege
      const { error: updateError } = await supabase
        .from('admin_users')
        .update({
          name,
          password_hash,
          privilege,
          committee_role,
          is_active: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id);

      if (updateError) {
        console.error('❌ Error updating Super Admin:', updateError.message);
        process.exit(1);
      }

      console.log(`✅ Super Admin (${email}) password and details updated successfully!`);
    } else {
      // Insert new Super Admin
      const { data: inserted, error: insertError } = await supabase
        .from('admin_users')
        .insert([
          {
            name,
            email,
            password_hash,
            privilege,
            committee_role,
            is_active: true,
          },
        ])
        .select()
        .single();

      if (insertError) {
        console.error('❌ Error inserting Super Admin:', insertError.message);
        process.exit(1);
      }

      console.log(`✅ Super Admin created successfully!`);
      console.log(`   ID: ${inserted.id}`);
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${plainPassword}`);
      console.log(`   Privilege: ${privilege}`);
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Exception during seeding:', err);
    process.exit(1);
  }
};

seedSuperAdmin();

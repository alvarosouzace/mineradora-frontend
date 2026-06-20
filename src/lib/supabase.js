import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gcjlddruwnixokhbhlyp.supabase.co'
const supabaseKey = 'sb_publishable_rdNKXzdgF7AmzGlFvbx2Lg_lXuMk1Fz'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)
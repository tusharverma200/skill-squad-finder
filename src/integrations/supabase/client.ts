// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://auhpxobjwassqkmjbqqj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1aHB4b2Jqd2Fzc3FrbWpicXFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MTU0MzAsImV4cCI6MjA2MDE5MTQzMH0.XeRWZoJIRCV4Z5eqCQK_2o2piEc7rnkcdjEgeFnCphI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
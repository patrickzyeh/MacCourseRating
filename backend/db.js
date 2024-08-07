import { createClient } from "@supabase/supabase-js";
import env from "dotenv";

env.config();

const supabaseUrl = process.env.DATABASE_URL;
const supabaseKey = process.env.DATABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

/**
 * Supabase integration placeholder.
 * Connect when backend is ready — no fetch in this module yet.
 */

export const SUPABASE_CONFIG = {
  url: '',
  anonKey: '',
};

export const isSupabaseConfigured = (): boolean =>
  Boolean(SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey);

export default SUPABASE_CONFIG;

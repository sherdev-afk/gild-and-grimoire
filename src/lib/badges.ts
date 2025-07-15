import { supabase } from './supabase';

export async function evaluateBadges(userId: string) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('xp, badges, guild')
    .eq('id', userId)
    .single();

  const { data: relics } = await supabase
    .from('relics')
    .select('id')
    .eq('user_id', userId)
    .eq('approved', true);

  const { data: comments } = await supabase
    .from('comments')
    .select('id')
    .eq('user_id', userId);

  const newBadges = new Set(profile?.badges || []);

  if ((profile?.xp ?? 0) >= 100) newBadges.add('Relic Master');
  if ((comments?.length ?? 0) >= 5) newBadges.add('Lorekeeper');
  if ((relics?.length ?? 0) >= 3) newBadges.add('Artisan');
  if (profile?.guild) newBadges.add('Guild Initiate');

  await supabase
    .from('profiles')
    .update({ badges: Array.from(newBadges) })
    .eq('id', userId);
}
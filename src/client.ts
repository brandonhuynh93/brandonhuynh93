import { createClient } from '@supabase/supabase-js';

export interface Row {
  id: number,
  first_name: string,
  last_name: string,
  score: number,
}

export const supabase = createClient('https://djgbizlhuuordpktmaqe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqZ2JpemxodXVvcmRwa3RtYXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTYzNTc3MDUsImV4cCI6MTk3MTkzMzcwNX0.gUFkCODqAU0xc2bwTsysB9p61hXG0uSaMSMzTMnYl6Q');

export async function loadRow(
  id: number,
) {
  return supabase
    .from('data')
    .select('*')
    .eq('id', id);
}

export async function updateRow(
  row: Row,
) {
  return supabase
    .from('data')
    .update({
      first_name: row.first_name,
      last_name: row.last_name,
      score: row.score,
    })
    .eq('id', row.id);
}

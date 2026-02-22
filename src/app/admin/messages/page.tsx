import { supabaseAdmin } from "@/lib/supabase-admin";
import AdminMessagesClient from "@/components/AdminMessagesClient";

export const revalidate = 0;

export default async function AdminMessages() {
  const { data } = await supabaseAdmin
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  return <AdminMessagesClient messages={data || []} />;
}

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

// One-time setup endpoint to create the factures table
// DELETE this file after running it once
export async function POST() {
  try {
    // Test if table already exists
    const { error: testError } = await supabaseAdmin
      .from("factures")
      .select("id")
      .limit(1);

    if (!testError) {
      return NextResponse.json({ message: "Table factures existe déjà" });
    }

    // Use raw SQL via rpc - we need to create a helper function first
    // Since supabase-js doesn't support raw DDL, we'll create entries via the REST API
    // Actually, we'll use the postgres connection directly
    const { Client } = require("pg");
    const dbUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;

    if (!dbUrl) {
      return NextResponse.json(
        { error: "DATABASE_URL non définie. Ajoutez-la sur Vercel." },
        { status: 500 }
      );
    }

    const client = new Client({
      connectionString: dbUrl,
      ssl: { rejectUnauthorized: false },
    });

    await client.connect();

    await client.query(`
      CREATE TABLE IF NOT EXISTS factures (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        numero TEXT NOT NULL UNIQUE,
        commande_id UUID REFERENCES commandes(id),
        client_name TEXT NOT NULL,
        client_email TEXT NOT NULL,
        items JSONB NOT NULL DEFAULT '[]',
        subtotal INTEGER NOT NULL DEFAULT 0,
        tax INTEGER NOT NULL DEFAULT 0,
        total INTEGER NOT NULL DEFAULT 0,
        status TEXT NOT NULL DEFAULT 'brouillon' CHECK (status IN ('brouillon', 'envoyee', 'payee')),
        notes TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await client.query("ALTER TABLE factures ENABLE ROW LEVEL SECURITY;");
    await client.end();

    return NextResponse.json({ success: true, message: "Table factures créée" });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

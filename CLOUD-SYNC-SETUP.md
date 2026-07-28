# Cloud Sync setup (Supabase) — one shop across all your devices

This makes your orders, products, rates, and detections live-shared across every device you use. Confirm an order on your phone and it shows up on your tablet a second later. You set this up **once** in Supabase, then enter the details on each device.

It's free (Supabase's free tier is plenty for this), and your app still runs with no server of your own.

---

## Part 1 — Create your Supabase project (one time, ~5 min)

1. Go to **supabase.com** → sign up (free) → **New project**.
2. Give it a name (e.g. "pasabuy"), set a database password (save it somewhere), pick the region closest to you, and create. Wait ~1 minute for it to finish setting up.

## Part 2 — Create the table (copy-paste, 30 sec)

1. In your project, open **SQL Editor** (left sidebar) → **New query**.
2. Paste this and click **Run**:

```sql
create table if not exists public.shops (
  code text primary key,
  data jsonb,
  rev bigint default 0,
  client text,
  updated_at timestamptz default now()
);

alter table public.shops enable row level security;

create policy "shop access" on public.shops
  for all to anon
  using (true) with check (true);

-- turn on live updates for this table
alter publication supabase_realtime add table public.shops;
```

You should see "Success. No rows returned." That's it — the database is ready.

## Part 3 — Get your two connection values

1. In Supabase go to **Project Settings** (gear icon) → **API**.
2. Copy two things:
   - **Project URL** — looks like `https://abcdxyz.supabase.co`
   - **anon public** key — a long string starting with `eyJ...` (use the one labelled **anon / public**, NOT the service_role key)

## Part 4 — Turn on sync in the app

1. Open your app → the **☁️ Cloud sync** card near the top → tap to expand it.
2. Paste your **Project URL** and **anon key**.
3. Make up a **secret shop code** — use something long and hard to guess, e.g. `myleen-pasabuy-9f3k2q`. This is like a password for your data; don't share it publicly.
4. Tap **Connect & sync**. You'll see "Cloud copy created ✓". Your current data is now in the cloud.

## Part 5 — Add your other devices

On each additional device (tablet, second phone, laptop):
- **Quick way:** on the already-connected device, tap **📋 Copy setup for another device**, send that text to the other device (message it to yourself), then on the new device open Cloud sync → paste into **Paste setup from your other device** → **Apply pasted setup**. Done.
- **Manual way:** just type the same Project URL, anon key, and shop code, then **Connect & sync**.

Now all devices with that shop code share one live set of data. 🎉

---

## Good to know

- **Live updates:** when one device changes something, the others refresh within about a second. A little "↻ Synced from another device" note appears.
- **Your Facebook token is NOT synced.** For safety it stays on each device — so on each device you'll paste your FB token once (in the 📡 Live → Watcher setup). Everything else (orders, products, rates, prices, confirmed/dismissed detections) is shared.
- **Works offline too:** if a device loses internet, it keeps working from its local copy and syncs back up when it reconnects.
- **Security:** anyone who has your Project URL, anon key, **and** shop code could read your data. The URL/key are only stored on your devices (not on the public website), and the shop code is your secret — keep all three private. If you ever think the code leaked, change the shop code on all devices (and optionally delete the old row in Supabase → Table Editor → shops).
- **One person at a time is ideal.** Since it's just you across devices, edits sync cleanly. If two devices edit at the exact same second, the last save wins — not a problem for solo use, but worth knowing.

## Resetting / starting the cloud copy over
In Supabase → **Table Editor → shops**, you can delete the row for your shop code to wipe the cloud copy; the next device that connects will re-create it from its local data.

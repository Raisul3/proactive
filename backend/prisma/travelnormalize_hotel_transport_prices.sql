-- Move transport data from JSON into the dedicated transport_options table
insert into public.transport_options (id, package_id, mode, price, is_verified, source)
select gen_random_uuid()::text, tp.id, kv.key, (kv.value)::numeric, false, 'Internal estimate (unverified)'
from public.travel_packages tp,
     jsonb_each_text(tp.transport) as kv(key, value)
where (kv.value)::numeric > 0
on conflict do nothing;

-- Move hotel data from JSON into the dedicated hotel_options table
insert into public.hotel_options (id, package_id, tier, price_per_night, is_verified, source)
select gen_random_uuid()::text, tp.id, kv.key, (kv.value)::numeric, false, 'Internal estimate (unverified)'
from public.travel_packages tp,
     jsonb_each_text(tp.hotel) as kv(key, value)
where (kv.value)::numeric > 0
on conflict do nothing;

-- Add database indexes to guarantee extremely fast search queries
create index if not exists idx_transport_options_package on public.transport_options(package_id);
create index if not exists idx_hotel_options_package      on public.hotel_options(package_id);
create index if not exists idx_transport_options_mode     on public.transport_options(mode);
create index if not exists idx_hotel_options_tier         on public.hotel_options(tier);
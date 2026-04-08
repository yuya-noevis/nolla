-- Batch 8 security/GDPR hardening (2026-04-08)
-- 1. parents DELETE policy (GDPR Art.17 — right to erasure)
-- 2. room_items.collectible_id ON DELETE CASCADE (orphan row prevention)

create policy "parents_own_delete" on parents
  for delete using (auth.uid() = auth_id);

alter table room_items
  drop constraint if exists room_items_collectible_id_fkey;

alter table room_items
  add constraint room_items_collectible_id_fkey
  foreign key (collectible_id) references collectibles(id) on delete cascade;

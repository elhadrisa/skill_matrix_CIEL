import { json } from "./_lib/state.js";

export function onRequestGet() {
  return json({ ok: true });
}

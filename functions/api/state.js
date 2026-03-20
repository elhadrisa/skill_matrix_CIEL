import { json, loadState, requireSession, saveState } from "./_lib/state.js";

export async function onRequestGet(context) {
  const auth = await requireSession(context);
  if (auth.error) return auth.error;
  const data = await loadState(context.env.APP_DB);
  return json({ data });
}

export async function onRequestPost(context) {
  const auth = await requireSession(context);
  if (auth.error) return auth.error;

  const body = await context.request.json().catch(() => null);
  if (!body?.data) {
    return json({ error: "missing_data" }, { status: 400 });
  }

  await saveState(context.env.APP_DB, body.data);
  return json({ ok: true });
}

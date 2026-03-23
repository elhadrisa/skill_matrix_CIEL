import { json, loadState, requireSession, saveState } from "./_lib/state.js";

export async function onRequestGet(context) {
  const auth = await requireSession(context);
  if (auth.error) return auth.error;

  const state = (await loadState(context.env.APP_DB)) || {};
  return json({ accounts: Array.isArray(state.accounts) ? state.accounts : [] });
}

export async function onRequestPost(context) {
  const auth = await requireSession(context);
  if (auth.error) return auth.error;

  const body = await context.request.json().catch(() => null);
  if (!Array.isArray(body?.accounts)) {
    return json({ error: "missing_accounts" }, { status: 400 });
  }

  const state = (await loadState(context.env.APP_DB)) || {};
  state.accounts = body.accounts;
  await saveState(context.env.APP_DB, state);

  return json({ ok: true, accounts: state.accounts });
}

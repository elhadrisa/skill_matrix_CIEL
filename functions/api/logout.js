import { buildCookie, deleteSession, json } from "./_lib/state.js";

export async function onRequestPost(context) {
  await deleteSession(context.env.APP_DB, context.request);
  return json(
    { ok: true },
    {
      headers: {
        "set-cookie": buildCookie("ciel_session", "", { maxAge: 0 })
      }
    }
  );
}

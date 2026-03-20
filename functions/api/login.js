import { buildCookie, createSession, findUser, json, loadState } from "./_lib/state.js";

export async function onRequestPost(context) {
  const body = await context.request.json().catch(() => null);
  if (!body?.username || !body?.password) {
    return json({ error: "missing_credentials" }, { status: 400 });
  }

  const user = await findUser(context.env.APP_DB, body.username);
  if (!user || user.password !== body.password) {
    return json({ error: "invalid_credentials" }, { status: 401 });
  }

  const session = await createSession(context.env.APP_DB, user);
  const state = await loadState(context.env.APP_DB);

  return json(
    {
      session: {
        username: session.username,
        role: session.role,
        label: session.label
      },
      data: state
    },
    {
      headers: {
        "set-cookie": buildCookie("ciel_session", session.token, { maxAge: 60 * 60 * 24 * 14 })
      }
    }
  );
}

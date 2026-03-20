import { json, loadState, requireSession } from "./_lib/state.js";

export async function onRequestGet(context) {
  const auth = await requireSession(context);
  if (auth.error) return auth.error;

  const data = await loadState(context.env.APP_DB);
  return json({
    session: {
      username: auth.session.username,
      role: auth.session.role,
      label: auth.session.label
    },
    data
  });
}

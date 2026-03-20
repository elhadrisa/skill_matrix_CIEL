function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...(init.headers || {})
    }
  });
}

function getCookie(request, name) {
  const cookie = request.headers.get("cookie") || "";
  const parts = cookie.split(";").map((part) => part.trim());
  const prefix = `${name}=`;
  const match = parts.find((part) => part.startsWith(prefix));
  return match ? decodeURIComponent(match.slice(prefix.length)) : "";
}

function buildCookie(name, value, options = {}) {
  const pieces = [`${name}=${encodeURIComponent(value)}`];
  pieces.push(`Path=${options.path || "/"}`);
  if (options.httpOnly !== false) pieces.push("HttpOnly");
  pieces.push(`SameSite=${options.sameSite || "Lax"}`);
  if (options.maxAge !== undefined) pieces.push(`Max-Age=${options.maxAge}`);
  if (options.secure !== false) pieces.push("Secure");
  return pieces.join("; ");
}

async function loadState(db) {
  const row = await db.prepare("SELECT data FROM app_state WHERE id = 1").first();
  if (!row?.data) return null;
  return JSON.parse(row.data);
}

async function saveState(db, data) {
  const payload = JSON.stringify(data);
  await db
    .prepare(
      "INSERT INTO app_state (id, data, updated_at) VALUES (1, ?, CURRENT_TIMESTAMP) ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = CURRENT_TIMESTAMP"
    )
    .bind(payload)
    .run();
}

async function findUser(db, username) {
  const state = await loadState(db);
  const fallbackAccounts = [
    {
      id: "admin-account",
      username: "admin",
      password: "admin123",
      role: "admin",
      label: "Administrateur"
    }
  ];
  const accounts = Array.isArray(state?.accounts) && state.accounts.length ? state.accounts : fallbackAccounts;
  return accounts.find((account) => String(account.username || "").toLowerCase() === username.toLowerCase()) || fallbackAccounts.find((account) => account.username.toLowerCase() === username.toLowerCase()) || null;
}

function createToken() {
  return crypto.randomUUID();
}

async function createSession(db, user) {
  const token = createToken();
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 14;
  await db
    .prepare("INSERT INTO sessions (token, username, role, label, expires_at) VALUES (?, ?, ?, ?, ?)")
    .bind(token, user.username, user.role, user.label, expiresAt)
    .run();
  return { token, username: user.username, role: user.role, label: user.label };
}

async function getSession(db, request) {
  const token = getCookie(request, "ciel_session");
  if (!token) return null;
  const row = await db
    .prepare("SELECT token, username, role, label, expires_at FROM sessions WHERE token = ?")
    .bind(token)
    .first();
  if (!row) return null;
  if (Number(row.expires_at) < Date.now()) {
    await db.prepare("DELETE FROM sessions WHERE token = ?").bind(token).run();
    return null;
  }
  return row;
}

async function deleteSession(db, request) {
  const token = getCookie(request, "ciel_session");
  if (!token) return;
  await db.prepare("DELETE FROM sessions WHERE token = ?").bind(token).run();
}

async function requireSession(context) {
  const session = await getSession(context.env.APP_DB, context.request);
  if (!session) {
    return { error: json({ error: "unauthorized" }, { status: 401 }) };
  }
  return { session };
}

export {
  buildCookie,
  deleteSession,
  findUser,
  json,
  loadState,
  requireSession,
  saveState,
  createSession
};

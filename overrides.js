const OVERRIDE_STORAGE_KEY = "ciel-competences-app";
const OVERRIDE_SESSION_KEY = "ciel-session";
const OVERRIDE_DEFAULT_ACCOUNTS = [
  { id: "admin-account", username: "admin", password: "admin123", role: "admin", label: "Administrateur" },
  { id: "teacher-account-1", username: "prof", password: "prof123", role: "professeur", label: "Professeur" }
];
const OVERRIDE_ROLE_LABELS = {
  admin: "Administrateur",
  prof_principal: "Prof principal",
  professeur: "Professeur",
  lecture: "Lecture seule"
};

function overrideGetPage() {
  return document.body?.dataset?.page || "";
}

function overrideGetRoleLabel(role) {
  return OVERRIDE_ROLE_LABELS[role] || "Professeur";
}

function overrideLoadState() {
  try {
    const raw = localStorage.getItem(OVERRIDE_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function overrideSaveState() {
  if (typeof app === "undefined") return;
  localStorage.setItem(OVERRIDE_STORAGE_KEY, JSON.stringify(app));
}

function overrideLoadAccounts() {
  const state = overrideLoadState();
  const accounts = Array.isArray(state?.accounts) && state.accounts.length ? state.accounts : OVERRIDE_DEFAULT_ACCOUNTS;
  return accounts.map((account, index) => ({
    id: account.id || `account-${index + 1}`,
    username: String(account.username || "").trim(),
    password: String(account.password || ""),
    role: account.role || "professeur",
    label: account.label || overrideGetRoleLabel(account.role || "professeur")
  }));
}

function overrideSetSession(session) {
  localStorage.setItem(OVERRIDE_SESSION_KEY, JSON.stringify(session));
}

function overrideGetSession() {
  try {
    const raw = localStorage.getItem(OVERRIDE_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function overrideClearSession() {
  localStorage.removeItem(OVERRIDE_SESSION_KEY);
}

function overrideCloneNode(selector) {
  const element = document.querySelector(selector);
  if (!element) return null;
  const clone = element.cloneNode(true);
  element.replaceWith(clone);
  return clone;
}

function overrideSortClasses(classes) {
  const order = { "2CIEL": 1, "1CIEL": 2, "TCIEL": 3 };
  const items = Array.isArray(classes) ? [...classes] : [];
  return items.sort((a, b) => (order[overrideClassLabel(a)] || 99) - (order[overrideClassLabel(b)] || 99));
}

function overrideClassLabel(classItem) {
  const name = String(classItem?.name || "").toLowerCase();
  if (name.includes("term")) return "TCIEL";
  if (name.includes("prem")) return "1CIEL";
  if (name.includes("2") || name.includes("seconde")) return "2CIEL";
  return String(classItem?.name || "Classe");
}

function overrideBuildNav() {
  const page = overrideGetPage();
  if (!page || page === "home" || page === "login") return;
  const session = overrideGetSession();
  document.querySelectorAll(".nav-tabs").forEach((nav) => {
    nav.innerHTML = "";
    const addLink = (href, label, active) => {
      const link = document.createElement("a");
      link.href = href;
      link.className = `nav-tab${active ? " active" : ""}`;
      link.textContent = label;
      nav.appendChild(link);
    };
    const addDropdown = (label, items, active, key) => {
      const dropdown = document.createElement("details");
      dropdown.className = `nav-dropdown${active ? " active" : ""}`;
      dropdown.dataset.key = key;
      dropdown.innerHTML = `
        <summary class="nav-tab nav-dropdown-toggle">${label} ▾</summary>
        <div class="nav-dropdown-menu">
          ${items.map((item) => item.type === "label"
            ? `<span class="nav-dropdown-group">${item.label}</span>`
            : `<a class="nav-dropdown-link" href="${item.href}">${item.label}</a>`).join("")}
        </div>
      `;
      nav.appendChild(dropdown);
    };

    addLink("index.html", "Accueil", page === "home");
    addLink("classes.html", "Classes", page === "classes");

    const classItems = overrideSortClasses((typeof app !== "undefined" && Array.isArray(app.classes)) ? app.classes : []);
    addDropdown("Dashboard", classItems.flatMap((classItem) => ([
      { type: "label", label: overrideClassLabel(classItem) },
      { href: `dashboard.html?class=${encodeURIComponent(classItem.id)}&view=skills`, label: "Pilotage competences" },
      { href: `dashboard.html?class=${encodeURIComponent(classItem.id)}&view=pfmp`, label: "Pilotage PFMP" },
      { href: `dashboard.html?class=${encodeURIComponent(classItem.id)}&view=calendar`, label: "Calendrier pedagogique" }
    ])), page === "dashboard", "dashboard-menu");

    addDropdown("Evaluations", classItems.flatMap((classItem) => ([
      { type: "label", label: overrideClassLabel(classItem) },
      { href: `evaluations.html?class=${encodeURIComponent(classItem.id)}&view=create`, label: "Creation de seance" },
      { href: `evaluations.html?class=${encodeURIComponent(classItem.id)}&view=session`, label: "Evaluation seance" },
      { href: `evaluations.html?class=${encodeURIComponent(classItem.id)}&view=skills`, label: "Competences eleves" }
    ])), page === "evaluations", "evaluations-menu");

    addDropdown("PFMP", classItems.flatMap((classItem) => ([
      { type: "label", label: overrideClassLabel(classItem) },
      { href: `pfmp.html?class=${encodeURIComponent(classItem.id)}`, label: "Infos PFMP" },
      { href: `pfmp-livret.html?class=${encodeURIComponent(classItem.id)}`, label: "Livret d'evaluation" }
    ])), page === "pfmp" || page === "pfmp_livret", "pfmp-menu");

    addDropdown("Referentiel", [
      { href: "coverage.html", label: "Couverture" },
      { href: "mapping.html", label: "Cartographie" },
      { href: "library.html", label: "Bibliotheque de seances" }
    ], page === "coverage" || page === "mapping" || page === "library", "referentiel-menu");

    addDropdown("Remediations", [
      { href: "remediation-pfmp.html", label: "PFMP" },
      { href: "remediation-competences.html", label: "Competences" }
    ], page === "remediation_pfmp" || page === "remediation_competences", "remediation-menu");

    if (session?.role === "admin") {
      addLink("accounts.html", "Comptes", page === "accounts");
    }

    const roleBadge = document.createElement("span");
    roleBadge.id = "session-role";
    roleBadge.className = "badge accent";
    roleBadge.textContent = session?.label || "";
    nav.appendChild(roleBadge);

    const logoutButton = document.createElement("button");
    logoutButton.id = "logout-button";
    logoutButton.className = "ghost-button";
    logoutButton.type = "button";
    logoutButton.textContent = "Deconnexion";
    logoutButton.addEventListener("click", async () => {
      try {
        await fetch("/api/logout", { method: "POST", credentials: "include" });
      } catch {}
      overrideClearSession();
      window.location.replace("login.html");
    });
    nav.appendChild(logoutButton);
  });

  document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
    dropdown.addEventListener("toggle", () => {
      if (!dropdown.open) return;
      document.querySelectorAll(".nav-dropdown").forEach((other) => {
        if (other !== dropdown) other.removeAttribute("open");
      });
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest(".nav-dropdown")) return;
    document.querySelectorAll(".nav-dropdown").forEach((dropdown) => dropdown.removeAttribute("open"));
  });

  document.querySelectorAll(".nav-dropdown-link").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".nav-dropdown").forEach((dropdown) => dropdown.removeAttribute("open"));
    });
  });
}

function overrideBindLogin() {
  if (overrideGetPage() !== "login") return;
  const form = overrideCloneNode("#login-form");
  const usernameInput = document.querySelector("#login-username");
  const passwordInput = document.querySelector("#login-password");
  const feedback = document.querySelector("#login-feedback");
  if (!form || !usernameInput || !passwordInput || !feedback) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = usernameInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    if (!username || !password) {
      feedback.textContent = "Renseigne un identifiant et un mot de passe.";
      return;
    }

    feedback.textContent = "Connexion en cours...";

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const payload = await response.json().catch(() => null);
      if (response.ok && payload?.session) {
        overrideSetSession(payload.session);
        if (typeof replaceAppState === "function") {
          replaceAppState(payload.data || overrideLoadState() || {});
        }
        window.location.replace("dashboard.html");
        return;
      }
    } catch {}

    const accounts = overrideLoadAccounts();
    const found = accounts.find((account) => String(account.username || "").toLowerCase() === username);
    if (found && found.password === password) {
      overrideSetSession({
        username: found.username,
        role: found.role,
        label: found.label || overrideGetRoleLabel(found.role)
      });
      if (typeof replaceAppState === "function") {
        replaceAppState(overrideLoadState() || {});
      }
      window.location.replace("dashboard.html");
      return;
    }

    if (username === "admin" && password === "admin123") {
      overrideSetSession({ username: "admin", role: "admin", label: "Administrateur" });
      if (typeof replaceAppState === "function") {
        replaceAppState(overrideLoadState() || {});
      }
      window.location.replace("dashboard.html");
      return;
    }

    feedback.textContent = "Identifiants invalides ou backend indisponible.";
  });
}

function overridePersistAccounts() {
  overrideSaveState();
  if (typeof persistCriticalAppData === "function") {
    return persistCriticalAppData();
  }
  return Promise.resolve(true);
}

function overrideBindAccountsPage() {
  if (overrideGetPage() !== "accounts") return;
  const adminForm = overrideCloneNode("#admin-account-form");
  const teacherForm = overrideCloneNode("#teacher-account-form");
  const exportJsonButton = overrideCloneNode("#export-json-button");
  const restoreJsonButton = overrideCloneNode("#restore-json-button");
  const adminUsername = document.querySelector("#admin-username");
  const adminPassword = document.querySelector("#admin-password");
  const teacherUsername = document.querySelector("#teacher-username");
  const teacherPassword = document.querySelector("#teacher-password");
  const teacherRole = document.querySelector("#teacher-role");
  const feedback = document.querySelector("#accounts-feedback");
  const accountsSummary = document.querySelector("#accounts-summary");
  const teacherAccountsList = document.querySelector("#teacher-accounts-list");
  const activityLogList = document.querySelector("#activity-log-list");
  const restoreJsonInput = document.querySelector("#restore-json-input");
  const restoreFeedback = document.querySelector("#restore-feedback");
  if (!adminForm || !teacherForm || !teacherRole) return;

  teacherRole.innerHTML = Object.entries(OVERRIDE_ROLE_LABELS)
    .map(([value, label]) => `<option value="${value}">${label}</option>`)
    .join("");
  teacherRole.value = "professeur";

  const ensureAccounts = () => {
    if (typeof app === "undefined") return;
    if (!Array.isArray(app.accounts) || !app.accounts.length) {
      app.accounts = overrideLoadAccounts();
      overrideSaveState();
    }
  };
  ensureAccounts();

  const getAdminAccount = () => (app.accounts.find((account) => account.role === "admin") || OVERRIDE_DEFAULT_ACCOUNTS[0]);
  const syncAdminFields = () => {
    const adminAccount = getAdminAccount();
    adminUsername.value = adminAccount.username;
    adminPassword.value = adminAccount.password;
  };
  syncAdminFields();

  const render = () => {
    ensureAccounts();
    const accounts = app.accounts.slice();
    const counts = Object.entries(OVERRIDE_ROLE_LABELS).map(([role, label]) => ({
      label,
      count: accounts.filter((account) => account.role === role).length
    }));

    accountsSummary.innerHTML = `
      <article class="summary-card">
        <h3>Comptes actifs</h3>
        <p class="muted-copy">${accounts.length} compte(s)</p>
      </article>
      ${counts.map((item) => `
        <article class="summary-card">
          <h3>${item.label}</h3>
          <p class="muted-copy">${item.count} compte(s)</p>
        </article>
      `).join("")}
    `;

    teacherAccountsList.innerHTML = accounts.map((account) => `
      <article class="directory-row compact">
        <div>
          <strong>${account.username}</strong>
          <p>${overrideGetRoleLabel(account.role)}</p>
        </div>
        <div class="student-badges">
          <button class="ghost-button js-account-edit" type="button" data-id="${account.id}">Modifier</button>
          ${account.role === "admin" ? "" : `<button class="ghost-button js-account-delete" type="button" data-id="${account.id}">Supprimer</button>`}
        </div>
      </article>
    `).join("");

    const logs = Array.isArray(app.activityLog) ? app.activityLog : [];
    activityLogList.innerHTML = logs.length ? logs.slice(0, 30).map((entry) => `
      <article class="directory-row compact">
        <div>
          <strong>${entry.action}</strong>
          <p>${entry.actor} // ${entry.target || ""}</p>
        </div>
      </article>
    `).join("") : `<article class="summary-card"><h3>Aucune activite</h3><p class="muted-copy">Le journal se remplira au fur et a mesure.</p></article>`;

    teacherAccountsList.querySelectorAll(".js-account-edit").forEach((button) => {
      button.addEventListener("click", async () => {
        const account = app.accounts.find((item) => item.id === button.dataset.id);
        if (!account) return;
        const username = window.prompt("Nouvel identifiant du compte", account.username);
        if (!username) return;
        const password = window.prompt("Nouveau mot de passe du compte", account.password);
        if (!password) return;
        const role = window.prompt("Nouveau role (admin, prof_principal, professeur, lecture)", account.role);
        if (!role || !OVERRIDE_ROLE_LABELS[role.trim()]) return;
        account.username = username.trim();
        account.password = password.trim();
        account.role = role.trim();
        account.label = overrideGetRoleLabel(account.role);
        overrideSaveState();
        await overridePersistAccounts();
        syncAdminFields();
        overrideBuildNav();
        feedback.textContent = "Compte modifie.";
        render();
      });
    });

    teacherAccountsList.querySelectorAll(".js-account-delete").forEach((button) => {
      button.addEventListener("click", async () => {
        const account = app.accounts.find((item) => item.id === button.dataset.id);
        if (!account) return;
        if (!window.confirm(`Supprimer le compte "${account.username}" ?`)) return;
        app.accounts = app.accounts.filter((item) => item.id !== account.id);
        overrideSaveState();
        await overridePersistAccounts();
        feedback.textContent = "Compte supprime.";
        render();
      });
    });
  };

  adminForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const adminAccount = getAdminAccount();
    adminAccount.username = adminUsername.value.trim();
    adminAccount.password = adminPassword.value.trim();
    adminAccount.role = "admin";
    adminAccount.label = "Administrateur";
    if (!app.accounts.find((account) => account.id === adminAccount.id)) {
      app.accounts.unshift(adminAccount);
    }
    overrideSaveState();
    await overridePersistAccounts();
    const currentSession = overrideGetSession();
    if (currentSession?.role === "admin") {
      overrideSetSession({ username: adminAccount.username, role: "admin", label: "Administrateur" });
    }
    overrideBuildNav();
    feedback.textContent = "Compte administrateur mis a jour.";
    render();
  });

  teacherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = teacherUsername.value.trim();
    const password = teacherPassword.value.trim();
    const role = teacherRole.value;
    if (!username || !password) return;
    const existing = app.accounts.find((account) => String(account.username || "").toLowerCase() === username.toLowerCase());
    if (existing) {
      existing.password = password;
      existing.role = role;
      existing.label = overrideGetRoleLabel(role);
    } else {
      app.accounts.push({
        id: `account-${Date.now()}`,
        username,
        password,
        role,
        label: overrideGetRoleLabel(role)
      });
    }
    overrideSaveState();
    await overridePersistAccounts();
    teacherForm.reset();
    teacherRole.value = "professeur";
    feedback.textContent = "Compte ajoute.";
    render();
  });

  exportJsonButton?.addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(app, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ciel-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    restoreFeedback.textContent = "Sauvegarde telechargee.";
  });

  restoreJsonButton?.addEventListener("click", async () => {
    const file = restoreJsonInput?.files?.[0];
    if (!file) {
      restoreFeedback.textContent = "Selectionne d'abord une sauvegarde.";
      return;
    }
    try {
      const parsed = JSON.parse(await file.text());
      if (typeof replaceAppState === "function") {
        replaceAppState(parsed);
      } else {
        localStorage.setItem(OVERRIDE_STORAGE_KEY, JSON.stringify(parsed));
      }
      await overridePersistAccounts();
      overrideBuildNav();
      restoreFeedback.textContent = "Sauvegarde restauree.";
      render();
    } catch {
      restoreFeedback.textContent = "Le fichier choisi n'est pas valide.";
    }
  });

  render();
}

function applyOverrides() {
  overrideBindLogin();
  overrideBuildNav();
  overrideBindAccountsPage();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applyOverrides, { once: true });
} else {
  applyOverrides();
}

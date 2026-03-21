const STORAGE_KEY = "ciel-competences-app";
const LEGACY_STUDENT_KEY = "ciel-competences-state";
const SESSION_KEY = "ciel-session";

const skillCatalog = [
  { id: "c1", code: "C1", domain: "Pilotage pro", title: "Communiquer en situation professionnelle", description: "Restituer clairement une intervention, échanger avec le client ou l'équipe et produire une communication technique exploitable." },
  { id: "c2", code: "C2", domain: "Pilotage pro", title: "Organiser", description: "Préparer l'activité, prioriser les opérations, gérer les ressources et structurer une intervention dans un cadre sécurisé." },
  { id: "c3", code: "C3", domain: "Pilotage pro", title: "Participer à un projet", description: "Contribuer à une réalisation collective, suivre les jalons et intégrer les contraintes de coût, délai et qualité." },
  { id: "c4", code: "C4", domain: "Étude & analyse", title: "Analyser une structure matérielle et logicielle", description: "Identifier l'architecture d'un système, comprendre ses composants et interpréter ses interactions matérielles et logicielles." },
  { id: "c5", code: "C5", domain: "Étude & analyse", title: "Concevoir", description: "Proposer une solution adaptée au besoin, choisir des composants ou services pertinents et formaliser une réponse technique." },
  { id: "c6", code: "C6", domain: "Étude & analyse", title: "Valider la conformité d'une installation", description: "Vérifier que l'installation répond au cahier des charges, aux tests attendus et aux exigences de sécurité." },
  { id: "c7", code: "C7", domain: "Étude & analyse", title: "Réaliser des maquettes et prototypes", description: "Assembler, intégrer et tester une preuve de concept matérielle ou logicielle avant déploiement." },
  { id: "c8", code: "C8", domain: "Étude & analyse", title: "Coder", description: "Développer ou adapter un code source fonctionnel, lisible et testable pour automatiser, interfacer ou piloter un système." },
  { id: "c9", code: "C9", domain: "Infra & maintien", title: "Installer les éléments d'un système électronique ou informatique", description: "Déployer les équipements, configurer les composants et mettre en service une architecture matérielle ou logicielle." },
  { id: "c10", code: "C10", domain: "Infra & maintien", title: "Exploiter un réseau informatique", description: "Superviser un réseau, assurer son fonctionnement courant et exploiter les services en condition opérationnelle." },
  { id: "c11", code: "C11", domain: "Infra & maintien", title: "Maintenir un système électronique ou réseau informatique", description: "Diagnostiquer, corriger et tracer les incidents afin de rétablir le service et préserver la disponibilité du système." }
];

const defaultClasses = [
  { id: "term-ciel", name: "Terminale CIEL", year: "2025-2026", note: "Groupe cyber & réseaux" },
  { id: "prem-ciel", name: "Première CIEL", year: "2025-2026", note: "Groupe systèmes & code" }
];

const defaultStudents = [
  { id: "lea-martin", name: "Léa Martin", classId: "term-ciel", skills: { c1: "acquis", c2: "partiellement_acquis", c3: "partiellement_acquis", c4: "partiellement_acquis", c5: "en_cours_acquisition", c6: "partiellement_acquis", c7: "en_cours_acquisition", c8: "partiellement_acquis", c9: "partiellement_acquis", c10: "en_cours_acquisition", c11: "partiellement_acquis" } },
  { id: "ines-bernard", name: "Inès Bernard", classId: "term-ciel", skills: { c1: "acquis", c2: "partiellement_acquis", c3: "partiellement_acquis", c4: "acquis", c5: "partiellement_acquis", c6: "acquis", c7: "partiellement_acquis", c8: "partiellement_acquis", c9: "partiellement_acquis", c10: "acquis", c11: "partiellement_acquis" } },
  { id: "yanis-robert", name: "Yanis Robert", classId: "prem-ciel", skills: { c1: "partiellement_acquis", c2: "en_cours_acquisition", c3: "en_cours_acquisition", c4: "partiellement_acquis", c5: "non_evalue", c6: "en_cours_acquisition", c7: "non_evalue", c8: "acquis", c9: "en_cours_acquisition", c10: "non_evalue", c11: "en_cours_acquisition" } },
  { id: "sarah-dupont", name: "Sarah Dupont", classId: "prem-ciel", skills: { c1: "en_cours_acquisition", c2: "en_cours_acquisition", c3: "non_evalue", c4: "partiellement_acquis", c5: "en_cours_acquisition", c6: "non_evalue", c7: "en_cours_acquisition", c8: "partiellement_acquis", c9: "en_cours_acquisition", c10: "non_evalue", c11: "en_cours_acquisition" } }
];

const defaultPfmpRecords = {
  "lea-martin": { companyName: "Transdev Vaux Le Penil", comment: "Deux périodes = OK", address: "400 Rue des 3 Tilleuls, 77000 Vaux-le-Pénil", tutorName: "M. Gomez", tutorEmail: "", tutorPhone: "", conventionSent: "", conventionSignedCompany: "", conventionSignedParents: "", conventionSignedSchool: "", teacher: "Bernard", visitDate: "", reportDate: "", bookletDate: "", attendanceDate: "" },
  "yanis-robert": { companyName: "Univers Permis", comment: "Deux périodes = OK", address: "200 route de Bordeaux 40600 Biscarrosse", tutorName: "M. Braham", tutorEmail: "monopat01@gmail.com", tutorPhone: "06 58 74 60 06", conventionSent: "2025-11-05", conventionSignedCompany: "2025-11-28", conventionSignedParents: "2025-11-28", conventionSignedSchool: "2025-11-28", teacher: "Salah", visitDate: "12/01/2026 à 17h15 (téléphone)", reportDate: "", bookletDate: "", attendanceDate: "" }
};

const defaultEvaluationActivities = [];
const defaultPfmpBooklets = {};
const defaultIndicatorBank = [
  {
    id: "bank-vlan-supervision",
    name: "VLAN et supervision",
    domain: "Réseau Informatique",
    indicators: ["Configurer un VLAN fonctionnel", "Verifier la connectivite inter-VLAN", "Tracer les mesures de supervision"]
  },
  {
    id: "bank-durcissement-cyber",
    name: "Durcissement cybersécurité",
    domain: "Cybersécurité",
    indicators: ["Appliquer un plan de durcissement", "Verifier les services exposes", "Documenter les ecarts et corrections"]
  },
  {
    id: "bank-prototype-electronique",
    name: "Prototype electronique",
    domain: "Electronique",
    indicators: ["Cablage conforme", "Acquisition stable", "Validation fonctionnelle du prototype"]
  }
];
const defaultLessonLibrary = [
  {
    id: "tpl-vlan-supervision",
    title: "Segmentation VLAN et supervision",
    domain: "Réseau Informatique",
    level: "TCIEL",
    duration: "4h",
    skillIds: ["c5", "c10", "c11"],
    materials: "Switch manageable, PC, Wireshark, outil de supervision",
    indicators: ["Configurer un VLAN fonctionnel", "Verifier la connectivite inter-VLAN", "Superviser les flux et tracer les resultats"],
    notes: "TP reseau complet avec validation d'architecture et exploitation."
  },
  {
    id: "tpl-durcissement-poste",
    title: "Durcissement d'un poste et controles de securite",
    domain: "Cybersécurité",
    level: "1CIEL",
    duration: "3h",
    skillIds: ["c2", "c3", "c8"],
    materials: "Machine virtuelle, checklist SSI, scripts de verification",
    indicators: ["Appliquer un plan de durcissement", "Verifier les services exposes", "Documenter les ecarts et corrections"],
    notes: "Seance orientee bonnes pratiques et automatisation de controle."
  },
  {
    id: "tpl-prototype-capteur",
    title: "Prototype electronique et acquisition",
    domain: "Electronique",
    level: "2CIEL",
    duration: "4h",
    skillIds: ["c7", "c9"],
    materials: "Carte microcontroleur, capteur, alimentation, logiciel de mesure",
    indicators: ["Cablage conforme", "Acquisition stable", "Validation fonctionnelle du prototype"],
    notes: "TP electronique introductif avec prototypage et tests."
  }
];
const defaultAccounts = [
  { id: "admin-account", username: "admin", password: "admin123", role: "admin", label: "Administrateur" },
  { id: "teacher-account-1", username: "prof", password: "prof123", role: "professeur", label: "Professeur" }
];
const defaultActivityLog = [];
const roleCatalog = [
  { value: "admin", label: "Administrateur" },
  { value: "prof_principal", label: "Prof principal" },
  { value: "professeur", label: "Professeur" },
  { value: "lecture", label: "Lecture seule" }
];
const rolePermissions = {
  admin: new Set(["manage_accounts", "manage_structure", "manage_students", "edit_evaluations", "edit_skills", "edit_pfmp", "reset_app"]),
  prof_principal: new Set(["manage_students", "edit_evaluations", "edit_skills", "edit_pfmp"]),
  professeur: new Set(["edit_evaluations", "edit_skills", "edit_pfmp"]),
  lecture: new Set([])
};

const levelLabels = {
  absent: "Absent",
  non_evalue: "Non évalué",
  non_acquis: "Non acquis",
  en_cours_acquisition: "En cours d'acquisition",
  partiellement_acquis: "Partiellement acquis",
  acquis: "Acquis"
};
const levelScores = {
  absent: 0,
  non_evalue: 0,
  non_acquis: 1,
  en_cours_acquisition: 2,
  partiellement_acquis: 3,
  acquis: 4
};
const statusColors = {
  absent: "#8a94a6",
  non_evalue: "#ff657d",
  non_acquis: "#ff8c42",
  en_cours_acquisition: "#f7c35f",
  partiellement_acquis: "#59c6ff",
  acquis: "#63f597"
};
const skillDomainOverrides = {
  c1: "Cybersécurité",
  c2: "Cybersécurité",
  c3: "Cybersécurité",
  c4: "Réseau Informatique",
  c5: "Réseau Informatique",
  c6: "Réseau Informatique",
  c7: "Electronique",
  c8: "Cybersécurité",
  c9: "Electronique",
  c10: "Réseau Informatique",
  c11: "Réseau Informatique"
};
const referentialDomains = [...new Set(skillCatalog.map((skill) => skillDomainOverrides[skill.id] || skill.domain))];
const pfmpFields = ["companyName", "comment", "address", "tutorName", "tutorEmail", "tutorPhone", "conventionSent", "conventionSignedCompany", "conventionSignedParents", "conventionSignedSchool", "teacher", "visitDate", "reportDate", "bookletDate", "attendanceDate"];
const PFMP_PERIODS = [
  { id: "seconde_1", label: "2nde - PFMP 1", cycle: "Seconde" },
  { id: "seconde_2", label: "2nde - PFMP 2", cycle: "Seconde" },
  { id: "premiere_1", label: "1ère - PFMP 1", cycle: "Première" },
  { id: "premiere_2", label: "1ère - PFMP 2", cycle: "Première" },
  { id: "terminale_1", label: "Terminale - PFMP 1", cycle: "Terminale" },
  { id: "terminale_2", label: "Terminale - PFMP 2", cycle: "Terminale" }
];

const page = document.body.dataset.page;
const PROTECTED_PAGES = new Set(["dashboard", "classes", "evaluations", "pfmp", "pfmp_livret", "accounts", "bulletin", "remediation_pfmp", "remediation_competences", "coverage", "mapping", "library"]);
const ADMIN_ONLY_PAGES = new Set(["accounts"]);
const app = createEmptyApp();
let persistTimeout = null;

initializeApp();

function createEmptyApp() {
  return hydrateAppData({ classes: defaultClasses, students: defaultStudents, pfmpRecords: defaultPfmpRecords, pfmpBooklets: defaultPfmpBooklets, evaluationActivities: defaultEvaluationActivities, indicatorBank: defaultIndicatorBank, lessonLibrary: defaultLessonLibrary, accounts: defaultAccounts, activityLog: defaultActivityLog });
}

async function initializeApp() {
  if (page === "home") {
    initHomePage();
    injectBrandLogo();
    return;
  }

  if (page === "login") {
    const bootstrap = await bootstrapFromApi();
    if (bootstrap?.session) {
      setSession(bootstrap.session);
      if (bootstrap.data) replaceAppState(bootstrap.data);
      window.location.replace("dashboard.html");
      return;
    }
    const localSession = getSession();
    if (localSession) {
      replaceAppState(loadLocalFallbackData());
      window.location.replace("dashboard.html");
      return;
    }
    replaceAppState(loadLocalFallbackData());
    initLoginPage();
    injectBrandLogo();
    return;
  }

  if (PROTECTED_PAGES.has(page)) {
    const bootstrap = await bootstrapFromApi();
    if (!bootstrap?.session) {
      const localSession = getSession();
      if (!localSession) {
        clearSession();
        window.location.replace("login.html");
        return;
      }
      replaceAppState(loadLocalFallbackData());
      if (ADMIN_ONLY_PAGES.has(page) && localSession.role !== "admin") {
        window.location.replace("dashboard.html");
        return;
      }
      if (page === "dashboard") initDashboardPageFinal();
      if (page === "classes") initClassesPageFinal();
      if (page === "evaluations") initEvaluationsPageFinal();
      if (page === "pfmp") initPfmpPageFinal();
      if (page === "pfmp_livret") initPfmpLivretPageFinal();
      if (page === "accounts") initAccountsPageFinal();
      if (page === "bulletin") initBulletinPage();
      if (page === "coverage") initCoveragePageFinal();
      if (page === "mapping") initMappingPageFinal();
      if (page === "library") initLibraryPageFinal();
      if (page === "remediation_pfmp" || page === "remediation_competences") initRemediationPageFinal();
      return;
    }

    setSession(bootstrap.session);
    if (bootstrap.data) {
      replaceAppState(bootstrap.data);
    } else {
      const fallback = loadLocalFallbackData();
      replaceAppState(fallback);
      persistAppData();
    }

    if (ADMIN_ONLY_PAGES.has(page) && bootstrap.session.role !== "admin") {
      window.location.replace("dashboard.html");
      return;
    }

    if (page === "dashboard") initDashboardPageFinal();
    if (page === "classes") initClassesPageFinal();
    if (page === "evaluations") initEvaluationsPageFinal();
    if (page === "pfmp") initPfmpPageFinal();
    if (page === "pfmp_livret") initPfmpLivretPageFinal();
    if (page === "accounts") initAccountsPageFinal();
    if (page === "bulletin") initBulletinPage();
    if (page === "coverage") initCoveragePageFinal();
    if (page === "mapping") initMappingPageFinal();
    if (page === "library") initLibraryPageFinal();
    if (page === "remediation_pfmp" || page === "remediation_competences") initRemediationPageFinal();
}
}

function getTeacherRoleValues() {
  return roleCatalog.map((role) => role.value);
}

function getTeacherAccounts() {
  const primaryAdminId = getAccountByRole("admin")?.id;
  return app.accounts.filter((account) => account.id !== primaryAdminId);
}

function removeTeacherAccount(accountId) {
  const primaryAdminId = getAccountByRole("admin")?.id;
  app.accounts = app.accounts.filter((account) => account.id === primaryAdminId || account.id !== accountId);
  persistAppData();
}

function initAccountsPageFinal() {
  bindProtectedChrome();
  const adminForm = document.querySelector("#admin-account-form");
  const teacherForm = document.querySelector("#teacher-account-form");
  const adminUsername = document.querySelector("#admin-username");
  const adminPassword = document.querySelector("#admin-password");
  const teacherUsername = document.querySelector("#teacher-username");
  const teacherPassword = document.querySelector("#teacher-password");
  const teacherRole = document.querySelector("#teacher-role");
  const feedback = document.querySelector("#accounts-feedback");
  const accountsSummary = document.querySelector("#accounts-summary");
  const teacherAccountsList = document.querySelector("#teacher-accounts-list");
  const activityLogList = document.querySelector("#activity-log-list");

  teacherRole.innerHTML = roleCatalog
    .map((role) => `<option value="${role.value}">${role.label}</option>`)
    .join("");
  teacherRole.value = "professeur";

  const adminAccount = getAccountByRole("admin");
  adminUsername.value = adminAccount.username;
  adminPassword.value = adminAccount.password;

  adminForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!adminUsername.value.trim() || !adminPassword.value.trim()) return;
    updateAccount(adminAccount.id, {
      username: adminUsername.value.trim(),
      password: adminPassword.value.trim(),
      previousUsername: adminAccount.username
    });
    logAction("Compte admin mis a jour", adminUsername.value.trim(), "Identifiant ou mot de passe modifie");
    await persistCriticalAppData();
    feedback.textContent = "Compte administrateur mis a jour.";
    renderAdministration();
  });

  teacherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!teacherUsername.value.trim() || !teacherPassword.value.trim()) return;
    const account = addTeacherAccount(teacherUsername.value.trim(), teacherPassword.value.trim(), teacherRole.value);
    logAction("Compte cree", account.username, `Role: ${getRoleLabel(account.role)}`);
    await persistCriticalAppData();
    teacherForm.reset();
    teacherRole.value = "professeur";
    feedback.textContent = "Compte ajoute.";
    renderAdministration();
  });

  renderAdministration();

  function renderAdministration() {
    const managedAccounts = getTeacherAccounts();
    const countsByRole = roleCatalog.map((role) => ({
      label: role.label,
      count: managedAccounts.filter((account) => account.role === role.value).length
    }));

    accountsSummary.innerHTML = `
      <article class="summary-card">
        <h3>Admin principal</h3>
        <p class="muted-copy">${adminAccount.username}</p>
      </article>
      <article class="summary-card">
        <h3>Comptes actifs</h3>
        <p class="muted-copy">${managedAccounts.length} compte(s)</p>
      </article>
      ${countsByRole.map((item) => `
        <article class="summary-card">
          <h3>${item.label}</h3>
          <p class="muted-copy">${item.count} compte(s)</p>
        </article>
      `).join("")}
    `;

    teacherAccountsList.innerHTML = managedAccounts.length ? managedAccounts.map((account) => `
      <article class="directory-row compact">
        <div>
          <strong>${account.username}</strong>
          <p>${account.label}</p>
        </div>
        <div class="student-badges">
          <button class="ghost-button teacher-edit" type="button" data-id="${account.id}">Modifier</button>
          <button class="ghost-button teacher-delete" type="button" data-id="${account.id}">Supprimer</button>
        </div>
      </article>
    `).join("") : `<article class="summary-card"><h3>Aucun compte</h3><p class="muted-copy">Ajoute un compte avec le formulaire ci-dessus.</p></article>`;

    activityLogList.innerHTML = app.activityLog.length ? app.activityLog.slice(0, 30).map((entry) => `
      <article class="directory-row compact">
        <div>
          <strong>${entry.action}</strong>
          <p>${entry.actor} // ${formatRole(entry.role)} // ${formatLogTimestamp(entry.timestamp)}</p>
          <p>${entry.target}${entry.detail ? ` // ${entry.detail}` : ""}</p>
        </div>
      </article>
    `).join("") : `<article class="summary-card"><h3>Aucune activite</h3><p class="muted-copy">Le journal se remplira automatiquement des les premieres actions.</p></article>`;

    teacherAccountsList.querySelectorAll(".teacher-edit").forEach((button) => {
      button.addEventListener("click", async () => {
        const account = getAccountById(button.dataset.id);
        if (!account) return;
        const username = window.prompt("Nouvel identifiant du compte", account.username);
        if (!username) return;
        const password = window.prompt("Nouveau mot de passe du compte", account.password);
        if (!password) return;
        const role = window.prompt(`Nouveau role (${getTeacherRoleValues().join(", ")})`, account.role);
        if (!role || !getTeacherRoleValues().includes(role.trim())) return;
        updateAccount(account.id, {
          username: username.trim(),
          password: password.trim(),
          role: role.trim(),
          previousUsername: account.username
        });
        logAction("Compte modifie", username.trim(), `Role: ${getRoleLabel(role.trim())}`);
        await persistCriticalAppData();
        feedback.textContent = "Compte modifie.";
        renderAdministration();
      });
    });

    teacherAccountsList.querySelectorAll(".teacher-delete").forEach((button) => {
      button.addEventListener("click", async () => {
        const removed = getAccountById(button.dataset.id);
        if (!removed) return;
        removeTeacherAccount(button.dataset.id);
        logAction("Compte supprime", removed.username, removed.label);
        await persistCriticalAppData();
        feedback.textContent = "Compte supprime.";
        renderAdministration();
      });
    });
  }
}

function loadAppData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try { return hydrateAppData(JSON.parse(raw)); } catch {}
  }
  const legacy = localStorage.getItem(LEGACY_STUDENT_KEY);
  if (legacy) {
    try {
      const students = JSON.parse(legacy);
      if (Array.isArray(students)) {
        const migrated = migrateLegacyStudents(students);
        persistAppData(migrated);
        return migrated;
      }
    } catch {}
  }
  const initial = hydrateAppData({ classes: defaultClasses, students: defaultStudents, pfmpRecords: defaultPfmpRecords });
  persistAppData(initial);
  return initial;
}

function loadLocalFallbackData() {
  return loadAppData();
}

function replaceAppState(data) {
  const hydrated = hydrateAppData(data);
  Object.keys(app).forEach((key) => { delete app[key]; });
  Object.assign(app, hydrated);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(app));
}

async function bootstrapFromApi() {
  try {
    const response = await fetch("/api/bootstrap", { credentials: "include" });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

async function pushStateToApi(data) {
  try {
    const response = await fetch("/api/state", {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ data })
    });
    if (response.status === 401) {
      clearSession();
      if (PROTECTED_PAGES.has(page)) window.location.replace("login.html");
    }
  } catch {}
}

async function persistCriticalAppData(data = app) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  if (persistTimeout) {
    window.clearTimeout(persistTimeout);
    persistTimeout = null;
  }
  if (!getSession()) return false;
  await pushStateToApi(data);
  return true;
}

function hydrateAppData(data) {
  const classes = (data.classes || defaultClasses).map((classItem, index) => ({
    id: classItem.id || `class-${index + 1}`,
    name: classItem.name || `Classe ${index + 1}`,
    year: classItem.year || "2025-2026",
    note: classItem.note || "Sans note"
  }));
  const fallbackClassId = classes[0]?.id || "";
  const students = (data.students || defaultStudents).map((student, index) => ({
    id: student.id || `student-${index + 1}`,
    name: student.name || `Élève ${index + 1}`,
    classId: classes.some((classItem) => classItem.id === student.classId) ? student.classId : fallbackClassId,
    portfolioKey: student.portfolioKey || slugify(student.name || `eleve-${index + 1}`),
    skills: buildSkillState(student.skills || {}),
    attendance: hydrateAttendanceEntries(student.attendance || []),
    notes: hydrateStudentNotes(student.notes || [])
  }));
  const pfmpRecords = {};
  const pfmpBooklets = {};
  students.forEach((student) => {
    pfmpRecords[student.id] = hydratePfmpRecord(data.pfmpRecords?.[student.id] || defaultPfmpRecords[student.id] || {}, student, classes);
    pfmpBooklets[student.id] = hydratePfmpBookletRecord(data.pfmpBooklets?.[student.id] || {});
  });
  const evaluationActivities = (data.evaluationActivities || defaultEvaluationActivities).map((activity, index) => hydrateEvaluationActivity(activity, index));
  const indicatorBank = hydrateIndicatorBank(data.indicatorBank || defaultIndicatorBank);
  const lessonLibrary = hydrateLessonLibrary(data.lessonLibrary || defaultLessonLibrary);
  const accounts = hydrateAccounts(data.accounts || defaultAccounts);
  const activityLog = hydrateActivityLog(data.activityLog || defaultActivityLog);
  return { classes, students, pfmpRecords, pfmpBooklets, evaluationActivities, indicatorBank, lessonLibrary, accounts, activityLog };
}

function hydrateAccounts(accounts) {
  const hydrated = (accounts || defaultAccounts).map((account, index) => ({
    id: account.id || `account-${index + 1}`,
    username: account.username || `user${index + 1}`,
    password: account.password || "changeme",
    role: roleCatalog.some((item) => item.value === account.role) ? account.role : "professeur",
    label: account.label || getRoleLabel(account.role || "professeur")
  }));
  if (!hydrated.some((account) => account.role === "admin")) {
    hydrated.unshift(defaultAccounts[0]);
  }
  return hydrated;
}

function hydrateActivityLog(items) {
  return (items || []).map((item, index) => ({
    id: item.id || `log-${index + 1}`,
    timestamp: item.timestamp || new Date().toISOString(),
    actor: item.actor || "Système",
    role: item.role || "systeme",
    action: item.action || "Mise à jour",
    target: item.target || "",
    detail: item.detail || ""
  })).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

function hydrateLessonLibrary(items) {
  return (items || []).map((item, index) => ({
    id: item.id || `library-${index + 1}`,
    title: item.title || `Seance ${index + 1}`,
    domain: referentialDomains.includes(item.domain) ? item.domain : referentialDomains[0],
    level: item.level || "TCIEL",
    duration: item.duration || "2h",
    skillIds: Array.isArray(item.skillIds) ? item.skillIds.filter((skillId) => getSkillById(skillId)) : [],
    materials: item.materials || "",
    indicators: Array.isArray(item.indicators) ? item.indicators.filter(Boolean) : [],
    notes: item.notes || ""
  }));
}

function hydrateIndicatorBank(items) {
  return (items || []).map((item, index) => ({
    id: item.id || `indicator-bank-${index + 1}`,
    name: item.name || `Banque ${index + 1}`,
    domain: referentialDomains.includes(item.domain) ? item.domain : "",
    indicators: Array.isArray(item.indicators) ? item.indicators.map((indicator) => String(indicator || "").trim()).filter(Boolean) : []
  })).filter((item) => item.indicators.length);
}

function hydrateAttendanceEntries(items) {
  return (items || []).map((item, index) => ({
    id: item.id || `attendance-${index + 1}`,
    date: item.date || new Date().toISOString().slice(0, 10),
    status: ["present", "retard", "absent"].includes(item.status) ? item.status : "present",
    reason: item.reason || "",
    createdAt: item.createdAt || new Date().toISOString()
  })).sort((a, b) => new Date(b.date) - new Date(a.date));
}

function hydrateStudentNotes(items) {
  return (items || []).map((item, index) => ({
    id: item.id || `note-${index + 1}`,
    date: item.date || new Date().toISOString(),
    content: item.content || "",
    author: item.author || getSession()?.username || "admin"
  })).sort((a, b) => new Date(b.date) - new Date(a.date));
}

function hydratePfmpRecord(record, student, classes = app?.classes || []) {
  const periods = Object.fromEntries(PFMP_PERIODS.map((period) => [period.id, createEmptyPfmpEntry()]));
  if (record.periods) {
    PFMP_PERIODS.forEach((period) => {
      periods[period.id] = hydratePfmpEntry(record.periods[period.id] || {});
    });
  } else {
    periods[getDefaultPeriodForStudent(student, classes)] = hydratePfmpEntry(record);
  }
  return { periods };
}

function hydratePfmpEntry(record) {
  return {
    companyName: record.companyName || "",
    comment: record.comment || "",
    address: record.address || "",
    tutorName: record.tutorName || "",
    tutorEmail: record.tutorEmail || "",
    tutorPhone: record.tutorPhone || "",
    conventionSent: record.conventionSent || "",
    conventionSignedCompany: record.conventionSignedCompany || "",
    conventionSignedParents: record.conventionSignedParents || "",
    conventionSignedSchool: record.conventionSignedSchool || "",
    teacher: record.teacher || "",
    visitDate: record.visitDate || "",
    reportDate: record.reportDate || "",
    bookletDate: record.bookletDate || "",
    attendanceDate: record.attendanceDate || "",
    observedSkillIds: Array.isArray(record.observedSkillIds) ? record.observedSkillIds.filter((skillId) => getSkillById(skillId)) : []
  };
}

function createEmptyPfmpEntry() {
  return hydratePfmpEntry({});
}

function hydrateEvaluationActivity(activity, index) {
  const indicators = Array.isArray(activity.indicators) ? activity.indicators.map((indicator, indicatorIndex) => ({
    id: indicator.id || `indicator-${index + 1}-${indicatorIndex + 1}`,
    label: indicator.label || `Indicateur ${indicatorIndex + 1}`
  })) : [];
  const skillIds = Array.isArray(activity.skillIds) && activity.skillIds.length
    ? activity.skillIds.filter((skillId) => getSkillById(skillId))
    : [activity.skillId || skillCatalog[0].id].filter((skillId) => getSkillById(skillId));
  return {
    id: activity.id || `activity-${index + 1}`,
    title: activity.title || `Séance ${index + 1}`,
    type: activity.type || "TP",
    classId: activity.classId || "",
    skillId: skillIds[0] || skillCatalog[0].id,
    skillIds,
    date: activity.date || activity.startDate || "",
    startDate: activity.startDate || activity.date || "",
    endDate: activity.endDate || activity.startDate || activity.date || "",
    comment: activity.comment || "",
    indicators,
    evaluations: activity.evaluations || {}
  };
}

function createEmptyPfmpBookletEntry() {
  return {
    evaluatorName: "",
    evaluatorRole: "",
    companyFeedback: "",
    generalComment: "",
    skills: buildSkillState({})
  };
}

function hydratePfmpBookletEntry(record) {
  return {
    evaluatorName: record.evaluatorName || "",
    evaluatorRole: record.evaluatorRole || "",
    companyFeedback: record.companyFeedback || "",
    generalComment: record.generalComment || "",
    skills: buildSkillState(record.skills || {})
  };
}

function hydratePfmpBookletRecord(record) {
  return {
    terminale_1: hydratePfmpBookletEntry(record.terminale_1 || {}),
    terminale_2: hydratePfmpBookletEntry(record.terminale_2 || {})
  };
}

function getDefaultPeriodForStudent(student, classes = app?.classes || []) {
  const className = classes.find((item) => item.id === student?.classId)?.name?.toLowerCase() || "";
  if (className.includes("seconde")) return "seconde_1";
  if (className.includes("prem")) return "premiere_1";
  return "terminale_1";
}

function migrateLegacyStudents(students) {
  const classes = [];
  const classMap = new Map();
  students.forEach((student) => {
    const className = student.className || "Bac Pro CIEL";
    if (!classMap.has(className)) {
      const id = slugify(className);
      classMap.set(className, id);
      classes.push({ id, name: className, year: "2025-2026", note: "Migré depuis l'ancienne version" });
    }
  });
  return hydrateAppData({
    classes,
    students: students.map((student) => ({ id: student.id, name: student.name, classId: classMap.get(student.className || "Bac Pro CIEL"), skills: student.skills })),
    pfmpRecords: {}
  });
}

function buildSkillState(skills) {
  return Object.fromEntries(skillCatalog.map((skill) => [skill.id, normalizeStatus(skills[skill.id])]));
}

function normalizeStatus(value) {
  const legacyMap = {
    en_cours: "en_cours_acquisition",
    expert: "acquis"
  };
  if (legacyMap[value]) return legacyMap[value];
  return Object.hasOwn(levelLabels, value) ? value : "non_evalue";
}

function persistAppData(data = app) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  if (!getSession()) return;
  if (persistTimeout) window.clearTimeout(persistTimeout);
  persistTimeout = window.setTimeout(() => {
    persistTimeout = null;
    pushStateToApi(data);
  }, 400);
}

function initHomePage() {
  const session = getSession();
  if (!session) return;
  const dashboardLink = document.querySelector('a[href="dashboard.html"]');
  if (dashboardLink) dashboardLink.textContent = "Ouvrir l'espace";
}

function initLoginPage() {
  const form = document.querySelector("#login-form");
  const usernameInput = document.querySelector("#login-username");
  const passwordInput = document.querySelector("#login-password");
  const feedback = document.querySelector("#login-feedback");

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

      if (!response.ok || !payload?.session) {
        feedback.textContent = response.status === 401 ? "Identifiants invalides." : "Connexion impossible pour le moment.";
        return;
      }

      setSession(payload.session);
      if (payload.data) replaceAppState(payload.data);
      window.location.href = "dashboard.html";
    } catch {
      feedback.textContent = "Serveur indisponible. Vérifie le déploiement Cloudflare.";
    }
  });
}

function initClassesPage() {
  bindProtectedChrome();
  const classForm = document.querySelector("#class-form");
  const classNameInput = document.querySelector("#class-name-input");
  const classYearInput = document.querySelector("#class-year-input");
  const classNoteInput = document.querySelector("#class-note-input");
  const studentForm = document.querySelector("#student-form");
  const studentNameInput = document.querySelector("#student-name-input");
  const studentClassInput = document.querySelector("#student-class-input");
  const importClassInput = document.querySelector("#import-class-input");
  const csvInput = document.querySelector("#student-csv-input");
  const importButton = document.querySelector("#import-csv-button");
  const importFeedback = document.querySelector("#import-feedback");
  const classFilter = document.querySelector("#class-filter");
  const classCards = document.querySelector("#class-cards");
  const studentDirectory = document.querySelector("#student-directory");
  const canManageStudents = hasPermission("manage_students");

  classForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!canManageStudents) return;
    const name = classNameInput.value.trim();
    const year = classYearInput.value.trim();
    const note = classNoteInput.value.trim();
    if (!name || !year || !note) return;
    app.classes.push({ id: slugify(`${name}-${Date.now()}`), name, year, note });
    logAction("Classe créée", name, `${year} // ${note}`);
    persistAppData();
    classForm.reset();
    renderClassesPage();
  });

  studentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!canManageStudents) return;
    const name = studentNameInput.value.trim();
    const classId = studentClassInput.value;
    if (!name || !classId) return;
    const id = slugify(`${name}-${Date.now()}`);
    app.students.push({ id, name, classId, skills: buildSkillState({}) });
    app.pfmpRecords[id] = hydratePfmpRecord({}, { id, classId }, app.classes);
    logAction("Élève ajouté", name, getClassById(classId)?.name || classId);
    persistAppData();
    studentForm.reset();
    renderClassesPage();
  });

  importButton.addEventListener("click", async () => {
    if (!canManageStudents) return;
    const file = csvInput.files?.[0];
    const classId = importClassInput.value;
    if (!file || !classId) {
      importFeedback.textContent = "Sélectionne un fichier CSV et une classe cible.";
      return;
    }
    const text = await file.text();
    const rows = parseCsv(text);
    const names = extractStudentNames(rows);
    if (!names.length) {
      importFeedback.textContent = "Aucun nom d'élève détecté dans le CSV.";
      return;
    }
    const existing = new Set(getStudentsByClass(classId).map((student) => student.name.trim().toLowerCase()));
    let imported = 0;
    let skipped = 0;
    names.forEach((name) => {
      const key = name.trim().toLowerCase();
      if (!key || existing.has(key)) {
        skipped += 1;
        return;
      }
      const id = slugify(`${name}-${Date.now()}-${imported}`);
      app.students.push({ id, name, classId, skills: buildSkillState({}) });
      app.pfmpRecords[id] = hydratePfmpRecord({}, { id, classId }, app.classes);
      existing.add(key);
      imported += 1;
    });
    if (imported) logAction("Import CSV", getClassById(classId)?.name || classId, `${imported} élève(s) ajoutés`);
    persistAppData();
    importFeedback.textContent = `${imported} élève(s) importé(s), ${skipped} ignoré(s).`;
    csvInput.value = "";
    renderClassesPage();
  });

  enforcePermission("manage_students", classNameInput, classYearInput, classNoteInput, studentNameInput, studentClassInput, importClassInput, csvInput, importButton);

  classFilter.addEventListener("change", renderClassesPage);
  renderClassesPage();

  function renderClassesPage() {
    populateClassSelect(studentClassInput);
    populateClassSelect(importClassInput);
    populateClassFilter(classFilter);
    const activeClassId = classFilter.value || "all";
    const visibleClasses = activeClassId === "all" ? app.classes : app.classes.filter((classItem) => classItem.id === activeClassId);

    classCards.innerHTML = visibleClasses.map((classItem) => {
      const students = getStudentsByClass(classItem.id);
      const pfmpSummary = getPfmpSummary(students);
      return `
        <article class="class-card">
          <div class="class-card-head">
            <h3>${classItem.name}</h3>
            <span class="badge accent">${students.length} élèves</span>
          </div>
          <p>${classItem.year}</p>
          <p>${classItem.note}</p>
          <div class="class-meta">
            <span class="badge">${getClassProgress(classItem.id)}% validé</span>
            <span class="badge">${pfmpSummary.withCompany} PFMP saisies</span>
          </div>
          <div class="student-badges">
            <button class="ghost-button class-delete" type="button" data-id="${classItem.id}"${canManageStudents ? "" : " disabled"}>Supprimer la classe</button>
          </div>
        </article>
      `;
    }).join("");

    const directoryStudents = activeClassId === "all" ? app.students : getStudentsByClass(activeClassId);
    studentDirectory.innerHTML = directoryStudents.map((student) => {
      const filledPeriods = PFMP_PERIODS.filter((period) => getPfmpPeriodEntry(student.id, period.id).companyName).length;
      return `
        <article class="directory-row compact">
          <div>
            <strong>${student.name}</strong>
            <p>${getClassById(student.classId)?.name || "Sans classe"}</p>
            <p>${filledPeriods}/6 PFMP renseignées</p>
          </div>
          <div class="student-badges">
            <span class="badge">${getStudentProgress(student)}% validé</span>
            <span class="badge">${filledPeriods}/6 périodes</span>
            <button class="ghost-button student-delete" type="button" data-id="${student.id}"${canManageStudents ? "" : " disabled"}>Supprimer l'élève</button>
          </div>
        </article>
      `;
    }).join("");

    classCards.querySelectorAll(".class-delete").forEach((button) => {
      button.addEventListener("click", () => {
        if (!canManageStudents) return;
        const classItem = getClassById(button.dataset.id);
        if (!classItem) return;
        if (!window.confirm(`Supprimer la classe "${classItem.name}" et tous ses élèves ?`)) return;
        deleteClass(button.dataset.id);
        renderClassesPage();
      });
    });

    studentDirectory.querySelectorAll(".student-delete").forEach((button) => {
      button.addEventListener("click", () => {
        if (!canManageStudents) return;
        const student = getStudentById(button.dataset.id);
        if (!student) return;
        if (!window.confirm(`Supprimer l'élève "${student.name}" ?`)) return;
        deleteStudent(button.dataset.id);
        renderClassesPage();
      });
    });
  }
}

function initClassesPage() {
  bindProtectedChrome();
  const classForm = document.querySelector("#class-form");
  const classNameInput = document.querySelector("#class-name-input");
  const classYearInput = document.querySelector("#class-year-input");
  const classNoteInput = document.querySelector("#class-note-input");
  const studentForm = document.querySelector("#student-form");
  const studentNameInput = document.querySelector("#student-name-input");
  const studentClassInput = document.querySelector("#student-class-input");
  const importClassInput = document.querySelector("#import-class-input");
  const csvInput = document.querySelector("#student-csv-input");
  const importButton = document.querySelector("#import-csv-button");
  const importFeedback = document.querySelector("#import-feedback");
  const classFilter = document.querySelector("#class-filter");
  const classCards = document.querySelector("#class-cards");
  const studentDirectory = document.querySelector("#student-directory");
  const canManageStudents = hasPermission("manage_students");
  const monitorPanel = studentDirectory?.parentElement;
  let supportPanel = document.querySelector("#student-support-panel");

  if (monitorPanel && !supportPanel) {
    supportPanel = document.createElement("div");
    supportPanel.id = "student-support-panel";
    supportPanel.className = "stack-form";
    supportPanel.innerHTML = `
      <div class="section-head">
        <div>
          <p class="eyebrow">Student Support</p>
          <h2>Absences, retards et commentaires</h2>
        </div>
      </div>
      <div class="mini-grid">
        <label class="field">
          <span>Élève suivi</span>
          <select id="support-student-select"></select>
        </label>
        <label class="field">
          <span>Date</span>
          <input id="support-date-input" type="date">
        </label>
      </div>
      <div class="mini-grid">
        <label class="field">
          <span>Présence</span>
          <select id="support-status-select">
            <option value="present">Présent</option>
            <option value="retard">Retard</option>
            <option value="absent">Absent</option>
          </select>
        </label>
        <label class="field">
          <span>Motif / précision</span>
          <input id="support-reason-input" type="text" placeholder="Ex. convocation, oubli matériel, absence justifiée">
        </label>
      </div>
      <div class="student-badges">
        <button id="support-attendance-save" class="ghost-button" type="button">Ajouter un événement</button>
      </div>
      <label class="field">
        <span>Commentaire horodaté</span>
        <textarea id="support-note-input" rows="4" placeholder="Remarque pédagogique, comportement, point d'appui, vigilance..."></textarea>
      </label>
      <div class="student-badges">
        <button id="support-note-save" class="ghost-button" type="button">Ajouter un commentaire</button>
      </div>
      <div id="support-stats-grid" class="class-cards"></div>
      <div id="support-history" class="student-directory"></div>
    `;
    monitorPanel.appendChild(supportPanel);
  }

  const supportStudentSelect = document.querySelector("#support-student-select");
  const supportDateInput = document.querySelector("#support-date-input");
  const supportStatusSelect = document.querySelector("#support-status-select");
  const supportReasonInput = document.querySelector("#support-reason-input");
  const supportAttendanceSave = document.querySelector("#support-attendance-save");
  const supportNoteInput = document.querySelector("#support-note-input");
  const supportNoteSave = document.querySelector("#support-note-save");
  const supportStatsGrid = document.querySelector("#support-stats-grid");
  const supportHistory = document.querySelector("#support-history");

  classForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!canManageStudents) return;
    const name = classNameInput.value.trim();
    const year = classYearInput.value.trim();
    const note = classNoteInput.value.trim();
    if (!name || !year || !note) return;
    app.classes.push({ id: slugify(`${name}-${Date.now()}`), name, year, note });
    logAction("Classe créée", name, `${year} // ${note}`);
    persistAppData();
    classForm.reset();
    renderClassesPage();
  });

  studentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!canManageStudents) return;
    const name = studentNameInput.value.trim();
    const classId = studentClassInput.value;
    if (!name || !classId) return;
    const id = slugify(`${name}-${Date.now()}`);
    app.students.push({ id, name, classId, skills: buildSkillState({}), attendance: [], notes: [] });
    app.pfmpRecords[id] = hydratePfmpRecord({}, { id, classId }, app.classes);
    logAction("Élève ajouté", name, getClassById(classId)?.name || classId);
    persistAppData();
    studentForm.reset();
    renderClassesPage();
  });

  importButton.addEventListener("click", async () => {
    if (!canManageStudents) return;
    const file = csvInput.files?.[0];
    const classId = importClassInput.value;
    if (!file || !classId) {
      importFeedback.textContent = "Sélectionne un fichier CSV et une classe cible.";
      return;
    }
    const text = await file.text();
    const rows = parseCsv(text);
    const names = extractStudentNames(rows);
    if (!names.length) {
      importFeedback.textContent = "Aucun nom d'élève détecté dans le CSV.";
      return;
    }
    const existing = new Set(getStudentsByClass(classId).map((student) => student.name.trim().toLowerCase()));
    let imported = 0;
    let skipped = 0;
    names.forEach((name) => {
      const key = name.trim().toLowerCase();
      if (!key || existing.has(key)) {
        skipped += 1;
        return;
      }
      const id = slugify(`${name}-${Date.now()}-${imported}`);
      app.students.push({ id, name, classId, skills: buildSkillState({}), attendance: [], notes: [] });
      app.pfmpRecords[id] = hydratePfmpRecord({}, { id, classId }, app.classes);
      existing.add(key);
      imported += 1;
    });
    if (imported) logAction("Import CSV", getClassById(classId)?.name || classId, `${imported} élève(s) ajoutés`);
    persistAppData();
    importFeedback.textContent = `${imported} élève(s) importé(s), ${skipped} ignoré(s).`;
    csvInput.value = "";
    renderClassesPage();
  });

  enforcePermission("manage_students", classNameInput, classYearInput, classNoteInput, studentNameInput, studentClassInput, importClassInput, csvInput, importButton);
  if (supportDateInput && !supportDateInput.value) supportDateInput.value = new Date().toISOString().slice(0, 10);
  enforcePermission("manage_students", supportStudentSelect, supportDateInput, supportStatusSelect, supportReasonInput, supportAttendanceSave, supportNoteInput, supportNoteSave);

  supportAttendanceSave?.addEventListener("click", () => {
    if (!canManageStudents) return;
    const student = getStudentById(supportStudentSelect.value);
    if (!student || !supportDateInput.value) return;
    addAttendanceEntry(student.id, supportStatusSelect.value, supportDateInput.value, supportReasonInput.value);
    logAction("Présence saisie", student.name, `${supportStatusSelect.value} // ${supportDateInput.value}`);
    persistAppData();
    supportReasonInput.value = "";
    renderClassesPage(student.id);
  });

  supportNoteSave?.addEventListener("click", () => {
    if (!canManageStudents) return;
    const student = getStudentById(supportStudentSelect.value);
    if (!student || !supportNoteInput.value.trim()) return;
    addStudentNote(student.id, supportNoteInput.value);
    logAction("Commentaire élève", student.name, "Note horodatée ajoutée");
    persistAppData();
    supportNoteInput.value = "";
    renderClassesPage(student.id);
  });

  supportStudentSelect?.addEventListener("change", renderStudentSupportArea);

  classFilter.addEventListener("change", () => renderClassesPage());
  renderClassesPage();

  function renderClassesPage(preselectedStudentId = "") {
    populateClassSelect(studentClassInput);
    populateClassSelect(importClassInput);
    populateClassFilter(classFilter);
    const activeClassId = classFilter.value || "all";
    const visibleClasses = activeClassId === "all" ? app.classes : app.classes.filter((classItem) => classItem.id === activeClassId);

    classCards.innerHTML = visibleClasses.map((classItem) => {
      const students = getStudentsByClass(classItem.id);
      const pfmpSummary = getPfmpSummary(students);
      return `
        <article class="class-card">
          <div class="class-card-head">
            <h3>${classItem.name}</h3>
            <span class="badge accent">${students.length} élèves</span>
          </div>
          <p>${classItem.year}</p>
          <p>${classItem.note}</p>
          <div class="class-meta">
            <span class="badge">${getClassProgress(classItem.id)}% validé</span>
            <span class="badge">${pfmpSummary.withCompany} PFMP saisies</span>
          </div>
          <div class="student-badges">
            <button class="ghost-button class-edit" type="button" data-id="${classItem.id}"${canManageStudents ? "" : " disabled"}>Modifier</button>
            <button class="ghost-button class-delete" type="button" data-id="${classItem.id}"${canManageStudents ? "" : " disabled"}>Supprimer</button>
          </div>
        </article>
      `;
    }).join("");

    const directoryStudents = activeClassId === "all" ? app.students : getStudentsByClass(activeClassId);
    studentDirectory.innerHTML = directoryStudents.map((student) => {
      const filledPeriods = PFMP_PERIODS.filter((period) => getPfmpPeriodEntry(student.id, period.id).companyName).length;
      return `
        <article class="directory-row compact">
          <div class="directory-main">
            <div class="directory-head">
              <strong>${student.name}</strong>
              <div class="student-badges">
                <button class="ghost-button student-follow" type="button" data-id="${student.id}">Suivi</button>
                <button class="ghost-button student-edit" type="button" data-id="${student.id}"${canManageStudents ? "" : " disabled"}>Modifier</button>
                <button class="ghost-button student-delete" type="button" data-id="${student.id}"${canManageStudents ? "" : " disabled"}>Supprimer</button>
              </div>
            </div>
            <p>${getClassById(student.classId)?.name || "Sans classe"}</p>
            <p>${filledPeriods}/6 PFMP renseignées</p>
          </div>
          <div class="student-badges">
            <span class="badge">${getStudentProgress(student)}% validé</span>
            <span class="badge">${filledPeriods}/6 périodes</span>
          </div>
        </article>
      `;
    }).join("");

    syncSupportStudents(preselectedStudentId);
    renderStudentSupportArea();

    classCards.querySelectorAll(".class-edit").forEach((button) => {
      button.addEventListener("click", () => {
        const classItem = getClassById(button.dataset.id);
        if (!classItem || !canManageStudents) return;
        const name = window.prompt("Nouveau nom de la classe", classItem.name);
        if (!name) return;
        const year = window.prompt("Nouvelle année", classItem.year);
        if (!year) return;
        const note = window.prompt("Nouvelle référence", classItem.note);
        if (!note) return;
        classItem.name = name.trim();
        classItem.year = year.trim();
        classItem.note = note.trim();
        logAction("Classe modifiée", classItem.name, `${classItem.year} // ${classItem.note}`);
        persistAppData();
        renderClassesPage();
      });
    });

    classCards.querySelectorAll(".class-delete").forEach((button) => {
      button.addEventListener("click", () => {
        if (!canManageStudents) return;
        const classItem = getClassById(button.dataset.id);
        if (!classItem) return;
        if (!window.confirm(`Supprimer la classe "${classItem.name}" et tous ses élèves ?`)) return;
        deleteClass(button.dataset.id);
        renderClassesPage();
      });
    });

    studentDirectory.querySelectorAll(".student-follow").forEach((button) => {
      button.addEventListener("click", () => {
        if (supportStudentSelect) supportStudentSelect.value = button.dataset.id;
        renderStudentSupportArea();
        supportPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    studentDirectory.querySelectorAll(".student-edit").forEach((button) => {
      button.addEventListener("click", () => {
        const student = getStudentById(button.dataset.id);
        if (!student || !canManageStudents) return;
        const name = window.prompt("Nouveau nom de l'élève", student.name);
        if (!name) return;
        const classId = window.prompt("Nouvelle classe (id)", student.classId);
        if (!classId || !getClassById(classId.trim())) return;
        student.name = name.trim();
        student.classId = classId.trim();
        app.pfmpRecords[student.id] = hydratePfmpRecord(app.pfmpRecords[student.id] || {}, student, app.classes);
        logAction("Élève modifié", student.name, getClassById(student.classId)?.name || student.classId);
        persistAppData();
        renderClassesPage();
      });
    });

    studentDirectory.querySelectorAll(".student-delete").forEach((button) => {
      button.addEventListener("click", () => {
        if (!canManageStudents) return;
        const student = getStudentById(button.dataset.id);
        if (!student) return;
        if (!window.confirm(`Supprimer l'élève "${student.name}" ?`)) return;
        deleteStudent(button.dataset.id);
        renderClassesPage();
      });
    });
  }

  function syncSupportStudents(preselectedStudentId = "") {
    if (!supportStudentSelect) return;
    const activeClassId = classFilter.value || "all";
    const students = activeClassId === "all" ? app.students : getStudentsByClass(activeClassId);
    supportStudentSelect.innerHTML = students.map((student) => `<option value="${student.id}">${student.name}</option>`).join("");
    if (preselectedStudentId && students.some((student) => student.id === preselectedStudentId)) {
      supportStudentSelect.value = preselectedStudentId;
    }
  }

  function renderStudentSupportArea() {
    if (!supportStatsGrid || !supportHistory || !supportStudentSelect) return;
    const student = getStudentById(supportStudentSelect.value) || app.students[0];
    if (!student) {
      supportStatsGrid.innerHTML = "";
      supportHistory.innerHTML = `<article class="summary-card"><h3>Aucun élève</h3><p class="muted-copy">Ajoute un élève pour activer le suivi.</p></article>`;
      return;
    }
    const stats = getAttendanceStats(student);
    supportStatsGrid.innerHTML = [
      { label: "Absences", value: stats.absent, trace: "événements saisis" },
      { label: "Retards", value: stats.retard, trace: "événements saisis" },
      { label: "Commentaires", value: (student.notes || []).length, trace: "notes horodatées" },
      { label: "Progression", value: `${getStudentProgress(student)}%`, trace: getClassById(student.classId)?.name || "sans classe" }
    ].map(renderStatCard).join("");

    const attendanceRows = (student.attendance || []).slice(0, 8).map((entry) => `
      <article class="directory-row compact">
        <div>
          <strong>${entry.status === "absent" ? "Absence" : entry.status === "retard" ? "Retard" : "Présence"}</strong>
          <p>${entry.date}</p>
          <p>${entry.reason || "Sans précision"}</p>
        </div>
      </article>
    `).join("");

    const noteRows = (student.notes || []).slice(0, 8).map((note) => `
      <article class="directory-row compact">
        <div>
          <strong>Commentaire</strong>
          <p>${formatLogTimestamp(note.date)} // ${note.author}</p>
          <p>${note.content}</p>
        </div>
      </article>
    `).join("");

    supportHistory.innerHTML = `
      ${attendanceRows || `<article class="summary-card"><h3>Aucune présence</h3><p class="muted-copy">Aucun événement saisi pour cet élève.</p></article>`}
      ${noteRows || `<article class="summary-card"><h3>Aucun commentaire</h3><p class="muted-copy">Aucune note horodatée pour cet élève.</p></article>`}
    `;
  }
}

function initAccountsPage() {
  bindProtectedChrome();
  const adminForm = document.querySelector("#admin-account-form");
  const teacherForm = document.querySelector("#teacher-account-form");
  const adminUsername = document.querySelector("#admin-username");
  const adminPassword = document.querySelector("#admin-password");
  const teacherUsername = document.querySelector("#teacher-username");
  const teacherPassword = document.querySelector("#teacher-password");
  const teacherRole = document.querySelector("#teacher-role");
  const feedback = document.querySelector("#accounts-feedback");
  const accountsSummary = document.querySelector("#accounts-summary");
  const teacherAccountsList = document.querySelector("#teacher-accounts-list");
  const activityLogList = document.querySelector("#activity-log-list");

  teacherRole.innerHTML = roleCatalog
    .map((role) => `<option value="${role.value}">${role.label}</option>`)
    .join("");

  const adminAccount = getAccountByRole("admin");
  adminUsername.value = adminAccount.username;
  adminPassword.value = adminAccount.password;

  adminForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!adminUsername.value.trim() || !adminPassword.value.trim()) return;
    updateAccount("admin", adminUsername.value.trim(), adminPassword.value.trim());
    feedback.textContent = "Compte administrateur mis à jour.";
    renderTeachers();
  });

  teacherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!teacherUsername.value.trim() || !teacherPassword.value.trim()) return;
    addTeacherAccount(teacherUsername.value.trim(), teacherPassword.value.trim());
    teacherForm.reset();
    feedback.textContent = "Professeur ajouté.";
    renderTeachers();
  });

  renderTeachers();

  function renderTeachers() {
    const teachers = getTeacherAccounts();
    accountsSummary.innerHTML = `
      <article class="summary-card">
        <h3>Admin</h3>
        <p class="muted-copy">${adminAccount.username}</p>
      </article>
      <article class="summary-card">
        <h3>Professeurs</h3>
        <p class="muted-copy">${teachers.length} compte(s) actif(s)</p>
      </article>
    `;
    teacherAccountsList.innerHTML = teachers.length ? teachers.map((teacher) => `
      <article class="directory-row compact">
        <div>
          <strong>${teacher.username}</strong>
          <p>${teacher.label}</p>
        </div>
        <div class="student-badges">
          <button class="ghost-button teacher-edit" type="button" data-id="${teacher.id}">Modifier</button>
          <button class="ghost-button teacher-delete" type="button" data-id="${teacher.id}">Supprimer</button>
        </div>
      </article>
    `).join("") : `<article class="summary-card"><h3>Aucun professeur</h3><p class="muted-copy">Ajoute un compte professeur avec le formulaire ci-dessus.</p></article>`;

    teacherAccountsList.querySelectorAll(".teacher-edit").forEach((button) => {
      button.addEventListener("click", () => {
        const teacher = getAccountById(button.dataset.id);
        if (!teacher) return;
        const username = window.prompt("Nouvel identifiant du professeur", teacher.username);
        if (!username) return;
        const password = window.prompt("Nouveau mot de passe du professeur", teacher.password);
        if (!password) return;
        teacher.username = username.trim();
        teacher.password = password.trim();
        persistAppData();
        feedback.textContent = "Professeur modifié.";
        renderTeachers();
      });
    });

    teacherAccountsList.querySelectorAll(".teacher-delete").forEach((button) => {
      button.addEventListener("click", () => {
        removeTeacherAccount(button.dataset.id);
        feedback.textContent = "Professeur supprimé.";
        renderTeachers();
      });
    });
  }
}

function injectBrandLogo() {
  document.querySelectorAll(".topbar").forEach((topbar) => {
    if (topbar.querySelector(".topbar-brandmark")) return;
    const mark = document.createElement("a");
    mark.href = "index.html";
    mark.className = "topbar-brandmark";
    mark.setAttribute("aria-label", "CIEL Matrix");
    mark.innerHTML = `<img src="ciel-matrix-logo.svg" alt="CIEL Matrix">`;
    topbar.appendChild(mark);
  });
}

printHtmlDocument = function(title, html) {
  const printWindow = window.open("", "_blank", "width=1200,height=900");
  if (!printWindow) return false;
  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  const triggerPrint = () => {
    try {
      printWindow.focus();
      printWindow.print();
    } catch {}
  };
  if (printWindow.document.readyState === "complete") {
    setTimeout(triggerPrint, 350);
  } else {
    printWindow.addEventListener("load", () => setTimeout(triggerPrint, 350), { once: true });
    setTimeout(triggerPrint, 900);
  }
  return true;
};

buildActivityPdfHtml = function(activity, classId) {
  const classItem = getClassById(classId);
  const skills = getActivitySkills(activity);
  const skillCodes = skills.map((item) => item.code).join(", ");
  const skillTitles = skills.map((item) => item.title).join(" // ");
  const students = getStudentsByClass(classId);
  const summaryHtml = `
    <div class="card">
      <p><strong>Classe :</strong> ${escapeHtml(classItem?.name || "")}</p>
      <p><strong>Competences :</strong> ${escapeHtml(`${skillCodes} ${skillTitles}`.trim() || "Non renseignees")}</p>
      <p><strong>Periode :</strong> ${escapeHtml(formatActivityDateRange(activity) || "Non renseignee")}</p>
      <p><strong>Moyenne de seance :</strong> ${getActivityAverage(activity, students)}%</p>
      <p><strong>Indicateurs :</strong> ${activity.indicators.length}</p>
      <p><strong>Commentaire :</strong> ${escapeHtml(activity.comment || "-")}</p>
    </div>
  `;
  const tableHtml = `
    <table>
      <thead>
        <tr>
          <th>Eleve</th>
          ${activity.indicators.map((indicator) => `<th>${escapeHtml(indicator.label)}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${students.map((student) => `
          <tr>
            <td>${escapeHtml(student.name)}</td>
            ${activity.indicators.map((indicator) => `<td>${escapeHtml(levelLabels[getActivityIndicatorStatus(activity, student.id, indicator.id)] || "Non evalue")}</td>`).join("")}
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
  const indicatorsHtml = `
    <div class="grid">
      ${activity.indicators.map((indicator) => `
        <div class="card">
          <p><strong>${escapeHtml(indicator.label)}</strong></p>
          <p>Moyenne : ${getIndicatorAverage(activity, students, indicator.id)}%</p>
          <p>${escapeHtml(renderIndicatorStatusBreakdown(activity, students, indicator.id))}</p>
        </div>
      `).join("")}
    </div>
  `;
  return buildPrintShell(
    `${activity.type} - ${activity.title}`,
    `${classItem?.name || ""} - ${skillCodes}`,
    `${summaryHtml}<h2>Grille de saisie</h2>${tableHtml}<h2>Bilan par indicateur</h2>${indicatorsHtml}`
  );
};

buildActivitySynthesisPdfHtml = function(classId) {
  const classItem = getClassById(classId);
  const activities = getActivitiesByClass(classId);
  const students = getStudentsByClass(classId);
  const rows = activities.map((activity) => {
    const skillCodes = getActivitySkills(activity).map((item) => item.code).join(", ");
    return `
      <tr>
        <td>${escapeHtml(activity.type)}</td>
        <td>${escapeHtml(activity.title)}</td>
        <td>${escapeHtml(skillCodes)}</td>
        <td>${escapeHtml(formatActivityDateRange(activity) || "Non renseignee")}</td>
        <td>${activity.indicators.length}</td>
        <td>${getActivityAverage(activity, students)}%</td>
      </tr>
    `;
  }).join("");
  return buildPrintShell(
    `Synthese des seances - ${classItem?.name || ""}`,
    `${activities.length} seance(s) enregistree(s)`,
    `
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Seance</th>
            <th>Competences</th>
            <th>Periode</th>
            <th>Indicateurs</th>
            <th>Moyenne</th>
          </tr>
        </thead>
        <tbody>${rows || '<tr><td colspan="6">Aucune seance enregistree.</td></tr>'}</tbody>
      </table>
    `
  );
};

getCycleDomainSummaryRows = function(student) {
  const journey = getStudentJourney(student);
  return referentialDomains.map((domain) => {
    const domainSkills = skillCatalog.filter((skill) => getSkillDomain(skill) === domain);
    const values = journey.map((item) => {
      const score = domainSkills.reduce((sum, skill) => sum + (levelScores[item.skills[skill.id]] || 0), 0);
      const max = domainSkills.length * (levelScores.acquis || 1) || 1;
      return `${Math.round((score / max) * 100)}%`;
    });
    const average = values.length ? `${Math.round(values.reduce((sum, value) => sum + Number.parseInt(value, 10), 0) / values.length)}%` : "";
    return [domain, ...values, average];
  });
};

buildCycleDomainSummaryHeaders = function(journey) {
  return ["Domaine", ...journey.map((item) => {
    const classItem = getClassById(item.classId);
    return `${classItem?.name || item.classId} ${classItem?.year || ""}`.trim();
  }), "Synthese"];
};

exportStudentAnnualWorkbook = function(student) {
  const classItem = getClassById(student.classId);
  if (!classItem) return;
  const headers = ["Eleve", "Classe", "Annee", "Competence", "Domaine", "Niveau"];
  const rows = skillCatalog.map((skill) => [
    student.name,
    classItem.name,
    classItem.year || "",
    `${skill.code} - ${skill.title}`,
    getSkillDomain(skill),
    levelLabels[student.skills[skill.id]] || ""
  ]);
  rows.push(["", "", "", "Progression annuelle", "", `${getStudentProgress(student)}%`]);
  getBlockAverages([student]).forEach((block) => {
    rows.push(["", "", "", `Synthese bloc - ${block.domain}`, block.domain, `${block.progress}%`]);
  });
  downloadExcelTable(`${student.name} - bilan annuel.xls`, "Bilan annuel", headers, rows);
};

exportStudentCycleWorkbook = function(student) {
  const journey = getStudentJourney(student);
  const headers = ["Eleve", "Classe", "Annee", ...skillCatalog.map((skill) => skill.code), "Progression"];
  const rows = journey.map((item) => {
    const classItem = getClassById(item.classId);
    return [
      item.name,
      classItem?.name || "",
      classItem?.year || "",
      ...skillCatalog.map((skill) => levelLabels[item.skills[skill.id]] || ""),
      `${getStudentProgress(item)}%`
    ];
  });
  const average = journey.length ? Math.round(journey.reduce((sum, item) => sum + getStudentProgress(item), 0) / journey.length) : 0;
  rows.push(["", "", "", ...skillCatalog.map((skill) => {
    const statuses = journey.map((item) => item.skills[skill.id]).filter(Boolean);
    return statuses[statuses.length - 1] ? levelLabels[statuses[statuses.length - 1]] : "";
  }), `${average}% moyen`]);
  rows.push([]);
  rows.push(buildCycleDomainSummaryHeaders(journey));
  getCycleDomainSummaryRows(student).forEach((row) => rows.push(row));
  downloadExcelTable(`${student.name} - synthese 3 ans.xls`, "Synthese 3 ans", headers, rows);
};

if (typeof document !== "undefined") {
  window.setTimeout(() => {
    if (document.body?.dataset?.page !== "evaluations") return;
    const exportButton = document.querySelector("#activity-export-pdf");
    const synthesisButton = document.querySelector("#activity-synthesis-pdf");
    const feedback = document.querySelector("#activity-feedback");
    if (exportButton && !exportButton.dataset.safeBound) {
      const replacement = exportButton.cloneNode(true);
      exportButton.replaceWith(replacement);
      replacement.dataset.safeBound = "true";
      replacement.addEventListener("click", () => {
        const classSelect = document.querySelector("#session-class-select");
        const activitySelect = document.querySelector("#activity-select");
        const classId = classSelect?.value || app.classes[0]?.id || "";
        const activity = getActivityById(activitySelect?.value) || getActivitiesByClass(classId)[0];
        if (!activity) {
          if (feedback) feedback.textContent = "Aucune seance a exporter.";
          return;
        }
        const opened = printHtmlDocument(`${activity.type} - ${activity.title}`, buildActivityPdfHtml(activity, classId));
        if (!opened && feedback) {
          feedback.textContent = "Le navigateur a bloque la fenetre PDF. Autorise les popups puis recommence.";
        }
      });
    }
    if (synthesisButton && !synthesisButton.dataset.safeBound) {
      const replacement = synthesisButton.cloneNode(true);
      synthesisButton.replaceWith(replacement);
      replacement.dataset.safeBound = "true";
      replacement.addEventListener("click", () => {
        const classSelect = document.querySelector("#session-class-select");
        const classId = classSelect?.value || app.classes[0]?.id || "";
        const classItem = getClassById(classId);
        if (!classItem) {
          if (feedback) feedback.textContent = "Aucune classe selectionnee.";
          return;
        }
        const opened = printHtmlDocument(`Synthese ${classItem.name}`, buildActivitySynthesisPdfHtml(classId));
        if (!opened && feedback) {
          feedback.textContent = "Le navigateur a bloque la fenetre PDF. Autorise les popups puis recommence.";
        }
      });
    }
  }, 0);
}

function printHtmlDocument(title, html) {
  const printWindow = window.open("", "_blank", "width=1200,height=900");
  if (!printWindow) return false;
  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  const triggerPrint = () => {
    try {
      printWindow.focus();
      printWindow.print();
    } catch {}
  };
  if (printWindow.document.readyState === "complete") {
    setTimeout(triggerPrint, 350);
  } else {
    printWindow.addEventListener("load", () => setTimeout(triggerPrint, 350), { once: true });
    setTimeout(triggerPrint, 900);
  }
  return true;
}

function buildActivityPdfHtml(activity, classId) {
  const classItem = getClassById(classId);
  const skills = getActivitySkills(activity);
  const skillCodes = skills.map((item) => item.code).join(", ");
  const skillTitles = skills.map((item) => item.title).join(" // ");
  const students = getStudentsByClass(classId);
  const summaryHtml = `
    <div class="card">
      <p><strong>Classe :</strong> ${escapeHtml(classItem?.name || "")}</p>
      <p><strong>Competences :</strong> ${escapeHtml(`${skillCodes} ${skillTitles}`.trim() || "Non renseignees")}</p>
      <p><strong>Periode :</strong> ${escapeHtml(formatActivityDateRange(activity) || "Non renseignee")}</p>
      <p><strong>Moyenne de seance :</strong> ${getActivityAverage(activity, students)}%</p>
      <p><strong>Indicateurs :</strong> ${activity.indicators.length}</p>
      <p><strong>Commentaire :</strong> ${escapeHtml(activity.comment || "-")}</p>
    </div>
  `;
  const tableHtml = `
    <table>
      <thead>
        <tr>
          <th>Eleve</th>
          ${activity.indicators.map((indicator) => `<th>${escapeHtml(indicator.label)}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${students.map((student) => `
          <tr>
            <td>${escapeHtml(student.name)}</td>
            ${activity.indicators.map((indicator) => `<td>${escapeHtml(levelLabels[getActivityIndicatorStatus(activity, student.id, indicator.id)] || "Non evalue")}</td>`).join("")}
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
  const indicatorsHtml = `
    <div class="grid">
      ${activity.indicators.map((indicator) => `
        <div class="card">
          <p><strong>${escapeHtml(indicator.label)}</strong></p>
          <p>Moyenne : ${getIndicatorAverage(activity, students, indicator.id)}%</p>
          <p>${escapeHtml(renderIndicatorStatusBreakdown(activity, students, indicator.id))}</p>
        </div>
      `).join("")}
    </div>
  `;
  return buildPrintShell(
    `${activity.type} - ${activity.title}`,
    `${classItem?.name || ""} - ${skillCodes}`,
    `${summaryHtml}<h2>Grille de saisie</h2>${tableHtml}<h2>Bilan par indicateur</h2>${indicatorsHtml}`
  );
}

function buildActivitySynthesisPdfHtml(classId) {
  const classItem = getClassById(classId);
  const activities = getActivitiesByClass(classId);
  const students = getStudentsByClass(classId);
  const rows = activities.map((activity) => {
    const skillCodes = getActivitySkills(activity).map((item) => item.code).join(", ");
    return `
      <tr>
        <td>${escapeHtml(activity.type)}</td>
        <td>${escapeHtml(activity.title)}</td>
        <td>${escapeHtml(skillCodes)}</td>
        <td>${escapeHtml(formatActivityDateRange(activity) || "Non renseignee")}</td>
        <td>${activity.indicators.length}</td>
        <td>${getActivityAverage(activity, students)}%</td>
      </tr>
    `;
  }).join("");
  return buildPrintShell(
    `Synthese des seances - ${classItem?.name || ""}`,
    `${activities.length} seance(s) enregistree(s)`,
    `
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Seance</th>
            <th>Competences</th>
            <th>Periode</th>
            <th>Indicateurs</th>
            <th>Moyenne</th>
          </tr>
        </thead>
        <tbody>${rows || '<tr><td colspan="6">Aucune seance enregistree.</td></tr>'}</tbody>
      </table>
    `
  );
}

function getCycleDomainSummaryRows(student) {
  const journey = getStudentJourney(student);
  return referentialDomains.map((domain) => {
    const domainSkills = skillCatalog.filter((skill) => getSkillDomain(skill) === domain);
    const values = journey.map((item) => {
      const score = domainSkills.reduce((sum, skill) => sum + (levelScores[item.skills[skill.id]] || 0), 0);
      const max = domainSkills.length * (levelScores.acquis || 1) || 1;
      return `${Math.round((score / max) * 100)}%`;
    });
    const average = values.length
      ? `${Math.round(values.reduce((sum, value) => sum + Number.parseInt(value, 10), 0) / values.length)}%`
      : "";
    return [domain, ...values, average];
  });
}

function exportStudentAnnualWorkbook(student) {
  const classItem = getClassById(student.classId);
  if (!classItem) return;
  const headers = ["Eleve", "Classe", "Annee", "Competence", "Domaine", "Niveau"];
  const rows = skillCatalog.map((skill) => [
    student.name,
    classItem.name,
    classItem.year || "",
    `${skill.code} - ${skill.title}`,
    getSkillDomain(skill),
    levelLabels[student.skills[skill.id]] || ""
  ]);
  rows.push(["", "", "", "Progression annuelle", "", `${getStudentProgress(student)}%`]);
  getBlockAverages([student]).forEach((block) => {
    rows.push(["", "", "", `Synthese bloc - ${block.domain}`, block.domain, `${block.progress}%`]);
  });
  downloadExcelTable(`${student.name} - bilan annuel.xls`, "Bilan annuel", headers, rows);
}

function exportStudentCycleWorkbook(student) {
  const journey = getStudentJourney(student);
  const headers = ["Eleve", "Classe", "Annee", ...skillCatalog.map((skill) => skill.code), "Progression"];
  const rows = journey.map((item) => {
    const classItem = getClassById(item.classId);
    return [
      item.name,
      classItem?.name || "",
      classItem?.year || "",
      ...skillCatalog.map((skill) => levelLabels[item.skills[skill.id]] || ""),
      `${getStudentProgress(item)}%`
    ];
  });
  const average = journey.length ? Math.round(journey.reduce((sum, item) => sum + getStudentProgress(item), 0) / journey.length) : 0;
  rows.push(["", "", "", ...skillCatalog.map((skill) => {
    const statuses = journey.map((item) => item.skills[skill.id]).filter(Boolean);
    return statuses[statuses.length - 1] ? levelLabels[statuses[statuses.length - 1]] : "";
  }), `${average}% moyen`]);
  rows.push([]);
  rows.push(buildCycleDomainSummaryHeaders(journey));
  getCycleDomainSummaryRows(student).forEach((row) => rows.push(row));
  downloadExcelTable(`${student.name} - synthese 3 ans.xls`, "Synthese 3 ans", headers, rows);
}

function buildCycleDomainSummaryHeaders(journey) {
  return ["Domaine", ...journey.map((item) => {
    const classItem = getClassById(item.classId);
    return `${classItem?.name || item.classId} ${classItem?.year || ""}`.trim();
  }), "Synthese"];
}

if (typeof document !== "undefined") {
  window.setTimeout(() => {
    if (document.body?.dataset?.page !== "evaluations") return;
    const exportButton = document.querySelector("#activity-export-pdf");
    const synthesisButton = document.querySelector("#activity-synthesis-pdf");
    const feedback = document.querySelector("#activity-feedback");
    if (exportButton && !exportButton.dataset.safeBound) {
      exportButton.dataset.safeBound = "true";
      exportButton.addEventListener("click", () => {
        const classSelect = document.querySelector("#session-class-select");
        const activitySelect = document.querySelector("#activity-select");
        const classId = classSelect?.value || app.classes[0]?.id || "";
        const activity = getActivityById(activitySelect?.value) || getActivitiesByClass(classId)[0];
        if (!activity) {
          if (feedback) feedback.textContent = "Aucune seance a exporter.";
          return;
        }
        const opened = printHtmlDocument(`${activity.type} - ${activity.title}`, buildActivityPdfHtml(activity, classId));
        if (!opened && feedback) {
          feedback.textContent = "Le navigateur a bloque la fenetre PDF. Autorise les popups puis recommence.";
        }
      });
    }
    if (synthesisButton && !synthesisButton.dataset.safeBound) {
      synthesisButton.dataset.safeBound = "true";
      synthesisButton.addEventListener("click", () => {
        const classSelect = document.querySelector("#session-class-select");
        const classId = classSelect?.value || app.classes[0]?.id || "";
        const classItem = getClassById(classId);
        if (!classItem) {
          if (feedback) feedback.textContent = "Aucune classe selectionnee.";
          return;
        }
        const opened = printHtmlDocument(`Synthese ${classItem.name}`, buildActivitySynthesisPdfHtml(classId));
        if (!opened && feedback) {
          feedback.textContent = "Le navigateur a bloque la fenetre PDF. Autorise les popups puis recommence.";
        }
      });
    }
  }, 0);
}

function initClassesPageFinal() {
  bindProtectedChrome();
  const classForm = document.querySelector("#class-form");
  const classNameInput = document.querySelector("#class-name-input");
  const classYearInput = document.querySelector("#class-year-input");
  const classNoteInput = document.querySelector("#class-note-input");
  const studentForm = document.querySelector("#student-form");
  const studentNameInput = document.querySelector("#student-name-input");
  const studentClassInput = document.querySelector("#student-class-input");
  const importClassInput = document.querySelector("#import-class-input");
  const csvInput = document.querySelector("#student-csv-input");
  const importButton = document.querySelector("#import-csv-button");
  const importFeedback = document.querySelector("#import-feedback");
  const classFilter = document.querySelector("#class-filter");
  const classCards = document.querySelector("#class-cards");
  const studentDirectory = document.querySelector("#student-directory");
  const canManageStudents = hasPermission("manage_students");

  classForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!canManageStudents) return;
    const name = classNameInput.value.trim();
    const year = classYearInput.value.trim();
    const note = classNoteInput.value.trim();
    if (!name || !year || !note) return;
    app.classes.push({ id: slugify(`${name}-${Date.now()}`), name, year, note });
    logAction("Classe créée", name, `${year} // ${note}`);
    persistAppData();
    classForm.reset();
    renderClassesPage();
  });

  studentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!canManageStudents) return;
    const name = studentNameInput.value.trim();
    const classId = studentClassInput.value;
    if (!name || !classId) return;
    const id = slugify(`${name}-${Date.now()}`);
    app.students.push({ id, name, classId, skills: buildSkillState({}) });
    app.pfmpRecords[id] = hydratePfmpRecord({}, { id, classId }, app.classes);
    logAction("Élève ajouté", name, getClassById(classId)?.name || classId);
    persistAppData();
    studentForm.reset();
    renderClassesPage();
  });

  importButton.addEventListener("click", async () => {
    if (!canManageStudents) return;
    const file = csvInput.files?.[0];
    const classId = importClassInput.value;
    if (!file || !classId) {
      importFeedback.textContent = "Sélectionne un fichier CSV et une classe cible.";
      return;
    }
    const text = await file.text();
    const rows = parseCsv(text);
    const names = extractStudentNames(rows);
    if (!names.length) {
      importFeedback.textContent = "Aucun nom d'élève détecté dans le CSV.";
      return;
    }
    const existing = new Set(getStudentsByClass(classId).map((student) => student.name.trim().toLowerCase()));
    let imported = 0;
    let skipped = 0;
    names.forEach((name) => {
      const key = name.trim().toLowerCase();
      if (!key || existing.has(key)) {
        skipped += 1;
        return;
      }
      const id = slugify(`${name}-${Date.now()}-${imported}`);
      app.students.push({ id, name, classId, skills: buildSkillState({}) });
      app.pfmpRecords[id] = hydratePfmpRecord({}, { id, classId }, app.classes);
      existing.add(key);
      imported += 1;
    });
    if (imported) logAction("Import CSV", getClassById(classId)?.name || classId, `${imported} élève(s) ajoutés`);
    persistAppData();
    importFeedback.textContent = `${imported} élève(s) importé(s), ${skipped} ignoré(s).`;
    csvInput.value = "";
    renderClassesPage();
  });

  enforcePermission("manage_students", classNameInput, classYearInput, classNoteInput, studentNameInput, studentClassInput, importClassInput, csvInput, importButton);

  classFilter.addEventListener("change", renderClassesPage);
  renderClassesPage();

  function renderClassesPage() {
    populateClassSelect(studentClassInput);
    populateClassSelect(importClassInput);
    populateClassFilter(classFilter);
    const activeClassId = classFilter.value || "all";
    const visibleClasses = activeClassId === "all" ? app.classes : app.classes.filter((classItem) => classItem.id === activeClassId);

    classCards.innerHTML = visibleClasses.map((classItem) => {
      const students = getStudentsByClass(classItem.id);
      const pfmpSummary = getPfmpSummary(students);
      return `
        <article class="class-card">
          <div class="class-card-head">
            <h3>${classItem.name}</h3>
            <span class="badge accent">${students.length} élèves</span>
          </div>
          <p>${classItem.year}</p>
          <p>${classItem.note}</p>
          <div class="class-meta">
            <span class="badge">${getClassProgress(classItem.id)}% validé</span>
            <span class="badge">${pfmpSummary.withCompany} PFMP saisies</span>
          </div>
          <div class="student-badges">
            <button class="ghost-button class-edit" type="button" data-id="${classItem.id}"${canManageStudents ? "" : " disabled"}>Modifier</button>
            <button class="ghost-button class-delete" type="button" data-id="${classItem.id}"${canManageStudents ? "" : " disabled"}>Supprimer</button>
          </div>
        </article>
      `;
    }).join("");

    const directoryStudents = activeClassId === "all" ? app.students : getStudentsByClass(activeClassId);
    studentDirectory.innerHTML = directoryStudents.map((student) => {
      const filledPeriods = PFMP_PERIODS.filter((period) => getPfmpPeriodEntry(student.id, period.id).companyName).length;
      return `
        <article class="directory-row compact">
          <div class="directory-main">
            <div class="directory-head">
              <strong>${student.name}</strong>
              <div class="student-badges">
                <button class="ghost-button student-edit" type="button" data-id="${student.id}"${canManageStudents ? "" : " disabled"}>Modifier</button>
                <button class="ghost-button student-delete" type="button" data-id="${student.id}"${canManageStudents ? "" : " disabled"}>Supprimer</button>
              </div>
            </div>
            <p>${getClassById(student.classId)?.name || "Sans classe"}</p>
            <p>${filledPeriods}/6 PFMP renseignées</p>
          </div>
          <div class="student-badges">
            <span class="badge">${getStudentProgress(student)}% validé</span>
            <span class="badge">${filledPeriods}/6 périodes</span>
          </div>
        </article>
      `;
    }).join("");

    classCards.querySelectorAll(".class-edit").forEach((button) => {
      button.addEventListener("click", () => {
        const classItem = getClassById(button.dataset.id);
        if (!classItem || !canManageStudents) return;
        const name = window.prompt("Nouveau nom de la classe", classItem.name);
        if (!name) return;
        const year = window.prompt("Nouvelle année", classItem.year);
        if (!year) return;
        const note = window.prompt("Nouvelle référence", classItem.note);
        if (!note) return;
        classItem.name = name.trim();
        classItem.year = year.trim();
        classItem.note = note.trim();
        logAction("Classe modifiée", classItem.name, `${classItem.year} // ${classItem.note}`);
        persistAppData();
        renderClassesPage();
      });
    });

    classCards.querySelectorAll(".class-delete").forEach((button) => {
      button.addEventListener("click", () => {
        if (!canManageStudents) return;
        const classItem = getClassById(button.dataset.id);
        if (!classItem) return;
        if (!window.confirm(`Supprimer la classe "${classItem.name}" et tous ses élèves ?`)) return;
        deleteClass(button.dataset.id);
        renderClassesPage();
      });
    });

    studentDirectory.querySelectorAll(".student-edit").forEach((button) => {
      button.addEventListener("click", () => {
        const student = getStudentById(button.dataset.id);
        if (!student || !canManageStudents) return;
        const name = window.prompt("Nouveau nom de l'élève", student.name);
        if (!name) return;
        const classId = window.prompt("Nouvelle classe (id)", student.classId);
        if (!classId || !getClassById(classId.trim())) return;
        student.name = name.trim();
        student.classId = classId.trim();
        app.pfmpRecords[student.id] = hydratePfmpRecord(app.pfmpRecords[student.id] || {}, student, app.classes);
        logAction("Élève modifié", student.name, getClassById(student.classId)?.name || student.classId);
        persistAppData();
        renderClassesPage();
      });
    });

    studentDirectory.querySelectorAll(".student-delete").forEach((button) => {
      button.addEventListener("click", () => {
        if (!canManageStudents) return;
        const student = getStudentById(button.dataset.id);
        if (!student) return;
        if (!window.confirm(`Supprimer l'élève "${student.name}" ?`)) return;
        deleteStudent(button.dataset.id);
        renderClassesPage();
      });
    });
  }
}

function getTeacherRoleValues() {
  return roleCatalog.map((role) => role.value);
}

function getTeacherAccounts() {
  const primaryAdminId = getAccountByRole("admin")?.id;
  return app.accounts.filter((account) => account.id !== primaryAdminId);
}

function removeTeacherAccount(accountId) {
  const primaryAdminId = getAccountByRole("admin")?.id;
  app.accounts = app.accounts.filter((account) => account.id === primaryAdminId || account.id !== accountId);
  persistAppData();
}

function initAccountsPage() {
  bindProtectedChrome();
  const adminForm = document.querySelector("#admin-account-form");
  const teacherForm = document.querySelector("#teacher-account-form");
  const adminUsername = document.querySelector("#admin-username");
  const adminPassword = document.querySelector("#admin-password");
  const teacherUsername = document.querySelector("#teacher-username");
  const teacherPassword = document.querySelector("#teacher-password");
  const teacherRole = document.querySelector("#teacher-role");
  const feedback = document.querySelector("#accounts-feedback");
  const accountsSummary = document.querySelector("#accounts-summary");
  const teacherAccountsList = document.querySelector("#teacher-accounts-list");
  const activityLogList = document.querySelector("#activity-log-list");

  teacherRole.innerHTML = roleCatalog
    .map((role) => `<option value="${role.value}">${role.label}</option>`)
    .join("");
  teacherRole.value = "professeur";

  const adminAccount = getAccountByRole("admin");
  adminUsername.value = adminAccount.username;
  adminPassword.value = adminAccount.password;

  adminForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!adminUsername.value.trim() || !adminPassword.value.trim()) return;
    updateAccount(adminAccount.id, {
      username: adminUsername.value.trim(),
      password: adminPassword.value.trim(),
      previousUsername: adminAccount.username
    });
    logAction("Compte admin mis a jour", adminUsername.value.trim(), "Identifiant ou mot de passe modifie");
    await persistCriticalAppData();
    feedback.textContent = "Compte administrateur mis a jour.";
    renderAdministration();
  });

  teacherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!teacherUsername.value.trim() || !teacherPassword.value.trim()) return;
    const account = addTeacherAccount(teacherUsername.value.trim(), teacherPassword.value.trim(), teacherRole.value);
    logAction("Compte cree", account.username, `Role: ${getRoleLabel(account.role)}`);
    await persistCriticalAppData();
    teacherForm.reset();
    teacherRole.value = "professeur";
    feedback.textContent = "Compte ajoute.";
    renderAdministration();
  });

  renderAdministration();

  function renderAdministration() {
    const managedAccounts = getTeacherAccounts();
    const countsByRole = roleCatalog.map((role) => ({
      label: role.label,
      count: managedAccounts.filter((account) => account.role === role.value).length
    }));

    accountsSummary.innerHTML = `
      <article class="summary-card">
        <h3>Admin principal</h3>
        <p class="muted-copy">${adminAccount.username}</p>
      </article>
      <article class="summary-card">
        <h3>Comptes actifs</h3>
        <p class="muted-copy">${managedAccounts.length} compte(s)</p>
      </article>
      ${countsByRole.map((item) => `
        <article class="summary-card">
          <h3>${item.label}</h3>
          <p class="muted-copy">${item.count} compte(s)</p>
        </article>
      `).join("")}
    `;

    teacherAccountsList.innerHTML = managedAccounts.length ? managedAccounts.map((account) => `
      <article class="directory-row compact">
        <div>
          <strong>${account.username}</strong>
          <p>${account.label}</p>
        </div>
        <div class="student-badges">
          <button class="ghost-button teacher-edit" type="button" data-id="${account.id}">Modifier</button>
          <button class="ghost-button teacher-delete" type="button" data-id="${account.id}">Supprimer</button>
        </div>
      </article>
    `).join("") : `<article class="summary-card"><h3>Aucun compte</h3><p class="muted-copy">Ajoute un compte avec le formulaire ci-dessus.</p></article>`;

    activityLogList.innerHTML = app.activityLog.length ? app.activityLog.slice(0, 30).map((entry) => `
      <article class="directory-row compact">
        <div>
          <strong>${entry.action}</strong>
          <p>${entry.actor} // ${formatRole(entry.role)} // ${formatLogTimestamp(entry.timestamp)}</p>
          <p>${entry.target}${entry.detail ? ` // ${entry.detail}` : ""}</p>
        </div>
      </article>
    `).join("") : `<article class="summary-card"><h3>Aucune activite</h3><p class="muted-copy">Le journal se remplira automatiquement des les premieres actions.</p></article>`;

    teacherAccountsList.querySelectorAll(".teacher-edit").forEach((button) => {
      button.addEventListener("click", async () => {
        const account = getAccountById(button.dataset.id);
        if (!account) return;
        const username = window.prompt("Nouvel identifiant du compte", account.username);
        if (!username) return;
        const password = window.prompt("Nouveau mot de passe du compte", account.password);
        if (!password) return;
        const role = window.prompt(`Nouveau role (${getTeacherRoleValues().join(", ")})`, account.role);
        if (!role || !getTeacherRoleValues().includes(role.trim())) return;
        updateAccount(account.id, {
          username: username.trim(),
          password: password.trim(),
          role: role.trim(),
          previousUsername: account.username
        });
        logAction("Compte modifie", username.trim(), `Role: ${getRoleLabel(role.trim())}`);
        await persistCriticalAppData();
        feedback.textContent = "Compte modifie.";
        renderAdministration();
      });
    });

    teacherAccountsList.querySelectorAll(".teacher-delete").forEach((button) => {
      button.addEventListener("click", async () => {
        const removed = getAccountById(button.dataset.id);
        if (!removed) return;
        removeTeacherAccount(button.dataset.id);
        logAction("Compte supprime", removed.username, removed.label);
        await persistCriticalAppData();
        feedback.textContent = "Compte supprime.";
        renderAdministration();
      });
    });
  }
}

function initDashboardPageFinal() {
  bindProtectedChrome();
  const pageTitle = document.querySelector("#dashboard-page-title");
  const heroTitle = document.querySelector("#dashboard-hero-title");
  const heroText = document.querySelector("#dashboard-hero-text");
  const heroTags = document.querySelector("#dashboard-hero-tags");
  const statsGrid = document.querySelector("#stats-grid");
  const statusChart = document.querySelector("#status-chart");
  const blockChart = document.querySelector("#block-chart");
  const pfmpChart = document.querySelector("#pfmp-chart");
  const studentChart = document.querySelector("#student-chart");
  const catalogGrid = document.querySelector("#catalog-grid");
  const alertsGrid = document.querySelector("#alerts-grid");
  const alertFilter = document.querySelector("#alert-filter");
  const resetButton = document.querySelector("#reset-data");
  const classSelect = document.querySelector("#dashboard-class-select");
  const classMeta = document.querySelector("#dashboard-class-meta");
  const heroSide = document.querySelector(".hero-side");
  const dashboardLayout = document.querySelector(".dashboard-layout");
  const dashboardGrid = document.querySelector(".dashboard-grid");
  let searchInput = document.querySelector("#global-search-input");
  let searchResults = document.querySelector("#global-search-results");
  let teacherFilter = document.querySelector("#teacher-filter-select");
  let deadlinesPanel = document.querySelector("#deadlines-panel");
  let agendaPanel = document.querySelector("#agenda-panel");
  let calendarGrid = document.querySelector("#calendar-grid");
  const alertsPanel = document.querySelector("#alerts-grid")?.closest(".panel");
  const statusPanel = document.querySelector("#status-panel");
  const blockPanel = document.querySelector("#block-panel");
  const pfmpPanel = document.querySelector("#pfmp-panel");
  const studentPanel = document.querySelector("#student-panel");
  const catalogPanel = document.querySelector("#catalog-panel");
  let calendarPanel = document.querySelector("#calendar-panel");
  const currentView = getRequestedDashboardView();

  if (alertsPanel) alertsPanel.style.display = "none";

  if (heroSide && !searchInput) {
    const wrapper = document.createElement("div");
    wrapper.className = "stack-form";
    wrapper.innerHTML = `
      <label class="field">
        <span>Professeur référent</span>
        <select id="teacher-filter-select"></select>
      </label>
      <label class="field">
        <span>Recherche globale</span>
        <input id="global-search-input" type="text" placeholder="Élève, classe, entreprise, TP/TD...">
      </label>
      <div id="global-search-results" class="student-directory"></div>
      <div id="deadlines-panel" class="student-directory"></div>
      <div id="agenda-panel" class="student-directory"></div>
    `;
    heroSide.appendChild(wrapper);
    teacherFilter = wrapper.querySelector("#teacher-filter-select");
    searchInput = wrapper.querySelector("#global-search-input");
    searchResults = wrapper.querySelector("#global-search-results");
    deadlinesPanel = wrapper.querySelector("#deadlines-panel");
    agendaPanel = wrapper.querySelector("#agenda-panel");
  }

  if (dashboardLayout && !calendarGrid) {
    const calendarSection = document.createElement("section");
    calendarSection.className = "panel";
    calendarSection.id = "calendar-panel";
    calendarSection.innerHTML = `
      <div class="section-head">
        <div>
          <p class="eyebrow">Calendar</p>
          <h2>Calendrier pédagogique</h2>
        </div>
        <p id="calendar-month-label" class="results-count"></p>
      </div>
      <div id="calendar-grid" class="calendar-grid"></div>
    `;
    dashboardLayout.insertBefore(calendarSection, dashboardLayout.children[1] || null);
    calendarGrid = calendarSection.querySelector("#calendar-grid");
    calendarPanel = calendarSection;
  }

  applyDashboardView(currentView);

  populateTeacherFilter(teacherFilter);
  populateClassSelect(classSelect);
  const requestedClassId = getRequestedClassId();
  if (requestedClassId) classSelect.value = requestedClassId;
  enforcePermission("reset_app", resetButton);
  classSelect.addEventListener("change", renderDashboardPage);
  alertFilter?.addEventListener("change", renderDashboardPage);
  teacherFilter?.addEventListener("change", () => {
    renderDashboardPage();
    renderSearchResults();
  });
  searchInput?.addEventListener("input", renderSearchResults);
  resetButton.addEventListener("click", () => {
    if (!hasPermission("reset_app")) return;
    const initial = hydrateAppData({ classes: defaultClasses, students: defaultStudents, pfmpRecords: defaultPfmpRecords, evaluationActivities: defaultEvaluationActivities, accounts: app.accounts, activityLog: [] });
    app.classes = initial.classes;
    app.students = initial.students;
    app.pfmpRecords = initial.pfmpRecords;
    app.evaluationActivities = initial.evaluationActivities;
    app.activityLog = initial.activityLog;
    logAction("Réinitialisation", "Application", "Jeu de données par défaut restauré");
    persistAppData();
    populateClassSelect(classSelect);
    renderDashboardPage();
  });

  renderDashboardPage();
  renderSearchResults();

  function renderDashboardPage() {
    const classId = classSelect.value || app.classes[0]?.id || "";
    const classItem = getClassById(classId);
    const selectedTeacher = teacherFilter?.value || "all";
    const students = getStudentsByClass(classId).filter((student) => selectedTeacher === "all" || studentMatchesTeacher(student, selectedTeacher));
    const counts = getStatusCounts(students);
    const progressAverage = students.length ? Math.round(students.reduce((sum, student) => sum + getStudentProgress(student), 0) / students.length) : 0;
    const strongestBlock = [...getBlockAverages(students)].sort((a, b) => b.progress - a.progress)[0];
    const pfmpSummary = getPfmpSummary(students);
    const exportSkillsButton = document.querySelector("#export-skills-button");

    classMeta.textContent = classItem ? `${classItem.name} // ${classItem.year} // ${students.length} élèves${selectedTeacher !== "all" ? ` // ${selectedTeacher}` : ""}` : "Aucune classe";
    statsGrid.innerHTML = [
      { label: "Élèves", value: students.length, trace: "effectif de la classe" },
      { label: "Progression moyenne", value: `${progressAverage}%`, trace: strongestBlock ? `bloc fort: ${strongestBlock.domain}` : "aucune donnée" },
      { label: "PFMP renseignées", value: pfmpSummary.withCompany, trace: "entreprise saisie" },
      { label: "Conventions complètes", value: pfmpSummary.fullConvention, trace: "entreprise + parents + lycée" }
    ].map(renderStatCard).join("");

    renderStatusChart(statusChart, counts);
    renderBlockChart(blockChart, getBlockAverages(students));
    renderPfmpChart(pfmpChart, pfmpSummary);
    renderStudentChart(studentChart, students);

    const alerts = getClassAlerts(classId, selectedTeacher).filter((alert) => !alertFilter || alertFilter.value === "all" || alert.level === alertFilter.value);
    alertsGrid.innerHTML = alerts.length ? alerts.map((alert) => `
      <article class="summary-card alert-card ${alert.level}">
        <p class="alert-level">${alert.level}</p>
        <h3>${alert.title}</h3>
        <p class="muted-copy">${alert.detail}</p>
      </article>
    `).join("") : `<article class="summary-card"><h3>Aucune alerte</h3><p class="muted-copy">Aucune alerte pour ce filtre sur la classe sélectionnée.</p></article>`;

    exportSkillsButton.onclick = () => exportSkillsWorkbook(classItem, students);
    catalogGrid.innerHTML = skillCatalog.map((skill) => `
      <article class="catalog-card">
        <div class="skill-headline">
          <span class="skill-code">${skill.code}</span>
          <span class="skill-domain">${getSkillDomain(skill)}</span>
        </div>
        <h3>${skill.title}</h3>
        <p>${skill.description}</p>
      </article>
    `).join("");

    if (deadlinesPanel) {
      const notices = getDeadlinesForClass(classId, selectedTeacher);
      deadlinesPanel.innerHTML = notices.length ? notices.map((notice) => `
        <article class="directory-row compact">
          <div>
            <strong>${notice.title}</strong>
            <p>${notice.meta}</p>
          </div>
        </article>
      `).join("") : `<article class="summary-card"><h3>Aucune échéance</h3><p class="muted-copy">Aucune échéance prioritaire sur ce périmètre.</p></article>`;
    }

    if (agendaPanel) {
      const agendaItems = getAgendaEntries(classId, selectedTeacher);
      agendaPanel.innerHTML = agendaItems.length ? agendaItems.map((item) => `
        <article class="directory-row compact">
          <div>
            <strong>${item.title}</strong>
            <p>${item.meta}</p>
          </div>
          <div class="student-badges">
            <span class="badge">${item.kind}</span>
            <span class="badge">${item.when}</span>
          </div>
        </article>
      `).join("") : `<article class="summary-card"><h3>Aucun agenda</h3><p class="muted-copy">Aucune date exploitable pour cette classe ou ce professeur.</p></article>`;
    }

    if (calendarGrid) {
      const monthLabel = document.querySelector("#calendar-month-label");
      const calendar = getMonthCalendarData(classId, selectedTeacher);
      if (monthLabel) monthLabel.textContent = calendar.label;
      calendarGrid.innerHTML = `
        ${calendar.weekdays.map((weekday) => `<div class="calendar-head">${weekday}</div>`).join("")}
        ${calendar.days.map((day) => {
          if (!day) return `<article class="calendar-cell is-empty"></article>`;
          return `
            <article class="calendar-cell is-actionable${day.isToday ? " is-today" : ""}" data-date="${day.key}">
              <div class="calendar-day">${day.dayNumber}</div>
              <div class="calendar-events">
                ${day.events.slice(0, 2).map((event) => `<span class="calendar-event">${event.kind} // ${event.title}</span>`).join("")}
                ${day.events.length > 2 ? `<span class="calendar-event">+${day.events.length - 2} autres</span>` : ""}
              </div>
            </article>
          `;
        }).join("")}
      `;
      if (hasPermission("edit_evaluations")) {
        calendarGrid.querySelectorAll(".calendar-cell.is-actionable").forEach((cell) => {
          cell.addEventListener("click", () => {
            const date = cell.dataset.date;
            if (!date) return;
            window.location.href = `evaluations.html?class=${encodeURIComponent(classId)}&view=create&dateStart=${encodeURIComponent(date)}&dateEnd=${encodeURIComponent(date)}`;
          });
        });
      }
    }
  }

  function applyDashboardView(view) {
    const viewConfig = {
      skills: {
        pageTitle: "Pilotage competences",
        heroTitle: "Pilotage des competences par classe",
        heroText: "Vue centree sur la progression, les blocs du referentiel et le comparatif eleves pour la classe selectionnee.",
        tags: ["Filtre classe", "Competences C1 a C11", "Synthese eleves"],
        showExport: true,
        showStats: true,
        showSearch: true,
        showDeadlines: false,
        showAgenda: false,
        showStatus: true,
        showBlock: true,
        showPfmp: false,
        showStudent: true,
        showCatalog: true,
        showCalendar: false
      },
      pfmp: {
        pageTitle: "Pilotage PFMP",
        heroTitle: "Pilotage PFMP par classe",
        heroText: "Vue dediee au suivi PFMP, aux conventions et aux echeances prioritaires pour la classe selectionnee.",
        tags: ["Suivi entreprise", "Conventions", "Etat PFMP"],
        showExport: false,
        showStats: true,
        showSearch: true,
        showDeadlines: true,
        showAgenda: false,
        showStatus: false,
        showBlock: false,
        showPfmp: true,
        showStudent: false,
        showCatalog: false,
        showCalendar: false
      },
      calendar: {
        pageTitle: "Calendrier pedagogique",
        heroTitle: "Calendrier pedagogique par classe",
        heroText: "Vue calendrier pour suivre les seances, visites et reperes temporels de la classe selectionnee.",
        tags: ["Agenda de classe", "Seances TP TD", "Visites PFMP"],
        showExport: false,
        showStats: false,
        showSearch: false,
        showDeadlines: false,
        showAgenda: true,
        showStatus: false,
        showBlock: false,
        showPfmp: false,
        showStudent: false,
        showCatalog: false,
        showCalendar: true
      }
    }[view] || null;

    if (!viewConfig) return;
    if (pageTitle) pageTitle.textContent = viewConfig.pageTitle;
    if (heroTitle) heroTitle.textContent = viewConfig.heroTitle;
    if (heroText) heroText.textContent = viewConfig.heroText;
    if (heroTags) {
      heroTags.innerHTML = viewConfig.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
    }
    const exportSkillsButton = document.querySelector("#export-skills-button");
    if (exportSkillsButton) exportSkillsButton.style.display = viewConfig.showExport ? "" : "none";
    if (statsGrid) statsGrid.style.display = viewConfig.showStats ? "" : "none";
    if (searchInput?.closest(".field")) searchInput.closest(".field").style.display = viewConfig.showSearch ? "" : "none";
    if (searchResults) searchResults.style.display = viewConfig.showSearch ? "" : "none";
    if (teacherFilter?.closest(".field")) teacherFilter.closest(".field").style.display = viewConfig.showSearch ? "" : "none";
    if (deadlinesPanel) deadlinesPanel.style.display = viewConfig.showDeadlines ? "" : "none";
    if (agendaPanel) agendaPanel.style.display = viewConfig.showAgenda ? "" : "none";
    if (statusPanel) statusPanel.style.display = viewConfig.showStatus ? "" : "none";
    if (blockPanel) blockPanel.style.display = viewConfig.showBlock ? "" : "none";
    if (pfmpPanel) pfmpPanel.style.display = viewConfig.showPfmp ? "" : "none";
    if (studentPanel) studentPanel.style.display = viewConfig.showStudent ? "" : "none";
    if (catalogPanel) catalogPanel.style.display = viewConfig.showCatalog ? "" : "none";
    if (calendarPanel) calendarPanel.style.display = viewConfig.showCalendar ? "" : "none";
    if (dashboardGrid) {
      const hasChartContent = viewConfig.showStatus || viewConfig.showBlock || viewConfig.showPfmp || viewConfig.showStudent;
      dashboardGrid.style.display = hasChartContent ? "" : "none";
    }
  }

  function renderSearchResults() {
    if (!searchResults || !searchInput) return;
    const term = searchInput.value.trim().toLowerCase();
    if (!term) {
      searchResults.innerHTML = "";
      return;
    }
    const results = [];
    const selectedTeacher = teacherFilter?.value || "all";
    app.students.filter((student) => selectedTeacher === "all" || studentMatchesTeacher(student, selectedTeacher)).forEach((student) => {
      const className = getClassById(student.classId)?.name || "";
      if (`${student.name} ${className}`.toLowerCase().includes(term)) {
        results.push({ label: student.name, meta: `Élève // ${className}` });
      }
    });
    app.classes.forEach((classItem) => {
      if (`${classItem.name} ${classItem.year} ${classItem.note}`.toLowerCase().includes(term)) {
        results.push({ label: classItem.name, meta: `Classe // ${classItem.year}` });
      }
    });
    app.evaluationActivities.filter((activity) => selectedTeacher === "all" || activityTouchesTeacher(activity, selectedTeacher)).forEach((activity) => {
      if (`${activity.title} ${activity.type} ${activity.date} ${getActivitySkillLabel(activity)} ${(activity.comment || "")}`.toLowerCase().includes(term)) {
        results.push({ label: activity.title, meta: `${activity.type} // ${getClassById(activity.classId)?.name || ""}` });
      }
    });
    app.students.filter((student) => selectedTeacher === "all" || studentMatchesTeacher(student, selectedTeacher)).forEach((student) => {
      PFMP_PERIODS.forEach((period) => {
        const entry = getPfmpPeriodEntry(student.id, period.id);
        if (`${entry.companyName} ${entry.tutorName} ${entry.teacher}`.toLowerCase().includes(term) && (entry.companyName || entry.tutorName || entry.teacher)) {
          results.push({ label: entry.companyName || student.name, meta: `PFMP // ${student.name} // ${period.label}` });
        }
      });
    });

    searchResults.innerHTML = results.length ? results.slice(0, 12).map((result) => `
      <article class="directory-row compact">
        <div>
          <strong>${result.label}</strong>
          <p>${result.meta}</p>
        </div>
      </article>
    `).join("") : `<article class="summary-card"><h3>Aucun résultat</h3><p class="muted-copy">Aucune correspondance pour cette recherche.</p></article>`;
  }
}

function initPfmpLivretPageFinal() {
  bindProtectedChrome();
  const classSelect = document.querySelector("#booklet-class-select");
  const studentSelect = document.querySelector("#booklet-student-select");
  const periodSelect = document.querySelector("#booklet-period-select");
  const evaluatorName = document.querySelector("#booklet-evaluator-name");
  const evaluatorRole = document.querySelector("#booklet-evaluator-role");
  const companyFeedback = document.querySelector("#booklet-company-feedback");
  const generalComment = document.querySelector("#booklet-general-comment");
  const summaryGrid = document.querySelector("#booklet-summary-grid");
  const skillsEditor = document.querySelector("#booklet-skills-editor");
  const saveButton = document.querySelector("#booklet-save-button");
  const canEditPfmp = hasPermission("edit_pfmp");

  populateClassSelect(classSelect);
  const requestedClassId = getRequestedClassId();
  if (requestedClassId) classSelect.value = requestedClassId;
  periodSelect.innerHTML = PFMP_PERIODS.filter((period) => period.cycle === "Terminale").map((period) => `<option value="${period.id}">${period.label}</option>`).join("");
  syncStudents();
  renderBookletPage();

  enforcePermission("edit_pfmp", classSelect, studentSelect, periodSelect, evaluatorName, evaluatorRole, companyFeedback, generalComment, saveButton);

  classSelect.addEventListener("change", () => {
    syncStudents();
    renderBookletPage();
  });
  studentSelect.addEventListener("change", renderBookletPage);
  periodSelect.addEventListener("change", renderBookletPage);
  saveButton?.addEventListener("click", () => {
    if (!canEditPfmp) return;
    const student = getStudentById(studentSelect.value);
    if (!student) return;
    const entry = getPfmpBookletEntry(student.id, periodSelect.value);
    entry.evaluatorName = evaluatorName.value.trim();
    entry.evaluatorRole = evaluatorRole.value.trim();
    entry.companyFeedback = companyFeedback.value.trim();
    entry.generalComment = generalComment.value.trim();
    logAction("Livret PFMP mis à jour", student.name, PFMP_PERIODS.find((period) => period.id === periodSelect.value)?.label || periodSelect.value);
    persistAppData();
    renderBookletPage();
  });

  function syncStudents() {
    const classId = classSelect.value || app.classes[0]?.id || "";
    const students = getStudentsByClass(classId);
    studentSelect.innerHTML = students.map((student) => `<option value="${student.id}">${student.name}</option>`).join("");
  }

  function renderBookletPage() {
    const classId = classSelect.value || app.classes[0]?.id || "";
    const student = getStudentById(studentSelect.value) || getStudentsByClass(classId)[0];
    if (!student) {
      summaryGrid.innerHTML = `<article class="summary-card"><h3>Aucun élève</h3><p class="muted-copy">Ajoute un élève pour utiliser le livret.</p></article>`;
      skillsEditor.innerHTML = "";
      return;
    }
    const pfmpEntry = getPfmpPeriodEntry(student.id, periodSelect.value);
    const bookletEntry = getPfmpBookletEntry(student.id, periodSelect.value);
    evaluatorName.value = bookletEntry.evaluatorName || "";
    evaluatorRole.value = bookletEntry.evaluatorRole || "";
    companyFeedback.value = bookletEntry.companyFeedback || "";
    generalComment.value = bookletEntry.generalComment || "";

    summaryGrid.innerHTML = [
      { label: "Élève", value: student.name, trace: getClassById(student.classId)?.name || "" },
      { label: "Entreprise", value: pfmpEntry.companyName || "Non renseignée", trace: pfmpEntry.tutorName || "Tuteur non renseigné" },
      { label: "Période", value: PFMP_PERIODS.find((period) => period.id === periodSelect.value)?.label || periodSelect.value, trace: pfmpEntry.visitDate || "Visite non planifiée" },
      { label: "Prof référent", value: pfmpEntry.teacher || "Non renseigné", trace: `${getStudentProgress(student)}% progression globale` }
    ].map(renderStatCard).join("");

    skillsEditor.innerHTML = skillCatalog.map((skill) => `
      <article class="skill-row">
        <div class="skill-main">
          <div class="skill-headline">
            <span class="skill-code">${skill.code}</span>
            <span class="skill-domain">${getSkillDomain(skill)}</span>
          </div>
          <h3 class="skill-title">${skill.title}</h3>
          <p class="skill-description">${skill.description}</p>
        </div>
        <div class="skill-actions">
          <label class="field compact-field">
            <span>Niveau observé</span>
            <select class="booklet-skill-select" data-skill-id="${skill.id}"${canEditPfmp ? "" : " disabled"}>
              ${renderStatusOptions(bookletEntry.skills[skill.id])}
            </select>
          </label>
        </div>
      </article>
    `).join("");

    skillsEditor.querySelectorAll(".booklet-skill-select").forEach((select) => {
      select.addEventListener("change", (event) => {
        if (!canEditPfmp) return;
        bookletEntry.skills[event.target.dataset.skillId] = event.target.value;
        persistAppData();
      });
    });
  }
}

function initCoveragePageFinal() {
  bindProtectedChrome();
  const classSelect = document.querySelector("#coverage-class-select");
  const meta = document.querySelector("#coverage-meta");
  const stats = document.querySelector("#coverage-stats");
  const domains = document.querySelector("#coverage-domains");
  const weak = document.querySelector("#coverage-weak-skills");

  populateClassSelect(classSelect);
  const requestedClassId = getRequestedClassId();
  if (requestedClassId) classSelect.value = requestedClassId;
  classSelect.addEventListener("change", renderCoverage);
  renderCoverage();

  function renderCoverage() {
    const classId = classSelect.value || app.classes[0]?.id || "";
    const classItem = getClassById(classId);
    const students = getStudentsByClass(classId);
    const snapshot = getCoverageSnapshot(classId);
    meta.textContent = `${classItem?.name || ""} // ${students.length} eleves // ${snapshot.coveredSkills}/${skillCatalog.length} competences activees`;
    stats.innerHTML = [
      { label: "Competences actives", value: `${snapshot.coveredSkills}/${skillCatalog.length}`, trace: "seances ou PFMP" },
      { label: "Seances liees", value: snapshot.activitiesCount, trace: "TP/TD relies au referentiel" },
      { label: "Observations PFMP", value: snapshot.pfmpObserved, trace: "competences observees en livret" },
      { label: "Couverture moyenne", value: `${snapshot.coverageRate}%`, trace: "sur les 3 domaines" }
    ].map(renderStatCard).join("");
    domains.innerHTML = snapshot.domains.map((domain) => `
      <article class="summary-card">
        <h3>${domain.domain}</h3>
        <p class="muted-copy">${domain.coveredSkills}/${domain.totalSkills} competences couvertes</p>
        <p class="muted-copy">${domain.activitiesCount} seance(s) // ${domain.pfmpCount} observation(s) PFMP</p>
      </article>
    `).join("");
    weak.innerHTML = snapshot.weakSkills.length ? snapshot.weakSkills.map((skill) => `
      <article class="directory-row compact">
        <div>
          <strong>${skill.code} // ${skill.title}</strong>
          <p>${getSkillDomain(skill)} // ${skill.activitiesCount} seance(s) // ${skill.pfmpCount} PFMP</p>
        </div>
      </article>
    `).join("") : `<article class="summary-card"><h3>Aucune faiblesse majeure</h3><p class="muted-copy">Toutes les competences ont une trace pedagogique.</p></article>`;
  }
}

function initMappingPageFinal() {
  bindProtectedChrome();
  const classSelect = document.querySelector("#mapping-class-select");
  const domainSelect = document.querySelector("#mapping-domain-select");
  const meta = document.querySelector("#mapping-meta");
  const grid = document.querySelector("#mapping-grid");

  populateClassSelect(classSelect);
  domainSelect.innerHTML = [`<option value="all">Tous les domaines</option>`, ...referentialDomains.map((domain) => `<option value="${domain}">${domain}</option>`)].join("");
  const requestedClassId = getRequestedClassId();
  if (requestedClassId) classSelect.value = requestedClassId;
  classSelect.addEventListener("change", renderMapping);
  domainSelect.addEventListener("change", renderMapping);
  renderMapping();

  function renderMapping() {
    const classId = classSelect.value || app.classes[0]?.id || "";
    const classItem = getClassById(classId);
    const selectedDomain = domainSelect.value || "all";
    const cards = skillCatalog
      .filter((skill) => selectedDomain === "all" || getSkillDomain(skill) === selectedDomain)
      .map((skill) => {
        const relatedActivities = getActivitiesByClass(classId).filter((activity) => getActivitySkillIds(activity).includes(skill.id));
        const pfmpHits = getStudentsByClass(classId).flatMap((student) => getPfmpObservationLabels(student.id, skill.id));
        return { skill, relatedActivities, pfmpHits };
      });
    meta.textContent = `${classItem?.name || ""} // ${selectedDomain === "all" ? "tous les domaines" : selectedDomain}`;
    grid.innerHTML = cards.map(({ skill, relatedActivities, pfmpHits }) => `
      <article class="catalog-card">
        <div class="skill-headline">
          <span class="skill-code">${skill.code}</span>
          <span class="skill-domain">${getSkillDomain(skill)}</span>
        </div>
        <h3>${skill.title}</h3>
        <p>${relatedActivities.length} seance(s) // ${pfmpHits.length} observation(s) PFMP</p>
        <div class="heatmap-row">
          <div class="heatmap-cell">
            <span>Seances</span>
            <strong style="background:${getHeatmapColor(Math.min(relatedActivities.length / 4, 1))}">${relatedActivities.length}</strong>
          </div>
          <div class="heatmap-cell">
            <span>PFMP</span>
            <strong style="background:${getHeatmapColor(Math.min(pfmpHits.length / 6, 1))}">${pfmpHits.length}</strong>
          </div>
          <div class="heatmap-cell">
            <span>Couverture</span>
            <strong style="background:${getHeatmapColor(Math.min((relatedActivities.length + pfmpHits.length) / 8, 1))}">${relatedActivities.length + pfmpHits.length}</strong>
          </div>
        </div>
        <p class="muted-copy">${relatedActivities.length ? relatedActivities.map((activity) => `${activity.type} ${activity.title}`).join(" | ") : "Aucune seance reliee."}</p>
        <p class="muted-copy">${pfmpHits.length ? pfmpHits.join(" | ") : "Aucune observation PFMP."}</p>
        <div class="student-badges">
          <a class="ghost-button button-link" href="evaluations.html?view=session&class=${encodeURIComponent(classId)}">Voir les seances</a>
          <a class="ghost-button button-link" href="pfmp.html?class=${encodeURIComponent(classId)}">Voir les PFMP</a>
          <a class="ghost-button button-link" href="evaluations.html?view=create&class=${encodeURIComponent(classId)}&skill=${encodeURIComponent(skill.id)}">Creer une seance</a>
        </div>
      </article>
    `).join("");
  }
}

function initLibraryPageFinal() {
  bindProtectedChrome();
  const form = document.querySelector("#library-form");
  const titleInput = document.querySelector("#library-title");
  const domainSelect = document.querySelector("#library-domain");
  const levelSelect = document.querySelector("#library-level");
  const durationInput = document.querySelector("#library-duration");
  const skillsSelect = document.querySelector("#library-skills");
  const materialsInput = document.querySelector("#library-materials");
  const indicatorsInput = document.querySelector("#library-indicators");
  const notesInput = document.querySelector("#library-notes");
  const feedback = document.querySelector("#library-feedback");
  const filterDomain = document.querySelector("#library-filter-domain");
  const filterLevel = document.querySelector("#library-filter-level");
  const targetClass = document.querySelector("#library-target-class");
  const targetDateStart = document.querySelector("#library-target-date-start");
  const targetDateEnd = document.querySelector("#library-target-date-end");
  const list = document.querySelector("#library-list");
  const canEdit = hasPermission("edit_evaluations");

  domainSelect.innerHTML = referentialDomains.map((domain) => `<option value="${domain}">${domain}</option>`).join("");
  filterDomain.innerHTML = [`<option value="all">Tous les domaines</option>`, ...referentialDomains.map((domain) => `<option value="${domain}">${domain}</option>`)].join("");
  levelSelect.innerHTML = [`<option value="2CIEL">2CIEL</option>`, `<option value="1CIEL">1CIEL</option>`, `<option value="TCIEL">TCIEL</option>`].join("");
  filterLevel.innerHTML = [`<option value="all">Tous les niveaux</option>`, `<option value="2CIEL">2CIEL</option>`, `<option value="1CIEL">1CIEL</option>`, `<option value="TCIEL">TCIEL</option>`].join("");
  populateClassSelect(targetClass);
  populateSkillMultiSelect(skillsSelect);
  enforcePermission("edit_evaluations", titleInput, domainSelect, levelSelect, durationInput, skillsSelect, materialsInput, indicatorsInput, notesInput);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!canEdit) return;
    const skillIds = getSelectedValues(skillsSelect);
    const indicators = indicatorsInput.value.split("\n").map((line) => line.trim()).filter(Boolean);
    if (!titleInput.value.trim() || !skillIds.length) {
      feedback.textContent = "Renseigne un titre et au moins une competence.";
      return;
    }
    app.lessonLibrary.push({
      id: slugify(`library-${titleInput.value}-${Date.now()}`),
      title: titleInput.value.trim(),
      domain: domainSelect.value,
      level: levelSelect.value,
      duration: durationInput.value.trim(),
      skillIds,
      materials: materialsInput.value.trim(),
      indicators,
      notes: notesInput.value.trim()
    });
    logAction("Modele ajoute", titleInput.value.trim(), domainSelect.value);
    persistAppData();
    form.reset();
    clearMultiSelect(skillsSelect);
    feedback.textContent = "Modele enregistre.";
    renderLibrary();
  });

  filterDomain.addEventListener("change", renderLibrary);
  filterLevel.addEventListener("change", renderLibrary);
  targetClass?.addEventListener("change", renderLibrary);
  targetDateStart?.addEventListener("change", renderLibrary);
  targetDateEnd?.addEventListener("change", renderLibrary);
  renderLibrary();

  function renderLibrary() {
    const selectedDomain = filterDomain.value || "all";
    const selectedLevel = filterLevel.value || "all";
    const items = (app.lessonLibrary || []).filter((item) => (selectedDomain === "all" || item.domain === selectedDomain) && (selectedLevel === "all" || item.level === selectedLevel));
    const targetClassId = targetClass?.value || "";
    const startDate = targetDateStart?.value || "";
    const endDate = targetDateEnd?.value || startDate || "";
    list.innerHTML = items.length ? items.map((item) => `
      <article class="catalog-card">
        <div class="skill-headline">
          <span class="skill-code">${item.level}</span>
          <span class="skill-domain">${item.domain}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.duration || "Duree non renseignee"} // ${(item.indicators || []).length} indicateur(s)</p>
        <p class="muted-copy">${(item.skillIds || []).map((skillId) => getSkillById(skillId)?.code).filter(Boolean).join(" | ")}</p>
        <p class="muted-copy">${item.materials || "Materiel non renseigne"}</p>
        <div class="student-badges">
          <a class="ghost-button button-link" href="evaluations.html?view=create&template=${encodeURIComponent(item.id)}${targetClassId ? `&class=${encodeURIComponent(targetClassId)}` : ""}${startDate ? `&dateStart=${encodeURIComponent(startDate)}` : ""}${endDate ? `&dateEnd=${encodeURIComponent(endDate)}` : ""}">Utiliser</a>
          <button class="ghost-button library-delete" type="button" data-id="${item.id}" ${canEdit ? "" : "disabled"}>Supprimer</button>
        </div>
      </article>
    `).join("") : `<article class="summary-card"><h3>Aucun modele</h3><p class="muted-copy">Ajoute une seance type pour constituer ta bibliotheque CIEL.</p></article>`;

    list.querySelectorAll(".library-delete").forEach((button) => {
      button.addEventListener("click", () => {
        if (!canEdit) return;
        app.lessonLibrary = app.lessonLibrary.filter((item) => item.id !== button.dataset.id);
        persistAppData();
        renderLibrary();
      });
    });
  }
}

function initRemediationPageFinal() {
  bindProtectedChrome();
  const classSelect = document.querySelector("#remediation-class-select");
  const severitySelect = document.querySelector("#remediation-severity-select");
  const teacherSelect = document.querySelector("#remediation-teacher-select");
  const summaryGrid = document.querySelector("#remediation-summary-grid");
  const detailGrid = document.querySelector("#remediation-detail-grid");
  const scopeTitle = document.querySelector("#remediation-scope-title");
  const detailTitle = document.querySelector("#remediation-detail-title");

  populateClassSelect(classSelect);
  populateTeacherFilter(teacherSelect);
  const requestedClassId = getRequestedClassId();
  if (requestedClassId) classSelect.value = requestedClassId;

  classSelect.addEventListener("change", renderRemediationPage);
  severitySelect?.addEventListener("change", renderRemediationPage);
  teacherSelect?.addEventListener("change", renderRemediationPage);

  renderRemediationPage();

  function renderRemediationPage() {
    const classId = classSelect.value || app.classes[0]?.id || "";
    const teacher = teacherSelect?.value || "all";
    const severity = severitySelect?.value || "all";
    const alerts = getClassAlerts(classId, teacher).filter((item) => severity === "all" || item.level === severity);
    const isPfmpPage = page === "remediation_pfmp";
    const detailItems = (isPfmpPage ? getPfmpRemediationItems(classId, teacher) : getEvaluationRemediationItems(classId, teacher))
      .filter((item) => severity === "all" || item.level === severity)
      .map((item) => {
        if (item.actionHref) return item;
        if (isPfmpPage) {
          return { ...item, actionHref: `pfmp.html?class=${encodeURIComponent(classId)}`, actionLabel: "Ouvrir PFMP" };
        }
        const matchedSkill = skillCatalog.find((skill) => item.title.startsWith(`${skill.code} //`));
        return matchedSkill
          ? { ...item, actionHref: `evaluations.html?view=create&class=${encodeURIComponent(classId)}&skill=${encodeURIComponent(matchedSkill.id)}`, actionLabel: "Creer une seance de remediation" }
          : { ...item, actionHref: `evaluations.html?view=session&class=${encodeURIComponent(classId)}`, actionLabel: "Ouvrir les evaluations" };
      });

    if (scopeTitle) scopeTitle.textContent = isPfmpPage ? "Vue remediation PFMP" : "Vue remediation competences";
    if (detailTitle) detailTitle.textContent = isPfmpPage ? "Remediation PFMP" : "Remediation competences";
    summaryGrid.innerHTML = alerts.length ? alerts.map(renderRemediationCard).join("") : `<article class="summary-card"><h3>Aucune remédiation globale</h3><p class="muted-copy">Aucun signal bloquant pour ce filtre.</p></article>`;
    detailGrid.innerHTML = detailItems.length ? detailItems.map(renderRemediationCard).join("") : `<article class="summary-card"><h3>Aucune action</h3><p class="muted-copy">Aucune relance à traiter pour ce filtre.</p></article>`;
  }
}

function renderRemediationCard(item) {
  return `
    <article class="summary-card alert-card ${item.level}">
      <p class="alert-level">${item.level}</p>
      <h3>${item.title}</h3>
      <p class="muted-copy">${item.detail}</p>
      <p class="muted-copy">${item.action || ""}</p>
      ${item.actionHref ? `<div class="student-badges"><a class="ghost-button button-link" href="${item.actionHref}">${item.actionLabel || "Ouvrir"}</a></div>` : ""}
    </article>
  `;
}

function initEvaluationsPageFinal() {
  bindProtectedChrome();
  const pageTitle = document.querySelector("#evaluations-page-title");
  const creationPanel = document.querySelector("#activity-creation-panel");
  const selectionPanel = document.querySelector("#activity-selection-panel");
  const matrixPanel = document.querySelector("#activity-matrix-panel");
  const reportPanel = document.querySelector("#activity-report-panel");
  const synthesisPanel = document.querySelector("#activity-synthesis-panel");
  const studentSkillsPanel = document.querySelector("#student-skills-panel");
  const activityForm = document.querySelector("#activity-form");
  const activityType = document.querySelector("#activity-type");
  const activityTitle = document.querySelector("#activity-title");
  const activityClass = document.querySelector("#activity-class");
  const activitySkill = document.querySelector("#activity-skill");
  const activityDateStart = document.querySelector("#activity-date-start");
  const activityDateEnd = document.querySelector("#activity-date-end");
  const activityIndicators = document.querySelector("#activity-indicators");
  const indicatorBankDomain = document.querySelector("#indicator-bank-domain");
  const indicatorBankSelect = document.querySelector("#indicator-bank-select");
  const indicatorBankLoadButton = document.querySelector("#indicator-bank-load");
  const indicatorBankSaveButton = document.querySelector("#indicator-bank-save");
  const activityComment = document.querySelector("#activity-comment");
  const activityFeedback = document.querySelector("#activity-feedback");
  const sessionClassSelect = document.querySelector("#session-class-select");
  const activitySelect = document.querySelector("#activity-select");
  const activitySearchInput = document.querySelector("#activity-search-input");
  const activityDuplicateButton = document.querySelector("#activity-duplicate-button");
  const activityEditButton = document.querySelector("#activity-edit-button");
  const activityDeleteButton = document.querySelector("#activity-delete-button");
  const activitySummary = document.querySelector("#activity-summary");
  const activityMatrix = document.querySelector("#activity-matrix");
  const activityReport = document.querySelector("#activity-report");
  const activitySynthesis = document.querySelector("#activity-synthesis");
  const evalClassSelect = document.querySelector("#eval-class-select");
  const evalStudentSelect = document.querySelector("#eval-student-select");
  const studentSkillsEditor = document.querySelector("#student-skills-editor");
  const studentSheetMeta = document.querySelector("#student-sheet-meta");
  const skillRowTemplate = document.querySelector("#skill-row-template");
  const canEditEvaluations = hasPermission("edit_evaluations");
  const canEditSkills = hasPermission("edit_skills");
  const currentView = getRequestedEvaluationsView();
  let exportBar = document.querySelector("#activity-export-bar");

  if (!exportBar && activityReport) {
    exportBar = document.createElement("div");
    exportBar.id = "activity-export-bar";
    exportBar.className = "student-badges";
    exportBar.innerHTML = `
      <button id="activity-export-pdf" class="ghost-button" type="button">Exporter PDF séance</button>
      <button id="activity-synthesis-pdf" class="ghost-button" type="button">Exporter PDF synthèse classe</button>
    `;
    activityReport.parentElement?.insertBefore(exportBar, activityReport);
  }

  const activityExportPdfButton = document.querySelector("#activity-export-pdf");
  const activitySynthesisPdfButton = document.querySelector("#activity-synthesis-pdf");

  populateClassSelect(activityClass);
  populateSkillMultiSelect(activitySkill);
  if (indicatorBankDomain) {
    indicatorBankDomain.innerHTML = [`<option value="all">Tous les domaines</option>`, ...referentialDomains.map((domain) => `<option value="${domain}">${domain}</option>`)].join("");
  }
  populateIndicatorBankSelect(indicatorBankSelect, [], indicatorBankDomain?.value || "all");
  populateClassSelect(sessionClassSelect);
  populateClassSelect(evalClassSelect);
  const requestedClassId = getRequestedClassId();
  const requestedTemplateId = getRequestedTemplateId();
  const requestedDates = getRequestedActivityDates();
  const requestedRemediationSkillId = getRequestedRemediationSkillId();
  if (requestedClassId) {
    activityClass.value = requestedClassId;
    sessionClassSelect.value = requestedClassId;
    evalClassSelect.value = requestedClassId;
  }
  applyLessonTemplate(requestedTemplateId);
  applyEvaluationsView(currentView);
  syncSessionActivities();
  syncEvalStudents();

  if (requestedDates.startDate) activityDateStart.value = requestedDates.startDate;
  if (requestedDates.endDate) activityDateEnd.value = requestedDates.endDate;
  if (requestedRemediationSkillId) {
    setMultiSelectValues(activitySkill, [requestedRemediationSkillId]);
    populateIndicatorBankSelect(indicatorBankSelect, [requestedRemediationSkillId], indicatorBankDomain?.value || "all");
    if (!activityTitle.value.trim()) {
      const skill = getSkillById(requestedRemediationSkillId);
      activityTitle.value = `Remediation ${skill?.code || ""}`.trim();
    }
    if (!activityComment.value.trim()) {
      const skill = getSkillById(requestedRemediationSkillId);
      activityComment.value = `Seance ciblee de remediation sur ${skill?.title || "la competence selectionnee"}.`;
    }
  }

  enforcePermission("edit_evaluations", activityType, activityTitle, activityClass, activitySkill, activityDateStart, activityDateEnd, activityIndicators, activityComment, activityEditButton, activityDeleteButton);
  enforcePermission("edit_evaluations", indicatorBankDomain, indicatorBankSelect, indicatorBankLoadButton, indicatorBankSaveButton, activityDuplicateButton);

  activityForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!canEditEvaluations) return;
    const selectedSkillIds = getSelectedValues(activitySkill);
    const indicators = activityIndicators.value.split("\n").map((line) => line.trim()).filter(Boolean).map((label, index) => ({ id: slugify(`${activityTitle.value}-${index}-${Date.now()}`), label }));
    if (!activityTitle.value.trim() || !activityClass.value || !selectedSkillIds.length || !indicators.length) {
      activityFeedback.textContent = "Renseigne un titre, une classe, une compétence et au moins un indicateur.";
      return;
    }
    app.evaluationActivities.push({
      id: slugify(`${activityTitle.value}-${Date.now()}`),
      title: activityTitle.value.trim(),
      type: activityType.value,
      classId: activityClass.value,
      skillId: selectedSkillIds[0],
      skillIds: selectedSkillIds,
      date: activityDateStart.value,
      startDate: activityDateStart.value,
      endDate: activityDateEnd.value || activityDateStart.value,
      comment: activityComment?.value.trim() || "",
      indicators,
      evaluations: {}
    });
    logAction("Séance créée", activityTitle.value.trim(), `${activityType.value} // ${getClassById(activityClass.value)?.name || ""}`);
    persistAppData();
    activityForm.reset();
    clearMultiSelect(activitySkill);
    populateIndicatorBankSelect(indicatorBankSelect);
    activityFeedback.textContent = "Séance créée.";
    sessionClassSelect.value = activityClass.value;
    syncSessionActivities();
    renderEvaluationPage();
  });

  sessionClassSelect.addEventListener("change", () => {
    syncSessionActivities();
    renderEvaluationPage();
  });
  activitySkill.addEventListener("change", () => {
    populateIndicatorBankSelect(indicatorBankSelect, getSelectedValues(activitySkill), indicatorBankDomain?.value || "all");
  });
  indicatorBankDomain?.addEventListener("change", () => {
    populateIndicatorBankSelect(indicatorBankSelect, getSelectedValues(activitySkill), indicatorBankDomain.value || "all");
  });
  activitySelect.addEventListener("change", renderEvaluationPage);
  activitySearchInput?.addEventListener("input", () => {
    syncSessionActivities();
    renderEvaluationPage();
  });
  evalClassSelect.addEventListener("change", () => {
    syncEvalStudents();
    renderEvaluationPage();
  });
  evalStudentSelect.addEventListener("change", renderEvaluationPage);

  activityEditButton?.addEventListener("click", () => {
    const activity = getActivityById(activitySelect.value);
    if (!activity || !canEditEvaluations) return;
    const title = window.prompt("Nouveau titre de la séance", activity.title);
    if (!title) return;
    const startDate = window.prompt("Nouvelle date de debut", activity.startDate || activity.date || "");
    const endDate = window.prompt("Nouvelle date de fin", activity.endDate || activity.startDate || activity.date || "");
    const skillsValue = window.prompt("CompÃ©tences (codes sÃ©parÃ©s par , ex: C4,C8)", getActivitySkills(activity).map((skill) => skill.code).join(", "));
    const indicators = window.prompt("Indicateurs (séparés par |)", activity.indicators.map((item) => item.label).join(" | "));
    const comment = window.prompt("Commentaire enseignant", activity.comment || "");
    if (!indicators) return;
    const skillIds = parseSkillCodesInput(skillsValue);
    if (!skillIds.length) return;
    activity.title = title.trim();
    activity.date = startDate.trim();
    activity.startDate = startDate.trim();
    activity.endDate = (endDate || startDate || "").trim();
    activity.skillIds = skillIds;
    activity.skillId = skillIds[0];
    activity.comment = (comment || "").trim();
    activity.indicators = indicators.split("|").map((item, index) => ({ id: activity.indicators[index]?.id || slugify(`${title}-${index}-${Date.now()}`), label: item.trim() })).filter((item) => item.label);
    logAction("Séance modifiée", activity.title, activity.type);
    persistAppData();
    syncSessionActivities(activity.id);
    renderEvaluationPage();
  });

  activityDuplicateButton?.addEventListener("click", () => {
    const activity = getActivityById(activitySelect.value);
    if (!activity || !canEditEvaluations) return;
    const duplicate = hydrateEvaluationActivity({
      ...activity,
      id: slugify(`${activity.title}-copie-${Date.now()}`),
      title: `${activity.title} (copie)`,
      evaluations: {},
      indicators: activity.indicators.map((indicator, index) => ({
        id: slugify(`${activity.title}-copie-${index}-${Date.now()}`),
        label: indicator.label
      }))
    }, app.evaluationActivities.length);
    app.evaluationActivities.push(duplicate);
    logAction("SÃ©ance dupliquÃ©e", duplicate.title, `${duplicate.type} // ${getClassById(duplicate.classId)?.name || duplicate.classId}`);
    persistAppData();
    sessionClassSelect.value = duplicate.classId;
    syncSessionActivities(duplicate.id);
    renderEvaluationPage();
  });

  activityDeleteButton?.addEventListener("click", () => {
    const activity = getActivityById(activitySelect.value);
    if (!activity || !canEditEvaluations) return;
    if (!window.confirm(`Supprimer la séance "${activity.title}" ?`)) return;
    app.evaluationActivities = app.evaluationActivities.filter((item) => item.id !== activity.id);
    logAction("Séance supprimée", activity.title, activity.type);
    persistAppData();
    syncSessionActivities();
    renderEvaluationPage();
  });

  indicatorBankLoadButton?.addEventListener("click", () => {
    const bank = getIndicatorBankItem(indicatorBankSelect?.value);
    if (!bank) {
      activityFeedback.textContent = "Choisis une banque d'indicateurs.";
      return;
    }
    activityIndicators.value = bank.indicators.join("\n");
    activityFeedback.textContent = `Banque chargÃ©e : ${bank.name}.`;
  });

  indicatorBankSaveButton?.addEventListener("click", () => {
    if (!canEditEvaluations) return;
    const indicators = activityIndicators.value.split("\n").map((line) => line.trim()).filter(Boolean);
    if (!indicators.length) {
      activityFeedback.textContent = "Saisis d'abord des indicateurs Ã  enregistrer.";
      return;
    }
    const name = window.prompt("Nom de la banque d'indicateurs", activityTitle.value.trim() || "Nouvelle banque");
    if (!name) return;
    const selectedSkillIds = getSelectedValues(activitySkill);
    const domains = [...new Set(selectedSkillIds.map((skillId) => getSkillDomain(getSkillById(skillId) || {})).filter(Boolean))];
    app.indicatorBank.push({
      id: slugify(`indicator-bank-${name}-${Date.now()}`),
      name: name.trim(),
      domain: domains.length === 1 ? domains[0] : "",
      indicators
    });
    logAction("Banque d'indicateurs crÃ©Ã©e", name.trim(), domains.join(" // ") || "Multi-domaines");
    persistAppData();
    populateIndicatorBankSelect(indicatorBankSelect, selectedSkillIds, indicatorBankDomain?.value || "all");
    indicatorBankSelect.value = app.indicatorBank[app.indicatorBank.length - 1].id;
    activityFeedback.textContent = "Banque d'indicateurs enregistrÃ©e.";
  });

  activityExportPdfButton?.addEventListener("click", () => {
    const classId = sessionClassSelect.value || app.classes[0]?.id || "";
    const activity = getActivityById(activitySelect.value) || getActivitiesByClass(classId)[0];
    if (!activity) return;
    printHtmlDocument(
      `${activity.type} - ${activity.title}`,
      buildActivityPdfHtml(activity, classId)
    );
  });

  activitySynthesisPdfButton?.addEventListener("click", () => {
    const classId = sessionClassSelect.value || app.classes[0]?.id || "";
    const classItem = getClassById(classId);
    if (!classItem) return;
    printHtmlDocument(
      `Synthese ${classItem.name}`,
      buildActivitySynthesisPdfHtml(classId)
    );
  });

  renderEvaluationPage();

  function syncSessionActivities(selectedId = "") {
    const classId = sessionClassSelect.value || app.classes[0]?.id || "";
    const search = activitySearchInput?.value.trim().toLowerCase() || "";
    const activities = getActivitiesByClass(classId).filter((activity) => {
      if (!search) return true;
      return `${activity.title} ${activity.type} ${formatActivityDateRange(activity)} ${getActivitySkillLabel(activity)} ${(activity.comment || "")}`.toLowerCase().includes(search);
    });
    activitySelect.innerHTML = activities.map((activity) => `<option value="${activity.id}">${activity.type} // ${activity.title}</option>`).join("");
    if (selectedId && activities.some((activity) => activity.id === selectedId)) activitySelect.value = selectedId;
  }

  function syncEvalStudents() {
    const classId = evalClassSelect.value || app.classes[0]?.id || "";
    const students = getStudentsByClass(classId);
    evalStudentSelect.innerHTML = students.map((student) => `<option value="${student.id}">${student.name}</option>`).join("");
  }

  function renderEvaluationPage() {
    const classId = sessionClassSelect.value || app.classes[0]?.id || "";
    const activities = getActivitiesByClass(classId);
    const activity = getActivityById(activitySelect.value) || activities[0];
    renderActivitySummary(activity, classId);
    renderActivityMatrix(activity, classId);
    renderActivityReport(activity, classId);
    renderActivitySynthesis(classId);
    renderStudentSheet();
  }

  function renderActivitySummary(activity, classId) {
    const classItem = getClassById(classId);
    if (!activity) {
      activitySummary.innerHTML = `<article class="summary-card"><h3>Aucune séance</h3><p class="muted-copy">Crée un TP ou un TD pour commencer.</p></article>`;
      return;
    }
    activitySummary.innerHTML = `
      <article class="summary-card">
        <h3>${activity.type} // ${activity.title}</h3>
        <p class="muted-copy">${classItem?.name || ""} // ${getActivitySkillLabel(activity)}</p>
        <p class="muted-copy">${formatActivityDateRange(activity)} // ${activity.indicators.length} indicateur(s)</p>
      </article>
    `;
  }

  function renderActivityMatrix(activity, classId) {
    const students = getStudentsByClass(classId);
    if (!activity) {
      activityMatrix.innerHTML = "";
      return;
    }
    activityMatrix.classList.add("activity-grid");
    activityMatrix.innerHTML = `
      <div class="matrix-header activity-header">
        <strong>Élève</strong>
        ${activity.indicators.map((indicator) => `<strong>${indicator.label}</strong>`).join("")}
      </div>
      ${students.map((student) => `
        <div class="matrix-row activity-row">
          <div><strong>${student.name}</strong><p class="muted-copy">${getStudentProgress(student)}% validé</p></div>
          ${activity.indicators.map((indicator) => `
            <label class="field">
              <select data-activity-id="${activity.id}" data-student-id="${student.id}" data-indicator-id="${indicator.id}" class="activity-status-select"${canEditEvaluations ? "" : " disabled"}>
                ${renderStatusOptions(getActivityIndicatorStatus(activity, student.id, indicator.id))}
              </select>
            </label>
          `).join("")}
        </div>
      `).join("")}
    `;
    activityMatrix.querySelectorAll(".activity-status-select").forEach((select) => {
      select.addEventListener("change", (event) => {
        if (!canEditEvaluations) return;
        const target = event.target;
        setActivityIndicatorStatus(target.dataset.activityId, target.dataset.studentId, target.dataset.indicatorId, target.value);
        persistAppData();
        renderEvaluationPage();
      });
    });
  }

  function renderActivityReport(activity, classId) {
    const students = getStudentsByClass(classId);
    if (!activity) {
      activityReport.innerHTML = "";
      return;
    }
    const indicatorCards = activity.indicators.map((indicator) => `
      <article class="summary-card">
        <h3>${indicator.label}</h3>
        <p class="muted-copy">Moyenne: ${getIndicatorAverage(activity, students, indicator.id)}%</p>
        <p class="muted-copy">${renderIndicatorStatusBreakdown(activity, students, indicator.id)}</p>
      </article>
    `).join("");
    activityReport.innerHTML = `
      <article class="summary-card">
        <h3>Bilan global</h3>
        <p class="muted-copy">Moyenne de la séance: ${getActivityAverage(activity, students)}%</p>
        <p class="muted-copy">${students.length} élève(s) évalué(s)</p>
      </article>
      ${indicatorCards}
    `;
  }

  function renderActivitySynthesis(classId) {
    const activities = getActivitiesByClass(classId);
    const students = getStudentsByClass(classId);
    activitySynthesis.innerHTML = activities.length ? activities.map((activity) => {
      const skill = getSkillById(activity.skillId);
      return `
        <article class="directory-row compact">
          <div>
            <strong>${activity.type} // ${activity.title}</strong>
            <p>${getActivitySkillLabel(activity)}</p>
            <p>${formatActivityDateRange(activity)}</p>
          </div>
          <div class="student-badges">
            <span class="badge">${activity.indicators.length} indicateurs</span>
            <span class="badge">${getActivityAverage(activity, students)}% moyen</span>
          </div>
        </article>
      `;
    }).join("") : `<article class="summary-card"><h3>Aucune synthèse</h3><p class="muted-copy">Aucun TP/TD enregistré pour cette classe.</p></article>`;
  }

  function renderStudentSheet() {
    const student = getStudentById(evalStudentSelect.value) || getStudentsByClass(evalClassSelect.value)[0];
    if (!student) {
      studentSkillsEditor.innerHTML = "";
      studentSheetMeta.textContent = "Aucun élève disponible";
      return;
    }
    studentSheetMeta.textContent = `${getClassById(student.classId)?.name || ""} // ${getStudentProgress(student)}% validé`;
    studentSkillsEditor.innerHTML = "";
    skillCatalog.forEach((skill) => {
      const fragment = skillRowTemplate.content.cloneNode(true);
      fragment.querySelector(".skill-code").textContent = skill.code;
      fragment.querySelector(".skill-domain").textContent = getSkillDomain(skill);
      fragment.querySelector(".skill-title").textContent = skill.title;
      fragment.querySelector(".skill-description").textContent = skill.description;
      const select = fragment.querySelector(".skill-select");
      select.value = student.skills[skill.id];
      select.disabled = !canEditSkills;
      select.addEventListener("change", (event) => {
        if (!canEditSkills) return;
        student.skills[skill.id] = event.target.value;
        logAction("Compétence modifiée", student.name, `${skill.code} // ${levelLabels[event.target.value]}`);
        persistAppData();
        renderEvaluationPage();
      });
      studentSkillsEditor.appendChild(fragment);
    });
  }

  function applyEvaluationsView(view) {
    const viewConfig = {
      create: {
        title: "Creation de seance",
        showCreation: true,
        showSelection: false,
        showMatrix: false,
        showReport: false,
        showSynthesis: false,
        showStudentSkills: false
      },
      session: {
        title: "Evaluation seance",
        showCreation: false,
        showSelection: true,
        showMatrix: true,
        showReport: true,
        showSynthesis: true,
        showStudentSkills: false
      },
      skills: {
        title: "Competences eleves",
        showCreation: false,
        showSelection: false,
        showMatrix: false,
        showReport: false,
        showSynthesis: false,
        showStudentSkills: true
      }
    }[view] || null;

    if (!viewConfig) return;
    if (pageTitle) pageTitle.textContent = viewConfig.title;
    if (creationPanel) creationPanel.style.display = viewConfig.showCreation ? "" : "none";
    if (selectionPanel) selectionPanel.style.display = viewConfig.showSelection ? "" : "none";
    if (matrixPanel) matrixPanel.style.display = viewConfig.showMatrix ? "" : "none";
    if (reportPanel) reportPanel.style.display = viewConfig.showReport ? "" : "none";
    if (synthesisPanel) synthesisPanel.style.display = viewConfig.showSynthesis ? "" : "none";
    if (studentSkillsPanel) studentSkillsPanel.style.display = viewConfig.showStudentSkills ? "" : "none";
  }

  function applyLessonTemplate(templateId) {
    if (!templateId) return;
    const template = app.lessonLibrary?.find((item) => item.id === templateId);
    if (!template) return;
    activityType.value = "TP";
    activityTitle.value = template.title;
    if (requestedClassId) activityClass.value = requestedClassId;
    if (!activityDateStart.value) activityDateStart.value = "";
    if (!activityDateEnd.value) activityDateEnd.value = activityDateStart.value;
    activityComment.value = template.notes || "";
    activityIndicators.value = (template.indicators || []).join("\n");
    setMultiSelectValues(activitySkill, template.skillIds);
    populateIndicatorBankSelect(indicatorBankSelect, template.skillIds, indicatorBankDomain?.value || "all");
    activityFeedback.textContent = "Modele de seance charge dans le formulaire.";
  }
}

function initPfmpPageFinal() {
  bindProtectedChrome();
  const classSelect = document.querySelector("#pfmp-class-select");
  const studentSelect = document.querySelector("#pfmp-student-select");
  const periodSelect = document.querySelector("#pfmp-period-select");
  const summaryCards = document.querySelector("#pfmp-summary-cards");
  const periodsOverview = document.querySelector("#pfmp-periods-overview");
  const directory = document.querySelector("#pfmp-directory");
  const exportPfmpButton = document.querySelector("#export-pfmp-button");
  const form = document.querySelector("#pfmp-form");
  const scopePanel = form?.closest(".evaluation-layout")?.querySelector(".panel");
  let searchInput = document.querySelector("#pfmp-search-input");
  let statusFilter = document.querySelector("#pfmp-status-filter");
  let pdfToolbar = document.querySelector("#pfmp-pdf-toolbar");
  const observedSkillsSelect = document.querySelector("#pfmp-observed-skills");
  const canEditPfmp = hasPermission("edit_pfmp");
  const inputs = {
    companyName: document.querySelector("#pfmp-company"),
    comment: document.querySelector("#pfmp-comment"),
    address: document.querySelector("#pfmp-address"),
    tutorName: document.querySelector("#pfmp-tutor"),
    tutorEmail: document.querySelector("#pfmp-email"),
    tutorPhone: document.querySelector("#pfmp-phone"),
    conventionSent: document.querySelector("#pfmp-sent"),
    conventionSignedCompany: document.querySelector("#pfmp-signed-company"),
    conventionSignedParents: document.querySelector("#pfmp-signed-parents"),
    conventionSignedSchool: document.querySelector("#pfmp-signed-school"),
    teacher: document.querySelector("#pfmp-teacher"),
    visitDate: document.querySelector("#pfmp-visit"),
    reportDate: document.querySelector("#pfmp-report"),
    bookletDate: document.querySelector("#pfmp-booklet"),
    attendanceDate: document.querySelector("#pfmp-attendance")
  };

  if (scopePanel && !searchInput) {
    const stack = scopePanel.querySelector(".stack-form");
    const extra = document.createElement("div");
    extra.className = "mini-grid";
    extra.innerHTML = `
      <label class="field">
        <span>Recherche élève / entreprise</span>
        <input id="pfmp-search-input" type="text" placeholder="Nom, entreprise, tuteur...">
      </label>
      <label class="field">
        <span>Filtre dossier</span>
        <select id="pfmp-status-filter">
          <option value="all">Tous</option>
          <option value="missing-company">Sans entreprise</option>
          <option value="incomplete-convention">Convention incomplète</option>
          <option value="visit-missing">Visite à planifier</option>
          <option value="complete-file">Dossier complet</option>
        </select>
      </label>
    `;
    stack.appendChild(extra);
    searchInput = extra.querySelector("#pfmp-search-input");
    statusFilter = extra.querySelector("#pfmp-status-filter");
  }

  if (summaryCards && !pdfToolbar) {
    pdfToolbar = document.createElement("div");
    pdfToolbar.id = "pfmp-pdf-toolbar";
    pdfToolbar.className = "student-badges";
    pdfToolbar.innerHTML = `
      <button id="export-pfmp-pdf-student" class="ghost-button" type="button">Exporter PDF élève</button>
      <button id="export-pfmp-pdf-class" class="ghost-button" type="button">Exporter PDF classe</button>
    `;
    exportPfmpButton.insertAdjacentElement("afterend", pdfToolbar);
  }

  const exportPfmpPdfStudentButton = document.querySelector("#export-pfmp-pdf-student");
  const exportPfmpPdfClassButton = document.querySelector("#export-pfmp-pdf-class");

  populateClassSelect(classSelect);
  populateSkillMultiSelect(observedSkillsSelect);
  const requestedClassId = getRequestedClassId();
  if (requestedClassId) classSelect.value = requestedClassId;
  periodSelect.innerHTML = PFMP_PERIODS.map((period) => `<option value="${period.id}">${period.label}</option>`).join("");
  syncStudents();
  renderPfmpPage();

  enforcePermission("edit_pfmp", ...Object.values(inputs), observedSkillsSelect, form.querySelector('button[type="submit"]'));

  classSelect.addEventListener("change", () => {
    syncStudents();
    renderPfmpPage();
  });
  studentSelect.addEventListener("change", renderPfmpPage);
  periodSelect.addEventListener("change", renderPfmpPage);
  searchInput?.addEventListener("input", renderPfmpPage);
  statusFilter?.addEventListener("change", renderPfmpPage);
  exportPfmpButton.addEventListener("click", () => {
    const classItem = getClassById(classSelect.value || app.classes[0]?.id || "");
    exportPfmpWorkbookEnhanced(classItem, getStudentsByClass(classItem?.id || ""));
  });
  exportPfmpPdfStudentButton?.addEventListener("click", () => {
    const student = getStudentById(studentSelect.value);
    if (!student) return;
    printHtmlDocument(`PFMP ${student.name}`, buildPfmpStudentPdfHtml(student));
  });
  exportPfmpPdfClassButton?.addEventListener("click", () => {
    const classId = classSelect.value || app.classes[0]?.id || "";
    const classItem = getClassById(classId);
    if (!classItem) return;
    printHtmlDocument(`PFMP ${classItem.name}`, buildPfmpClassPdfHtml(classId));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!canEditPfmp) return;
    const student = getStudentById(studentSelect.value);
    if (!student) return;
    const record = getPfmpRecord(student.id);
    record.periods[periodSelect.value] = hydratePfmpEntry({
      ...Object.fromEntries(Object.entries(inputs).map(([key, input]) => [key, input.value.trim()])),
      observedSkillIds: getSelectedValues(observedSkillsSelect)
    });
    logAction("PFMP mise à jour", student.name, PFMP_PERIODS.find((period) => period.id === periodSelect.value)?.label || periodSelect.value);
    persistAppData();
    renderPfmpPage();
  });

  function syncStudents() {
    const classId = classSelect.value || app.classes[0]?.id || "";
    const search = searchInput?.value.trim().toLowerCase() || "";
    const students = getStudentsByClass(classId).filter((student) => {
      if (!search) return true;
      const entriesText = PFMP_PERIODS.map((period) => {
        const entry = getPfmpPeriodEntry(student.id, period.id);
        return `${entry.companyName} ${entry.tutorName} ${entry.teacher}`;
      }).join(" ");
      return `${student.name} ${entriesText}`.toLowerCase().includes(search);
    });
    studentSelect.innerHTML = students.map((student) => `<option value="${student.id}">${student.name}</option>`).join("");
  }

  function renderPfmpPage() {
    const classId = classSelect.value || app.classes[0]?.id || "";
    const students = getStudentsByClass(classId);
    const selectedStudent = getStudentById(studentSelect.value) || students[0];
    const summary = getPfmpSummary(students);

    summaryCards.innerHTML = [
      { label: "PFMP renseignées", value: summary.withCompany, trace: "entreprise saisie" },
      { label: "Conventions complètes", value: summary.fullConvention, trace: "3 signatures" },
      { label: "Visites planifiées", value: summary.visitPlanned, trace: "date de visite saisie" },
      { label: "Dossiers complets", value: summary.completeFile, trace: "rapport + livret + présence" }
    ].map(renderStatCard).join("");

    const selectedRecord = selectedStudent ? getPfmpPeriodEntry(selectedStudent.id, periodSelect.value) : createEmptyPfmpEntry();
    Object.entries(inputs).forEach(([key, input]) => { input.value = selectedRecord[key] || ""; });
    setMultiSelectValues(observedSkillsSelect, selectedRecord.observedSkillIds || []);

    periodsOverview.innerHTML = PFMP_PERIODS.map((period) => {
      const entry = selectedStudent ? getPfmpPeriodEntry(selectedStudent.id, period.id) : createEmptyPfmpEntry();
      return `
        <article class="period-card">
          <strong>${period.label}</strong>
          <p class="muted-copy">${entry.companyName || "Entreprise non renseignée"}</p>
          <div class="pfmp-kpis">
            <span class="badge">${getPfmpCompletion(entry)} champs</span>
            <span class="badge">${(entry.observedSkillIds || []).length} comp. observees</span>
            <span class="badge">${entry.visitDate ? "Visite OK" : "Visite à planifier"}</span>
          </div>
        </article>
      `;
    }).join("");

    const search = searchInput?.value.trim().toLowerCase() || "";
    const filter = statusFilter?.value || "all";
    directory.innerHTML = students.filter((student) => {
      const text = `${student.name} ${PFMP_PERIODS.map((period) => {
        const entry = getPfmpPeriodEntry(student.id, period.id);
        return `${entry.companyName} ${entry.tutorName} ${entry.teacher}`;
      }).join(" ")}`.toLowerCase();
      if (search && !text.includes(search)) return false;
      if (filter === "all") return true;
      if (filter === "missing-company") return PFMP_PERIODS.some((period) => !getPfmpPeriodEntry(student.id, period.id).companyName);
      if (filter === "incomplete-convention") return PFMP_PERIODS.some((period) => {
        const entry = getPfmpPeriodEntry(student.id, period.id);
        return entry.companyName && !hasFullConvention(entry);
      });
      if (filter === "visit-missing") return PFMP_PERIODS.some((period) => {
        const entry = getPfmpPeriodEntry(student.id, period.id);
        return entry.companyName && !entry.visitDate;
      });
      if (filter === "complete-file") return PFMP_PERIODS.some((period) => hasCompleteFile(getPfmpPeriodEntry(student.id, period.id)));
      return true;
    }).map((student) => {
      const filledPeriods = PFMP_PERIODS.filter((period) => getPfmpPeriodEntry(student.id, period.id).companyName).length;
      return `
        <article class="directory-row compact">
          <div>
            <strong>${student.name}</strong>
            <p>${PFMP_PERIODS.reduce((sum, period) => sum + (getPfmpPeriodEntry(student.id, period.id).observedSkillIds || []).length, 0)} competences observees</p>
            <p>${filledPeriods}/6 PFMP renseignées</p>
            <p>${PFMP_PERIODS.filter((period) => getPfmpPeriodEntry(student.id, period.id).visitDate).length} visites planifiées</p>
          </div>
          <div class="pfmp-kpis">
            <span class="badge">${filledPeriods}/6 périodes</span>
            <span class="badge">${PFMP_PERIODS.filter((period) => hasFullConvention(getPfmpPeriodEntry(student.id, period.id))).length}/6 conventions</span>
            <span class="badge">${PFMP_PERIODS.filter((period) => hasCompleteFile(getPfmpPeriodEntry(student.id, period.id))).length}/6 dossiers</span>
          </div>
        </article>
      `;
    }).join("") || `<article class="summary-card"><h3>Aucun résultat</h3><p class="muted-copy">Aucun élève ne correspond à cette recherche ou à ce filtre.</p></article>`;
  }
}

function initClassesPage() {
  bindProtectedChrome();
  const classForm = document.querySelector("#class-form");
  const classNameInput = document.querySelector("#class-name-input");
  const classYearInput = document.querySelector("#class-year-input");
  const classNoteInput = document.querySelector("#class-note-input");
  const studentForm = document.querySelector("#student-form");
  const studentNameInput = document.querySelector("#student-name-input");
  const studentClassInput = document.querySelector("#student-class-input");
  const importClassInput = document.querySelector("#import-class-input");
  const csvInput = document.querySelector("#student-csv-input");
  const importButton = document.querySelector("#import-csv-button");
  const importFeedback = document.querySelector("#import-feedback");
  const classFilter = document.querySelector("#class-filter");
  const classCards = document.querySelector("#class-cards");
  const studentDirectory = document.querySelector("#student-directory");
  const canManageStudents = hasPermission("manage_students");

  classForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!canManageStudents) return;
    const name = classNameInput.value.trim();
    const year = classYearInput.value.trim();
    const note = classNoteInput.value.trim();
    if (!name || !year || !note) return;
    app.classes.push({ id: slugify(`${name}-${Date.now()}`), name, year, note });
    logAction("Classe créée", name, `${year} // ${note}`);
    persistAppData();
    classForm.reset();
    renderClassesPage();
  });

  studentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!canManageStudents) return;
    const name = studentNameInput.value.trim();
    const classId = studentClassInput.value;
    if (!name || !classId) return;
    const id = slugify(`${name}-${Date.now()}`);
    app.students.push({ id, name, classId, skills: buildSkillState({}) });
    app.pfmpRecords[id] = hydratePfmpRecord({}, { id, classId }, app.classes);
    logAction("Élève ajouté", name, getClassById(classId)?.name || classId);
    persistAppData();
    studentForm.reset();
    renderClassesPage();
  });

  importButton.addEventListener("click", async () => {
    if (!canManageStudents) return;
    const file = csvInput.files?.[0];
    const classId = importClassInput.value;
    if (!file || !classId) {
      importFeedback.textContent = "Sélectionne un fichier CSV et une classe cible.";
      return;
    }
    const text = await file.text();
    const rows = parseCsv(text);
    const names = extractStudentNames(rows);
    if (!names.length) {
      importFeedback.textContent = "Aucun nom d'élève détecté dans le CSV.";
      return;
    }
    const existing = new Set(getStudentsByClass(classId).map((student) => student.name.trim().toLowerCase()));
    let imported = 0;
    let skipped = 0;
    names.forEach((name) => {
      const key = name.trim().toLowerCase();
      if (!key || existing.has(key)) {
        skipped += 1;
        return;
      }
      const id = slugify(`${name}-${Date.now()}-${imported}`);
      app.students.push({ id, name, classId, skills: buildSkillState({}) });
      app.pfmpRecords[id] = hydratePfmpRecord({}, { id, classId }, app.classes);
      existing.add(key);
      imported += 1;
    });
    if (imported) logAction("Import CSV", getClassById(classId)?.name || classId, `${imported} élève(s) ajoutés`);
    persistAppData();
    importFeedback.textContent = `${imported} élève(s) importé(s), ${skipped} ignoré(s).`;
    csvInput.value = "";
    renderClassesPage();
  });

  enforcePermission("manage_students", classNameInput, classYearInput, classNoteInput, studentNameInput, studentClassInput, importClassInput, csvInput, importButton);

  classFilter.addEventListener("change", renderClassesPage);
  renderClassesPage();

  function renderClassesPage() {
    populateClassSelect(studentClassInput);
    populateClassSelect(importClassInput);
    populateClassFilter(classFilter);
    const activeClassId = classFilter.value || "all";
    const visibleClasses = activeClassId === "all" ? app.classes : app.classes.filter((classItem) => classItem.id === activeClassId);

    classCards.innerHTML = visibleClasses.map((classItem) => {
      const students = getStudentsByClass(classItem.id);
      const pfmpSummary = getPfmpSummary(students);
      return `
        <article class="class-card">
          <div class="class-card-head">
            <h3>${classItem.name}</h3>
            <span class="badge accent">${students.length} élèves</span>
          </div>
          <p>${classItem.year}</p>
          <p>${classItem.note}</p>
          <div class="class-meta">
            <span class="badge">${getClassProgress(classItem.id)}% validé</span>
            <span class="badge">${pfmpSummary.withCompany} PFMP saisies</span>
          </div>
          <div class="student-badges">
            <button class="ghost-button class-edit" type="button" data-id="${classItem.id}"${canManageStudents ? "" : " disabled"}>Modifier</button>
            <button class="ghost-button class-delete" type="button" data-id="${classItem.id}"${canManageStudents ? "" : " disabled"}>Supprimer</button>
          </div>
        </article>
      `;
    }).join("");

    const directoryStudents = activeClassId === "all" ? app.students : getStudentsByClass(activeClassId);
    studentDirectory.innerHTML = directoryStudents.map((student) => {
      const filledPeriods = PFMP_PERIODS.filter((period) => getPfmpPeriodEntry(student.id, period.id).companyName).length;
      return `
        <article class="directory-row compact">
          <div class="directory-main">
            <div class="directory-head">
              <strong>${student.name}</strong>
              <div class="student-badges">
                <button class="ghost-button student-edit" type="button" data-id="${student.id}"${canManageStudents ? "" : " disabled"}>Modifier</button>
                <button class="ghost-button student-delete" type="button" data-id="${student.id}"${canManageStudents ? "" : " disabled"}>Supprimer</button>
              </div>
            </div>
            <p>${getClassById(student.classId)?.name || "Sans classe"}</p>
            <p>${filledPeriods}/6 PFMP renseignées</p>
          </div>
          <div class="student-badges">
            <span class="badge">${getStudentProgress(student)}% validé</span>
            <span class="badge">${filledPeriods}/6 périodes</span>
          </div>
        </article>
      `;
    }).join("");

    classCards.querySelectorAll(".class-edit").forEach((button) => {
      button.addEventListener("click", () => {
        const classItem = getClassById(button.dataset.id);
        if (!classItem || !canManageStudents) return;
        const name = window.prompt("Nouveau nom de la classe", classItem.name);
        if (!name) return;
        const year = window.prompt("Nouvelle année", classItem.year);
        if (!year) return;
        const note = window.prompt("Nouvelle référence", classItem.note);
        if (!note) return;
        classItem.name = name.trim();
        classItem.year = year.trim();
        classItem.note = note.trim();
        logAction("Classe modifiée", classItem.name, `${classItem.year} // ${classItem.note}`);
        persistAppData();
        renderClassesPage();
      });
    });

    classCards.querySelectorAll(".class-delete").forEach((button) => {
      button.addEventListener("click", () => {
        if (!canManageStudents) return;
        const classItem = getClassById(button.dataset.id);
        if (!classItem) return;
        if (!window.confirm(`Supprimer la classe "${classItem.name}" et tous ses élèves ?`)) return;
        deleteClass(button.dataset.id);
        renderClassesPage();
      });
    });

    studentDirectory.querySelectorAll(".student-edit").forEach((button) => {
      button.addEventListener("click", () => {
        const student = getStudentById(button.dataset.id);
        if (!student || !canManageStudents) return;
        const name = window.prompt("Nouveau nom de l'élève", student.name);
        if (!name) return;
        const classId = window.prompt("Nouvelle classe (id)", student.classId);
        if (!classId || !getClassById(classId.trim())) return;
        student.name = name.trim();
        student.classId = classId.trim();
        app.pfmpRecords[student.id] = hydratePfmpRecord(app.pfmpRecords[student.id] || {}, student, app.classes);
        logAction("Élève modifié", student.name, getClassById(student.classId)?.name || student.classId);
        persistAppData();
        renderClassesPage();
      });
    });

    studentDirectory.querySelectorAll(".student-delete").forEach((button) => {
      button.addEventListener("click", () => {
        if (!canManageStudents) return;
        const student = getStudentById(button.dataset.id);
        if (!student) return;
        if (!window.confirm(`Supprimer l'élève "${student.name}" ?`)) return;
        deleteStudent(button.dataset.id);
        renderClassesPage();
      });
    });
  }
}

function initLoginPage() {
  const form = document.querySelector("#login-form");
  const usernameInput = document.querySelector("#login-username");
  const passwordInput = document.querySelector("#login-password");
  const feedback = document.querySelector("#login-feedback");

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
        setSession(payload.session);
        if (payload.data) replaceAppState(payload.data);
        window.location.href = "dashboard.html";
        return;
      }
    } catch {
      // Fall through to local rescue mode below.
    }

    const localData = loadLocalFallbackData();
    replaceAppState(localData);
    const fallbackUser = localData.accounts.find((account) => String(account.username || "").toLowerCase() === username);
    if (fallbackUser && fallbackUser.password === password) {
      setSession({ username: fallbackUser.username, role: fallbackUser.role, label: fallbackUser.label });
      replaceAppState(loadLocalFallbackData());
      window.location.href = "dashboard.html";
      return;
    }
    if (username === "admin" && password === "admin123") {
      setSession({ username: "admin", role: "admin", label: "Administrateur" });
      replaceAppState(loadLocalFallbackData());
      window.location.href = "dashboard.html";
      return;
    }
    feedback.textContent = "Identifiants invalides ou backend indisponible.";
  });
}

function initAccountsPage() {
  bindProtectedChrome();
  const adminForm = document.querySelector("#admin-account-form");
  const teacherForm = document.querySelector("#teacher-account-form");
  const adminUsername = document.querySelector("#admin-username");
  const adminPassword = document.querySelector("#admin-password");
  const teacherUsername = document.querySelector("#teacher-username");
  const teacherPassword = document.querySelector("#teacher-password");
  const teacherRole = document.querySelector("#teacher-role");
  const feedback = document.querySelector("#accounts-feedback");
  const accountsSummary = document.querySelector("#accounts-summary");
  const teacherAccountsList = document.querySelector("#teacher-accounts-list");
  const activityLogList = document.querySelector("#activity-log-list");
  const exportJsonButton = document.querySelector("#export-json-button");
  const restoreJsonInput = document.querySelector("#restore-json-input");
  const restoreJsonButton = document.querySelector("#restore-json-button");
  const restoreFeedback = document.querySelector("#restore-feedback");

  teacherRole.innerHTML = roleCatalog
    .filter((role) => role.value !== "admin")
    .map((role) => `<option value="${role.value}">${role.label}</option>`)
    .join("");
  teacherRole.value = "professeur";

  const adminAccount = getAccountByRole("admin");
  adminUsername.value = adminAccount.username;
  adminPassword.value = adminAccount.password;

  exportJsonButton?.addEventListener("click", () => {
    const payload = JSON.stringify(app, null, 2);
    downloadTextFile(`ciel-backup-${new Date().toISOString().slice(0, 10)}.json`, payload, "application/json");
    logAction("Export JSON", "Sauvegarde", "Base téléchargée localement");
    persistAppData();
    restoreFeedback.textContent = "Sauvegarde JSON téléchargée.";
  });

  restoreJsonButton?.addEventListener("click", async () => {
    const file = restoreJsonInput?.files?.[0];
    if (!file) {
      restoreFeedback.textContent = "Sélectionne d'abord un fichier JSON.";
      return;
    }
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      replaceAppState(data);
      logAction("Restauration JSON", "Base", file.name);
      await persistCriticalAppData();
      restoreFeedback.textContent = "Base restaurée avec succès.";
      renderAdministration();
    } catch {
      restoreFeedback.textContent = "Le fichier JSON est invalide.";
    }
  });

  adminForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!adminUsername.value.trim() || !adminPassword.value.trim()) return;
    updateAccount(adminAccount.id, {
      username: adminUsername.value.trim(),
      password: adminPassword.value.trim(),
      previousUsername: adminAccount.username
    });
    logAction("Compte admin mis à jour", adminUsername.value.trim(), "Identifiant ou mot de passe modifié");
    await persistCriticalAppData();
    feedback.textContent = "Compte administrateur synchronisé.";
    renderAdministration();
  });

  teacherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!teacherUsername.value.trim() || !teacherPassword.value.trim()) return;
    const account = addTeacherAccount(teacherUsername.value.trim(), teacherPassword.value.trim(), teacherRole.value);
    logAction("Compte créé", account.username, `Rôle: ${getRoleLabel(account.role)}`);
    teacherForm.reset();
    teacherRole.value = "professeur";
    await persistCriticalAppData();
    feedback.textContent = "Compte ajouté et synchronisé.";
    renderAdministration();
  });

  renderAdministration();

  function renderAdministration() {
    const teachers = getTeacherAccounts();
    const countsByRole = roleCatalog
      .filter((role) => role.value !== "admin")
      .map((role) => ({
        label: role.label,
        count: teachers.filter((teacher) => teacher.role === role.value).length
      }));

    accountsSummary.innerHTML = `
      <article class="summary-card">
        <h3>Admin</h3>
        <p class="muted-copy">${adminAccount.username}</p>
      </article>
      <article class="summary-card">
        <h3>Comptes actifs</h3>
        <p class="muted-copy">${teachers.length} compte(s)</p>
      </article>
      ${countsByRole.map((item) => `
        <article class="summary-card">
          <h3>${item.label}</h3>
          <p class="muted-copy">${item.count} compte(s)</p>
        </article>
      `).join("")}
    `;

    teacherAccountsList.innerHTML = teachers.length ? teachers.map((teacher) => `
      <article class="directory-row compact">
        <div>
          <strong>${teacher.username}</strong>
          <p>${teacher.label}</p>
        </div>
        <div class="student-badges">
          <button class="ghost-button teacher-edit" type="button" data-id="${teacher.id}">Modifier</button>
          <button class="ghost-button teacher-delete" type="button" data-id="${teacher.id}">Supprimer</button>
        </div>
      </article>
    `).join("") : `<article class="summary-card"><h3>Aucun compte</h3><p class="muted-copy">Ajoute un compte enseignant avec le formulaire ci-dessus.</p></article>`;

    activityLogList.innerHTML = app.activityLog.length ? app.activityLog.slice(0, 30).map((entry) => `
      <article class="directory-row compact">
        <div>
          <strong>${entry.action}</strong>
          <p>${entry.actor} // ${formatRole(entry.role)} // ${formatLogTimestamp(entry.timestamp)}</p>
          <p>${entry.target}${entry.detail ? ` // ${entry.detail}` : ""}</p>
        </div>
      </article>
    `).join("") : `<article class="summary-card"><h3>Aucune activité</h3><p class="muted-copy">Le journal se remplira automatiquement dès les premières actions.</p></article>`;

    teacherAccountsList.querySelectorAll(".teacher-edit").forEach((button) => {
      button.addEventListener("click", async () => {
        const teacher = getAccountById(button.dataset.id);
        if (!teacher) return;
        const username = window.prompt("Nouvel identifiant du compte", teacher.username);
        if (!username) return;
        const password = window.prompt("Nouveau mot de passe du compte", teacher.password);
        if (!password) return;
        const role = window.prompt(`Nouveau rôle (${getTeacherRoleValues().join(", ")})`, teacher.role);
        if (!role || !getTeacherRoleValues().includes(role.trim())) return;
        updateAccount(teacher.id, {
          username: username.trim(),
          password: password.trim(),
          role: role.trim(),
          previousUsername: teacher.username
        });
        logAction("Compte modifié", username.trim(), `Rôle: ${getRoleLabel(role.trim())}`);
        await persistCriticalAppData();
        feedback.textContent = "Compte modifié et synchronisé.";
        renderAdministration();
      });
    });

    teacherAccountsList.querySelectorAll(".teacher-delete").forEach((button) => {
      button.addEventListener("click", async () => {
        const removed = getAccountById(button.dataset.id);
        removeTeacherAccount(button.dataset.id);
        if (removed) logAction("Compte supprimé", removed.username, removed.label);
        await persistCriticalAppData();
        feedback.textContent = "Compte supprimé et synchronisé.";
        renderAdministration();
      });
    });
  }
}

function bindProtectedChrome() {
  injectBrandLogo();
  const roleBadge = document.querySelector("#session-role");
  const logoutButton = document.querySelector("#logout-button");
  const navs = [...document.querySelectorAll(".nav-tabs")];
  const session = getSession();
  if (roleBadge && session) {
    roleBadge.textContent = session.label;
  }
  navs.forEach((nav) => {
    upsertNavLink(nav, "bulletin.html", "Bulletin", page === "bulletin");
    if (session?.role === "admin") {
      upsertNavLink(nav, "accounts.html", "Comptes", page === "accounts");
    }
  });
  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      try {
        await fetch("/api/logout", {
          method: "POST",
          credentials: "include"
        });
      } catch {}
      clearSession();
      window.location.href = "login.html";
    });
  }
}

function upsertNavLink(nav, href, label, active) {
  let link = nav.querySelector(`a[href="${href}"]`);
  if (!link) {
    link = document.createElement("a");
    link.href = href;
    link.textContent = label;
    link.className = `nav-tab${active ? " active" : ""}`;
    const roleBadge = nav.querySelector("#session-role");
    const logoutButton = nav.querySelector("#logout-button");
    nav.insertBefore(link, roleBadge || logoutButton || null);
  } else {
    link.className = `nav-tab${active ? " active" : ""}`;
  }
}

function initDashboardPage() {
  bindProtectedChrome();
  const statsGrid = document.querySelector("#stats-grid");
  const statusChart = document.querySelector("#status-chart");
  const blockChart = document.querySelector("#block-chart");
  const pfmpChart = document.querySelector("#pfmp-chart");
  const studentChart = document.querySelector("#student-chart");
  const catalogGrid = document.querySelector("#catalog-grid");
  const alertsGrid = document.querySelector("#alerts-grid");
  const resetButton = document.querySelector("#reset-data");
  const classSelect = document.querySelector("#dashboard-class-select");
  const classMeta = document.querySelector("#dashboard-class-meta");

  populateClassSelect(classSelect);
  enforcePermission("reset_app", resetButton);
  classSelect.addEventListener("change", renderDashboardPage);
  resetButton.addEventListener("click", () => {
    if (!hasPermission("reset_app")) return;
    const initial = hydrateAppData({ classes: defaultClasses, students: defaultStudents, pfmpRecords: defaultPfmpRecords, evaluationActivities: defaultEvaluationActivities, accounts: app.accounts, activityLog: [] });
    app.classes = initial.classes;
    app.students = initial.students;
    app.pfmpRecords = initial.pfmpRecords;
    app.evaluationActivities = initial.evaluationActivities;
    app.activityLog = initial.activityLog;
    logAction("Réinitialisation", "Application", "Jeu de données par défaut restauré");
    persistAppData();
    populateClassSelect(classSelect);
    renderDashboardPage();
  });

  renderDashboardPage();

  function renderDashboardPage() {
    const classId = classSelect.value || app.classes[0]?.id || "";
    const classItem = getClassById(classId);
    const students = getStudentsByClass(classId);
    const counts = getStatusCounts(students);
    const progressAverage = students.length ? Math.round(students.reduce((sum, student) => sum + getStudentProgress(student), 0) / students.length) : 0;
    const strongestBlock = [...getBlockAverages(students)].sort((a, b) => b.progress - a.progress)[0];
    const pfmpSummary = getPfmpSummary(students);
    const exportSkillsButton = document.querySelector("#export-skills-button");

    classMeta.textContent = classItem ? `${classItem.name} // ${classItem.year} // ${students.length} élèves` : "Aucune classe";
    statsGrid.innerHTML = [
      { label: "Élèves", value: students.length, trace: "effectif de la classe" },
      { label: "Progression moyenne", value: `${progressAverage}%`, trace: strongestBlock ? `bloc fort: ${strongestBlock.domain}` : "aucune donnée" },
      { label: "PFMP renseignées", value: pfmpSummary.withCompany, trace: "entreprise saisie" },
      { label: "Conventions complètes", value: pfmpSummary.fullConvention, trace: "entreprise + parents + lycée" }
    ].map(renderStatCard).join("");

    renderStatusChart(statusChart, counts);
    renderBlockChart(blockChart, getBlockAverages(students));
    renderPfmpChart(pfmpChart, pfmpSummary);
    renderStudentChart(studentChart, students);

    if (alertsGrid) {
      const alerts = getClassAlerts(classId);
      alertsGrid.innerHTML = alerts.length ? alerts.map((alert) => `
        <article class="summary-card alert-card ${alert.level}">
          <p class="alert-level">${alert.level}</p>
          <h3>${alert.title}</h3>
          <p class="muted-copy">${alert.detail}</p>
        </article>
      `).join("") : `<article class="summary-card"><h3>Aucune alerte</h3><p class="muted-copy">La classe n'a pas d'alerte prioritaire pour le moment.</p></article>`;
    }

    exportSkillsButton.onclick = () => exportSkillsWorkbook(classItem, students);

    catalogGrid.innerHTML = skillCatalog.map((skill) => `
      <article class="catalog-card">
        <div class="skill-headline">
          <span class="skill-code">${skill.code}</span>
          <span class="skill-domain">${getSkillDomain(skill)}</span>
        </div>
        <h3>${skill.title}</h3>
        <p>${skill.description}</p>
      </article>
    `).join("");
  }
}

function initAccountsPage() {
  bindProtectedChrome();
  const adminForm = document.querySelector("#admin-account-form");
  const teacherForm = document.querySelector("#teacher-account-form");
  const adminUsername = document.querySelector("#admin-username");
  const adminPassword = document.querySelector("#admin-password");
  const teacherUsername = document.querySelector("#teacher-username");
  const teacherPassword = document.querySelector("#teacher-password");
  const teacherRole = document.querySelector("#teacher-role");
  const feedback = document.querySelector("#accounts-feedback");
  const accountsSummary = document.querySelector("#accounts-summary");
  const teacherAccountsList = document.querySelector("#teacher-accounts-list");
  const activityLogList = document.querySelector("#activity-log-list");
  const exportJsonButton = document.querySelector("#export-json-button");
  const restoreJsonInput = document.querySelector("#restore-json-input");
  const restoreJsonButton = document.querySelector("#restore-json-button");
  const restoreFeedback = document.querySelector("#restore-feedback");

  teacherRole.innerHTML = roleCatalog
    .filter((role) => role.value !== "admin")
    .map((role) => `<option value="${role.value}">${role.label}</option>`)
    .join("");
  teacherRole.value = "professeur";

  const adminAccount = getAccountByRole("admin");
  adminUsername.value = adminAccount.username;
  adminPassword.value = adminAccount.password;

  exportJsonButton?.addEventListener("click", () => {
    const payload = JSON.stringify(app, null, 2);
    downloadTextFile(`ciel-backup-${new Date().toISOString().slice(0, 10)}.json`, payload, "application/json");
    logAction("Export JSON", "Sauvegarde", "Base téléchargée localement");
    persistAppData();
    restoreFeedback.textContent = "Sauvegarde JSON téléchargée.";
  });

  restoreJsonButton?.addEventListener("click", async () => {
    const file = restoreJsonInput?.files?.[0];
    if (!file) {
      restoreFeedback.textContent = "Sélectionne d'abord un fichier JSON.";
      return;
    }
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      replaceAppState(data);
      logAction("Restauration JSON", "Base", file.name);
      persistAppData();
      restoreFeedback.textContent = "Base restaurée avec succès.";
      renderAdministration();
    } catch {
      restoreFeedback.textContent = "Le fichier JSON est invalide.";
    }
  });

  adminForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!adminUsername.value.trim() || !adminPassword.value.trim()) return;
    updateAccount(adminAccount.id, {
      username: adminUsername.value.trim(),
      password: adminPassword.value.trim(),
      previousUsername: adminAccount.username
    });
    logAction("Compte admin mis à jour", adminUsername.value.trim(), "Identifiant ou mot de passe modifié");
    feedback.textContent = "Compte administrateur mis à jour.";
    renderAdministration();
  });

  teacherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!teacherUsername.value.trim() || !teacherPassword.value.trim()) return;
    const account = addTeacherAccount(teacherUsername.value.trim(), teacherPassword.value.trim(), teacherRole.value);
    logAction("Compte créé", account.username, `Rôle: ${getRoleLabel(account.role)}`);
    teacherForm.reset();
    teacherRole.value = "professeur";
    feedback.textContent = "Compte ajouté.";
    renderAdministration();
  });

  renderAdministration();

  function renderAdministration() {
    const teachers = getTeacherAccounts();
    const countsByRole = roleCatalog
      .filter((role) => role.value !== "admin")
      .map((role) => ({
        label: role.label,
        count: teachers.filter((teacher) => teacher.role === role.value).length
      }));

    accountsSummary.innerHTML = `
      <article class="summary-card">
        <h3>Admin</h3>
        <p class="muted-copy">${adminAccount.username}</p>
      </article>
      <article class="summary-card">
        <h3>Comptes actifs</h3>
        <p class="muted-copy">${teachers.length} compte(s)</p>
      </article>
      ${countsByRole.map((item) => `
        <article class="summary-card">
          <h3>${item.label}</h3>
          <p class="muted-copy">${item.count} compte(s)</p>
        </article>
      `).join("")}
    `;

    teacherAccountsList.innerHTML = teachers.length ? teachers.map((teacher) => `
      <article class="directory-row compact">
        <div>
          <strong>${teacher.username}</strong>
          <p>${teacher.label}</p>
        </div>
        <div class="student-badges">
          <button class="ghost-button teacher-edit" type="button" data-id="${teacher.id}">Modifier</button>
          <button class="ghost-button teacher-delete" type="button" data-id="${teacher.id}">Supprimer</button>
        </div>
      </article>
    `).join("") : `<article class="summary-card"><h3>Aucun compte</h3><p class="muted-copy">Ajoute un compte enseignant avec le formulaire ci-dessus.</p></article>`;

    activityLogList.innerHTML = app.activityLog.length ? app.activityLog.slice(0, 30).map((entry) => `
      <article class="directory-row compact">
        <div>
          <strong>${entry.action}</strong>
          <p>${entry.actor} // ${formatRole(entry.role)} // ${formatLogTimestamp(entry.timestamp)}</p>
          <p>${entry.target}${entry.detail ? ` // ${entry.detail}` : ""}</p>
        </div>
      </article>
    `).join("") : `<article class="summary-card"><h3>Aucune activité</h3><p class="muted-copy">Le journal se remplira automatiquement dès les premières actions.</p></article>`;

    teacherAccountsList.querySelectorAll(".teacher-edit").forEach((button) => {
      button.addEventListener("click", () => {
        const teacher = getAccountById(button.dataset.id);
        if (!teacher) return;
        const username = window.prompt("Nouvel identifiant du compte", teacher.username);
        if (!username) return;
        const password = window.prompt("Nouveau mot de passe du compte", teacher.password);
        if (!password) return;
        const role = window.prompt(`Nouveau rôle (${getTeacherRoleValues().join(", ")})`, teacher.role);
        if (!role || !getTeacherRoleValues().includes(role.trim())) return;
        updateAccount(teacher.id, {
          username: username.trim(),
          password: password.trim(),
          role: role.trim(),
          previousUsername: teacher.username
        });
        logAction("Compte modifié", username.trim(), `Rôle: ${getRoleLabel(role.trim())}`);
        feedback.textContent = "Compte modifié.";
        renderAdministration();
      });
    });

    teacherAccountsList.querySelectorAll(".teacher-delete").forEach((button) => {
      button.addEventListener("click", () => {
        const removed = getAccountById(button.dataset.id);
        removeTeacherAccount(button.dataset.id);
        if (removed) logAction("Compte supprimé", removed.username, removed.label);
        feedback.textContent = "Compte supprimé.";
        renderAdministration();
      });
    });
  }
}

function initBulletinPage() {
  bindProtectedChrome();
  const classSelect = document.querySelector("#bulletin-class-select");
  const studentSelect = document.querySelector("#bulletin-student-select");
  const meta = document.querySelector("#bulletin-meta");
  const sheet = document.querySelector("#bulletin-sheet");
  const printButton = document.querySelector("#print-bulletin-button");

  populateClassSelect(classSelect);
  syncStudents();
  renderBulletin();

  classSelect.addEventListener("change", () => {
    syncStudents();
    renderBulletin();
  });
  studentSelect.addEventListener("change", renderBulletin);
  printButton.addEventListener("click", () => window.print());

  function syncStudents() {
    const classId = classSelect.value || app.classes[0]?.id || "";
    const students = getStudentsByClass(classId);
    studentSelect.innerHTML = students.map((student) => `<option value="${student.id}">${student.name}</option>`).join("");
  }

  function renderBulletin() {
    const classId = classSelect.value || app.classes[0]?.id || "";
    const student = getStudentById(studentSelect.value) || getStudentsByClass(classId)[0];
    if (!student) {
      meta.textContent = "Aucun élève disponible";
      sheet.innerHTML = `<article class="summary-card"><h3>Aucun bulletin</h3><p class="muted-copy">Ajoute des élèves dans une classe pour générer un bulletin.</p></article>`;
      return;
    }

    const classItem = getClassById(student.classId);
    const studentActivities = app.evaluationActivities.filter((activity) => activity.classId === student.classId && activity.evaluations?.[student.id]);
    const pfmpSummary = getStudentPfmpSummary(student.id);
    const blockAverages = getBlockAverages([student]);
    meta.textContent = `${classItem?.name || ""} // ${getStudentProgress(student)}% validé`;

    sheet.innerHTML = `
      <div class="bulletin-header">
        <div>
          <p class="eyebrow">Bulletin</p>
          <h2 class="bulletin-title">${student.name}</h2>
          <p class="muted-copy">${classItem?.name || ""} // ${classItem?.year || ""}</p>
        </div>
        <div class="print-only">
          <p>${new Date().toLocaleDateString("fr-FR")}</p>
        </div>
      </div>

      <div class="bulletin-kpis">
        ${renderStatCard({ label: "Progression", value: `${getStudentProgress(student)}%`, trace: "sur l'ensemble du référentiel" })}
        ${renderStatCard({ label: "TP/TD saisis", value: studentActivities.length, trace: "activités avec notes" })}
        ${renderStatCard({ label: "PFMP remplies", value: `${pfmpSummary.filled}/6`, trace: "périodes avec entreprise" })}
      </div>

      <div class="bulletin-grid">
        <section class="summary-card">
          <h3>Compétences</h3>
          <div class="bulletin-skills">
            ${skillCatalog.map((skill) => `
              <div class="bulletin-skill-row">
                <div>
                  <strong>${skill.code} // ${skill.title}</strong>
                  <p class="muted-copy">${getSkillDomain(skill)}</p>
                </div>
                ${renderBulletinStatus(student.skills[skill.id])}
              </div>
            `).join("")}
          </div>
        </section>

        <section class="summary-card">
          <h3>Synthèse par bloc</h3>
          <div class="bulletin-pfmp">
            ${blockAverages.map((block) => `
              <article class="period-card">
                <strong>${block.domain}</strong>
                <p class="muted-copy">${block.validated}/${block.total} compétences consolidées</p>
                <div class="pfmp-kpis">
                  <span class="badge">${block.progress}%</span>
                </div>
              </article>
            `).join("")}
          </div>
        </section>
      </div>

      <div class="bulletin-grid">
        <section class="summary-card">
          <h3>Historique TP / TD</h3>
          <div class="bulletin-activities">
            ${studentActivities.length ? studentActivities.map((activity) => `
              <article class="period-card">
                <strong>${activity.type} // ${activity.title}</strong>
                <p class="muted-copy">${activity.date || "Date non renseignée"}</p>
                <p class="muted-copy">${getSkillById(activity.skillId)?.code || ""} ${getSkillById(activity.skillId)?.title || ""}</p>
                <div class="pfmp-kpis">
                  <span class="badge">${getStudentActivityAverage(activity, student.id)}%</span>
                  <span class="badge">${Object.keys(activity.evaluations?.[student.id] || {}).length} indicateurs</span>
                </div>
              </article>
            `).join("") : `<article class="period-card"><strong>Aucune activité</strong><p class="muted-copy">Aucun TP/TD saisi pour cet élève.</p></article>`}
          </div>
        </section>

        <section class="summary-card">
          <h3>État PFMP</h3>
          <div class="bulletin-pfmp">
            ${PFMP_PERIODS.map((period) => {
              const entry = getPfmpPeriodEntry(student.id, period.id);
              return `
                <article class="period-card">
                  <strong>${period.label}</strong>
                  <p class="muted-copy">${entry.companyName || "Entreprise non renseignée"}</p>
                  <div class="pfmp-kpis">
                    <span class="badge">${getPfmpCompletion(entry)} champs</span>
                    <span class="badge">${entry.visitDate ? "Visite OK" : "Visite à planifier"}</span>
                  </div>
                </article>
              `;
            }).join("")}
          </div>
        </section>
      </div>
    `;
  }
}

function getClassAlerts(classId, teacher = "all") {
  const students = getStudentsByClass(classId).filter((student) => teacher === "all" || studentMatchesTeacher(student, teacher));
  const activities = getActivitiesByClass(classId).filter((activity) => teacher === "all" || activityTouchesTeacher(activity, teacher));
  const alerts = [];
  const lowProgress = students.filter((student) => getStudentProgress(student) < 35);
  const noPfmp = students.filter((student) => PFMP_PERIODS.every((period) => !getPfmpPeriodEntry(student.id, period.id).companyName));
  const incompletePfmp = students.filter((student) => PFMP_PERIODS.some((period) => {
    const entry = getPfmpPeriodEntry(student.id, period.id);
    return entry.companyName && (!hasFullConvention(entry) || !hasCompleteFile(entry));
  }));
  const unevaluatedSkills = skillCatalog.filter((skill) => students.some((student) => student.skills[skill.id] === "non_evalue"));
  const activitiesWithoutMarks = activities.filter((activity) => !Object.keys(activity.evaluations || {}).length);

  if (lowProgress.length) {
    alerts.push({ level: "critical", title: "Élèves en forte difficulté", detail: `${lowProgress.length} élève(s) ont une progression sous 35%.` });
  }
  if (noPfmp.length) {
    alerts.push({ level: "warning", title: "PFMP non renseignées", detail: `${noPfmp.length} élève(s) n'ont encore aucune entreprise saisie.` });
  }
  if (incompletePfmp.length) {
    alerts.push({ level: "warning", title: "Dossiers PFMP incomplets", detail: `${incompletePfmp.length} élève(s) ont une convention ou un dossier incomplet.` });
  }
  if (unevaluatedSkills.length) {
    alerts.push({ level: "info", title: "Compétences jamais consolidées", detail: `${unevaluatedSkills.length} compétence(s) contiennent encore du non évalué dans la classe.` });
  }
  if (activitiesWithoutMarks.length) {
    alerts.push({ level: "info", title: "Séances sans saisie", detail: `${activitiesWithoutMarks.length} TP/TD existent mais n'ont encore aucune évaluation.` });
  }
  return alerts;
}

function getPfmpRemediationItems(classId, teacher = "all") {
  return getStudentsByClass(classId)
    .filter((student) => teacher === "all" || studentMatchesTeacher(student, teacher))
    .flatMap((student) =>
      PFMP_PERIODS.flatMap((period) => {
        const entry = getPfmpPeriodEntry(student.id, period.id);
        const items = [];
        if (!entry.companyName) {
          items.push({
            level: "warning",
            category: "PFMP",
            title: `${student.name} // ${period.label}`,
            detail: "Entreprise non renseignée.",
            action: "Saisir une entreprise ou vérifier le placement."
          });
        }
        if (entry.companyName && !hasFullConvention(entry)) {
          items.push({
            level: "critical",
            category: "PFMP",
            title: `${student.name} // ${period.label}`,
            detail: "Convention incomplète.",
            action: "Compléter les signatures entreprise, parents et lycée."
          });
        }
        if (entry.companyName && !entry.visitDate) {
          items.push({
            level: "warning",
            category: "PFMP",
            title: `${student.name} // ${period.label}`,
            detail: "Visite PFMP non planifiée.",
            action: "Planifier la visite ou consigner un contact téléphonique."
          });
        }
        if (entry.companyName && !hasCompleteFile(entry)) {
          items.push({
            level: "info",
            category: "PFMP",
            title: `${student.name} // ${period.label}`,
            detail: "Dossier PFMP incomplet.",
            action: "Renseigner rapport, livret et fiche de présence."
          });
        }
        return items;
      })
    );
}

function getEvaluationRemediationItems(classId, teacher = "all") {
  const students = getStudentsByClass(classId).filter((student) => teacher === "all" || studentMatchesTeacher(student, teacher));
  const items = [];

  students
    .filter((student) => getStudentProgress(student) < 35)
    .forEach((student) => {
      items.push({
        level: "critical",
        category: "Evaluation",
        title: student.name,
        detail: `Progression sous 35% (${getStudentProgress(student)}%).`,
        action: "Prévoir une reprise ciblée, un TP d'appui ou une séance différenciée."
      });
    });

  getActivitiesByClass(classId)
    .filter((activity) => teacher === "all" || activityTouchesTeacher(activity, teacher))
    .forEach((activity) => {
      if (!Object.keys(activity.evaluations || {}).length) {
        items.push({
          level: "warning",
          category: "Evaluation",
          title: `${activity.type} // ${activity.title}`,
          detail: "Aucune évaluation saisie.",
          action: "Compléter la grille avant clôture de la séance."
        });
      }

      students.forEach((student) => {
        const missing = activity.indicators.filter((indicator) => getActivityIndicatorStatus(activity, student.id, indicator.id) === "non_evalue");
        if (missing.length) {
          items.push({
            level: "info",
            category: "Evaluation",
            title: `${student.name} // ${activity.title}`,
            detail: `${missing.length} indicateur(s) non évalué(s).`,
            action: "Finaliser la saisie ou justifier l'absence."
          });
        }
      });
    });

  skillCatalog.forEach((skill) => {
    const impacted = students.filter((student) => student.skills[skill.id] === "non_evalue");
    if (impacted.length) {
      items.push({
        level: "info",
        category: "Evaluation",
        title: `${skill.code} // ${skill.title}`,
        detail: `${impacted.length} élève(s) encore non évalué(s).`,
        action: "Prévoir une évaluation dédiée ou rattacher la compétence à un TP/TD."
      });
    }
  });

  return items;
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getTeacherFilterValues() {
  const accountNames = getTeacherAccounts().map((account) => account.username);
  const pfmpNames = app.students.flatMap((student) =>
    PFMP_PERIODS.map((period) => getPfmpPeriodEntry(student.id, period.id).teacher).filter(Boolean)
  );
  return ["all", ...new Set([...accountNames, ...pfmpNames].map((value) => value.trim()).filter(Boolean))];
}

function populateTeacherFilter(select) {
  if (!select) return;
  const currentValue = select.value || "all";
  const values = getTeacherFilterValues();
  select.innerHTML = values.map((value) => `
    <option value="${escapeHtml(value)}">${value === "all" ? "Tous les professeurs" : escapeHtml(value)}</option>
  `).join("");
  select.value = values.includes(currentValue) ? currentValue : "all";
}

function studentMatchesTeacher(student, teacher) {
  const target = normalizeText(teacher);
  if (!target || target === "all") return true;
  return PFMP_PERIODS.some((period) => normalizeText(getPfmpPeriodEntry(student.id, period.id).teacher) === target);
}

function activityTouchesTeacher(activity, teacher) {
  return getStudentsByClass(activity.classId).some((student) => studentMatchesTeacher(student, teacher));
}

function getDeadlinesForClass(classId, teacher = "all") {
  const notices = [];
  const students = getStudentsByClass(classId).filter((student) => teacher === "all" || studentMatchesTeacher(student, teacher));

  students.forEach((student) => {
    PFMP_PERIODS.forEach((period) => {
      const entry = getPfmpPeriodEntry(student.id, period.id);
      if (!entry.companyName) {
        notices.push({
          priority: 1,
          title: `${student.name} - ${period.label}`,
          meta: "Entreprise non renseignée."
        });
        return;
      }
      if (!hasFullConvention(entry)) {
        notices.push({
          priority: 2,
          title: `${student.name} - ${period.label}`,
          meta: "Convention incomplète."
        });
      }
      if (!entry.visitDate) {
        notices.push({
          priority: 3,
          title: `${student.name} - ${period.label}`,
          meta: "Visite PFMP à planifier."
        });
      }
      if (!hasCompleteFile(entry)) {
        notices.push({
          priority: 4,
          title: `${student.name} - ${period.label}`,
          meta: "Dossier PFMP à finaliser."
        });
      }
    });
  });

  const activities = getActivitiesByClass(classId).filter((activity) => teacher === "all" || activityTouchesTeacher(activity, teacher));
  activities.forEach((activity) => {
    const studentsInClass = getStudentsByClass(activity.classId).filter((student) => teacher === "all" || studentMatchesTeacher(student, teacher));
    const unevaluatedStudents = studentsInClass.filter((student) =>
      activity.indicators.some((indicator) => getActivityIndicatorStatus(activity, student.id, indicator.id) === "non_evalue")
    );
    if (unevaluatedStudents.length) {
      notices.push({
        priority: 5,
        title: `${activity.type} - ${activity.title}`,
        meta: `${unevaluatedStudents.length} élève(s) encore non évalué(s).`
      });
    }
  });

  return notices.sort((a, b) => a.priority - b.priority).slice(0, 12);
}

function populateSkillMultiSelect(select) {
  if (!select) return;
  select.innerHTML = skillCatalog.map((skill) => `<option value="${skill.id}">${skill.code} // ${skill.title}</option>`).join("");
}

function getSelectedValues(select) {
  return [...(select?.selectedOptions || [])].map((option) => option.value).filter(Boolean);
}

function clearMultiSelect(select) {
  [...(select?.options || [])].forEach((option) => {
    option.selected = false;
  });
}

function setMultiSelectValues(select, values) {
  const valueSet = new Set(values || []);
  [...(select?.options || [])].forEach((option) => {
    option.selected = valueSet.has(option.value);
  });
}

function populateIndicatorBankSelect(select, skillIds = [], domain = "all") {
  if (!select) return;
  const domains = [...new Set((skillIds || []).map((skillId) => getSkillDomain(getSkillById(skillId) || {})).filter(Boolean))];
  const banks = (app.indicatorBank || []).filter((item) => {
    const matchesSkills = !domains.length || !item.domain || domains.includes(item.domain);
    const matchesDomain = domain === "all" || !domain || item.domain === domain;
    return matchesSkills && matchesDomain;
  });
  select.innerHTML = `<option value="">Choisir une banque...</option>${banks.map((item) => `<option value="${item.id}">${item.name}${item.domain ? ` // ${item.domain}` : ""}</option>`).join("")}`;
}

function getIndicatorBankItem(bankId) {
  return app.indicatorBank?.find((item) => item.id === bankId);
}

function parseSkillCodesInput(value) {
  const codes = String(value || "")
    .split(",")
    .map((item) => normalizeText(item).toUpperCase())
    .filter(Boolean);
  return skillCatalog
    .filter((skill) => codes.includes(skill.code.toUpperCase()))
    .map((skill) => skill.id);
}

function parseSortableDate(value) {
  if (!value) return null;
  const direct = new Date(value);
  if (!Number.isNaN(direct.getTime())) return direct;
  const match = String(value).match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (!match) return null;
  return new Date(`${match[3]}-${match[2]}-${match[1]}`);
}

function formatAgendaDate(value) {
  const date = parseSortableDate(value);
  if (!date) return "À planifier";
  return date.toLocaleDateString("fr-FR");
}

function getAgendaEntries(classId, teacher = "all") {
  const entries = [];
  const students = getStudentsByClass(classId).filter((student) => teacher === "all" || studentMatchesTeacher(student, teacher));

  getActivitiesByClass(classId).forEach((activity) => {
    if (teacher !== "all" && !activityTouchesTeacher(activity, teacher)) return;
    const startDate = activity.startDate || activity.date;
    if (!startDate) return;
    entries.push({
      sortKey: parseSortableDate(startDate)?.getTime() || Number.MAX_SAFE_INTEGER,
      title: `${activity.type} - ${activity.title}`,
      meta: `${getActivitySkillLabel(activity)} // ${getClassById(classId)?.name || ""}`,
      kind: "Séance",
      when: formatActivityDateRange(activity),
      startDate,
      endDate: activity.endDate || startDate
    });
  });

  students.forEach((student) => {
    PFMP_PERIODS.forEach((period) => {
      const entry = getPfmpPeriodEntry(student.id, period.id);
      if (!entry.visitDate) return;
      entries.push({
        sortKey: parseSortableDate(entry.visitDate)?.getTime() || Number.MAX_SAFE_INTEGER,
        title: `${student.name} - ${period.label}`,
        meta: `${entry.companyName || "Entreprise non renseignée"} // ${entry.teacher || "Professeur non renseigné"}`,
        kind: "Visite PFMP",
        when: formatAgendaDate(entry.visitDate)
      });
    });
  });

  return entries.sort((a, b) => a.sortKey - b.sortKey).slice(0, 12);
}

function addAttendanceEntry(studentId, status, date, reason = "") {
  const student = getStudentById(studentId);
  if (!student) return;
  if (!Array.isArray(student.attendance)) student.attendance = [];
  student.attendance.unshift({
    id: slugify(`attendance-${studentId}-${status}-${date}-${Date.now()}`),
    status,
    date,
    reason: reason.trim(),
    createdAt: new Date().toISOString()
  });
  student.attendance = hydrateAttendanceEntries(student.attendance).slice(0, 100);
}

function addStudentNote(studentId, content) {
  const student = getStudentById(studentId);
  if (!student || !content.trim()) return;
  if (!Array.isArray(student.notes)) student.notes = [];
  student.notes.unshift({
    id: slugify(`note-${studentId}-${Date.now()}`),
    date: new Date().toISOString(),
    content: content.trim(),
    author: getSession()?.username || "admin"
  });
  student.notes = hydrateStudentNotes(student.notes).slice(0, 100);
}

function getAttendanceStats(student) {
  const entries = student?.attendance || [];
  return {
    absent: entries.filter((entry) => entry.status === "absent").length,
    retard: entries.filter((entry) => entry.status === "retard").length,
    present: entries.filter((entry) => entry.status === "present").length
  };
}

function getMonthCalendarData(classId, teacher = "all") {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const totalCells = Math.ceil((startOffset + lastDay.getDate()) / 7) * 7;
  const agendaItems = getAgendaEntries(classId, teacher);
  const eventsByDay = new Map();

  agendaItems.forEach((item) => {
    getDateRangeValues(item.startDate || item.when, item.endDate || item.startDate || item.when).forEach((value) => {
      const parsed = parseSortableDate(value);
      if (!parsed || parsed.getMonth() !== month || parsed.getFullYear() !== year) return;
      const key = parsed.toISOString().slice(0, 10);
      if (!eventsByDay.has(key)) eventsByDay.set(key, []);
      eventsByDay.get(key).push(item);
    });
  });

  const days = [];
  for (let index = 0; index < totalCells; index += 1) {
    const dayNumber = index - startOffset + 1;
    if (dayNumber < 1 || dayNumber > lastDay.getDate()) {
      days.push(null);
      continue;
    }
    const date = new Date(year, month, dayNumber);
    const key = date.toISOString().slice(0, 10);
    days.push({
      key,
      dayNumber,
      isToday: key === new Date().toISOString().slice(0, 10),
      events: eventsByDay.get(key) || []
    });
  }

  return {
    label: now.toLocaleDateString("fr-FR", { month: "long", year: "numeric" }),
    weekdays: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    days
  };
}

function buildPrintShell(title, subtitle, bodyHtml) {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>${escapeHtml(title)}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 24px; color: #111; }
        h1 { margin: 0 0 6px; font-size: 24px; }
        h2 { margin: 24px 0 10px; font-size: 18px; }
        p { margin: 4px 0; line-height: 1.4; }
        table { width: 100%; border-collapse: collapse; margin-top: 12px; }
        th, td { border: 1px solid #cfd6e4; padding: 8px; text-align: left; vertical-align: top; font-size: 12px; }
        th { background: #edf2ff; }
        .meta { color: #4b5563; margin-bottom: 16px; }
        .chip { display: inline-block; padding: 4px 8px; margin: 0 8px 8px 0; border-radius: 999px; background: #edf2ff; font-size: 12px; }
        .card { border: 1px solid #d8e0ef; border-radius: 10px; padding: 12px; margin-bottom: 12px; }
        .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
        @media print { body { margin: 12mm; } }
      </style>
    </head>
    <body>
      <h1>${escapeHtml(title)}</h1>
      <p class="meta">${escapeHtml(subtitle)}</p>
      ${bodyHtml}
    </body>
    </html>
  `;
}

function printHtmlDocument(title, html) {
  const printWindow = window.open("", "_blank", "width=1200,height=900");
  if (!printWindow) return false;
  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  const triggerPrint = () => {
    try {
      printWindow.focus();
      printWindow.print();
    } catch {}
  };
  if (printWindow.document.readyState === "complete") {
    setTimeout(triggerPrint, 350);
  } else {
    printWindow.addEventListener("load", () => setTimeout(triggerPrint, 350), { once: true });
    setTimeout(triggerPrint, 900);
  }
  return true;
}

function buildActivityPdfHtml(activity, classId) {
  const classItem = getClassById(classId);
  const skill = { code: getActivitySkills(activity).map((item) => item.code).join(", "), title: "" };
  const students = getStudentsByClass(classId);
  const summaryHtml = `
    <div class="card">
      <p><strong>Classe :</strong> ${escapeHtml(classItem?.name || "")}</p>
      <p><strong>Compétence :</strong> ${escapeHtml(`${skill?.code || ""} ${skill?.title || ""}`.trim())}</p>
      <p><strong>Date :</strong> ${escapeHtml(activity.date || "Non renseignée")}</p>
      <p><strong>Moyenne de séance :</strong> ${getActivityAverage(activity, students)}%</p>
    </div>
  `;
  const tableHtml = `
    <table>
      <thead>
        <tr>
          <th>Élève</th>
          ${activity.indicators.map((indicator) => `<th>${escapeHtml(indicator.label)}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${students.map((student) => `
          <tr>
            <td>${escapeHtml(student.name)}</td>
            ${activity.indicators.map((indicator) => `<td>${escapeHtml(levelLabels[getActivityIndicatorStatus(activity, student.id, indicator.id)] || "Non évalué")}</td>`).join("")}
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
  const indicatorsHtml = `
    <div class="grid">
      ${activity.indicators.map((indicator) => `
        <div class="card">
          <p><strong>${escapeHtml(indicator.label)}</strong></p>
          <p>Moyenne : ${getIndicatorAverage(activity, students, indicator.id)}%</p>
          <p>${escapeHtml(renderIndicatorStatusBreakdown(activity, students, indicator.id))}</p>
        </div>
      `).join("")}
    </div>
  `;
  return buildPrintShell(
    `${activity.type} - ${activity.title}`,
    `${classItem?.name || ""} - ${skill?.code || ""}`,
    `${summaryHtml}<h2>Grille de saisie</h2>${tableHtml}<h2>Bilan par indicateur</h2>${indicatorsHtml}`
  );
}

function buildActivitySynthesisPdfHtml(classId) {
  const classItem = getClassById(classId);
  const activities = getActivitiesByClass(classId);
  const students = getStudentsByClass(classId);
  const rows = activities.map((activity) => {
    const skill = { code: getActivitySkills(activity).map((item) => item.code).join(", ") };
    return `
      <tr>
        <td>${escapeHtml(activity.type)}</td>
        <td>${escapeHtml(activity.title)}</td>
        <td>${escapeHtml(skill?.code || "")}</td>
        <td>${escapeHtml(activity.date || "Non renseignée")}</td>
        <td>${activity.indicators.length}</td>
        <td>${getActivityAverage(activity, students)}%</td>
      </tr>
    `;
  }).join("");
  return buildPrintShell(
    `Synthèse des séances - ${classItem?.name || ""}`,
    `${activities.length} séance(s) enregistrée(s)`,
    `
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Séance</th>
            <th>Compétence</th>
            <th>Date</th>
            <th>Indicateurs</th>
            <th>Moyenne</th>
          </tr>
        </thead>
        <tbody>${rows || '<tr><td colspan="6">Aucune séance enregistrée.</td></tr>'}</tbody>
      </table>
    `
  );
}

function buildPfmpStudentPdfHtml(student) {
  const classItem = getClassById(student.classId);
  const periodsHtml = PFMP_PERIODS.map((period) => {
    const entry = getPfmpPeriodEntry(student.id, period.id);
    return `
      <div class="card">
        <h2>${escapeHtml(period.label)}</h2>
        <p><strong>Entreprise :</strong> ${escapeHtml(entry.companyName || "Non renseignée")}</p>
        <p><strong>Tuteur :</strong> ${escapeHtml(entry.tutorName || "-")}</p>
        <p><strong>Professeur référent :</strong> ${escapeHtml(entry.teacher || "-")}</p>
        <p><strong>Visite :</strong> ${escapeHtml(entry.visitDate || "À planifier")}</p>
        <p><strong>Convention :</strong> ${hasFullConvention(entry) ? "Complète" : "Incomplète"}</p>
        <p><strong>Dossier final :</strong> ${hasCompleteFile(entry) ? "Complet" : "Incomplet"}</p>
        <p><strong>Commentaire :</strong> ${escapeHtml(entry.comment || "-")}</p>
      </div>
    `;
  }).join("");
  return buildPrintShell(
    `Suivi PFMP - ${student.name}`,
    `${classItem?.name || ""}`,
    periodsHtml
  );
}

function buildPfmpClassPdfHtml(classId) {
  const classItem = getClassById(classId);
  const students = getStudentsByClass(classId);
  const rows = students.map((student) => {
    const filled = PFMP_PERIODS.filter((period) => getPfmpPeriodEntry(student.id, period.id).companyName).length;
    const conventions = PFMP_PERIODS.filter((period) => hasFullConvention(getPfmpPeriodEntry(student.id, period.id))).length;
    const visits = PFMP_PERIODS.filter((period) => getPfmpPeriodEntry(student.id, period.id).visitDate).length;
    const files = PFMP_PERIODS.filter((period) => hasCompleteFile(getPfmpPeriodEntry(student.id, period.id))).length;
    return `
      <tr>
        <td>${escapeHtml(student.name)}</td>
        <td>${filled}/6</td>
        <td>${conventions}/6</td>
        <td>${visits}/6</td>
        <td>${files}/6</td>
      </tr>
    `;
  }).join("");
  return buildPrintShell(
    `Synthèse PFMP - ${classItem?.name || ""}`,
    `${students.length} élève(s)`,
    `
      <table>
        <thead>
          <tr>
            <th>Élève</th>
            <th>Périodes renseignées</th>
            <th>Conventions complètes</th>
            <th>Visites planifiées</th>
            <th>Dossiers complets</th>
          </tr>
        </thead>
        <tbody>${rows || '<tr><td colspan="5">Aucun élève.</td></tr>'}</tbody>
      </table>
    `
  );
}

function renderBulletinStatus(status) {
  const colors = {
    absent: "#8a94a6",
    non_evalue: "#59c6ff",
    non_acquis: "#ff657d",
    en_cours_acquisition: "#ff8c42",
    partiellement_acquis: "#f7c35f",
    acquis: "#63f597"
  };
  const color = colors[status] || "#8a94a6";
  return `<span class="bulletin-pill" style="background:${color};color:${status === "non_evalue" ? "#ffffff" : "#06111b"};">${levelLabels[status] || status}</span>`;
}

function getStudentPfmpSummary(studentId) {
  return {
    filled: PFMP_PERIODS.filter((period) => getPfmpPeriodEntry(studentId, period.id).companyName).length
  };
}

function getStudentActivityAverage(activity, studentId) {
  const scores = Object.values(activity.evaluations?.[studentId] || {}).map((status) => levelScores[status] || 0);
  if (!scores.length) return 0;
  return Math.round((scores.reduce((sum, score) => sum + score, 0) / (scores.length * (levelScores.acquis || 1))) * 100);
}

function downloadTextFile(filename, content, type = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function initDashboardPage() {
  bindProtectedChrome();
  const statsGrid = document.querySelector("#stats-grid");
  const statusChart = document.querySelector("#status-chart");
  const blockChart = document.querySelector("#block-chart");
  const pfmpChart = document.querySelector("#pfmp-chart");
  const studentChart = document.querySelector("#student-chart");
  const catalogGrid = document.querySelector("#catalog-grid");
  const alertsGrid = document.querySelector("#alerts-grid");
  const alertFilter = document.querySelector("#alert-filter");
  const resetButton = document.querySelector("#reset-data");
  const classSelect = document.querySelector("#dashboard-class-select");
  const classMeta = document.querySelector("#dashboard-class-meta");

  populateClassSelect(classSelect);
  enforcePermission("reset_app", resetButton);
  classSelect.addEventListener("change", renderDashboardPage);
  alertFilter?.addEventListener("change", renderDashboardPage);
  resetButton.addEventListener("click", () => {
    if (!hasPermission("reset_app")) return;
    const initial = hydrateAppData({ classes: defaultClasses, students: defaultStudents, pfmpRecords: defaultPfmpRecords, evaluationActivities: defaultEvaluationActivities, accounts: app.accounts, activityLog: [] });
    app.classes = initial.classes;
    app.students = initial.students;
    app.pfmpRecords = initial.pfmpRecords;
    app.evaluationActivities = initial.evaluationActivities;
    app.activityLog = initial.activityLog;
    logAction("Réinitialisation", "Application", "Jeu de données par défaut restauré");
    persistAppData();
    populateClassSelect(classSelect);
    renderDashboardPage();
  });

  renderDashboardPage();

  function renderDashboardPage() {
    const classId = classSelect.value || app.classes[0]?.id || "";
    const classItem = getClassById(classId);
    const students = getStudentsByClass(classId);
    const counts = getStatusCounts(students);
    const progressAverage = students.length ? Math.round(students.reduce((sum, student) => sum + getStudentProgress(student), 0) / students.length) : 0;
    const strongestBlock = [...getBlockAverages(students)].sort((a, b) => b.progress - a.progress)[0];
    const pfmpSummary = getPfmpSummary(students);
    const exportSkillsButton = document.querySelector("#export-skills-button");

    classMeta.textContent = classItem ? `${classItem.name} // ${classItem.year} // ${students.length} élèves` : "Aucune classe";
    statsGrid.innerHTML = [
      { label: "Élèves", value: students.length, trace: "effectif de la classe" },
      { label: "Progression moyenne", value: `${progressAverage}%`, trace: strongestBlock ? `bloc fort: ${strongestBlock.domain}` : "aucune donnée" },
      { label: "PFMP renseignées", value: pfmpSummary.withCompany, trace: "entreprise saisie" },
      { label: "Conventions complètes", value: pfmpSummary.fullConvention, trace: "entreprise + parents + lycée" }
    ].map(renderStatCard).join("");

    renderStatusChart(statusChart, counts);
    renderBlockChart(blockChart, getBlockAverages(students));
    renderPfmpChart(pfmpChart, pfmpSummary);
    renderStudentChart(studentChart, students);

    if (alertsGrid) {
      const alerts = getClassAlerts(classId)
        .filter((alert) => !alertFilter || alertFilter.value === "all" || alert.level === alertFilter.value);
      alertsGrid.innerHTML = alerts.length ? alerts.map((alert) => `
        <article class="summary-card alert-card ${alert.level}">
          <p class="alert-level">${alert.level}</p>
          <h3>${alert.title}</h3>
          <p class="muted-copy">${alert.detail}</p>
        </article>
      `).join("") : `<article class="summary-card"><h3>Aucune alerte</h3><p class="muted-copy">Aucune alerte pour ce filtre sur la classe sélectionnée.</p></article>`;
    }

    exportSkillsButton.onclick = () => exportSkillsWorkbook(classItem, students);
    catalogGrid.innerHTML = skillCatalog.map((skill) => `
      <article class="catalog-card">
        <div class="skill-headline">
          <span class="skill-code">${skill.code}</span>
          <span class="skill-domain">${getSkillDomain(skill)}</span>
        </div>
        <h3>${skill.title}</h3>
        <p>${skill.description}</p>
      </article>
    `).join("");
  }
}

function initClassesPage() {
  bindProtectedChrome();
  const classForm = document.querySelector("#class-form");
  const classNameInput = document.querySelector("#class-name-input");
  const classYearInput = document.querySelector("#class-year-input");
  const classNoteInput = document.querySelector("#class-note-input");
  const studentForm = document.querySelector("#student-form");
  const studentNameInput = document.querySelector("#student-name-input");
  const studentClassInput = document.querySelector("#student-class-input");
  const importClassInput = document.querySelector("#import-class-input");
  const csvInput = document.querySelector("#student-csv-input");
  const importButton = document.querySelector("#import-csv-button");
  const importFeedback = document.querySelector("#import-feedback");
  const classFilter = document.querySelector("#class-filter");
  const classCards = document.querySelector("#class-cards");
  const studentDirectory = document.querySelector("#student-directory");
  const canManageStudents = hasPermission("manage_students");

  classForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!canManageStudents) return;
    const name = classNameInput.value.trim();
    const year = classYearInput.value.trim();
    const note = classNoteInput.value.trim();
    if (!name || !year || !note) return;
    app.classes.push({ id: slugify(`${name}-${Date.now()}`), name, year, note });
    logAction("Classe créée", name, `${year} // ${note}`);
    persistAppData();
    classForm.reset();
    renderClassesPage();
  });

  studentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!canManageStudents) return;
    const name = studentNameInput.value.trim();
    const classId = studentClassInput.value;
    if (!name || !classId) return;
    const id = slugify(`${name}-${Date.now()}`);
    app.students.push({ id, name, classId, skills: buildSkillState({}) });
    app.pfmpRecords[id] = hydratePfmpRecord({}, { id, classId }, app.classes);
    logAction("Élève ajouté", name, getClassById(classId)?.name || classId);
    persistAppData();
    studentForm.reset();
    renderClassesPage();
  });

  importButton.addEventListener("click", async () => {
    if (!canManageStudents) return;
    const file = csvInput.files?.[0];
    const classId = importClassInput.value;
    if (!file || !classId) {
      importFeedback.textContent = "Sélectionne un fichier CSV et une classe cible.";
      return;
    }
    const text = await file.text();
    const rows = parseCsv(text);
    const names = extractStudentNames(rows);
    if (!names.length) {
      importFeedback.textContent = "Aucun nom d'élève détecté dans le CSV.";
      return;
    }
    const existing = new Set(getStudentsByClass(classId).map((student) => student.name.trim().toLowerCase()));
    let imported = 0;
    let skipped = 0;
    names.forEach((name) => {
      const key = name.trim().toLowerCase();
      if (!key || existing.has(key)) {
        skipped += 1;
        return;
      }
      const id = slugify(`${name}-${Date.now()}-${imported}`);
      app.students.push({ id, name, classId, skills: buildSkillState({}) });
      app.pfmpRecords[id] = hydratePfmpRecord({}, { id, classId }, app.classes);
      existing.add(key);
      imported += 1;
    });
    if (imported) logAction("Import CSV", getClassById(classId)?.name || classId, `${imported} élève(s) ajoutés`);
    persistAppData();
    importFeedback.textContent = `${imported} élève(s) importé(s), ${skipped} ignoré(s).`;
    csvInput.value = "";
    renderClassesPage();
  });

  enforcePermission("manage_students", classNameInput, classYearInput, classNoteInput, studentNameInput, studentClassInput, importClassInput, csvInput, importButton);

  classFilter.addEventListener("change", renderClassesPage);
  renderClassesPage();

  function renderClassesPage() {
    populateClassSelect(studentClassInput);
    populateClassSelect(importClassInput);
    populateClassFilter(classFilter);
    const activeClassId = classFilter.value || "all";
    const visibleClasses = activeClassId === "all" ? app.classes : app.classes.filter((classItem) => classItem.id === activeClassId);

    classCards.innerHTML = visibleClasses.map((classItem) => {
      const students = getStudentsByClass(classItem.id);
      const pfmpSummary = getPfmpSummary(students);
      return `
        <article class="class-card">
          <div class="class-card-head">
            <h3>${classItem.name}</h3>
            <span class="badge accent">${students.length} élèves</span>
          </div>
          <p>${classItem.year}</p>
          <p>${classItem.note}</p>
          <div class="class-meta">
            <span class="badge">${getClassProgress(classItem.id)}% validé</span>
            <span class="badge">${pfmpSummary.withCompany} PFMP saisies</span>
          </div>
          <div class="student-badges">
            <button class="ghost-button class-edit" type="button" data-id="${classItem.id}"${canManageStudents ? "" : " disabled"}>Modifier</button>
            <button class="ghost-button class-delete" type="button" data-id="${classItem.id}"${canManageStudents ? "" : " disabled"}>Supprimer</button>
          </div>
        </article>
      `;
    }).join("");

    const directoryStudents = activeClassId === "all" ? app.students : getStudentsByClass(activeClassId);
    studentDirectory.innerHTML = directoryStudents.map((student) => {
      const filledPeriods = PFMP_PERIODS.filter((period) => getPfmpPeriodEntry(student.id, period.id).companyName).length;
      return `
        <article class="directory-row compact">
          <div>
            <strong>${student.name}</strong>
            <p>${getClassById(student.classId)?.name || "Sans classe"}</p>
            <p>${filledPeriods}/6 PFMP renseignées</p>
          </div>
          <div class="student-badges">
            <span class="badge">${getStudentProgress(student)}% validé</span>
            <span class="badge">${filledPeriods}/6 périodes</span>
            <button class="ghost-button student-edit" type="button" data-id="${student.id}"${canManageStudents ? "" : " disabled"}>Modifier</button>
            <button class="ghost-button student-delete" type="button" data-id="${student.id}"${canManageStudents ? "" : " disabled"}>Supprimer</button>
          </div>
        </article>
      `;
    }).join("");

    classCards.querySelectorAll(".class-edit").forEach((button) => {
      button.addEventListener("click", () => {
        const classItem = getClassById(button.dataset.id);
        if (!classItem || !canManageStudents) return;
        const name = window.prompt("Nouveau nom de la classe", classItem.name);
        if (!name) return;
        const year = window.prompt("Nouvelle année", classItem.year);
        if (!year) return;
        const note = window.prompt("Nouvelle référence", classItem.note);
        if (!note) return;
        classItem.name = name.trim();
        classItem.year = year.trim();
        classItem.note = note.trim();
        logAction("Classe modifiée", classItem.name, `${classItem.year} // ${classItem.note}`);
        persistAppData();
        renderClassesPage();
      });
    });

    classCards.querySelectorAll(".class-delete").forEach((button) => {
      button.addEventListener("click", () => {
        if (!canManageStudents) return;
        deleteClass(button.dataset.id);
        renderClassesPage();
      });
    });

    studentDirectory.querySelectorAll(".student-edit").forEach((button) => {
      button.addEventListener("click", () => {
        const student = getStudentById(button.dataset.id);
        if (!student || !canManageStudents) return;
        const name = window.prompt("Nouveau nom de l'élève", student.name);
        if (!name) return;
        const classId = window.prompt("Nouvelle classe (id)", student.classId);
        if (!classId || !getClassById(classId.trim())) return;
        student.name = name.trim();
        student.classId = classId.trim();
        app.pfmpRecords[student.id] = hydratePfmpRecord(app.pfmpRecords[student.id] || {}, student, app.classes);
        logAction("Élève modifié", student.name, getClassById(student.classId)?.name || student.classId);
        persistAppData();
        renderClassesPage();
      });
    });

    studentDirectory.querySelectorAll(".student-delete").forEach((button) => {
      button.addEventListener("click", () => {
        if (!canManageStudents) return;
        deleteStudent(button.dataset.id);
        renderClassesPage();
      });
    });
  }
}

function initBulletinPage() {
  bindProtectedChrome();
  const classSelect = document.querySelector("#bulletin-class-select");
  const studentSelect = document.querySelector("#bulletin-student-select");
  const meta = document.querySelector("#bulletin-meta");
  const sheet = document.querySelector("#bulletin-sheet");
  const printButton = document.querySelector("#print-bulletin-button");
  const exportButton = document.querySelector("#export-bulletin-button");
  let annualExportButton = document.querySelector("#export-bulletin-annual");
  let cycleExportButton = document.querySelector("#export-bulletin-cycle");

  if (!annualExportButton && printButton?.parentElement) {
    annualExportButton = document.createElement("button");
    annualExportButton.id = "export-bulletin-annual";
    annualExportButton.className = "ghost-button";
    annualExportButton.type = "button";
    annualExportButton.textContent = "Exporter bilan annuel";
    printButton.parentElement.insertBefore(annualExportButton, printButton);
  }

  if (!cycleExportButton && printButton?.parentElement) {
    cycleExportButton = document.createElement("button");
    cycleExportButton.id = "export-bulletin-cycle";
    cycleExportButton.className = "ghost-button";
    cycleExportButton.type = "button";
    cycleExportButton.textContent = "Exporter synthese 3 ans";
    printButton.parentElement.insertBefore(cycleExportButton, printButton);
  }

  populateClassSelect(classSelect);
  const requestedClassId = getRequestedClassId();
  if (requestedClassId) classSelect.value = requestedClassId;
  syncStudents();
  renderBulletin();

  classSelect.addEventListener("change", () => {
    syncStudents();
    renderBulletin();
  });
  studentSelect.addEventListener("change", renderBulletin);
  printButton.addEventListener("click", () => window.print());
  exportButton?.addEventListener("click", exportBulletinPdf);
  annualExportButton?.addEventListener("click", exportAnnualWorkbook);
  cycleExportButton?.addEventListener("click", exportCycleWorkbook);

  function syncStudents() {
    const classId = classSelect.value || app.classes[0]?.id || "";
    const students = getStudentsByClass(classId);
    studentSelect.innerHTML = students.map((student) => `<option value="${student.id}">${student.name}</option>`).join("");
  }

  function renderBulletin() {
    const classId = classSelect.value || app.classes[0]?.id || "";
    const student = getStudentById(studentSelect.value) || getStudentsByClass(classId)[0];
    if (!student) {
      meta.textContent = "Aucun élève disponible";
      sheet.innerHTML = `<article class="summary-card"><h3>Aucun bulletin</h3><p class="muted-copy">Ajoute des élèves dans une classe pour générer un bulletin.</p></article>`;
      return;
    }

    const classItem = getClassById(student.classId);
    const studentActivities = app.evaluationActivities.filter((activity) => activity.classId === student.classId && activity.evaluations?.[student.id]);
    const pfmpSummary = getStudentPfmpSummary(student.id);
    const blockAverages = getBlockAverages([student]);
    meta.textContent = `${classItem?.name || ""} // ${getStudentProgress(student)}% validé`;

    sheet.innerHTML = buildBulletinMarkup(student, classItem, studentActivities, pfmpSummary, blockAverages);
  }

  function exportBulletinPdf() {
    const classId = classSelect.value || app.classes[0]?.id || "";
    const student = getStudentById(studentSelect.value) || getStudentsByClass(classId)[0];
    if (!student) return;
    const classItem = getClassById(student.classId);
    const studentActivities = app.evaluationActivities.filter((activity) => activity.classId === student.classId && activity.evaluations?.[student.id]);
    const pfmpSummary = getStudentPfmpSummary(student.id);
    const blockAverages = getBlockAverages([student]);
    const popup = window.open("", "_blank", "width=1100,height=900");
    if (!popup) return;
    popup.document.write(buildPrintableBulletinHTML(student, classItem, studentActivities, pfmpSummary, blockAverages));
    popup.document.close();
    popup.focus();
    popup.print();
  }

  function exportAnnualWorkbook() {
    const classId = classSelect.value || app.classes[0]?.id || "";
    const student = getStudentById(studentSelect.value) || getStudentsByClass(classId)[0];
    if (!student) return;
    exportStudentAnnualWorkbook(student);
  }

  function exportCycleWorkbook() {
    const classId = classSelect.value || app.classes[0]?.id || "";
    const student = getStudentById(studentSelect.value) || getStudentsByClass(classId)[0];
    if (!student) return;
    exportStudentCycleWorkbook(student);
  }
}

function buildBulletinMarkup(student, classItem, studentActivities, pfmpSummary, blockAverages) {
  return `
    <div class="bulletin-header">
      <div>
        <p class="eyebrow">Bulletin</p>
        <h2 class="bulletin-title">${student.name}</h2>
        <p class="muted-copy">${classItem?.name || ""} // ${classItem?.year || ""}</p>
      </div>
      <div class="print-only">
        <p>${new Date().toLocaleDateString("fr-FR")}</p>
      </div>
    </div>

    <div class="bulletin-kpis">
      ${renderStatCard({ label: "Progression", value: `${getStudentProgress(student)}%`, trace: "sur l'ensemble du référentiel" })}
      ${renderStatCard({ label: "TP/TD saisis", value: studentActivities.length, trace: "activités avec notes" })}
      ${renderStatCard({ label: "PFMP remplies", value: `${pfmpSummary.filled}/6`, trace: "périodes avec entreprise" })}
    </div>

    <div class="bulletin-grid">
      <section class="summary-card">
        <h3>Compétences</h3>
        <div class="bulletin-skills">
          ${skillCatalog.map((skill) => `
            <div class="bulletin-skill-row">
              <div>
                <strong>${skill.code} // ${skill.title}</strong>
                <p class="muted-copy">${getSkillDomain(skill)}</p>
              </div>
              ${renderBulletinStatus(student.skills[skill.id])}
            </div>
          `).join("")}
        </div>
      </section>

      <section class="summary-card">
        <h3>Synthèse par bloc</h3>
        <div class="bulletin-pfmp">
          ${blockAverages.map((block) => `
            <article class="period-card">
              <strong>${block.domain}</strong>
              <p class="muted-copy">${block.validated}/${block.total} compétences consolidées</p>
              <div class="pfmp-kpis">
                <span class="badge">${block.progress}%</span>
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    </div>

    <div class="bulletin-grid">
      <section class="summary-card">
        <h3>Historique TP / TD</h3>
        <div class="bulletin-activities">
          ${studentActivities.length ? studentActivities.map((activity) => `
            <article class="period-card">
              <strong>${activity.type} // ${activity.title}</strong>
              <p class="muted-copy">${activity.date || "Date non renseignée"}</p>
              <p class="muted-copy">${getSkillById(activity.skillId)?.code || ""} ${getSkillById(activity.skillId)?.title || ""}</p>
              <div class="pfmp-kpis">
                <span class="badge">${getStudentActivityAverage(activity, student.id)}%</span>
                <span class="badge">${Object.keys(activity.evaluations?.[student.id] || {}).length} indicateurs</span>
              </div>
            </article>
          `).join("") : `<article class="period-card"><strong>Aucune activité</strong><p class="muted-copy">Aucun TP/TD saisi pour cet élève.</p></article>`}
        </div>
      </section>

      <section class="summary-card">
        <h3>État PFMP</h3>
        <div class="bulletin-pfmp">
          ${PFMP_PERIODS.map((period) => {
            const entry = getPfmpPeriodEntry(student.id, period.id);
            return `
              <article class="period-card">
                <strong>${period.label}</strong>
                <p class="muted-copy">${entry.companyName || "Entreprise non renseignée"}</p>
                <div class="pfmp-kpis">
                  <span class="badge">${getPfmpCompletion(entry)} champs</span>
                  <span class="badge">${entry.visitDate ? "Visite OK" : "Visite à planifier"}</span>
                </div>
              </article>
            `;
          }).join("")}
        </div>
      </section>
    </div>
  `;
}

function buildPrintableBulletinHTML(student, classItem, studentActivities, pfmpSummary, blockAverages) {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>Bulletin - ${student.name}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 24px; color: #111; }
        h1, h2, h3 { margin: 0 0 8px; }
        .meta { color: #555; margin-bottom: 18px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 18px; }
        .card { border: 1px solid #d8d8d8; border-radius: 12px; padding: 16px; break-inside: avoid; }
        .row { display: flex; justify-content: space-between; gap: 12px; padding: 10px 0; border-bottom: 1px solid #eee; }
        .pill { display: inline-block; padding: 6px 10px; border-radius: 999px; font-weight: 700; }
        .kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 18px; }
        .kpi { border: 1px solid #d8d8d8; border-radius: 12px; padding: 12px; }
        @media print { body { margin: 10mm; } }
      </style>
    </head>
    <body>
      <h1>Bulletin de compétences</h1>
      <p class="meta">${student.name} // ${classItem?.name || ""} // ${classItem?.year || ""} // Édité le ${new Date().toLocaleDateString("fr-FR")}</p>
      <div class="kpis">
        <div class="kpi"><strong>Progression</strong><div>${getStudentProgress(student)}%</div></div>
        <div class="kpi"><strong>TP/TD saisis</strong><div>${studentActivities.length}</div></div>
        <div class="kpi"><strong>PFMP remplies</strong><div>${pfmpSummary.filled}/6</div></div>
      </div>
      <div class="grid">
        <section class="card">
          <h2>Compétences</h2>
          ${skillCatalog.map((skill) => `<div class="row"><div><strong>${skill.code}</strong> ${skill.title}</div><div class="pill">${levelLabels[student.skills[skill.id]]}</div></div>`).join("")}
        </section>
        <section class="card">
          <h2>Blocs</h2>
          ${blockAverages.map((block) => `<div class="row"><div>${block.domain}</div><div>${block.progress}%</div></div>`).join("")}
        </section>
      </div>
      <div class="grid">
        <section class="card">
          <h2>Activités</h2>
          ${studentActivities.length ? studentActivities.map((activity) => `<div class="row"><div><strong>${activity.type}</strong> ${activity.title}<br><span class="meta">${activity.date || "Date non renseignée"}</span></div><div>${getStudentActivityAverage(activity, student.id)}%</div></div>`).join("") : `<p>Aucune activité.</p>`}
        </section>
        <section class="card">
          <h2>PFMP</h2>
          ${PFMP_PERIODS.map((period) => {
            const entry = getPfmpPeriodEntry(student.id, period.id);
            return `<div class="row"><div><strong>${period.label}</strong><br><span class="meta">${entry.companyName || "Entreprise non renseignée"}</span></div><div>${entry.visitDate ? "Visite OK" : "À planifier"}</div></div>`;
          }).join("")}
        </section>
      </div>
    </body>
    </html>
  `;
}

function deleteClass(classId) {
  const classItem = getClassById(classId);
  if (!classItem) return;
  const studentIds = getStudentsByClass(classId).map((student) => student.id);
  app.classes = app.classes.filter((item) => item.id !== classId);
  app.students = app.students.filter((student) => student.classId !== classId);
  studentIds.forEach((studentId) => { delete app.pfmpRecords[studentId]; });
  app.evaluationActivities = app.evaluationActivities.filter((activity) => activity.classId !== classId);
  logAction("Classe supprimée", classItem.name, `${studentIds.length} élève(s) retiré(s)`);
  persistAppData();
}

function deleteStudent(studentId) {
  const student = getStudentById(studentId);
  if (!student) return;
  app.students = app.students.filter((item) => item.id !== studentId);
  delete app.pfmpRecords[studentId];
  app.evaluationActivities.forEach((activity) => {
    if (activity.evaluations?.[studentId]) delete activity.evaluations[studentId];
  });
  logAction("Élève supprimé", student.name, getClassById(student.classId)?.name || student.classId);
  persistAppData();
}

function initClassesPage() {
  bindProtectedChrome();
  const classForm = document.querySelector("#class-form");
  const classNameInput = document.querySelector("#class-name-input");
  const classYearInput = document.querySelector("#class-year-input");
  const classNoteInput = document.querySelector("#class-note-input");
  const studentForm = document.querySelector("#student-form");
  const studentNameInput = document.querySelector("#student-name-input");
  const studentClassInput = document.querySelector("#student-class-input");
  const importClassInput = document.querySelector("#import-class-input");
  const csvInput = document.querySelector("#student-csv-input");
  const importButton = document.querySelector("#import-csv-button");
  const importFeedback = document.querySelector("#import-feedback");
  const classFilter = document.querySelector("#class-filter");
  const classCards = document.querySelector("#class-cards");
  const studentDirectory = document.querySelector("#student-directory");
  const canManageStudents = hasPermission("manage_students");

  classForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!canManageStudents) return;
    const name = classNameInput.value.trim();
    const year = classYearInput.value.trim();
    const note = classNoteInput.value.trim();
    if (!name || !year || !note) return;
    app.classes.push({ id: slugify(`${name}-${Date.now()}`), name, year, note });
    logAction("Classe créée", name, `${year} // ${note}`);
    persistAppData();
    classForm.reset();
    renderClassesPage();
  });

  studentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!canManageStudents) return;
    const name = studentNameInput.value.trim();
    const classId = studentClassInput.value;
    if (!name || !classId) return;
    const id = slugify(`${name}-${Date.now()}`);
    app.students.push({ id, name, classId, skills: buildSkillState({}) });
    app.pfmpRecords[id] = hydratePfmpRecord({}, { id, classId }, app.classes);
    logAction("Élève ajouté", name, getClassById(classId)?.name || classId);
    persistAppData();
    studentForm.reset();
    renderClassesPage();
  });

  importButton.addEventListener("click", async () => {
    if (!canManageStudents) return;
    const file = csvInput.files?.[0];
    const classId = importClassInput.value;
    if (!file || !classId) {
      importFeedback.textContent = "Sélectionne un fichier CSV et une classe cible.";
      return;
    }
    const text = await file.text();
    const rows = parseCsv(text);
    const names = extractStudentNames(rows);
    if (!names.length) {
      importFeedback.textContent = "Aucun nom d'élève détecté dans le CSV.";
      return;
    }
    const existing = new Set(getStudentsByClass(classId).map((student) => student.name.trim().toLowerCase()));
    let imported = 0;
    let skipped = 0;
    names.forEach((name) => {
      const key = name.trim().toLowerCase();
      if (!key || existing.has(key)) {
        skipped += 1;
        return;
      }
      const id = slugify(`${name}-${Date.now()}-${imported}`);
      app.students.push({ id, name, classId, skills: buildSkillState({}) });
      app.pfmpRecords[id] = hydratePfmpRecord({}, { id, classId }, app.classes);
      existing.add(key);
      imported += 1;
    });
    if (imported) logAction("Import CSV", getClassById(classId)?.name || classId, `${imported} élève(s) ajoutés`);
    persistAppData();
    importFeedback.textContent = `${imported} élève(s) importé(s), ${skipped} ignoré(s).`;
    csvInput.value = "";
    renderClassesPage();
  });

  enforcePermission("manage_students", classNameInput, classYearInput, classNoteInput, studentNameInput, studentClassInput, importClassInput, csvInput, importButton);

  classFilter.addEventListener("change", renderClassesPage);
  renderClassesPage();

  function renderClassesPage() {
    populateClassSelect(studentClassInput);
    populateClassSelect(importClassInput);
    populateClassFilter(classFilter);
    const activeClassId = classFilter.value || "all";
    const visibleClasses = activeClassId === "all" ? app.classes : app.classes.filter((classItem) => classItem.id === activeClassId);

    classCards.innerHTML = visibleClasses.map((classItem) => {
      const students = getStudentsByClass(classItem.id);
      const pfmpSummary = getPfmpSummary(students);
      return `
        <article class="class-card">
          <div class="class-card-head">
            <h3>${classItem.name}</h3>
            <span class="badge accent">${students.length} élèves</span>
          </div>
          <p>${classItem.year}</p>
          <p>${classItem.note}</p>
          <div class="class-meta">
            <span class="badge">${getClassProgress(classItem.id)}% validé</span>
            <span class="badge">${pfmpSummary.withCompany} PFMP saisies</span>
          </div>
        </article>
      `;
    }).join("");

    const directoryStudents = activeClassId === "all" ? app.students : getStudentsByClass(activeClassId);
    studentDirectory.innerHTML = directoryStudents.map((student) => {
      const filledPeriods = PFMP_PERIODS.filter((period) => getPfmpPeriodEntry(student.id, period.id).companyName).length;
      return `
        <article class="directory-row compact">
          <div>
            <strong>${student.name}</strong>
            <p>${getClassById(student.classId)?.name || "Sans classe"}</p>
            <p>${filledPeriods}/6 PFMP renseignées</p>
          </div>
          <div class="student-badges">
            <span class="badge">${getStudentProgress(student)}% validé</span>
            <span class="badge">${filledPeriods}/6 périodes</span>
          </div>
        </article>
      `;
    }).join("");
  }
}

function initEvaluationsPage() {
  bindProtectedChrome();
  const activityForm = document.querySelector("#activity-form");
  const activityType = document.querySelector("#activity-type");
  const activityTitle = document.querySelector("#activity-title");
  const activityClass = document.querySelector("#activity-class");
  const activitySkill = document.querySelector("#activity-skill");
  const activityDate = document.querySelector("#activity-date");
  const activityIndicators = document.querySelector("#activity-indicators");
  const activityFeedback = document.querySelector("#activity-feedback");
  const sessionClassSelect = document.querySelector("#session-class-select");
  const activitySelect = document.querySelector("#activity-select");
  const activitySummary = document.querySelector("#activity-summary");
  const activityMatrix = document.querySelector("#activity-matrix");
  const activityReport = document.querySelector("#activity-report");
  const activitySynthesis = document.querySelector("#activity-synthesis");
  const evalClassSelect = document.querySelector("#eval-class-select");
  const evalStudentSelect = document.querySelector("#eval-student-select");
  const studentSkillsEditor = document.querySelector("#student-skills-editor");
  const studentSheetMeta = document.querySelector("#student-sheet-meta");
  const skillRowTemplate = document.querySelector("#skill-row-template");
  const canEditEvaluations = hasPermission("edit_evaluations");
  const canEditSkills = hasPermission("edit_skills");

  populateClassSelect(activityClass);
  populateSkillSelect(activitySkill);
  populateClassSelect(sessionClassSelect);
  populateClassSelect(evalClassSelect);
  syncSessionActivities();
  syncEvalStudents();

  enforcePermission("edit_evaluations", activityType, activityTitle, activityClass, activitySkill, activityDate, activityIndicators);

  activityForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!canEditEvaluations) return;
    const indicators = activityIndicators.value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((label, index) => ({ id: slugify(`${activityTitle.value}-${index}-${Date.now()}`), label }));
    if (!activityTitle.value.trim() || !activityClass.value || !activitySkill.value || !indicators.length) {
      activityFeedback.textContent = "Renseigne un titre, une classe, une compétence et au moins un indicateur.";
      return;
    }
    const activity = {
      id: slugify(`${activityTitle.value}-${Date.now()}`),
      title: activityTitle.value.trim(),
      type: activityType.value,
      classId: activityClass.value,
      skillId: activitySkill.value,
      date: activityDate.value,
      indicators,
      evaluations: {}
    };
    app.evaluationActivities.push(activity);
    logAction("Séance créée", activity.title, `${activity.type} // ${getClassById(activity.classId)?.name || activity.classId}`);
    persistAppData();
    activityForm.reset();
    activityFeedback.textContent = "Séance créée.";
    populateClassSelect(activityClass);
    populateSkillSelect(activitySkill);
    sessionClassSelect.value = activity.classId;
    syncSessionActivities(activity.id);
    renderEvaluationPage();
  });

  sessionClassSelect.addEventListener("change", () => {
    syncSessionActivities();
    renderEvaluationPage();
  });
  activitySelect.addEventListener("change", renderEvaluationPage);
  evalClassSelect.addEventListener("change", () => {
    syncEvalStudents();
    renderEvaluationPage();
  });
  evalStudentSelect.addEventListener("change", renderEvaluationPage);

  renderEvaluationPage();

  function syncSessionActivities(selectedId = "") {
    const classId = sessionClassSelect.value || app.classes[0]?.id || "";
    const activities = getActivitiesByClass(classId);
    activitySelect.innerHTML = activities.map((activity) => `<option value="${activity.id}">${activity.type} // ${activity.title}</option>`).join("");
    if (selectedId && activities.some((activity) => activity.id === selectedId)) {
      activitySelect.value = selectedId;
    }
  }

  function syncEvalStudents() {
    const classId = evalClassSelect.value || app.classes[0]?.id || "";
    const students = getStudentsByClass(classId);
    evalStudentSelect.innerHTML = students.map((student) => `<option value="${student.id}">${student.name}</option>`).join("");
  }

  function renderEvaluationPage() {
    const classId = sessionClassSelect.value || app.classes[0]?.id || "";
    const activities = getActivitiesByClass(classId);
    const activity = getActivityById(activitySelect.value) || activities[0];
    renderActivitySummary(activity, classId);
    renderActivityMatrix(activity, classId);
    renderActivityReport(activity, classId);
    renderActivitySynthesis(classId);
    renderStudentSheet();
  }

  function renderActivitySummary(activity, classId) {
    const classItem = getClassById(classId);
    if (!activity) {
      activitySummary.innerHTML = `<article class="summary-card"><h3>Aucune séance</h3><p class="muted-copy">Crée un TP ou un TD pour commencer.</p></article>`;
      return;
    }
    const skill = getSkillById(activity.skillId);
    activitySummary.innerHTML = `
      <article class="summary-card">
        <h3>${activity.type} // ${activity.title}</h3>
        <p class="muted-copy">${classItem?.name || ""} // ${skill?.code || ""} ${skill?.title || ""}</p>
        <p class="muted-copy">${activity.date || "Date non renseignée"} // ${activity.indicators.length} indicateur(s)</p>
      </article>
    `;
  }

  function renderActivityMatrix(activity, classId) {
    const students = getStudentsByClass(classId);
    if (!activity) {
      activityMatrix.innerHTML = "";
      return;
    }
    activityMatrix.classList.add("activity-grid");
    activityMatrix.innerHTML = `
      <div class="matrix-header activity-header">
        <strong>Élève</strong>
        ${activity.indicators.map((indicator) => `<strong>${indicator.label}</strong>`).join("")}
      </div>
      ${students.map((student) => `
        <div class="matrix-row activity-row">
          <div><strong>${student.name}</strong><p class="muted-copy">${getStudentProgress(student)}% validé</p></div>
          ${activity.indicators.map((indicator) => `
            <label class="field">
              <select data-activity-id="${activity.id}" data-student-id="${student.id}" data-indicator-id="${indicator.id}" class="activity-status-select"${canEditEvaluations ? "" : " disabled"}>
                ${renderStatusOptions(getActivityIndicatorStatus(activity, student.id, indicator.id))}
              </select>
            </label>
          `).join("")}
        </div>
      `).join("")}
    `;

    activityMatrix.querySelectorAll(".activity-status-select").forEach((select) => {
      select.addEventListener("change", (event) => {
        if (!canEditEvaluations) return;
        const target = event.target;
        setActivityIndicatorStatus(target.dataset.activityId, target.dataset.studentId, target.dataset.indicatorId, target.value);
        persistAppData();
        renderEvaluationPage();
      });
    });
  }

  function renderActivityReport(activity, classId) {
    const students = getStudentsByClass(classId);
    if (!activity) {
      activityReport.innerHTML = "";
      return;
    }
    const indicatorCards = activity.indicators.map((indicator) => {
      const average = getIndicatorAverage(activity, students, indicator.id);
      return `
        <article class="summary-card">
          <h3>${indicator.label}</h3>
          <p class="muted-copy">Moyenne: ${average}%</p>
          <p class="muted-copy">${renderIndicatorStatusBreakdown(activity, students, indicator.id)}</p>
        </article>
      `;
    }).join("");
    const activityAverage = getActivityAverage(activity, students);
    activityReport.innerHTML = `
      <article class="summary-card">
        <h3>Bilan global</h3>
        <p class="muted-copy">Moyenne de la séance: ${activityAverage}%</p>
        <p class="muted-copy">${students.length} élève(s) évalué(s)</p>
      </article>
      ${indicatorCards}
    `;
  }

  function renderActivitySynthesis(classId) {
    const activities = getActivitiesByClass(classId);
    const students = getStudentsByClass(classId);
    activitySynthesis.innerHTML = activities.length ? activities.map((activity) => {
      const skill = getSkillById(activity.skillId);
      return `
        <article class="directory-row compact">
          <div>
            <strong>${activity.type} // ${activity.title}</strong>
            <p>${skill?.code || ""} ${skill?.title || ""}</p>
            <p>${activity.date || "Date non renseignée"}</p>
          </div>
          <div class="student-badges">
            <span class="badge">${activity.indicators.length} indicateurs</span>
            <span class="badge">${getActivityAverage(activity, students)}% moyen</span>
          </div>
        </article>
      `;
    }).join("") : `<article class="summary-card"><h3>Aucune synthèse</h3><p class="muted-copy">Aucun TP/TD enregistré pour cette classe.</p></article>`;
  }

  function renderStudentSheet() {
    const student = getStudentById(evalStudentSelect.value) || getStudentsByClass(evalClassSelect.value)[0];
    if (!student) {
      studentSkillsEditor.innerHTML = "";
      studentSheetMeta.textContent = "Aucun élève disponible";
      return;
    }
    studentSheetMeta.textContent = `${getClassById(student.classId)?.name || ""} // ${getStudentProgress(student)}% validé`;
    studentSkillsEditor.innerHTML = "";
    skillCatalog.forEach((skill) => {
      const fragment = skillRowTemplate.content.cloneNode(true);
      fragment.querySelector(".skill-code").textContent = skill.code;
      fragment.querySelector(".skill-domain").textContent = getSkillDomain(skill);
      fragment.querySelector(".skill-title").textContent = skill.title;
      fragment.querySelector(".skill-description").textContent = skill.description;
      const select = fragment.querySelector(".skill-select");
      select.value = student.skills[skill.id];
      select.disabled = !canEditSkills;
      select.addEventListener("change", (event) => {
        if (!canEditSkills) return;
        student.skills[skill.id] = event.target.value;
        logAction("Compétence modifiée", student.name, `${skill.code} // ${levelLabels[event.target.value]}`);
        persistAppData();
        renderEvaluationPage();
      });
      studentSkillsEditor.appendChild(fragment);
    });
  }
}

function initPfmpPage() {
  bindProtectedChrome();
  const classSelect = document.querySelector("#pfmp-class-select");
  const studentSelect = document.querySelector("#pfmp-student-select");
  const periodSelect = document.querySelector("#pfmp-period-select");
  const summaryCards = document.querySelector("#pfmp-summary-cards");
  const periodsOverview = document.querySelector("#pfmp-periods-overview");
  const directory = document.querySelector("#pfmp-directory");
  const exportPfmpButton = document.querySelector("#export-pfmp-button");
  const form = document.querySelector("#pfmp-form");
  const canEditPfmp = hasPermission("edit_pfmp");
  const inputs = {
    companyName: document.querySelector("#pfmp-company"),
    comment: document.querySelector("#pfmp-comment"),
    address: document.querySelector("#pfmp-address"),
    tutorName: document.querySelector("#pfmp-tutor"),
    tutorEmail: document.querySelector("#pfmp-email"),
    tutorPhone: document.querySelector("#pfmp-phone"),
    conventionSent: document.querySelector("#pfmp-sent"),
    conventionSignedCompany: document.querySelector("#pfmp-signed-company"),
    conventionSignedParents: document.querySelector("#pfmp-signed-parents"),
    conventionSignedSchool: document.querySelector("#pfmp-signed-school"),
    teacher: document.querySelector("#pfmp-teacher"),
    visitDate: document.querySelector("#pfmp-visit"),
    reportDate: document.querySelector("#pfmp-report"),
    bookletDate: document.querySelector("#pfmp-booklet"),
    attendanceDate: document.querySelector("#pfmp-attendance")
  };

  populateClassSelect(classSelect);
  periodSelect.innerHTML = PFMP_PERIODS.map((period) => `<option value="${period.id}">${period.label}</option>`).join("");
  syncStudents();
  renderPfmpPage();

  enforcePermission("edit_pfmp", ...Object.values(inputs), form.querySelector('button[type="submit"]'));

  classSelect.addEventListener("change", () => {
    syncStudents();
    renderPfmpPage();
  });
  studentSelect.addEventListener("change", renderPfmpPage);
  periodSelect.addEventListener("change", renderPfmpPage);
  exportPfmpButton.addEventListener("click", () => {
    const classItem = getClassById(classSelect.value || app.classes[0]?.id || "");
    exportPfmpWorkbook(classItem, getStudentsByClass(classItem?.id || ""));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!canEditPfmp) return;
    const student = getStudentById(studentSelect.value);
    if (!student) return;
    const record = getPfmpRecord(student.id);
    record.periods[periodSelect.value] = hydratePfmpEntry(Object.fromEntries(Object.entries(inputs).map(([key, input]) => [key, input.value.trim()])));
    logAction("PFMP mise à jour", student.name, PFMP_PERIODS.find((period) => period.id === periodSelect.value)?.label || periodSelect.value);
    persistAppData();
    renderPfmpPage();
  });

  function syncStudents() {
    const classId = classSelect.value || app.classes[0]?.id || "";
    const students = getStudentsByClass(classId);
    studentSelect.innerHTML = students.map((student) => `<option value="${student.id}">${student.name}</option>`).join("");
  }

  function renderPfmpPage() {
    const classId = classSelect.value || app.classes[0]?.id || "";
    const students = getStudentsByClass(classId);
    const selectedStudent = getStudentById(studentSelect.value) || students[0];
    const summary = getPfmpSummary(students);

    summaryCards.innerHTML = [
      { label: "PFMP renseignées", value: summary.withCompany, trace: "entreprise saisie" },
      { label: "Conventions complètes", value: summary.fullConvention, trace: "3 signatures" },
      { label: "Visites planifiées", value: summary.visitPlanned, trace: "date de visite saisie" },
      { label: "Dossiers complets", value: summary.completeFile, trace: "rapport + livret + présence" }
    ].map(renderStatCard).join("");

    const selectedRecord = selectedStudent ? getPfmpPeriodEntry(selectedStudent.id, periodSelect.value) : createEmptyPfmpEntry();
    Object.entries(inputs).forEach(([key, input]) => { input.value = selectedRecord[key] || ""; });

    periodsOverview.innerHTML = PFMP_PERIODS.map((period) => {
      const entry = selectedStudent ? getPfmpPeriodEntry(selectedStudent.id, period.id) : createEmptyPfmpEntry();
      return `
        <article class="period-card">
          <strong>${period.label}</strong>
          <p class="muted-copy">${entry.companyName || "Entreprise non renseignée"}</p>
          <div class="pfmp-kpis">
            <span class="badge">${getPfmpCompletion(entry)} champs</span>
            <span class="badge">${entry.visitDate ? "Visite OK" : "Visite à planifier"}</span>
          </div>
        </article>
      `;
    }).join("");

    directory.innerHTML = students.map((student) => {
      const filledPeriods = PFMP_PERIODS.filter((period) => getPfmpPeriodEntry(student.id, period.id).companyName).length;
      return `
        <article class="directory-row compact">
          <div>
            <strong>${student.name}</strong>
            <p>${filledPeriods}/6 PFMP renseignées</p>
            <p>${PFMP_PERIODS.filter((period) => getPfmpPeriodEntry(student.id, period.id).visitDate).length} visites planifiées</p>
          </div>
          <div class="pfmp-kpis">
            <span class="badge">${filledPeriods}/6 périodes</span>
            <span class="badge">${PFMP_PERIODS.filter((period) => hasFullConvention(getPfmpPeriodEntry(student.id, period.id))).length}/6 conventions</span>
            <span class="badge">${PFMP_PERIODS.filter((period) => hasCompleteFile(getPfmpPeriodEntry(student.id, period.id))).length}/6 dossiers</span>
          </div>
        </article>
      `;
    }).join("");
  }
}

function getSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function setSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function bindProtectedChrome() {
  const roleBadge = document.querySelector("#session-role");
  const logoutButton = document.querySelector("#logout-button");
  const navs = [...document.querySelectorAll(".nav-tabs")];
  const session = getSession();
  if (roleBadge && session) {
    roleBadge.textContent = session.label;
  }
  navs.forEach((nav) => {
    upsertBulletinDropdown(nav);
    upsertDashboardDropdown(nav);
    upsertEvaluationsDropdown(nav);
    upsertPfmpDropdown(nav);
    upsertStaticDropdown(nav, "Referentiel", [
      { href: "coverage.html", label: "Couverture" },
      { href: "mapping.html", label: "Cartographie" },
      { href: "library.html", label: "Bibliotheque de seances" }
    ], page === "coverage" || page === "mapping" || page === "library", "referential-menu");
    upsertStaticDropdown(nav, "Remediations", [
      { href: "remediation-pfmp.html", label: "PFMP" },
      { href: "remediation-competences.html", label: "Competences" }
    ], page === "remediation_pfmp" || page === "remediation_competences");
    const bulletinDropdown = nav.querySelector('.nav-dropdown[data-key="bulletin-menu"]');
    if (bulletinDropdown) {
      nav.insertBefore(bulletinDropdown, nav.querySelector('.nav-dropdown[data-key="referential-menu"]') || roleBadge || logoutButton || null);
    }
    const existing = nav.querySelector('a[href="accounts.html"]');
    if (session?.role === "admin" && !existing) {
      const link = document.createElement("a");
      link.href = "accounts.html";
      link.className = `nav-tab${page === "accounts" ? " active" : ""}`;
      link.textContent = "Comptes";
      nav.insertBefore(link, roleBadge || logoutButton || null);
    }
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
    document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
      dropdown.removeAttribute("open");
    });
  });

  document.querySelectorAll(".nav-dropdown-link").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
        dropdown.removeAttribute("open");
      });
    });
  });

  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      try {
        await fetch("/api/logout", {
          method: "POST",
          credentials: "include"
        });
      } catch {}
      clearSession();
      window.location.href = "login.html";
    });
  }

}

function upsertClassDropdown(nav, href, label) {
  nav.querySelector(`a[href="${href}"]`)?.remove();
  const classLinks = app.classes.map((classItem) => ({
    href: `${href}?class=${encodeURIComponent(classItem.id)}`,
    label: getClassNavLabel(classItem)
  }));
  const isActive = (href === "dashboard.html" && page === "dashboard")
    || (href === "evaluations.html" && page === "evaluations")
    || (href === "pfmp.html" && page === "pfmp");
  upsertStaticDropdown(nav, label, classLinks, isActive, href);
}

function upsertDashboardDropdown(nav) {
  nav.querySelector('a[href="dashboard.html"]')?.remove();
  const links = app.classes.flatMap((classItem) => ([
    { type: "label", label: getClassNavLabel(classItem) },
    { href: `dashboard.html?class=${encodeURIComponent(classItem.id)}&view=skills`, label: "Pilotage competences" },
    { href: `dashboard.html?class=${encodeURIComponent(classItem.id)}&view=pfmp`, label: "Pilotage PFMP" },
    { href: `dashboard.html?class=${encodeURIComponent(classItem.id)}&view=calendar`, label: "Calendrier pedagogique" }
  ]));
  upsertStaticDropdown(nav, "Dashboard", links, page === "dashboard", "dashboard-menu");
}

function upsertBulletinDropdown(nav) {
  nav.querySelector('a[href="bulletin.html"]')?.remove();
  const links = app.classes.map((classItem) => ({
    href: `bulletin.html?class=${encodeURIComponent(classItem.id)}`,
    label: getClassNavLabel(classItem)
  }));
  upsertStaticDropdown(nav, "Bulletin", links, page === "bulletin", "bulletin-menu");
}

function upsertEvaluationsDropdown(nav) {
  nav.querySelector('a[href="evaluations.html"]')?.remove();
  const links = app.classes.flatMap((classItem) => ([
    { type: "label", label: getClassNavLabel(classItem) },
    { href: `evaluations.html?class=${encodeURIComponent(classItem.id)}&view=create`, label: "Creation de seance" },
    { href: `evaluations.html?class=${encodeURIComponent(classItem.id)}&view=session`, label: "Evaluation seance" },
    { href: `evaluations.html?class=${encodeURIComponent(classItem.id)}&view=skills`, label: "Competences eleves" }
  ]));
  upsertStaticDropdown(nav, "Evaluations", links, page === "evaluations", "evaluations-menu");
}

function upsertPfmpDropdown(nav) {
  nav.querySelector('a[href="pfmp.html"]')?.remove();
  const links = app.classes.flatMap((classItem) => ([
    { type: "label", label: getClassNavLabel(classItem) },
    { href: `pfmp.html?class=${encodeURIComponent(classItem.id)}`, label: "Infos PFMP" },
    { href: `pfmp-livret.html?class=${encodeURIComponent(classItem.id)}`, label: "Livret d'évaluation" }
  ]));
  upsertStaticDropdown(nav, "PFMP", links, page === "pfmp" || page === "pfmp_livret", "pfmp-menu");
}

function upsertStaticDropdown(nav, label, links, isActive, key = label) {
  let dropdown = nav.querySelector(`.nav-dropdown[data-key="${key}"]`);
  if (!dropdown) {
    dropdown = document.createElement("details");
    dropdown.className = "nav-dropdown";
    dropdown.dataset.key = key;
    nav.insertBefore(dropdown, nav.querySelector("#session-role") || nav.querySelector("#logout-button") || null);
  }
  dropdown.classList.toggle("active", isActive);
  dropdown.innerHTML = `
    <summary class="nav-tab nav-dropdown-toggle">${label} ▾</summary>
    <div class="nav-dropdown-menu">
      ${links.map((item) => item.type === "label"
        ? `<span class="nav-dropdown-group">${item.label}</span>`
        : `<a class="nav-dropdown-link" href="${item.href}">${item.label}</a>`).join("")}
    </div>
  `;
}

function isAdmin() {
  return getSession()?.role === "admin";
}

function getAccountByRole(role) {
  return app.accounts.find((account) => account.role === role);
}

function getTeacherAccounts() {
  return app.accounts.filter((account) => account.role === "professeur");
}

function getAccountById(accountId) {
  return app.accounts.find((account) => account.id === accountId);
}

function updateAccount(role, username, password) {
  const account = getAccountByRole(role);
  if (!account) return;
  account.username = username;
  account.password = password;
  persistAppData();
}

function addTeacherAccount(username, password) {
  app.accounts.push({
    id: slugify(`teacher-${username}-${Date.now()}`),
    username,
    password,
    role: "professeur",
    label: "Professeur"
  });
  persistAppData();
}

function removeTeacherAccount(accountId) {
  app.accounts = app.accounts.filter((account) => !(account.role === "professeur" && account.id === accountId));
  persistAppData();
}

function enforceAdminOnly(...elements) {
  if (isAdmin()) return;
  elements.filter(Boolean).forEach((element) => {
    if ("disabled" in element) element.disabled = true;
    element.classList?.add("is-disabled");
  });
}

function initDashboardPage() {
  bindProtectedChrome();
  const statsGrid = document.querySelector("#stats-grid");
  const statusChart = document.querySelector("#status-chart");
  const blockChart = document.querySelector("#block-chart");
  const pfmpChart = document.querySelector("#pfmp-chart");
  const studentChart = document.querySelector("#student-chart");
  const catalogGrid = document.querySelector("#catalog-grid");
  const resetButton = document.querySelector("#reset-data");
  const classSelect = document.querySelector("#dashboard-class-select");
  const classMeta = document.querySelector("#dashboard-class-meta");

  populateClassSelect(classSelect);
  enforceAdminOnly(resetButton);
  classSelect.addEventListener("change", renderDashboardPage);
  resetButton.addEventListener("click", () => {
    const initial = hydrateAppData({ classes: defaultClasses, students: defaultStudents, pfmpRecords: defaultPfmpRecords });
    app.classes = initial.classes;
    app.students = initial.students;
    app.pfmpRecords = initial.pfmpRecords;
    app.evaluationActivities = initial.evaluationActivities;
    app.activityLog = initial.activityLog;
    logAction("Réinitialisation", "Application", "Jeu de données par défaut restauré");
    persistAppData();
    populateClassSelect(classSelect);
    renderDashboardPage();
  });

  renderDashboardPage();

  function renderDashboardPage() {
    const classId = classSelect.value || app.classes[0]?.id || "";
    const classItem = getClassById(classId);
    const students = getStudentsByClass(classId);
    const counts = getStatusCounts(students);
    const progressAverage = students.length ? Math.round(students.reduce((sum, student) => sum + getStudentProgress(student), 0) / students.length) : 0;
    const strongestBlock = [...getBlockAverages(students)].sort((a, b) => b.progress - a.progress)[0];
    const pfmpSummary = getPfmpSummary(students);
    const exportSkillsButton = document.querySelector("#export-skills-button");

    classMeta.textContent = classItem ? `${classItem.name} // ${classItem.year} // ${students.length} élèves` : "Aucune classe";
    statsGrid.innerHTML = [
      { label: "Élèves", value: students.length, trace: "effectif de la classe" },
      { label: "Progression moyenne", value: `${progressAverage}%`, trace: strongestBlock ? `bloc fort: ${strongestBlock.domain}` : "aucune donnée" },
      { label: "PFMP renseignées", value: pfmpSummary.withCompany, trace: "entreprise saisie" },
      { label: "Conventions complètes", value: pfmpSummary.fullConvention, trace: "entreprise + parents + lycée" }
    ].map(renderStatCard).join("");

    renderStatusChart(statusChart, counts);
    renderBlockChart(blockChart, getBlockAverages(students));
    renderPfmpChart(pfmpChart, pfmpSummary);
    renderStudentChart(studentChart, students);

    exportSkillsButton.onclick = () => exportSkillsWorkbook(classItem, students);

    catalogGrid.innerHTML = skillCatalog.map((skill) => `
      <article class="catalog-card">
        <div class="skill-headline">
          <span class="skill-code">${skill.code}</span>
          <span class="skill-domain">${getSkillDomain(skill)}</span>
        </div>
        <h3>${skill.title}</h3>
        <p>${skill.description}</p>
      </article>
    `).join("");
  }
}

function initClassesPage() {
  bindProtectedChrome();
  const classForm = document.querySelector("#class-form");
  const classNameInput = document.querySelector("#class-name-input");
  const classYearInput = document.querySelector("#class-year-input");
  const classNoteInput = document.querySelector("#class-note-input");
  const studentForm = document.querySelector("#student-form");
  const studentNameInput = document.querySelector("#student-name-input");
  const studentClassInput = document.querySelector("#student-class-input");
  const importClassInput = document.querySelector("#import-class-input");
  const csvInput = document.querySelector("#student-csv-input");
  const importButton = document.querySelector("#import-csv-button");
  const importFeedback = document.querySelector("#import-feedback");
  const classFilter = document.querySelector("#class-filter");
  const classCards = document.querySelector("#class-cards");
  const studentDirectory = document.querySelector("#student-directory");

  classForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = classNameInput.value.trim();
    const year = classYearInput.value.trim();
    const note = classNoteInput.value.trim();
    if (!name || !year || !note) return;
    app.classes.push({ id: slugify(`${name}-${Date.now()}`), name, year, note });
    persistAppData();
    classForm.reset();
    renderClassesPage();
  });

  studentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = studentNameInput.value.trim();
    const classId = studentClassInput.value;
    if (!name || !classId) return;
    const id = slugify(`${name}-${Date.now()}`);
    app.students.push({ id, name, classId, skills: buildSkillState({}) });
    app.pfmpRecords[id] = hydratePfmpRecord({}, { id, classId }, app.classes);
    persistAppData();
    studentForm.reset();
    renderClassesPage();
  });

  importButton.addEventListener("click", async () => {
    const file = csvInput.files?.[0];
    const classId = importClassInput.value;
    if (!file || !classId) {
      importFeedback.textContent = "Sélectionne un fichier CSV et une classe cible.";
      return;
    }
    const text = await file.text();
    const rows = parseCsv(text);
    const names = extractStudentNames(rows);
    if (!names.length) {
      importFeedback.textContent = "Aucun nom d'élève détecté dans le CSV.";
      return;
    }
    const existing = new Set(getStudentsByClass(classId).map((student) => student.name.trim().toLowerCase()));
    let imported = 0;
    let skipped = 0;
    names.forEach((name) => {
      const key = name.trim().toLowerCase();
      if (!key || existing.has(key)) {
        skipped += 1;
        return;
      }
      const id = slugify(`${name}-${Date.now()}-${imported}`);
      app.students.push({ id, name, classId, skills: buildSkillState({}) });
      app.pfmpRecords[id] = hydratePfmpRecord({}, { id, classId }, app.classes);
      existing.add(key);
      imported += 1;
    });
    persistAppData();
    importFeedback.textContent = `${imported} élève(s) importé(s), ${skipped} ignoré(s).`;
    csvInput.value = "";
    renderClassesPage();
  });
  enforceAdminOnly(classNameInput, classYearInput, classNoteInput, studentNameInput, studentClassInput, importClassInput, csvInput, importButton);

  classFilter.addEventListener("change", renderClassesPage);
  renderClassesPage();

  function renderClassesPage() {
    populateClassSelect(studentClassInput);
    populateClassSelect(importClassInput);
    populateClassFilter(classFilter);
    const activeClassId = classFilter.value || "all";
    const visibleClasses = activeClassId === "all" ? app.classes : app.classes.filter((classItem) => classItem.id === activeClassId);

    classCards.innerHTML = visibleClasses.map((classItem) => {
      const students = getStudentsByClass(classItem.id);
      const pfmpSummary = getPfmpSummary(students);
      return `
        <article class="class-card">
          <div class="class-card-head">
            <h3>${classItem.name}</h3>
            <span class="badge accent">${students.length} élèves</span>
          </div>
          <p>${classItem.year}</p>
          <p>${classItem.note}</p>
          <div class="class-meta">
            <span class="badge">${getClassProgress(classItem.id)}% validé</span>
            <span class="badge">${pfmpSummary.withCompany} PFMP saisies</span>
          </div>
        </article>
      `;
    }).join("");

    const directoryStudents = activeClassId === "all" ? app.students : getStudentsByClass(activeClassId);
    studentDirectory.innerHTML = directoryStudents.map((student) => {
      const filledPeriods = PFMP_PERIODS.filter((period) => getPfmpPeriodEntry(student.id, period.id).companyName).length;
      return `
        <article class="directory-row compact">
          <div>
            <strong>${student.name}</strong>
            <p>${getClassById(student.classId)?.name || "Sans classe"}</p>
            <p>${filledPeriods}/6 PFMP renseignées</p>
          </div>
          <div class="student-badges">
            <span class="badge">${getStudentProgress(student)}% validé</span>
            <span class="badge">${filledPeriods}/6 périodes</span>
          </div>
        </article>
      `;
    }).join("");
  }
}

function initEvaluationsPage() {
  bindProtectedChrome();
  const activityForm = document.querySelector("#activity-form");
  const activityType = document.querySelector("#activity-type");
  const activityTitle = document.querySelector("#activity-title");
  const activityClass = document.querySelector("#activity-class");
  const activitySkill = document.querySelector("#activity-skill");
  const activityDate = document.querySelector("#activity-date");
  const activityIndicators = document.querySelector("#activity-indicators");
  const activityFeedback = document.querySelector("#activity-feedback");
  const sessionClassSelect = document.querySelector("#session-class-select");
  const activitySelect = document.querySelector("#activity-select");
  const activitySummary = document.querySelector("#activity-summary");
  const activityMatrix = document.querySelector("#activity-matrix");
  const activityReport = document.querySelector("#activity-report");
  const activitySynthesis = document.querySelector("#activity-synthesis");
  const evalClassSelect = document.querySelector("#eval-class-select");
  const evalStudentSelect = document.querySelector("#eval-student-select");
  const studentSkillsEditor = document.querySelector("#student-skills-editor");
  const studentSheetMeta = document.querySelector("#student-sheet-meta");
  const skillRowTemplate = document.querySelector("#skill-row-template");

  populateClassSelect(activityClass);
  populateSkillSelect(activitySkill);
  populateClassSelect(sessionClassSelect);
  populateClassSelect(evalClassSelect);
  syncSessionActivities();
  syncEvalStudents();

  activityForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const indicators = activityIndicators.value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((label, index) => ({ id: slugify(`${activityTitle.value}-${index}-${Date.now()}`), label }));
    if (!activityTitle.value.trim() || !activityClass.value || !activitySkill.value || !indicators.length) {
      activityFeedback.textContent = "Renseigne un titre, une classe, une compétence et au moins un indicateur.";
      return;
    }
    const activity = {
      id: slugify(`${activityTitle.value}-${Date.now()}`),
      title: activityTitle.value.trim(),
      type: activityType.value,
      classId: activityClass.value,
      skillId: activitySkill.value,
      date: activityDate.value,
      indicators,
      evaluations: {}
    };
    app.evaluationActivities.push(activity);
    persistAppData();
    activityForm.reset();
    activityFeedback.textContent = "Séance créée.";
    populateClassSelect(activityClass);
    populateSkillSelect(activitySkill);
    sessionClassSelect.value = activity.classId;
    syncSessionActivities(activity.id);
    renderEvaluationPage();
  });

  sessionClassSelect.addEventListener("change", () => {
    syncSessionActivities();
    renderEvaluationPage();
  });
  activitySelect.addEventListener("change", renderEvaluationPage);
  evalClassSelect.addEventListener("change", () => {
    syncEvalStudents();
    renderEvaluationPage();
  });
  evalStudentSelect.addEventListener("change", renderEvaluationPage);

  renderEvaluationPage();

  function syncSessionActivities(selectedId = "") {
    const classId = sessionClassSelect.value || app.classes[0]?.id || "";
    const activities = getActivitiesByClass(classId);
    activitySelect.innerHTML = activities.map((activity) => `<option value="${activity.id}">${activity.type} // ${activity.title}</option>`).join("");
    if (selectedId && activities.some((activity) => activity.id === selectedId)) {
      activitySelect.value = selectedId;
    }
  }

  function syncEvalStudents() {
    const classId = evalClassSelect.value || app.classes[0]?.id || "";
    const students = getStudentsByClass(classId);
    evalStudentSelect.innerHTML = students.map((student) => `<option value="${student.id}">${student.name}</option>`).join("");
  }

  function renderEvaluationPage() {
    const classId = sessionClassSelect.value || app.classes[0]?.id || "";
    const activities = getActivitiesByClass(classId);
    const activity = getActivityById(activitySelect.value) || activities[0];
    renderActivitySummary(activity, classId);
    renderActivityMatrix(activity, classId);
    renderActivityReport(activity, classId);
    renderActivitySynthesis(classId);
    renderStudentSheet();
  }

  function renderActivitySummary(activity, classId) {
    const classItem = getClassById(classId);
    if (!activity) {
      activitySummary.innerHTML = `<article class="summary-card"><h3>Aucune séance</h3><p class="muted-copy">Crée un TP ou un TD pour commencer.</p></article>`;
      return;
    }
    const skill = getSkillById(activity.skillId);
    activitySummary.innerHTML = `
      <article class="summary-card">
        <h3>${activity.type} // ${activity.title}</h3>
        <p class="muted-copy">${classItem?.name || ""} // ${skill?.code || ""} ${skill?.title || ""}</p>
        <p class="muted-copy">${activity.date || "Date non renseignée"} // ${activity.indicators.length} indicateur(s)</p>
      </article>
    `;
  }

  function renderActivityMatrix(activity, classId) {
    const students = getStudentsByClass(classId);
    if (!activity) {
      activityMatrix.innerHTML = "";
      return;
    }
    activityMatrix.classList.add("activity-grid");
    activityMatrix.innerHTML = `
      <div class="matrix-header activity-header">
        <strong>Élève</strong>
        ${activity.indicators.map((indicator) => `<strong>${indicator.label}</strong>`).join("")}
      </div>
      ${students.map((student) => `
        <div class="matrix-row activity-row">
          <div><strong>${student.name}</strong><p class="muted-copy">${getStudentProgress(student)}% validé</p></div>
          ${activity.indicators.map((indicator) => `
            <label class="field">
              <select data-activity-id="${activity.id}" data-student-id="${student.id}" data-indicator-id="${indicator.id}" class="activity-status-select">
                ${renderStatusOptions(getActivityIndicatorStatus(activity, student.id, indicator.id))}
              </select>
            </label>
          `).join("")}
        </div>
      `).join("")}
    `;

    activityMatrix.querySelectorAll(".activity-status-select").forEach((select) => {
      select.addEventListener("change", (event) => {
        const target = event.target;
        setActivityIndicatorStatus(target.dataset.activityId, target.dataset.studentId, target.dataset.indicatorId, target.value);
        persistAppData();
        renderEvaluationPage();
      });
    });
  }

  function renderActivityReport(activity, classId) {
    const students = getStudentsByClass(classId);
    if (!activity) {
      activityReport.innerHTML = "";
      return;
    }
    const indicatorCards = activity.indicators.map((indicator) => {
      const average = getIndicatorAverage(activity, students, indicator.id);
      return `
        <article class="summary-card">
          <h3>${indicator.label}</h3>
          <p class="muted-copy">Moyenne: ${average}%</p>
          <p class="muted-copy">${renderIndicatorStatusBreakdown(activity, students, indicator.id)}</p>
        </article>
      `;
    }).join("");
    const activityAverage = getActivityAverage(activity, students);
    activityReport.innerHTML = `
      <article class="summary-card">
        <h3>Bilan global</h3>
        <p class="muted-copy">Moyenne de la séance: ${activityAverage}%</p>
        <p class="muted-copy">${students.length} élève(s) évalué(s)</p>
      </article>
      ${indicatorCards}
    `;
  }

  function renderActivitySynthesis(classId) {
    const activities = getActivitiesByClass(classId);
    const students = getStudentsByClass(classId);
    activitySynthesis.innerHTML = activities.length ? activities.map((activity) => {
      const skill = getSkillById(activity.skillId);
      return `
        <article class="directory-row compact">
          <div>
            <strong>${activity.type} // ${activity.title}</strong>
            <p>${skill?.code || ""} ${skill?.title || ""}</p>
            <p>${activity.date || "Date non renseignée"}</p>
          </div>
          <div class="student-badges">
            <span class="badge">${activity.indicators.length} indicateurs</span>
            <span class="badge">${getActivityAverage(activity, students)}% moyen</span>
          </div>
        </article>
      `;
    }).join("") : `<article class="summary-card"><h3>Aucune synthèse</h3><p class="muted-copy">Aucun TP/TD enregistré pour cette classe.</p></article>`;
  }

  function renderStudentSheet() {
    const student = getStudentById(evalStudentSelect.value) || getStudentsByClass(evalClassSelect.value)[0];
    if (!student) {
      studentSkillsEditor.innerHTML = "";
      studentSheetMeta.textContent = "Aucun élève disponible";
      return;
    }
    studentSheetMeta.textContent = `${getClassById(student.classId)?.name || ""} // ${getStudentProgress(student)}% validé`;
    studentSkillsEditor.innerHTML = "";
    skillCatalog.forEach((skill) => {
      const fragment = skillRowTemplate.content.cloneNode(true);
      fragment.querySelector(".skill-code").textContent = skill.code;
      fragment.querySelector(".skill-domain").textContent = getSkillDomain(skill);
      fragment.querySelector(".skill-title").textContent = skill.title;
      fragment.querySelector(".skill-description").textContent = skill.description;
      const select = fragment.querySelector(".skill-select");
      select.value = student.skills[skill.id];
      select.addEventListener("change", (event) => {
        student.skills[skill.id] = event.target.value;
        persistAppData();
        renderEvaluationPage();
      });
      studentSkillsEditor.appendChild(fragment);
    });
  }
}

function initPfmpPage() {
  bindProtectedChrome();
  const classSelect = document.querySelector("#pfmp-class-select");
  const studentSelect = document.querySelector("#pfmp-student-select");
  const periodSelect = document.querySelector("#pfmp-period-select");
  const summaryCards = document.querySelector("#pfmp-summary-cards");
  const periodsOverview = document.querySelector("#pfmp-periods-overview");
  const directory = document.querySelector("#pfmp-directory");
  const exportPfmpButton = document.querySelector("#export-pfmp-button");
  const form = document.querySelector("#pfmp-form");
  const inputs = {
    companyName: document.querySelector("#pfmp-company"),
    comment: document.querySelector("#pfmp-comment"),
    address: document.querySelector("#pfmp-address"),
    tutorName: document.querySelector("#pfmp-tutor"),
    tutorEmail: document.querySelector("#pfmp-email"),
    tutorPhone: document.querySelector("#pfmp-phone"),
    conventionSent: document.querySelector("#pfmp-sent"),
    conventionSignedCompany: document.querySelector("#pfmp-signed-company"),
    conventionSignedParents: document.querySelector("#pfmp-signed-parents"),
    conventionSignedSchool: document.querySelector("#pfmp-signed-school"),
    teacher: document.querySelector("#pfmp-teacher"),
    visitDate: document.querySelector("#pfmp-visit"),
    reportDate: document.querySelector("#pfmp-report"),
    bookletDate: document.querySelector("#pfmp-booklet"),
    attendanceDate: document.querySelector("#pfmp-attendance")
  };

  populateClassSelect(classSelect);
  periodSelect.innerHTML = PFMP_PERIODS.map((period) => `<option value="${period.id}">${period.label}</option>`).join("");
  syncStudents();
  renderPfmpPage();

  classSelect.addEventListener("change", () => {
    syncStudents();
    renderPfmpPage();
  });
  studentSelect.addEventListener("change", renderPfmpPage);
  periodSelect.addEventListener("change", renderPfmpPage);
  exportPfmpButton.addEventListener("click", () => {
    const classItem = getClassById(classSelect.value || app.classes[0]?.id || "");
    exportPfmpWorkbook(classItem, getStudentsByClass(classItem?.id || ""));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const student = getStudentById(studentSelect.value);
    if (!student) return;
    const record = getPfmpRecord(student.id);
    record.periods[periodSelect.value] = hydratePfmpEntry(Object.fromEntries(Object.entries(inputs).map(([key, input]) => [key, input.value.trim()])));
    persistAppData();
    renderPfmpPage();
  });

  function syncStudents() {
    const classId = classSelect.value || app.classes[0]?.id || "";
    const students = getStudentsByClass(classId);
    studentSelect.innerHTML = students.map((student) => `<option value="${student.id}">${student.name}</option>`).join("");
  }

  function renderPfmpPage() {
    const classId = classSelect.value || app.classes[0]?.id || "";
    const students = getStudentsByClass(classId);
    const selectedStudent = getStudentById(studentSelect.value) || students[0];
    const summary = getPfmpSummary(students);

    summaryCards.innerHTML = [
      { label: "PFMP renseignées", value: summary.withCompany, trace: "entreprise saisie" },
      { label: "Conventions complètes", value: summary.fullConvention, trace: "3 signatures" },
      { label: "Visites planifiées", value: summary.visitPlanned, trace: "date de visite saisie" },
      { label: "Dossiers complets", value: summary.completeFile, trace: "rapport + livret + présence" }
    ].map(renderStatCard).join("");

    const selectedRecord = selectedStudent ? getPfmpPeriodEntry(selectedStudent.id, periodSelect.value) : createEmptyPfmpEntry();
    Object.entries(inputs).forEach(([key, input]) => { input.value = selectedRecord[key] || ""; });

    periodsOverview.innerHTML = PFMP_PERIODS.map((period) => {
      const entry = selectedStudent ? getPfmpPeriodEntry(selectedStudent.id, period.id) : createEmptyPfmpEntry();
      return `
        <article class="period-card">
          <strong>${period.label}</strong>
          <p class="muted-copy">${entry.companyName || "Entreprise non renseignée"}</p>
          <div class="pfmp-kpis">
            <span class="badge">${getPfmpCompletion(entry)} champs</span>
            <span class="badge">${entry.visitDate ? "Visite OK" : "Visite à planifier"}</span>
          </div>
        </article>
      `;
    }).join("");

    directory.innerHTML = students.map((student) => {
      const item = getPfmpRecord(student.id);
      const filledPeriods = PFMP_PERIODS.filter((period) => getPfmpPeriodEntry(student.id, period.id).companyName).length;
      return `
        <article class="directory-row compact">
          <div>
            <strong>${student.name}</strong>
            <p>${filledPeriods}/6 PFMP renseignées</p>
            <p>${PFMP_PERIODS.filter((period) => getPfmpPeriodEntry(student.id, period.id).visitDate).length} visites planifiées</p>
          </div>
          <div class="pfmp-kpis">
            <span class="badge">${filledPeriods}/6 périodes</span>
            <span class="badge">${PFMP_PERIODS.filter((period) => hasFullConvention(getPfmpPeriodEntry(student.id, period.id))).length}/6 conventions</span>
            <span class="badge">${PFMP_PERIODS.filter((period) => hasCompleteFile(getPfmpPeriodEntry(student.id, period.id))).length}/6 dossiers</span>
          </div>
        </article>
      `;
    }).join("");
  }
}

function renderStatCard(stat) {
  return `<article class="stat-card"><span class="stat-value">${stat.value}</span><span class="stat-label">${stat.label}</span><span class="stat-trace">${stat.trace}</span></article>`;
}

function renderStatusChart(target, counts) {
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
  const circumference = 2 * Math.PI * 70;
  let offset = 0;
  const order = ["absent", "non_evalue", "non_acquis", "en_cours_acquisition", "partiellement_acquis", "acquis"];
  const segments = order.map((status) => {
    const ratio = total ? counts[status] / total : 0;
    const dash = ratio * circumference;
    const part = `<circle cx="90" cy="90" r="70" fill="none" stroke="${statusColors[status]}" stroke-width="16" stroke-dasharray="${dash} ${circumference - dash}" stroke-dashoffset="${-offset}" transform="rotate(-90 90 90)"></circle>`;
    offset += dash;
    return part;
  }).join("");
  target.innerHTML = `<svg class="chart-svg" viewBox="0 0 380 260"><g transform="translate(0 18)"><circle cx="90" cy="90" r="70" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="16"></circle>${segments}<text x="90" y="86" text-anchor="middle" fill="#e7fff8" font-size="28" font-family="Orbitron, sans-serif">${total}</text><text x="90" y="108" text-anchor="middle" fill="#8db5b1" font-size="12">évaluations</text></g></svg>${renderLegend(order.map((status) => ({ label: levelLabels[status], value: counts[status], color: statusColors[status] })))}`;
}

function renderBlockChart(target, blockAverages) {
  const bars = blockAverages.map((block, index) => {
    const width = Math.round((block.progress / 100) * 250);
    const y = 30 + index * 62;
    return `<text x="0" y="${y - 8}" class="main-text">${block.domain}</text><rect x="0" y="${y}" width="250" height="18" rx="9" class="progress-track"></rect><rect x="0" y="${y}" width="${width}" height="18" rx="9" fill="url(#barGradient)"></rect><text x="262" y="${y + 13}" class="muted-text">${block.progress}%</text>`;
  }).join("");
  target.innerHTML = `<svg class="chart-svg" viewBox="0 0 380 240"><defs><linearGradient id="barGradient" x1="0%" x2="100%"><stop offset="0%" stop-color="#62f5d4"></stop><stop offset="100%" stop-color="#59c6ff"></stop></linearGradient></defs><g transform="translate(24 16)">${bars}</g></svg>${renderLegend(blockAverages.map((block) => ({ label: block.domain, value: `${block.validated}/${block.total} validées`, color: "#62f5d4" })))}`;
}

function renderStudentChart(target, students) {
  target.innerHTML = renderProgressBars([...students].sort((a, b) => getStudentProgress(b) - getStudentProgress(a)).map((student) => ({
    label: student.name,
    progress: getStudentProgress(student),
    color: "#7f8cff"
  })));
}

function renderPfmpChart(target, summary) {
  target.innerHTML = renderProgressBars([
    { label: "PFMP saisies", progress: summary.rateWithCompany, color: "#63f597" },
    { label: "Conventions complètes", progress: summary.rateFullConvention, color: "#59c6ff" },
    { label: "Visites planifiées", progress: summary.rateVisitPlanned, color: "#f7c35f" },
    { label: "Dossiers complets", progress: summary.rateCompleteFile, color: "#ff657d" }
  ]);
}

function renderProgressBars(items) {
  const bars = items.map((item, index) => {
    const width = Math.round((item.progress / 100) * 250);
    const y = 24 + index * 46;
    return `<text x="0" y="${y}" class="main-text">${item.label}</text><rect x="0" y="${y + 10}" width="250" height="14" rx="7" class="progress-track"></rect><rect x="0" y="${y + 10}" width="${width}" height="14" rx="7" fill="${item.color}"></rect><text x="262" y="${y + 22}" class="muted-text">${item.progress}%</text>`;
  }).join("");
  return `<svg class="chart-svg" viewBox="0 0 380 ${Math.max(180, 60 + items.length * 46)}"><g transform="translate(24 12)">${bars}</g></svg>`;
}

function renderLegend(items) {
  return `<div class="chart-legend">${items.map((item) => `<div class="legend-item"><span class="legend-left"><span class="legend-dot" style="background:${item.color}"></span><span>${item.label}</span></span><strong>${item.value}</strong></div>`).join("")}</div>`;
}

function populateClassSelect(select) {
  const previous = select.value;
  select.innerHTML = app.classes.map((classItem) => `<option value="${classItem.id}">${classItem.name}</option>`).join("");
  if (previous && [...select.options].some((option) => option.value === previous)) select.value = previous;
}

function populateClassFilter(select) {
  const previous = select.value;
  select.innerHTML = `<option value="all">Toutes les classes</option>${app.classes.map((classItem) => `<option value="${classItem.id}">${classItem.name}</option>`).join("")}`;
  select.value = previous && [...select.options].some((option) => option.value === previous) ? previous : "all";
}

function populateSkillSelect(select) {
  select.innerHTML = skillCatalog.map((skill) => `<option value="${skill.id}">${skill.code} - ${skill.title}</option>`).join("");
}

function renderStatusOptions(selectedValue) {
  return Object.entries(levelLabels)
    .map(([value, label]) => `<option value="${value}"${value === selectedValue ? " selected" : ""}>${label}</option>`)
    .join("");
}

function getClassById(classId) {
  return app.classes.find((classItem) => classItem.id === classId);
}

function getSkillById(skillId) {
  return skillCatalog.find((skill) => skill.id === skillId);
}

function getSkillDomain(skill) {
  if (!skill) return referentialDomains[0];
  return skillDomainOverrides[skill.id] || skill.domain;
}

function getActivitySkillIds(activity) {
  if (!activity) return [];
  const ids = Array.isArray(activity.skillIds) && activity.skillIds.length
    ? activity.skillIds
    : [activity.skillId].filter(Boolean);
  return ids.filter((skillId, index) => getSkillById(skillId) && ids.indexOf(skillId) === index);
}

function getActivitySkills(activity) {
  return getActivitySkillIds(activity).map((skillId) => getSkillById(skillId)).filter(Boolean);
}

function getActivitySkillLabel(activity) {
  const skills = getActivitySkills(activity);
  return skills.length
    ? skills.map((skill) => `${skill.code} ${skill.title}`).join(" | ")
    : "Aucune compétence";
}

function getRequestedClassId() {
  try {
    const params = new URLSearchParams(window.location.search);
    const classId = params.get("class");
    return classId && getClassById(classId) ? classId : "";
  } catch {
    return "";
  }
}

function getRequestedDashboardView() {
  try {
    const params = new URLSearchParams(window.location.search);
    const view = params.get("view");
    return ["skills", "pfmp", "calendar"].includes(view) ? view : "skills";
  } catch {
    return "skills";
  }
}

function getRequestedEvaluationsView() {
  try {
    const params = new URLSearchParams(window.location.search);
    const view = params.get("view");
    return ["create", "session", "skills"].includes(view) ? view : "create";
  } catch {
    return "create";
  }
}

function getRequestedTemplateId() {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get("template") || "";
  } catch {
    return "";
  }
}

function getRequestedActivityDates() {
  try {
    const params = new URLSearchParams(window.location.search);
    return {
      startDate: params.get("dateStart") || "",
      endDate: params.get("dateEnd") || params.get("dateStart") || ""
    };
  } catch {
    return { startDate: "", endDate: "" };
  }
}

function getRequestedRemediationSkillId() {
  try {
    const params = new URLSearchParams(window.location.search);
    const skillId = params.get("skill") || "";
    return getSkillById(skillId) ? skillId : "";
  } catch {
    return "";
  }
}

function getClassNavLabel(classItem) {
  const name = normalizeText(classItem?.name || "");
  if (name.includes("term")) return "TCIEL";
  if (name.includes("prem")) return "1CIEL";
  if (name.includes("seconde") || name.includes("2nde")) return "2CIEL";
  return classItem?.name || "Classe";
}

function getStudentById(studentId) {
  return app.students.find((student) => student.id === studentId);
}

function getStudentPortfolioKey(student) {
  return normalizeText(student?.portfolioKey || student?.name || "");
}

function getStudentsByClass(classId) {
  return app.students.filter((student) => student.classId === classId);
}

function getStudentJourney(student) {
  const portfolioKey = getStudentPortfolioKey(student);
  if (!portfolioKey) return [student].filter(Boolean);
  return app.students
    .filter((item) => getStudentPortfolioKey(item) === portfolioKey)
    .sort((a, b) => {
      const order = getClassLevelOrder(a.classId) - getClassLevelOrder(b.classId);
      if (order !== 0) return order;
      return String(getClassById(a.classId)?.year || "").localeCompare(String(getClassById(b.classId)?.year || ""));
    });
}

function getClassLevelOrder(classId) {
  const label = normalizeText(getClassById(classId)?.name || "");
  if (label.includes("2") || label.includes("seconde")) return 1;
  if (label.includes("1") || label.includes("prem")) return 2;
  if (label.includes("term")) return 3;
  return 99;
}

function getActivitiesByClass(classId) {
  return app.evaluationActivities.filter((activity) => activity.classId === classId);
}

function getPfmpObservationLabels(studentId, skillId) {
  const periodObservations = PFMP_PERIODS
    .filter((period) => (getPfmpPeriodEntry(studentId, period.id).observedSkillIds || []).includes(skillId))
    .map((period) => period.label);
  const booklets = app.pfmpBooklets?.[studentId] || {};
  const bookletObservations = Object.entries(booklets)
    .filter(([, entry]) => entry?.skills?.[skillId] && !["non_evalue", "absent"].includes(entry.skills[skillId]))
    .map(([periodId]) => PFMP_PERIODS.find((period) => period.id === periodId)?.label || periodId);
  return [...new Set([...periodObservations, ...bookletObservations])];
}

function getCoverageSnapshot(classId) {
  const students = getStudentsByClass(classId);
  const activities = getActivitiesByClass(classId);
  const coverageBySkill = skillCatalog.map((skill) => {
    const activitiesCount = activities.filter((activity) => getActivitySkillIds(activity).includes(skill.id)).length;
    const pfmpLabels = students.flatMap((student) => getPfmpObservationLabels(student.id, skill.id));
    return {
      ...skill,
      domain: getSkillDomain(skill),
      activitiesCount,
      pfmpCount: pfmpLabels.length,
      covered: activitiesCount > 0 || pfmpLabels.length > 0
    };
  });
  const domains = referentialDomains.map((domain) => {
    const skills = coverageBySkill.filter((skill) => skill.domain === domain);
    return {
      domain,
      totalSkills: skills.length,
      coveredSkills: skills.filter((skill) => skill.covered).length,
      activitiesCount: skills.reduce((sum, skill) => sum + skill.activitiesCount, 0),
      pfmpCount: skills.reduce((sum, skill) => sum + skill.pfmpCount, 0)
    };
  });
  const coveredSkills = coverageBySkill.filter((skill) => skill.covered).length;
  return {
    coveredSkills,
    activitiesCount: activities.length,
    pfmpObserved: coverageBySkill.reduce((sum, skill) => sum + skill.pfmpCount, 0),
    coverageRate: skillCatalog.length ? Math.round((coveredSkills / skillCatalog.length) * 100) : 0,
    domains,
    weakSkills: coverageBySkill.filter((skill) => skill.activitiesCount === 0 && skill.pfmpCount === 0)
  };
}

function formatActivityDateRange(activity) {
  const start = activity?.startDate || activity?.date || "";
  const end = activity?.endDate || start;
  if (!start) return "Date non renseignée";
  if (!end || end === start) return start;
  return `${start} -> ${end}`;
}

function getDateRangeValues(startDate, endDate) {
  const start = parseSortableDate(startDate);
  const end = parseSortableDate(endDate || startDate);
  if (!start) return [];
  const safeEnd = end && end >= start ? end : start;
  const values = [];
  const cursor = new Date(start);
  while (cursor <= safeEnd) {
    values.push(cursor.toISOString().slice(0, 10));
    cursor.setDate(cursor.getDate() + 1);
  }
  return values;
}

function getActivityById(activityId) {
  return app.evaluationActivities.find((activity) => activity.id === activityId);
}

function getActivityIndicatorStatus(activity, studentId, indicatorId) {
  return activity?.evaluations?.[studentId]?.[indicatorId] || "non_evalue";
}

function setActivityIndicatorStatus(activityId, studentId, indicatorId, status) {
  const activity = getActivityById(activityId);
  if (!activity) return;
  if (!activity.evaluations[studentId]) activity.evaluations[studentId] = {};
  activity.evaluations[studentId][indicatorId] = status;
}

function getIndicatorAverage(activity, students, indicatorId) {
  if (!students.length) return 0;
  const maxScore = levelScores.acquis || 1;
  const total = students.reduce((sum, student) => sum + levelScores[getActivityIndicatorStatus(activity, student.id, indicatorId)], 0);
  return Math.round((total / (students.length * maxScore)) * 100);
}

function getActivityAverage(activity, students) {
  if (!activity || !students.length || !activity.indicators.length) return 0;
  const total = activity.indicators.reduce((sum, indicator) => sum + getIndicatorAverage(activity, students, indicator.id), 0);
  return Math.round(total / activity.indicators.length);
}

function renderIndicatorStatusBreakdown(activity, students, indicatorId) {
  const counts = Object.fromEntries(Object.keys(levelLabels).map((status) => [status, 0]));
  students.forEach((student) => {
    counts[getActivityIndicatorStatus(activity, student.id, indicatorId)] += 1;
  });
  return Object.entries(counts)
    .filter(([, count]) => count > 0)
    .map(([status, count]) => `${levelLabels[status]}: ${count}`)
    .join(" // ");
}

function getStudentProgress(student) {
  const total = skillCatalog.length * 4;
  const score = skillCatalog.reduce((sum, skill) => sum + levelScores[student.skills[skill.id]], 0);
  return Math.round((score / total) * 100);
}

function getClassProgress(classId) {
  const students = getStudentsByClass(classId);
  if (!students.length) return 0;
  return Math.round(students.reduce((sum, student) => sum + getStudentProgress(student), 0) / students.length);
}

function getStatusCounts(students) {
  const counts = { absent: 0, non_evalue: 0, non_acquis: 0, en_cours_acquisition: 0, partiellement_acquis: 0, acquis: 0 };
  students.forEach((student) => Object.values(student.skills).forEach((status) => { counts[status] += 1; }));
  return counts;
}

function getBlockAverages(students) {
  return referentialDomains.map((domain) => {
    const domainSkills = skillCatalog.filter((skill) => getSkillDomain(skill) === domain);
    const totalPossible = domainSkills.length * students.length * 4 || 1;
    const totalScore = students.reduce((sum, student) => sum + domainSkills.reduce((sub, skill) => sub + levelScores[student.skills[skill.id]], 0), 0);
    const validated = students.reduce((sum, student) => sum + domainSkills.filter((skill) => ["partiellement_acquis", "acquis"].includes(student.skills[skill.id])).length, 0);
    return { domain, total: domainSkills.length * students.length, validated, progress: Math.round((totalScore / totalPossible) * 100) };
  });
}

function getPfmpRecord(studentId) {
  if (!app.pfmpRecords[studentId]) app.pfmpRecords[studentId] = hydratePfmpRecord({}, getStudentById(studentId), app.classes);
  return app.pfmpRecords[studentId];
}

function getPfmpBookletRecord(studentId) {
  if (!app.pfmpBooklets[studentId]) app.pfmpBooklets[studentId] = hydratePfmpBookletRecord({});
  return app.pfmpBooklets[studentId];
}

function getPfmpBookletEntry(studentId, periodId) {
  const record = getPfmpBookletRecord(studentId);
  if (!record[periodId]) record[periodId] = createEmptyPfmpBookletEntry();
  return record[periodId];
}

function getPfmpPeriodEntry(studentId, periodId) {
  const record = getPfmpRecord(studentId);
  if (!record.periods[periodId]) record.periods[periodId] = createEmptyPfmpEntry();
  return record.periods[periodId];
}

function getPfmpCompletion(record) {
  return pfmpFields.filter((field) => record[field]).length;
}

function hasFullConvention(record) {
  return Boolean(record.conventionSignedCompany && record.conventionSignedParents && record.conventionSignedSchool);
}

function hasCompleteFile(record) {
  return Boolean(record.reportDate && record.bookletDate && record.attendanceDate);
}

function getPfmpSummary(students) {
  const total = students.length * PFMP_PERIODS.length || 1;
  const allEntries = students.flatMap((student) => PFMP_PERIODS.map((period) => getPfmpPeriodEntry(student.id, period.id)));
  const withCompany = allEntries.filter((entry) => entry.companyName).length;
  const fullConvention = allEntries.filter((entry) => hasFullConvention(entry)).length;
  const visitPlanned = allEntries.filter((entry) => entry.visitDate).length;
  const completeFile = allEntries.filter((entry) => hasCompleteFile(entry)).length;
  return {
    withCompany,
    fullConvention,
    visitPlanned,
    completeFile,
    rateWithCompany: Math.round((withCompany / total) * 100),
    rateFullConvention: Math.round((fullConvention / total) * 100),
    rateVisitPlanned: Math.round((visitPlanned / total) * 100),
    rateCompleteFile: Math.round((completeFile / total) * 100)
  };
}

function getHeatmapColor(ratio) {
  const safe = Math.max(0, Math.min(1, Number(ratio) || 0));
  if (safe < 0.2) return "rgba(255, 101, 125, 0.16)";
  if (safe < 0.45) return "rgba(247, 195, 95, 0.18)";
  if (safe < 0.7) return "rgba(89, 198, 255, 0.18)";
  return "rgba(99, 245, 151, 0.2)";
}

function parseCsv(text) {
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n").filter((line) => line.trim());
  if (!lines.length) return [];
  const delimiter = (lines[0].match(/;/g) || []).length >= (lines[0].match(/,/g) || []).length ? ";" : ",";
  return lines.map((line) => splitCsvLine(line, delimiter));
}

function splitCsvLine(line, delimiter) {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === "\"") {
      if (inQuotes && line[i + 1] === "\"") {
        current += "\"";
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function extractStudentNames(rows) {
  if (!rows.length) return [];
  const header = rows[0].map((cell) => cell.toLowerCase());
  const headerIndex = header.findIndex((cell) => ["nom", "name", "eleve", "élève", "student"].includes(cell));
  const dataRows = headerIndex >= 0 ? rows.slice(1) : rows;
  return dataRows
    .map((row) => {
      if (headerIndex >= 0) return row[headerIndex] || "";
      return row[0] || "";
    })
    .map((value) => value.trim())
    .filter(Boolean);
}

function exportSkillsWorkbook(classItem, students) {
  if (!classItem) return;
  const headers = ["Classe", "Élève", ...skillCatalog.map((skill) => `${skill.code} - ${skill.title}`), "Progression"];
  const rows = students.map((student) => [
    classItem.name,
    student.name,
    ...skillCatalog.map((skill) => levelLabels[student.skills[skill.id]]),
    `${getStudentProgress(student)}%`
  ]);
  downloadExcelTable(`${classItem.name} - bilan competences.xls`, "Bilan compétences", headers, rows);
}

function exportPfmpWorkbook(classItem, students) {
  if (!classItem) return;
  const headers = [
    "Classe", "Élève", "Période", "Entreprise", "Commentaire", "Adresse", "Tuteur", "Mail tuteur", "Téléphone tuteur",
    "Convention transmise", "Convention signée entreprise", "Convention signée parents", "Convention signée lycée",
    "Professeur référent", "Date de visite", "Rapport rendu", "Livret d'évaluation", "Fiche de présence"
  ];
  const rows = students.flatMap((student) =>
    PFMP_PERIODS.map((period) => {
      const entry = getPfmpPeriodEntry(student.id, period.id);
      return [
        classItem.name,
        student.name,
        period.label,
        entry.companyName,
        entry.comment,
        entry.address,
        entry.tutorName,
        entry.tutorEmail,
        entry.tutorPhone,
        entry.conventionSent,
        entry.conventionSignedCompany,
        entry.conventionSignedParents,
        entry.conventionSignedSchool,
        entry.teacher,
        entry.visitDate,
        entry.reportDate,
        entry.bookletDate,
        entry.attendanceDate
      ];
    })
  );
  downloadExcelTable(`${classItem.name} - suivi PFMP.xls`, "Suivi PFMP", headers, rows);
}

function exportPfmpWorkbookEnhanced(classItem, students) {
  if (!classItem) return;
  const headers = [
    "Classe", "Eleve", "Periode", "Entreprise", "Commentaire", "Adresse", "Tuteur", "Mail tuteur", "Telephone tuteur",
    "Convention transmise", "Convention signee entreprise", "Convention signee parents", "Convention signee lycee",
    "Professeur referent", "Date de visite", "Rapport rendu", "Livret d'evaluation", "Fiche de presence", "Competences observees"
  ];
  const rows = students.flatMap((student) =>
    PFMP_PERIODS.map((period) => {
      const entry = getPfmpPeriodEntry(student.id, period.id);
      return [
        classItem.name,
        student.name,
        period.label,
        entry.companyName,
        entry.comment,
        entry.address,
        entry.tutorName,
        entry.tutorEmail,
        entry.tutorPhone,
        entry.conventionSent,
        entry.conventionSignedCompany,
        entry.conventionSignedParents,
        entry.conventionSignedSchool,
        entry.teacher,
        entry.visitDate,
        entry.reportDate,
        entry.bookletDate,
        entry.attendanceDate,
        (entry.observedSkillIds || []).map((skillId) => getSkillById(skillId)?.code).filter(Boolean).join(" | ")
      ];
    })
  );
  downloadExcelTable(`${classItem.name} - suivi PFMP.xls`, "Suivi PFMP", headers, rows);
}

function exportStudentAnnualWorkbook(student) {
  const classItem = getClassById(student.classId);
  if (!classItem) return;
  const headers = ["Eleve", "Classe", "Annee", "Competence", "Domaine", "Niveau"];
  const rows = skillCatalog.map((skill) => [
    student.name,
    classItem.name,
    classItem.year || "",
    `${skill.code} - ${skill.title}`,
    getSkillDomain(skill),
    levelLabels[student.skills[skill.id]] || ""
  ]);
  rows.push(["", "", "", "Progression annuelle", "", `${getStudentProgress(student)}%`]);
  downloadExcelTable(`${student.name} - bilan annuel.xls`, "Bilan annuel", headers, rows);
}

function exportStudentCycleWorkbook(student) {
  const journey = getStudentJourney(student);
  const headers = ["Eleve", "Classe", "Annee", ...skillCatalog.map((skill) => skill.code), "Progression"];
  const rows = journey.map((item) => {
    const classItem = getClassById(item.classId);
    return [
      item.name,
      classItem?.name || "",
      classItem?.year || "",
      ...skillCatalog.map((skill) => levelLabels[item.skills[skill.id]] || ""),
      `${getStudentProgress(item)}%`
    ];
  });
  const average = journey.length ? Math.round(journey.reduce((sum, item) => sum + getStudentProgress(item), 0) / journey.length) : 0;
  rows.push(["", "", "", ...skillCatalog.map((skill) => {
    const statuses = journey.map((item) => item.skills[skill.id]).filter(Boolean);
    return statuses[statuses.length - 1] ? levelLabels[statuses[statuses.length - 1]] : "";
  }), `${average}% moyen`]);
  downloadExcelTable(`${student.name} - synthese 3 ans.xls`, "Synthese 3 ans", headers, rows);
}

function downloadExcelTable(filename, sheetName, headers, rows) {
  const statusCellColors = {
    absent: "#d9d9d9",
    non_evalue: "#5b9bd5",
    non_acquis: "#ff4d4f",
    en_cours_acquisition: "#f5a623",
    partiellement_acquis: "#f8e71c",
    acquis: "#63be7b"
  };

  const labelToStatus = Object.fromEntries(Object.entries(levelLabels).map(([key, label]) => [label, key]));
  const escapeCell = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const renderCell = (value) => {
    const statusKey = labelToStatus[String(value ?? "")];
    const background = statusKey ? statusCellColors[statusKey] : "";
    const color = statusKey === "non_evalue" ? "#ffffff" : "#111111";
    const style = background ? ` style="background:${background};color:${color};font-weight:700;"` : "";
    return `<td${style}>${escapeCell(value)}</td>`;
  };

  const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="UTF-8">
        <xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${escapeCell(sheetName)}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml>
      </head>
      <body>
        <table>
          <tr>${headers.map((header) => `<th>${escapeCell(header)}</th>`).join("")}</tr>
          ${rows.map((row) => `<tr>${row.map((cell) => renderCell(cell)).join("")}</tr>`).join("")}
        </table>
      </body>
    </html>
  `;

  const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function slugify(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function getRoleLabel(role) {
  return roleCatalog.find((item) => item.value === role)?.label || "Professeur";
}

function formatRole(role) {
  if (role === "systeme") return "Système";
  return getRoleLabel(role);
}

function getTeacherRoleValues() {
  return roleCatalog.map((role) => role.value);
}

function hasPermission(permission) {
  const role = getSession()?.role || "lecture";
  return rolePermissions[role]?.has(permission) || false;
}

function enforcePermission(permission, ...elements) {
  if (hasPermission(permission)) return;
  elements.filter(Boolean).forEach((element) => {
    if ("disabled" in element) element.disabled = true;
    element.classList?.add("is-disabled");
  });
}

function logAction(action, target = "", detail = "") {
  const session = getSession();
  app.activityLog.unshift({
    id: slugify(`log-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`),
    timestamp: new Date().toISOString(),
    actor: session?.username || "Système",
    role: session?.role || "systeme",
    action,
    target,
    detail
  });
  app.activityLog = app.activityLog.slice(0, 250);
}

function formatLogTimestamp(value) {
  return new Date(value).toLocaleString("fr-FR", {
    dateStyle: "short",
    timeStyle: "short"
  });
}

function getTeacherAccounts() {
  const primaryAdminId = getAccountByRole("admin")?.id;
  return app.accounts.filter((account) => account.id !== primaryAdminId);
}

function updateAccount(accountId, fields) {
  const account = getAccountById(accountId);
  if (!account) return;
  const previousUsername = fields.previousUsername || account.username;
  account.username = fields.username;
  account.password = fields.password;
  account.role = fields.role || account.role;
  account.label = getRoleLabel(account.role);
  const session = getSession();
  if (session?.username === previousUsername) {
    setSession({ username: account.username, role: account.role, label: account.label });
  }
  persistAppData();
}

function addTeacherAccount(username, password, role = "professeur") {
  const account = {
    id: slugify(`teacher-${username}-${Date.now()}`),
    username,
    password,
    role,
    label: getRoleLabel(role)
  };
  app.accounts.push(account);
  persistAppData();
  return account;
}

function removeTeacherAccount(accountId) {
  const primaryAdminId = getAccountByRole("admin")?.id;
  app.accounts = app.accounts.filter((account) => account.id === primaryAdminId || account.id !== accountId);
  persistAppData();
}

function setActivityIndicatorStatus(activityId, studentId, indicatorId, status) {
  const activity = getActivityById(activityId);
  if (!activity) return;
  if (!activity.evaluations[studentId]) activity.evaluations[studentId] = {};
  const previous = activity.evaluations[studentId][indicatorId] || "non_evalue";
  activity.evaluations[studentId][indicatorId] = status;
  if (previous !== status) {
    const student = getStudentById(studentId);
    const indicator = activity.indicators.find((item) => item.id === indicatorId);
    logAction("Évaluation saisie", student?.name || studentId, `${activity.title} // ${indicator?.label || indicatorId} // ${levelLabels[status]}`);
  }
}

function initAccountsPage() {
  bindProtectedChrome();
  const adminForm = document.querySelector("#admin-account-form");
  const teacherForm = document.querySelector("#teacher-account-form");
  const adminUsername = document.querySelector("#admin-username");
  const adminPassword = document.querySelector("#admin-password");
  const teacherUsername = document.querySelector("#teacher-username");
  const teacherPassword = document.querySelector("#teacher-password");
  const teacherRole = document.querySelector("#teacher-role");
  const feedback = document.querySelector("#accounts-feedback");
  const accountsSummary = document.querySelector("#accounts-summary");
  const teacherAccountsList = document.querySelector("#teacher-accounts-list");
  const activityLogList = document.querySelector("#activity-log-list");

  teacherRole.innerHTML = roleCatalog
    .filter((role) => role.value !== "admin")
    .map((role) => `<option value="${role.value}">${role.label}</option>`)
    .join("");
  teacherRole.value = "professeur";

  const adminAccount = getAccountByRole("admin");
  adminUsername.value = adminAccount.username;
  adminPassword.value = adminAccount.password;

  adminForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!adminUsername.value.trim() || !adminPassword.value.trim()) return;
    updateAccount(adminAccount.id, {
      username: adminUsername.value.trim(),
      password: adminPassword.value.trim(),
      previousUsername: adminAccount.username
    });
    logAction("Compte admin mis à jour", adminUsername.value.trim(), "Identifiant ou mot de passe modifié");
    feedback.textContent = "Compte administrateur mis à jour.";
    renderAdministration();
  });

  teacherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!teacherUsername.value.trim() || !teacherPassword.value.trim()) return;
    const account = addTeacherAccount(teacherUsername.value.trim(), teacherPassword.value.trim(), teacherRole.value);
    logAction("Compte créé", account.username, `Rôle: ${getRoleLabel(account.role)}`);
    teacherForm.reset();
    teacherRole.value = "professeur";
    feedback.textContent = "Compte ajouté.";
    renderAdministration();
  });

  renderAdministration();

  function renderAdministration() {
    const teachers = getTeacherAccounts();
    const countsByRole = roleCatalog
      .filter((role) => role.value !== "admin")
      .map((role) => ({
        label: role.label,
        count: teachers.filter((teacher) => teacher.role === role.value).length
      }));

    accountsSummary.innerHTML = `
      <article class="summary-card">
        <h3>Admin</h3>
        <p class="muted-copy">${adminAccount.username}</p>
      </article>
      <article class="summary-card">
        <h3>Comptes actifs</h3>
        <p class="muted-copy">${teachers.length} compte(s)</p>
      </article>
      ${countsByRole.map((item) => `
        <article class="summary-card">
          <h3>${item.label}</h3>
          <p class="muted-copy">${item.count} compte(s)</p>
        </article>
      `).join("")}
    `;

    teacherAccountsList.innerHTML = teachers.length ? teachers.map((teacher) => `
      <article class="directory-row compact">
        <div>
          <strong>${teacher.username}</strong>
          <p>${teacher.label}</p>
        </div>
        <div class="student-badges">
          <button class="ghost-button teacher-edit" type="button" data-id="${teacher.id}">Modifier</button>
          <button class="ghost-button teacher-delete" type="button" data-id="${teacher.id}">Supprimer</button>
        </div>
      </article>
    `).join("") : `<article class="summary-card"><h3>Aucun compte</h3><p class="muted-copy">Ajoute un compte enseignant avec le formulaire ci-dessus.</p></article>`;

    activityLogList.innerHTML = app.activityLog.length ? app.activityLog.slice(0, 30).map((entry) => `
      <article class="directory-row compact">
        <div>
          <strong>${entry.action}</strong>
          <p>${entry.actor} // ${formatRole(entry.role)} // ${formatLogTimestamp(entry.timestamp)}</p>
          <p>${entry.target}${entry.detail ? ` // ${entry.detail}` : ""}</p>
        </div>
      </article>
    `).join("") : `<article class="summary-card"><h3>Aucune activité</h3><p class="muted-copy">Le journal se remplira automatiquement dès les premières actions.</p></article>`;

    teacherAccountsList.querySelectorAll(".teacher-edit").forEach((button) => {
      button.addEventListener("click", () => {
        const teacher = getAccountById(button.dataset.id);
        if (!teacher) return;
        const username = window.prompt("Nouvel identifiant du compte", teacher.username);
        if (!username) return;
        const password = window.prompt("Nouveau mot de passe du compte", teacher.password);
        if (!password) return;
        const role = window.prompt(`Nouveau rôle (${getTeacherRoleValues().join(", ")})`, teacher.role);
        if (!role || !getTeacherRoleValues().includes(role.trim())) return;
        updateAccount(teacher.id, {
          username: username.trim(),
          password: password.trim(),
          role: role.trim(),
          previousUsername: teacher.username
        });
        logAction("Compte modifié", username.trim(), `Rôle: ${getRoleLabel(role.trim())}`);
        feedback.textContent = "Compte modifié.";
        renderAdministration();
      });
    });

    teacherAccountsList.querySelectorAll(".teacher-delete").forEach((button) => {
      button.addEventListener("click", () => {
        const removed = getAccountById(button.dataset.id);
        removeTeacherAccount(button.dataset.id);
        if (removed) logAction("Compte supprimé", removed.username, removed.label);
        feedback.textContent = "Compte supprimé.";
        renderAdministration();
      });
    });
  }
}

;(function () {
  printHtmlDocument = function(title, html) {
    const printWindow = window.open('', '_blank', 'width=1200,height=900');
    if (!printWindow) return false;
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    const triggerPrint = () => {
      try {
        printWindow.focus();
        printWindow.print();
      } catch {}
    };
    if (printWindow.document.readyState === 'complete') {
      setTimeout(triggerPrint, 350);
    } else {
      printWindow.addEventListener('load', () => setTimeout(triggerPrint, 350), { once: true });
      setTimeout(triggerPrint, 900);
    }
    return true;
  };

  buildActivityPdfHtml = function(activity, classId) {
    const classItem = getClassById(classId);
    const skills = getActivitySkills(activity);
    const skillCodes = skills.map((item) => item.code).join(', ');
    const skillTitles = skills.map((item) => item.title).join(' // ');
    const students = getStudentsByClass(classId);
    const summaryHtml = `
      <div class="card">
        <p><strong>Classe :</strong> ${escapeHtml(classItem?.name || '')}</p>
        <p><strong>Competences :</strong> ${escapeHtml(`${skillCodes} ${skillTitles}`.trim() || 'Non renseignees')}</p>
        <p><strong>Periode :</strong> ${escapeHtml(formatActivityDateRange(activity) || 'Non renseignee')}</p>
        <p><strong>Moyenne de seance :</strong> ${getActivityAverage(activity, students)}%</p>
        <p><strong>Indicateurs :</strong> ${activity.indicators.length}</p>
        <p><strong>Commentaire :</strong> ${escapeHtml(activity.comment || '-')}</p>
      </div>
    `;
    const tableHtml = `
      <table>
        <thead>
          <tr>
            <th>Eleve</th>
            ${activity.indicators.map((indicator) => `<th>${escapeHtml(indicator.label)}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${students.map((student) => `
            <tr>
              <td>${escapeHtml(student.name)}</td>
              ${activity.indicators.map((indicator) => `<td>${escapeHtml(levelLabels[getActivityIndicatorStatus(activity, student.id, indicator.id)] || 'Non evalue')}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    const indicatorsHtml = `
      <div class="grid">
        ${activity.indicators.map((indicator) => `
          <div class="card">
            <p><strong>${escapeHtml(indicator.label)}</strong></p>
            <p>Moyenne : ${getIndicatorAverage(activity, students, indicator.id)}%</p>
            <p>${escapeHtml(renderIndicatorStatusBreakdown(activity, students, indicator.id))}</p>
          </div>
        `).join('')}
      </div>
    `;
    return buildPrintShell(
      `${activity.type} - ${activity.title}`,
      `${classItem?.name || ''} - ${skillCodes}`,
      `${summaryHtml}<h2>Grille de saisie</h2>${tableHtml}<h2>Bilan par indicateur</h2>${indicatorsHtml}`
    );
  };

  buildActivitySynthesisPdfHtml = function(classId) {
    const classItem = getClassById(classId);
    const activities = getActivitiesByClass(classId);
    const students = getStudentsByClass(classId);
    const rows = activities.map((activity) => {
      const skillCodes = getActivitySkills(activity).map((item) => item.code).join(', ');
      return `
        <tr>
          <td>${escapeHtml(activity.type)}</td>
          <td>${escapeHtml(activity.title)}</td>
          <td>${escapeHtml(skillCodes)}</td>
          <td>${escapeHtml(formatActivityDateRange(activity) || 'Non renseignee')}</td>
          <td>${activity.indicators.length}</td>
          <td>${getActivityAverage(activity, students)}%</td>
        </tr>
      `;
    }).join('');
    return buildPrintShell(
      `Synthese des seances - ${classItem?.name || ''}`,
      `${activities.length} seance(s) enregistree(s)`,
      `
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Seance</th>
              <th>Competences</th>
              <th>Periode</th>
              <th>Indicateurs</th>
              <th>Moyenne</th>
            </tr>
          </thead>
          <tbody>${rows || '<tr><td colspan="6">Aucune seance enregistree.</td></tr>'}</tbody>
        </table>
      `
    );
  };

  buildCycleDomainSummaryHeaders = function(journey) {
    return ['Domaine', ...journey.map((item) => {
      const classItem = getClassById(item.classId);
      return `${classItem?.name || item.classId} ${classItem?.year || ''}`.trim();
    }), 'Synthese'];
  };

  getCycleDomainSummaryRows = function(student) {
    const journey = getStudentJourney(student);
    return referentialDomains.map((domain) => {
      const domainSkills = skillCatalog.filter((skill) => getSkillDomain(skill) === domain);
      const values = journey.map((item) => {
        const score = domainSkills.reduce((sum, skill) => sum + (levelScores[item.skills[skill.id]] || 0), 0);
        const max = domainSkills.length * (levelScores.acquis || 1) || 1;
        return `${Math.round((score / max) * 100)}%`;
      });
      const average = values.length ? `${Math.round(values.reduce((sum, value) => sum + Number.parseInt(value, 10), 0) / values.length)}%` : '';
      return [domain, ...values, average];
    });
  };

  exportStudentAnnualWorkbook = function(student) {
    const classItem = getClassById(student.classId);
    if (!classItem) return;
    const headers = ['Eleve', 'Classe', 'Annee', 'Competence', 'Domaine', 'Niveau'];
    const rows = skillCatalog.map((skill) => [
      student.name,
      classItem.name,
      classItem.year || '',
      `${skill.code} - ${skill.title}`,
      getSkillDomain(skill),
      levelLabels[student.skills[skill.id]] || ''
    ]);
    rows.push(['', '', '', 'Progression annuelle', '', `${getStudentProgress(student)}%`]);
    getBlockAverages([student]).forEach((block) => {
      rows.push(['', '', '', `Synthese bloc - ${block.domain}`, block.domain, `${block.progress}%`]);
    });
    downloadExcelTable(`${student.name} - bilan annuel.xls`, 'Bilan annuel', headers, rows);
  };

  exportStudentCycleWorkbook = function(student) {
    const journey = getStudentJourney(student);
    const headers = ['Eleve', 'Classe', 'Annee', ...skillCatalog.map((skill) => skill.code), 'Progression'];
    const rows = journey.map((item) => {
      const classItem = getClassById(item.classId);
      return [
        item.name,
        classItem?.name || '',
        classItem?.year || '',
        ...skillCatalog.map((skill) => levelLabels[item.skills[skill.id]] || ''),
        `${getStudentProgress(item)}%`
      ];
    });
    const average = journey.length ? Math.round(journey.reduce((sum, item) => sum + getStudentProgress(item), 0) / journey.length) : 0;
    rows.push(['', '', '', ...skillCatalog.map((skill) => {
      const statuses = journey.map((item) => item.skills[skill.id]).filter(Boolean);
      return statuses[statuses.length - 1] ? levelLabels[statuses[statuses.length - 1]] : '';
    }), `${average}% moyen`]);
    rows.push([]);
    rows.push(buildCycleDomainSummaryHeaders(journey));
    getCycleDomainSummaryRows(student).forEach((row) => rows.push(row));
    downloadExcelTable(`${student.name} - synthese 3 ans.xls`, 'Synthese 3 ans', headers, rows);
  };

  if (document.body?.dataset?.page === 'evaluations') {
    window.setTimeout(() => {
      const exportButton = document.querySelector('#activity-export-pdf');
      const synthesisButton = document.querySelector('#activity-synthesis-pdf');
      const feedback = document.querySelector('#activity-feedback');
      if (exportButton && !exportButton.dataset.finalBound) {
        const replacement = exportButton.cloneNode(true);
        exportButton.replaceWith(replacement);
        replacement.dataset.finalBound = 'true';
        replacement.addEventListener('click', () => {
          const classSelect = document.querySelector('#session-class-select');
          const activitySelect = document.querySelector('#activity-select');
          const classId = classSelect?.value || app.classes[0]?.id || '';
          const activity = getActivityById(activitySelect?.value) || getActivitiesByClass(classId)[0];
          if (!activity) {
            if (feedback) feedback.textContent = 'Aucune seance a exporter.';
            return;
          }
          const opened = printHtmlDocument(`${activity.type} - ${activity.title}`, buildActivityPdfHtml(activity, classId));
          if (!opened && feedback) {
            feedback.textContent = 'Le navigateur a bloque la fenetre PDF. Autorise les popups puis recommence.';
          }
        });
      }
      if (synthesisButton && !synthesisButton.dataset.finalBound) {
        const replacement = synthesisButton.cloneNode(true);
        synthesisButton.replaceWith(replacement);
        replacement.dataset.finalBound = 'true';
        replacement.addEventListener('click', () => {
          const classSelect = document.querySelector('#session-class-select');
          const classId = classSelect?.value || app.classes[0]?.id || '';
          const classItem = getClassById(classId);
          if (!classItem) {
            if (feedback) feedback.textContent = 'Aucune classe selectionnee.';
            return;
          }
          const opened = printHtmlDocument(`Synthese ${classItem.name}`, buildActivitySynthesisPdfHtml(classId));
          if (!opened && feedback) {
            feedback.textContent = 'Le navigateur a bloque la fenetre PDF. Autorise les popups puis recommence.';
          }
        });
      }
    }, 0);
  }
})();

;(function () {
  function getJourneyItemForLevel(student, levelOrder) {
    return getStudentJourney(student).find((item) => getClassLevelOrder(item.classId) === levelOrder) || null;
  }

  function getJourneyItemsForCycle(student) {
    return getStudentJourney(student).filter((item) => {
      const levelOrder = getClassLevelOrder(item.classId);
      return levelOrder === 1 || levelOrder === 2 || levelOrder === 3;
    });
  }

  function getLevelExportLabel(levelOrder) {
    if (levelOrder === 1) return "Seconde";
    if (levelOrder === 2) return "Premiere";
    if (levelOrder === 3) return "Terminale";
    return "Annee";
  }

  function getJourneyDomainSummaryRowsFromItems(journey) {
    return referentialDomains.map((domain) => {
      const domainSkills = skillCatalog.filter((skill) => getSkillDomain(skill) === domain);
      const values = journey.map((item) => {
        const score = domainSkills.reduce((sum, skill) => sum + (levelScores[item.skills[skill.id]] || 0), 0);
        const max = domainSkills.length * (levelScores.acquis || 1) || 1;
        return `${Math.round((score / max) * 100)}%`;
      });
      const average = values.length
        ? `${Math.round(values.reduce((sum, value) => sum + Number.parseInt(value, 10), 0) / values.length)}%`
        : "";
      return [domain, ...values, average];
    });
  }

  function exportStudentSkillsYearWorkbook(student, levelOrder) {
    const yearStudent = getJourneyItemForLevel(student, levelOrder);
    const classItem = getClassById(yearStudent?.classId);
    if (!yearStudent || !classItem) return false;

    const yearLabel = getLevelExportLabel(levelOrder);
    const headers = ["Eleve", "Classe", "Annee", "Competence", "Domaine", "Niveau"];
    const rows = skillCatalog.map((skill) => [
      yearStudent.name,
      classItem.name,
      classItem.year || "",
      `${skill.code} - ${skill.title}`,
      getSkillDomain(skill),
      levelLabels[yearStudent.skills[skill.id]] || ""
    ]);

    rows.push(["", "", "", `Progression ${yearLabel.toLowerCase()}`, "", `${getStudentProgress(yearStudent)}%`]);
    getBlockAverages([yearStudent]).forEach((block) => {
      rows.push(["", "", "", `Synthese bloc - ${block.domain}`, block.domain, `${block.progress}%`]);
    });

    downloadExcelTable(`${yearStudent.name} - competences ${yearLabel.toLowerCase()}.xls`, `Competences ${yearLabel}`, headers, rows);
    return true;
  }

  function exportStudentSkillsCycleSynthesisWorkbook(student) {
    const journey = getJourneyItemsForCycle(student);
    if (!journey.length) return false;

    const headers = ["Eleve", "Classe", "Annee", ...skillCatalog.map((skill) => skill.code), "Progression"];
    const rows = journey.map((item) => {
      const classItem = getClassById(item.classId);
      return [
        item.name,
        classItem?.name || "",
        classItem?.year || "",
        ...skillCatalog.map((skill) => levelLabels[item.skills[skill.id]] || ""),
        `${getStudentProgress(item)}%`
      ];
    });

    const average = journey.length
      ? Math.round(journey.reduce((sum, item) => sum + getStudentProgress(item), 0) / journey.length)
      : 0;

    rows.push([
      "",
      "",
      "",
      ...skillCatalog.map((skill) => {
        const statuses = journey.map((item) => item.skills[skill.id]).filter(Boolean);
        return statuses[statuses.length - 1] ? levelLabels[statuses[statuses.length - 1]] : "";
      }),
      `${average}% moyen`
    ]);
    rows.push([]);
    rows.push(buildCycleDomainSummaryHeaders(journey));
    getJourneyDomainSummaryRowsFromItems(journey).forEach((row) => rows.push(row));

    downloadExcelTable(`${student.name} - synthese competences 3 ans.xls`, "Synthese competences", headers, rows);
    return true;
  }

  function getPfmpPeriodsForLevel(levelOrder) {
    if (levelOrder === 1) return PFMP_PERIODS.filter((period) => period.id.startsWith("seconde_"));
    if (levelOrder === 2) return PFMP_PERIODS.filter((period) => period.id.startsWith("premiere_"));
    if (levelOrder === 3) return PFMP_PERIODS.filter((period) => period.id.startsWith("terminale_"));
    return [];
  }

  function buildPfmpWorkbookRowsForStudent(student, periods) {
    const classItem = getClassById(student.classId);
    return periods.map((period) => {
      const entry = getPfmpPeriodEntry(student.id, period.id);
      return [
        classItem?.name || "",
        student.name,
        classItem?.year || "",
        period.label,
        entry.companyName,
        entry.comment,
        entry.address,
        entry.tutorName,
        entry.tutorEmail,
        entry.tutorPhone,
        entry.conventionSent,
        entry.conventionSignedCompany,
        entry.conventionSignedParents,
        entry.conventionSignedSchool,
        entry.teacher,
        entry.visitDate,
        entry.reportDate,
        entry.bookletDate,
        entry.attendanceDate,
        (entry.observedSkillIds || []).map((skillId) => getSkillById(skillId)?.code).filter(Boolean).join(" | ")
      ];
    });
  }

  function exportStudentPfmpYearWorkbook(student, levelOrder) {
    const yearStudent = getJourneyItemForLevel(student, levelOrder);
    if (!yearStudent) return false;
    const periods = getPfmpPeriodsForLevel(levelOrder);
    if (!periods.length) return false;

    const yearLabel = getLevelExportLabel(levelOrder);
    const headers = [
      "Classe", "Eleve", "Annee", "Periode", "Entreprise", "Commentaire", "Adresse", "Tuteur", "Mail tuteur", "Telephone tuteur",
      "Convention transmise", "Convention signee entreprise", "Convention signee parents", "Convention signee lycee",
      "Professeur referent", "Date de visite", "Rapport rendu", "Livret d'evaluation", "Fiche de presence", "Competences observees"
    ];
    const rows = buildPfmpWorkbookRowsForStudent(yearStudent, periods);
    downloadExcelTable(`${yearStudent.name} - pfmp ${yearLabel.toLowerCase()}.xls`, `PFMP ${yearLabel}`, headers, rows);
    return true;
  }

  function exportStudentPfmpCycleSynthesisWorkbook(student) {
    const journey = getJourneyItemsForCycle(student);
    if (!journey.length) return false;

    const headers = [
      "Classe", "Eleve", "Annee", "Periode", "Entreprise", "Commentaire", "Adresse", "Tuteur", "Mail tuteur", "Telephone tuteur",
      "Convention transmise", "Convention signee entreprise", "Convention signee parents", "Convention signee lycee",
      "Professeur referent", "Date de visite", "Rapport rendu", "Livret d'evaluation", "Fiche de presence", "Competences observees"
    ];
    const rows = journey.flatMap((item) => buildPfmpWorkbookRowsForStudent(item, getPfmpPeriodsForLevel(getClassLevelOrder(item.classId))));
    downloadExcelTable(`${student.name} - synthese pfmp 3 ans.xls`, "Synthese PFMP", headers, rows);
    return true;
  }

  function bindClickWithClone(button, handler) {
    if (!button) return null;
    const replacement = button.cloneNode(true);
    button.replaceWith(replacement);
    replacement.addEventListener("click", handler);
    return replacement;
  }

  function updateActionMeta(target, message) {
    if (target) target.textContent = message;
  }

  const originalInitBulletinPage = initBulletinPage;
  initBulletinPage = function() {
    originalInitBulletinPage();

    const printButton = document.querySelector("#print-bulletin-button");
    const classSelect = document.querySelector("#bulletin-class-select");
    const studentSelect = document.querySelector("#bulletin-student-select");
    const meta = document.querySelector("#bulletin-meta");
    if (!printButton?.parentElement || !classSelect || !studentSelect) return;

    let secondeButton = document.querySelector("#export-bulletin-seconde");
    let premiereButton = document.querySelector("#export-bulletin-premiere");
    let terminaleButton = document.querySelector("#export-bulletin-terminale");
    let synthesisButton = document.querySelector("#export-bulletin-synthesis");

    if (!secondeButton) {
      secondeButton = document.createElement("button");
      secondeButton.id = "export-bulletin-seconde";
      secondeButton.className = "ghost-button";
      secondeButton.type = "button";
      secondeButton.textContent = "Exporter competences 2nde";
      printButton.parentElement.insertBefore(secondeButton, printButton);
    }

    if (!premiereButton) {
      premiereButton = document.createElement("button");
      premiereButton.id = "export-bulletin-premiere";
      premiereButton.className = "ghost-button";
      premiereButton.type = "button";
      premiereButton.textContent = "Exporter competences Premiere";
      printButton.parentElement.insertBefore(premiereButton, printButton);
    }

    if (!terminaleButton) {
      terminaleButton = document.createElement("button");
      terminaleButton.id = "export-bulletin-terminale";
      terminaleButton.className = "ghost-button";
      terminaleButton.type = "button";
      terminaleButton.textContent = "Exporter competences Terminale";
      printButton.parentElement.insertBefore(terminaleButton, printButton);
    }

    if (!synthesisButton) {
      synthesisButton = document.createElement("button");
      synthesisButton.id = "export-bulletin-synthesis";
      synthesisButton.className = "ghost-button";
      synthesisButton.type = "button";
      synthesisButton.textContent = "Exporter synthese competences 3 ans";
      printButton.parentElement.insertBefore(synthesisButton, printButton);
    }

    const legacyAnnual = document.querySelector("#export-bulletin-annual");
    const legacyCycle = document.querySelector("#export-bulletin-cycle");
    if (legacyAnnual) legacyAnnual.style.display = "none";
    if (legacyCycle) legacyCycle.style.display = "none";

    bindClickWithClone(secondeButton, () => {
      const classId = classSelect.value || app.classes[0]?.id || "";
      const student = getStudentById(studentSelect.value) || getStudentsByClass(classId)[0];
      if (!student) return;
      if (!exportStudentSkillsYearWorkbook(student, 1)) {
        updateActionMeta(meta, "Aucune donnee 2nde disponible pour cet eleve.");
      }
    });

    bindClickWithClone(premiereButton, () => {
      const classId = classSelect.value || app.classes[0]?.id || "";
      const student = getStudentById(studentSelect.value) || getStudentsByClass(classId)[0];
      if (!student) return;
      if (!exportStudentSkillsYearWorkbook(student, 2)) {
        updateActionMeta(meta, "Aucune donnee Premiere disponible pour cet eleve.");
      }
    });

    bindClickWithClone(terminaleButton, () => {
      const classId = classSelect.value || app.classes[0]?.id || "";
      const student = getStudentById(studentSelect.value) || getStudentsByClass(classId)[0];
      if (!student) return;
      if (!exportStudentSkillsYearWorkbook(student, 3)) {
        updateActionMeta(meta, "Aucune donnee Terminale disponible pour cet eleve.");
      }
    });

    bindClickWithClone(synthesisButton, () => {
      const classId = classSelect.value || app.classes[0]?.id || "";
      const student = getStudentById(studentSelect.value) || getStudentsByClass(classId)[0];
      if (!student) return;
      if (!exportStudentSkillsCycleSynthesisWorkbook(student)) {
        updateActionMeta(meta, "Aucune synthese 3 ans disponible pour cet eleve.");
      }
    });
  };

  const originalInitPfmpPageFinal = initPfmpPageFinal;
  initPfmpPageFinal = function() {
    originalInitPfmpPageFinal();

    const exportButton = document.querySelector("#export-pfmp-button");
    const classSelect = document.querySelector("#pfmp-class-select");
    const studentSelect = document.querySelector("#pfmp-student-select");
    if (!exportButton?.parentElement || !classSelect || !studentSelect) return;

    let yearToolbar = document.querySelector("#pfmp-year-export-toolbar");
    if (!yearToolbar) {
      yearToolbar = document.createElement("div");
      yearToolbar.id = "pfmp-year-export-toolbar";
      yearToolbar.className = "student-badges";
      yearToolbar.innerHTML = `
        <button id="export-pfmp-seconde" class="ghost-button" type="button">Exporter PFMP 2nde</button>
        <button id="export-pfmp-premiere" class="ghost-button" type="button">Exporter PFMP Premiere</button>
        <button id="export-pfmp-terminale" class="ghost-button" type="button">Exporter PFMP Terminale</button>
        <button id="export-pfmp-synthesis" class="ghost-button" type="button">Exporter synthese PFMP 3 ans</button>
      `;
      const pdfToolbar = document.querySelector("#pfmp-pdf-toolbar");
      if (pdfToolbar) {
        pdfToolbar.insertAdjacentElement("afterend", yearToolbar);
      } else {
        exportButton.insertAdjacentElement("afterend", yearToolbar);
      }
    }

    bindClickWithClone(document.querySelector("#export-pfmp-seconde"), () => {
      const classId = classSelect.value || app.classes[0]?.id || "";
      const student = getStudentById(studentSelect.value) || getStudentsByClass(classId)[0];
      if (!student) return;
      exportStudentPfmpYearWorkbook(student, 1);
    });

    bindClickWithClone(document.querySelector("#export-pfmp-premiere"), () => {
      const classId = classSelect.value || app.classes[0]?.id || "";
      const student = getStudentById(studentSelect.value) || getStudentsByClass(classId)[0];
      if (!student) return;
      exportStudentPfmpYearWorkbook(student, 2);
    });

    bindClickWithClone(document.querySelector("#export-pfmp-terminale"), () => {
      const classId = classSelect.value || app.classes[0]?.id || "";
      const student = getStudentById(studentSelect.value) || getStudentsByClass(classId)[0];
      if (!student) return;
      exportStudentPfmpYearWorkbook(student, 3);
    });

    bindClickWithClone(document.querySelector("#export-pfmp-synthesis"), () => {
      const classId = classSelect.value || app.classes[0]?.id || "";
      const student = getStudentById(studentSelect.value) || getStudentsByClass(classId)[0];
      if (!student) return;
      exportStudentPfmpCycleSynthesisWorkbook(student);
    });
  };
})();

;(function () {
  initMappingPageFinal = function() {
    bindProtectedChrome();
    const classSelect = document.querySelector('#mapping-class-select');
    const domainSelect = document.querySelector('#mapping-domain-select');
    const meta = document.querySelector('#mapping-meta');
    const grid = document.querySelector('#mapping-grid');
    if (!classSelect || !domainSelect || !grid) return;

    populateClassSelect(classSelect);
    domainSelect.innerHTML = [`<option value="all">Tous les domaines</option>`, ...referentialDomains.map((domain) => `<option value="${domain}">${domain}</option>`)].join('');
    const requestedClassId = getRequestedClassId();
    if (requestedClassId) classSelect.value = requestedClassId;
    classSelect.addEventListener('change', renderMapping);
    domainSelect.addEventListener('change', renderMapping);
    renderMapping();

    function renderMapping() {
      const classId = classSelect.value || app.classes[0]?.id || '';
      const classItem = getClassById(classId);
      const selectedDomain = domainSelect.value || 'all';
      const cards = skillCatalog
        .filter((skill) => selectedDomain === 'all' || getSkillDomain(skill) === selectedDomain)
        .map((skill) => {
          const relatedActivities = getActivitiesByClass(classId).filter((activity) => getActivitySkillIds(activity).includes(skill.id));
          const pfmpHits = getStudentsByClass(classId).flatMap((student) => getPfmpObservationLabels(student.id, skill.id));
          const coverageValue = Math.min((relatedActivities.length + pfmpHits.length) / 8, 1);
          return { skill, relatedActivities, pfmpHits, coverageValue };
        });
      meta.textContent = `${classItem?.name || ''} // ${selectedDomain === 'all' ? 'tous les domaines' : selectedDomain}`;
      grid.innerHTML = cards.map(({ skill, relatedActivities, pfmpHits, coverageValue }) => {
        const heatCells = Array.from({ length: 8 }, (_, index) => {
          const active = index < Math.round(coverageValue * 8);
          return `<span class="mapping-heat-dot" style="background:${active ? getHeatmapColor((index + 1) / 8) : 'rgba(255,255,255,0.08)'}"></span>`;
        }).join('');
        return `
          <article class="catalog-card">
            <div class="skill-headline">
              <span class="skill-code">${skill.code}</span>
              <span class="skill-domain">${getSkillDomain(skill)}</span>
            </div>
            <h3>${skill.title}</h3>
            <p>${relatedActivities.length} seance(s) // ${pfmpHits.length} observation(s) PFMP</p>
            <div class="heatmap-row">
              <div class="heatmap-cell">
                <span>Seances</span>
                <strong style="background:${getHeatmapColor(Math.min(relatedActivities.length / 4, 1))}">${relatedActivities.length}</strong>
              </div>
              <div class="heatmap-cell">
                <span>PFMP</span>
                <strong style="background:${getHeatmapColor(Math.min(pfmpHits.length / 6, 1))}">${pfmpHits.length}</strong>
              </div>
              <div class="heatmap-cell">
                <span>Couverture</span>
                <strong style="background:${getHeatmapColor(coverageValue)}">${relatedActivities.length + pfmpHits.length}</strong>
              </div>
            </div>
            <div class="mapping-heat-strip">${heatCells}</div>
            <p class="muted-copy">${relatedActivities.length ? relatedActivities.map((activity) => `${activity.type} ${activity.title}`).join(' | ') : 'Aucune seance reliee.'}</p>
            <p class="muted-copy">${pfmpHits.length ? pfmpHits.join(' | ') : 'Aucune observation PFMP.'}</p>
            <div class="student-badges">
              <a class="ghost-button button-link" href="evaluations.html?view=session&class=${encodeURIComponent(classId)}">Voir les seances</a>
              <a class="ghost-button button-link" href="pfmp.html?class=${encodeURIComponent(classId)}">Voir les PFMP</a>
              <a class="ghost-button button-link" href="evaluations.html?view=create&class=${encodeURIComponent(classId)}&skill=${encodeURIComponent(skill.id)}">Creer une seance</a>
            </div>
          </article>
        `;
      }).join('');
    }
  };

  buildPfmpStudentPdfHtml = function(student) {
    const classItem = getClassById(student.classId);
    const periodsHtml = PFMP_PERIODS.map((period) => {
      const entry = getPfmpPeriodEntry(student.id, period.id);
      const observed = (entry.observedSkillIds || []).map((skillId) => getSkillById(skillId)?.code).filter(Boolean).join(' | ');
      return `
        <div class="card">
          <h2>${escapeHtml(period.label)}</h2>
          <p><strong>Entreprise :</strong> ${escapeHtml(entry.companyName || 'Non renseignee')}</p>
          <p><strong>Tuteur :</strong> ${escapeHtml(entry.tutorName || '-')}</p>
          <p><strong>Professeur referent :</strong> ${escapeHtml(entry.teacher || '-')}</p>
          <p><strong>Visite :</strong> ${escapeHtml(entry.visitDate || 'A planifier')}</p>
          <p><strong>Convention :</strong> ${hasFullConvention(entry) ? 'Complete' : 'Incomplete'}</p>
          <p><strong>Dossier final :</strong> ${hasCompleteFile(entry) ? 'Complet' : 'Incomplet'}</p>
          <p><strong>Competences observees :</strong> ${escapeHtml(observed || 'Aucune')}</p>
          <p><strong>Commentaire :</strong> ${escapeHtml(entry.comment || '-')}</p>
        </div>
      `;
    }).join('');
    return buildPrintShell(`Suivi PFMP - ${student.name}`, `${classItem?.name || ''}`, periodsHtml);
  };

  buildPfmpClassPdfHtml = function(classId) {
    const classItem = getClassById(classId);
    const students = getStudentsByClass(classId);
    const rows = students.map((student) => {
      const filled = PFMP_PERIODS.filter((period) => getPfmpPeriodEntry(student.id, period.id).companyName).length;
      const conventions = PFMP_PERIODS.filter((period) => hasFullConvention(getPfmpPeriodEntry(student.id, period.id))).length;
      const visits = PFMP_PERIODS.filter((period) => getPfmpPeriodEntry(student.id, period.id).visitDate).length;
      const files = PFMP_PERIODS.filter((period) => hasCompleteFile(getPfmpPeriodEntry(student.id, period.id))).length;
      const observed = PFMP_PERIODS.reduce((sum, period) => sum + ((getPfmpPeriodEntry(student.id, period.id).observedSkillIds || []).length), 0);
      return `
        <tr>
          <td>${escapeHtml(student.name)}</td>
          <td>${filled}/6</td>
          <td>${conventions}/6</td>
          <td>${visits}/6</td>
          <td>${files}/6</td>
          <td>${observed}</td>
        </tr>
      `;
    }).join('');
    return buildPrintShell(
      `Synthese PFMP - ${classItem?.name || ''}`,
      `${students.length} eleve(s)`,
      `
        <table>
          <thead>
            <tr>
              <th>Eleve</th>
              <th>Periodes renseignees</th>
              <th>Conventions completes</th>
              <th>Visites planifiees</th>
              <th>Dossiers complets</th>
              <th>Competences observees</th>
            </tr>
          </thead>
          <tbody>${rows || '<tr><td colspan="6">Aucun eleve.</td></tr>'}</tbody>
        </table>
      `
    );
  };

  renderRemediationCard = function(item) {
    return `
      <article class="summary-card alert-card ${item.level}">
        <p class="alert-level">${item.level}</p>
        <h3>${item.title}</h3>
        <p class="muted-copy">${item.detail}</p>
        <p class="muted-copy">${item.action || ''}</p>
        ${item.actionHref ? `<div class="student-badges"><a class="ghost-button button-link" href="${item.actionHref}">${item.actionLabel || 'Ouvrir'}</a></div>` : ''}
      </article>
    `;
  };
})();

;(function () {
  const originalInitMappingPageFinal = initMappingPageFinal;
  initMappingPageFinal = function() {
    bindProtectedChrome();
    const classSelect = document.querySelector('#mapping-class-select');
    const domainSelect = document.querySelector('#mapping-domain-select');
    const skillSelect = document.querySelector('#mapping-skill-select');
    const exportButton = document.querySelector('#mapping-export-pdf');
    const meta = document.querySelector('#mapping-meta');
    const grid = document.querySelector('#mapping-grid');
    if (!classSelect || !domainSelect || !skillSelect || !grid) {
      if (typeof originalInitMappingPageFinal === 'function') originalInitMappingPageFinal();
      return;
    }

    populateClassSelect(classSelect);
    domainSelect.innerHTML = [`<option value="all">Tous les domaines</option>`, ...referentialDomains.map((domain) => `<option value="${domain}">${domain}</option>`)].join('');
    skillSelect.innerHTML = [`<option value="all">Toutes les competences</option>`, ...skillCatalog.map((skill) => `<option value="${skill.id}">${skill.code} - ${skill.title}</option>`)].join('');
    const requestedClassId = getRequestedClassId();
    if (requestedClassId) classSelect.value = requestedClassId;
    classSelect.addEventListener('change', renderMapping);
    domainSelect.addEventListener('change', renderMapping);
    skillSelect.addEventListener('change', renderMapping);
    exportButton?.addEventListener('click', exportMappingPdf);
    renderMapping();

    function renderMapping() {
      const classId = classSelect.value || app.classes[0]?.id || '';
      const classItem = getClassById(classId);
      const selectedDomain = domainSelect.value || 'all';
      const selectedSkillId = skillSelect.value || 'all';
      const cards = skillCatalog
        .filter((skill) => (selectedDomain === 'all' || getSkillDomain(skill) === selectedDomain) && (selectedSkillId === 'all' || skill.id === selectedSkillId))
        .map((skill) => {
          const relatedActivities = getActivitiesByClass(classId).filter((activity) => getActivitySkillIds(activity).includes(skill.id));
          const pfmpHits = getStudentsByClass(classId).flatMap((student) => getPfmpObservationLabels(student.id, skill.id));
          const coverageValue = Math.min((relatedActivities.length + pfmpHits.length) / 8, 1);
          return { skill, relatedActivities, pfmpHits, coverageValue };
        });
      meta.textContent = `${classItem?.name || ''} // ${selectedDomain === 'all' ? 'tous les domaines' : selectedDomain} // ${selectedSkillId === 'all' ? 'toutes les competences' : (getSkillById(selectedSkillId)?.code || '')}`;
      grid.innerHTML = cards.map(({ skill, relatedActivities, pfmpHits, coverageValue }) => {
        const heatCells = Array.from({ length: 8 }, (_, index) => {
          const active = index < Math.round(coverageValue * 8);
          return `<span class="mapping-heat-dot" style="background:${active ? getHeatmapColor((index + 1) / 8) : 'rgba(255,255,255,0.08)'}"></span>`;
        }).join('');
        return `
          <article class="catalog-card">
            <div class="skill-headline">
              <span class="skill-code">${skill.code}</span>
              <span class="skill-domain">${getSkillDomain(skill)}</span>
            </div>
            <h3>${skill.title}</h3>
            <p>${relatedActivities.length} seance(s) // ${pfmpHits.length} observation(s) PFMP</p>
            <div class="heatmap-row">
              <div class="heatmap-cell">
                <span>Seances</span>
                <strong style="background:${getHeatmapColor(Math.min(relatedActivities.length / 4, 1))}">${relatedActivities.length}</strong>
              </div>
              <div class="heatmap-cell">
                <span>PFMP</span>
                <strong style="background:${getHeatmapColor(Math.min(pfmpHits.length / 6, 1))}">${pfmpHits.length}</strong>
              </div>
              <div class="heatmap-cell">
                <span>Couverture</span>
                <strong style="background:${getHeatmapColor(coverageValue)}">${relatedActivities.length + pfmpHits.length}</strong>
              </div>
            </div>
            <div class="mapping-heat-strip">${heatCells}</div>
            <p class="muted-copy">${relatedActivities.length ? relatedActivities.map((activity) => `${activity.type} ${activity.title}`).join(' | ') : 'Aucune seance reliee.'}</p>
            <p class="muted-copy">${pfmpHits.length ? pfmpHits.join(' | ') : 'Aucune observation PFMP.'}</p>
            <div class="student-badges">
              <a class="ghost-button button-link" href="evaluations.html?view=session&class=${encodeURIComponent(classId)}">Voir les seances</a>
              <a class="ghost-button button-link" href="pfmp.html?class=${encodeURIComponent(classId)}">Voir les PFMP</a>
              <a class="ghost-button button-link" href="evaluations.html?view=create&class=${encodeURIComponent(classId)}&skill=${encodeURIComponent(skill.id)}">Creer une seance</a>
            </div>
          </article>
        `;
      }).join('') || `<article class="summary-card"><h3>Aucune donnee</h3><p class="muted-copy">Aucune competence ne correspond au filtre courant.</p></article>`;
    }

    function exportMappingPdf() {
      const classId = classSelect.value || app.classes[0]?.id || '';
      const classItem = getClassById(classId);
      const selectedDomain = domainSelect.value || 'all';
      const selectedSkillId = skillSelect.value || 'all';
      const rows = skillCatalog
        .filter((skill) => (selectedDomain === 'all' || getSkillDomain(skill) === selectedDomain) && (selectedSkillId === 'all' || skill.id === selectedSkillId))
        .map((skill) => {
          const relatedActivities = getActivitiesByClass(classId).filter((activity) => getActivitySkillIds(activity).includes(skill.id));
          const pfmpHits = getStudentsByClass(classId).flatMap((student) => getPfmpObservationLabels(student.id, skill.id));
          return `<tr><td>${escapeHtml(skill.code)}</td><td>${escapeHtml(skill.title)}</td><td>${escapeHtml(getSkillDomain(skill))}</td><td>${relatedActivities.length}</td><td>${pfmpHits.length}</td><td>${relatedActivities.length + pfmpHits.length}</td></tr>`;
        }).join('');
      const html = buildPrintShell(
        `Cartographie - ${classItem?.name || ''}`,
        `${selectedDomain === 'all' ? 'Tous les domaines' : selectedDomain} // ${selectedSkillId === 'all' ? 'Toutes les competences' : (getSkillById(selectedSkillId)?.code || '')}`,
        `<table><thead><tr><th>Code</th><th>Competence</th><th>Domaine</th><th>Seances</th><th>PFMP</th><th>Couverture</th></tr></thead><tbody>${rows || '<tr><td colspan="6">Aucune donnee.</td></tr>'}</tbody></table>`
      );
      printHtmlDocument(`Cartographie ${classItem?.name || ''}`, html);
    }
  };

  const originalRenderRemediationCard = renderRemediationCard;
  renderRemediationCard = function(item) {
    const skillMatch = skillCatalog.find((skill) => item.title?.startsWith(`${skill.code} //`));
    let suggestedTemplate = null;
    if (skillMatch && Array.isArray(app.lessonLibrary)) {
      suggestedTemplate = app.lessonLibrary.find((template) => (template.skillIds || []).includes(skillMatch.id));
    }
    const suggestionHtml = suggestedTemplate
      ? `<div class="student-badges"><a class="ghost-button button-link" href="evaluations.html?view=create&template=${encodeURIComponent(suggestedTemplate.id)}">Utiliser le modele ${suggestedTemplate.title}</a></div>`
      : '';
    const base = typeof originalRenderRemediationCard === 'function'
      ? originalRenderRemediationCard(item)
      : `
        <article class="summary-card alert-card ${item.level}">
          <p class="alert-level">${item.level}</p>
          <h3>${item.title}</h3>
          <p class="muted-copy">${item.detail}</p>
          <p class="muted-copy">${item.action || ''}</p>
          ${item.actionHref ? `<div class="student-badges"><a class="ghost-button button-link" href="${item.actionHref}">${item.actionLabel || 'Ouvrir'}</a></div>` : ''}
        </article>
      `;
    return base.replace('</article>', `${suggestionHtml}</article>`);
  };
})();

;(function () {
  initRemediationPageFinal = function() {
    bindProtectedChrome();
    const classSelect = document.querySelector('#remediation-class-select');
    const studentSelect = document.querySelector('#remediation-student-select');
    const severitySelect = document.querySelector('#remediation-severity-select');
    const teacherSelect = document.querySelector('#remediation-teacher-select');
    const exportButton = document.querySelector('#remediation-export-pdf');
    const summaryGrid = document.querySelector('#remediation-summary-grid');
    const detailGrid = document.querySelector('#remediation-detail-grid');
    const scopeTitle = document.querySelector('#remediation-scope-title');
    const detailTitle = document.querySelector('#remediation-detail-title');
    if (!classSelect || !studentSelect || !summaryGrid || !detailGrid) return;

    populateClassSelect(classSelect);
    populateTeacherFilter(teacherSelect);
    const requestedClassId = getRequestedClassId();
    if (requestedClassId) classSelect.value = requestedClassId;
    classSelect.addEventListener('change', () => {
      syncStudents();
      renderRemediationPage();
    });
    studentSelect.addEventListener('change', renderRemediationPage);
    severitySelect?.addEventListener('change', renderRemediationPage);
    teacherSelect?.addEventListener('change', renderRemediationPage);
    exportButton?.addEventListener('click', exportRemediationPdf);
    syncStudents();
    renderRemediationPage();

    function syncStudents() {
      const classId = classSelect.value || app.classes[0]?.id || '';
      const students = getStudentsByClass(classId);
      studentSelect.innerHTML = ['<option value="all">Tous les eleves</option>', ...students.map((student) => `<option value="${student.id}">${student.name}</option>`)].join('');
    }

    function filterByStudent(items, studentId) {
      if (!studentId || studentId === 'all') return items;
      const student = getStudentById(studentId);
      if (!student) return items;
      const needle = student.name;
      return items.filter((item) => String(item.title || '').includes(needle) || String(item.detail || '').includes(needle));
    }

    function enrichItem(item, classId, isPfmpPage) {
      if (item.actionHref) return item;
      if (isPfmpPage) {
        return { ...item, actionHref: `pfmp.html?class=${encodeURIComponent(classId)}`, actionLabel: 'Ouvrir PFMP' };
      }
      const matchedSkill = skillCatalog.find((skill) => item.title.startsWith(`${skill.code} //`));
      if (matchedSkill) {
        const domain = encodeURIComponent(getSkillDomain(matchedSkill));
        return {
          ...item,
          actionHref: `evaluations.html?view=create&class=${encodeURIComponent(classId)}&skill=${encodeURIComponent(matchedSkill.id)}&domain=${domain}`,
          actionLabel: 'Creer une seance de remediation'
        };
      }
      return { ...item, actionHref: `evaluations.html?view=session&class=${encodeURIComponent(classId)}`, actionLabel: 'Ouvrir les evaluations' };
    }

    function renderRemediationPage() {
      const classId = classSelect.value || app.classes[0]?.id || '';
      const teacher = teacherSelect?.value || 'all';
      const severity = severitySelect?.value || 'all';
      const studentId = studentSelect?.value || 'all';
      const alerts = filterByStudent(getClassAlerts(classId, teacher), studentId).filter((item) => severity === 'all' || item.level === severity);
      const isPfmpPage = page === 'remediation_pfmp';
      const detailSource = isPfmpPage ? getPfmpRemediationItems(classId, teacher) : getEvaluationRemediationItems(classId, teacher);
      const detailItems = filterByStudent(detailSource, studentId)
        .filter((item) => severity === 'all' || item.level === severity)
        .map((item) => enrichItem(item, classId, isPfmpPage));
      if (scopeTitle) scopeTitle.textContent = isPfmpPage ? 'Vue remediation PFMP' : 'Vue remediation competences';
      if (detailTitle) detailTitle.textContent = isPfmpPage ? 'Remediation PFMP' : 'Remediation competences';
      summaryGrid.innerHTML = alerts.length ? alerts.map(renderRemediationCard).join('') : `<article class="summary-card"><h3>Aucune remediation globale</h3><p class="muted-copy">Aucun signal bloquant pour ce filtre.</p></article>`;
      detailGrid.innerHTML = detailItems.length ? detailItems.map(renderRemediationCard).join('') : `<article class="summary-card"><h3>Aucune action</h3><p class="muted-copy">Aucune relance a traiter pour ce filtre.</p></article>`;
    }

    function exportRemediationPdf() {
      const classId = classSelect.value || app.classes[0]?.id || '';
      const classItem = getClassById(classId);
      const teacher = teacherSelect?.value || 'all';
      const severity = severitySelect?.value || 'all';
      const studentId = studentSelect?.value || 'all';
      const isPfmpPage = page === 'remediation_pfmp';
      const detailSource = isPfmpPage ? getPfmpRemediationItems(classId, teacher) : getEvaluationRemediationItems(classId, teacher);
      const detailItems = filterByStudent(detailSource, studentId)
        .filter((item) => severity === 'all' || item.level === severity)
        .map((item) => enrichItem(item, classId, isPfmpPage));
      const rows = detailItems.map((item) => `<tr><td>${escapeHtml(item.level)}</td><td>${escapeHtml(item.title)}</td><td>${escapeHtml(item.detail)}</td><td>${escapeHtml(item.action || '')}</td></tr>`).join('');
      const html = buildPrintShell(
        `Remediation - ${classItem?.name || ''}`,
        `${isPfmpPage ? 'PFMP' : 'Competences'} // ${severity === 'all' ? 'Toutes les gravites' : severity}`,
        `<table><thead><tr><th>Niveau</th><th>Titre</th><th>Detail</th><th>Action</th></tr></thead><tbody>${rows || '<tr><td colspan="4">Aucune action.</td></tr>'}</tbody></table>`
      );
      printHtmlDocument(`Remediation ${classItem?.name || ''}`, html);
    }
  };

  if (document.body?.dataset?.page === 'evaluations') {
    window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const requestedDomain = params.get('domain');
      const domainSelect = document.querySelector('#indicator-bank-domain');
      if (requestedDomain && domainSelect) {
        domainSelect.value = requestedDomain;
        domainSelect.dispatchEvent(new Event('change'));
      }
    }, 0);
  }
})();

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
const defaultAccounts = [
  { id: "admin-account", username: "admin", password: "admin123", role: "admin", label: "Administrateur" },
  { id: "teacher-account-1", username: "prof", password: "prof123", role: "professeur", label: "Professeur" }
];

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
const referentialDomains = [...new Set(skillCatalog.map((skill) => skill.domain))];
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
const PROTECTED_PAGES = new Set(["dashboard", "classes", "evaluations", "pfmp", "accounts"]);
const ADMIN_ONLY_PAGES = new Set(["accounts"]);
const currentSession = getSession();

if (PROTECTED_PAGES.has(page) && !currentSession) {
  window.location.replace("login.html");
}

if (ADMIN_ONLY_PAGES.has(page) && currentSession && currentSession.role !== "admin") {
  window.location.replace("dashboard.html");
}

if (page === "login" && currentSession) {
  window.location.replace("dashboard.html");
}

const app = loadAppData();

if (page === "home") initHomePage();
if (page === "login") initLoginPage();
if (page === "dashboard") initDashboardPage();
if (page === "classes") initClassesPage();
if (page === "evaluations") initEvaluationsPage();
if (page === "pfmp") initPfmpPage();
if (page === "accounts") initAccountsPage();

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
    skills: buildSkillState(student.skills || {})
  }));
  const pfmpRecords = {};
  students.forEach((student) => {
    pfmpRecords[student.id] = hydratePfmpRecord(data.pfmpRecords?.[student.id] || defaultPfmpRecords[student.id] || {}, student, classes);
  });
  const evaluationActivities = (data.evaluationActivities || defaultEvaluationActivities).map((activity, index) => hydrateEvaluationActivity(activity, index));
  const accounts = hydrateAccounts(data.accounts || defaultAccounts);
  return { classes, students, pfmpRecords, evaluationActivities, accounts };
}

function hydrateAccounts(accounts) {
  const hydrated = (accounts || defaultAccounts).map((account, index) => ({
    id: account.id || `account-${index + 1}`,
    username: account.username || `user${index + 1}`,
    password: account.password || "changeme",
    role: account.role || "professeur",
    label: account.label || (account.role === "admin" ? "Administrateur" : "Professeur")
  }));
  if (!hydrated.some((account) => account.role === "admin")) {
    hydrated.unshift(defaultAccounts[0]);
  }
  return hydrated;
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
    attendanceDate: record.attendanceDate || ""
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
  return {
    id: activity.id || `activity-${index + 1}`,
    title: activity.title || `Séance ${index + 1}`,
    type: activity.type || "TP",
    classId: activity.classId || "",
    skillId: activity.skillId || skillCatalog[0].id,
    date: activity.date || "",
    indicators,
    evaluations: activity.evaluations || {}
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

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = usernameInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const user = app.accounts.find((account) => account.username.toLowerCase() === username);
    if (!user || user.password !== password) {
      feedback.textContent = "Identifiants invalides.";
      return;
    }
    setSession({ username: user.username, role: user.role, label: user.label });
    window.location.href = "dashboard.html";
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
  const feedback = document.querySelector("#accounts-feedback");
  const accountsSummary = document.querySelector("#accounts-summary");
  const teacherAccountsList = document.querySelector("#teacher-accounts-list");

  const adminAccount = getAccountByRole("admin");
  adminUsername.value = adminAccount.username;
  adminPassword.value = adminAccount.password;

  adminForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!adminUsername.value.trim() || !adminPassword.value.trim()) return;
    updateAccount("admin", adminUsername.value.trim(), adminPassword.value.trim());
    feedback.textContent = "Compte administrateur mis à jour.";
    renderTeachers();
  });

  teacherForm.addEventListener("submit", (event) => {
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
    const existing = nav.querySelector('a[href="accounts.html"]');
    if (session?.role === "admin" && !existing) {
      const link = document.createElement("a");
      link.href = "accounts.html";
      link.className = `nav-tab${page === "accounts" ? " active" : ""}`;
      link.textContent = "Comptes";
      nav.insertBefore(link, roleBadge || logoutButton || null);
    }
  });
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      clearSession();
      window.location.href = "login.html";
    });
  }
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
          <span class="skill-domain">${skill.domain}</span>
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
      fragment.querySelector(".skill-domain").textContent = skill.domain;
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

function getStudentById(studentId) {
  return app.students.find((student) => student.id === studentId);
}

function getStudentsByClass(classId) {
  return app.students.filter((student) => student.classId === classId);
}

function getActivitiesByClass(classId) {
  return app.evaluationActivities.filter((activity) => activity.classId === classId);
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
    const domainSkills = skillCatalog.filter((skill) => skill.domain === domain);
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

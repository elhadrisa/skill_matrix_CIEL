const STORAGE_KEY = "ciel-competences-app";
const LEGACY_STUDENT_KEY = "ciel-competences-state";
const SESSION_KEY = "ciel-session";

const skillCatalog = [
  { id: "c1", code: "C1", domain: "Pilotage pro", title: "Communiquer en situation professionnelle", description: "Restituer clairement une intervention, Ã©changer avec le client ou l'Ã©quipe et produire une communication technique exploitable." },
  { id: "c3", code: "C3", domain: "Pilotage pro", title: "Participer Ã  un projet", description: "Contribuer Ã  une rÃ©alisation collective, suivre les jalons et intÃ©grer les contraintes de coÃ»t, dÃ©lai et qualitÃ©." },
  { id: "c4", code: "C4", domain: "Ã‰tude & analyse", title: "Analyser une structure matÃ©rielle et logicielle", description: "Identifier l'architecture d'un systÃ¨me, comprendre ses composants et interprÃ©ter ses interactions matÃ©rielles et logicielles." },
  { id: "c6", code: "C6", domain: "Ã‰tude & analyse", title: "Valider la conformitÃ© d'une installation", description: "VÃ©rifier que l'installation rÃ©pond au cahier des charges, aux tests attendus et aux exigences de sÃ©curitÃ©." },
  { id: "c7", code: "C7", domain: "Ã‰tude & analyse", title: "RÃ©aliser des maquettes et prototypes", description: "Assembler, intÃ©grer et tester une preuve de concept matÃ©rielle ou logicielle avant dÃ©ploiement." },
  { id: "c8", code: "C8", domain: "Ã‰tude & analyse", title: "Coder", description: "DÃ©velopper ou adapter un code source fonctionnel, lisible et testable pour automatiser, interfacer ou piloter un systÃ¨me." },
  { id: "c9", code: "C9", domain: "Infra & maintien", title: "Installer les Ã©lÃ©ments d'un systÃ¨me Ã©lectronique ou informatique", description: "DÃ©ployer les Ã©quipements, configurer les composants et mettre en service une architecture matÃ©rielle ou logicielle." },
  { id: "c10", code: "C10", domain: "Infra & maintien", title: "Exploiter un rÃ©seau informatique", description: "Superviser un rÃ©seau, assurer son fonctionnement courant et exploiter les services en condition opÃ©rationnelle." },
  { id: "c11", code: "C11", domain: "Infra & maintien", title: "Maintenir un systÃ¨me Ã©lectronique ou rÃ©seau informatique", description: "Diagnostiquer, corriger et tracer les incidents afin de rÃ©tablir le service et prÃ©server la disponibilitÃ© du systÃ¨me." }
];

const defaultClasses = [
  { id: "term-ciel", name: "Terminale CIEL", year: "2025-2026", note: "Groupe cyber & rÃ©seaux" },
  { id: "prem-ciel", name: "PremiÃ¨re CIEL", year: "2025-2026", note: "Groupe systÃ¨mes & code" }
];

const defaultStudents = [
  { id: "lea-martin", name: "LÃ©a Martin", classId: "term-ciel", skills: { c1: "acquis", c3: "partiellement_acquis", c4: "partiellement_acquis", c6: "partiellement_acquis", c7: "en_cours_acquisition", c8: "partiellement_acquis", c9: "partiellement_acquis", c10: "en_cours_acquisition", c11: "partiellement_acquis" } },
  { id: "ines-bernard", name: "InÃ¨s Bernard", classId: "term-ciel", skills: { c1: "acquis", c3: "partiellement_acquis", c4: "acquis", c6: "acquis", c7: "partiellement_acquis", c8: "partiellement_acquis", c9: "partiellement_acquis", c10: "acquis", c11: "partiellement_acquis" } },
  { id: "yanis-robert", name: "Yanis Robert", classId: "prem-ciel", skills: { c1: "partiellement_acquis", c3: "en_cours_acquisition", c4: "partiellement_acquis", c6: "en_cours_acquisition", c7: "non_evalue", c8: "acquis", c9: "en_cours_acquisition", c10: "non_evalue", c11: "en_cours_acquisition" } },
  { id: "sarah-dupont", name: "Sarah Dupont", classId: "prem-ciel", skills: { c1: "en_cours_acquisition", c3: "non_evalue", c4: "partiellement_acquis", c6: "non_evalue", c7: "en_cours_acquisition", c8: "partiellement_acquis", c9: "en_cours_acquisition", c10: "non_evalue", c11: "en_cours_acquisition" } }
];

const defaultPfmpRecords = {
  "lea-martin": { companyName: "Transdev Vaux Le Penil", comment: "Deux pÃ©riodes = OK", address: "400 Rue des 3 Tilleuls, 77000 Vaux-le-PÃ©nil", tutorName: "M. Gomez", tutorEmail: "", tutorPhone: "", conventionSent: "", conventionSignedCompany: "", conventionSignedParents: "", conventionSignedSchool: "", teacher: "Bernard", visitDate: "", reportDate: "", bookletDate: "", attendanceDate: "" },
  "yanis-robert": { companyName: "Univers Permis", comment: "Deux pÃ©riodes = OK", address: "200 route de Bordeaux 40600 Biscarrosse", tutorName: "M. Braham", tutorEmail: "monopat01@gmail.com", tutorPhone: "06 58 74 60 06", conventionSent: "2025-11-05", conventionSignedCompany: "2025-11-28", conventionSignedParents: "2025-11-28", conventionSignedSchool: "2025-11-28", teacher: "Salah", visitDate: "12/01/2026 Ã  17h15 (tÃ©lÃ©phone)", reportDate: "", bookletDate: "", attendanceDate: "" }
};

const defaultEvaluationActivities = [];
const defaultPfmpBooklets = {};
const defaultIndicatorBank = [
  {
    id: "bank-vlan-supervision",
    name: "VLAN et supervision",
    domain: "RÃ©seau Informatique",
    indicators: ["Configurer un VLAN fonctionnel", "Verifier la connectivite inter-VLAN", "Tracer les mesures de supervision"]
  },
  {
    id: "bank-durcissement-cyber",
    name: "Durcissement cybersÃ©curitÃ©",
    domain: "CybersÃ©curitÃ©",
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
    domain: "RÃ©seau Informatique",
    level: "TCIEL",
    duration: "4h",
    skillIds: ["c10", "c11"],
    materials: "Switch manageable, PC, Wireshark, outil de supervision",
    indicators: ["Configurer un VLAN fonctionnel", "Verifier la connectivite inter-VLAN", "Superviser les flux et tracer les resultats"],
    notes: "TP reseau complet avec validation d'architecture et exploitation."
  },
  {
    id: "tpl-durcissement-poste",
    title: "Durcissement d'un poste et controles de securite",
    domain: "CybersÃ©curitÃ©",
    level: "1CIEL",
    duration: "3h",
    skillIds: ["c3", "c8"],
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
const defaultEvidencePortfolio = [];
const defaultArchives = [];
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
  c1: "CybersÃ©curitÃ©",
  c3: "CybersÃ©curitÃ©",
  c4: "RÃ©seau Informatique",
  c6: "RÃ©seau Informatique",
  c7: "Electronique",
  c8: "CybersÃ©curitÃ©",
  c9: "Electronique",
  c10: "RÃ©seau Informatique",
  c11: "RÃ©seau Informatique"
};
const referentialDomains = [...new Set(skillCatalog.map((skill) => skillDomainOverrides[skill.id] || skill.domain))];
const pfmpFields = ["companyName", "comment", "address", "tutorName", "tutorEmail", "tutorPhone", "conventionSent", "conventionSignedCompany", "conventionSignedParents", "conventionSignedSchool", "teacher", "visitDate", "reportDate", "bookletDate", "attendanceDate"];
const PFMP_PERIODS = [
  { id: "seconde_1", label: "2nde - PFMP 1", cycle: "Seconde" },
  { id: "seconde_2", label: "2nde - PFMP 2", cycle: "Seconde" },
  { id: "premiere_1", label: "1Ã¨re - PFMP 1", cycle: "PremiÃ¨re" },
  { id: "premiere_2", label: "1Ã¨re - PFMP 2", cycle: "PremiÃ¨re" },
  { id: "terminale_1", label: "Terminale - PFMP 1", cycle: "Terminale" },
  { id: "terminale_2", label: "Terminale - PFMP 2", cycle: "Terminale" }
];

function repairDisplaySourceString(value) {
  if (typeof value !== "string" || !value) return value;
  let next = value;
  if (/[ÃÂâ€��]/.test(next)) {
    for (let index = 0; index < 4; index += 1) {
      try {
        const repaired = decodeURIComponent(escape(next));
        if (!repaired || repaired === next) break;
        next = repaired;
      } catch {
        break;
      }
    }
  }

  const sourceFixups = [
    [/\bCreation\b/g, "Création"],
    [/\bcreation\b/g, "création"],
    [/\bEvaluation\b/g, "Évaluation"],
    [/\bevaluation\b/g, "évaluation"],
    [/\bEvaluations\b/g, "Évaluations"],
    [/\bevaluations\b/g, "évaluations"],
    [/\bCompetence\b/g, "Compétence"],
    [/\bCompetences\b/g, "Compétences"],
    [/\bcompetence\b/g, "compétence"],
    [/\bcompetences\b/g, "compétences"],
    [/\bEleve\b/g, "Élève"],
    [/\bEleves\b/g, "Élèves"],
    [/\beleve\b/g, "élève"],
    [/\beleves\b/g, "élèves"],
    [/\bSeance\b/g, "Séance"],
    [/\bSeances\b/g, "Séances"],
    [/\bseance\b/g, "séance"],
    [/\bseances\b/g, "séances"],
    [/\bAcademie\b/g, "Académie"],
    [/\bacademie\b/g, "académie"],
    [/\bEtablissement\b/g, "Établissement"],
    [/\betablissement\b/g, "établissement"],
    [/\bPremiere\b/g, "Première"],
    [/\bpremiere\b/g, "première"],
    [/\bBibliotheque\b/g, "Bibliothèque"],
    [/\bbibliotheque\b/g, "bibliothèque"],
    [/\bSynthese\b/g, "Synthèse"],
    [/\bsynthese\b/g, "synthèse"],
    [/\bRemediation\b/g, "Remédiation"],
    [/\bRemediations\b/g, "Remédiations"],
    [/\bremediation\b/g, "remédiation"],
    [/\bremediations\b/g, "remédiations"],
    [/\bReferentiel\b/g, "Référentiel"],
    [/\breferentiel\b/g, "référentiel"],
    [/\bPeriode\b/g, "Période"],
    [/\bPeriodes\b/g, "Périodes"],
    [/\bperiode\b/g, "période"],
    [/\bperiodes\b/g, "périodes"],
    [/\bActivite\b/g, "Activité"],
    [/\bActivites\b/g, "Activités"],
    [/\bactivite\b/g, "activité"],
    [/\bactivites\b/g, "activités"],
    [/\bDuree\b/g, "Durée"],
    [/\bduree\b/g, "durée"],
    [/\bTracabilite\b/g, "Traçabilité"],
    [/\btracabilite\b/g, "traçabilité"],
    [/\bParametres\b/g, "Paramètres"],
    [/\bparametres\b/g, "paramètres"],
    [/\bDeconnexion\b/g, "Déconnexion"],
    [/\bdeconnexion\b/g, "déconnexion"],
    [/\bpedagogique\b/g, "pédagogique"],
    [/\bpedagogiques\b/g, "pédagogiques"],
    [/\bcoherence\b/g, "cohérence"],
    [/\bsecurite\b/g, "sécurité"],
    [/\breseau\b/g, "réseau"],
    [/\bReseau\b/g, "Réseau"],
    [/\bgenerale\b/g, "générale"],
    [/\bGenerale\b/g, "Générale"],
    [/\bpreparation\b/g, "préparation"],
    [/\bPreparation\b/g, "Préparation"],
    [/\banalysee\b/g, "analysée"],
    [/\bAnalysee\b/g, "Analysée"],
    [/\breelle\b/g, "réelle"],
    [/\bReelle\b/g, "Réelle"],
    [/\bresume\b/g, "résumé"],
    [/\bResume\b/g, "Résumé"],
    [/\bverifier\b/g, "vérifier"],
    [/\bVerifier\b/g, "Vérifier"],
    [/\bprete\b/g, "prête"],
    [/\bPrete\b/g, "Prête"],
    [/\bprets\b/g, "prêts"],
    [/\bPrets\b/g, "Prêts"]
  ];

  sourceFixups.forEach(([pattern, replacement]) => {
    next = next.replace(pattern, replacement);
  });

  return next
    .replace(/ÃƒÂ/g, "")
    .replace(/â€“/g, "–")
    .replace(/â€”/g, "—")
    .replace(/â€¦/g, "…")
    .replace(/â€¢/g, "•")
    .replace(/â€˜/g, "‘")
    .replace(/â€™/g, "’")
    .replace(/â€œ/g, "“")
    .replace(/â€\x9D/g, "”")
    .replace(/â„¢/g, "™");
}

function shouldRepairStructuredText(key, value) {
  if (typeof value !== "string" || !value) return false;
  if (["id", "classId", "studentId", "skillId", "portfolioKey", "username", "password", "url", "href", "src", "path", "value", "type"].includes(key)) {
    return false;
  }
  if (/^(?:https?:|mailto:|tel:)/i.test(value)) return false;
  if (/\.(?:html?|svg|png|jpg|jpeg|gif|webp|xlsx?|pdf)(?:$|\?)/i.test(value)) return false;
  if (/^[a-z0-9_-]+$/i.test(value) && !/[ÃÂâ€��]/.test(value)) return false;
  return /[ÃÂâ€��]/.test(value)
    || /\b(?:Creation|Evaluation|Evaluations|Competence|Competences|Eleve|Eleves|Seance|Seances|Academie|Etablissement|Premiere|Bibliotheque|Synthese|Remediation|Remediations|Referentiel|Periode|Periodes|Activite|Activites|Duree|Deconnexion|Tracabilite|coherence|pedagogique|securite|reseau|preparation|generale|analysee|reelle|resume|verifier|prets)\b/i.test(value);
}

function repairStructuredTextInPlace(node, seen = new WeakSet()) {
  if (!node || typeof node !== "object") return node;
  if (seen.has(node)) return node;
  seen.add(node);
  if (Array.isArray(node)) {
    node.forEach((item) => repairStructuredTextInPlace(item, seen));
    return node;
  }
  Object.keys(node).forEach((key) => {
    const value = node[key];
    if (typeof value === "string") {
      if (shouldRepairStructuredText(key, value)) {
        node[key] = repairDisplaySourceString(value);
      }
      return;
    }
    if (value && typeof value === "object") {
      repairStructuredTextInPlace(value, seen);
    }
  });
  return node;
}

[
  skillCatalog,
  defaultClasses,
  defaultStudents,
  defaultPfmpRecords,
  defaultIndicatorBank,
  defaultLessonLibrary,
  defaultAccounts,
  defaultActivityLog,
  defaultEvidencePortfolio,
  defaultArchives,
  roleCatalog,
  skillDomainOverrides,
  PFMP_PERIODS
].forEach((entry) => repairStructuredTextInPlace(entry));

const page = document.body.dataset.page;
const PROTECTED_PAGES = new Set(["dashboard", "classes", "evaluations", "pfmp", "pfmp_livret", "accounts", "bulletin", "candidate", "certification", "remediation_pfmp", "remediation_competences", "coverage", "mapping", "library", "reports"]);
const ADMIN_ONLY_PAGES = new Set(["accounts"]);
const app = createEmptyApp();
let persistTimeout = null;

initializeApp();

function createEmptyApp() {
  return hydrateAppData({ classes: defaultClasses, students: defaultStudents, pfmpRecords: defaultPfmpRecords, pfmpBooklets: defaultPfmpBooklets, evaluationActivities: defaultEvaluationActivities, indicatorBank: defaultIndicatorBank, lessonLibrary: defaultLessonLibrary, accounts: defaultAccounts, activityLog: defaultActivityLog, evidencePortfolio: defaultEvidencePortfolio, archives: defaultArchives });
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
      if (page === "candidate") initCandidatePageFinal();
      if (page === "certification") initCertificationPageFinal();
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
    if (page === "candidate") initCandidatePageFinal();
    if (page === "certification") initCertificationPageFinal();
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
  repairStructuredTextInPlace(data);
  const classes = (data.classes || defaultClasses).map((classItem, index) => ({
    id: classItem.id || `class-${index + 1}`,
    name: classItem.name || `Classe ${index + 1}`,
    year: classItem.year || "2025-2026",
    note: classItem.note || "Sans note"
  }));
  const fallbackClassId = classes[0]?.id || "";
  const students = (data.students || defaultStudents).map((student, index) => ({
    id: student.id || `student-${index + 1}`,
    name: student.name || `Ã‰lÃ¨ve ${index + 1}`,
    classId: classes.some((classItem) => classItem.id === student.classId) ? student.classId : fallbackClassId,
    portfolioKey: student.portfolioKey || slugify(student.name || `eleve-${index + 1}`),
    skills: buildSkillState(student.skills || {}),
    skillGrades: hydrateSkillGrades(student.skillGrades || {}),
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
  const evidencePortfolio = (data.evidencePortfolio || defaultEvidencePortfolio).map((entry, index) => ({
    id: entry.id || `evidence-${index + 1}`,
    studentId: entry.studentId || "",
    classId: entry.classId || "",
    skillId: entry.skillId || "",
    type: entry.type || "production",
    title: entry.title || `Preuve ${index + 1}`,
    url: entry.url || "",
    note: entry.note || "",
    date: entry.date || new Date().toISOString().slice(0, 10),
    createdAt: entry.createdAt || new Date().toISOString()
  }));
  const archives = (data.archives || defaultArchives).map((entry, index) => ({
    id: entry.id || `archive-${index + 1}`,
    label: entry.label || `Archive ${index + 1}`,
    sessionYear: entry.sessionYear || "",
    archivedAt: entry.archivedAt || new Date().toISOString(),
    summary: entry.summary || "",
    classes: Array.isArray(entry.classes) ? entry.classes : [],
    students: Array.isArray(entry.students) ? entry.students : [],
    evaluationActivities: Array.isArray(entry.evaluationActivities) ? entry.evaluationActivities : [],
    evidencePortfolio: Array.isArray(entry.evidencePortfolio) ? entry.evidencePortfolio : [],
    pfmpRecords: entry.pfmpRecords || {},
    pfmpBooklets: entry.pfmpBooklets || {}
  }));
  return {
    classes,
    students,
    pfmpRecords,
    pfmpBooklets,
    evaluationActivities,
    indicatorBank,
    lessonLibrary,
    accounts,
    activityLog,
    evidencePortfolio,
    archives,
    appMeta: typeof data.appMeta === "object" && data.appMeta ? JSON.parse(JSON.stringify(data.appMeta)) : {}
  };
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
    actor: item.actor || "SystÃ¨me",
    role: item.role || "systeme",
    action: item.action || "Mise Ã  jour",
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

function normalizeActivityIndicatorsBySkillSafe(indicators, skillIds = []) {
  const normalizedSkillIds = (Array.isArray(skillIds) ? skillIds : []).filter((skillId, index, source) => getSkillById(skillId) && source.indexOf(skillId) === index);
  const normalizedIndicators = Array.isArray(indicators) ? indicators.map((indicator) => ({
    ...indicator,
    skillId: indicator.skillId && normalizedSkillIds.includes(indicator.skillId) ? indicator.skillId : ""
  })) : [];

  if (!normalizedSkillIds.length) return normalizedIndicators;
  if (normalizedSkillIds.length === 1) {
    return normalizedIndicators.map((indicator) => ({
      ...indicator,
      skillId: indicator.skillId || normalizedSkillIds[0]
    }));
  }

  const assignedCountBySkill = new Map(normalizedSkillIds.map((skillId) => [skillId, 0]));
  normalizedIndicators.forEach((indicator) => {
    if (!indicator.skillId) return;
    assignedCountBySkill.set(indicator.skillId, (assignedCountBySkill.get(indicator.skillId) || 0) + 1);
  });

  let nextSkillIndex = 0;
  return normalizedIndicators.map((indicator) => {
    if (indicator.skillId) return indicator;
    const skillId = normalizedSkillIds[nextSkillIndex % normalizedSkillIds.length];
    nextSkillIndex += 1;
    assignedCountBySkill.set(skillId, (assignedCountBySkill.get(skillId) || 0) + 1);
    return {
      ...indicator,
      skillId
    };
  });
}

function hydrateEvaluationActivity(activity, index) {
  const skillIds = Array.isArray(activity.skillIds) && activity.skillIds.length
    ? activity.skillIds.filter((skillId) => getSkillById(skillId))
    : [activity.skillId || skillCatalog[0].id].filter((skillId) => getSkillById(skillId));
  const indicators = normalizeActivityIndicatorsBySkillSafe(Array.isArray(activity.indicators) ? activity.indicators.map((indicator, indicatorIndex) => ({
    id: indicator.id || `indicator-${index + 1}-${indicatorIndex + 1}`,
    label: indicator.label || `Indicateur ${indicatorIndex + 1}`,
    skillId: indicator.skillId && getSkillById(indicator.skillId) ? indicator.skillId : ""
  })) : [], skillIds);
  return {
    id: activity.id || `activity-${index + 1}`,
    title: activity.title || `SÃ©ance ${index + 1}`,
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
      classes.push({ id, name: className, year: "2025-2026", note: "MigrÃ© depuis l'ancienne version" });
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

function hydrateSkillGrades(grades) {
  return Object.fromEntries(skillCatalog.map((skill) => [skill.id, normalizeGrade(grades?.[skill.id])]));
}

function normalizeGrade(value) {
  if (value === "" || value === null || value === undefined) return "";
  const numeric = Number.parseFloat(String(value).replace(",", "."));
  if (!Number.isFinite(numeric)) return "";
  const clamped = Math.min(20, Math.max(0, numeric));
  return Math.round(clamped * 2) / 2;
}

function mapGradeToStatus(grade) {
  const numeric = normalizeGrade(grade);
  if (numeric === "") return "non_evalue";
  if (numeric < 5) return "non_acquis";
  if (numeric < 10) return "en_cours_acquisition";
  if (numeric < 14) return "partiellement_acquis";
  return "acquis";
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
      feedback.textContent = "Serveur indisponible. VÃ©rifie le dÃ©ploiement Cloudflare.";
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
    logAction("Classe crÃ©Ã©e", name, `${year} // ${note}`);
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
    logAction("Ã‰lÃ¨ve ajoutÃ©", name, getClassById(classId)?.name || classId);
    persistAppData();
    studentForm.reset();
    renderClassesPage();
  });

  importButton.addEventListener("click", async () => {
    if (!canManageStudents) return;
    const file = csvInput.files?.[0];
    const classId = importClassInput.value;
    if (!file || !classId) {
      importFeedback.textContent = "SÃ©lectionne un fichier CSV et une classe cible.";
      return;
    }
    const text = await file.text();
    const rows = parseCsv(text);
    const names = extractStudentNames(rows);
    if (!names.length) {
      importFeedback.textContent = "Aucun nom d'Ã©lÃ¨ve dÃ©tectÃ© dans le CSV.";
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
    if (imported) logAction("Import CSV", getClassById(classId)?.name || classId, `${imported} Ã©lÃ¨ve(s) ajoutÃ©s`);
    persistAppData();
    importFeedback.textContent = `${imported} Ã©lÃ¨ve(s) importÃ©(s), ${skipped} ignorÃ©(s).`;
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
            <span class="badge accent">${students.length} Ã©lÃ¨ves</span>
          </div>
          <p>${classItem.year}</p>
          <p>${classItem.note}</p>
          <div class="class-meta">
            <span class="badge">${getClassProgress(classItem.id)}% validÃ©</span>
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
            <p>${filledPeriods}/6 PFMP renseignÃ©es</p>
          </div>
          <div class="student-badges">
            <span class="badge">${getStudentProgress(student)}% validÃ©</span>
            <span class="badge">${filledPeriods}/6 pÃ©riodes</span>
            <button class="ghost-button student-delete" type="button" data-id="${student.id}"${canManageStudents ? "" : " disabled"}>Supprimer l'Ã©lÃ¨ve</button>
          </div>
        </article>
      `;
    }).join("");

    classCards.querySelectorAll(".class-delete").forEach((button) => {
      button.addEventListener("click", () => {
        if (!canManageStudents) return;
        const classItem = getClassById(button.dataset.id);
        if (!classItem) return;
        if (!window.confirm(`Supprimer la classe "${classItem.name}" et tous ses Ã©lÃ¨ves ?`)) return;
        deleteClass(button.dataset.id);
        renderClassesPage();
      });
    });

    studentDirectory.querySelectorAll(".student-delete").forEach((button) => {
      button.addEventListener("click", () => {
        if (!canManageStudents) return;
        const student = getStudentById(button.dataset.id);
        if (!student) return;
        if (!window.confirm(`Supprimer l'Ã©lÃ¨ve "${student.name}" ?`)) return;
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
          <span>Ã‰lÃ¨ve suivi</span>
          <select id="support-student-select"></select>
        </label>
        <label class="field">
          <span>Date</span>
          <input id="support-date-input" type="date">
        </label>
      </div>
      <div class="mini-grid">
        <label class="field">
          <span>PrÃ©sence</span>
          <select id="support-status-select">
            <option value="present">PrÃ©sent</option>
            <option value="retard">Retard</option>
            <option value="absent">Absent</option>
          </select>
        </label>
        <label class="field">
          <span>Motif / prÃ©cision</span>
          <input id="support-reason-input" type="text" placeholder="Ex. convocation, oubli matÃ©riel, absence justifiÃ©e">
        </label>
      </div>
      <div class="student-badges">
        <button id="support-attendance-save" class="ghost-button" type="button">Ajouter un Ã©vÃ©nement</button>
      </div>
      <label class="field">
        <span>Commentaire horodatÃ©</span>
        <textarea id="support-note-input" rows="4" placeholder="Remarque pÃ©dagogique, comportement, point d'appui, vigilance..."></textarea>
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
    logAction("Classe crÃ©Ã©e", name, `${year} // ${note}`);
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
    logAction("Ã‰lÃ¨ve ajoutÃ©", name, getClassById(classId)?.name || classId);
    persistAppData();
    studentForm.reset();
    renderClassesPage();
  });

  importButton.addEventListener("click", async () => {
    if (!canManageStudents) return;
    const file = csvInput.files?.[0];
    const classId = importClassInput.value;
    if (!file || !classId) {
      importFeedback.textContent = "SÃ©lectionne un fichier CSV et une classe cible.";
      return;
    }
    const text = await file.text();
    const rows = parseCsv(text);
    const names = extractStudentNames(rows);
    if (!names.length) {
      importFeedback.textContent = "Aucun nom d'Ã©lÃ¨ve dÃ©tectÃ© dans le CSV.";
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
    if (imported) logAction("Import CSV", getClassById(classId)?.name || classId, `${imported} Ã©lÃ¨ve(s) ajoutÃ©s`);
    persistAppData();
    importFeedback.textContent = `${imported} Ã©lÃ¨ve(s) importÃ©(s), ${skipped} ignorÃ©(s).`;
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
    logAction("PrÃ©sence saisie", student.name, `${supportStatusSelect.value} // ${supportDateInput.value}`);
    persistAppData();
    supportReasonInput.value = "";
    renderClassesPage(student.id);
  });

  supportNoteSave?.addEventListener("click", () => {
    if (!canManageStudents) return;
    const student = getStudentById(supportStudentSelect.value);
    if (!student || !supportNoteInput.value.trim()) return;
    addStudentNote(student.id, supportNoteInput.value);
    logAction("Commentaire Ã©lÃ¨ve", student.name, "Note horodatÃ©e ajoutÃ©e");
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
            <span class="badge accent">${students.length} Ã©lÃ¨ves</span>
          </div>
          <p>${classItem.year}</p>
          <p>${classItem.note}</p>
          <div class="class-meta">
            <span class="badge">${getClassProgress(classItem.id)}% validÃ©</span>
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
            <p>${filledPeriods}/6 PFMP renseignÃ©es</p>
          </div>
          <div class="student-badges">
            <span class="badge">${getStudentProgress(student)}% validÃ©</span>
            <span class="badge">${filledPeriods}/6 pÃ©riodes</span>
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
        const year = window.prompt("Nouvelle annÃ©e", classItem.year);
        if (!year) return;
        const note = window.prompt("Nouvelle rÃ©fÃ©rence", classItem.note);
        if (!note) return;
        classItem.name = name.trim();
        classItem.year = year.trim();
        classItem.note = note.trim();
        logAction("Classe modifiÃ©e", classItem.name, `${classItem.year} // ${classItem.note}`);
        persistAppData();
        renderClassesPage();
      });
    });

    classCards.querySelectorAll(".class-delete").forEach((button) => {
      button.addEventListener("click", () => {
        if (!canManageStudents) return;
        const classItem = getClassById(button.dataset.id);
        if (!classItem) return;
        if (!window.confirm(`Supprimer la classe "${classItem.name}" et tous ses Ã©lÃ¨ves ?`)) return;
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
        const name = window.prompt("Nouveau nom de l'Ã©lÃ¨ve", student.name);
        if (!name) return;
        const classId = window.prompt("Nouvelle classe (id)", student.classId);
        if (!classId || !getClassById(classId.trim())) return;
        student.name = name.trim();
        student.classId = classId.trim();
        app.pfmpRecords[student.id] = hydratePfmpRecord(app.pfmpRecords[student.id] || {}, student, app.classes);
        logAction("Ã‰lÃ¨ve modifiÃ©", student.name, getClassById(student.classId)?.name || student.classId);
        persistAppData();
        renderClassesPage();
      });
    });

    studentDirectory.querySelectorAll(".student-delete").forEach((button) => {
      button.addEventListener("click", () => {
        if (!canManageStudents) return;
        const student = getStudentById(button.dataset.id);
        if (!student) return;
        if (!window.confirm(`Supprimer l'Ã©lÃ¨ve "${student.name}" ?`)) return;
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
      supportHistory.innerHTML = `<article class="summary-card"><h3>Aucun Ã©lÃ¨ve</h3><p class="muted-copy">Ajoute un Ã©lÃ¨ve pour activer le suivi.</p></article>`;
      return;
    }
    const stats = getAttendanceStats(student);
    supportStatsGrid.innerHTML = [
      { label: "Absences", value: stats.absent, trace: "Ã©vÃ©nements saisis" },
      { label: "Retards", value: stats.retard, trace: "Ã©vÃ©nements saisis" },
      { label: "Commentaires", value: (student.notes || []).length, trace: "notes horodatÃ©es" },
      { label: "Progression", value: `${getStudentProgress(student)}%`, trace: getClassById(student.classId)?.name || "sans classe" }
    ].map(renderStatCard).join("");

    const attendanceRows = (student.attendance || []).slice(0, 8).map((entry) => `
      <article class="directory-row compact">
        <div>
          <strong>${entry.status === "absent" ? "Absence" : entry.status === "retard" ? "Retard" : "PrÃ©sence"}</strong>
          <p>${entry.date}</p>
          <p>${entry.reason || "Sans prÃ©cision"}</p>
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
      ${attendanceRows || `<article class="summary-card"><h3>Aucune prÃ©sence</h3><p class="muted-copy">Aucun Ã©vÃ©nement saisi pour cet Ã©lÃ¨ve.</p></article>`}
      ${noteRows || `<article class="summary-card"><h3>Aucun commentaire</h3><p class="muted-copy">Aucune note horodatÃ©e pour cet Ã©lÃ¨ve.</p></article>`}
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
    feedback.textContent = "Compte administrateur mis Ã  jour.";
    renderTeachers();
  });

  teacherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!teacherUsername.value.trim() || !teacherPassword.value.trim()) return;
    addTeacherAccount(teacherUsername.value.trim(), teacherPassword.value.trim());
    teacherForm.reset();
    feedback.textContent = "Professeur ajoutÃ©.";
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
        feedback.textContent = "Professeur modifiÃ©.";
        renderTeachers();
      });
    });

    teacherAccountsList.querySelectorAll(".teacher-delete").forEach((button) => {
      button.addEventListener("click", () => {
        removeTeacherAccount(button.dataset.id);
        feedback.textContent = "Professeur supprimÃ©.";
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
    logAction("Classe crÃ©Ã©e", name, `${year} // ${note}`);
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
    logAction("Ã‰lÃ¨ve ajoutÃ©", name, getClassById(classId)?.name || classId);
    persistAppData();
    studentForm.reset();
    renderClassesPage();
  });

  importButton.addEventListener("click", async () => {
    if (!canManageStudents) return;
    const file = csvInput.files?.[0];
    const classId = importClassInput.value;
    if (!file || !classId) {
      importFeedback.textContent = "SÃ©lectionne un fichier CSV et une classe cible.";
      return;
    }
    const text = await file.text();
    const rows = parseCsv(text);
    const names = extractStudentNames(rows);
    if (!names.length) {
      importFeedback.textContent = "Aucun nom d'Ã©lÃ¨ve dÃ©tectÃ© dans le CSV.";
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
    if (imported) logAction("Import CSV", getClassById(classId)?.name || classId, `${imported} Ã©lÃ¨ve(s) ajoutÃ©s`);
    persistAppData();
    importFeedback.textContent = `${imported} Ã©lÃ¨ve(s) importÃ©(s), ${skipped} ignorÃ©(s).`;
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
            <span class="badge accent">${students.length} Ã©lÃ¨ves</span>
          </div>
          <p>${classItem.year}</p>
          <p>${classItem.note}</p>
          <div class="class-meta">
            <span class="badge">${getClassProgress(classItem.id)}% validÃ©</span>
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
            <p>${filledPeriods}/6 PFMP renseignÃ©es</p>
          </div>
          <div class="student-badges">
            <span class="badge">${getStudentProgress(student)}% validÃ©</span>
            <span class="badge">${filledPeriods}/6 pÃ©riodes</span>
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
        const year = window.prompt("Nouvelle annÃ©e", classItem.year);
        if (!year) return;
        const note = window.prompt("Nouvelle rÃ©fÃ©rence", classItem.note);
        if (!note) return;
        classItem.name = name.trim();
        classItem.year = year.trim();
        classItem.note = note.trim();
        logAction("Classe modifiÃ©e", classItem.name, `${classItem.year} // ${classItem.note}`);
        persistAppData();
        renderClassesPage();
      });
    });

    classCards.querySelectorAll(".class-delete").forEach((button) => {
      button.addEventListener("click", () => {
        if (!canManageStudents) return;
        const classItem = getClassById(button.dataset.id);
        if (!classItem) return;
        if (!window.confirm(`Supprimer la classe "${classItem.name}" et tous ses Ã©lÃ¨ves ?`)) return;
        deleteClass(button.dataset.id);
        renderClassesPage();
      });
    });

    studentDirectory.querySelectorAll(".student-edit").forEach((button) => {
      button.addEventListener("click", () => {
        const student = getStudentById(button.dataset.id);
        if (!student || !canManageStudents) return;
        const name = window.prompt("Nouveau nom de l'Ã©lÃ¨ve", student.name);
        if (!name) return;
        const classId = window.prompt("Nouvelle classe (id)", student.classId);
        if (!classId || !getClassById(classId.trim())) return;
        student.name = name.trim();
        student.classId = classId.trim();
        app.pfmpRecords[student.id] = hydratePfmpRecord(app.pfmpRecords[student.id] || {}, student, app.classes);
        logAction("Ã‰lÃ¨ve modifiÃ©", student.name, getClassById(student.classId)?.name || student.classId);
        persistAppData();
        renderClassesPage();
      });
    });

    studentDirectory.querySelectorAll(".student-delete").forEach((button) => {
      button.addEventListener("click", () => {
        if (!canManageStudents) return;
        const student = getStudentById(button.dataset.id);
        if (!student) return;
        if (!window.confirm(`Supprimer l'Ã©lÃ¨ve "${student.name}" ?`)) return;
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
        <span>Professeur rÃ©fÃ©rent</span>
        <select id="teacher-filter-select"></select>
      </label>
      <label class="field">
        <span>Recherche globale</span>
        <input id="global-search-input" type="text" placeholder="Ã‰lÃ¨ve, classe, entreprise, TP/TD...">
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
          <h2>Calendrier pÃ©dagogique</h2>
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
    logAction("RÃ©initialisation", "Application", "Jeu de donnÃ©es par dÃ©faut restaurÃ©");
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

    classMeta.textContent = classItem ? `${classItem.name} // ${classItem.year} // ${students.length} Ã©lÃ¨ves${selectedTeacher !== "all" ? ` // ${selectedTeacher}` : ""}` : "Aucune classe";
    statsGrid.innerHTML = [
      { label: "Ã‰lÃ¨ves", value: students.length, trace: "effectif de la classe" },
      { label: "Progression moyenne", value: `${progressAverage}%`, trace: strongestBlock ? `bloc fort: ${strongestBlock.domain}` : "aucune donnÃ©e" },
      { label: "PFMP renseignÃ©es", value: pfmpSummary.withCompany, trace: "entreprise saisie" },
      { label: "Conventions complÃ¨tes", value: pfmpSummary.fullConvention, trace: "entreprise + parents + lycÃ©e" }
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
    `).join("") : `<article class="summary-card"><h3>Aucune alerte</h3><p class="muted-copy">Aucune alerte pour ce filtre sur la classe sÃ©lectionnÃ©e.</p></article>`;

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
      `).join("") : `<article class="summary-card"><h3>Aucune Ã©chÃ©ance</h3><p class="muted-copy">Aucune Ã©chÃ©ance prioritaire sur ce pÃ©rimÃ¨tre.</p></article>`;
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
        results.push({ label: student.name, meta: `Ã‰lÃ¨ve // ${className}` });
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
    `).join("") : `<article class="summary-card"><h3>Aucun rÃ©sultat</h3><p class="muted-copy">Aucune correspondance pour cette recherche.</p></article>`;
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
    logAction("Livret PFMP mis Ã  jour", student.name, PFMP_PERIODS.find((period) => period.id === periodSelect.value)?.label || periodSelect.value);
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
      summaryGrid.innerHTML = `<article class="summary-card"><h3>Aucun Ã©lÃ¨ve</h3><p class="muted-copy">Ajoute un Ã©lÃ¨ve pour utiliser le livret.</p></article>`;
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
      { label: "Ã‰lÃ¨ve", value: student.name, trace: getClassById(student.classId)?.name || "" },
      { label: "Entreprise", value: pfmpEntry.companyName || "Non renseignÃ©e", trace: pfmpEntry.tutorName || "Tuteur non renseignÃ©" },
      { label: "PÃ©riode", value: PFMP_PERIODS.find((period) => period.id === periodSelect.value)?.label || periodSelect.value, trace: pfmpEntry.visitDate || "Visite non planifiÃ©e" },
      { label: "Prof rÃ©fÃ©rent", value: pfmpEntry.teacher || "Non renseignÃ©", trace: `${getStudentProgress(student)}% progression globale` }
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
            <span>Niveau observÃ©</span>
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
    summaryGrid.innerHTML = alerts.length ? alerts.map(renderRemediationCard).join("") : `<article class="summary-card"><h3>Aucune remÃ©diation globale</h3><p class="muted-copy">Aucun signal bloquant pour ce filtre.</p></article>`;
    detailGrid.innerHTML = detailItems.length ? detailItems.map(renderRemediationCard).join("") : `<article class="summary-card"><h3>Aucune action</h3><p class="muted-copy">Aucune relance Ã  traiter pour ce filtre.</p></article>`;
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
  const activityIndicatorSkill = document.querySelector("#activity-indicator-skill");
  const activityIndicatorLabel = document.querySelector("#activity-indicator-label");
  const activityIndicatorAddButton = document.querySelector("#activity-indicator-add");
  const activityIndicatorClearButton = document.querySelector("#activity-indicator-clear");
  const activityIndicatorList = document.querySelector("#activity-indicator-list");
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
  const activitySubmitButton = document.querySelector("#activity-submit-button");
  const activityCancelEditButton = document.querySelector("#activity-cancel-edit");
  const canEditEvaluations = hasPermission("edit_evaluations");
  const canEditSkills = hasPermission("edit_skills");
  const currentView = getRequestedEvaluationsView();
  let exportBar = document.querySelector("#activity-export-bar");
  let activityIndicatorDraft = [];

  if (!exportBar && activityReport) {
    exportBar = document.createElement("div");
    exportBar.id = "activity-export-bar";
    exportBar.className = "student-badges";
    exportBar.innerHTML = `
      <button id="activity-export-pdf" class="ghost-button" type="button">Exporter PDF sÃ©ance</button>
      <button id="activity-synthesis-pdf" class="ghost-button" type="button">Exporter PDF synthÃ¨se classe</button>
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
  syncIndicatorSkillOptions();
  renderIndicatorDraft();
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

  function getIndicatorDisplayLabel(indicator) {
    const linkedSkill = indicator?.skillId ? getSkillById(indicator.skillId) : null;
    return linkedSkill ? `${linkedSkill.code} // ${indicator.label}` : indicator.label;
  }

  function buildIndicatorsFromTextarea() {
    return activityIndicators.value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((label, index) => ({ id: slugify(`${activityTitle.value || "indicator"}-${index}-${Date.now()}`), label, skillId: "" }));
  }

  function syncIndicatorSkillOptions() {
    if (!activityIndicatorSkill) return;
    const selectedSkillIds = getActivitySkillIdsForIndicatorPickerSafe(activitySkill, activityForm);
    renderActivityIndicatorSkillSelectSafe(activityIndicatorSkill, selectedSkillIds);
  }

  function syncIndicatorTextareaFromDraft() {
    if (!activityIndicators) return;
    const storedDraft = getStoredActivityIndicatorDraftSafe(activityForm);
    if (storedDraft.length || activityForm?.dataset?.indicatorDraft === "[]") {
      activityIndicatorDraft = storedDraft;
    } else {
      activityIndicatorDraft = setStoredActivityIndicatorDraftSafe(activityForm, activityIndicatorDraft);
    }
    activityIndicators.value = activityIndicatorDraft.map((indicator) => indicator.label).join("\n");
  }

  function renderIndicatorDraft() {
    if (!activityIndicatorList) return;
    const storedDraft = getStoredActivityIndicatorDraftSafe(activityForm);
    if (storedDraft.length || activityForm?.dataset?.indicatorDraft === "[]") {
      activityIndicatorDraft = storedDraft;
    } else {
      activityIndicatorDraft = setStoredActivityIndicatorDraftSafe(activityForm, activityIndicatorDraft);
    }
      if (!activityIndicatorDraft.length) {
      activityIndicatorList.innerHTML = `<article class="directory-row"><div><strong>Aucun indicateur structuré</strong><p>Ajoute un indicateur lié à une compétence ou utilise la saisie rapide.</p></div></article>`;
      return;
    }
    activityIndicatorList.innerHTML = activityIndicatorDraft.map((indicator) => `
      <article class="directory-row compact">
        <div>
          <strong>${escapeHtml(indicator.label)}</strong>
          <p>${escapeHtml(indicator.skillId ? getActivitySkillLabel({ skillIds: [indicator.skillId], skillId: indicator.skillId }) : "Toutes les compétences de la séance")}</p>
        </div>
        <div class="student-badges">
          <button class="ghost-button activity-indicator-remove" type="button" data-id="${indicator.id}">Retirer</button>
        </div>
      </article>
    `).join("");
    activityIndicatorList.querySelectorAll(".activity-indicator-remove").forEach((button) => {
      button.addEventListener("click", () => {
        activityIndicatorDraft = activityIndicatorDraft.filter((indicator) => indicator.id !== button.dataset.id);
        setStoredActivityIndicatorDraftSafe(activityForm, activityIndicatorDraft);
        syncIndicatorTextareaFromDraft();
        renderIndicatorDraft();
      });
    });
  }

  function resetActivityEditor() {
    activityForm.reset();
    clearMultiSelect(activitySkill);
    setPendingActivitySkillIdsForIndicatorPickerSafe(activityForm, []);
    activityForm.dataset.appliedSkillIds = "[]";
    activityIndicatorDraft = [];
    renderActivityIndicatorSkillSelectSafe(activityIndicatorSkill, []);
    syncIndicatorTextareaFromDraft();
    renderIndicatorDraft();
    populateIndicatorBankSelect(indicatorBankSelect);
    if (activitySubmitButton) activitySubmitButton.textContent = "Créer la séance";
    if (activityCancelEditButton) activityCancelEditButton.hidden = true;
    delete activityForm.dataset.editingId;
  }

  function loadActivityIntoEditor(activity) {
    if (!activity) return;
    const activitySkillIds = getActivitySkillIds(activity);
    activityForm.dataset.editingId = activity.id;
    activityType.value = activity.type || "TP";
    activityTitle.value = activity.title || "";
    activityClass.value = activity.classId || "";
    activityDateStart.value = activity.startDate || activity.date || "";
    activityDateEnd.value = activity.endDate || activity.startDate || activity.date || "";
    activityComment.value = activity.comment || "";
    setMultiSelectValues(activitySkill, activitySkillIds);
    setPendingActivitySkillIdsForIndicatorPickerSafe(activityForm, activitySkillIds);
    activityForm.dataset.appliedSkillIds = JSON.stringify(activitySkillIds);
    activityIndicatorDraft = (activity.indicators || []).map((indicator, index) => ({
      id: indicator.id || slugify(`${activity.id}-${index}`),
      label: indicator.label,
      skillId: indicator.skillId || ""
    }));
    renderActivityIndicatorSkillSelectSafe(activityIndicatorSkill, activitySkillIds);
    syncIndicatorTextareaFromDraft();
    renderIndicatorDraft();
    populateIndicatorBankSelect(indicatorBankSelect, activitySkillIds, indicatorBankDomain?.value || "all");
    if (activitySubmitButton) activitySubmitButton.textContent = "Enregistrer les modifications";
    if (activityCancelEditButton) activityCancelEditButton.hidden = false;
    applyEvaluationsView("create");
    activityFeedback.textContent = `Édition de la séance : ${activity.title}`;
  }

  enforcePermission("edit_evaluations", activityType, activityTitle, activityClass, activitySkill, activityDateStart, activityDateEnd, activityIndicators, activityComment, activityEditButton, activityDeleteButton);
  enforcePermission("edit_evaluations", indicatorBankDomain, indicatorBankSelect, indicatorBankLoadButton, indicatorBankSaveButton, activityDuplicateButton);

  activityForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!canEditEvaluations) return;
    const selectedSkillIds = getActivitySkillIdsForIndicatorPickerSafe(activitySkill, activityForm);
    const indicators = normalizeActivityIndicatorsBySkillSafe((activityIndicatorDraft.length ? activityIndicatorDraft : buildIndicatorsFromTextarea()).map((indicator, index) => ({
      id: indicator.id || slugify(`${activityTitle.value}-${index}-${Date.now()}`),
      label: indicator.label,
      skillId: indicator.skillId || ""
    })), selectedSkillIds);
    if (!activityTitle.value.trim() || !activityClass.value || !selectedSkillIds.length || !indicators.length) {
      activityFeedback.textContent = "Renseigne un titre, une classe, une compétence et au moins un indicateur.";
      return;
    }
    const newActivity = hydrateEvaluationActivity({
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
    }, app.evaluationActivities.length);
    app.evaluationActivities.push(newActivity);
    logAction("Séance créée", activityTitle.value.trim(), `${activityType.value} // ${getClassById(activityClass.value)?.name || ""}`);
    persistAppData();
    activityForm.reset();
    clearMultiSelect(activitySkill);
    setPendingActivitySkillIdsForIndicatorPickerSafe(activityForm, []);
    activityForm.dataset.appliedSkillIds = "[]";
    renderActivityIndicatorSkillSelectSafe(activityIndicatorSkill, []);
    populateIndicatorBankSelect(indicatorBankSelect);
    activityFeedback.textContent = "Séance créée.";
    sessionClassSelect.value = activityClass.value;
    syncSessionActivities(newActivity.id);
    renderEvaluationPage();
  });

  sessionClassSelect.addEventListener("change", () => {
    syncSessionActivities();
    renderEvaluationPage();
  });
  activitySkill.addEventListener("change", () => {
    const selectedSkillIds = getSelectedValues(activitySkill);
    setPendingActivitySkillIdsForIndicatorPickerSafe(activityForm, selectedSkillIds);
    populateIndicatorBankSelect(indicatorBankSelect, selectedSkillIds, indicatorBankDomain?.value || "all");
    renderActivityIndicatorSkillSelectSafe(activityIndicatorSkill, getActivitySkillIdsForIndicatorPickerSafe(activitySkill, activityForm));
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
    const title = window.prompt("Nouveau titre de la sÃ©ance", activity.title);
    if (!title) return;
    const startDate = window.prompt("Nouvelle date de debut", activity.startDate || activity.date || "");
    const endDate = window.prompt("Nouvelle date de fin", activity.endDate || activity.startDate || activity.date || "");
    const skillsValue = window.prompt("CompÃƒÂ©tences (codes sÃƒÂ©parÃƒÂ©s par , ex: C4,C8)", getActivitySkills(activity).map((skill) => skill.code).join(", "));
    const indicators = window.prompt("Indicateurs (sÃ©parÃ©s par |)", activity.indicators.map((item) => item.label).join(" | "));
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
    activity.indicators = normalizeActivityIndicatorsBySkillSafe(
      indicators.split("|").map((item, index) => ({
        id: activity.indicators[index]?.id || slugify(`${title}-${index}-${Date.now()}`),
        label: item.trim(),
        skillId: activity.indicators[index]?.skillId || ""
      })).filter((item) => item.label),
      skillIds
    );
    logAction("SÃ©ance modifiÃ©e", activity.title, activity.type);
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
        label: indicator.label,
        skillId: indicator.skillId || ""
      }))
    }, app.evaluationActivities.length);
    app.evaluationActivities.push(duplicate);
    logAction("SÃƒÂ©ance dupliquÃƒÂ©e", duplicate.title, `${duplicate.type} // ${getClassById(duplicate.classId)?.name || duplicate.classId}`);
    persistAppData();
    sessionClassSelect.value = duplicate.classId;
    syncSessionActivities(duplicate.id);
    renderEvaluationPage();
  });

  activityDeleteButton?.addEventListener("click", () => {
    const activity = getActivityById(activitySelect.value);
    if (!activity || !canEditEvaluations) return;
    if (!window.confirm(`Supprimer la sÃ©ance "${activity.title}" ?`)) return;
    app.evaluationActivities = app.evaluationActivities.filter((item) => item.id !== activity.id);
    logAction("SÃ©ance supprimÃ©e", activity.title, activity.type);
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
    activityFeedback.textContent = `Banque chargÃƒÂ©e : ${bank.name}.`;
  });

  indicatorBankSaveButton?.addEventListener("click", () => {
    if (!canEditEvaluations) return;
    const indicators = activityIndicators.value.split("\n").map((line) => line.trim()).filter(Boolean);
    if (!indicators.length) {
      activityFeedback.textContent = "Saisis d'abord des indicateurs ÃƒÂ  enregistrer.";
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
    logAction("Banque d'indicateurs crÃƒÂ©ÃƒÂ©e", name.trim(), domains.join(" // ") || "Multi-domaines");
    persistAppData();
    populateIndicatorBankSelect(indicatorBankSelect, selectedSkillIds, indicatorBankDomain?.value || "all");
    indicatorBankSelect.value = app.indicatorBank[app.indicatorBank.length - 1].id;
    activityFeedback.textContent = "Banque d'indicateurs enregistrÃƒÂ©e.";
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
      activitySummary.innerHTML = `<article class="summary-card"><h3>Aucune sÃ©ance</h3><p class="muted-copy">CrÃ©e un TP ou un TD pour commencer.</p></article>`;
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
    if (!activity) {
      activityMatrix.className = "activity-cards-layout";
      activityMatrix.innerHTML = "";
      return;
    }
    if (activitySelect?.value !== activity.id && [...(activitySelect?.options || [])].some((option) => option.value === activity.id)) {
      activitySelect.value = activity.id;
    }
    activityMatrix.className = "activity-cards-layout";
    activityMatrix.innerHTML = "";
    activityMatrix.dataset.renderActivityId = activity.id;
    const renderCards = window.__cielRenderActivityCardsLayoutSafe;
    if (typeof renderCards === "function") {
      renderCards();
      window.setTimeout(renderCards, 0);
      window.setTimeout(renderCards, 80);
    }
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
        <p class="muted-copy">Moyenne de la sÃ©ance: ${getActivityAverage(activity, students)}%</p>
        <p class="muted-copy">${students.length} Ã©lÃ¨ve(s) Ã©valuÃ©(s)</p>
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
    }).join("") : `<article class="summary-card"><h3>Aucune synthÃ¨se</h3><p class="muted-copy">Aucun TP/TD enregistrÃ© pour cette classe.</p></article>`;
  }

  function renderStudentSheet() {
    const student = getStudentById(evalStudentSelect.value) || getStudentsByClass(evalClassSelect.value)[0];
    if (!student) {
      studentSkillsEditor.innerHTML = "";
      studentSheetMeta.textContent = "Aucun Ã©lÃ¨ve disponible";
      return;
    }
    studentSheetMeta.textContent = `${getClassById(student.classId)?.name || ""} // ${getStudentProgress(student)}% validÃ©`;
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
        logAction("CompÃ©tence modifiÃ©e", student.name, `${skill.code} // ${levelLabels[event.target.value]}`);
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
    document.body.classList.toggle("evaluations-create-view", view === "create");
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
        <span>Recherche Ã©lÃ¨ve / entreprise</span>
        <input id="pfmp-search-input" type="text" placeholder="Nom, entreprise, tuteur...">
      </label>
      <label class="field">
        <span>Filtre dossier</span>
        <select id="pfmp-status-filter">
          <option value="all">Tous</option>
          <option value="missing-company">Sans entreprise</option>
          <option value="incomplete-convention">Convention incomplÃ¨te</option>
          <option value="visit-missing">Visite Ã  planifier</option>
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
      <button id="export-pfmp-pdf-student" class="ghost-button" type="button">Exporter PDF Ã©lÃ¨ve</button>
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
    logAction("PFMP mise Ã  jour", student.name, PFMP_PERIODS.find((period) => period.id === periodSelect.value)?.label || periodSelect.value);
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
      { label: "PFMP renseignÃ©es", value: summary.withCompany, trace: "entreprise saisie" },
      { label: "Conventions complÃ¨tes", value: summary.fullConvention, trace: "3 signatures" },
      { label: "Visites planifiÃ©es", value: summary.visitPlanned, trace: "date de visite saisie" },
      { label: "Dossiers complets", value: summary.completeFile, trace: "rapport + livret + prÃ©sence" }
    ].map(renderStatCard).join("");

    const selectedRecord = selectedStudent ? getPfmpPeriodEntry(selectedStudent.id, periodSelect.value) : createEmptyPfmpEntry();
    Object.entries(inputs).forEach(([key, input]) => { input.value = selectedRecord[key] || ""; });
    setMultiSelectValues(observedSkillsSelect, selectedRecord.observedSkillIds || []);

    periodsOverview.innerHTML = PFMP_PERIODS.map((period) => {
      const entry = selectedStudent ? getPfmpPeriodEntry(selectedStudent.id, period.id) : createEmptyPfmpEntry();
      return `
        <article class="period-card">
          <strong>${period.label}</strong>
          <p class="muted-copy">${entry.companyName || "Entreprise non renseignÃ©e"}</p>
          <div class="pfmp-kpis">
            <span class="badge">${getPfmpCompletion(entry)} champs</span>
            <span class="badge">${(entry.observedSkillIds || []).length} comp. observees</span>
            <span class="badge">${entry.visitDate ? "Visite OK" : "Visite Ã  planifier"}</span>
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
            <p>${filledPeriods}/6 PFMP renseignÃ©es</p>
            <p>${PFMP_PERIODS.filter((period) => getPfmpPeriodEntry(student.id, period.id).visitDate).length} visites planifiÃ©es</p>
          </div>
          <div class="pfmp-kpis">
            <span class="badge">${filledPeriods}/6 pÃ©riodes</span>
            <span class="badge">${PFMP_PERIODS.filter((period) => hasFullConvention(getPfmpPeriodEntry(student.id, period.id))).length}/6 conventions</span>
            <span class="badge">${PFMP_PERIODS.filter((period) => hasCompleteFile(getPfmpPeriodEntry(student.id, period.id))).length}/6 dossiers</span>
          </div>
        </article>
      `;
    }).join("") || `<article class="summary-card"><h3>Aucun rÃ©sultat</h3><p class="muted-copy">Aucun Ã©lÃ¨ve ne correspond Ã  cette recherche ou Ã  ce filtre.</p></article>`;
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
    logAction("Classe crÃ©Ã©e", name, `${year} // ${note}`);
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
    logAction("Ã‰lÃ¨ve ajoutÃ©", name, getClassById(classId)?.name || classId);
    persistAppData();
    studentForm.reset();
    renderClassesPage();
  });

  importButton.addEventListener("click", async () => {
    if (!canManageStudents) return;
    const file = csvInput.files?.[0];
    const classId = importClassInput.value;
    if (!file || !classId) {
      importFeedback.textContent = "SÃ©lectionne un fichier CSV et une classe cible.";
      return;
    }
    const text = await file.text();
    const rows = parseCsv(text);
    const names = extractStudentNames(rows);
    if (!names.length) {
      importFeedback.textContent = "Aucun nom d'Ã©lÃ¨ve dÃ©tectÃ© dans le CSV.";
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
    if (imported) logAction("Import CSV", getClassById(classId)?.name || classId, `${imported} Ã©lÃ¨ve(s) ajoutÃ©s`);
    persistAppData();
    importFeedback.textContent = `${imported} Ã©lÃ¨ve(s) importÃ©(s), ${skipped} ignorÃ©(s).`;
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
            <span class="badge accent">${students.length} Ã©lÃ¨ves</span>
          </div>
          <p>${classItem.year}</p>
          <p>${classItem.note}</p>
          <div class="class-meta">
            <span class="badge">${getClassProgress(classItem.id)}% validÃ©</span>
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
            <p>${filledPeriods}/6 PFMP renseignÃ©es</p>
          </div>
          <div class="student-badges">
            <span class="badge">${getStudentProgress(student)}% validÃ©</span>
            <span class="badge">${filledPeriods}/6 pÃ©riodes</span>
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
        const year = window.prompt("Nouvelle annÃ©e", classItem.year);
        if (!year) return;
        const note = window.prompt("Nouvelle rÃ©fÃ©rence", classItem.note);
        if (!note) return;
        classItem.name = name.trim();
        classItem.year = year.trim();
        classItem.note = note.trim();
        logAction("Classe modifiÃ©e", classItem.name, `${classItem.year} // ${classItem.note}`);
        persistAppData();
        renderClassesPage();
      });
    });

    classCards.querySelectorAll(".class-delete").forEach((button) => {
      button.addEventListener("click", () => {
        if (!canManageStudents) return;
        const classItem = getClassById(button.dataset.id);
        if (!classItem) return;
        if (!window.confirm(`Supprimer la classe "${classItem.name}" et tous ses Ã©lÃ¨ves ?`)) return;
        deleteClass(button.dataset.id);
        renderClassesPage();
      });
    });

    studentDirectory.querySelectorAll(".student-edit").forEach((button) => {
      button.addEventListener("click", () => {
        const student = getStudentById(button.dataset.id);
        if (!student || !canManageStudents) return;
        const name = window.prompt("Nouveau nom de l'Ã©lÃ¨ve", student.name);
        if (!name) return;
        const classId = window.prompt("Nouvelle classe (id)", student.classId);
        if (!classId || !getClassById(classId.trim())) return;
        student.name = name.trim();
        student.classId = classId.trim();
        app.pfmpRecords[student.id] = hydratePfmpRecord(app.pfmpRecords[student.id] || {}, student, app.classes);
        logAction("Ã‰lÃ¨ve modifiÃ©", student.name, getClassById(student.classId)?.name || student.classId);
        persistAppData();
        renderClassesPage();
      });
    });

    studentDirectory.querySelectorAll(".student-delete").forEach((button) => {
      button.addEventListener("click", () => {
        if (!canManageStudents) return;
        const student = getStudentById(button.dataset.id);
        if (!student) return;
        if (!window.confirm(`Supprimer l'Ã©lÃ¨ve "${student.name}" ?`)) return;
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
    logAction("Export JSON", "Sauvegarde", "Base tÃ©lÃ©chargÃ©e localement");
    persistAppData();
    restoreFeedback.textContent = "Sauvegarde JSON tÃ©lÃ©chargÃ©e.";
  });

  restoreJsonButton?.addEventListener("click", async () => {
    const file = restoreJsonInput?.files?.[0];
    if (!file) {
      restoreFeedback.textContent = "SÃ©lectionne d'abord un fichier JSON.";
      return;
    }
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      replaceAppState(data);
      logAction("Restauration JSON", "Base", file.name);
      await persistCriticalAppData();
      restoreFeedback.textContent = "Base restaurÃ©e avec succÃ¨s.";
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
    logAction("Compte admin mis Ã  jour", adminUsername.value.trim(), "Identifiant ou mot de passe modifiÃ©");
    await persistCriticalAppData();
    feedback.textContent = "Compte administrateur synchronisÃ©.";
    renderAdministration();
  });

  teacherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!teacherUsername.value.trim() || !teacherPassword.value.trim()) return;
    const account = addTeacherAccount(teacherUsername.value.trim(), teacherPassword.value.trim(), teacherRole.value);
    logAction("Compte crÃ©Ã©", account.username, `RÃ´le: ${getRoleLabel(account.role)}`);
    teacherForm.reset();
    teacherRole.value = "professeur";
    await persistCriticalAppData();
    feedback.textContent = "Compte ajoutÃ© et synchronisÃ©.";
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
    `).join("") : `<article class="summary-card"><h3>Aucune activitÃ©</h3><p class="muted-copy">Le journal se remplira automatiquement dÃ¨s les premiÃ¨res actions.</p></article>`;

    teacherAccountsList.querySelectorAll(".teacher-edit").forEach((button) => {
      button.addEventListener("click", async () => {
        const teacher = getAccountById(button.dataset.id);
        if (!teacher) return;
        const username = window.prompt("Nouvel identifiant du compte", teacher.username);
        if (!username) return;
        const password = window.prompt("Nouveau mot de passe du compte", teacher.password);
        if (!password) return;
        const role = window.prompt(`Nouveau rÃ´le (${getTeacherRoleValues().join(", ")})`, teacher.role);
        if (!role || !getTeacherRoleValues().includes(role.trim())) return;
        updateAccount(teacher.id, {
          username: username.trim(),
          password: password.trim(),
          role: role.trim(),
          previousUsername: teacher.username
        });
        logAction("Compte modifiÃ©", username.trim(), `RÃ´le: ${getRoleLabel(role.trim())}`);
        await persistCriticalAppData();
        feedback.textContent = "Compte modifiÃ© et synchronisÃ©.";
        renderAdministration();
      });
    });

    teacherAccountsList.querySelectorAll(".teacher-delete").forEach((button) => {
      button.addEventListener("click", async () => {
        const removed = getAccountById(button.dataset.id);
        removeTeacherAccount(button.dataset.id);
        if (removed) logAction("Compte supprimÃ©", removed.username, removed.label);
        await persistCriticalAppData();
        feedback.textContent = "Compte supprimÃ© et synchronisÃ©.";
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
    logAction("RÃ©initialisation", "Application", "Jeu de donnÃ©es par dÃ©faut restaurÃ©");
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

    classMeta.textContent = classItem ? `${classItem.name} // ${classItem.year} // ${students.length} Ã©lÃ¨ves` : "Aucune classe";
    statsGrid.innerHTML = [
      { label: "Ã‰lÃ¨ves", value: students.length, trace: "effectif de la classe" },
      { label: "Progression moyenne", value: `${progressAverage}%`, trace: strongestBlock ? `bloc fort: ${strongestBlock.domain}` : "aucune donnÃ©e" },
      { label: "PFMP renseignÃ©es", value: pfmpSummary.withCompany, trace: "entreprise saisie" },
      { label: "Conventions complÃ¨tes", value: pfmpSummary.fullConvention, trace: "entreprise + parents + lycÃ©e" }
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
    logAction("Export JSON", "Sauvegarde", "Base tÃ©lÃ©chargÃ©e localement");
    persistAppData();
    restoreFeedback.textContent = "Sauvegarde JSON tÃ©lÃ©chargÃ©e.";
  });

  restoreJsonButton?.addEventListener("click", async () => {
    const file = restoreJsonInput?.files?.[0];
    if (!file) {
      restoreFeedback.textContent = "SÃ©lectionne d'abord un fichier JSON.";
      return;
    }
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      replaceAppState(data);
      logAction("Restauration JSON", "Base", file.name);
      persistAppData();
      restoreFeedback.textContent = "Base restaurÃ©e avec succÃ¨s.";
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
    logAction("Compte admin mis Ã  jour", adminUsername.value.trim(), "Identifiant ou mot de passe modifiÃ©");
    feedback.textContent = "Compte administrateur mis Ã  jour.";
    renderAdministration();
  });

  teacherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!teacherUsername.value.trim() || !teacherPassword.value.trim()) return;
    const account = addTeacherAccount(teacherUsername.value.trim(), teacherPassword.value.trim(), teacherRole.value);
    logAction("Compte crÃ©Ã©", account.username, `RÃ´le: ${getRoleLabel(account.role)}`);
    teacherForm.reset();
    teacherRole.value = "professeur";
    feedback.textContent = "Compte ajoutÃ©.";
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
    `).join("") : `<article class="summary-card"><h3>Aucune activitÃ©</h3><p class="muted-copy">Le journal se remplira automatiquement dÃ¨s les premiÃ¨res actions.</p></article>`;

    teacherAccountsList.querySelectorAll(".teacher-edit").forEach((button) => {
      button.addEventListener("click", () => {
        const teacher = getAccountById(button.dataset.id);
        if (!teacher) return;
        const username = window.prompt("Nouvel identifiant du compte", teacher.username);
        if (!username) return;
        const password = window.prompt("Nouveau mot de passe du compte", teacher.password);
        if (!password) return;
        const role = window.prompt(`Nouveau rÃ´le (${getTeacherRoleValues().join(", ")})`, teacher.role);
        if (!role || !getTeacherRoleValues().includes(role.trim())) return;
        updateAccount(teacher.id, {
          username: username.trim(),
          password: password.trim(),
          role: role.trim(),
          previousUsername: teacher.username
        });
        logAction("Compte modifiÃ©", username.trim(), `RÃ´le: ${getRoleLabel(role.trim())}`);
        feedback.textContent = "Compte modifiÃ©.";
        renderAdministration();
      });
    });

    teacherAccountsList.querySelectorAll(".teacher-delete").forEach((button) => {
      button.addEventListener("click", () => {
        const removed = getAccountById(button.dataset.id);
        removeTeacherAccount(button.dataset.id);
        if (removed) logAction("Compte supprimÃ©", removed.username, removed.label);
        feedback.textContent = "Compte supprimÃ©.";
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
      meta.textContent = "Aucun Ã©lÃ¨ve disponible";
      sheet.innerHTML = `<article class="summary-card"><h3>Aucun bulletin</h3><p class="muted-copy">Ajoute des Ã©lÃ¨ves dans une classe pour gÃ©nÃ©rer un bulletin.</p></article>`;
      return;
    }

    const classItem = getClassById(student.classId);
    const studentActivities = app.evaluationActivities.filter((activity) => activity.classId === student.classId && activity.evaluations?.[student.id]);
    const pfmpSummary = getStudentPfmpSummary(student.id);
    const blockAverages = getBlockAverages([student]);
    meta.textContent = `${classItem?.name || ""} // ${getStudentProgress(student)}% validÃ©`;

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
        ${renderStatCard({ label: "Progression", value: `${getStudentProgress(student)}%`, trace: "sur l'ensemble du rÃ©fÃ©rentiel" })}
        ${renderStatCard({ label: "TP/TD saisis", value: studentActivities.length, trace: "activitÃ©s avec notes" })}
        ${renderStatCard({ label: "PFMP remplies", value: `${pfmpSummary.filled}/6`, trace: "pÃ©riodes avec entreprise" })}
      </div>

      <div class="bulletin-grid">
        <section class="summary-card">
          <h3>CompÃ©tences</h3>
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
          <h3>SynthÃ¨se par bloc</h3>
          <div class="bulletin-pfmp">
            ${blockAverages.map((block) => `
              <article class="period-card">
                <strong>${block.domain}</strong>
                <p class="muted-copy">${block.validated}/${block.total} compÃ©tences consolidÃ©es</p>
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
                <p class="muted-copy">${activity.date || "Date non renseignÃ©e"}</p>
                <p class="muted-copy">${getSkillById(activity.skillId)?.code || ""} ${getSkillById(activity.skillId)?.title || ""}</p>
                <div class="pfmp-kpis">
                  <span class="badge">${getStudentActivityAverage(activity, student.id)}%</span>
                  <span class="badge">${Object.keys(activity.evaluations?.[student.id] || {}).length} indicateurs</span>
                </div>
              </article>
            `).join("") : `<article class="period-card"><strong>Aucune activitÃ©</strong><p class="muted-copy">Aucun TP/TD saisi pour cet Ã©lÃ¨ve.</p></article>`}
          </div>
        </section>

        <section class="summary-card">
          <h3>Ã‰tat PFMP</h3>
          <div class="bulletin-pfmp">
            ${PFMP_PERIODS.map((period) => {
              const entry = getPfmpPeriodEntry(student.id, period.id);
              return `
                <article class="period-card">
                  <strong>${period.label}</strong>
                  <p class="muted-copy">${entry.companyName || "Entreprise non renseignÃ©e"}</p>
                  <div class="pfmp-kpis">
                    <span class="badge">${getPfmpCompletion(entry)} champs</span>
                    <span class="badge">${entry.visitDate ? "Visite OK" : "Visite Ã  planifier"}</span>
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
    alerts.push({ level: "critical", title: "Ã‰lÃ¨ves en forte difficultÃ©", detail: `${lowProgress.length} Ã©lÃ¨ve(s) ont une progression sous 35%.` });
  }
  if (noPfmp.length) {
    alerts.push({ level: "warning", title: "PFMP non renseignÃ©es", detail: `${noPfmp.length} Ã©lÃ¨ve(s) n'ont encore aucune entreprise saisie.` });
  }
  if (incompletePfmp.length) {
    alerts.push({ level: "warning", title: "Dossiers PFMP incomplets", detail: `${incompletePfmp.length} Ã©lÃ¨ve(s) ont une convention ou un dossier incomplet.` });
  }
  if (unevaluatedSkills.length) {
    alerts.push({ level: "info", title: "CompÃ©tences jamais consolidÃ©es", detail: `${unevaluatedSkills.length} compÃ©tence(s) contiennent encore du non Ã©valuÃ© dans la classe.` });
  }
  if (activitiesWithoutMarks.length) {
    alerts.push({ level: "info", title: "SÃ©ances sans saisie", detail: `${activitiesWithoutMarks.length} TP/TD existent mais n'ont encore aucune Ã©valuation.` });
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
            detail: "Entreprise non renseignÃ©e.",
            action: "Saisir une entreprise ou vÃ©rifier le placement."
          });
        }
        if (entry.companyName && !hasFullConvention(entry)) {
          items.push({
            level: "critical",
            category: "PFMP",
            title: `${student.name} // ${period.label}`,
            detail: "Convention incomplÃ¨te.",
            action: "ComplÃ©ter les signatures entreprise, parents et lycÃ©e."
          });
        }
        if (entry.companyName && !entry.visitDate) {
          items.push({
            level: "warning",
            category: "PFMP",
            title: `${student.name} // ${period.label}`,
            detail: "Visite PFMP non planifiÃ©e.",
            action: "Planifier la visite ou consigner un contact tÃ©lÃ©phonique."
          });
        }
        if (entry.companyName && !hasCompleteFile(entry)) {
          items.push({
            level: "info",
            category: "PFMP",
            title: `${student.name} // ${period.label}`,
            detail: "Dossier PFMP incomplet.",
            action: "Renseigner rapport, livret et fiche de prÃ©sence."
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
        action: "PrÃ©voir une reprise ciblÃ©e, un TP d'appui ou une sÃ©ance diffÃ©renciÃ©e."
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
          detail: "Aucune Ã©valuation saisie.",
          action: "ComplÃ©ter la grille avant clÃ´ture de la sÃ©ance."
        });
      }

      students.forEach((student) => {
        const missing = activity.indicators.filter((indicator) => getActivityIndicatorStatus(activity, student.id, indicator.id) === "non_evalue");
        if (missing.length) {
          items.push({
            level: "info",
            category: "Evaluation",
            title: `${student.name} // ${activity.title}`,
            detail: `${missing.length} indicateur(s) non Ã©valuÃ©(s).`,
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
        detail: `${impacted.length} Ã©lÃ¨ve(s) encore non Ã©valuÃ©(s).`,
        action: "PrÃ©voir une Ã©valuation dÃ©diÃ©e ou rattacher la compÃ©tence Ã  un TP/TD."
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
          meta: "Entreprise non renseignÃ©e."
        });
        return;
      }
      if (!hasFullConvention(entry)) {
        notices.push({
          priority: 2,
          title: `${student.name} - ${period.label}`,
          meta: "Convention incomplÃ¨te."
        });
      }
      if (!entry.visitDate) {
        notices.push({
          priority: 3,
          title: `${student.name} - ${period.label}`,
          meta: "Visite PFMP Ã  planifier."
        });
      }
      if (!hasCompleteFile(entry)) {
        notices.push({
          priority: 4,
          title: `${student.name} - ${period.label}`,
          meta: "Dossier PFMP Ã  finaliser."
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
        meta: `${unevaluatedStudents.length} Ã©lÃ¨ve(s) encore non Ã©valuÃ©(s).`
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
  const selected = [...(select?.selectedOptions || [])].map((option) => option.value).filter(Boolean);
  if (selected.length) return selected;
  const currentValue = select?.value;
  return currentValue ? [currentValue] : [];
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

function getActivitySkillIdsForIndicatorPickerSafe(skillSelect, form, fallbackSkillIds = []) {
  let skillIds = [];
  try {
    const parsed = JSON.parse(form?.dataset?.appliedSkillIds || "[]");
    if (Array.isArray(parsed) && parsed.length) {
      skillIds = parsed.filter(Boolean);
    }
  } catch {}
  if (!skillIds.length) {
    try {
      const parsed = JSON.parse(form?.dataset?.pendingSkillIds || "[]");
      if (Array.isArray(parsed) && parsed.length) {
        skillIds = parsed.filter(Boolean);
      }
    } catch {}
  }
  if (!skillIds.length) {
    skillIds = getSelectedValues(skillSelect);
  }
  if (!skillIds.length && Array.isArray(fallbackSkillIds) && fallbackSkillIds.length) {
    skillIds = fallbackSkillIds.filter(Boolean);
  }
  return [...new Set(skillIds)];
}

function setPendingActivitySkillIdsForIndicatorPickerSafe(form, skillIds) {
  if (!form) return [];
  const normalized = [...new Set((skillIds || []).filter(Boolean))];
  form.dataset.pendingSkillIds = JSON.stringify(normalized);
  return normalized;
}

function getStoredActivityIndicatorDraftSafe(form) {
  if (!form?.dataset?.indicatorDraft) return [];
  try {
    const parsed = JSON.parse(form.dataset.indicatorDraft);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => item && typeof item === "object")
      .map((item, index) => ({
        id: item.id || slugify(`indicator-draft-${index}-${Date.now()}`),
        label: String(item.label || "").trim(),
        skillId: item.skillId || ""
      }))
      .filter((item) => item.label);
  } catch {
    return [];
  }
}

function setStoredActivityIndicatorDraftSafe(form, draft) {
  if (!form) return [];
  const normalized = (Array.isArray(draft) ? draft : [])
    .filter((item) => item && typeof item === "object")
    .map((item, index) => ({
      id: item.id || slugify(`indicator-draft-${index}-${Date.now()}`),
      label: String(item.label || "").trim(),
      skillId: item.skillId || ""
    }))
    .filter((item) => item.label);
  form.dataset.indicatorDraft = JSON.stringify(normalized);
  return normalized;
}

function getAuthoritativeActivityIndicatorDraftSafe(form) {
  if (!form?.dataset?.authoritativeIndicatorDraft) return [];
  try {
    const parsed = JSON.parse(form.dataset.authoritativeIndicatorDraft);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => item && typeof item === "object")
      .map((item, index) => ({
        id: item.id || slugify(`authoritative-indicator-${index}-${Date.now()}`),
        label: String(item.label || "").trim(),
        skillId: item.skillId || ""
      }))
      .filter((item) => item.label);
  } catch {
    return [];
  }
}

function setAuthoritativeActivityIndicatorDraftSafe(form, draft) {
  if (!form) return [];
  const normalized = (Array.isArray(draft) ? draft : [])
    .filter((item) => item && typeof item === "object")
    .map((item, index) => ({
      id: item.id || slugify(`authoritative-indicator-${index}-${Date.now()}`),
      label: String(item.label || "").trim(),
      skillId: item.skillId || ""
    }))
    .filter((item) => item.label);
  form.dataset.authoritativeIndicatorDraft = JSON.stringify(normalized);
  return normalized;
}

function renderActivityIndicatorSkillSelectSafe(select, skillIds) {
  if (!select) return;
  const selectedSkills = (skillIds || []).map((skillId) => getSkillById(skillId)).filter(Boolean);
  const previousValue = select.value || "";
  const placeholder = selectedSkills.length ? "Toutes les compétences sélectionnées" : "Choisis d'abord les compétences";
  select.innerHTML = [
    `<option value="">${placeholder}</option>`,
    ...selectedSkills.map((skill) => `<option value="${skill.id}">${skill.code} - ${skill.title}</option>`)
  ].join("");
  select.disabled = !selectedSkills.length;
  if (previousValue && selectedSkills.some((skill) => skill.id === previousValue)) {
    select.value = previousValue;
  } else if (selectedSkills.length === 1) {
    select.value = selectedSkills[0].id;
  } else {
    select.value = "";
  }
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
  if (!date) return "Ã€ planifier";
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
      kind: "SÃ©ance",
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
        meta: `${entry.companyName || "Entreprise non renseignÃ©e"} // ${entry.teacher || "Professeur non renseignÃ©"}`,
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
      <p><strong>CompÃ©tence :</strong> ${escapeHtml(`${skill?.code || ""} ${skill?.title || ""}`.trim())}</p>
      <p><strong>Date :</strong> ${escapeHtml(activity.date || "Non renseignÃ©e")}</p>
      <p><strong>Moyenne de sÃ©ance :</strong> ${getActivityAverage(activity, students)}%</p>
    </div>
  `;
  const tableHtml = `
    <table>
      <thead>
        <tr>
          <th>Ã‰lÃ¨ve</th>
          ${activity.indicators.map((indicator) => `<th>${escapeHtml(indicator.label)}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${students.map((student) => `
          <tr>
            <td>${escapeHtml(student.name)}</td>
            ${activity.indicators.map((indicator) => `<td>${escapeHtml(levelLabels[getActivityIndicatorStatus(activity, student.id, indicator.id)] || "Non Ã©valuÃ©")}</td>`).join("")}
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
        <td>${escapeHtml(activity.date || "Non renseignÃ©e")}</td>
        <td>${activity.indicators.length}</td>
        <td>${getActivityAverage(activity, students)}%</td>
      </tr>
    `;
  }).join("");
  return buildPrintShell(
    `SynthÃ¨se des sÃ©ances - ${classItem?.name || ""}`,
    `${activities.length} sÃ©ance(s) enregistrÃ©e(s)`,
    `
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>SÃ©ance</th>
            <th>CompÃ©tence</th>
            <th>Date</th>
            <th>Indicateurs</th>
            <th>Moyenne</th>
          </tr>
        </thead>
        <tbody>${rows || '<tr><td colspan="6">Aucune sÃ©ance enregistrÃ©e.</td></tr>'}</tbody>
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
        <p><strong>Entreprise :</strong> ${escapeHtml(entry.companyName || "Non renseignÃ©e")}</p>
        <p><strong>Tuteur :</strong> ${escapeHtml(entry.tutorName || "-")}</p>
        <p><strong>Professeur rÃ©fÃ©rent :</strong> ${escapeHtml(entry.teacher || "-")}</p>
        <p><strong>Visite :</strong> ${escapeHtml(entry.visitDate || "Ã€ planifier")}</p>
        <p><strong>Convention :</strong> ${hasFullConvention(entry) ? "ComplÃ¨te" : "IncomplÃ¨te"}</p>
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
    `SynthÃ¨se PFMP - ${classItem?.name || ""}`,
    `${students.length} Ã©lÃ¨ve(s)`,
    `
      <table>
        <thead>
          <tr>
            <th>Ã‰lÃ¨ve</th>
            <th>PÃ©riodes renseignÃ©es</th>
            <th>Conventions complÃ¨tes</th>
            <th>Visites planifiÃ©es</th>
            <th>Dossiers complets</th>
          </tr>
        </thead>
        <tbody>${rows || '<tr><td colspan="5">Aucun Ã©lÃ¨ve.</td></tr>'}</tbody>
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
    logAction("RÃ©initialisation", "Application", "Jeu de donnÃ©es par dÃ©faut restaurÃ©");
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

    classMeta.textContent = classItem ? `${classItem.name} // ${classItem.year} // ${students.length} Ã©lÃ¨ves` : "Aucune classe";
    statsGrid.innerHTML = [
      { label: "Ã‰lÃ¨ves", value: students.length, trace: "effectif de la classe" },
      { label: "Progression moyenne", value: `${progressAverage}%`, trace: strongestBlock ? `bloc fort: ${strongestBlock.domain}` : "aucune donnÃ©e" },
      { label: "PFMP renseignÃ©es", value: pfmpSummary.withCompany, trace: "entreprise saisie" },
      { label: "Conventions complÃ¨tes", value: pfmpSummary.fullConvention, trace: "entreprise + parents + lycÃ©e" }
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
      `).join("") : `<article class="summary-card"><h3>Aucune alerte</h3><p class="muted-copy">Aucune alerte pour ce filtre sur la classe sÃ©lectionnÃ©e.</p></article>`;
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
    logAction("Classe crÃ©Ã©e", name, `${year} // ${note}`);
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
    logAction("Ã‰lÃ¨ve ajoutÃ©", name, getClassById(classId)?.name || classId);
    persistAppData();
    studentForm.reset();
    renderClassesPage();
  });

  importButton.addEventListener("click", async () => {
    if (!canManageStudents) return;
    const file = csvInput.files?.[0];
    const classId = importClassInput.value;
    if (!file || !classId) {
      importFeedback.textContent = "SÃ©lectionne un fichier CSV et une classe cible.";
      return;
    }
    const text = await file.text();
    const rows = parseCsv(text);
    const names = extractStudentNames(rows);
    if (!names.length) {
      importFeedback.textContent = "Aucun nom d'Ã©lÃ¨ve dÃ©tectÃ© dans le CSV.";
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
    if (imported) logAction("Import CSV", getClassById(classId)?.name || classId, `${imported} Ã©lÃ¨ve(s) ajoutÃ©s`);
    persistAppData();
    importFeedback.textContent = `${imported} Ã©lÃ¨ve(s) importÃ©(s), ${skipped} ignorÃ©(s).`;
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
            <span class="badge accent">${students.length} Ã©lÃ¨ves</span>
          </div>
          <p>${classItem.year}</p>
          <p>${classItem.note}</p>
          <div class="class-meta">
            <span class="badge">${getClassProgress(classItem.id)}% validÃ©</span>
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
            <p>${filledPeriods}/6 PFMP renseignÃ©es</p>
          </div>
          <div class="student-badges">
            <span class="badge">${getStudentProgress(student)}% validÃ©</span>
            <span class="badge">${filledPeriods}/6 pÃ©riodes</span>
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
        const year = window.prompt("Nouvelle annÃ©e", classItem.year);
        if (!year) return;
        const note = window.prompt("Nouvelle rÃ©fÃ©rence", classItem.note);
        if (!note) return;
        classItem.name = name.trim();
        classItem.year = year.trim();
        classItem.note = note.trim();
        logAction("Classe modifiÃ©e", classItem.name, `${classItem.year} // ${classItem.note}`);
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
        const name = window.prompt("Nouveau nom de l'Ã©lÃ¨ve", student.name);
        if (!name) return;
        const classId = window.prompt("Nouvelle classe (id)", student.classId);
        if (!classId || !getClassById(classId.trim())) return;
        student.name = name.trim();
        student.classId = classId.trim();
        app.pfmpRecords[student.id] = hydratePfmpRecord(app.pfmpRecords[student.id] || {}, student, app.classes);
        logAction("Ã‰lÃ¨ve modifiÃ©", student.name, getClassById(student.classId)?.name || student.classId);
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
      meta.textContent = "Aucun Ã©lÃ¨ve disponible";
      sheet.innerHTML = `<article class="summary-card"><h3>Aucun bulletin</h3><p class="muted-copy">Ajoute des Ã©lÃ¨ves dans une classe pour gÃ©nÃ©rer un bulletin.</p></article>`;
      return;
    }

    const classItem = getClassById(student.classId);
    const studentActivities = app.evaluationActivities.filter((activity) => activity.classId === student.classId && activity.evaluations?.[student.id]);
    const pfmpSummary = getStudentPfmpSummary(student.id);
    const blockAverages = getBlockAverages([student]);
    meta.textContent = `${classItem?.name || ""} // ${getStudentProgress(student)}% validÃ©`;

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
      ${renderStatCard({ label: "Progression", value: `${getStudentProgress(student)}%`, trace: "sur l'ensemble du rÃ©fÃ©rentiel" })}
      ${renderStatCard({ label: "TP/TD saisis", value: studentActivities.length, trace: "activitÃ©s avec notes" })}
      ${renderStatCard({ label: "PFMP remplies", value: `${pfmpSummary.filled}/6`, trace: "pÃ©riodes avec entreprise" })}
    </div>

    <div class="bulletin-grid">
      <section class="summary-card">
        <h3>CompÃ©tences</h3>
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
        <h3>SynthÃ¨se par bloc</h3>
        <div class="bulletin-pfmp">
          ${blockAverages.map((block) => `
            <article class="period-card">
              <strong>${block.domain}</strong>
              <p class="muted-copy">${block.validated}/${block.total} compÃ©tences consolidÃ©es</p>
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
              <p class="muted-copy">${activity.date || "Date non renseignÃ©e"}</p>
              <p class="muted-copy">${getSkillById(activity.skillId)?.code || ""} ${getSkillById(activity.skillId)?.title || ""}</p>
              <div class="pfmp-kpis">
                <span class="badge">${getStudentActivityAverage(activity, student.id)}%</span>
                <span class="badge">${Object.keys(activity.evaluations?.[student.id] || {}).length} indicateurs</span>
              </div>
            </article>
          `).join("") : `<article class="period-card"><strong>Aucune activitÃ©</strong><p class="muted-copy">Aucun TP/TD saisi pour cet Ã©lÃ¨ve.</p></article>`}
        </div>
      </section>

      <section class="summary-card">
        <h3>Ã‰tat PFMP</h3>
        <div class="bulletin-pfmp">
          ${PFMP_PERIODS.map((period) => {
            const entry = getPfmpPeriodEntry(student.id, period.id);
            return `
              <article class="period-card">
                <strong>${period.label}</strong>
                <p class="muted-copy">${entry.companyName || "Entreprise non renseignÃ©e"}</p>
                <div class="pfmp-kpis">
                  <span class="badge">${getPfmpCompletion(entry)} champs</span>
                  <span class="badge">${entry.visitDate ? "Visite OK" : "Visite Ã  planifier"}</span>
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
      <h1>Bulletin de compÃ©tences</h1>
      <p class="meta">${student.name} // ${classItem?.name || ""} // ${classItem?.year || ""} // Ã‰ditÃ© le ${new Date().toLocaleDateString("fr-FR")}</p>
      <div class="kpis">
        <div class="kpi"><strong>Progression</strong><div>${getStudentProgress(student)}%</div></div>
        <div class="kpi"><strong>TP/TD saisis</strong><div>${studentActivities.length}</div></div>
        <div class="kpi"><strong>PFMP remplies</strong><div>${pfmpSummary.filled}/6</div></div>
      </div>
      <div class="grid">
        <section class="card">
          <h2>CompÃ©tences</h2>
          ${skillCatalog.map((skill) => `<div class="row"><div><strong>${skill.code}</strong> ${skill.title}</div><div class="pill">${levelLabels[student.skills[skill.id]]}</div></div>`).join("")}
        </section>
        <section class="card">
          <h2>Blocs</h2>
          ${blockAverages.map((block) => `<div class="row"><div>${block.domain}</div><div>${block.progress}%</div></div>`).join("")}
        </section>
      </div>
      <div class="grid">
        <section class="card">
          <h2>ActivitÃ©s</h2>
          ${studentActivities.length ? studentActivities.map((activity) => `<div class="row"><div><strong>${activity.type}</strong> ${activity.title}<br><span class="meta">${activity.date || "Date non renseignÃ©e"}</span></div><div>${getStudentActivityAverage(activity, student.id)}%</div></div>`).join("") : `<p>Aucune activitÃ©.</p>`}
        </section>
        <section class="card">
          <h2>PFMP</h2>
          ${PFMP_PERIODS.map((period) => {
            const entry = getPfmpPeriodEntry(student.id, period.id);
            return `<div class="row"><div><strong>${period.label}</strong><br><span class="meta">${entry.companyName || "Entreprise non renseignÃ©e"}</span></div><div>${entry.visitDate ? "Visite OK" : "Ã€ planifier"}</div></div>`;
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
  logAction("Classe supprimÃ©e", classItem.name, `${studentIds.length} Ã©lÃ¨ve(s) retirÃ©(s)`);
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
  logAction("Ã‰lÃ¨ve supprimÃ©", student.name, getClassById(student.classId)?.name || student.classId);
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
    logAction("Classe crÃ©Ã©e", name, `${year} // ${note}`);
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
    logAction("Ã‰lÃ¨ve ajoutÃ©", name, getClassById(classId)?.name || classId);
    persistAppData();
    studentForm.reset();
    renderClassesPage();
  });

  importButton.addEventListener("click", async () => {
    if (!canManageStudents) return;
    const file = csvInput.files?.[0];
    const classId = importClassInput.value;
    if (!file || !classId) {
      importFeedback.textContent = "SÃ©lectionne un fichier CSV et une classe cible.";
      return;
    }
    const text = await file.text();
    const rows = parseCsv(text);
    const names = extractStudentNames(rows);
    if (!names.length) {
      importFeedback.textContent = "Aucun nom d'Ã©lÃ¨ve dÃ©tectÃ© dans le CSV.";
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
    if (imported) logAction("Import CSV", getClassById(classId)?.name || classId, `${imported} Ã©lÃ¨ve(s) ajoutÃ©s`);
    persistAppData();
    importFeedback.textContent = `${imported} Ã©lÃ¨ve(s) importÃ©(s), ${skipped} ignorÃ©(s).`;
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
            <span class="badge accent">${students.length} Ã©lÃ¨ves</span>
          </div>
          <p>${classItem.year}</p>
          <p>${classItem.note}</p>
          <div class="class-meta">
            <span class="badge">${getClassProgress(classItem.id)}% validÃ©</span>
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
            <p>${filledPeriods}/6 PFMP renseignÃ©es</p>
          </div>
          <div class="student-badges">
            <span class="badge">${getStudentProgress(student)}% validÃ©</span>
            <span class="badge">${filledPeriods}/6 pÃ©riodes</span>
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
      activitySummary.innerHTML = `<article class="summary-card"><h3>Aucune sÃ©ance</h3><p class="muted-copy">CrÃ©e un TP ou un TD pour commencer.</p></article>`;
      return;
    }
    const skill = getSkillById(activity.skillId);
    activitySummary.innerHTML = `
      <article class="summary-card">
        <h3>${activity.type} // ${activity.title}</h3>
        <p class="muted-copy">${classItem?.name || ""} // ${skill?.code || ""} ${skill?.title || ""}</p>
        <p class="muted-copy">${activity.date || "Date non renseignÃ©e"} // ${activity.indicators.length} indicateur(s)</p>
      </article>
    `;
  }

  function renderActivityMatrix(activity, classId) {
    if (!activity) {
      activityMatrix.className = "activity-cards-layout";
      activityMatrix.innerHTML = "";
      return;
    }
    if (activitySelect?.value !== activity.id && [...(activitySelect?.options || [])].some((option) => option.value === activity.id)) {
      activitySelect.value = activity.id;
    }
    activityMatrix.className = "activity-cards-layout";
    activityMatrix.innerHTML = "";
    activityMatrix.dataset.renderActivityId = activity.id;
    const renderCards = window.__cielRenderActivityCardsLayoutSafe;
    if (typeof renderCards === "function") {
      renderCards();
      window.setTimeout(renderCards, 0);
      window.setTimeout(renderCards, 80);
    }
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
        <p class="muted-copy">Moyenne de la sÃ©ance: ${activityAverage}%</p>
        <p class="muted-copy">${students.length} Ã©lÃ¨ve(s) Ã©valuÃ©(s)</p>
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
            <p>${activity.date || "Date non renseignÃ©e"}</p>
          </div>
          <div class="student-badges">
            <span class="badge">${activity.indicators.length} indicateurs</span>
            <span class="badge">${getActivityAverage(activity, students)}% moyen</span>
          </div>
        </article>
      `;
    }).join("") : `<article class="summary-card"><h3>Aucune synthÃ¨se</h3><p class="muted-copy">Aucun TP/TD enregistrÃ© pour cette classe.</p></article>`;
  }

  function renderStudentSheet() {
    const student = getStudentById(evalStudentSelect.value) || getStudentsByClass(evalClassSelect.value)[0];
    if (!student) {
      studentSkillsEditor.innerHTML = "";
      studentSheetMeta.textContent = "Aucun Ã©lÃ¨ve disponible";
      return;
    }
    studentSheetMeta.textContent = `${getClassById(student.classId)?.name || ""} // ${getStudentProgress(student)}% validÃ©`;
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
        logAction("CompÃ©tence modifiÃ©e", student.name, `${skill.code} // ${levelLabels[event.target.value]}`);
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
    logAction("PFMP mise Ã  jour", student.name, PFMP_PERIODS.find((period) => period.id === periodSelect.value)?.label || periodSelect.value);
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
      { label: "PFMP renseignÃ©es", value: summary.withCompany, trace: "entreprise saisie" },
      { label: "Conventions complÃ¨tes", value: summary.fullConvention, trace: "3 signatures" },
      { label: "Visites planifiÃ©es", value: summary.visitPlanned, trace: "date de visite saisie" },
      { label: "Dossiers complets", value: summary.completeFile, trace: "rapport + livret + prÃ©sence" }
    ].map(renderStatCard).join("");

    const selectedRecord = selectedStudent ? getPfmpPeriodEntry(selectedStudent.id, periodSelect.value) : createEmptyPfmpEntry();
    Object.entries(inputs).forEach(([key, input]) => { input.value = selectedRecord[key] || ""; });

    periodsOverview.innerHTML = PFMP_PERIODS.map((period) => {
      const entry = selectedStudent ? getPfmpPeriodEntry(selectedStudent.id, period.id) : createEmptyPfmpEntry();
      return `
        <article class="period-card">
          <strong>${period.label}</strong>
          <p class="muted-copy">${entry.companyName || "Entreprise non renseignÃ©e"}</p>
          <div class="pfmp-kpis">
            <span class="badge">${getPfmpCompletion(entry)} champs</span>
            <span class="badge">${entry.visitDate ? "Visite OK" : "Visite Ã  planifier"}</span>
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
            <p>${filledPeriods}/6 PFMP renseignÃ©es</p>
            <p>${PFMP_PERIODS.filter((period) => getPfmpPeriodEntry(student.id, period.id).visitDate).length} visites planifiÃ©es</p>
          </div>
          <div class="pfmp-kpis">
            <span class="badge">${filledPeriods}/6 pÃ©riodes</span>
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
    nav.querySelector('a[href="candidate.html"]')?.remove();
    nav.querySelector('a[href="certification.html"]')?.remove();
    upsertStaticDropdown(nav, "Referentiel", [
      { href: "coverage.html", label: "Couverture" },
      { href: "mapping.html", label: "Cartographie" },
      { href: "library.html", label: "Bibliotheque de seances" },
      { href: "reports.html", label: "Rapports premium" }
    ], page === "coverage" || page === "mapping" || page === "library" || page === "reports", "referential-menu");
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
  const links = app.classes.flatMap((classItem) => {
    const classLinks = [
      { type: "label", label: getClassNavLabel(classItem) },
      { href: `evaluations.html?class=${encodeURIComponent(classItem.id)}&view=create`, label: "Creation de seance" },
      { href: `evaluations.html?class=${encodeURIComponent(classItem.id)}&view=session`, label: "Evaluation seance" },
      { href: `evaluations.html?class=${encodeURIComponent(classItem.id)}&view=skills`, label: "Competences eleves" }
    ];
    if (getClassLevelOrder(classItem.id) === 3) {
      classLinks.push({
        href: `candidate.html?class=${encodeURIComponent(classItem.id)}`,
        label: "Examen"
      });
    }
    return classLinks;
  });
  upsertStaticDropdown(nav, "Evaluations", links, page === "evaluations" || page === "candidate" || page === "certification", "evaluations-menu");
}

function upsertPfmpDropdown(nav) {
  nav.querySelector('a[href="pfmp.html"]')?.remove();
  const links = app.classes.flatMap((classItem) => ([
    { type: "label", label: getClassNavLabel(classItem) },
    { href: `pfmp.html?class=${encodeURIComponent(classItem.id)}`, label: "Infos PFMP" },
    { href: `pfmp-livret.html?class=${encodeURIComponent(classItem.id)}`, label: "Livret d'Ã©valuation" }
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
    <summary class="nav-tab nav-dropdown-toggle">${label} <span class="nav-dropdown-caret" aria-hidden="true">▾</span></summary>
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
    logAction("RÃ©initialisation", "Application", "Jeu de donnÃ©es par dÃ©faut restaurÃ©");
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

    classMeta.textContent = classItem ? `${classItem.name} // ${classItem.year} // ${students.length} Ã©lÃ¨ves` : "Aucune classe";
    statsGrid.innerHTML = [
      { label: "Ã‰lÃ¨ves", value: students.length, trace: "effectif de la classe" },
      { label: "Progression moyenne", value: `${progressAverage}%`, trace: strongestBlock ? `bloc fort: ${strongestBlock.domain}` : "aucune donnÃ©e" },
      { label: "PFMP renseignÃ©es", value: pfmpSummary.withCompany, trace: "entreprise saisie" },
      { label: "Conventions complÃ¨tes", value: pfmpSummary.fullConvention, trace: "entreprise + parents + lycÃ©e" }
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
      importFeedback.textContent = "SÃ©lectionne un fichier CSV et une classe cible.";
      return;
    }
    const text = await file.text();
    const rows = parseCsv(text);
    const names = extractStudentNames(rows);
    if (!names.length) {
      importFeedback.textContent = "Aucun nom d'Ã©lÃ¨ve dÃ©tectÃ© dans le CSV.";
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
    importFeedback.textContent = `${imported} Ã©lÃ¨ve(s) importÃ©(s), ${skipped} ignorÃ©(s).`;
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
            <span class="badge accent">${students.length} Ã©lÃ¨ves</span>
          </div>
          <p>${classItem.year}</p>
          <p>${classItem.note}</p>
          <div class="class-meta">
            <span class="badge">${getClassProgress(classItem.id)}% validÃ©</span>
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
            <p>${filledPeriods}/6 PFMP renseignÃ©es</p>
          </div>
          <div class="student-badges">
            <span class="badge">${getStudentProgress(student)}% validÃ©</span>
            <span class="badge">${filledPeriods}/6 pÃ©riodes</span>
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
      activitySummary.innerHTML = `<article class="summary-card"><h3>Aucune sÃ©ance</h3><p class="muted-copy">CrÃ©e un TP ou un TD pour commencer.</p></article>`;
      return;
    }
    const skill = getSkillById(activity.skillId);
    activitySummary.innerHTML = `
      <article class="summary-card">
        <h3>${activity.type} // ${activity.title}</h3>
        <p class="muted-copy">${classItem?.name || ""} // ${skill?.code || ""} ${skill?.title || ""}</p>
        <p class="muted-copy">${activity.date || "Date non renseignÃ©e"} // ${activity.indicators.length} indicateur(s)</p>
      </article>
    `;
  }

  function renderActivityMatrix(activity, classId) {
    if (!activity) {
      activityMatrix.className = "activity-cards-layout";
      activityMatrix.innerHTML = "";
      return;
    }
    if (activitySelect?.value !== activity.id && [...(activitySelect?.options || [])].some((option) => option.value === activity.id)) {
      activitySelect.value = activity.id;
    }
    activityMatrix.className = "activity-cards-layout";
    activityMatrix.innerHTML = "";
    activityMatrix.dataset.renderActivityId = activity.id;
    const renderCards = window.__cielRenderActivityCardsLayoutSafe;
    if (typeof renderCards === "function") {
      renderCards();
      window.setTimeout(renderCards, 0);
      window.setTimeout(renderCards, 80);
    }
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
        <p class="muted-copy">Moyenne de la sÃ©ance: ${activityAverage}%</p>
        <p class="muted-copy">${students.length} Ã©lÃ¨ve(s) Ã©valuÃ©(s)</p>
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
            <p>${activity.date || "Date non renseignÃ©e"}</p>
          </div>
          <div class="student-badges">
            <span class="badge">${activity.indicators.length} indicateurs</span>
            <span class="badge">${getActivityAverage(activity, students)}% moyen</span>
          </div>
        </article>
      `;
    }).join("") : `<article class="summary-card"><h3>Aucune synthÃ¨se</h3><p class="muted-copy">Aucun TP/TD enregistrÃ© pour cette classe.</p></article>`;
  }

  function renderStudentSheet() {
    const student = getStudentById(evalStudentSelect.value) || getStudentsByClass(evalClassSelect.value)[0];
    if (!student) {
      studentSkillsEditor.innerHTML = "";
      studentSheetMeta.textContent = "Aucun Ã©lÃ¨ve disponible";
      return;
    }
    studentSheetMeta.textContent = `${getClassById(student.classId)?.name || ""} // ${getStudentProgress(student)}% validÃ©`;
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
      { label: "PFMP renseignÃ©es", value: summary.withCompany, trace: "entreprise saisie" },
      { label: "Conventions complÃ¨tes", value: summary.fullConvention, trace: "3 signatures" },
      { label: "Visites planifiÃ©es", value: summary.visitPlanned, trace: "date de visite saisie" },
      { label: "Dossiers complets", value: summary.completeFile, trace: "rapport + livret + prÃ©sence" }
    ].map(renderStatCard).join("");

    const selectedRecord = selectedStudent ? getPfmpPeriodEntry(selectedStudent.id, periodSelect.value) : createEmptyPfmpEntry();
    Object.entries(inputs).forEach(([key, input]) => { input.value = selectedRecord[key] || ""; });

    periodsOverview.innerHTML = PFMP_PERIODS.map((period) => {
      const entry = selectedStudent ? getPfmpPeriodEntry(selectedStudent.id, period.id) : createEmptyPfmpEntry();
      return `
        <article class="period-card">
          <strong>${period.label}</strong>
          <p class="muted-copy">${entry.companyName || "Entreprise non renseignÃ©e"}</p>
          <div class="pfmp-kpis">
            <span class="badge">${getPfmpCompletion(entry)} champs</span>
            <span class="badge">${entry.visitDate ? "Visite OK" : "Visite Ã  planifier"}</span>
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
            <p>${filledPeriods}/6 PFMP renseignÃ©es</p>
            <p>${PFMP_PERIODS.filter((period) => getPfmpPeriodEntry(student.id, period.id).visitDate).length} visites planifiÃ©es</p>
          </div>
          <div class="pfmp-kpis">
            <span class="badge">${filledPeriods}/6 pÃ©riodes</span>
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
  target.innerHTML = `<svg class="chart-svg" viewBox="0 0 380 260"><g transform="translate(0 18)"><circle cx="90" cy="90" r="70" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="16"></circle>${segments}<text x="90" y="86" text-anchor="middle" fill="#e7fff8" font-size="28" font-family="Orbitron, sans-serif">${total}</text><text x="90" y="108" text-anchor="middle" fill="#8db5b1" font-size="12">Ã©valuations</text></g></svg>${renderLegend(order.map((status) => ({ label: levelLabels[status], value: counts[status], color: statusColors[status] })))}`;
}

function renderBlockChart(target, blockAverages) {
  const bars = blockAverages.map((block, index) => {
    const width = Math.round((block.progress / 100) * 250);
    const y = 30 + index * 62;
    return `<text x="0" y="${y - 8}" class="main-text">${block.domain}</text><rect x="0" y="${y}" width="250" height="18" rx="9" class="progress-track"></rect><rect x="0" y="${y}" width="${width}" height="18" rx="9" fill="url(#barGradient)"></rect><text x="262" y="${y + 13}" class="muted-text">${block.progress}%</text>`;
  }).join("");
  target.innerHTML = `<svg class="chart-svg" viewBox="0 0 380 240"><defs><linearGradient id="barGradient" x1="0%" x2="100%"><stop offset="0%" stop-color="#62f5d4"></stop><stop offset="100%" stop-color="#59c6ff"></stop></linearGradient></defs><g transform="translate(24 16)">${bars}</g></svg>${renderLegend(blockAverages.map((block) => ({ label: block.domain, value: `${block.validated}/${block.total} validÃ©es`, color: "#62f5d4" })))}`;
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
    { label: "Conventions complÃ¨tes", progress: summary.rateFullConvention, color: "#59c6ff" },
    { label: "Visites planifiÃ©es", progress: summary.rateVisitPlanned, color: "#f7c35f" },
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
    : "Aucune compÃ©tence";
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
  if (!start) return "Date non renseignÃ©e";
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
  const headerIndex = header.findIndex((cell) => ["nom", "name", "eleve", "Ã©lÃ¨ve", "student"].includes(cell));
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
  const headers = ["Classe", "Ã‰lÃ¨ve", ...skillCatalog.map((skill) => `${skill.code} - ${skill.title}`), "Progression"];
  const rows = students.map((student) => [
    classItem.name,
    student.name,
    ...skillCatalog.map((skill) => levelLabels[student.skills[skill.id]]),
    `${getStudentProgress(student)}%`
  ]);
  downloadExcelTable(`${classItem.name} - bilan competences.xls`, "Bilan compÃ©tences", headers, rows);
}

function exportPfmpWorkbook(classItem, students) {
  if (!classItem) return;
  const headers = [
    "Classe", "Ã‰lÃ¨ve", "PÃ©riode", "Entreprise", "Commentaire", "Adresse", "Tuteur", "Mail tuteur", "TÃ©lÃ©phone tuteur",
    "Convention transmise", "Convention signÃ©e entreprise", "Convention signÃ©e parents", "Convention signÃ©e lycÃ©e",
    "Professeur rÃ©fÃ©rent", "Date de visite", "Rapport rendu", "Livret d'Ã©valuation", "Fiche de prÃ©sence"
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
  if (role === "systeme") return "SystÃ¨me";
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
    actor: session?.username || "SystÃ¨me",
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
    logAction("Ã‰valuation saisie", student?.name || studentId, `${activity.title} // ${indicator?.label || indicatorId} // ${levelLabels[status]}`);
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
    logAction("Compte admin mis Ã  jour", adminUsername.value.trim(), "Identifiant ou mot de passe modifiÃ©");
    feedback.textContent = "Compte administrateur mis Ã  jour.";
    renderAdministration();
  });

  teacherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!teacherUsername.value.trim() || !teacherPassword.value.trim()) return;
    const account = addTeacherAccount(teacherUsername.value.trim(), teacherPassword.value.trim(), teacherRole.value);
    logAction("Compte crÃ©Ã©", account.username, `RÃ´le: ${getRoleLabel(account.role)}`);
    teacherForm.reset();
    teacherRole.value = "professeur";
    feedback.textContent = "Compte ajoutÃ©.";
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
    `).join("") : `<article class="summary-card"><h3>Aucune activitÃ©</h3><p class="muted-copy">Le journal se remplira automatiquement dÃ¨s les premiÃ¨res actions.</p></article>`;

    teacherAccountsList.querySelectorAll(".teacher-edit").forEach((button) => {
      button.addEventListener("click", () => {
        const teacher = getAccountById(button.dataset.id);
        if (!teacher) return;
        const username = window.prompt("Nouvel identifiant du compte", teacher.username);
        if (!username) return;
        const password = window.prompt("Nouveau mot de passe du compte", teacher.password);
        if (!password) return;
        const role = window.prompt(`Nouveau rÃ´le (${getTeacherRoleValues().join(", ")})`, teacher.role);
        if (!role || !getTeacherRoleValues().includes(role.trim())) return;
        updateAccount(teacher.id, {
          username: username.trim(),
          password: password.trim(),
          role: role.trim(),
          previousUsername: teacher.username
        });
        logAction("Compte modifiÃ©", username.trim(), `RÃ´le: ${getRoleLabel(role.trim())}`);
        feedback.textContent = "Compte modifiÃ©.";
        renderAdministration();
      });
    });

    teacherAccountsList.querySelectorAll(".teacher-delete").forEach((button) => {
      button.addEventListener("click", () => {
        const removed = getAccountById(button.dataset.id);
        removeTeacherAccount(button.dataset.id);
        if (removed) logAction("Compte supprimÃ©", removed.username, removed.label);
        feedback.textContent = "Compte supprimÃ©.";
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

(() => {
  const UTF8_SUSPECT_PATTERN = /[ÃÂâ€œ”€™�]/;

  function repairUtf8StringDeepSafe(value) {
    if (typeof value !== "string" || !value) return value;
    let next = value;
    for (let index = 0; index < 4; index += 1) {
      if (!UTF8_SUSPECT_PATTERN.test(next)) break;
      const repaired = typeof repairDisplaySourceString === "function" ? repairDisplaySourceString(next) : next;
      if (!repaired || repaired === next) break;
      next = repaired;
    }
    return next;
  }

  function repairUtf8StructuredDataSafe(node, seen = new WeakSet()) {
    if (!node || typeof node !== "object") return node;
    if (seen.has(node)) return node;
    seen.add(node);
    if (Array.isArray(node)) {
      node.forEach((item) => repairUtf8StructuredDataSafe(item, seen));
      return node;
    }
    Object.keys(node).forEach((key) => {
      const value = node[key];
      if (typeof value === "string") {
        if (typeof shouldRepairStructuredText === "function" ? shouldRepairStructuredText(key, value) : UTF8_SUSPECT_PATTERN.test(value)) {
          node[key] = repairUtf8StringDeepSafe(value);
        }
        return;
      }
      if (value && typeof value === "object") {
        repairUtf8StructuredDataSafe(value, seen);
      }
    });
    return node;
  }

  function normalizeElementAttributesSafe(element) {
    if (!(element instanceof Element)) return;
    ["title", "aria-label", "placeholder", "alt"].forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      const current = element.getAttribute(attribute) || "";
      const fixed = repairUtf8StringDeepSafe(current);
      if (fixed !== current) element.setAttribute(attribute, fixed);
    });
    if (element instanceof HTMLInputElement && /^(button|submit|reset)$/i.test(element.type)) {
      const fixed = repairUtf8StringDeepSafe(element.value);
      if (fixed !== element.value) element.value = fixed;
    }
  }

  function normalizeNodeTreeSafe(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      if (root.parentElement && /^(SCRIPT|STYLE|TEXTAREA)$/i.test(root.parentElement.tagName)) return;
      const fixed = repairUtf8StringDeepSafe(root.nodeValue || "");
      if (fixed !== root.nodeValue) root.nodeValue = fixed;
      return;
    }

    if (!(root instanceof Element) && !(root instanceof Document) && !(root instanceof DocumentFragment)) return;
    if (root instanceof Element) normalizeElementAttributesSafe(root);

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let current = walker.currentNode;
    while (current) {
      if (current.nodeType === Node.TEXT_NODE) {
        if (!(current.parentElement && /^(SCRIPT|STYLE|TEXTAREA)$/i.test(current.parentElement.tagName))) {
          const fixed = repairUtf8StringDeepSafe(current.nodeValue || "");
          if (fixed !== current.nodeValue) current.nodeValue = fixed;
        }
      } else if (current.nodeType === Node.ELEMENT_NODE) {
        normalizeElementAttributesSafe(current);
      }
      current = walker.nextNode();
    }
    document.title = repairUtf8StringDeepSafe(document.title);
  }

  function repairGlobalUtf8StateSafe() {
    [
      typeof skillCatalog !== "undefined" ? skillCatalog : null,
      typeof defaultClasses !== "undefined" ? defaultClasses : null,
      typeof defaultStudents !== "undefined" ? defaultStudents : null,
      typeof defaultPfmpRecords !== "undefined" ? defaultPfmpRecords : null,
      typeof defaultIndicatorBank !== "undefined" ? defaultIndicatorBank : null,
      typeof defaultLessonLibrary !== "undefined" ? defaultLessonLibrary : null,
      typeof defaultAccounts !== "undefined" ? defaultAccounts : null,
      typeof roleCatalog !== "undefined" ? roleCatalog : null,
      typeof skillDomainOverrides !== "undefined" ? skillDomainOverrides : null,
      typeof referentialDomains !== "undefined" ? referentialDomains : null,
      typeof PFMP_PERIODS !== "undefined" ? PFMP_PERIODS : null,
      typeof app !== "undefined" ? app : null
    ].forEach((entry) => {
      if (entry) repairUtf8StructuredDataSafe(entry);
    });
  }

  function bindUtf8DomObserverSafe() {
    if (document.body?.dataset?.utf8ObserverBound === "true") return;
    if (!document.body) return;
    document.body.dataset.utf8ObserverBound = "true";
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => normalizeNodeTreeSafe(node));
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function bootUtf8RepairsSafe() {
    repairGlobalUtf8StateSafe();
    normalizeNodeTreeSafe(document.body || document.documentElement);
    bindUtf8DomObserverSafe();
  }

  const originalReplaceAppStateUtf8Safe = typeof replaceAppState === "function" ? replaceAppState : null;
  if (originalReplaceAppStateUtf8Safe) {
    replaceAppState = function (data) {
      if (data && typeof data === "object") repairUtf8StructuredDataSafe(data);
      originalReplaceAppStateUtf8Safe(data);
      window.setTimeout(() => normalizeNodeTreeSafe(document.body || document.documentElement), 0);
    };
  }

  const originalInitEvaluationsPageUtf8Final = typeof initEvaluationsPageFinal === "function" ? initEvaluationsPageFinal : null;
  if (originalInitEvaluationsPageUtf8Final) {
    initEvaluationsPageFinal = function () {
      originalInitEvaluationsPageUtf8Final();
      window.setTimeout(() => {
        normalizeNodeTreeSafe(document.body);
        window.__cielScheduleActivityCardsLayoutSafe?.();
      }, 0);
      window.setTimeout(() => {
        normalizeNodeTreeSafe(document.body);
        window.__cielScheduleActivityCardsLayoutSafe?.();
      }, 120);
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootUtf8RepairsSafe, { once: true });
  } else {
    bootUtf8RepairsSafe();
  }
})();

(() => {
  const DEFAULT_PREMIUM_SETTINGS_SAFE = {
    gradePolicy: {
      nonAcquisMax: 5,
      enCoursMax: 10,
      partiellementAcquisMax: 14
    },
    skillWeights: Object.fromEntries(skillCatalog.map((skill) => [skill.id, 1]))
  };

  function sanitizePremiumGradePolicySafe(policy = {}) {
    const fallback = DEFAULT_PREMIUM_SETTINGS_SAFE.gradePolicy;
    const values = {
      nonAcquisMax: Number.parseFloat(policy.nonAcquisMax),
      enCoursMax: Number.parseFloat(policy.enCoursMax),
      partiellementAcquisMax: Number.parseFloat(policy.partiellementAcquisMax)
    };
    if (!Number.isFinite(values.nonAcquisMax)) values.nonAcquisMax = fallback.nonAcquisMax;
    if (!Number.isFinite(values.enCoursMax)) values.enCoursMax = fallback.enCoursMax;
    if (!Number.isFinite(values.partiellementAcquisMax)) values.partiellementAcquisMax = fallback.partiellementAcquisMax;

    values.nonAcquisMax = Math.min(19, Math.max(1, values.nonAcquisMax));
    values.enCoursMax = Math.min(19.5, Math.max(values.nonAcquisMax + 0.5, values.enCoursMax));
    values.partiellementAcquisMax = Math.min(20, Math.max(values.enCoursMax + 0.5, values.partiellementAcquisMax));

    return {
      nonAcquisMax: Math.round(values.nonAcquisMax * 10) / 10,
      enCoursMax: Math.round(values.enCoursMax * 10) / 10,
      partiellementAcquisMax: Math.round(values.partiellementAcquisMax * 10) / 10
    };
  }

  function sanitizePremiumSkillWeightsSafe(weights = {}) {
    return Object.fromEntries(skillCatalog.map((skill) => {
      const numeric = Number.parseFloat(weights?.[skill.id]);
      const value = Number.isFinite(numeric) && numeric > 0 ? numeric : 1;
      return [skill.id, Math.round(value * 100) / 100];
    }));
  }

  function getPremiumSettingsSafe() {
    app.appMeta = app.appMeta || {};
    const premium = app.appMeta.premiumSettings || {};
    return {
      gradePolicy: sanitizePremiumGradePolicySafe(premium.gradePolicy || {}),
      skillWeights: sanitizePremiumSkillWeightsSafe(premium.skillWeights || {})
    };
  }

  async function savePremiumSettingsSafe(nextSettings) {
    const current = getPremiumSettingsSafe();
    app.appMeta = app.appMeta || {};
    app.appMeta.premiumSettings = {
      gradePolicy: sanitizePremiumGradePolicySafe(nextSettings?.gradePolicy || current.gradePolicy),
      skillWeights: sanitizePremiumSkillWeightsSafe(nextSettings?.skillWeights || current.skillWeights)
    };
    if (typeof persistCriticalAppData === "function") {
      await persistCriticalAppData();
    } else if (typeof persistAppData === "function") {
      persistAppData();
    }
  }

  mapGradeToStatus = function (grade) {
    const numeric = normalizeGrade(grade);
    const policy = getPremiumSettingsSafe().gradePolicy;
    if (numeric === "") return "non_evalue";
    if (numeric < policy.nonAcquisMax) return "non_acquis";
    if (numeric < policy.enCoursMax) return "en_cours_acquisition";
    if (numeric < policy.partiellementAcquisMax) return "partiellement_acquis";
    return "acquis";
  };

  function statusToSyntheticGradeSafe(status) {
    const policy = getPremiumSettingsSafe().gradePolicy;
    if (status === "non_evalue" || status === "absent") return null;
    if (status === "non_acquis") return Math.round((policy.nonAcquisMax / 2) * 10) / 10;
    if (status === "en_cours_acquisition") return Math.round(((policy.nonAcquisMax + policy.enCoursMax) / 2) * 10) / 10;
    if (status === "partiellement_acquis") return Math.round(((policy.enCoursMax + policy.partiellementAcquisMax) / 2) * 10) / 10;
    return Math.round(((policy.partiellementAcquisMax + 20) / 2) * 10) / 10;
  }

  function getGlobalSkillWeightSafe(skillId) {
    return getPremiumSettingsSafe().skillWeights?.[skillId] || 1;
  }

  function getActivitySkillWeightSafe(activity, skillId) {
    const activityWeight = Number.parseFloat(activity?.skillWeights?.[skillId]);
    const localWeight = Number.isFinite(activityWeight) && activityWeight > 0 ? activityWeight : 1;
    return Math.round(localWeight * getGlobalSkillWeightSafe(skillId) * 100) / 100;
  }

  function getActivityGradeForSkillSafe(activity, studentId, skillId) {
    const evaluation = activity?.evaluations?.[studentId] || {};
    const globalGrade = normalizeGrade(evaluation.__globalGrade);
    if (globalGrade !== "") return globalGrade;

    const resolvedSkillMap = getResolvedIndicatorSkillMapUltraSafe(activity);
    const relatedIndicators = (activity?.indicators || []).filter((indicator) => resolvedSkillMap.get(indicator.id) === skillId);
    const statuses = relatedIndicators
      .map((indicator) => evaluation[indicator.id])
      .filter((status) => Object.hasOwn(levelLabels, status));
    if (statuses.length) {
      const grades = statuses.map((status) => statusToSyntheticGradeSafe(status)).filter((value) => value !== null);
      if (grades.length) return Math.round((grades.reduce((sum, value) => sum + value, 0) / grades.length) * 10) / 10;
    }

    const student = getStudentById(studentId);
    const direct = normalizeGrade(student?.skillGrades?.[skillId]);
    return direct === "" ? null : direct;
  }

  function getWeightedSkillAverageSafe(student, skillId) {
    const journey = getStudentJourney(student);
    let total = 0;
    let totalWeight = 0;
    let sessionCount = 0;

    journey.forEach((item) => {
      getActivitiesByClass(item.classId).forEach((activity) => {
        if (!getActivitySkillIds(activity).includes(skillId)) return;
        const grade = getActivityGradeForSkillSafe(activity, item.id, skillId);
        if (grade === null) return;
        const weight = getActivitySkillWeightSafe(activity, skillId);
        total += grade * weight;
        totalWeight += weight;
        sessionCount += 1;
      });
    });

    if (!sessionCount) {
      const fallbackGrade = normalizeGrade(journey.at(-1)?.skillGrades?.[skillId]);
      return {
        average: fallbackGrade === "" ? null : fallbackGrade,
        sessions: 0,
        totalWeight: getGlobalSkillWeightSafe(skillId),
        status: mapGradeToStatus(fallbackGrade),
        source: fallbackGrade === "" ? "aucune" : "manuel"
      };
    }

    const average = Math.round((total / Math.max(totalWeight, 1)) * 10) / 10;
    return {
      average,
      sessions: sessionCount,
      totalWeight: Math.round(totalWeight * 100) / 100,
      status: mapGradeToStatus(average),
      source: "seances"
    };
  }

  function getDomainScoreForStudentItemSafe(studentItem, domain) {
    const domainSkills = skillCatalog.filter((skill) => getSkillDomain(skill) === domain);
    if (!domainSkills.length) return 0;
    const total = domainSkills.reduce((sum, skill) => {
      const grade = normalizeGrade(studentItem?.skillGrades?.[skill.id]);
      if (grade !== "") return sum + ((grade / 20) * 100);
      return sum + Math.round(((levelScores[studentItem?.skills?.[skill.id]] || 0) / Math.max(levelScores.acquis || 1, 1)) * 100);
    }, 0);
    return Math.round(total / domainSkills.length);
  }

  function getStudentDomainJourneySafe(student) {
    return getStudentJourney(student)
      .filter((item) => {
        const level = getClassLevelOrder(item.classId);
        return level >= 1 && level <= 3;
      })
      .sort((a, b) => getClassLevelOrder(a.classId) - getClassLevelOrder(b.classId))
      .map((item) => {
        const level = getClassLevelOrder(item.classId);
        return {
          level,
          label: level === 1 ? "2nde" : (level === 2 ? "1Ã¨re" : "Terminale"),
          classLabel: getClassById(item.classId)?.name || "",
          scores: Object.fromEntries(referentialDomains.map((domain) => [domain, getDomainScoreForStudentItemSafe(item, domain)]))
        };
      });
  }

  function getConsolidatedDomainScoresSafe(student) {
    return Object.fromEntries(referentialDomains.map((domain) => {
      const skills = skillCatalog.filter((skill) => getSkillDomain(skill) === domain);
      const grades = skills
        .map((skill) => getWeightedSkillAverageSafe(student, skill.id).average)
        .filter((grade) => grade !== null && grade !== "");
      if (!grades.length) return [domain, 0];
      const average = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
      return [domain, Math.round((average / 20) * 100)];
    }));
  }

  function buildLinePathSafe(points) {
    if (!points.length) return "";
    return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  }

  function buildDomainTrendSvgSafe(student) {
    const journey = getStudentDomainJourneySafe(student);
    if (!journey.length) {
      return `<article class="summary-card"><h3>Aucune donnÃ©e</h3><p class="muted-copy">La courbe apparaÃ®tra dÃ¨s qu'une annÃ©e sera renseignÃ©e.</p></article>`;
    }
    const width = 620;
    const height = 240;
    const paddingX = 58;
    const paddingTop = 26;
    const paddingBottom = 42;
    const colors = ["#59c6ff", "#63f5d4", "#f7c35f"];
    const xStep = journey.length === 1 ? 0 : (width - paddingX * 2) / (journey.length - 1);
    const yForScore = (score) => paddingTop + ((100 - score) / 100) * (height - paddingTop - paddingBottom);
    const gridLines = [0, 25, 50, 75, 100].map((mark) => {
      const y = yForScore(mark);
      return `
        <line x1="${paddingX}" y1="${y}" x2="${width - paddingX}" y2="${y}" class="premium-chart-grid"></line>
        <text x="${paddingX - 12}" y="${y + 4}" text-anchor="end" class="premium-chart-axis">${mark}</text>
      `;
    }).join("");
    const domainPaths = referentialDomains.map((domain, index) => {
      const points = journey.map((item, itemIndex) => ({
        x: paddingX + (xStep * itemIndex),
        y: yForScore(item.scores[domain] || 0)
      }));
      const circles = points.map((point) => `<circle cx="${point.x}" cy="${point.y}" r="4.5" fill="${colors[index % colors.length]}" class="premium-chart-dot"></circle>`).join("");
      return `
        <path d="${buildLinePathSafe(points)}" fill="none" stroke="${colors[index % colors.length]}" stroke-width="3" stroke-linecap="round"></path>
        ${circles}
      `;
    }).join("");
    const labels = journey.map((item, index) => {
      const x = paddingX + (xStep * index);
      return `<text x="${x}" y="${height - 12}" text-anchor="middle" class="premium-chart-axis">${escapeHtml(item.label)}</text>`;
    }).join("");
    const legend = referentialDomains.map((domain, index) => `
      <span class="premium-legend-item"><i style="background:${colors[index % colors.length]}"></i>${escapeHtml(domain)}</span>
    `).join("");

    return `
      <div class="premium-chart-shell">
        <svg class="premium-chart" viewBox="0 0 ${width} ${height}" aria-label="Ã‰volution par domaine">
          ${gridLines}
          <line x1="${paddingX}" y1="${height - paddingBottom}" x2="${width - paddingX}" y2="${height - paddingBottom}" class="premium-chart-axis-line"></line>
          ${domainPaths}
          ${labels}
        </svg>
        <div class="premium-legend">${legend}</div>
      </div>
    `;
  }

  function buildRadarSvgSafe(domainScores) {
    const entries = referentialDomains.map((domain) => ({ domain, value: Math.max(0, Math.min(100, Number(domainScores?.[domain]) || 0)) }));
    const width = 320;
    const height = 300;
    const centerX = 160;
    const centerY = 150;
    const radius = 92;
    const rings = [25, 50, 75, 100];
    const toPoint = (index, ratio) => {
      const angle = (-Math.PI / 2) + ((Math.PI * 2) / entries.length) * index;
      return {
        x: centerX + Math.cos(angle) * radius * ratio,
        y: centerY + Math.sin(angle) * radius * ratio
      };
    };
    const ringSvg = rings.map((ring) => {
      const points = entries.map((_, index) => {
        const point = toPoint(index, ring / 100);
        return `${point.x},${point.y}`;
      }).join(" ");
      return `<polygon points="${points}" class="premium-radar-ring"></polygon>`;
    }).join("");
    const axisSvg = entries.map((entry, index) => {
      const point = toPoint(index, 1);
      return `
        <line x1="${centerX}" y1="${centerY}" x2="${point.x}" y2="${point.y}" class="premium-radar-axis"></line>
        <text x="${point.x}" y="${point.y + (point.y < centerY ? -10 : 18)}" text-anchor="middle" class="premium-radar-label">${escapeHtml(entry.domain)}</text>
      `;
    }).join("");
    const polygonPoints = entries.map((entry, index) => {
      const point = toPoint(index, entry.value / 100);
      return `${point.x},${point.y}`;
    }).join(" ");
    const valueBadges = entries.map((entry) => `<span class="badge">${escapeHtml(entry.domain)} // ${entry.value}%</span>`).join("");

    return `
      <div class="premium-radar-shell">
        <svg class="premium-radar" viewBox="0 0 ${width} ${height}" aria-label="Radar domaines">
          ${ringSvg}
          ${axisSvg}
          <polygon points="${polygonPoints}" class="premium-radar-shape"></polygon>
        </svg>
        <div class="student-badges">${valueBadges}</div>
      </div>
    `;
  }

  function ensurePremiumSettingsPanelSafe() {
    if (document.body?.dataset?.page !== "accounts") return;
    const examCenterPanel = document.querySelector("#exam-center-form")?.closest(".panel");
    if (!examCenterPanel) return;

    let panel = document.querySelector("#premium-settings-panel");
    if (!panel) {
      panel = document.createElement("section");
      panel.id = "premium-settings-panel";
      panel.className = "panel wide-panel";
      panel.innerHTML = `
        <div class="section-head">
          <div>
            <p class="eyebrow">Pilotage Premium</p>
            <h2>BarÃ¨me et pondÃ©ration</h2>
          </div>
        </div>
        <form id="premium-settings-form" class="stack-form">
          <div class="mini-grid premium-grade-grid">
            <label class="field">
              <span>Seuil Non acquis</span>
              <input id="premium-threshold-non-acquis" type="number" min="0" max="20" step="0.5">
            </label>
            <label class="field">
              <span>Seuil En cours</span>
              <input id="premium-threshold-en-cours" type="number" min="0" max="20" step="0.5">
            </label>
            <label class="field">
              <span>Seuil Partiellement acquis</span>
              <input id="premium-threshold-partiel" type="number" min="0" max="20" step="0.5">
            </label>
          </div>
          <div id="premium-grade-preview" class="student-badges premium-grade-preview"></div>
          <div>
            <p class="eyebrow">Coefficients globaux par compÃ©tence</p>
            <div id="premium-skill-weight-grid" class="premium-weight-grid"></div>
          </div>
          <div class="student-badges">
            <button class="primary-button" type="submit">Enregistrer le barÃ¨me premium</button>
            <button id="premium-settings-reset" class="ghost-button" type="button">RÃ©tablir les valeurs par dÃ©faut</button>
          </div>
          <p id="premium-settings-feedback" class="results-count"></p>
        </form>
      `;
      examCenterPanel.insertAdjacentElement("afterend", panel);
    }

    const form = document.querySelector("#premium-settings-form");
    const preview = document.querySelector("#premium-grade-preview");
    const weightGrid = document.querySelector("#premium-skill-weight-grid");
    const feedback = document.querySelector("#premium-settings-feedback");
    const resetButton = document.querySelector("#premium-settings-reset");
    if (!form || !preview || !weightGrid || !feedback || !resetButton) return;

    const render = () => {
      const settings = getPremiumSettingsSafe();
      document.querySelector("#premium-threshold-non-acquis").value = settings.gradePolicy.nonAcquisMax;
      document.querySelector("#premium-threshold-en-cours").value = settings.gradePolicy.enCoursMax;
      document.querySelector("#premium-threshold-partiel").value = settings.gradePolicy.partiellementAcquisMax;
      preview.innerHTML = `
        <span class="badge badge-danger">Non acquis &lt; ${settings.gradePolicy.nonAcquisMax}</span>
        <span class="badge badge-warning">En cours &lt; ${settings.gradePolicy.enCoursMax}</span>
        <span class="badge">Partiellement acquis &lt; ${settings.gradePolicy.partiellementAcquisMax}</span>
        <span class="badge badge-ready">Acquis â‰¥ ${settings.gradePolicy.partiellementAcquisMax}</span>
      `;
      weightGrid.innerHTML = skillCatalog.map((skill) => `
        <label class="field premium-weight-card">
          <span>${escapeHtml(skill.code)} // ${escapeHtml(skill.title)}</span>
          <small>${escapeHtml(getSkillDomain(skill))}</small>
          <input type="number" min="0.25" max="5" step="0.25" data-premium-skill-weight="${skill.id}" value="${settings.skillWeights[skill.id] || 1}">
        </label>
      `).join("");
    };

    if (!form.dataset.premiumBound) {
      form.dataset.premiumBound = "true";
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const nextSettings = {
          gradePolicy: {
            nonAcquisMax: document.querySelector("#premium-threshold-non-acquis")?.value,
            enCoursMax: document.querySelector("#premium-threshold-en-cours")?.value,
            partiellementAcquisMax: document.querySelector("#premium-threshold-partiel")?.value
          },
          skillWeights: Object.fromEntries(skillCatalog.map((skill) => [
            skill.id,
            document.querySelector(`[data-premium-skill-weight="${skill.id}"]`)?.value || 1
          ]))
        };
        await savePremiumSettingsSafe(nextSettings);
        logAction("ParamÃ¨tres premium", "BarÃ¨me et pondÃ©ration", "Mise Ã  jour globale");
        feedback.textContent = "BarÃ¨me et coefficients enregistrÃ©s.";
        render();
      });
    }

    if (!resetButton.dataset.premiumBound) {
      resetButton.dataset.premiumBound = "true";
      resetButton.addEventListener("click", async () => {
        await savePremiumSettingsSafe(DEFAULT_PREMIUM_SETTINGS_SAFE);
        logAction("ParamÃ¨tres premium", "BarÃ¨me et pondÃ©ration", "RÃ©initialisation");
        feedback.textContent = "Valeurs premium rÃ©initialisÃ©es.";
        render();
      });
    }

    render();
  }

  function ensureBulletinPremiumAnalyticsSafe() {
    if (document.body?.dataset?.page !== "bulletin") return;
    const studentSelect = document.querySelector("#bulletin-student-select");
    const classSelect = document.querySelector("#bulletin-class-select");
    const journeyPanel = document.querySelector("#bulletin-journey-panel");
    const layout = document.querySelector(".dashboard-layout");
    if (!studentSelect || !classSelect || !journeyPanel || !layout) return;

    let panel = document.querySelector("#bulletin-premium-analytics");
    if (!panel) {
      panel = document.createElement("section");
      panel.id = "bulletin-premium-analytics";
      panel.className = "panel";
      panel.innerHTML = `
        <div class="section-head">
          <div>
            <p class="eyebrow">Pilotage Premium</p>
            <h2>Moyennes consolidÃ©es et Ã©volution par domaine</h2>
          </div>
        </div>
        <div id="bulletin-premium-kpis" class="class-cards"></div>
        <div class="premium-analytics-grid">
          <article class="period-card">
            <h3>Moyennes consolidÃ©es par compÃ©tence</h3>
            <div id="bulletin-premium-skill-list" class="premium-skill-average-list"></div>
          </article>
          <article class="period-card">
            <h3>Ã‰volution par domaine</h3>
            <div id="bulletin-premium-domain-trend"></div>
            <div id="bulletin-premium-domain-radar"></div>
          </article>
        </div>
      `;
      layout.appendChild(panel);
    } else if (panel.parentElement !== layout) {
      layout.appendChild(panel);
    }

    const render = () => {
      const classId = classSelect.value || app.classes[0]?.id || "";
      const student = getStudentById(studentSelect.value) || getStudentsByClass(classId)[0] || null;
      const kpis = document.querySelector("#bulletin-premium-kpis");
      const skillList = document.querySelector("#bulletin-premium-skill-list");
      const trend = document.querySelector("#bulletin-premium-domain-trend");
      const radar = document.querySelector("#bulletin-premium-domain-radar");
      if (!kpis || !skillList || !trend || !radar) return;

      if (!student) {
        kpis.innerHTML = "";
        skillList.innerHTML = `<article class="summary-card"><h3>Aucun Ã©lÃ¨ve</h3><p class="muted-copy">SÃ©lectionne un Ã©lÃ¨ve pour afficher lâ€™analyse premium.</p></article>`;
        trend.innerHTML = "";
        radar.innerHTML = "";
        return;
      }

      const weightedScores = skillCatalog.map((skill) => ({
        skill,
        ...getWeightedSkillAverageSafe(student, skill.id)
      }));
      const availableScores = weightedScores.filter((item) => item.average !== null && item.average !== "");
      const consolidatedAverage = availableScores.length
        ? Math.round((availableScores.reduce((sum, item) => sum + item.average, 0) / availableScores.length) * 10) / 10
        : null;
      const strongest = availableScores.slice().sort((a, b) => b.average - a.average)[0] || null;
      const weakest = availableScores.slice().sort((a, b) => a.average - b.average)[0] || null;
      const domainScores = getConsolidatedDomainScoresSafe(student);

      kpis.innerHTML = `
        <article class="summary-card">
          <h3>Moyenne consolidÃ©e</h3>
          <p class="score-big">${consolidatedAverage === null ? "-" : `${consolidatedAverage.toFixed(1)}/20`}</p>
          <p class="muted-copy">CalculÃ©e sur ${availableScores.length} compÃ©tence(s) avec coefficients.</p>
        </article>
        <article class="summary-card">
          <h3>CompÃ©tence la plus solide</h3>
          <p>${strongest ? `${escapeHtml(strongest.skill.code)} // ${escapeHtml(strongest.skill.title)}` : "-"}</p>
          <p class="muted-copy">${strongest ? `${strongest.average.toFixed(1)}/20` : "Aucune donnÃ©e"}</p>
        </article>
        <article class="summary-card">
          <h3>CompÃ©tence prioritaire</h3>
          <p>${weakest ? `${escapeHtml(weakest.skill.code)} // ${escapeHtml(weakest.skill.title)}` : "-"}</p>
          <p class="muted-copy">${weakest ? `${weakest.average.toFixed(1)}/20` : "Aucune donnÃ©e"}</p>
        </article>
      `;

      skillList.innerHTML = weightedScores.map((item) => `
        <article class="summary-card premium-skill-average-card">
          <div class="journey-stage-head">
            <div>
              <h3>${escapeHtml(item.skill.code)} // ${escapeHtml(item.skill.title)}</h3>
              <p class="muted-copy">${escapeHtml(getSkillDomain(item.skill))} // coefficient ${getGlobalSkillWeightSafe(item.skill.id)}</p>
            </div>
            ${renderBulletinStatus(item.status || "non_evalue")}
          </div>
          <p>${item.average === null ? "Non Ã©valuÃ©" : `${item.average.toFixed(1)}/20`}</p>
          <p class="muted-copy">${item.sessions} sÃ©ance(s) pondÃ©rÃ©e(s) // poids total ${item.totalWeight}</p>
        </article>
      `).join("");

      trend.innerHTML = buildDomainTrendSvgSafe(student);
      radar.innerHTML = buildRadarSvgSafe(domainScores);
    };

    render();
    if (!studentSelect.dataset.premiumAnalyticsBound) {
      studentSelect.dataset.premiumAnalyticsBound = "true";
      studentSelect.addEventListener("change", render);
    }
    if (!classSelect.dataset.premiumAnalyticsBound) {
      classSelect.dataset.premiumAnalyticsBound = "true";
      classSelect.addEventListener("change", () => window.setTimeout(render, 0));
    }
  }

  function ensureDashboardPremiumAnalyticsSafe() {
    if (document.body?.dataset?.page !== "dashboard") return;
    const classSelect = document.querySelector("#dashboard-class-select");
    const layout = document.querySelector(".dashboard-layout");
    if (!classSelect || !layout) return;

    let panel = document.querySelector("#dashboard-premium-domain-panel");
    if (!panel) {
      panel = document.createElement("section");
      panel.id = "dashboard-premium-domain-panel";
      panel.className = "panel";
      panel.innerHTML = `
        <div class="section-head">
          <div>
            <p class="eyebrow">Domain Radar</p>
            <h2>Radar de la classe par domaine</h2>
          </div>
        </div>
        <div class="premium-analytics-grid">
          <article class="period-card">
            <h3>Radar consolidÃ©</h3>
            <div id="dashboard-premium-radar"></div>
          </article>
          <article class="period-card">
            <h3>DÃ©tails par domaine</h3>
            <div id="dashboard-premium-domain-breakdown" class="class-cards"></div>
          </article>
        </div>
      `;
      layout.appendChild(panel);
    }

    const render = () => {
      const classId = classSelect.value || app.classes[0]?.id || "";
      const students = getStudentsByClass(classId);
      const radarTarget = document.querySelector("#dashboard-premium-radar");
      const breakdown = document.querySelector("#dashboard-premium-domain-breakdown");
      if (!radarTarget || !breakdown) return;
      if (!students.length) {
        radarTarget.innerHTML = `<article class="summary-card"><h3>Aucune donnÃ©e</h3><p class="muted-copy">Ajoute des Ã©lÃ¨ves pour afficher le radar.</p></article>`;
        breakdown.innerHTML = "";
        return;
      }
      const domainScores = Object.fromEntries(getBlockAverages(students).map((item) => [item.domain, item.progress]));
      radarTarget.innerHTML = buildRadarSvgSafe(domainScores);
      breakdown.innerHTML = getBlockAverages(students).map((item) => `
        <article class="summary-card">
          <h3>${escapeHtml(item.domain)}</h3>
          <p class="score-big">${item.progress}%</p>
          <p class="muted-copy">${item.validated}/${item.total || 0} validations partielles ou acquises</p>
        </article>
      `).join("");
    };

    render();
    if (!classSelect.dataset.dashboardPremiumBound) {
      classSelect.dataset.dashboardPremiumBound = "true";
      classSelect.addEventListener("change", () => window.setTimeout(render, 0));
    }
  }

  const originalInitAccountsPageFinalPremiumSafe = initAccountsPageFinal;
  initAccountsPageFinal = function () {
    originalInitAccountsPageFinalPremiumSafe();
    window.setTimeout(ensurePremiumSettingsPanelSafe, 0);
  };

  const originalInitBulletinPagePremiumSafe = initBulletinPage;
  initBulletinPage = function () {
    originalInitBulletinPagePremiumSafe();
    window.setTimeout(ensureBulletinPremiumAnalyticsSafe, 0);
  };

  const originalInitDashboardPagePremiumSafe = initDashboardPageFinal;
  initDashboardPageFinal = function () {
    originalInitDashboardPagePremiumSafe();
    window.setTimeout(ensureDashboardPremiumAnalyticsSafe, 0);
  };
})();

(() => {
  function enhanceActivityMatrixReadabilitySafe() {
    if (document.body?.dataset?.page !== "evaluations") return;
    const matrix = document.querySelector("#activity-matrix");
    if (!matrix) return;
    if (matrix.classList.contains("activity-cards-layout") || matrix.querySelector(".activity-student-card")) return;

    const header = matrix.querySelector(".matrix-header.activity-header");
    const rows = [...matrix.querySelectorAll(".matrix-row.activity-row")];
    if (!header || !rows.length) return;

    const headerCells = [...header.children];
    if (headerCells.length <= 1) return;
    const indicatorLabels = headerCells.slice(1).map((cell, index) => ({
      index: index + 1,
      label: String(cell.textContent || "").trim()
    }));

    let legend = document.querySelector("#activity-indicator-legend");
    if (!legend) {
      legend = document.createElement("div");
      legend.id = "activity-indicator-legend";
      legend.className = "activity-indicator-legend";
      matrix.insertAdjacentElement("beforebegin", legend);
    }

    legend.innerHTML = `
      <article class="summary-card activity-indicator-legend-card">
        <div class="section-head">
          <div>
            <p class="eyebrow">Indicateurs</p>
            <h3>RepÃ¨res de la sÃ©ance</h3>
          </div>
        </div>
        <div class="activity-indicator-legend-grid">
          ${indicatorLabels.map((item) => `
            <div class="activity-indicator-legend-item" title="${escapeHtml(item.label)}">
              <span class="activity-indicator-chip">I${item.index}</span>
              <span>${escapeHtml(item.label)}</span>
            </div>
          `).join("")}
        </div>
      </article>
    `;

    header.classList.add("activity-header-compact");
    headerCells[0].innerHTML = `<span class="activity-student-head">Ã‰lÃ¨ve</span>`;
    headerCells.slice(1).forEach((cell, index) => {
      const label = indicatorLabels[index];
      cell.classList.add("activity-indicator-head-cell");
      cell.innerHTML = `
        <div class="activity-indicator-head-compact" title="${escapeHtml(label.label)}">
          <span class="activity-indicator-chip">I${label.index}</span>
        </div>
      `;
    });

    rows.forEach((row) => {
      const cells = [...row.children];
      cells.slice(1).forEach((cell, index) => {
        if (cell.dataset.compactBound === "true") return;
        cell.dataset.compactBound = "true";
        const select = cell.querySelector("select");
        if (!select) return;
        const label = indicatorLabels[index];
        cell.classList.add("activity-indicator-cell");
        const hint = document.createElement("small");
        hint.className = "activity-indicator-cell-label";
        hint.textContent = `I${label.index}`;
        hint.title = label.label;
        cell.prepend(hint);
        select.title = label.label;
        select.setAttribute("aria-label", `Indicateur ${label.index} : ${label.label}`);
      });
    });
  }

  const originalInitEvaluationsPageReadableSafe = initEvaluationsPageFinal;
  initEvaluationsPageFinal = function () {
    originalInitEvaluationsPageReadableSafe();
    window.setTimeout(enhanceActivityMatrixReadabilitySafe, 0);
    window.setTimeout(enhanceActivityMatrixReadabilitySafe, 120);
  };

  function bindMatrixReadabilityObserverSafe() {
    return;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      bindMatrixReadabilityObserverSafe();
      window.setTimeout(enhanceActivityMatrixReadabilitySafe, 0);
    }, { once: true });
  } else {
    bindMatrixReadabilityObserverSafe();
    window.setTimeout(enhanceActivityMatrixReadabilitySafe, 0);
  }
})();

(() => {
  function renderInlineIndicatorPreviewUltimateSafe(activity) {
    const list = document.querySelector("#activity-indicator-list");
    if (!list) return;
    const indicators = Array.isArray(activity?.indicators) ? activity.indicators : [];
    if (!indicators.length) {
      list.innerHTML = `<article class="directory-row"><div><strong>Aucun indicateur structurÃ©</strong><p>Ajoute des indicateurs liÃ©s Ã  une compÃ©tence ou utilise la saisie rapide.</p></div></article>`;
      return;
    }
    list.innerHTML = indicators.map((indicator) => `
      <article class="directory-row compact">
        <div>
          <strong>${escapeHtml(indicator.label || "")}</strong>
          <p>${escapeHtml(indicator.skillId ? getActivitySkillLabel({ skillIds: [indicator.skillId], skillId: indicator.skillId }) : "Toutes les compétences de la séance")}</p>
        </div>
      </article>
    `).join("");
  }

  function fillSessionEditorUltimateSafe(activity) {
    if (!activity) return false;
    const form = document.querySelector("#activity-form");
    const typeInput = document.querySelector("#activity-type");
    const titleInput = document.querySelector("#activity-title");
    const classInput = document.querySelector("#activity-class");
    const skillInput = document.querySelector("#activity-skill");
    const startInput = document.querySelector("#activity-date-start");
    const endInput = document.querySelector("#activity-date-end");
    const indicatorsInput = document.querySelector("#activity-indicators");
    const commentInput = document.querySelector("#activity-comment");
    const submitButton = document.querySelector("#activity-submit-button");
    const cancelButton = document.querySelector("#activity-cancel-edit");
    const indicatorSkill = document.querySelector("#activity-indicator-skill");
    const feedback = document.querySelector("#activity-feedback");
    if (!form || !typeInput || !titleInput || !classInput || !skillInput || !startInput || !endInput || !indicatorsInput || !commentInput || !submitButton || !cancelButton) {
      return false;
    }

    const activitySkillIds = getActivitySkillIds(activity);
    form.dataset.editingId = activity.id;
    typeInput.value = activity.type || "TP";
    titleInput.value = activity.title || "";
    classInput.value = activity.classId || "";
    setMultiSelectValues(skillInput, activitySkillIds);
    setPendingActivitySkillIdsForIndicatorPickerSafe(form, activitySkillIds);
    form.dataset.appliedSkillIds = JSON.stringify(activitySkillIds);
    startInput.value = activity.startDate || activity.date || "";
    endInput.value = activity.endDate || activity.startDate || activity.date || "";
    indicatorsInput.value = (activity.indicators || []).map((indicator) => indicator.label || "").filter(Boolean).join("\n");
    commentInput.value = activity.comment || "";
    submitButton.textContent = "Enregistrer les modifications";
    cancelButton.hidden = false;

    if (indicatorSkill) renderActivityIndicatorSkillSelectSafe(indicatorSkill, activitySkillIds);

    renderInlineIndicatorPreviewUltimateSafe(activity);

    if (typeof applyEvaluationsView === "function") {
      applyEvaluationsView("create");
    }
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    if (feedback) feedback.textContent = `Édition de la séance : ${activity.title}`;
    return true;
  }

  function resetSessionEditorUltimateSafe() {
    const form = document.querySelector("#activity-form");
    const submitButton = document.querySelector("#activity-submit-button");
    const cancelButton = document.querySelector("#activity-cancel-edit");
    const feedback = document.querySelector("#activity-feedback");
    if (!form || !submitButton || !cancelButton) return;
    delete form.dataset.editingId;
    setPendingActivitySkillIdsForIndicatorPickerSafe(form, []);
    form.dataset.appliedSkillIds = "[]";
    submitButton.textContent = "Créer la séance";
    cancelButton.hidden = true;
    if (feedback && /Édition de la séance|Edition de la seance/i.test(feedback.textContent || "")) {
      feedback.textContent = "Édition annulée.";
    }
  }

  function bindUltimateSessionEditSafe() {
    if (document.body?.dataset?.page !== "evaluations") return;

    const currentButton = document.querySelector("#activity-edit-button");
    if (currentButton && !currentButton.dataset.ultimateEditBound) {
      const replacement = currentButton.cloneNode(true);
      replacement.dataset.ultimateEditBound = "true";
      currentButton.replaceWith(replacement);
      replacement.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const selectedId = document.querySelector("#activity-select")?.value || "";
        const activity = getActivityById(selectedId);
        const feedback = document.querySelector("#activity-feedback");
        if (!activity) {
          if (feedback) feedback.textContent = "SÃ©lectionne dâ€™abord une sÃ©ance Ã  modifier.";
          return;
        }
        fillSessionEditorUltimateSafe(activity);
      });
    }

    const cancelButton = document.querySelector("#activity-cancel-edit");
    if (cancelButton && !cancelButton.dataset.ultimateEditBound) {
      cancelButton.dataset.ultimateEditBound = "true";
      cancelButton.addEventListener("click", () => {
        resetSessionEditorUltimateSafe();
      });
    }
  }

  const originalInitEvaluationsPageUltimateSafe = initEvaluationsPageFinal;
  initEvaluationsPageFinal = function () {
    originalInitEvaluationsPageUltimateSafe();
    window.setTimeout(bindUltimateSessionEditSafe, 0);
    window.setTimeout(bindUltimateSessionEditSafe, 80);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      if (document.body?.dataset?.page === "evaluations") {
        bindUltimateSessionEditSafe();
      }
    }, { once: true });
  } else if (document.body?.dataset?.page === "evaluations") {
    bindUltimateSessionEditSafe();
  }
})();

(() => {
  function getActivityGlobalGradeUltraSafe(activity, studentId) {
    return normalizeGrade(activity?.evaluations?.[studentId]?.__globalGrade);
  }

  function getLevelLabelSafe(status) {
    return repairInlineLabelUltraSafe(levelLabels[status] || status || "");
  }

  function getDistributedStatusesForGradeUltraSafe(grade, count) {
    const total = Math.max(0, Number.parseInt(count, 10) || 0);
    if (!total) return [];
    const normalized = normalizeGrade(grade);
    if (normalized === "") return Array.from({ length: total }, () => "non_evalue");
    const averageScore = Math.max(1, Math.min(4, (normalized / 20) * 4));
    const spread = total <= 1 ? 0 : Math.min(0.9, 0.35 + total * 0.03);
    return Array.from({ length: total }, (_, index) => {
      const position = total <= 1 ? 0 : (index / (total - 1)) - 0.5;
      const score = Math.max(1, Math.min(4, averageScore + position * spread));
      if (score < 1.5) return "non_acquis";
      if (score < 2.5) return "en_cours_acquisition";
      if (score < 3.5) return "partiellement_acquis";
      return "acquis";
    });
  }

  function refreshEvaluationPanelsUltraSafe() {
    const classId = document.querySelector("#session-class-select")?.value || app.classes[0]?.id || "";
    const activity = getActivityById(document.querySelector("#activity-select")?.value) || getActivitiesByClass(classId)[0];
    renderActivitySummary(activity, classId);
    renderActivityReport(activity, classId);
    renderActivitySynthesis(classId);
    renderStudentSheet();
    renderActivityCardsLayoutUltraSafe();
  }

  function applyActivityGlobalGradeUltraSafe(activity, studentId, grade) {
    const student = getStudentById(studentId);
    if (!activity || !student) return;
    const normalized = normalizeGrade(grade);
    if (!activity.evaluations[studentId]) activity.evaluations[studentId] = {};
    if (normalized === "") {
      delete activity.evaluations[studentId].__globalGrade;
      return;
    }
    activity.evaluations[studentId].__globalGrade = normalized;
    const autoStatus = mapGradeToStatus(normalized);
    const distributedStatuses = getDistributedStatusesForGradeUltraSafe(normalized, (activity.indicators || []).length);
    (activity.indicators || []).forEach((indicator, index) => {
      activity.evaluations[studentId][indicator.id] = distributedStatuses[index] || autoStatus;
    });
    student.skillGrades = hydrateSkillGrades(student.skillGrades || {});
    const resolvedSkillMap = getResolvedIndicatorSkillMapUltraSafe(activity);
    getActivitySkillIds(activity).forEach((skillId) => {
      const relatedIndicators = (activity.indicators || []).filter((indicator) => resolvedSkillMap.get(indicator.id) === skillId);
      if (!relatedIndicators.length) {
        student.skillGrades[skillId] = normalized;
        student.skills[skillId] = autoStatus;
        return;
      }
      const scores = relatedIndicators.map((indicator) => levelScores[activity.evaluations[studentId][indicator.id]] || 0);
      const averageScore = scores.length ? scores.reduce((sum, value) => sum + value, 0) / scores.length : 0;
      const gradeFromIndicators = Math.round((averageScore / 4) * 20 * 2) / 2;
      student.skillGrades[skillId] = gradeFromIndicators;
      student.skills[skillId] = mapGradeToStatus(gradeFromIndicators);
    });
    logAction("Note de sÃ©ance appliquÃ©e", student.name, `${activity.title} // ${normalized}/20 // ${levelLabels[autoStatus] || autoStatus}`);
  }

  function repairInlineLabelUltraSafe(value) {
    return repairDisplaySourceString(value);
  }

  function formatSkillTitleUltraSafe(skill) {
    if (!skill) return "Indicateurs transversaux";
    const match = String(skill.code || "").match(/^C(\d+)$/i);
    const normalizedCode = match ? `C${String(match[1]).padStart(2, "0")}` : repairInlineLabelUltraSafe(skill.code || "Compétence");
    return `${normalizedCode} - ${repairInlineLabelUltraSafe(skill.title || "")}`.trim();
  }

  function getResolvedIndicatorSkillMapUltraSafe(activity) {
    const skillIds = getActivitySkillIds(activity);
    const indicators = activity?.indicators || [];
    const resolved = new Map();

    indicators.forEach((indicator) => {
      if (indicator?.skillId && skillIds.includes(indicator.skillId)) {
        resolved.set(indicator.id, indicator.skillId);
      }
    });

    if (!skillIds.length) return resolved;

    if (skillIds.length === 1) {
      indicators.forEach((indicator) => {
        if (!resolved.has(indicator.id)) resolved.set(indicator.id, skillIds[0]);
      });
      return resolved;
    }

    const unassigned = indicators.filter((indicator) => !resolved.has(indicator.id));
    if (!unassigned.length) return resolved;

    if (resolved.size === 0) {
      const baseCount = Math.floor(unassigned.length / skillIds.length);
      const remainder = unassigned.length % skillIds.length;
      let cursor = 0;
      skillIds.forEach((skillId, index) => {
        const allocation = baseCount + (index < remainder ? 1 : 0);
        unassigned.slice(cursor, cursor + allocation).forEach((indicator) => {
          resolved.set(indicator.id, skillId);
        });
        cursor += allocation;
      });
    }

    return resolved;
  }

  function getActivityIndicatorGroupsUltraSafe(activity) {
    const groups = [];
    const resolvedSkillMap = getResolvedIndicatorSkillMapUltraSafe(activity);
    const pushGroup = (skillId, indicators) => {
      if (!indicators.length) return;
      const skill = skillId ? getSkillById(skillId) : null;
      groups.push({
        id: skillId || "common",
        title: formatSkillTitleUltraSafe(skill),
        domain: repairInlineLabelUltraSafe(skill ? getSkillDomain(skill) : "Séance"),
        indicators
      });
    };

    const groupedSkillIds = getActivitySkillIds(activity);
    if (groupedSkillIds.length === 1) {
      pushGroup(groupedSkillIds[0], activity.indicators || []);
      return groups;
    }
    groupedSkillIds.forEach((skillId) => {
      pushGroup(skillId, (activity.indicators || []).filter((indicator) => resolvedSkillMap.get(indicator.id) === skillId));
    });
    pushGroup("", (activity.indicators || []).filter((indicator) => !resolvedSkillMap.has(indicator.id)));
    if (!groups.length) {
      pushGroup("", activity.indicators || []);
    }
    return groups;
  }

  function getIndicatorStatusSummaryUltraSafe(activity, studentId, indicators) {
    const summary = {
      acquis: 0,
      partiellement_acquis: 0,
      en_cours_acquisition: 0,
      non_acquis: 0,
      non_evalue: 0
    };
    indicators.forEach((indicator) => {
      const status = getActivityIndicatorStatus(activity, studentId, indicator.id) || "non_evalue";
      summary[status] = (summary[status] || 0) + 1;
    });
    return summary;
  }

  function renderIndicatorSummaryBadgesUltraSafe(summary) {
    return [
      ["acquis", "Acquis"],
      ["partiellement_acquis", "Partiel"],
      ["en_cours_acquisition", "En cours"],
      ["non_acquis", "Non acquis"],
      ["non_evalue", "Non évalué"]
    ].filter(([status]) => summary[status] > 0).map(([status, label]) => `
      <span class="badge ${status === "acquis" ? "success" : status === "partiellement_acquis" ? "accent" : status === "en_cours_acquisition" ? "warning" : "ghost"}">${summary[status]} ${label}</span>
    `).join("");
  }

  function recomputeActivitySkillsUltraSafe(activity, studentId) {
    const student = getStudentById(studentId);
    if (!activity || !student) return;
    student.skillGrades = hydrateSkillGrades(student.skillGrades || {});
    const evaluation = activity.evaluations?.[studentId] || {};
    const resolvedSkillMap = getResolvedIndicatorSkillMapUltraSafe(activity);
    getActivitySkillIds(activity).forEach((skillId) => {
      const relatedIndicators = (activity.indicators || []).filter((indicator) => resolvedSkillMap.get(indicator.id) === skillId);
      if (!relatedIndicators.length) return;
      const scores = relatedIndicators.map((indicator) => levelScores[evaluation[indicator.id]] || 0);
      const averageScore = scores.length ? scores.reduce((sum, value) => sum + value, 0) / scores.length : 0;
      const gradeFromIndicators = Math.round((averageScore / 4) * 20 * 2) / 2;
      student.skillGrades[skillId] = gradeFromIndicators;
      student.skills[skillId] = mapGradeToStatus(gradeFromIndicators);
    });
  }

  function syncStudentActivityCardUltraSafe(activity, studentId) {
    const matrix = document.querySelector("#activity-matrix");
    const card = matrix?.querySelector(`.activity-student-card[data-student-id="${studentId}"]`);
    const student = getStudentById(studentId);
    if (!matrix || !card || !student || !activity) return;

    const evaluation = activity.evaluations?.[studentId] || {};
    const globalGrade = normalizeGrade(evaluation.__globalGrade);
    const mappedStatus = mapGradeToStatus(globalGrade);
    const groups = getActivityIndicatorGroupsUltraSafe(activity);

    card.querySelectorAll(".activity-status-select").forEach((select) => {
      select.value = getActivityIndicatorStatus(activity, studentId, select.dataset.indicatorId);
    });

    const gradeInput = card.querySelector(".activity-student-global-grade");
    if (gradeInput) gradeInput.value = globalGrade === "" ? "" : globalGrade;
    const gradeHint = card.querySelector(".activity-global-grade-hint");
    if (gradeHint) gradeHint.textContent = getLevelLabelSafe(mappedStatus) || "Non évalué";

    const metaText = card.querySelector(".activity-student-head-main .muted-copy");
    if (metaText) {
      metaText.textContent = `${getStudentProgress(student)}% validé // ${repairInlineLabelUltraSafe(getClassById(student.classId)?.name || "")}`;
    }
    const statusBadge = card.querySelector(".activity-student-card-meta .badge:last-child");
    if (statusBadge) {
      statusBadge.className = `badge ${mappedStatus === "acquis" ? "success" : mappedStatus === "partiellement_acquis" ? "accent" : mappedStatus === "en_cours_acquisition" ? "warning" : "ghost"}`;
      statusBadge.textContent = getLevelLabelSafe(mappedStatus) || "Non évalué";
    }

    card.querySelectorAll(".activity-skill-group").forEach((section) => {
      const summaryContainer = section.querySelector(".activity-skill-group-summary");
      if (!summaryContainer) return;
      const title = section.querySelector(".activity-skill-group-heading strong")?.textContent || "";
      const group = groups.find((item) => item.title === title);
      if (!group) return;
      summaryContainer.innerHTML = renderIndicatorSummaryBadgesUltraSafe(getIndicatorStatusSummaryUltraSafe(activity, studentId, group.indicators));
    });
  }

  function renderActivityCardsLayoutUltraSafe() {
    if (document.body?.dataset?.page !== "evaluations") return;
    const matrix = document.querySelector("#activity-matrix");
    const legend = document.querySelector("#activity-indicator-legend");
    const sessionClassSelect = document.querySelector("#session-class-select");
    const evalClassSelect = document.querySelector("#eval-class-select");
    const activitySelect = document.querySelector("#activity-select");
    if (!matrix) return;
    const requestedActivityId = matrix.dataset.renderActivityId || activitySelect?.value || "";
    const requestedActivity = getActivityById(requestedActivityId);
    const selectedActivity = getActivityById(activitySelect?.value || "");
    const selectedClassId = requestedActivity?.classId || selectedActivity?.classId || sessionClassSelect?.value || evalClassSelect?.value || app.classes[0]?.id || "";
    const fallbackActivity = getActivitiesByClass(selectedClassId)[0];
    const activity = requestedActivity || selectedActivity || fallbackActivity;
    if (legend) legend.remove();
    if (!activity) {
      matrix.className = "activity-cards-layout";
      matrix.innerHTML = "";
      delete matrix.dataset.openStudentId;
      delete matrix.dataset.renderActivityId;
      return;
    }

    const classId = activity.classId || selectedClassId;
    matrix.dataset.renderActivityId = activity.id;
    if (sessionClassSelect && sessionClassSelect.value !== classId && getClassById(classId)) {
      sessionClassSelect.value = classId;
    }
    if (evalClassSelect && evalClassSelect.value !== classId && getClassById(classId)) {
      evalClassSelect.value = classId;
    }
    if (activitySelect && activitySelect.value !== activity.id && [...(activitySelect.options || [])].some((option) => option.value === activity.id)) {
      activitySelect.value = activity.id;
    }

    const students = getStudentsByClass(classId);
    const groups = getActivityIndicatorGroupsUltraSafe(activity);
    if (matrix.dataset.openStudentId && !students.some((student) => student.id === matrix.dataset.openStudentId)) {
      delete matrix.dataset.openStudentId;
    }
    const preferredOpenStudentId = matrix.dataset.openStudentId || students[0]?.id || "";
    matrix.className = "activity-cards-layout";
    matrix.innerHTML = students.map((student, index) => {
      const globalGrade = getActivityGlobalGradeUltraSafe(activity, student.id);
      const mappedStatus = mapGradeToStatus(globalGrade);
      const isOpen = student.id === preferredOpenStudentId || (!preferredOpenStudentId && index === 0);
      return `
        <article class="activity-student-card panel${isOpen ? " is-open" : ""}" data-student-id="${student.id}">
          <div class="activity-student-toggle" role="button" tabindex="0" aria-expanded="${isOpen ? "true" : "false"}">
            <div class="activity-student-card-head">
              <div class="activity-student-head-main">
                <h3>${escapeHtml(repairInlineLabelUltraSafe(student.name))}</h3>
                <p class="muted-copy">${getStudentProgress(student)}% validé // ${escapeHtml(repairInlineLabelUltraSafe(getClassById(student.classId)?.name || ""))}</p>
              </div>
              <div class="activity-student-card-meta">
                <span class="badge">${groups.length} bloc(s)</span>
                <span class="badge ${mappedStatus === "acquis" ? "success" : mappedStatus === "partiellement_acquis" ? "accent" : mappedStatus === "en_cours_acquisition" ? "warning" : "ghost"}">${escapeHtml(getLevelLabelSafe(mappedStatus) || "Non évalué")}</span>
              </div>
            </div>
          </div>
          <div class="activity-student-groups">
            <section class="activity-skill-group activity-global-grade-box">
              <div class="activity-global-grade-actions">
                <label class="field compact-field">
                  <span>Note globale /20</span>
                  <input class="activity-student-global-grade" type="text" inputmode="decimal" data-activity-id="${activity.id}" data-student-id="${student.id}" value="${globalGrade === "" ? "" : globalGrade}" placeholder="Ex. 13.5">
                  <small class="activity-global-grade-hint">${escapeHtml(getLevelLabelSafe(mapGradeToStatus(globalGrade)) || "Non évalué")}</small>
                </label>
                <button class="primary-button activity-global-grade-apply" type="button" data-activity-id="${activity.id}" data-student-id="${student.id}"${hasPermission("edit_evaluations") ? "" : " disabled"}>Appliquer</button>
              </div>
            </section>
            ${groups.map((group) => `
              <section class="activity-skill-group">
                <div class="activity-skill-group-head">
                  <div class="activity-skill-group-heading">
                    <strong>${escapeHtml(group.title)}</strong>
                    <p class="muted-copy">${group.indicators.length} indicateur(s)</p>
                  </div>
                  <div class="activity-skill-group-summary">
                    ${(() => {
                      const summary = getIndicatorStatusSummaryUltraSafe(activity, student.id, group.indicators);
                      return renderIndicatorSummaryBadgesUltraSafe(summary);
                    })()}
                  </div>
                </div>
                <div class="activity-indicator-list">
                  ${group.indicators.map((indicator) => `
                    <label class="activity-indicator-row">
                      <span class="activity-indicator-row-index">I${(activity.indicators || []).findIndex((item) => item.id === indicator.id) + 1}</span>
                      <span class="activity-indicator-row-body">
                        <span class="activity-indicator-card-label">${escapeHtml(repairInlineLabelUltraSafe(indicator.label))}</span>
                      </span>
                      <select data-activity-id="${activity.id}" data-student-id="${student.id}" data-indicator-id="${indicator.id}" class="activity-status-select"${hasPermission("edit_evaluations") ? "" : " disabled"}>
                        ${renderStatusOptions(getActivityIndicatorStatus(activity, student.id, indicator.id))}
                      </select>
                    </label>
                  `).join("")}
                </div>
              </section>
            `).join("")}
          </div>
        </article>
      `;
    }).join("");

    const toggleCard = (toggle) => {
      const card = toggle.closest(".activity-student-card");
      if (!card) return;
      const shouldOpen = !card.classList.contains("is-open");
      matrix.dataset.openStudentId = shouldOpen ? card.dataset.studentId || "" : "";
      matrix.querySelectorAll(".activity-student-card").forEach((item) => {
        item.classList.remove("is-open");
        const itemToggle = item.querySelector(".activity-student-toggle");
        if (itemToggle) itemToggle.setAttribute("aria-expanded", "false");
      });
      if (shouldOpen) {
        card.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
      }
    };

    matrix.querySelectorAll(".activity-student-toggle").forEach((toggle) => {
      if (toggle.dataset.ultraBound === "true") return;
      toggle.dataset.ultraBound = "true";
      toggle.addEventListener("click", (event) => {
        event.preventDefault();
        if (event.target.closest(".activity-status-select, .activity-student-global-grade")) return;
        toggleCard(toggle);
      });
      toggle.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        toggleCard(toggle);
      });
    });

    matrix.querySelectorAll(".activity-status-select").forEach((select) => {
      if (select.dataset.ultraBound === "true") return;
      select.dataset.ultraBound = "true";
      ["click", "mousedown", "focus"].forEach((eventName) => {
        select.addEventListener(eventName, (event) => event.stopPropagation());
      });
      select.addEventListener("change", (event) => {
        if (!hasPermission("edit_evaluations")) return;
        const target = event.currentTarget;
        const liveActivity = getActivityById(target.dataset.activityId) || activity;
        matrix.dataset.openStudentId = target.dataset.studentId || matrix.dataset.openStudentId || "";
        setActivityIndicatorStatus(liveActivity.id, target.dataset.studentId, target.dataset.indicatorId, target.value);
        recomputeActivitySkillsUltraSafe(liveActivity, target.dataset.studentId);
        persistAppData();
        syncStudentActivityCardUltraSafe(liveActivity, target.dataset.studentId);
        const classId = document.querySelector("#session-class-select")?.value || app.classes[0]?.id || "";
        renderActivitySummary(liveActivity, classId);
        renderActivityReport(liveActivity, classId);
        renderActivitySynthesis(classId);
        renderStudentSheet();
      });
    });

    matrix.querySelectorAll(".activity-student-global-grade").forEach((input) => {
      if (input.dataset.ultraBound === "true") return;
      input.dataset.ultraBound = "true";
      ["click", "mousedown", "focus"].forEach((eventName) => {
        input.addEventListener(eventName, (event) => event.stopPropagation());
      });
      input.addEventListener("input", (event) => {
        const target = event.currentTarget;
        const hint = target.closest(".activity-global-grade-actions")?.querySelector(".activity-global-grade-hint");
        if (!hint) return;
        const normalized = normalizeGrade(String(target.value || "").replace(",", "."));
        hint.textContent = getLevelLabelSafe(mapGradeToStatus(normalized)) || "Non évalué";
      });
      input.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        const target = event.currentTarget;
        target.closest(".activity-global-grade-actions")?.querySelector(".activity-global-grade-apply")?.click();
      });
    });

    matrix.querySelectorAll(".activity-global-grade-apply").forEach((button) => {
      if (button.dataset.ultraBound === "true") return;
      button.dataset.ultraBound = "true";
      button.addEventListener("click", (event) => {
        if (!hasPermission("edit_evaluations")) return;
        const target = event.currentTarget;
        const wrapper = target.closest(".activity-global-grade-actions");
        const input = wrapper?.querySelector(".activity-student-global-grade");
        if (!input) return;
        const liveActivity = getActivityById(target.dataset.activityId) || activity;
        matrix.dataset.openStudentId = target.dataset.studentId || matrix.dataset.openStudentId || "";
        applyActivityGlobalGradeUltraSafe(liveActivity, target.dataset.studentId, String(input.value || "").replace(",", "."));
        persistAppData();
        syncStudentActivityCardUltraSafe(liveActivity, target.dataset.studentId);
        const classId = document.querySelector("#session-class-select")?.value || app.classes[0]?.id || "";
        renderActivitySummary(liveActivity, classId);
        renderActivityReport(liveActivity, classId);
        renderActivitySynthesis(classId);
        renderStudentSheet();
      });
    });
  }

  let activityCardsRenderQueuedUltraSafe = false;
  function scheduleActivityCardsLayoutUltraSafe(delay = 0) {
    const trigger = () => {
      if (activityCardsRenderQueuedUltraSafe) return;
      activityCardsRenderQueuedUltraSafe = true;
      window.requestAnimationFrame(() => {
        activityCardsRenderQueuedUltraSafe = false;
        renderActivityCardsLayoutUltraSafe();
      });
    };
    if (delay > 0) {
      window.setTimeout(trigger, delay);
    } else {
      trigger();
    }
  }

  const originalInitEvaluationsPageCardsUltraSafe = initEvaluationsPageFinal;
  initEvaluationsPageFinal = function () {
    originalInitEvaluationsPageCardsUltraSafe();
    scheduleActivityCardsLayoutUltraSafe();
    scheduleActivityCardsLayoutUltraSafe(160);
  };

  function bindActivityCardsObserverUltraSafe() {
    if (document.body?.dataset?.page !== "evaluations") return;
    const matrix = document.querySelector("#activity-matrix");
    if (!matrix || matrix.dataset.cardsObserverBound === "true") return;
    matrix.dataset.cardsObserverBound = "true";

    const shouldConvertMatrix = () => {
      const currentMatrix = document.querySelector("#activity-matrix");
      if (!currentMatrix) return false;
      if (currentMatrix.querySelector(".activity-student-card")) return false;
      const explicitActivityId = currentMatrix.dataset.renderActivityId || document.querySelector("#activity-select")?.value || "";
      const explicitActivity = getActivityById(explicitActivityId);
      if (explicitActivity && !currentMatrix.children.length) return true;
      return currentMatrix.classList.contains("activity-grid")
        || Boolean(currentMatrix.querySelector(".matrix-header, .matrix-row, .activity-header, .activity-row"));
    };

    const observer = new MutationObserver(() => {
      if (shouldConvertMatrix()) scheduleActivityCardsLayoutUltraSafe();
    });
    observer.observe(matrix, {
      childList: true,
      subtree: false,
      attributes: true,
      attributeFilter: ["class"]
    });

    ["#activity-select", "#session-class-select", "#eval-class-select", "#eval-student-select"].forEach((selector) => {
      const field = document.querySelector(selector);
      if (!field || field.dataset.cardsObserverFieldBound === "true") return;
      field.dataset.cardsObserverFieldBound = "true";
      field.addEventListener("change", () => scheduleActivityCardsLayoutUltraSafe(0));
    });

    scheduleActivityCardsLayoutUltraSafe();
  }

  const originalRenderEvaluationPageUltraSafe = renderEvaluationPage;
  renderEvaluationPage = function (...args) {
    originalRenderEvaluationPageUltraSafe.apply(this, args);
    scheduleActivityCardsLayoutUltraSafe();
  };

  renderActivityMatrix = function () {
    const matrix = document.querySelector("#activity-matrix");
    if (matrix) {
      matrix.className = "activity-cards-layout";
      matrix.innerHTML = "";
    }
    scheduleActivityCardsLayoutUltraSafe();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      bindActivityCardsObserverUltraSafe();
      window.setTimeout(renderActivityCardsLayoutUltraSafe, 0);
    }, { once: true });
  } else {
    bindActivityCardsObserverUltraSafe();
    scheduleActivityCardsLayoutUltraSafe();
  }

  window.__cielRenderActivityCardsLayoutSafe = renderActivityCardsLayoutUltraSafe;
  window.__cielScheduleActivityCardsLayoutSafe = scheduleActivityCardsLayoutUltraSafe;
})();

;(function () {
  function populateActivityEditorFromSelectionSafe() {
    if (document.body?.dataset?.page !== "evaluations") return;
    const activitySelect = document.querySelector("#activity-select");
    const activity = getActivityById(activitySelect?.value);
    const form = document.querySelector("#activity-form");
    const typeInput = document.querySelector("#activity-type");
    const titleInput = document.querySelector("#activity-title");
    const classInput = document.querySelector("#activity-class");
    const skillInput = document.querySelector("#activity-skill");
    const startInput = document.querySelector("#activity-date-start");
    const endInput = document.querySelector("#activity-date-end");
    const indicatorsInput = document.querySelector("#activity-indicators");
    const commentInput = document.querySelector("#activity-comment");
    const submitButton = document.querySelector("#activity-submit-button");
    const cancelButton = document.querySelector("#activity-cancel-edit");
    const indicatorSkill = document.querySelector("#activity-indicator-skill");
    const indicatorList = document.querySelector("#activity-indicator-list");
    const feedback = document.querySelector("#activity-feedback");
    if (!activity || !form || !typeInput || !titleInput || !classInput || !skillInput || !startInput || !endInput || !indicatorsInput || !commentInput || !submitButton || !cancelButton) return;

    const activitySkillIds = getActivitySkillIds(activity);
    form.dataset.editingId = activity.id;
    typeInput.value = activity.type || "TP";
    titleInput.value = activity.title || "";
    classInput.value = activity.classId || "";
    setMultiSelectValues(skillInput, activitySkillIds);
    setPendingActivitySkillIdsForIndicatorPickerSafe(form, activitySkillIds);
    form.dataset.appliedSkillIds = JSON.stringify(activitySkillIds);
    startInput.value = activity.startDate || activity.date || "";
    endInput.value = activity.endDate || activity.startDate || activity.date || "";
    indicatorsInput.value = (activity.indicators || []).map((indicator) => indicator.label).join("\n");
    commentInput.value = activity.comment || "";
    submitButton.textContent = "Enregistrer les modifications";
    cancelButton.hidden = false;
    if (indicatorSkill) renderActivityIndicatorSkillSelectSafe(indicatorSkill, activitySkillIds);
    if (indicatorList) {
      indicatorList.innerHTML = (activity.indicators || []).length
        ? activity.indicators.map((indicator) => `
          <article class="directory-row compact">
            <div>
              <strong>${escapeHtml(indicator.label)}</strong>
              <p>${escapeHtml(indicator.skillId ? getActivitySkillLabel({ skillIds: [indicator.skillId], skillId: indicator.skillId }) : "Toutes les compétences de la séance")}</p>
            </div>
          </article>
        `).join("")
        : `<article class="directory-row"><div><strong>Aucun indicateur structuré</strong><p>Utilise la saisie rapide ou ajoute des indicateurs ci-dessus.</p></div></article>`;
    }
    if (typeof applyEvaluationsView === "function") applyEvaluationsView("create");
    if (feedback) feedback.textContent = `Édition de la séance : ${activity.title}`;
  }

  function resetActivityEditorFallbackSafe() {
    if (document.body?.dataset?.page !== "evaluations") return;
    const form = document.querySelector("#activity-form");
    const submitButton = document.querySelector("#activity-submit-button");
    const cancelButton = document.querySelector("#activity-cancel-edit");
    const indicatorList = document.querySelector("#activity-indicator-list");
    const feedback = document.querySelector("#activity-feedback");
    const skillInput = document.querySelector("#activity-skill");
    if (!form || !submitButton || !cancelButton) return;
    delete form.dataset.editingId;
    setPendingActivitySkillIdsForIndicatorPickerSafe(form, []);
    form.dataset.appliedSkillIds = "[]";
    submitButton.textContent = "Créer la séance";
    cancelButton.hidden = true;
    if (indicatorList) {
      indicatorList.innerHTML = `<article class="directory-row"><div><strong>Aucun indicateur structuré</strong><p>Ajoute des indicateurs liés à une compétence ou utilise la saisie rapide.</p></div></article>`;
    }
    if (skillInput) clearMultiSelect(skillInput);
    if (feedback) feedback.textContent = "Edition annulee.";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindSafeEvaluationEditFallback, { once: true });
  } else {
    bindSafeEvaluationEditFallback();
  }

  function bindSafeEvaluationEditFallback() {
    if (document.body?.dataset?.page !== "evaluations") return;
    if (document.body.dataset.evalEditFallbackBound) return;
    document.body.dataset.evalEditFallbackBound = "true";
    document.addEventListener("click", (event) => {
      const editButton = event.target.closest("#activity-edit-button");
      if (editButton) {
        event.preventDefault();
        event.stopPropagation();
        populateActivityEditorFromSelectionSafe();
        return;
      }
      const cancelButton = event.target.closest("#activity-cancel-edit");
      if (cancelButton) {
        event.preventDefault();
        resetActivityEditorFallbackSafe();
      }
    }, true);
  }
})();

;(function () {
  function getActivityStatusesOnlySafe(activity, studentId) {
    if (!activity?.evaluations?.[studentId]) return [];
    return Object.entries(activity.evaluations[studentId])
      .filter(([key]) => !String(key).startsWith("__"))
      .map(([, value]) => value)
      .filter((value) => Object.hasOwn(levelScores, value));
  }

  const originalGetStudentActivityAverageSafe = getStudentActivityAverage;
  getStudentActivityAverage = function (activity, studentId) {
    const statuses = getActivityStatusesOnlySafe(activity, studentId);
    if (!statuses.length) return 0;
    const scores = statuses.map((status) => levelScores[status] || 0);
    return Math.round((scores.reduce((sum, score) => sum + score, 0) / (scores.length * (levelScores.acquis || 1))) * 100);
  };

  function getActivityGlobalGradeSafe(activity, studentId) {
    const raw = activity?.evaluations?.[studentId]?.__globalGrade;
    return normalizeGrade(raw);
  }

  function setActivityGlobalGradeSafe(activityId, studentId, grade) {
    const activity = getActivityById(activityId);
    const student = getStudentById(studentId);
    if (!activity || !student) return;
    const normalized = normalizeGrade(grade);
    if (!activity.evaluations[studentId]) activity.evaluations[studentId] = {};
    if (normalized === "") {
      delete activity.evaluations[studentId].__globalGrade;
      return;
    }
    activity.evaluations[studentId].__globalGrade = normalized;
    const autoStatus = mapGradeToStatus(normalized);
    activity.indicators.forEach((indicator) => {
      activity.evaluations[studentId][indicator.id] = autoStatus;
    });
    getActivitySkillIds(activity).forEach((skillId) => {
      student.skillGrades = hydrateSkillGrades(student.skillGrades || {});
      student.skillGrades[skillId] = normalized;
      student.skills[skillId] = autoStatus;
    });
    logAction("Note de sÃ©ance appliquÃ©e", student.name, `${activity.title} // ${normalized}/20 // ${levelLabels[autoStatus] || autoStatus}`);
  }

  function buildStructuredIndicatorsFromTextareaSafe(title, textarea) {
    return String(textarea?.value || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((label, index) => ({
        id: slugify(`${title || "indicator"}-${index}-${Date.now()}`),
        label,
        skillId: ""
      }));
  }

  function enhanceEvaluationsWorkflowSafe() {
    if (document.body?.dataset?.page !== "evaluations") return;
    const activityForm = document.querySelector("#activity-form");
    const activityType = document.querySelector("#activity-type");
    const activityTitle = document.querySelector("#activity-title");
    const activityClass = document.querySelector("#activity-class");
    const activitySkill = document.querySelector("#activity-skill");
    const activityDateStart = document.querySelector("#activity-date-start");
    const activityDateEnd = document.querySelector("#activity-date-end");
    const activityIndicators = document.querySelector("#activity-indicators");
    const activityComment = document.querySelector("#activity-comment");
    const activityFeedback = document.querySelector("#activity-feedback");
    const sessionClassSelect = document.querySelector("#session-class-select");
    const evalStudentSelect = document.querySelector("#eval-student-select");
    const activityIndicatorSkill = document.querySelector("#activity-indicator-skill");
    const activityIndicatorLabel = document.querySelector("#activity-indicator-label");
    const activityIndicatorAddButton = document.querySelector("#activity-indicator-add");
    const activityIndicatorClearButton = document.querySelector("#activity-indicator-clear");
    const activityIndicatorList = document.querySelector("#activity-indicator-list");
    const indicatorBankLoadButton = document.querySelector("#indicator-bank-load");
    const activityEditButton = document.querySelector("#activity-edit-button");
    const activitySelect = document.querySelector("#activity-select");
    const activitySubmitButton = document.querySelector("#activity-submit-button");
    const activityCancelEditButton = document.querySelector("#activity-cancel-edit");
    const studentSkillsEditor = document.querySelector("#student-skills-editor");
    if (!activityForm || !activityType || !activityTitle || !activityClass || !activitySkill || !activityDateStart || !activityDateEnd || !activityIndicators || !activityComment || !activityFeedback || !sessionClassSelect || !evalStudentSelect || !activityIndicatorSkill || !activityIndicatorLabel || !activityIndicatorAddButton || !activityIndicatorClearButton || !activityIndicatorList || !activityEditButton || !activitySelect || !activitySubmitButton || !activityCancelEditButton || !studentSkillsEditor) return;

    let indicatorDraft = [];

    function syncStoredDraftSafe() {
      const storedDraft = getStoredActivityIndicatorDraftSafe(activityForm);
      if (storedDraft.length || activityForm?.dataset?.indicatorDraft === "[]") {
        indicatorDraft = storedDraft;
      } else {
        indicatorDraft = setStoredActivityIndicatorDraftSafe(activityForm, indicatorDraft);
      }
      return indicatorDraft;
    }

    function getSelectedSkillIds() {
      return getActivitySkillIdsForIndicatorPickerSafe(activitySkill, activityForm);
    }

    function syncIndicatorSkillOptionsSafe() {
      renderActivityIndicatorSkillSelectSafe(activityIndicatorSkill, getSelectedSkillIds());
    }

    function syncTextareaFromDraftSafe() {
      syncStoredDraftSafe();
      activityIndicators.value = indicatorDraft.map((indicator) => indicator.label).join("\n");
    }

    function renderIndicatorDraftSafe() {
      syncStoredDraftSafe();
      if (!indicatorDraft.length) {
        activityIndicatorList.innerHTML = `<article class="directory-row"><div><strong>Aucun indicateur structuré</strong><p>Ajoute des indicateurs liés à une compétence ou utilise la saisie rapide.</p></div></article>`;
        return;
      }
      activityIndicatorList.innerHTML = indicatorDraft.map((indicator) => `
        <article class="directory-row compact">
          <div>
            <strong>${escapeHtml(indicator.label)}</strong>
            <p>${escapeHtml(indicator.skillId ? getActivitySkillLabel({ skillIds: [indicator.skillId], skillId: indicator.skillId }) : "Toutes les compétences de la séance")}</p>
          </div>
          <div class="student-badges">
            <button class="ghost-button indicator-draft-delete" type="button" data-id="${indicator.id}">Retirer</button>
          </div>
        </article>
      `).join("");
      activityIndicatorList.querySelectorAll(".indicator-draft-delete").forEach((button) => {
        button.addEventListener("click", () => {
          indicatorDraft = indicatorDraft.filter((item) => item.id !== button.dataset.id);
          syncTextareaFromDraftSafe();
          renderIndicatorDraftSafe();
        });
      });
    }

    function resetActivityEditorSafe() {
      activityForm.reset();
      clearMultiSelect(activitySkill);
      setPendingActivitySkillIdsForIndicatorPickerSafe(activityForm, []);
      activityForm.dataset.appliedSkillIds = "[]";
      indicatorDraft = [];
      setStoredActivityIndicatorDraftSafe(activityForm, []);
      setAuthoritativeActivityIndicatorDraftSafe(activityForm, []);
      renderActivityIndicatorSkillSelectSafe(activityIndicatorSkill, []);
      syncTextareaFromDraftSafe();
      renderIndicatorDraftSafe();
      window.__cielInlineIndicatorRefresh?.();
      if (activitySubmitButton) activitySubmitButton.textContent = "Créer la séance";
      if (activityCancelEditButton) activityCancelEditButton.hidden = true;
      delete activityForm.dataset.editingId;
    }

    function loadActivityForEditSafe(activity) {
      if (!activity) return;
      const activitySkillIds = getActivitySkillIds(activity);
      activityForm.dataset.editingId = activity.id;
      activityType.value = activity.type || "TP";
      activityTitle.value = activity.title || "";
      activityClass.value = activity.classId || "";
      activityDateStart.value = activity.startDate || activity.date || "";
      activityDateEnd.value = activity.endDate || activity.startDate || activity.date || "";
      activityComment.value = activity.comment || "";
      setMultiSelectValues(activitySkill, activitySkillIds);
      setPendingActivitySkillIdsForIndicatorPickerSafe(activityForm, activitySkillIds);
      activityForm.dataset.appliedSkillIds = JSON.stringify(activitySkillIds);
      indicatorDraft = (activity.indicators || []).map((indicator, index) => ({
        id: indicator.id || slugify(`${activity.id}-indicator-${index}`),
        label: indicator.label,
        skillId: indicator.skillId || ""
      }));
      setStoredActivityIndicatorDraftSafe(activityForm, indicatorDraft);
      setAuthoritativeActivityIndicatorDraftSafe(activityForm, indicatorDraft.map((indicator) => ({
        ...indicator,
        skillLabel: indicator.skillId ? getActivitySkillLabel({ skillIds: [indicator.skillId], skillId: indicator.skillId }) : "Toutes les compétences de la séance"
      })));
      renderActivityIndicatorSkillSelectSafe(activityIndicatorSkill, activitySkillIds);
      syncTextareaFromDraftSafe();
      renderIndicatorDraftSafe();
      window.__cielInlineIndicatorRefresh?.();
      if (activitySubmitButton) activitySubmitButton.textContent = "Enregistrer les modifications";
      if (activityCancelEditButton) activityCancelEditButton.hidden = false;
      if (typeof applyEvaluationsView === "function") applyEvaluationsView("create");
      activityFeedback.textContent = `Édition de la séance : ${activity.title}`;
    }

    function handleStructuredSubmitSafe(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (!hasPermission("edit_evaluations")) return;
      const pendingLabel = activityIndicatorLabel.value.trim();
      if (pendingLabel) {
        const availableSkillIds = getActivitySkillIdsForIndicatorPickerSafe(activitySkill, activityForm);
        const selectedSkillId = activityIndicatorSkill.value || (availableSkillIds.length === 1 ? availableSkillIds[0] : "");
        indicatorDraft = getStoredActivityIndicatorDraftSafe(activityForm);
        indicatorDraft.push({
          id: slugify(`indicator-${pendingLabel}-${Date.now()}`),
          label: pendingLabel,
          skillId: selectedSkillId
        });
        setStoredActivityIndicatorDraftSafe(activityForm, indicatorDraft);
        activityIndicatorLabel.value = "";
      }
      let selectedSkillIds = getSelectedSkillIds();
      if (!selectedSkillIds.length && activityForm.dataset.appliedSkillIds) {
        try {
          const parsed = JSON.parse(activityForm.dataset.appliedSkillIds);
          if (Array.isArray(parsed)) {
            selectedSkillIds = parsed.filter(Boolean);
          }
        } catch {}
      }
      const effectiveDraft = getAuthoritativeActivityIndicatorDraftSafe(activityForm).length
        ? getAuthoritativeActivityIndicatorDraftSafe(activityForm)
        : getStoredActivityIndicatorDraftSafe(activityForm);
      if (effectiveDraft.length) indicatorDraft = effectiveDraft;
      const indicators = normalizeActivityIndicatorsBySkillSafe((indicatorDraft.length ? indicatorDraft : buildStructuredIndicatorsFromTextareaSafe(activityTitle.value.trim(), activityIndicators)).map((indicator, index) => ({
        id: indicator.id || slugify(`${activityTitle.value.trim()}-${index}-${Date.now()}`),
        label: indicator.label,
        skillId: indicator.skillId || ""
      })), selectedSkillIds);
      if (!activityTitle.value.trim() || !activityClass.value || !selectedSkillIds.length || !indicators.length) {
        activityFeedback.textContent = "Renseigne un titre, une classe, au moins une compétence et au moins un indicateur.";
        return;
      }
      const editingId = activityForm.dataset.editingId;
      let targetActivityId = editingId || "";
      let targetClassId = activityClass.value;
      if (editingId) {
        const activity = getActivityById(editingId);
        if (!activity) {
          activityFeedback.textContent = "Séance introuvable.";
          return;
        }
        activity.title = activityTitle.value.trim();
        activity.type = activityType.value;
        activity.classId = activityClass.value;
        activity.skillIds = selectedSkillIds;
        activity.skillId = selectedSkillIds[0];
        activity.date = activityDateStart.value;
        activity.startDate = activityDateStart.value;
        activity.endDate = activityDateEnd.value || activityDateStart.value;
        activity.comment = activityComment.value.trim();
        activity.indicators = indicators;
        Object.assign(activity, hydrateEvaluationActivity(activity, app.evaluationActivities.findIndex((item) => item.id === activity.id)));
        targetClassId = activity.classId;
        logAction("Séance modifiée", activity.title, `${activity.type} // ${getClassById(activity.classId)?.name || ""}`);
        activityFeedback.textContent = "Séance mise à jour.";
      } else {
        const newActivity = hydrateEvaluationActivity({
          id: slugify(`${activityTitle.value.trim()}-${Date.now()}`),
          title: activityTitle.value.trim(),
          type: activityType.value,
          classId: activityClass.value,
          skillId: selectedSkillIds[0],
          skillIds: selectedSkillIds,
          date: activityDateStart.value,
          startDate: activityDateStart.value,
          endDate: activityDateEnd.value || activityDateStart.value,
          comment: activityComment.value.trim(),
          indicators,
          evaluations: {}
        }, app.evaluationActivities.length);
        app.evaluationActivities.push(newActivity);
        targetActivityId = newActivity.id;
        targetClassId = newActivity.classId;
        logAction("Séance créée", activityTitle.value.trim(), `${activityType.value} // ${getClassById(activityClass.value)?.name || ""}`);
        activityFeedback.textContent = "Séance créée.";
      }
      persistAppData();
      resetActivityEditorSafe();
      sessionClassSelect.value = targetClassId;
      evalClassSelect.value = targetClassId;
      syncSessionActivities(targetActivityId);
      const syncedActivitySelect = document.querySelector("#activity-select");
      if (syncedActivitySelect && [...(syncedActivitySelect.options || [])].some((option) => option.value === targetActivityId)) {
        syncedActivitySelect.value = targetActivityId;
      }
      const matrix = document.querySelector("#activity-matrix");
      if (matrix && targetActivityId) {
        matrix.dataset.renderActivityId = targetActivityId;
      }
      syncEvalStudents();
      renderEvaluationPage();
      window.__cielScheduleActivityCardsLayoutSafe?.();
    }

    function enhanceStudentSkillRowsSafe() {
      const classId = document.querySelector("#eval-class-select")?.value || app.classes[0]?.id || "";
      const student = getStudentById(evalStudentSelect.value) || getStudentsByClass(classId)[0];
      if (!student) return;
      student.skillGrades = hydrateSkillGrades(student.skillGrades || {});
      const rows = studentSkillsEditor.querySelectorAll(".skill-row");
      rows.forEach((row, index) => {
        const skill = skillCatalog[index];
        if (!skill) return;
        const select = row.querySelector(".skill-select");
        const input = row.querySelector(".skill-grade-input");
        const hint = row.querySelector(".skill-grade-hint");
        if (!select || !input || !hint) return;
        input.value = student.skillGrades?.[skill.id] ?? "";
        hint.textContent = input.value === "" ? "Vide = non évalué" : `Auto : ${levelLabels[mapGradeToStatus(input.value)] || "Non évalué"}`;
        if (!input.dataset.gradeBound) {
          input.dataset.gradeBound = "true";
          input.addEventListener("change", () => {
            const normalized = normalizeGrade(input.value);
            student.skillGrades[skill.id] = normalized;
            const autoStatus = mapGradeToStatus(normalized);
            student.skills[skill.id] = autoStatus;
            hint.textContent = normalized === "" ? "Vide = non évalué" : `Auto : ${levelLabels[autoStatus] || autoStatus}`;
            logAction("Compétence notée", student.name, `${skill.code} // ${normalized === "" ? "non évalué" : `${normalized}/20`} // ${levelLabels[autoStatus] || autoStatus}`);
            persistAppData();
            select.value = autoStatus;
            evalStudentSelect.dispatchEvent(new Event("change"));
          });
        }
      });
    }

    function renderGlobalGradeControlsSafe() {
      const matrix = document.querySelector("#activity-matrix");
      const classId = document.querySelector("#session-class-select")?.value || app.classes[0]?.id || "";
      const activity = getActivityById(document.querySelector("#activity-select")?.value) || getActivitiesByClass(classId)[0];
      if (!matrix || !activity) return;
      if (matrix.classList.contains("activity-cards-layout") || matrix.querySelector(".activity-student-card")) return;
      matrix.querySelectorAll(".matrix-row").forEach((row) => {
        const studentId = row.querySelector(".activity-status-select")?.dataset.studentId;
        if (!studentId || row.querySelector(".global-grade-field")) return;
        const firstCell = row.firstElementChild;
        if (!firstCell) return;
        const wrapper = document.createElement("div");
        wrapper.className = "global-grade-field";
        wrapper.innerHTML = `
          <label class="field compact-field">
            <span>Note globale /20</span>
            <input class="activity-global-grade-input" type="number" min="0" max="20" step="0.5" value="${getActivityGlobalGradeSafe(activity, studentId) ?? ""}" placeholder="Ex. 13.5">
            <small class="activity-global-grade-hint">${escapeHtml(levelLabels[mapGradeToStatus(getActivityGlobalGradeSafe(activity, studentId))] || "Non évalué")}</small>
          </label>
        `;
        firstCell.appendChild(wrapper);
        const input = wrapper.querySelector(".activity-global-grade-input");
        const hint = wrapper.querySelector(".activity-global-grade-hint");
        input?.addEventListener("change", () => {
          const normalized = normalizeGrade(input.value);
          setActivityGlobalGradeSafe(activity.id, studentId, normalized);
          persistAppData();
          hint.textContent = normalized === "" ? "Non évalué" : (levelLabels[mapGradeToStatus(normalized)] || "Non évalué");
          window.setTimeout(() => {
            document.querySelector("#session-class-select")?.dispatchEvent(new Event("change"));
            document.querySelector("#eval-student-select")?.dispatchEvent(new Event("change"));
          }, 0);
        });
      });
    }

    syncIndicatorSkillOptionsSafe();
    renderIndicatorDraftSafe();

    if (!activitySkill.dataset.structuredBound) {
      activitySkill.dataset.structuredBound = "true";
      activitySkill.addEventListener("change", syncIndicatorSkillOptionsSafe);
    }
    const latestAddButton = document.querySelector("#activity-indicator-add");
    if (latestAddButton && !latestAddButton.dataset.structuredBound) {
      const replacement = latestAddButton.cloneNode(true);
      replacement.dataset.structuredBound = "true";
      latestAddButton.replaceWith(replacement);
      replacement.addEventListener("click", () => {
        const label = activityIndicatorLabel.value.trim();
        if (!label) {
          activityFeedback.textContent = "Saisis un indicateur avant de l'ajouter.";
          return;
        }
        const availableSkillIds = getActivitySkillIdsForIndicatorPickerSafe(activitySkill, activityForm);
        const selectedSkillId = activityIndicatorSkill.value || (availableSkillIds.length === 1 ? availableSkillIds[0] : "");
        indicatorDraft = getStoredActivityIndicatorDraftSafe(activityForm);
        indicatorDraft.push({
          id: slugify(`indicator-${label}-${Date.now()}`),
          label,
          skillId: selectedSkillId
        });
        activityIndicatorLabel.value = "";
        syncTextareaFromDraftSafe();
        renderIndicatorDraftSafe();
        activityFeedback.textContent = "Indicateur ajouté.";
      });
    }
    const latestClearButton = document.querySelector("#activity-indicator-clear");
    if (latestClearButton && !latestClearButton.dataset.structuredBound) {
      const replacement = latestClearButton.cloneNode(true);
      replacement.dataset.structuredBound = "true";
      latestClearButton.replaceWith(replacement);
      replacement.addEventListener("click", () => {
        indicatorDraft = [];
        setStoredActivityIndicatorDraftSafe(activityForm, []);
        syncTextareaFromDraftSafe();
        renderIndicatorDraftSafe();
        activityFeedback.textContent = "Liste des indicateurs vidée.";
      });
    }
    if (!activityCancelEditButton.dataset.structuredBound) {
      activityCancelEditButton.dataset.structuredBound = "true";
      activityCancelEditButton.addEventListener("click", () => {
        resetActivityEditorSafe();
        activityFeedback.textContent = "Édition annulée.";
      });
    }
    if (!indicatorBankLoadButton.dataset.structuredBound) {
      indicatorBankLoadButton.dataset.structuredBound = "true";
      indicatorBankLoadButton.addEventListener("click", () => {
        window.setTimeout(() => {
          indicatorDraft = buildStructuredIndicatorsFromTextareaSafe(activityTitle.value.trim(), activityIndicators);
          setStoredActivityIndicatorDraftSafe(activityForm, indicatorDraft);
          setAuthoritativeActivityIndicatorDraftSafe(activityForm, indicatorDraft.map((indicator) => ({
            ...indicator,
            skillLabel: indicator.skillId ? getActivitySkillLabel({ skillIds: [indicator.skillId], skillId: indicator.skillId }) : "Toutes les compétences de la séance"
          })));
          renderIndicatorDraftSafe();
          window.__cielInlineIndicatorRefresh?.();
        }, 0);
      });
    }
    if (!activityEditButton.dataset.structuredBound) {
      const replacement = activityEditButton.cloneNode(true);
      replacement.dataset.structuredBound = "true";
      activityEditButton.replaceWith(replacement);
      replacement.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const activity = getActivityById(activitySelect.value);
        if (!activity || !hasPermission("edit_evaluations")) return;
        loadActivityForEditSafe(activity);
      });
    }
    if (!activityForm.dataset.structuredBound) {
      activityForm.dataset.structuredBound = "true";
      activityForm.addEventListener("submit", handleStructuredSubmitSafe, true);
    }
    if (!evalStudentSelect.dataset.gradeEnhanceBound) {
      evalStudentSelect.dataset.gradeEnhanceBound = "true";
      evalStudentSelect.addEventListener("change", () => window.setTimeout(enhanceStudentSkillRowsSafe, 0));
      document.querySelector("#eval-class-select")?.addEventListener("change", () => window.setTimeout(enhanceStudentSkillRowsSafe, 0));
    }
    if (!document.querySelector("#activity-matrix")?.dataset.globalGradeBound) {
      const matrix = document.querySelector("#activity-matrix");
      if (matrix) {
        matrix.dataset.globalGradeBound = "true";
      }
    }
    indicatorDraft = getAuthoritativeActivityIndicatorDraftSafe(activityForm).length
      ? getAuthoritativeActivityIndicatorDraftSafe(activityForm)
      : getStoredActivityIndicatorDraftSafe(activityForm);
    window.__cielInlineIndicatorRefresh?.();
    window.setTimeout(enhanceStudentSkillRowsSafe, 0);
  }

  const originalInitEvaluationsPageStructuredSafe = initEvaluationsPageFinal;
  initEvaluationsPageFinal = function () {
    originalInitEvaluationsPageStructuredSafe();
    window.setTimeout(enhanceEvaluationsWorkflowSafe, 0);
  };
})();

(() => {
  const displayFixups = [
    [/ÃƒÂ©/g, "Ã©"],
    [/ÃƒÂ¨/g, "Ã¨"],
    [/ÃƒÂª/g, "Ãª"],
    [/ÃƒÂ«/g, "Ã«"],
    [/Ãƒâ€°/g, "Ã‰"],
    [/Ãƒâ‚¬/g, "Ã€"],
    [/Ãƒ /g, "Ã "],
    [/ÃƒÂ¢/g, "Ã¢"],
    [/ÃƒÂ´/g, "Ã´"],
    [/ÃƒÂ»/g, "Ã»"],
    [/ÃƒÂ¹/g, "Ã¹"],
    [/ÃƒÂ§/g, "Ã§"],
    [/ÃƒÂ®/g, "Ã®"],
    [/ÃƒÂ¯/g, "Ã¯"],
    [/CompÃƒÂ©tence/g, "CompÃ©tence"],
    [/CompÃƒÂ©tences/g, "CompÃ©tences"],
    [/rÃƒÂ©seau/g, "rÃ©seau"],
    [/rÃƒÂ©seaux/g, "rÃ©seaux"],
    [/RÃƒÂ©alisation/g, "RÃ©alisation"],
    [/sÃƒÂ©ance/g, "sÃ©ance"],
    [/SÃƒÂ©ance/g, "SÃ©ance"],
    [/ClÃƒÂ´turer/g, "ClÃ´turer"],
    [/archivÃƒÂ©es/g, "archivÃ©es"],
    [/annÃƒÂ©e/g, "annÃ©e"],
    [/ÃƒÂ /g, "Ã "],
    [/Ãƒâ€°lÃƒÂ¨ve/g, "Ã‰lÃ¨ve"],
    [/ÃƒÂ©lÃƒÂ¨ve/g, "Ã©lÃ¨ve"],
    [/ÃƒÂ©lÃƒÂ¨ves/g, "Ã©lÃ¨ves"],
    [/Ãƒâ€°valuations/g, "Ã‰valuations"],
    [/rÃƒÂ©cap/g, "rÃ©cap"],
    [/TÃƒÂ©lÃƒÂ©charger/g, "TÃ©lÃ©charger"],
    [/modÃƒÂ¨le/g, "modÃ¨le"],
    [/complÃƒÂ©tÃƒÂ©e/g, "complÃ©tÃ©e"],
    [/PrÃƒÂ©remplir/g, "PrÃ©remplir"],
    [/NumÃƒÂ©ro/g, "NumÃ©ro"],
    [/AcadÃƒÂ©mie/g, "AcadÃ©mie"],
    [/Ãƒâ€°tablissement/g, "Ã‰tablissement"],
    [/TÃƒÂ©lÃƒÂ©phone/g, "TÃ©lÃ©phone"],
    [/rÃƒÂ©fÃƒÂ©rent/g, "rÃ©fÃ©rent"],
    [/ÃƒÂ©valuation/g, "Ã©valuation"],
    [/Ãƒâ€°valuer/g, "Ã‰valuer"],
    [/ÃƒÂ©valuations/g, "Ã©valuations"],
    [/prÃƒÂ©sence/g, "prÃ©sence"],
    [/Livret d'ÃƒÂ©valuation/g, "Livret d'Ã©valuation"],
    [/CohÃƒÂ©rence/g, "CohÃ©rence"],
    [/cohÃƒÂ©rence/g, "cohÃ©rence"],
    [/liÃƒÂ©e/g, "liÃ©e"],
    [/liÃƒÂ©es/g, "liÃ©es"],
    [/associÃƒÂ©s/g, "associÃ©s"],
    [/associÃƒÂ©es/g, "associÃ©es"],
    [/jamais travaillÃƒÂ©e/g, "jamais travaillÃ©e"],
    [/\?valuations/g, "Ã‰valuations"],
    [/\?tablissement/g, "Ã‰tablissement"],
    [/\?\?tablissement/g, "Ã‰tablissement"],
    [/Acad\?mie/g, "AcadÃ©mie"],
    [/Cl\?turer/g, "ClÃ´turer"],
    [/ann\?e/g, "annÃ©e"],
    [/Comp\?tence/g, "CompÃ©tence"],
    [/Comp\?tences/g, "CompÃ©tences"],
    [/comp\?tence/g, "compÃ©tence"],
    [/comp\?tences/g, "compÃ©tences"],
    [/\?l\?ve/g, "Ã‰lÃ¨ve"],
    [/\?l\?ves/g, "Ã‰lÃ¨ves"],
    [/l'\?l\?ve/g, "l'Ã©lÃ¨ve"],
    [/r\?seau/g, "rÃ©seau"],
    [/r\?seaux/g, "rÃ©seaux"],
    [/\?tude/g, "Ã‰tude"],
    [/s\?ance/g, "sÃ©ance"],
    [/S\?ance/g, "SÃ©ance"],
    [/r\?cap/g, "rÃ©cap"],
    [/mod\?le/g, "modÃ¨le"],
    [/compl\?t\?e/g, "complÃ©tÃ©e"],
    [/Acad\?mie/g, "AcadÃ©mie"],
    [/Pi\?ce/g, "PiÃ¨ce"],
    [/R\?alisation/g, "RÃ©alisation"],
    [/coh\?rence/g, "cohÃ©rence"]
  ];

  const plainFrenchFixups = [
    [/\bCreation\b/g, "Création"],
    [/\bcreation\b/g, "création"],
    [/\bEvaluation\b/g, "Évaluation"],
    [/\bevaluation\b/g, "évaluation"],
    [/\bEvaluations\b/g, "Évaluations"],
    [/\bevaluations\b/g, "évaluations"],
    [/\bCompetence\b/g, "Compétence"],
    [/\bCompetences\b/g, "Compétences"],
    [/\bcompetence\b/g, "compétence"],
    [/\bcompetences\b/g, "compétences"],
    [/\bEleve\b/g, "Élève"],
    [/\bEleves\b/g, "Élèves"],
    [/\beleve\b/g, "élève"],
    [/\beleves\b/g, "élèves"],
    [/\bSeance\b/g, "Séance"],
    [/\bSeances\b/g, "Séances"],
    [/\bseance\b/g, "séance"],
    [/\bseances\b/g, "séances"],
    [/\bAcademie\b/g, "Académie"],
    [/\bacademie\b/g, "académie"],
    [/\bEtablissement\b/g, "Établissement"],
    [/\betablissement\b/g, "établissement"],
    [/\bPremiere\b/g, "Première"],
    [/\bpremiere\b/g, "première"],
    [/\bBibliotheque\b/g, "Bibliothèque"],
    [/\bbibliotheque\b/g, "bibliothèque"],
    [/\bSynthese\b/g, "Synthèse"],
    [/\bsynthese\b/g, "synthèse"],
    [/\bRemediation\b/g, "Remédiation"],
    [/\bRemediations\b/g, "Remédiations"],
    [/\bremediation\b/g, "remédiation"],
    [/\bremediations\b/g, "remédiations"],
    [/\bPeriode\b/g, "Période"],
    [/\bPeriodes\b/g, "Périodes"],
    [/\bperiode\b/g, "période"],
    [/\bperiodes\b/g, "périodes"],
    [/\bActivite\b/g, "Activité"],
    [/\bActivites\b/g, "Activités"],
    [/\bactivite\b/g, "activité"],
    [/\bactivites\b/g, "activités"],
    [/\bannulee\b/g, "annulée"],
    [/\bAnnulee\b/g, "Annulée"],
    [/\bcree\b/g, "créé"],
    [/\bCree\b/g, "Créé"],
    [/\bcreee\b/g, "créée"],
    [/\bCreee\b/g, "Créée"],
    [/\bmodifiee\b/g, "modifiée"],
    [/\bModifiee\b/g, "Modifiée"],
    [/\bsupprimee\b/g, "supprimée"],
    [/\bSupprimee\b/g, "Supprimée"],
    [/\bliee\b/g, "liée"],
    [/\bliees\b/g, "liées"],
    [/\bLies\b/g, "Liés"],
    [/\blies\b/g, "liés"],
    [/\bselectionnee\b/g, "sélectionnée"],
    [/\bSelectionnee\b/g, "Sélectionnée"],
    [/\bselectionnees\b/g, "sélectionnées"],
    [/\brenseignee\b/g, "renseignée"],
    [/\brenseignees\b/g, "renseignées"],
    [/\bTelephone\b/g, "Téléphone"],
    [/\btelephone\b/g, "téléphone"],
    [/\breferent\b/g, "référent"],
    [/\bReferent\b/g, "Référent"],
    [/\bmodele\b/g, "modèle"],
    [/\bModele\b/g, "Modèle"],
    [/\bpreparation\b/g, "préparation"],
    [/\bPreparation\b/g, "Préparation"],
    [/\bselection\b/g, "sélection"],
    [/\bSelection\b/g, "Sélection"],
    [/\bcentree\b/g, "centrée"],
    [/\bCentree\b/g, "Centrée"],
    [/\ba suivre\b/g, "à suivre"],
    [/\bA suivre\b/g, "À suivre"],
    [/\bdonnee\b/g, "donnée"],
    [/\bdonnees\b/g, "données"],
    [/\bDonnee\b/g, "Donnée"],
    [/\bDonnees\b/g, "Données"],
    [/\breelle\b/g, "réelle"],
    [/\breelles\b/g, "réelles"],
    [/\bpedagogique\b/g, "pédagogique"],
    [/\bpedagogiques\b/g, "pédagogiques"],
    [/\bPedagogique\b/g, "Pédagogique"],
    [/\breliee\b/g, "reliée"],
    [/\breliees\b/g, "reliées"],
    [/\brelies\b/g, "reliés"]
  ];

  function normalizeDisplayText(value) {
    if (!value) return value;
    let next = value;
    displayFixups.forEach(([pattern, replacement]) => {
      next = next.replace(pattern, replacement);
    });
    plainFrenchFixups.forEach(([pattern, replacement]) => {
      next = next.replace(pattern, replacement);
    });
    next = next.replace(/Session Ã  clÃ´turer/g, "Session à clôturer");
    next = next.replace(/Nouvelle annÃ©e scolaire/g, "Nouvelle année scolaire");
    return next;
  }

  window.__normalizeDisplayTextSafe = normalizeDisplayText;

  function normalizeElementText(root = document.documentElement) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      const fixed = normalizeDisplayText(node.nodeValue);
      if (fixed !== node.nodeValue) {
        node.nodeValue = fixed;
      }
      node = walker.nextNode();
    }
    root.querySelectorAll("input[placeholder], textarea[placeholder], [title], [aria-label], img[alt], option, button, h1, h2, h3, h4, p, small, span, a, label, strong, th, td, legend, summary").forEach((element) => {
      if (element.hasAttribute("placeholder")) {
        const fixed = normalizeDisplayText(element.getAttribute("placeholder"));
        if (fixed !== element.getAttribute("placeholder")) element.setAttribute("placeholder", fixed);
      }
      if (element.hasAttribute("title")) {
        const fixed = normalizeDisplayText(element.getAttribute("title"));
        if (fixed !== element.getAttribute("title")) element.setAttribute("title", fixed);
      }
      if (element.hasAttribute("aria-label")) {
        const fixed = normalizeDisplayText(element.getAttribute("aria-label"));
        if (fixed !== element.getAttribute("aria-label")) element.setAttribute("aria-label", fixed);
      }
      if (element.hasAttribute("alt")) {
        const fixed = normalizeDisplayText(element.getAttribute("alt"));
        if (fixed !== element.getAttribute("alt")) element.setAttribute("alt", fixed);
      }
      if (element.tagName === "OPTION" || element.tagName === "BUTTON") {
        const fixed = normalizeDisplayText(element.textContent);
        if (fixed !== element.textContent) element.textContent = fixed;
      }
      if (element instanceof HTMLInputElement && /^(button|submit|reset)$/i.test(element.type)) {
        const fixed = normalizeDisplayText(element.value);
        if (fixed !== element.value) element.value = fixed;
      }
    });
    document.title = normalizeDisplayText(document.title);
  }

  let normalizeQueued = false;
  function scheduleDisplayNormalization() {
    if (normalizeQueued) return;
    normalizeQueued = true;
    window.requestAnimationFrame(() => {
      normalizeQueued = false;
      normalizeElementText();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleDisplayNormalization, { once: true });
  } else {
    scheduleDisplayNormalization();
  }

  const observer = new MutationObserver(() => scheduleDisplayNormalization());
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    }, { once: true });
  }
})();

(() => {
  function rebuildActivityIndicatorSkillPickerUltraSafe() {
    if (document.body?.dataset?.page !== "evaluations") return;
    const skillSelect = document.querySelector("#activity-skill");
    const indicatorSkillSelect = document.querySelector("#activity-indicator-skill");
    const form = document.querySelector("#activity-form");
    if (!skillSelect || !indicatorSkillSelect || !form) return;

    const editingId = form.dataset?.editingId;
    const editingActivity = editingId ? getActivityById(editingId) : null;
    const activitySkillIds = getActivitySkillIdsForIndicatorPickerSafe(skillSelect, form, editingActivity ? getActivitySkillIds(editingActivity) : []);
    renderActivityIndicatorSkillSelectSafe(indicatorSkillSelect, activitySkillIds);
  }

  function scheduleActivityIndicatorSkillPickerUltraSafe() {
    window.setTimeout(rebuildActivityIndicatorSkillPickerUltraSafe, 0);
  }

  function bindActivityIndicatorSkillPickerUltraSafe() {
    if (document.body?.dataset?.page !== "evaluations") return;
    if (document.body.dataset.activityIndicatorPickerBound === "true") return;
    document.body.dataset.activityIndicatorPickerBound = "true";

    document.addEventListener("change", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.id === "activity-skill" || target.id === "activity-class" || target.id === "activity-select") {
        scheduleActivityIndicatorSkillPickerUltraSafe();
      }
    });

    document.addEventListener("keyup", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.id === "activity-skill") {
        scheduleActivityIndicatorSkillPickerUltraSafe();
      }
    });

    document.addEventListener("mouseup", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.id === "activity-skill" || target.closest?.("#activity-skill")) {
        scheduleActivityIndicatorSkillPickerUltraSafe();
      }
    });

    document.addEventListener("focusin", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.id === "activity-indicator-skill") {
        rebuildActivityIndicatorSkillPickerUltraSafe();
      }
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (
        target.id === "activity-cancel-edit"
        || target.id === "activity-duplicate-button"
        || target.id === "activity-edit-button"
        || target.id === "indicator-bank-load"
      ) {
        scheduleActivityIndicatorSkillPickerUltraSafe();
      }
    });

    rebuildActivityIndicatorSkillPickerUltraSafe();
  }

  const originalInitEvaluationsPageFinalIndicatorPickerSafe = initEvaluationsPageFinal;
  initEvaluationsPageFinal = function () {
    originalInitEvaluationsPageFinalIndicatorPickerSafe();
    window.setTimeout(bindActivityIndicatorSkillPickerUltraSafe, 0);
    window.setTimeout(rebuildActivityIndicatorSkillPickerUltraSafe, 40);
    window.setTimeout(rebuildActivityIndicatorSkillPickerUltraSafe, 140);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      if (document.body?.dataset?.page === "evaluations") {
        bindActivityIndicatorSkillPickerUltraSafe();
        rebuildActivityIndicatorSkillPickerUltraSafe();
      }
    }, { once: true });
  } else if (document.body?.dataset?.page === "evaluations") {
    bindActivityIndicatorSkillPickerUltraSafe();
    rebuildActivityIndicatorSkillPickerUltraSafe();
  }
})();

(() => {
  function getActivitySkillSelectionUltraSafe() {
    const skillSelect = document.querySelector("#activity-skill");
    if (!skillSelect) return [];
    return [...skillSelect.options].filter((option) => option.selected).map((option) => option.value).filter(Boolean);
  }

  function setAppliedActivitySkillIdsUltraSafe(skillIds) {
    const form = document.querySelector("#activity-form");
    if (!form) return [];
    const normalized = [...new Set((skillIds || []).filter(Boolean))];
    form.dataset.appliedSkillIds = JSON.stringify(normalized);
    return normalized;
  }

  function getAppliedActivitySkillIdsUltraSafe() {
    const form = document.querySelector("#activity-form");
    if (!form?.dataset?.appliedSkillIds) return [];
    try {
      const parsed = JSON.parse(form.dataset.appliedSkillIds);
      return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
    } catch {
      return [];
    }
  }

  function renderAppliedActivitySkillOptionsUltraSafe(skillIds) {
    const indicatorSkillSelect = document.querySelector("#activity-indicator-skill");
    if (!indicatorSkillSelect) return;
    const selectedSkills = (skillIds || []).map((skillId) => getSkillById(skillId)).filter(Boolean);
    const previousValue = indicatorSkillSelect.value || "";
    const placeholder = selectedSkills.length
      ? "Toutes les compétences sélectionnées"
      : "Choisis d'abord les compétences";

    indicatorSkillSelect.innerHTML = [
      `<option value="">${escapeHtml(placeholder)}</option>`,
      ...selectedSkills.map((skill) => `<option value="${skill.id}">${escapeHtml(`${skill.code} - ${skill.title}`)}</option>`)
    ].join("");
    indicatorSkillSelect.disabled = selectedSkills.length === 0;

    if (previousValue && selectedSkills.some((skill) => skill.id === previousValue)) {
      indicatorSkillSelect.value = previousValue;
    } else if (selectedSkills.length === 1) {
      indicatorSkillSelect.value = selectedSkills[0].id;
    } else {
      indicatorSkillSelect.value = "";
    }
  }

  function updateActivitySkillApplyFeedbackUltraSafe(message, isError = false) {
    const feedback = document.querySelector("#activity-skill-apply-feedback");
    if (!feedback) return;
    feedback.textContent = message;
    feedback.style.color = isError ? "#ff9a9a" : "";
  }

  function applyActivitySkillsToSessionUltraSafe(showFeedback = true) {
    if (document.body?.dataset?.page !== "evaluations") return false;
    const form = document.querySelector("#activity-form");
    const selectedSkillIds = getActivitySkillSelectionUltraSafe();
    const indicatorBankDomain = document.querySelector("#indicator-bank-domain");
    const indicatorBankSelect = document.querySelector("#indicator-bank-select");
    const effectiveSkillIds = selectedSkillIds.length
      ? selectedSkillIds
      : getActivitySkillIdsForIndicatorPickerSafe(document.querySelector("#activity-skill"), form);

    if (!effectiveSkillIds.length) {
      setAppliedActivitySkillIdsUltraSafe([]);
      renderAppliedActivitySkillOptionsUltraSafe([]);
      if (typeof populateIndicatorBankSelect === "function") {
        populateIndicatorBankSelect(indicatorBankSelect, [], indicatorBankDomain?.value || "all");
      }
      if (showFeedback) {
        updateActivitySkillApplyFeedbackUltraSafe("Choisis au moins une compétence puis clique sur « Appliquer les compétences ».", true);
      }
      return false;
    }

    setPendingActivitySkillIdsForIndicatorPickerSafe(form, effectiveSkillIds);
    const appliedSkillIds = setAppliedActivitySkillIdsUltraSafe(effectiveSkillIds);
    renderAppliedActivitySkillOptionsUltraSafe(appliedSkillIds);
    if (typeof populateIndicatorBankSelect === "function") {
      populateIndicatorBankSelect(indicatorBankSelect, appliedSkillIds, indicatorBankDomain?.value || "all");
    }
    if (showFeedback) {
      updateActivitySkillApplyFeedbackUltraSafe(`${appliedSkillIds.length} compétence(s) appliquée(s) à la séance.`);
    }
    return true;
  }

  function bindActivitySkillsApplyButtonUltraSafe() {
    if (document.body?.dataset?.page !== "evaluations") return;
    if (document.body.dataset.activitySkillsApplyUltraSafeBound === "true") return;
    document.body.dataset.activitySkillsApplyUltraSafeBound = "true";

    const applyButton = document.querySelector("#activity-apply-skills");
    const skillSelect = document.querySelector("#activity-skill");
    const form = document.querySelector("#activity-form");
    const cancelEditButton = document.querySelector("#activity-cancel-edit");

    const syncPendingSelection = () => {
      setPendingActivitySkillIdsForIndicatorPickerSafe(form, getActivitySkillSelectionUltraSafe());
    };

    applyButton?.addEventListener("click", () => {
      applyActivitySkillsToSessionUltraSafe(true);
    });

    skillSelect?.addEventListener("change", () => {
      syncPendingSelection();
      updateActivitySkillApplyFeedbackUltraSafe("Sélection modifiée. Clique sur « Appliquer les compétences » pour mettre à jour les indicateurs.");
    });

    skillSelect?.addEventListener("mouseup", () => {
      window.setTimeout(() => {
        syncPendingSelection();
        updateActivitySkillApplyFeedbackUltraSafe("Sélection modifiée. Clique sur « Appliquer les compétences » pour mettre à jour les indicateurs.");
      }, 0);
    });

    skillSelect?.addEventListener("keyup", () => {
      syncPendingSelection();
      updateActivitySkillApplyFeedbackUltraSafe("Sélection modifiée. Clique sur « Appliquer les compétences » pour mettre à jour les indicateurs.");
    });

    cancelEditButton?.addEventListener("click", () => {
      window.setTimeout(() => {
        setAppliedActivitySkillIdsUltraSafe([]);
        renderAppliedActivitySkillOptionsUltraSafe([]);
        updateActivitySkillApplyFeedbackUltraSafe("Sélectionne les compétences du TP / TD puis clique sur le bouton pour les appliquer aux indicateurs.");
      }, 0);
    });

    form?.addEventListener("reset", () => {
      window.setTimeout(() => {
        setAppliedActivitySkillIdsUltraSafe([]);
        renderAppliedActivitySkillOptionsUltraSafe([]);
        updateActivitySkillApplyFeedbackUltraSafe("Sélectionne les compétences du TP / TD puis clique sur le bouton pour les appliquer aux indicateurs.");
      }, 0);
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.id === "activity-edit-button" || target.id === "activity-duplicate-button") {
        window.setTimeout(() => {
          const selectedSkillIds = getActivitySkillSelectionUltraSafe();
          setAppliedActivitySkillIdsUltraSafe(selectedSkillIds);
          renderAppliedActivitySkillOptionsUltraSafe(selectedSkillIds);
          if (selectedSkillIds.length) {
            updateActivitySkillApplyFeedbackUltraSafe(`${selectedSkillIds.length} compétence(s) appliquée(s) à la séance.`);
          }
        }, 80);
      }
    });

    const initialSkillIds = getActivitySkillSelectionUltraSafe();
    setPendingActivitySkillIdsForIndicatorPickerSafe(form, initialSkillIds);
    setAppliedActivitySkillIdsUltraSafe(initialSkillIds);
    renderAppliedActivitySkillOptionsUltraSafe(initialSkillIds);
  }

  const originalInitEvaluationsPageFinalApplySkillsSafe = initEvaluationsPageFinal;
  initEvaluationsPageFinal = function () {
    originalInitEvaluationsPageFinalApplySkillsSafe();
    window.setTimeout(bindActivitySkillsApplyButtonUltraSafe, 0);
    window.setTimeout(() => applyActivitySkillsToSessionUltraSafe(false), 80);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      if (document.body?.dataset?.page === "evaluations") {
        bindActivitySkillsApplyButtonUltraSafe();
        applyActivitySkillsToSessionUltraSafe(false);
      }
    }, { once: true });
  } else if (document.body?.dataset?.page === "evaluations") {
    bindActivitySkillsApplyButtonUltraSafe();
    applyActivitySkillsToSessionUltraSafe(false);
  }
})();

(() => {
  const suspiciousPattern = /[ÃÂâ€]/;

  function repairMojibakeSafe(value) {
    if (typeof value !== "string" || !value || !suspiciousPattern.test(value)) return value;
    let next = value;
    for (let index = 0; index < 3; index += 1) {
      try {
        const repaired = decodeURIComponent(escape(next));
        if (!repaired || repaired === next) break;
        next = repaired;
      } catch {
        break;
      }
    }

    next = next
      .replace(/â€“/g, "–")
      .replace(/â€”/g, "—")
      .replace(/â€¦/g, "…")
      .replace(/â€¢/g, "•")
      .replace(/â€˜/g, "‘")
      .replace(/â€™/g, "’")
      .replace(/â€œ/g, "“")
      .replace(/â€\x9D/g, "”")
      .replace(/â„¢/g, "™");

    if (typeof window.__normalizeDisplayTextSafe === "function") {
      next = window.__normalizeDisplayTextSafe(next);
    }

    return next;
  }

  function repairNodeTextSafe(root = document.documentElement) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      const fixed = repairMojibakeSafe(node.nodeValue);
      if (fixed !== node.nodeValue) node.nodeValue = fixed;
      node = walker.nextNode();
    }

    root.querySelectorAll("input[placeholder], textarea[placeholder], [title], [aria-label], img[alt], option, button, h1, h2, h3, h4, p, small, span, a, label, strong, th, td, legend, summary").forEach((element) => {
      if (element.hasAttribute("placeholder")) {
        const placeholder = element.getAttribute("placeholder");
        const fixed = repairMojibakeSafe(placeholder);
        if (fixed !== placeholder) element.setAttribute("placeholder", fixed);
      }
      if (element.hasAttribute("title")) {
        const title = element.getAttribute("title");
        const fixed = repairMojibakeSafe(title);
        if (fixed !== title) element.setAttribute("title", fixed);
      }
      if (element.hasAttribute("aria-label")) {
        const label = element.getAttribute("aria-label");
        const fixed = repairMojibakeSafe(label);
        if (fixed !== label) element.setAttribute("aria-label", fixed);
      }
      if (element.hasAttribute("alt")) {
        const alt = element.getAttribute("alt");
        const fixed = repairMojibakeSafe(alt);
        if (fixed !== alt) element.setAttribute("alt", fixed);
      }
      const fixedText = repairMojibakeSafe(element.textContent);
      if (fixedText !== element.textContent) element.textContent = fixedText;
      if (element instanceof HTMLInputElement && /^(button|submit|reset)$/i.test(element.type)) {
        const fixed = repairMojibakeSafe(element.value);
        if (fixed !== element.value) element.value = fixed;
      }
    });

    document.title = repairMojibakeSafe(document.title);
  }

  let repairQueued = false;
  function scheduleMojibakeRepairSafe() {
    if (repairQueued) return;
    repairQueued = true;
    window.requestAnimationFrame(() => {
      repairQueued = false;
      repairNodeTextSafe();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleMojibakeRepairSafe, { once: true });
  } else {
    scheduleMojibakeRepairSafe();
  }

  const observer = new MutationObserver(() => scheduleMojibakeRepairSafe());
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    }, { once: true });
  }
})();

(() => {
  function getIndicatorEditorElementsUltraSafe() {
    if (document.body?.dataset?.page !== "evaluations") return null;
    const form = document.querySelector("#activity-form");
    const skillSelect = document.querySelector("#activity-skill");
    const indicatorSkillSelect = document.querySelector("#activity-indicator-skill");
    const indicatorLabelInput = document.querySelector("#activity-indicator-label");
    const indicatorList = document.querySelector("#activity-indicator-authoritative-list") || document.querySelector("#activity-indicator-list");
    const indicatorTextarea = document.querySelector("#activity-indicators");
    const feedback = document.querySelector("#activity-feedback");
    if (!form || !skillSelect || !indicatorSkillSelect || !indicatorLabelInput || !indicatorList || !indicatorTextarea || !feedback) {
      return null;
    }
    return { form, skillSelect, indicatorSkillSelect, indicatorLabelInput, indicatorList, indicatorTextarea, feedback };
  }

  function syncIndicatorTextareaUltraSafe(textarea, draft) {
    textarea.value = draft.map((indicator) => indicator.label).join("\n");
  }

  function renderIndicatorDraftListUltraSafe(indicatorList, draft) {
    if (!draft.length) {
      indicatorList.innerHTML = `<article class="directory-row"><div><strong>Aucun indicateur structuré</strong><p>Ajoute un indicateur lié à une compétence ou utilise la saisie rapide.</p></div></article>`;
      return;
    }
    indicatorList.innerHTML = draft.map((indicator) => `
      <article class="directory-row compact">
        <div>
          <strong>${escapeHtml(indicator.label)}</strong>
          <p>${escapeHtml(indicator.skillId ? getActivitySkillLabel({ skillIds: [indicator.skillId], skillId: indicator.skillId }) : "Toutes les compétences de la séance")}</p>
        </div>
        <div class="student-badges">
          <button class="ghost-button activity-indicator-remove-final" type="button" data-id="${indicator.id}">Retirer</button>
        </div>
      </article>
    `).join("");
  }

  function refreshIndicatorDraftUiUltraSafe() {
    const refs = getIndicatorEditorElementsUltraSafe();
    if (!refs) return;
    const draft = getAuthoritativeActivityIndicatorDraftSafe(refs.form);
    syncIndicatorTextareaUltraSafe(refs.indicatorTextarea, draft);
    renderIndicatorDraftListUltraSafe(refs.indicatorList, draft);
  }

  function addIndicatorUltraSafe() {
    const refs = getIndicatorEditorElementsUltraSafe();
    if (!refs) return;
    const label = refs.indicatorLabelInput.value.trim();
    if (!label) {
      refs.feedback.textContent = "Saisis un indicateur avant de l'ajouter.";
      return;
    }
    const availableSkillIds = getActivitySkillIdsForIndicatorPickerSafe(refs.skillSelect, refs.form);
    const selectedSkillId = refs.indicatorSkillSelect.value || (availableSkillIds.length === 1 ? availableSkillIds[0] : "");
    const draft = getAuthoritativeActivityIndicatorDraftSafe(refs.form);
    draft.push({
      id: slugify(`indicator-${label}-${Date.now()}`),
      label,
      skillId: selectedSkillId
    });
    setAuthoritativeActivityIndicatorDraftSafe(refs.form, draft);
    setStoredActivityIndicatorDraftSafe(refs.form, draft);
    refs.indicatorLabelInput.value = "";
    refreshIndicatorDraftUiUltraSafe();
    refs.feedback.textContent = "Indicateur ajouté.";
  }

  function clearIndicatorDraftUltraSafe() {
    const refs = getIndicatorEditorElementsUltraSafe();
    if (!refs) return;
    setAuthoritativeActivityIndicatorDraftSafe(refs.form, []);
    setStoredActivityIndicatorDraftSafe(refs.form, []);
    refreshIndicatorDraftUiUltraSafe();
    refs.feedback.textContent = "Liste des indicateurs vidée.";
  }

  function removeIndicatorUltraSafe(indicatorId) {
    const refs = getIndicatorEditorElementsUltraSafe();
    if (!refs) return;
    const draft = getAuthoritativeActivityIndicatorDraftSafe(refs.form).filter((indicator) => indicator.id !== indicatorId);
    setAuthoritativeActivityIndicatorDraftSafe(refs.form, draft);
    setStoredActivityIndicatorDraftSafe(refs.form, draft);
    refreshIndicatorDraftUiUltraSafe();
    refs.feedback.textContent = "Indicateur retiré.";
  }

  function bindAuthoritativeIndicatorEditorUltraSafe() {
    if (document.body?.dataset?.page !== "evaluations") return;
    if (document.body.dataset.authoritativeIndicatorEditorBound === "true") return;
    document.body.dataset.authoritativeIndicatorEditorBound = "true";

    window.__cielAddIndicatorDirectSafe = addIndicatorUltraSafe;
    window.__cielClearIndicatorDirectSafe = clearIndicatorDraftUltraSafe;
    window.__cielRefreshIndicatorDraftUiSafe = refreshIndicatorDraftUiUltraSafe;

    const legacyList = document.querySelector("#activity-indicator-list");
    if (legacyList) {
      legacyList.hidden = true;
    }

    const handleIndicatorAction = (event) => {
      const target = event.target;
      const element = target instanceof Element ? target : target?.parentElement;
      if (!element) return;
      const addButton = element.closest("#activity-indicator-add");
      if (addButton) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        addIndicatorUltraSafe();
        return;
      }
      const clearButton = element.closest("#activity-indicator-clear");
      if (clearButton) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        clearIndicatorDraftUltraSafe();
        return;
      }
      const removeButton = element.closest(".activity-indicator-remove-final, .indicator-draft-delete, .activity-indicator-remove");
      if (removeButton?.dataset?.id) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        removeIndicatorUltraSafe(removeButton.dataset.id);
      }
    };

    document.addEventListener("pointerdown", handleIndicatorAction, true);
    document.addEventListener("mousedown", handleIndicatorAction, true);
    document.addEventListener("click", handleIndicatorAction, true);

    document.addEventListener("keydown", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.id === "activity-indicator-label" && event.key === "Enter") {
        event.preventDefault();
        addIndicatorUltraSafe();
      }
    }, true);

    window.setTimeout(refreshIndicatorDraftUiUltraSafe, 0);
    window.setTimeout(refreshIndicatorDraftUiUltraSafe, 120);
  }

  const originalInitEvaluationsPageFinalIndicatorAuthoritativeSafe = initEvaluationsPageFinal;
  initEvaluationsPageFinal = function () {
    originalInitEvaluationsPageFinalIndicatorAuthoritativeSafe();
    window.setTimeout(bindAuthoritativeIndicatorEditorUltraSafe, 0);
    window.setTimeout(refreshIndicatorDraftUiUltraSafe, 100);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      bindAuthoritativeIndicatorEditorUltraSafe();
      refreshIndicatorDraftUiUltraSafe();
    }, { once: true });
  } else {
    bindAuthoritativeIndicatorEditorUltraSafe();
    refreshIndicatorDraftUiUltraSafe();
  }
})();

;(function () {
  const EXAM_CENTER_SETTINGS_KEY = "ciel-exam-center-settings";
  const EXAM_GRID_STORAGE_KEY = "ciel-exam-grid-settings";

  function getExamCenterDefaultsSafe() {
    try {
      const raw = localStorage.getItem(EXAM_CENTER_SETTINGS_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return {
        academy: parsed.academy || "Creteil",
        school: parsed.school || "Lycee",
        date: new Date().toISOString().slice(0, 10)
      };
    } catch {
      return {
        academy: "Creteil",
        school: "Lycee",
        date: new Date().toISOString().slice(0, 10)
      };
    }
  }

  function saveExamCenterDefaultsSafe(settings) {
    localStorage.setItem(EXAM_CENTER_SETTINGS_KEY, JSON.stringify({
      academy: settings.academy || "",
      school: settings.school || ""
    }));
  }

  function mergeExamGridStoredSettings(patch) {
    let current = {};
    try {
      current = JSON.parse(localStorage.getItem(EXAM_GRID_STORAGE_KEY) || "{}");
    } catch {}
    localStorage.setItem(EXAM_GRID_STORAGE_KEY, JSON.stringify({ ...getExamCenterDefaultsSafe(), ...current, ...patch }));
  }

  function getExamSkillPreviewSafe(student) {
    return [
      { exam: "E2", skillIds: ["c3", "c7", "c11"] },
      { exam: "E31", skillIds: ["c6", "c9", "c10"] },
      { exam: "E32", skillIds: ["c1", "c4", "c8"] }
    ].map((item) => {
      const lines = item.skillIds.map((skillId) => {
        const skill = getSkillById(skillId);
        const status = student?.skills?.[skillId] || "non_evalue";
        return {
          code: skill?.code || skillId.toUpperCase(),
          title: skill?.title || skillId,
          status,
          label: levelLabels[status] || status
        };
      });
      const validated = lines.filter((line) => ["partiellement_acquis", "acquis"].includes(line.status)).length;
      const score = lines.reduce((sum, line) => sum + (levelScores[line.status] || 0), 0) / (lines.length || 1);
      const average = Math.round(score * 100);
      const note = Math.round(score * 20 * 10) / 10;
      const hasIncomplete = lines.some((line) => ["absent", "non_evalue", "non_acquis"].includes(line.status));
      const ready = lines.every((line) => ["partiellement_acquis", "acquis"].includes(line.status));
      const status = ready ? "Pret" : (hasIncomplete ? "Incomplet" : "A verifier");
      return { exam: item.exam, lines, validated, average, note, status };
    });
  }

  function renderExamPreviewSafe(target, student) {
    if (!target) return;
    if (!student) {
      target.innerHTML = "";
      return;
    }
    const preview = getExamSkillPreviewSafe(student);
    target.innerHTML = preview.map((item) => `
      <article class="summary-card">
        <h3>${item.exam}</h3>
        <p class="muted-copy">${item.validated}/${item.lines.length} competence(s) consolidee(s)</p>
        <div class="pfmp-kpis">
          <span class="badge">${item.average}%</span>
          <span class="badge">${item.note.toFixed(1)}/20</span>
          <span class="badge">${item.status}</span>
        </div>
        <div class="directory-row compact">
          <div>${item.lines.map((line) => `<p><strong>${line.code}</strong> ${line.title} // ${line.label}</p>`).join("")}</div>
        </div>
      </article>
    `).join("");
  }

  function buildExamRecapHtmlSafe(student, settings) {
    const classItem = getClassById(student.classId);
    const parts = String(student?.name || "").trim().split(/\s+/).filter(Boolean);
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ") || student.name || "";
    const preview = getExamSkillPreviewSafe(student);
    return buildPrintShell(
      `Recapitulatif examen - ${student.name}`,
      `${classItem?.name || ""} // ${settings.academy || ""} // ${settings.school || ""}`,
      `
        <div class="card">
          <p><strong>Nom :</strong> ${escapeHtml(lastName)}</p>
          <p><strong>Prenom :</strong> ${escapeHtml(firstName)}</p>
          <p><strong>Numero candidat :</strong> ${escapeHtml(settings.candidateNumber || "-")}</p>
          <p><strong>Date :</strong> ${escapeHtml(settings.date || "-")}</p>
        </div>
        <table>
          <thead><tr><th>Epreuve</th><th>Competence</th><th>Intitule</th><th>Niveau</th><th>Etat</th><th>Note estimative</th></tr></thead>
          <tbody>
            ${preview.flatMap((item) => item.lines.map((line) => `
              <tr>
                <td>${item.exam}</td>
                <td>${line.code}</td>
                <td>${escapeHtml(line.title)}</td>
                <td>${escapeHtml(line.label)}</td>
                <td>${escapeHtml(item.status)}</td>
                <td>${item.note.toFixed(1)}/20</td>
              </tr>
            `)).join("")}
          </tbody>
        </table>
      `
    );
  }

  const originalInitAccountsPageFinalExamSafe = initAccountsPageFinal;
  initAccountsPageFinal = function() {
    originalInitAccountsPageFinalExamSafe();
    const form = document.querySelector("#exam-center-form");
    const academyInput = document.querySelector("#exam-center-academy");
    const schoolInput = document.querySelector("#exam-center-school");
    const feedback = document.querySelector("#exam-center-feedback");
    if (!form || !academyInput || !schoolInput) return;
    const defaults = getExamCenterDefaultsSafe();
    academyInput.value = defaults.academy || "";
    schoolInput.value = defaults.school || "";
    if (form.dataset.examCenterSafeBound) return;
    form.dataset.examCenterSafeBound = "true";
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      saveExamCenterDefaultsSafe({
        academy: academyInput.value.trim(),
        school: schoolInput.value.trim()
      });
      mergeExamGridStoredSettings({
        academy: academyInput.value.trim(),
        school: schoolInput.value.trim()
      });
      if (feedback) feedback.textContent = "Parametres d'examen enregistres.";
    });
  };

  const originalInitEvaluationsPageFinalExamSafe = initEvaluationsPageFinal;
  initEvaluationsPageFinal = function() {
    originalInitEvaluationsPageFinalExamSafe();
    window.setTimeout(() => {
      if (document.body?.dataset?.page !== "evaluations") return;
      const classSelect = document.querySelector("#eval-class-select");
      const studentSelect = document.querySelector("#eval-student-select");
      const academyInput = document.querySelector("#exam-grid-academy");
      const schoolInput = document.querySelector("#exam-grid-school");
      const candidateNumberInput = document.querySelector("#exam-grid-candidate-number");
      const dateInput = document.querySelector("#exam-grid-date");
      const preview = document.querySelector("#exam-grid-preview");
      const pdfButton = document.querySelector("#exam-grid-pdf");
      const feedback = document.querySelector("#exam-grid-feedback");
      if (!classSelect || !studentSelect || !academyInput || !schoolInput || !candidateNumberInput || !dateInput) return;

      const defaults = getExamCenterDefaultsSafe();
      if (!academyInput.value.trim()) academyInput.value = defaults.academy || "";
      if (!schoolInput.value.trim()) schoolInput.value = defaults.school || "";
      if (!dateInput.value) dateInput.value = defaults.date || "";
      mergeExamGridStoredSettings({
        academy: academyInput.value.trim(),
        school: schoolInput.value.trim(),
        candidateNumber: candidateNumberInput.value.trim(),
        date: dateInput.value
      });

      const renderCurrentPreview = () => {
        const classId = classSelect.value || app.classes[0]?.id || "";
        const student = getStudentById(studentSelect.value) || getStudentsByClass(classId)[0];
        renderExamPreviewSafe(preview, student);
      };

      renderCurrentPreview();

      if (!classSelect.dataset.examPreviewSafeBound) {
        classSelect.dataset.examPreviewSafeBound = "true";
        classSelect.addEventListener("change", renderCurrentPreview);
      }
      if (!studentSelect.dataset.examPreviewSafeBound) {
        studentSelect.dataset.examPreviewSafeBound = "true";
        studentSelect.addEventListener("change", renderCurrentPreview);
      }
      [academyInput, schoolInput, candidateNumberInput, dateInput].forEach((input) => {
        if (input.dataset.examPreviewSafeBound) return;
        input.dataset.examPreviewSafeBound = "true";
        input.addEventListener("change", () => {
          mergeExamGridStoredSettings({
            academy: academyInput.value.trim(),
            school: schoolInput.value.trim(),
            candidateNumber: candidateNumberInput.value.trim(),
            date: dateInput.value
          });
        });
      });

      if (pdfButton && !pdfButton.dataset.examPreviewSafeBound) {
        pdfButton.dataset.examPreviewSafeBound = "true";
        pdfButton.addEventListener("click", () => {
          const classId = classSelect.value || app.classes[0]?.id || "";
          const student = getStudentById(studentSelect.value) || getStudentsByClass(classId)[0];
          if (!student) {
            if (feedback) feedback.textContent = "Aucun eleve selectionne.";
            return;
          }
          printHtmlDocument(`Recap examen ${student.name}`, buildExamRecapHtmlSafe(student, {
            academy: academyInput.value.trim(),
            school: schoolInput.value.trim(),
            candidateNumber: candidateNumberInput.value.trim(),
            date: dateInput.value
          }));
        });
      }
    }, 0);
  };
})();

;(function () {
  function getEvidenceEntriesForStudent(studentId) {
    return (app.evidencePortfolio || [])
      .filter((entry) => entry.studentId === studentId)
      .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  }

  function renderEvidenceList(target, student) {
    if (!target) return;
    if (!student) {
      target.innerHTML = "";
      return;
    }
    const entries = getEvidenceEntriesForStudent(student.id);
    if (!entries.length) {
      target.innerHTML = `<article class="directory-row"><div><strong>Aucune preuve enregistrÃ©e</strong><p>Ajoute une premiÃ¨re preuve pour alimenter le portefeuille de compÃ©tences de cet Ã©lÃ¨ve.</p></div></article>`;
      return;
    }
    target.innerHTML = entries.map((entry) => {
      const skill = getSkillById(entry.skillId);
      return `
        <article class="directory-row">
          <div>
            <strong>${escapeHtml(entry.title)}</strong>
            <p>${escapeHtml(skill?.code || entry.skillId || "-")} // ${escapeHtml(skill?.title || "CompÃ©tence")} // ${escapeHtml(entry.type)}</p>
            <p>${escapeHtml(entry.date || "-")} // ${escapeHtml(entry.note || "Sans commentaire")}</p>
            ${entry.url ? `<p><a href="${escapeHtml(entry.url)}" target="_blank" rel="noreferrer">Ouvrir la preuve</a></p>` : ""}
          </div>
          <div class="student-badges">
            <button class="ghost-button evidence-delete-button" type="button" data-id="${entry.id}">Supprimer</button>
          </div>
        </article>
      `;
    }).join("");
    target.querySelectorAll(".evidence-delete-button").forEach((button) => {
      button.addEventListener("click", () => {
        app.evidencePortfolio = (app.evidencePortfolio || []).filter((entry) => entry.id !== button.dataset.id);
        persistAppData();
        renderEvidenceList(target, student);
      });
    });
  }

  const originalInitEvaluationsPageFinalEvidence = initEvaluationsPageFinal;
  initEvaluationsPageFinal = function () {
    originalInitEvaluationsPageFinalEvidence();
    window.setTimeout(() => {
      if (document.body?.dataset?.page !== "evaluations") return;
      const classSelect = document.querySelector("#eval-class-select");
      const studentSelect = document.querySelector("#eval-student-select");
      const skillSelect = document.querySelector("#evidence-skill-select");
      const typeSelect = document.querySelector("#evidence-type-select");
      const titleInput = document.querySelector("#evidence-title-input");
      const urlInput = document.querySelector("#evidence-url-input");
      const dateInput = document.querySelector("#evidence-date-input");
      const noteInput = document.querySelector("#evidence-note-input");
      const addButton = document.querySelector("#evidence-add-button");
      const feedback = document.querySelector("#evidence-feedback");
      const list = document.querySelector("#evidence-list");
      if (!classSelect || !studentSelect || !skillSelect || !typeSelect || !titleInput || !urlInput || !dateInput || !noteInput || !addButton || !list) return;

      skillSelect.innerHTML = skillCatalog.map((skill) => `<option value="${skill.id}">${skill.code} // ${skill.title}</option>`).join("");
      if (!dateInput.value) dateInput.value = new Date().toISOString().slice(0, 10);

      const refreshEvidence = () => {
        const classId = classSelect.value || app.classes[0]?.id || "";
        const student = getStudentById(studentSelect.value) || getStudentsByClass(classId)[0] || null;
        renderEvidenceList(list, student);
      };

      if (!addButton.dataset.evidenceBound) {
        addButton.dataset.evidenceBound = "true";
        addButton.addEventListener("click", () => {
          const classId = classSelect.value || app.classes[0]?.id || "";
          const student = getStudentById(studentSelect.value) || getStudentsByClass(classId)[0] || null;
          if (!student) {
            feedback.textContent = "Aucun Ã©lÃ¨ve sÃ©lectionnÃ©.";
            return;
          }
          if (!titleInput.value.trim() || !skillSelect.value) {
            feedback.textContent = "Renseigne un titre et une compÃ©tence.";
            return;
          }
          app.evidencePortfolio = app.evidencePortfolio || [];
          app.evidencePortfolio.push({
            id: slugify(`evidence-${student.id}-${Date.now()}`),
            studentId: student.id,
            classId: student.classId,
            skillId: skillSelect.value,
            type: typeSelect.value,
            title: titleInput.value.trim(),
            url: urlInput.value.trim(),
            note: noteInput.value.trim(),
            date: dateInput.value || new Date().toISOString().slice(0, 10),
            createdAt: new Date().toISOString()
          });
          logAction("Preuve ajoutÃ©e", student.name, titleInput.value.trim());
          persistAppData();
          titleInput.value = "";
          urlInput.value = "";
          noteInput.value = "";
          feedback.textContent = "Preuve ajoutÃ©e au portefeuille.";
          refreshEvidence();
        });
      }

      if (!classSelect.dataset.evidenceBound) {
        classSelect.dataset.evidenceBound = "true";
        classSelect.addEventListener("change", refreshEvidence);
      }
      if (!studentSelect.dataset.evidenceBound) {
        studentSelect.dataset.evidenceBound = "true";
        studentSelect.addEventListener("change", refreshEvidence);
      }

      refreshEvidence();
    }, 0);
  };

  function getNextSchoolYear(yearLabel) {
    const match = String(yearLabel || "").match(/(\d{4})\D+(\d{4})/);
    if (!match) return "";
    return `${Number(match[1]) + 1}-${Number(match[2]) + 1}`;
  }

  function promoteClassName(name, levelOrder) {
    const current = String(name || "");
    if (levelOrder === 1) return current.replace(/2nde|Seconde|2CIEL/i, "PremiÃ¨re CIEL");
    if (levelOrder === 2) return current.replace(/PremiÃ¨re|1Ã¨re|1CIEL/i, "Terminale CIEL");
    return current;
  }

  function archiveSchoolSession(sessionYear, nextYear, note) {
    const classesInSession = app.classes.filter((classItem) => classItem.year === sessionYear);
    if (!classesInSession.length) {
      return { ok: false, message: "Aucune classe trouvÃ©e pour cette session." };
    }
    const classIds = classesInSession.map((classItem) => classItem.id);
    const studentsInSession = app.students.filter((student) => classIds.includes(student.classId));
    const terminalStudents = studentsInSession.filter((student) => getClassLevelOrder(student.classId) === 3);
    const terminalIds = terminalStudents.map((student) => student.id);
    const archiveEntry = {
      id: slugify(`archive-${sessionYear}-${Date.now()}`),
      label: `Session ${sessionYear}`,
      sessionYear,
      archivedAt: new Date().toISOString(),
      summary: note || `ClÃ´ture ${sessionYear}`,
      classes: classesInSession.map((item) => ({ ...item })),
      students: studentsInSession.map((item) => ({ ...item })),
      evaluationActivities: app.evaluationActivities.filter((activity) => classIds.includes(activity.classId)).map((item) => ({ ...item })),
      evidencePortfolio: (app.evidencePortfolio || []).filter((entry) => classIds.includes(entry.classId) || terminalIds.includes(entry.studentId)).map((item) => ({ ...item })),
      pfmpRecords: Object.fromEntries(terminalIds.map((studentId) => [studentId, JSON.parse(JSON.stringify(app.pfmpRecords?.[studentId] || {}))])),
      pfmpBooklets: Object.fromEntries(terminalIds.map((studentId) => [studentId, JSON.parse(JSON.stringify(app.pfmpBooklets?.[studentId] || {}))]))
    };
    app.archives = app.archives || [];
    app.archives.unshift(archiveEntry);

    app.evaluationActivities = app.evaluationActivities.filter((activity) => !classIds.includes(activity.classId));
    app.evidencePortfolio = (app.evidencePortfolio || []).filter((entry) => !terminalIds.includes(entry.studentId));

    app.students = app.students
      .filter((student) => !terminalIds.includes(student.id))
      .map((student) => {
        const level = getClassLevelOrder(student.classId);
        if (level === 1 || level === 2) {
          return {
            ...student,
            attendance: [],
            notes: []
          };
        }
        return student;
      });

    terminalIds.forEach((studentId) => {
      delete app.pfmpRecords[studentId];
      delete app.pfmpBooklets[studentId];
    });

    app.classes = app.classes
      .filter((classItem) => !(classItem.year === sessionYear && getClassLevelOrder(classItem.id) === 3))
      .map((classItem) => {
        if (classItem.year !== sessionYear) return classItem;
        const level = getClassLevelOrder(classItem.id);
        if (level === 1 || level === 2) {
          return {
            ...classItem,
            name: promoteClassName(classItem.name, level),
            year: nextYear
          };
        }
        return classItem;
      });

    if (!app.classes.some((classItem) => classItem.year === nextYear && getClassLevelOrder(classItem.id) === 1)) {
      app.classes.push({
        id: slugify(`seconde-ciel-${nextYear}`),
        name: "2nde CIEL",
        year: nextYear,
        note: "Nouvelle cohorte"
      });
    }

    logAction("Session archivÃ©e", sessionYear, note || `Promotion vers ${nextYear}`);
    persistAppData();
    return { ok: true, message: `Session ${sessionYear} archivÃ©e. Promotion active vers ${nextYear}.` };
  }

  function renderArchiveSessionList(target) {
    if (!target) return;
    const archives = app.archives || [];
    if (!archives.length) {
      target.innerHTML = `<article class="directory-row"><div><strong>Aucune session archivÃ©e</strong><p>Les sessions clÃ´turÃ©es apparaÃ®tront ici.</p></div></article>`;
      return;
    }
    target.innerHTML = archives.map((entry) => `
      <article class="directory-row">
        <div>
          <strong>${escapeHtml(entry.label)}</strong>
          <p>${escapeHtml(entry.sessionYear || "-")} // ${escapeHtml(entry.summary || "Sans note")}</p>
          <p>${entry.classes.length} classe(s) // ${entry.students.length} Ã©lÃ¨ve(s) // ${entry.evaluationActivities.length} sÃ©ance(s)</p>
        </div>
      </article>
    `).join("");
  }

  const originalInitAccountsPageFinalArchive = initAccountsPageFinal;
  initAccountsPageFinal = function () {
    originalInitAccountsPageFinalArchive();
    const form = document.querySelector("#archive-session-form");
    const sessionYearInput = document.querySelector("#archive-session-year");
    const nextYearInput = document.querySelector("#archive-next-year");
    const noteInput = document.querySelector("#archive-session-note");
    const feedback = document.querySelector("#archive-session-feedback");
    const list = document.querySelector("#archive-session-list");
    if (!form || !sessionYearInput || !nextYearInput || !noteInput || !list) return;

    if (!sessionYearInput.value) {
      sessionYearInput.value = [...new Set(app.classes.map((classItem) => classItem.year).filter(Boolean))].sort().slice(-1)[0] || "";
    }
    if (!nextYearInput.value) {
      nextYearInput.value = getNextSchoolYear(sessionYearInput.value) || "";
    }
    renderArchiveSessionList(list);

    if (!form.dataset.archiveBound) {
      form.dataset.archiveBound = "true";
      sessionYearInput.addEventListener("change", () => {
        nextYearInput.value = getNextSchoolYear(sessionYearInput.value) || nextYearInput.value;
      });
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const result = archiveSchoolSession(sessionYearInput.value.trim(), nextYearInput.value.trim(), noteInput.value.trim());
        feedback.textContent = result.message;
        renderArchiveSessionList(list);
      });
    }
  };
})();

function initCandidatePageFinal() {
  bindProtectedChrome();

  const classSelect = document.querySelector("#candidate-class-select");
  const studentSelect = document.querySelector("#candidate-student-select");
  const candidateNumberInput = document.querySelector("#candidate-number");
  const dateInput = document.querySelector("#candidate-date");
  const academyInput = document.querySelector("#candidate-academy");
  const schoolInput = document.querySelector("#candidate-school");
  const fileInput = document.querySelector("#candidate-grid-file");
  const useDefaultButton = document.querySelector("#candidate-use-default");
  const exportPackButton = document.querySelector("#candidate-export-pack");
  const exportClassPdfButton = document.querySelector("#candidate-export-class-pdf");
  const exportGridButton = document.querySelector("#candidate-export-grid");
  const exportPdfButton = document.querySelector("#candidate-export-pdf");
  const statusFilter = document.querySelector("#candidate-status-filter");
  const feedback = document.querySelector("#candidate-feedback");
  const meta = document.querySelector("#candidate-meta");
  const overview = document.querySelector("#candidate-overview");
  const preview = document.querySelector("#candidate-exam-preview");
  const certificationOverview = document.querySelector("#candidate-cert-overview");
  const certificationStudents = document.querySelector("#candidate-cert-students");
  if (!classSelect || !studentSelect || !candidateNumberInput || !dateInput || !academyInput || !schoolInput || !fileInput || !useDefaultButton || !exportPackButton || !exportClassPdfButton || !exportGridButton || !exportPdfButton || !statusFilter || !overview || !preview || !certificationOverview || !certificationStudents) return;

  const EXAM_GRID_STORAGE_KEY = "ciel-exam-grid-settings";
  const EXAM_CENTER_SETTINGS_KEY = "ciel-exam-center-settings";
  const EXAM_GRID_DEFAULT_MODEL_PATH = "18722-grilles-nationales-e2-e31-e32-bac-pro-ciel-finale-cellules-bloquees-2.xlsx";
  const EXAM_SHEET_MAP = {
    "Bac Pro CIEL Grille E2_": {
      skillRows: { c3: 19, c7: 32, c11: 50 },
      fields: { academy: "C7", school: "C8", lastName: "C9", firstName: "C10", candidateNumber: "C11", date: "C12" }
    },
    "BAC PRO CIEL Grille E31": {
      skillRows: { c6: 19, c9: 31, c10: 47 },
      fields: { academy: "C7", school: "C8", lastName: "C9", firstName: "C10", candidateNumber: "C11", date: "C12" }
    },
    "BAC PRO CIEL Grille E32": {
      skillRows: { c1: 19, c4: 31, c8: 47 },
      fields: { academy: "C7", school: "C8", lastName: "C9", firstName: "C10", candidateNumber: "C11", date: "C12" }
    },
    "FICHE RECAPITULATIVE": {
      fields: { academy: "C21", school: "C22", lastName: "C23", firstName: "C24", candidateNumber: "C25", date: "C26" }
    }
  };
  const STATUS_TO_EXAM_COLUMN = {
    non_acquis: "C",
    en_cours_acquisition: "D",
    partiellement_acquis: "E",
    acquis: "F"
  };
  const EXAM_GROUPS = [
    { exam: "E2", skillIds: ["c3", "c7", "c11"] },
    { exam: "E31", skillIds: ["c6", "c9", "c10"] },
    { exam: "E32", skillIds: ["c1", "c4", "c8"] }
  ];

  function safeJsonParse(raw, fallback = {}) {
    try {
      return JSON.parse(raw || JSON.stringify(fallback));
    } catch {
      return { ...fallback };
    }
  }

  function getStoredCandidateSettings() {
    const center = safeJsonParse(localStorage.getItem(EXAM_CENTER_SETTINGS_KEY), {});
    const exam = safeJsonParse(localStorage.getItem(EXAM_GRID_STORAGE_KEY), {});
    return {
      academy: exam.academy || center.academy || "",
      school: exam.school || center.school || "",
      candidateNumber: exam.candidateNumber || "",
      date: exam.date || new Date().toISOString().slice(0, 10)
    };
  }

  function saveStoredCandidateSettings() {
    const current = safeJsonParse(localStorage.getItem(EXAM_GRID_STORAGE_KEY), {});
    localStorage.setItem(EXAM_GRID_STORAGE_KEY, JSON.stringify({
      ...current,
      academy: academyInput.value.trim(),
      school: schoolInput.value.trim(),
      candidateNumber: candidateNumberInput.value.trim(),
      date: dateInput.value || new Date().toISOString().slice(0, 10)
    }));
  }

  function splitStudentIdentitySafe(student) {
    const tokens = String(student?.name || "").trim().split(/\s+/).filter(Boolean);
    return {
      firstName: tokens[0] || "",
      lastName: tokens.slice(1).join(" ") || tokens[0] || ""
    };
  }

  function computeExamPreview(student) {
    return EXAM_GROUPS.map((item) => {
      const lines = item.skillIds.map((skillId) => {
        const skill = getSkillById(skillId);
        const status = student?.skills?.[skillId] || "non_evalue";
        return {
          code: skill?.code || skillId.toUpperCase(),
          title: skill?.title || skillId,
          status,
          label: levelLabels[status] || status
        };
      });
      const validated = lines.filter((line) => ["partiellement_acquis", "acquis"].includes(line.status)).length;
      const score = lines.reduce((sum, line) => sum + (levelScores[line.status] || 0), 0) / (lines.length || 1);
      const average = Math.round(score * 100);
      const note = Math.round(score * 20 * 10) / 10;
      const hasIncomplete = lines.some((line) => ["absent", "non_evalue", "non_acquis"].includes(line.status));
      const ready = lines.every((line) => ["partiellement_acquis", "acquis"].includes(line.status));
      const status = ready ? "Pret" : (hasIncomplete ? "Incomplet" : "A verifier");
      return { exam: item.exam, lines, validated, average, note, status };
    });
  }

  function computeOverallExamStatus(previewItems) {
    if (!previewItems.length) return { label: "A verifier", note: 0, ready: 0, progress: 0 };
    const progress = Math.round(previewItems.reduce((sum, item) => sum + item.average, 0) / previewItems.length);
    const note = Math.round(previewItems.reduce((sum, item) => sum + item.note, 0) / previewItems.length * 10) / 10;
    const ready = previewItems.filter((item) => item.status === "Pret").length;
    const label = ready === previewItems.length ? "Pret a envoyer" : (previewItems.some((item) => item.status === "Incomplet") ? "Incomplet" : "A verifier");
    return { label, note, ready, progress };
  }

  function getExamStatusClass(label) {
    if (label === "Pret" || label === "Pret a envoyer") return "badge-ready";
    if (label === "Incomplet") return "badge-danger";
    return "badge-warning";
  }

  function renderCandidateOverview(student) {
    if (!student) {
      overview.innerHTML = "";
      preview.innerHTML = "";
      meta.textContent = "";
      return;
    }
    const classItem = getClassById(student.classId);
    const examPreview = computeExamPreview(student);
    const overall = computeOverallExamStatus(examPreview);
    meta.textContent = `${classItem?.name || ""} // ${student.name} // ${overall.label}`;
    overview.innerHTML = `
      <article class="summary-card">
        <h3>Dossier candidat</h3>
        <p class="muted-copy">${overall.ready}/${examPreview.length} Ã©preuve(s) prÃªtes</p>
        <div class="pfmp-kpis">
          <span class="badge">${overall.progress}%</span>
          <span class="badge">${overall.note.toFixed(1)}/20</span>
          <span class="badge ${getExamStatusClass(overall.label)}">${overall.label}</span>
        </div>
        <div class="directory-row compact">
          <div>
            <p><strong>Classe</strong> ${classItem?.name || "-"}</p>
            <p><strong>AcadÃ©mie</strong> ${academyInput.value.trim() || "-"}</p>
            <p><strong>Ã‰tablissement</strong> ${schoolInput.value.trim() || "-"}</p>
            <p><strong>NumÃ©ro candidat</strong> ${candidateNumberInput.value.trim() || "-"}</p>
          </div>
        </div>
      </article>
    `;
    preview.innerHTML = examPreview.map((item) => `
      <article class="summary-card">
        <h3>${item.exam}</h3>
        <p class="muted-copy">${item.validated}/${item.lines.length} compÃ©tence(s) consolidÃ©e(s)</p>
        <div class="pfmp-kpis">
          <span class="badge">${item.average}%</span>
          <span class="badge">${item.note.toFixed(1)}/20</span>
          <span class="badge ${getExamStatusClass(item.status)}">${item.status}</span>
        </div>
        <div class="directory-row compact">
          <div>${item.lines.map((line) => `<p><strong>${line.code}</strong> ${line.title} // ${line.label}</p>`).join("")}</div>
        </div>
      </article>
    `).join("");
  }

  function renderCertificationSnapshot(classId) {
    const classItem = getClassById(classId);
    const students = getStudentsByClass(classId);
    const examStats = EXAM_GROUPS.map((group) => {
      const previews = students.map((student) => computeExamPreview(student).find((item) => item.exam === group.exam)).filter(Boolean);
      const average = previews.length ? Math.round(previews.reduce((sum, item) => sum + item.note, 0) / previews.length * 10) / 10 : 0;
      const ready = previews.filter((item) => item.status === "Pret").length;
      const incomplete = previews.filter((item) => item.status === "Incomplet").length;
      return {
        exam: group.exam,
        average,
        ready,
        incomplete,
        status: ready === previews.length && previews.length ? "Pret a envoyer" : (incomplete ? "Incomplet" : "A verifier")
      };
    });

    certificationOverview.innerHTML = examStats.map((item) => `
      <article class="summary-card">
        <h3>${item.exam}</h3>
        <p class="muted-copy">${item.ready}/${students.length} dossier(s) prets</p>
        <div class="pfmp-kpis">
          <span class="badge">${item.average.toFixed(1)}/20</span>
          <span class="badge">${item.incomplete} incomplet(s)</span>
          <span class="badge ${getExamStatusClass(item.status)}">${item.status}</span>
        </div>
      </article>
    `).join("");

    const filterValue = statusFilter.value || "all";
    const filteredStudents = students.map((student) => {
      const previews = computeExamPreview(student);
      const ready = previews.filter((item) => item.status === "Pret").length;
      const hasIncomplete = previews.some((item) => item.status === "Incomplet");
      const status = ready === previews.length ? "Pret a envoyer" : (hasIncomplete ? "Incomplet" : "A verifier");
      return {
        student,
        previews,
        status
      };
    }).filter((item) => {
      if (filterValue === "ready") return item.status === "Pret a envoyer";
      if (filterValue === "review") return item.status === "A verifier";
      if (filterValue === "incomplete") return item.status === "Incomplet";
      return true;
    });

    certificationStudents.innerHTML = filteredStudents.map(({ student, previews, status }) => `
        <article class="summary-card">
          <h3>${student.name}</h3>
          <p class="muted-copy">${classItem?.name || ""}</p>
          <div class="pfmp-kpis">
            ${previews.map((item) => `<span class="badge ${getExamStatusClass(item.status)}">${item.exam} ${item.note.toFixed(1)}/20</span>`).join("")}
            <span class="badge ${getExamStatusClass(status)}">${status}</span>
          </div>
        </article>
      `
    ).join("");
  }

  function buildClassCertificationHtml(classId) {
    const classItem = getClassById(classId);
    const students = getStudentsByClass(classId);
    const filterValue = statusFilter.value || "all";
    const rows = students.map((student) => {
      const previews = computeExamPreview(student);
      const ready = previews.filter((item) => item.status === "Pret").length;
      const hasIncomplete = previews.some((item) => item.status === "Incomplet");
      const status = ready === previews.length ? "Pret a envoyer" : (hasIncomplete ? "Incomplet" : "A verifier");
      return { student, previews, status };
    }).filter((item) => {
      if (filterValue === "ready") return item.status === "Pret a envoyer";
      if (filterValue === "review") return item.status === "A verifier";
      if (filterValue === "incomplete") return item.status === "Incomplet";
      return true;
    });
    return buildPrintShell(
      `Certification - ${classItem?.name || ""}`,
      `${classItem?.name || ""} // filtre ${statusFilter.options[statusFilter.selectedIndex]?.text || "Tous"}`,
      `
        <table>
          <thead><tr><th>Eleve</th><th>E2</th><th>E31</th><th>E32</th><th>Etat</th></tr></thead>
          <tbody>
            ${rows.map(({ student, previews, status }) => `
              <tr>
                <td>${escapeHtml(student.name)}</td>
                <td>${previews.find((item) => item.exam === "E2")?.note.toFixed(1) || "0.0"}/20</td>
                <td>${previews.find((item) => item.exam === "E31")?.note.toFixed(1) || "0.0"}/20</td>
                <td>${previews.find((item) => item.exam === "E32")?.note.toFixed(1) || "0.0"}/20</td>
                <td>${escapeHtml(status)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `
    );
  }

  function buildCandidateRecapHtml(student) {
    const classItem = getClassById(student.classId);
    const { firstName, lastName } = splitStudentIdentitySafe(student);
    const examPreview = computeExamPreview(student);
    const overall = computeOverallExamStatus(examPreview);
    return buildPrintShell(
      `Dossier candidat - ${student.name}`,
      `${classItem?.name || ""} // ${academyInput.value.trim() || ""} // ${schoolInput.value.trim() || ""}`,
      `
        <div class="card">
          <p><strong>Nom :</strong> ${escapeHtml(lastName)}</p>
          <p><strong>Prenom :</strong> ${escapeHtml(firstName)}</p>
          <p><strong>Numero candidat :</strong> ${escapeHtml(candidateNumberInput.value.trim() || "-")}</p>
          <p><strong>Date :</strong> ${escapeHtml(dateInput.value || "-")}</p>
          <p><strong>Etat du dossier :</strong> ${escapeHtml(overall.label)}</p>
          <p><strong>Note estimative globale :</strong> ${overall.note.toFixed(1)}/20</p>
        </div>
        <table>
          <thead><tr><th>Epreuve</th><th>Competence</th><th>Intitule</th><th>Niveau</th><th>Etat</th><th>Note estimative</th></tr></thead>
          <tbody>
            ${examPreview.flatMap((item) => item.lines.map((line) => `
              <tr>
                <td>${item.exam}</td>
                <td>${line.code}</td>
                <td>${escapeHtml(line.title)}</td>
                <td>${escapeHtml(line.label)}</td>
                <td>${escapeHtml(item.status)}</td>
                <td>${item.note.toFixed(1)}/20</td>
              </tr>
            `)).join("")}
          </tbody>
        </table>
      `
    );
  }

  function setSheetCellSafe(sheet, cellRef, value) {
    const existing = sheet[cellRef] || {};
    if (value === undefined || value === null || value === "") {
      existing.t = "s";
      existing.v = "";
      delete existing.w;
    } else if (typeof value === "number") {
      existing.t = "n";
      existing.v = value;
      delete existing.w;
    } else {
      existing.t = "s";
      existing.v = String(value);
      delete existing.w;
    }
    sheet[cellRef] = existing;
    if (!sheet["!ref"]) sheet["!ref"] = `${cellRef}:${cellRef}`;
  }

  function fillCandidateWorkbook(workbook, student) {
    const { firstName, lastName } = splitStudentIdentitySafe(student);
    const safeDate = dateInput.value || new Date().toISOString().slice(0, 10);
    Object.entries(EXAM_SHEET_MAP).forEach(([sheetName, config]) => {
      const sheet = workbook.Sheets[sheetName];
      if (!sheet || !config.fields) return;
      setSheetCellSafe(sheet, config.fields.academy, academyInput.value.trim());
      setSheetCellSafe(sheet, config.fields.school, schoolInput.value.trim());
      setSheetCellSafe(sheet, config.fields.lastName, lastName);
      setSheetCellSafe(sheet, config.fields.firstName, firstName);
      setSheetCellSafe(sheet, config.fields.candidateNumber, candidateNumberInput.value.trim());
      setSheetCellSafe(sheet, config.fields.date, safeDate);
      if (!config.skillRows) return;
      Object.entries(config.skillRows).forEach(([skillId, row]) => {
        ["C", "D", "E", "F"].forEach((column) => setSheetCellSafe(sheet, `${column}${row}`, ""));
        const column = STATUS_TO_EXAM_COLUMN[student.skills?.[skillId]];
        if (column) setSheetCellSafe(sheet, `${column}${row}`, "X");
      });
    });
  }

  function buildCandidateGridFilename(student) {
    const { firstName, lastName } = splitStudentIdentitySafe(student);
    return `CIEL_Matrix_${slugify(lastName || student.name || "eleve").replace(/-/g, "_").toUpperCase()}_${slugify(firstName || "prenom").replace(/-/g, "_")}_grille.xlsx`;
  }

  function refreshStudentOptions() {
    const requestedClassId = getRequestedClassId();
    const availableClasses = [...app.classes].sort((a, b) => getClassNavLabel(a).localeCompare(getClassNavLabel(b), "fr"));
    classSelect.innerHTML = availableClasses.map((classItem) => `<option value="${classItem.id}">${classItem.name}</option>`).join("");
    classSelect.value = availableClasses.some((item) => item.id === requestedClassId) ? requestedClassId : (availableClasses[0]?.id || "");
    renderStudentsForClass();
  }

  function renderStudentsForClass() {
    const classId = classSelect.value || app.classes[0]?.id || "";
    const students = getStudentsByClass(classId);
    studentSelect.innerHTML = students.map((student) => `<option value="${student.id}">${student.name}</option>`).join("");
    renderCertificationSnapshot(classId);
    renderCandidateOverview(getStudentById(studentSelect.value) || students[0] || null);
  }

  const stored = getStoredCandidateSettings();
  candidateNumberInput.value = stored.candidateNumber || "";
  academyInput.value = stored.academy || "";
  schoolInput.value = stored.school || "";
  dateInput.value = stored.date || new Date().toISOString().slice(0, 10);

  refreshStudentOptions();

  classSelect.addEventListener("change", renderStudentsForClass);
  statusFilter.addEventListener("change", () => {
    renderCertificationSnapshot(classSelect.value || app.classes[0]?.id || "");
  });
  studentSelect.addEventListener("change", () => {
    renderCandidateOverview(getStudentById(studentSelect.value) || null);
  });
  [candidateNumberInput, academyInput, schoolInput, dateInput].forEach((input) => {
    input.addEventListener("change", () => {
      saveStoredCandidateSettings();
      renderCandidateOverview(getStudentById(studentSelect.value) || null);
    });
  });

  useDefaultButton.addEventListener("click", async () => {
    try {
      const response = await fetch(EXAM_GRID_DEFAULT_MODEL_PATH);
      if (!response.ok) throw new Error("model");
      const blob = await response.blob();
      const file = new File([blob], EXAM_GRID_DEFAULT_MODEL_PATH, { type: blob.type || "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const transfer = new DataTransfer();
      transfer.items.add(file);
      fileInput.files = transfer.files;
      feedback.textContent = "ModÃ¨le officiel chargÃ©.";
    } catch {
      feedback.textContent = "Impossible de charger le modÃ¨le officiel automatiquement.";
    }
  });

  exportPdfButton.addEventListener("click", () => {
    const student = getStudentById(studentSelect.value);
    if (!student) {
      feedback.textContent = "Aucun Ã©lÃ¨ve sÃ©lectionnÃ©.";
      return;
    }
    printHtmlDocument(`Dossier candidat ${student.name}`, buildCandidateRecapHtml(student));
  });

  exportPackButton.addEventListener("click", () => {
    exportGridButton.click();
    window.setTimeout(() => {
      exportPdfButton.click();
    }, 250);
  });

  exportClassPdfButton.addEventListener("click", () => {
    const classId = classSelect.value || app.classes[0]?.id || "";
    printHtmlDocument(`Certification ${getClassById(classId)?.name || ""}`, buildClassCertificationHtml(classId));
  });

  exportGridButton.addEventListener("click", async () => {
    const student = getStudentById(studentSelect.value);
    const file = fileInput.files?.[0];
    if (!student) {
      feedback.textContent = "Aucun Ã©lÃ¨ve sÃ©lectionnÃ©.";
      return;
    }
    if (!file || typeof XLSX === "undefined") {
      feedback.textContent = "Charge d'abord le modÃ¨le officiel .xlsx.";
      return;
    }
    try {
      saveStoredCandidateSettings();
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, {
        type: "array",
        cellStyles: true,
        cellNF: true,
        cellDates: true
      });
      fillCandidateWorkbook(workbook, student);
      XLSX.writeFile(workbook, buildCandidateGridFilename(student), {
        cellStyles: true,
        bookType: "xlsx"
      });
      feedback.textContent = "Grille nationale complÃ©tÃ©e et tÃ©lÃ©chargÃ©e.";
    } catch {
      feedback.textContent = "Impossible de gÃ©nÃ©rer la grille officielle pour ce candidat.";
    }
  });
}

function initCertificationPageFinal() {
  bindProtectedChrome();

  const classSelect = document.querySelector("#certification-class-select");
  const meta = document.querySelector("#certification-meta");
  const overview = document.querySelector("#certification-overview");
  const studentsTarget = document.querySelector("#certification-students");
  if (!classSelect || !meta || !overview || !studentsTarget) return;

  const EXAM_GROUPS = [
    { exam: "E2", skillIds: ["c3", "c7", "c11"] },
    { exam: "E31", skillIds: ["c6", "c9", "c10"] },
    { exam: "E32", skillIds: ["c1", "c4", "c8"] }
  ];

  function getExamStatusClass(label) {
    if (label === "Pret" || label === "Pret a envoyer") return "badge-ready";
    if (label === "Incomplet") return "badge-danger";
    return "badge-warning";
  }

  function computeStudentExamPreview(student) {
    return EXAM_GROUPS.map((item) => {
      const lines = item.skillIds.map((skillId) => {
        const status = student?.skills?.[skillId] || "non_evalue";
        return { status };
      });
      const score = lines.reduce((sum, line) => sum + (levelScores[line.status] || 0), 0) / (lines.length || 1);
      const note = Math.round(score * 20 * 10) / 10;
      const ready = lines.every((line) => ["partiellement_acquis", "acquis"].includes(line.status));
      const incomplete = lines.some((line) => ["absent", "non_evalue", "non_acquis"].includes(line.status));
      return {
        exam: item.exam,
        note,
        status: ready ? "Pret" : (incomplete ? "Incomplet" : "A verifier")
      };
    });
  }

  function renderCertification() {
    const requestedClassId = getRequestedClassId();
    const classes = [...app.classes].sort((a, b) => getClassNavLabel(a).localeCompare(getClassNavLabel(b), "fr"));
    classSelect.innerHTML = classes.map((classItem) => `<option value="${classItem.id}">${classItem.name}</option>`).join("");
    classSelect.value = classes.some((item) => item.id === classSelect.value) ? classSelect.value : (classes.some((item) => item.id === requestedClassId) ? requestedClassId : (classes[0]?.id || ""));

    const classItem = getClassById(classSelect.value);
    const students = getStudentsByClass(classSelect.value);
    meta.textContent = `${classItem?.name || ""} // ${students.length} eleve(s)`;

    const examStats = EXAM_GROUPS.map((group) => {
      const previews = students.map((student) => computeStudentExamPreview(student).find((item) => item.exam === group.exam)).filter(Boolean);
      const average = previews.length ? Math.round(previews.reduce((sum, item) => sum + item.note, 0) / previews.length * 10) / 10 : 0;
      const ready = previews.filter((item) => item.status === "Pret").length;
      const incomplete = previews.filter((item) => item.status === "Incomplet").length;
      return {
        exam: group.exam,
        average,
        ready,
        incomplete,
        status: ready === previews.length && previews.length ? "Pret a envoyer" : (incomplete ? "Incomplet" : "A verifier")
      };
    });

    overview.innerHTML = examStats.map((item) => `
      <article class="summary-card">
        <h3>${item.exam}</h3>
        <p class="muted-copy">${item.ready}/${students.length} dossier(s) prets</p>
        <div class="pfmp-kpis">
          <span class="badge">${item.average.toFixed(1)}/20</span>
          <span class="badge">${item.incomplete} incomplet(s)</span>
          <span class="badge ${getExamStatusClass(item.status)}">${item.status}</span>
        </div>
      </article>
    `).join("");

    studentsTarget.innerHTML = students.map((student) => {
      const previews = computeStudentExamPreview(student);
      const ready = previews.filter((item) => item.status === "Pret").length;
      const hasIncomplete = previews.some((item) => item.status === "Incomplet");
      const status = ready === previews.length ? "Pret a envoyer" : (hasIncomplete ? "Incomplet" : "A verifier");
      return `
        <article class="summary-card">
          <h3>${student.name}</h3>
          <p class="muted-copy">${classItem?.name || ""}</p>
          <div class="pfmp-kpis">
            ${previews.map((item) => `<span class="badge ${getExamStatusClass(item.status)}">${item.exam} ${item.note.toFixed(1)}/20</span>`).join("")}
            <span class="badge ${getExamStatusClass(status)}">${status}</span>
          </div>
          <div class="directory-row compact">
            <div><p><strong>Acces direct</strong> <a href="candidate.html?class=${encodeURIComponent(classItem?.id || "")}">Dossier candidat</a></p></div>
          </div>
        </article>
      `;
    }).join("");
  }

  renderCertification();
  classSelect.addEventListener("change", renderCertification);
}

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

;(function () {
  const EXAM_GRID_STORAGE_KEY = "ciel-exam-grid-settings";
  const EXAM_GRID_DEFAULT_MODEL_PATH = "18722-grilles-nationales-e2-e31-e32-bac-pro-ciel-finale-cellules-bloquees-2.xlsx";
  const EXAM_GRID_DEFAULTS = {
    academy: "Creteil",
    school: "LycÃ©e",
    date: new Date().toISOString().slice(0, 10)
  };
  const EXAM_SHEET_MAP = {
    "Bac Pro CIEL Grille E2_": { skillRows: { c3: 19, c7: 32, c11: 50 }, fields: { academy: "C7", school: "C8", lastName: "C9", firstName: "C10", candidateNumber: "C11", date: "C12" } },
    "BAC PRO CIEL Grille E31": { skillRows: { c6: 19, c9: 31, c10: 47 }, fields: { academy: "C7", school: "C8", lastName: "C9", firstName: "C10", candidateNumber: "C11", date: "C12" } },
    "BAC PRO CIEL Grille E32": { skillRows: { c1: 19, c4: 31, c8: 47 }, fields: { academy: "C7", school: "C8", lastName: "C9", firstName: "C10", candidateNumber: "C11", date: "C12" } },
    "FICHE RECAPITULATIVE": { fields: { academy: "C21", school: "C22", lastName: "C23", firstName: "C24", candidateNumber: "C25", date: "C26" } }
  };
  const STATUS_TO_EXAM_COLUMN = {
    non_acquis: "C",
    en_cours_acquisition: "D",
    partiellement_acquis: "E",
    acquis: "F"
  };

  function splitStudentIdentity(student) {
    const parts = String(student?.name || "").trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return { firstName: "", lastName: "" };
    if (parts.length === 1) return { firstName: parts[0], lastName: "" };
    return {
      firstName: parts[0],
      lastName: parts.slice(1).join(" ")
    };
  }

  function getExamGridSettings() {
    try {
      const raw = localStorage.getItem(EXAM_GRID_STORAGE_KEY);
      return raw ? { ...EXAM_GRID_DEFAULTS, ...JSON.parse(raw) } : { ...EXAM_GRID_DEFAULTS };
    } catch {
      return { ...EXAM_GRID_DEFAULTS };
    }
  }

  function saveExamGridSettings(settings) {
    localStorage.setItem(EXAM_GRID_STORAGE_KEY, JSON.stringify(settings));
  }

  function setSheetCell(sheet, cellRef, value) {
    const existing = sheet[cellRef] || {};
    if (value === undefined || value === null || value === "") {
      existing.t = "s";
      existing.v = "";
      delete existing.w;
    } else if (typeof value === "number") {
      existing.t = "n";
      existing.v = value;
      delete existing.w;
    } else {
      existing.t = "s";
      existing.v = String(value);
      delete existing.w;
    }
    sheet[cellRef] = existing;
    if (!sheet["!ref"]) {
      sheet["!ref"] = `${cellRef}:${cellRef}`;
    }
  }

  function clearExamLevelCells(sheet, row) {
    ["C", "D", "E", "F"].forEach((column) => {
      setSheetCell(sheet, `${column}${row}`, "");
    });
  }

  function fillExamSkillRow(sheet, row, status) {
    clearExamLevelCells(sheet, row);
    const column = STATUS_TO_EXAM_COLUMN[status];
    if (!column) return;
    setSheetCell(sheet, `${column}${row}`, "X");
  }

  function fillExamIdentityCells(workbook, student, settings) {
    const { firstName, lastName } = splitStudentIdentity(student);
    const safeDate = settings.date || new Date().toISOString().slice(0, 10);
    Object.entries(EXAM_SHEET_MAP).forEach(([sheetName, config]) => {
      const sheet = workbook.Sheets[sheetName];
      if (!sheet || !config.fields) return;
      setSheetCell(sheet, config.fields.academy, settings.academy || "");
      setSheetCell(sheet, config.fields.school, settings.school || "");
      setSheetCell(sheet, config.fields.lastName, lastName);
      setSheetCell(sheet, config.fields.firstName, firstName);
      setSheetCell(sheet, config.fields.candidateNumber, settings.candidateNumber || "");
      setSheetCell(sheet, config.fields.date, safeDate);
    });
  }

  function fillExamSkillCells(workbook, student) {
    Object.entries(EXAM_SHEET_MAP).forEach(([sheetName, config]) => {
      const sheet = workbook.Sheets[sheetName];
      if (!sheet || !config.skillRows) return;
      Object.entries(config.skillRows).forEach(([skillId, row]) => {
        fillExamSkillRow(sheet, row, student.skills?.[skillId]);
      });
    });
  }

  function buildExamGridFilename(student) {
    const identity = splitStudentIdentity(student);
    const lastName = slugify(identity.lastName || student?.name || "eleve").replace(/-/g, "_").toUpperCase();
    const firstName = slugify(identity.firstName || "prenom").replace(/-/g, "_");
    return `CIEL_${lastName}_${firstName}_grilles_nationales.xlsx`;
  }

  function bindExamGridExporter() {
    if (document.body?.dataset?.page !== "evaluations" || typeof XLSX === "undefined") return;
    const fileInput = document.querySelector("#exam-grid-file");
    const candidateNumberInput = document.querySelector("#exam-grid-candidate-number");
    const academyInput = document.querySelector("#exam-grid-academy");
    const schoolInput = document.querySelector("#exam-grid-school");
    const dateInput = document.querySelector("#exam-grid-date");
    const exportButton = document.querySelector("#exam-grid-export");
    const useDefaultButton = document.querySelector("#exam-grid-use-default");
    const feedback = document.querySelector("#exam-grid-feedback");
    const classSelect = document.querySelector("#eval-class-select");
    const studentSelect = document.querySelector("#eval-student-select");
    if (!fileInput || !candidateNumberInput || !academyInput || !schoolInput || !dateInput || !exportButton || !classSelect || !studentSelect) return;

    const stored = getExamGridSettings();
    candidateNumberInput.value = stored.candidateNumber || "";
    academyInput.value = stored.academy || "";
    schoolInput.value = stored.school || "";
    dateInput.value = stored.date || new Date().toISOString().slice(0, 10);

    [candidateNumberInput, academyInput, schoolInput, dateInput].forEach((input) => {
      if (input.dataset.examBound) return;
      input.dataset.examBound = "true";
      input.addEventListener("change", () => {
        saveExamGridSettings({
          candidateNumber: candidateNumberInput.value.trim(),
          academy: academyInput.value.trim(),
          school: schoolInput.value.trim(),
          date: dateInput.value
        });
      });
    });

    if (useDefaultButton && !useDefaultButton.dataset.examBound) {
      useDefaultButton.dataset.examBound = "true";
      useDefaultButton.addEventListener("click", async () => {
        try {
          const response = await fetch(EXAM_GRID_DEFAULT_MODEL_PATH);
          if (!response.ok) throw new Error("model");
          const blob = await response.blob();
          const file = new File([blob], EXAM_GRID_DEFAULT_MODEL_PATH, { type: blob.type || "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
          const transfer = new DataTransfer();
          transfer.items.add(file);
          fileInput.files = transfer.files;
          feedback.textContent = "ModÃ¨le officiel chargÃ© automatiquement.";
        } catch {
          feedback.textContent = "Impossible de charger le modÃ¨le officiel automatiquement. Charge le fichier manuellement.";
        }
      });
    }

    if (exportButton.dataset.examBound) return;
    exportButton.dataset.examBound = "true";
    exportButton.addEventListener("click", async () => {
      const classId = classSelect.value || app.classes[0]?.id || "";
      const student = getStudentById(studentSelect.value) || getStudentsByClass(classId)[0];
      if (!student) {
        feedback.textContent = "Aucun Ã©lÃ¨ve sÃ©lectionnÃ©.";
        return;
      }
      const file = fileInput.files?.[0];
      if (!file) {
        feedback.textContent = "Charge d'abord le fichier national .xlsx.";
        return;
      }

      try {
        const settings = {
          candidateNumber: candidateNumberInput.value.trim(),
          academy: academyInput.value.trim(),
          school: schoolInput.value.trim(),
          date: dateInput.value || new Date().toISOString().slice(0, 10)
        };
        saveExamGridSettings(settings);
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data, {
          type: "array",
          cellStyles: true,
          cellNF: true,
          cellDates: true
        });
        fillExamIdentityCells(workbook, student, settings);
        fillExamSkillCells(workbook, student);
        XLSX.writeFile(workbook, buildExamGridFilename(student), {
          cellStyles: true,
          bookType: "xlsx"
        });
        feedback.textContent = "Grille nationale complÃ©tÃ©e et tÃ©lÃ©chargÃ©e.";
      } catch (error) {
        feedback.textContent = "Le fichier n'a pas pu Ãªtre traitÃ©. VÃ©rifie que tu charges bien la grille officielle .xlsx.";
      }
    });
  }

  const originalInitEvaluationsPageFinalForExamGrid = initEvaluationsPageFinal;
  initEvaluationsPageFinal = function() {
    originalInitEvaluationsPageFinalForExamGrid();
    window.setTimeout(bindExamGridExporter, 0);
  };
})();

;(function () {
  function getEvidenceEntriesSafe(studentId) {
    return (app.evidencePortfolio || [])
      .filter((entry) => entry.studentId === studentId)
      .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  }

  function buildEvidenceHtmlSafe(studentId) {
    const entries = getEvidenceEntriesSafe(studentId);
    if (!entries.length) {
      return `<article class="period-card"><strong>Aucune preuve</strong><p class="muted-copy">Aucune preuve liÃƒÂ©e ÃƒÂ  cet ÃƒÂ©lÃƒÂ¨ve pour le moment.</p></article>`;
    }
    return entries.map((entry) => {
      const skill = getSkillById(entry.skillId);
      return `
        <article class="period-card">
          <strong>${escapeHtml(entry.title || "Preuve")}</strong>
          <p class="muted-copy">${escapeHtml(skill?.code || entry.skillId || "-")} // ${escapeHtml(skill?.title || "CompÃƒÂ©tence")} // ${escapeHtml(entry.type || "-")}</p>
          <p class="muted-copy">${escapeHtml(entry.date || "-")} // ${escapeHtml(entry.note || "Sans commentaire")}</p>
          ${entry.url ? `<p class="muted-copy">${escapeHtml(entry.url)}</p>` : ""}
        </article>
      `;
    }).join("");
  }

  function getCoherenceItemsSafe(classId) {
    const students = getStudentsByClass(classId);
    const activities = getActivitiesByClass(classId);
    return skillCatalog.map((skill) => {
      const activityHits = activities.filter((activity) => getActivitySkillIds(activity).includes(skill.id)).length;
      const pfmpHits = students.filter((student) => getPfmpObservationLabels(student.id, skill.id).length > 0).length;
      const acquiredCount = students.filter((student) => student.skills?.[skill.id] === "acquis").length;
      const weakValidation = acquiredCount > 0 && activityHits + pfmpHits <= 1;
      const neverWorked = activityHits === 0 && pfmpHits === 0;
      return { skill, activityHits, pfmpHits, neverWorked, weakValidation };
    }).filter((item) => item.neverWorked || item.weakValidation);
  }

  const originalInitCoveragePageFinalPremium = initCoveragePageFinal;
  initCoveragePageFinal = function () {
    originalInitCoveragePageFinalPremium();
    window.setTimeout(() => {
      if (document.body?.dataset?.page !== "coverage") return;
      const classSelect = document.querySelector("#coverage-class-select");
      const target = document.querySelector("#coverage-coherence");
      if (!classSelect || !target) return;
      const render = () => {
        const classId = classSelect.value || app.classes[0]?.id || "";
        const items = getCoherenceItemsSafe(classId);
        target.innerHTML = items.length ? items.map((item) => `
          <article class="directory-row compact">
            <div>
              <strong>${item.skill.code} // ${item.skill.title}</strong>
              <p>${escapeHtml(getSkillDomain(item.skill))} // ${item.activityHits} sÃƒÂ©ance(s) // ${item.pfmpHits} observation(s) PFMP</p>
              <p>${item.neverWorked ? "Jamais travaillÃƒÂ©e." : "Validation fragile : trop peu de traces pour une compÃƒÂ©tence acquise."}</p>
            </div>
          </article>
        `).join("") : `<article class="summary-card"><h3>CohÃƒÂ©rence satisfaisante</h3><p class="muted-copy">Aucune alerte de cohÃƒÂ©rence dÃƒÂ©tectÃƒÂ©e pour cette classe.</p></article>`;
      };
      render();
      if (!classSelect.dataset.coverageCoherenceBound) {
        classSelect.dataset.coverageCoherenceBound = "true";
        classSelect.addEventListener("change", render);
      }
    }, 0);
  };

  const originalBuildBulletinMarkupPremium = buildBulletinMarkup;
  buildBulletinMarkup = function (student, classItem, studentActivities, pfmpSummary, blockAverages) {
    const base = originalBuildBulletinMarkupPremium(student, classItem, studentActivities, pfmpSummary, blockAverages);
    return `${base}
      <div class="bulletin-grid">
        <section class="summary-card">
          <h3>Portefeuille de preuves</h3>
          <div class="bulletin-pfmp">
            ${buildEvidenceHtmlSafe(student.id)}
          </div>
        </section>
      </div>`;
  };

  const originalBuildPrintableBulletinHTMLPremium = buildPrintableBulletinHTML;
  buildPrintableBulletinHTML = function (student, classItem, studentActivities, pfmpSummary, blockAverages) {
    const base = originalBuildPrintableBulletinHTMLPremium(student, classItem, studentActivities, pfmpSummary, blockAverages);
    const insert = `
      <div class="grid">
        <section class="card">
          <h2>Portefeuille de preuves</h2>
          ${getEvidenceEntriesSafe(student.id).length ? getEvidenceEntriesSafe(student.id).map((entry) => {
            const skill = getSkillById(entry.skillId);
            return `<div class="row"><div><strong>${escapeHtml(entry.title || "Preuve")}</strong><br><span class="meta">${escapeHtml(skill?.code || entry.skillId || "-")} ${escapeHtml(skill?.title || "")} // ${escapeHtml(entry.type || "-")} // ${escapeHtml(entry.date || "-")}</span></div><div>${escapeHtml(entry.note || "-")}</div></div>`;
          }).join("") : `<p>Aucune preuve.</p>`}
        </section>
      </div>`;
    return base.replace("</body>", `${insert}</body>`);
  };

  const originalInitCandidatePageFinalPremium = initCandidatePageFinal;
  initCandidatePageFinal = function () {
    originalInitCandidatePageFinalPremium();
    window.setTimeout(() => {
      if (document.body?.dataset?.page !== "candidate") return;
      const classSelect = document.querySelector("#candidate-class-select");
      const studentSelect = document.querySelector("#candidate-student-select");
      const overview = document.querySelector("#candidate-overview");
      const batchButton = document.querySelector("#candidate-export-class-pack");
      if (!classSelect || !studentSelect || !overview || !batchButton) return;

      let evidencePanel = document.querySelector("#candidate-evidence-panel");
      if (!evidencePanel) {
        evidencePanel = document.createElement("section");
        evidencePanel.id = "candidate-evidence-panel";
        evidencePanel.className = "panel";
        evidencePanel.innerHTML = `
          <div class="hero-side-head">
            <div>
              <h2>Preuves liÃƒÂ©es au candidat</h2>
              <p class="results-count">Documents, productions et observations associÃƒÂ©s aux compÃƒÂ©tences.</p>
            </div>
          </div>
          <div id="candidate-evidence-list" class="class-cards"></div>
        `;
        overview.closest(".panel")?.insertAdjacentElement("afterend", evidencePanel);
      }
      const evidenceList = document.querySelector("#candidate-evidence-list");

      const renderEvidence = () => {
        const student = getStudentById(studentSelect.value);
        if (!evidenceList || !student) return;
        evidenceList.innerHTML = buildEvidenceHtmlSafe(student.id);
      };
      renderEvidence();

      if (!studentSelect.dataset.candidateEvidenceBound) {
        studentSelect.dataset.candidateEvidenceBound = "true";
        studentSelect.addEventListener("change", renderEvidence);
      }
      if (!classSelect.dataset.candidateEvidenceBound) {
        classSelect.dataset.candidateEvidenceBound = "true";
        classSelect.addEventListener("change", () => window.setTimeout(renderEvidence, 0));
      }

      if (!batchButton.dataset.candidateBatchBound) {
        batchButton.dataset.candidateBatchBound = "true";
        batchButton.addEventListener("click", () => {
          const currentStudentId = studentSelect.value;
          const studentIds = getStudentsByClass(classSelect.value || app.classes[0]?.id || "").map((student) => student.id);
          const exportGridButton = document.querySelector("#candidate-export-grid");
          const exportClassPdfButton = document.querySelector("#candidate-export-class-pdf");
          exportClassPdfButton?.click();
          studentIds.forEach((studentId, index) => {
            window.setTimeout(() => {
              studentSelect.value = studentId;
              studentSelect.dispatchEvent(new Event("change"));
              exportGridButton?.click();
              if (index === studentIds.length - 1) {
                window.setTimeout(() => {
                  studentSelect.value = currentStudentId;
                  studentSelect.dispatchEvent(new Event("change"));
                }, 300);
              }
            }, 350 * index);
          });
        });
      }
    }, 0);
  };
})();

;(function () {
  const EXAM_DISPATCH_STORAGE_KEY = "ciel-exam-dispatch-v2";
  const EXAM_GROUPS_SAFE = [
    { exam: "E2", skillIds: ["c3", "c7", "c11"] },
    { exam: "E31", skillIds: ["c6", "c9", "c10"] },
    { exam: "E32", skillIds: ["c1", "c4", "c8"] }
  ];

  function safeParseLocalJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
    } catch {
      return fallback;
    }
  }

  function loadExamDispatchState() {
    return safeParseLocalJson(EXAM_DISPATCH_STORAGE_KEY, {});
  }

  function saveExamDispatchState(state) {
    localStorage.setItem(EXAM_DISPATCH_STORAGE_KEY, JSON.stringify(state || {}));
  }

  function getStudentDispatchState(studentId) {
    const store = loadExamDispatchState();
    return store[studentId] || { finalized: false, sent: false, checkedAt: "", note: "" };
  }

  function setStudentDispatchState(studentId, patch) {
    const store = loadExamDispatchState();
    store[studentId] = {
      ...getStudentDispatchState(studentId),
      ...patch
    };
    saveExamDispatchState(store);
    return store[studentId];
  }

  function computeExamPreviewSafe(student) {
    return EXAM_GROUPS_SAFE.map((item) => {
      const lines = item.skillIds.map((skillId) => {
        const skill = getSkillById(skillId);
        const status = student?.skills?.[skillId] || "non_evalue";
        return {
          code: skill?.code || skillId.toUpperCase(),
          title: skill?.title || skillId,
          status,
          label: levelLabels[status] || status
        };
      });
      const ready = lines.every((line) => ["partiellement_acquis", "acquis"].includes(line.status));
      const incomplete = lines.some((line) => ["absent", "non_evalue", "non_acquis"].includes(line.status));
      const score = lines.reduce((sum, line) => sum + (levelScores[line.status] || 0), 0) / (lines.length || 1);
      return {
        exam: item.exam,
        status: ready ? "Pret" : (incomplete ? "Incomplet" : "A verifier"),
        note: Math.round(score * 20 * 10) / 10
      };
    });
  }

  function computeOverallExamSafe(student) {
    const preview = computeExamPreviewSafe(student);
    const ready = preview.filter((item) => item.status === "Pret").length;
    const incomplete = preview.some((item) => item.status === "Incomplet");
    return {
      preview,
      label: ready === preview.length ? "Pret a envoyer" : (incomplete ? "Incomplet" : "A verifier"),
      readyCount: ready,
      note: preview.length ? Math.round(preview.reduce((sum, item) => sum + item.note, 0) / preview.length * 10) / 10 : 0
    };
  }

  function getExamStatusClassSafe(label) {
    if (label === "Pret" || label === "Pret a envoyer") return "badge-ready";
    if (label === "Incomplet") return "badge-danger";
    return "badge-warning";
  }

  function getStudentEvidenceEntriesSafe(studentId) {
    return (app.evidencePortfolio || []).filter((entry) => entry.studentId === studentId);
  }

  function getJourneyTimelineItemsSafe(student) {
    return getStudentJourney(student)
      .filter((item) => {
        const level = getClassLevelOrder(item.classId);
        return level >= 1 && level <= 3;
      })
      .sort((a, b) => getClassLevelOrder(a.classId) - getClassLevelOrder(b.classId));
  }

  function getJourneyLabelSafe(item) {
    const level = getClassLevelOrder(item.classId);
    const prefix = level === 1 ? "2nde" : (level === 2 ? "1ere" : "Terminale");
    return `${prefix} // ${item.year || getClassById(item.classId)?.year || ""}`;
  }

  function buildJourneyTimelineHtmlSafe(student) {
    const items = getJourneyTimelineItemsSafe(student);
    if (!items.length) {
      return `<article class="summary-card"><h3>Aucun parcours</h3><p class="muted-copy">Le parcours 3 ans apparaitra ici des que plusieurs annees existeront pour cet eleve.</p></article>`;
    }
    return `<div class="journey-rail">${items.map((item, index) => {
      const classItem = getClassById(item.classId);
      const progress = getStudentProgress(item);
      const activities = getActivitiesByClass(item.classId).filter((activity) => getActivityStudentAverage(item.id, activity.id) !== null);
      const pfmpPeriods = getPfmpPeriodsForLevel(getClassLevelOrder(item.classId));
      const pfmpRows = buildPfmpWorkbookRowsForStudent(item, pfmpPeriods);
      const evidenceCount = getStudentEvidenceEntriesSafe(item.id).length;
      const exam = getClassLevelOrder(item.classId) === 3 ? computeOverallExamSafe(item) : null;
      return `
        <article class="journey-stage journey-stage-level-${getClassLevelOrder(item.classId)}">
          <div class="journey-node">
            <span class="journey-dot">${index + 1}</span>
            <span class="journey-bar"></span>
          </div>
          <div class="journey-stage-head">
            <div>
              <h3>${escapeHtml(getJourneyLabelSafe(item))}</h3>
              <p class="muted-copy">${escapeHtml(classItem?.name || "")} // ${progress}% de progression</p>
            </div>
            <div class="student-badges">
              <span class="badge">${activities.length} seance(s)</span>
              <span class="badge">${pfmpRows.length} trace(s) PFMP</span>
              <span class="badge">${evidenceCount} preuve(s)</span>
              ${exam ? `<span class="badge ${getExamStatusClassSafe(exam.label)}">${exam.label}</span>` : ""}
            </div>
          </div>
          <div class="journey-stage-grid">
            <article class="period-card">
              <strong>Domaines</strong>
              ${referentialDomains.map((domain) => {
                const domainSkills = skillCatalog.filter((skill) => getSkillDomain(skill) === domain);
                const score = domainSkills.reduce((sum, skill) => sum + (levelScores[item.skills?.[skill.id]] || 0), 0);
                const max = Math.max(domainSkills.length * (levelScores.acquis || 1), 1);
                return `<p>${escapeHtml(domain)} // ${Math.round((score / max) * 100)}%</p>`;
              }).join("")}
            </article>
            <article class="period-card">
              <strong>PFMP et preuves</strong>
              <p>${pfmpPeriods.length} periode(s) cible(s)</p>
              <p>${pfmpRows.filter((row) => row[3] && row[3] !== "-").length} observation(s) renseignee(s)</p>
              <p>${evidenceCount} preuve(s) rattachee(s)</p>
            </article>
            <article class="period-card">
              <strong>Certification</strong>
              ${exam ? `<p>Etat global // ${escapeHtml(exam.label)}</p><p>Note estimative // ${exam.note.toFixed(1)}/20</p>` : `<p>Non concerne sur ce niveau.</p>`}
            </article>
          </div>
        </article>
      `;
    }).join("")}</div>`;
  }

  function ensureJourneyPanelSafe() {
    if (document.body?.dataset?.page !== "bulletin") return;
    const sheet = document.querySelector("#bulletin-sheet");
    const studentSelect = document.querySelector("#bulletin-student-select");
    const classSelect = document.querySelector("#bulletin-class-select");
    const layout = document.querySelector(".dashboard-layout");
    if (!sheet || !studentSelect || !classSelect || !layout) return;

    let panel = document.querySelector("#bulletin-journey-panel");
    if (!panel) {
      panel = document.createElement("section");
      panel.id = "bulletin-journey-panel";
      panel.className = "panel";
      panel.innerHTML = `
        <div class="section-head">
          <div>
            <p class="eyebrow">Parcours</p>
            <h2>Parcours eleve sur 3 ans</h2>
          </div>
        </div>
        <div id="bulletin-journey-content" class="journey-timeline"></div>
      `;
      layout.appendChild(panel);
    } else if (panel.parentElement !== layout) {
      layout.appendChild(panel);
    }
    const content = document.querySelector("#bulletin-journey-content");
    const render = () => {
      const classId = classSelect.value || app.classes[0]?.id || "";
      const student = getStudentById(studentSelect.value) || getStudentsByClass(classId)[0];
      if (!content) return;
      if (!student) {
        content.innerHTML = `<article class="summary-card"><h3>Aucun eleve</h3><p class="muted-copy">Selectionne un eleve pour afficher son parcours.</p></article>`;
        return;
      }
      content.innerHTML = buildJourneyTimelineHtmlSafe(student);
    };
    render();
    if (!studentSelect.dataset.journeyBound) {
      studentSelect.dataset.journeyBound = "true";
      studentSelect.addEventListener("change", render);
    }
    if (!classSelect.dataset.journeyBound) {
      classSelect.dataset.journeyBound = "true";
      classSelect.addEventListener("change", () => window.setTimeout(render, 0));
    }
  }

  function mergeUniqueItemsByIdSafe(currentItems, incomingItems) {
    const current = Array.isArray(currentItems) ? currentItems : [];
    const incoming = Array.isArray(incomingItems) ? incomingItems : [];
    const known = new Set(current.map((item) => item.id));
    const merged = [...current];
    incoming.forEach((item) => {
      if (!item?.id || known.has(item.id)) return;
      known.add(item.id);
      merged.push(JSON.parse(JSON.stringify(item)));
    });
    return merged;
  }

  function mergeObjectEntriesSafe(currentMap, incomingMap) {
    const output = { ...(currentMap || {}) };
    Object.entries(incomingMap || {}).forEach(([key, value]) => {
      if (output[key]) return;
      output[key] = JSON.parse(JSON.stringify(value));
    });
    return output;
  }

  async function persistSafeLotChanges() {
    if (typeof persistCriticalAppData === "function") {
      await persistCriticalAppData();
      return;
    }
    if (typeof persistAppData === "function") {
      persistAppData();
    }
  }

  function restoreArchiveSessionSafe(archiveId) {
    const archive = (app.archives || []).find((entry) => entry.id === archiveId);
    if (!archive) return { ok: false, message: "Archive introuvable." };
    app.classes = mergeUniqueItemsByIdSafe(app.classes, archive.classes);
    app.students = mergeUniqueItemsByIdSafe(app.students, archive.students);
    app.evaluationActivities = mergeUniqueItemsByIdSafe(app.evaluationActivities, archive.evaluationActivities);
    app.evidencePortfolio = mergeUniqueItemsByIdSafe(app.evidencePortfolio, archive.evidencePortfolio);
    app.pfmpRecords = mergeObjectEntriesSafe(app.pfmpRecords, archive.pfmpRecords);
    app.pfmpBooklets = mergeObjectEntriesSafe(app.pfmpBooklets, archive.pfmpBooklets);
    logAction("Archive restauree", archive.label, "Restauration complete");
    return { ok: true, message: `${archive.label} restauree dans l'espace actif.` };
  }

  function restoreArchivedStudentSafe(archiveId, studentId) {
    const archive = (app.archives || []).find((entry) => entry.id === archiveId);
    const student = archive?.students?.find((item) => item.id === studentId);
    if (!archive || !student) return { ok: false, message: "Eleve archive introuvable." };
    if (!app.classes.some((classItem) => classItem.id === student.classId)) {
      const archivedClass = archive.classes.find((classItem) => classItem.id === student.classId);
      if (archivedClass) app.classes.push(JSON.parse(JSON.stringify(archivedClass)));
    }
    if (!app.students.some((item) => item.id === student.id)) {
      app.students.push(JSON.parse(JSON.stringify(student)));
    }
    app.evidencePortfolio = mergeUniqueItemsByIdSafe(
      app.evidencePortfolio,
      (archive.evidencePortfolio || []).filter((entry) => entry.studentId === student.id)
    );
    if (archive.pfmpRecords?.[student.id] && !app.pfmpRecords?.[student.id]) {
      app.pfmpRecords = app.pfmpRecords || {};
      app.pfmpRecords[student.id] = JSON.parse(JSON.stringify(archive.pfmpRecords[student.id]));
    }
    if (archive.pfmpBooklets?.[student.id] && !app.pfmpBooklets?.[student.id]) {
      app.pfmpBooklets = app.pfmpBooklets || {};
      app.pfmpBooklets[student.id] = JSON.parse(JSON.stringify(archive.pfmpBooklets[student.id]));
    }
    logAction("Eleve restaure", student.name, archive.label);
    return { ok: true, message: `${student.name} restaure depuis ${archive.label}.` };
  }

  function renderArchiveDetailsSafe(archiveId) {
    const target = document.querySelector("#archive-session-detail");
    if (!target) return;
    const archive = (app.archives || []).find((entry) => entry.id === archiveId) || app.archives?.[0];
    if (!archive) {
      target.innerHTML = `<article class="summary-card"><h3>Aucune archive</h3><p class="muted-copy">Archive une session pour activer cette vue.</p></article>`;
      return;
    }
    const terminalStudents = (archive.students || []).filter((student) => getClassLevelOrder(student.classId) === 3);
    target.innerHTML = `
      <article class="summary-card">
        <h3>${escapeHtml(archive.label)}</h3>
        <p class="muted-copy">${escapeHtml(archive.summary || "Sans note")} // ${new Date(archive.archivedAt).toLocaleDateString("fr-FR")}</p>
        <div class="pfmp-kpis">
          <span class="badge">${archive.classes.length} classe(s)</span>
          <span class="badge">${archive.students.length} eleve(s)</span>
          <span class="badge">${archive.evaluationActivities.length} seance(s)</span>
          <span class="badge">${(archive.evidencePortfolio || []).length} preuve(s)</span>
        </div>
        <div class="student-badges archive-action-row">
          <button class="ghost-button" type="button" data-archive-restore="${archive.id}">Restaurer la session</button>
          <button class="ghost-button" type="button" data-archive-export-json="${archive.id}">Exporter JSON</button>
          <button class="ghost-button" type="button" data-archive-export-pdf="${archive.id}">Exporter PDF</button>
        </div>
      </article>
      <article class="summary-card">
        <h3>Terminales archivees</h3>
        <div class="student-directory">
          ${terminalStudents.length ? terminalStudents.map((student) => `
            <article class="directory-row compact">
              <div>
                <strong>${escapeHtml(student.name)}</strong>
                <p>${escapeHtml(getClassById(student.classId)?.name || archive.classes.find((item) => item.id === student.classId)?.name || "")}</p>
              </div>
              <div class="student-badges">
                <button class="ghost-button" type="button" data-archive-restore-student="${archive.id}" data-student-id="${student.id}">Restaurer l'eleve</button>
              </div>
            </article>
          `).join("") : `<article class="directory-row"><div><strong>Aucun eleve</strong><p>Aucun terminale archive dans cette session.</p></div></article>`}
        </div>
      </article>
    `;

    target.querySelector(`[data-archive-restore="${archive.id}"]`)?.addEventListener("click", async () => {
      const result = restoreArchiveSessionSafe(archive.id);
      await persistSafeLotChanges();
      const feedback = document.querySelector("#archive-session-feedback");
      if (feedback) feedback.textContent = result.message;
      renderArchiveEnhancementSafe();
    });
    target.querySelector(`[data-archive-export-json="${archive.id}"]`)?.addEventListener("click", () => {
      exportArchiveSessionJsonSafe(archive.id);
    });
    target.querySelector(`[data-archive-export-pdf="${archive.id}"]`)?.addEventListener("click", () => {
      exportArchiveSessionPdfSafe(archive.id);
    });
    target.querySelectorAll("[data-archive-restore-student]").forEach((button) => {
      button.addEventListener("click", async () => {
        const result = restoreArchivedStudentSafe(button.dataset.archiveRestoreStudent, button.dataset.studentId);
        await persistSafeLotChanges();
        const feedback = document.querySelector("#archive-session-feedback");
        if (feedback) feedback.textContent = result.message;
        renderArchiveEnhancementSafe(button.dataset.archiveRestoreStudent);
      });
    });
  }

  function renderArchiveEnhancementSafe(selectedArchiveId = "") {
    if (document.body?.dataset?.page !== "accounts") return;
    const list = document.querySelector("#archive-session-list");
    if (!list) return;

    let panel = document.querySelector("#archive-session-detail-panel");
    if (!panel) {
      panel = document.createElement("section");
      panel.id = "archive-session-detail-panel";
      panel.className = "panel wide-panel";
      panel.innerHTML = `
        <div class="section-head">
          <div>
            <p class="eyebrow">Archivage premium</p>
            <h2>Consultation et restauration</h2>
          </div>
        </div>
        <div id="archive-session-detail" class="archive-detail-grid"></div>
      `;
      list.closest(".panel")?.insertAdjacentElement("afterend", panel);
    }

    const rows = list.querySelectorAll(".directory-row");
    rows.forEach((row, index) => {
      if (row.querySelector(".archive-open-button")) return;
      const archive = (app.archives || [])[index];
      if (!archive) return;
      const actions = document.createElement("div");
      actions.className = "student-badges";
      actions.innerHTML = `<button class="ghost-button archive-open-button" type="button" data-archive-open="${archive.id}">Consulter</button>`;
      row.appendChild(actions);
      actions.querySelector("button")?.addEventListener("click", () => renderArchiveDetailsSafe(archive.id));
    });

    renderArchiveDetailsSafe(selectedArchiveId || app.archives?.[0]?.id || "");
  }

  function renderExamFinalizationSafe() {
    if (document.body?.dataset?.page !== "candidate") return;
    const classSelect = document.querySelector("#candidate-class-select");
    const studentSelect = document.querySelector("#candidate-student-select");
    const candidateNumberInput = document.querySelector("#candidate-number");
    const dateInput = document.querySelector("#candidate-date");
    const academyInput = document.querySelector("#candidate-academy");
    const schoolInput = document.querySelector("#candidate-school");
    const fileInput = document.querySelector("#candidate-grid-file");
    const overview = document.querySelector("#candidate-overview");
    if (!classSelect || !studentSelect || !candidateNumberInput || !dateInput || !academyInput || !schoolInput || !fileInput || !overview) return;

    let panel = document.querySelector("#candidate-final-panel");
    if (!panel) {
      panel = document.createElement("section");
      panel.id = "candidate-final-panel";
      panel.className = "panel";
      panel.innerHTML = `
        <div class="hero-side-head">
          <div>
            <h2>Finalisation jury</h2>
            <p class="results-count">Checklist du dossier, verrouillage final et suivi d'envoi.</p>
          </div>
        </div>
        <div id="candidate-final-content" class="class-cards"></div>
      `;
      overview.closest(".panel")?.insertAdjacentElement("afterend", panel);
    }
    const target = document.querySelector("#candidate-final-content");
    let promoPanel = document.querySelector("#candidate-promo-panel");
    if (!promoPanel) {
      promoPanel = document.createElement("section");
      promoPanel.id = "candidate-promo-panel";
      promoPanel.className = "panel";
      promoPanel.innerHTML = `
        <div class="hero-side-head">
          <div>
            <h2>Checklist d'envoi par promo</h2>
            <p class="results-count">Vision industrielle de la classe avant envoi Maison des examens.</p>
          </div>
        </div>
        <div id="candidate-promo-content" class="class-cards"></div>
      `;
      panel.insertAdjacentElement("afterend", promoPanel);
    }
    const promoTarget = document.querySelector("#candidate-promo-content");
    const student = getStudentById(studentSelect.value);
    if (!target || !promoTarget || !student) return;

    const exam = computeOverallExamSafe(student);
    const evidenceCount = getStudentEvidenceEntriesSafe(student.id).length;
    const dispatch = getStudentDispatchState(student.id);
    const checklist = [
      { label: "Identite candidat renseignee", ok: Boolean(candidateNumberInput.value.trim()) },
      { label: "Academie et etablissement renseignes", ok: Boolean(academyInput.value.trim() && schoolInput.value.trim()) },
      { label: "Date d'edition renseignee", ok: Boolean(dateInput.value) },
      { label: "Modele officiel charge", ok: Boolean(fileInput.files?.[0]) },
      { label: "Epreuves sans blocage critique", ok: exam.label !== "Incomplet" },
      { label: "Au moins une preuve disponible", ok: evidenceCount > 0 }
    ];
    const readyToFinalize = checklist.every((item) => item.ok);
    const classStudents = getStudentsByClass(classSelect.value || student.classId);
    const classDispatch = classStudents.map((item) => getStudentDispatchState(item.id));
    const finalizedCount = classDispatch.filter((item) => item.finalized).length;
    const sentCount = classDispatch.filter((item) => item.sent).length;
    const readyStudents = classStudents.map((item) => ({ student: item, exam: computeOverallExamSafe(item), dispatch: getStudentDispatchState(item.id) }));
    const incompleteCount = readyStudents.filter((item) => item.exam.label === "Incomplet").length;
    const readyToFinalizeCount = readyStudents.filter((item) => item.exam.label !== "Incomplet").length;

    target.innerHTML = `
      <article class="summary-card">
        <h3>Dossier ${escapeHtml(student.name)}</h3>
        <div class="pfmp-kpis">
          <span class="badge ${getExamStatusClassSafe(exam.label)}">${exam.label}</span>
          <span class="badge ${dispatch.finalized ? "badge-ready" : "badge-warning"}">${dispatch.finalized ? "Finalise" : "Brouillon"}</span>
          <span class="badge ${dispatch.sent ? "badge-ready" : "badge-warning"}">${dispatch.sent ? "Envoye" : "Non envoye"}</span>
        </div>
        <div class="candidate-checklist">
          ${checklist.map((item) => `<p class="${item.ok ? "check-ok" : "check-ko"}">${item.ok ? "OK" : "A faire"} // ${escapeHtml(item.label)}</p>`).join("")}
        </div>
        <div class="student-badges archive-action-row">
          <button class="ghost-button" type="button" data-finalize="${student.id}" ${readyToFinalize ? "" : "disabled"}>Finaliser le dossier</button>
          <button class="ghost-button" type="button" data-unlock="${student.id}" ${dispatch.finalized ? "" : "disabled"}>Reouvrir</button>
          <button class="primary-button" type="button" data-mark-sent="${student.id}" ${dispatch.finalized ? "" : "disabled"}>${dispatch.sent ? "Marquer non envoye" : "Marquer envoye"}</button>
        </div>
      </article>
      <article class="summary-card">
        <h3>Etat classe examen</h3>
        <p class="muted-copy">${escapeHtml(getClassById(classSelect.value || student.classId)?.name || "")}</p>
        <div class="pfmp-kpis">
          <span class="badge">${finalizedCount}/${classStudents.length} finalises</span>
          <span class="badge">${sentCount}/${classStudents.length} envoyes</span>
          <span class="badge">${classStudents.length - finalizedCount} en cours</span>
        </div>
      </article>
    `;

    target.querySelector(`[data-finalize="${student.id}"]`)?.addEventListener("click", () => {
      setStudentDispatchState(student.id, { finalized: true, checkedAt: new Date().toISOString() });
      renderExamFinalizationSafe();
    });
    target.querySelector(`[data-unlock="${student.id}"]`)?.addEventListener("click", () => {
      setStudentDispatchState(student.id, { finalized: false, sent: false });
      renderExamFinalizationSafe();
    });
    target.querySelector(`[data-mark-sent="${student.id}"]`)?.addEventListener("click", () => {
      const current = getStudentDispatchState(student.id);
      setStudentDispatchState(student.id, { sent: !current.sent, finalized: current.finalized || readyToFinalize });
      renderExamFinalizationSafe();
    });

    promoTarget.innerHTML = `
      <article class="summary-card">
        <h3>Etat de la promo</h3>
        <div class="pfmp-kpis">
          <span class="badge">${readyToFinalizeCount}/${classStudents.length} sans blocage</span>
          <span class="badge">${finalizedCount}/${classStudents.length} finalises</span>
          <span class="badge">${sentCount}/${classStudents.length} envoyes</span>
          <span class="badge ${incompleteCount ? "badge-danger" : "badge-ready"}">${incompleteCount} incomplet(s)</span>
        </div>
        <div class="student-badges archive-action-row">
          <button class="ghost-button" type="button" id="candidate-export-promo-checklist">Exporter la checklist promo</button>
          <button class="ghost-button" type="button" id="candidate-export-promo-batch">Lancer l'export groupe</button>
        </div>
      </article>
      <article class="summary-card">
        <h3>Suivi candidats</h3>
        <div class="student-directory">
          ${readyStudents.map((item) => `
            <article class="directory-row compact">
              <div>
                <strong>${escapeHtml(item.student.name)}</strong>
                <p>${item.exam.label} // ${item.exam.note.toFixed(1)}/20</p>
              </div>
              <div class="student-badges">
                <span class="badge ${getExamStatusClassSafe(item.exam.label)}">${item.exam.label}</span>
                <span class="badge ${item.dispatch.finalized ? "badge-ready" : "badge-warning"}">${item.dispatch.finalized ? "Finalise" : "Brouillon"}</span>
                <span class="badge ${item.dispatch.sent ? "badge-ready" : "badge-warning"}">${item.dispatch.sent ? "Envoye" : "Non envoye"}</span>
              </div>
            </article>
          `).join("")}
        </div>
      </article>
    `;

    document.querySelector("#candidate-export-promo-checklist")?.addEventListener("click", () => {
      const classItem = getClassById(classSelect.value || student.classId);
      const html = buildPrintShell(
        `Checklist promo - ${classItem?.name || ""}`,
        `${classItem?.name || ""} // ${new Date().toLocaleDateString("fr-FR")}`,
        `
          <div class="card">
            <p><strong>Classe :</strong> ${escapeHtml(classItem?.name || "-")}</p>
            <p><strong>Finalises :</strong> ${finalizedCount}/${classStudents.length}</p>
            <p><strong>Envoyes :</strong> ${sentCount}/${classStudents.length}</p>
            <p><strong>Incomplets :</strong> ${incompleteCount}</p>
          </div>
          <table>
            <thead><tr><th>Eleve</th><th>Etat examen</th><th>Finalisation</th><th>Envoi</th><th>Note estimee</th></tr></thead>
            <tbody>
              ${readyStudents.map((item) => `
                <tr>
                  <td>${escapeHtml(item.student.name)}</td>
                  <td>${escapeHtml(item.exam.label)}</td>
                  <td>${item.dispatch.finalized ? "Finalise" : "Brouillon"}</td>
                  <td>${item.dispatch.sent ? "Envoye" : "Non envoye"}</td>
                  <td>${item.exam.note.toFixed(1)}/20</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        `
      );
      printHtmlDocument(`Checklist promo ${classItem?.name || ""}`, html);
    });

    document.querySelector("#candidate-export-promo-batch")?.addEventListener("click", () => {
      document.querySelector("#candidate-export-class-pack")?.click();
    });
  }

  function initReportsPageFinalSafe() {
    if (document.body?.dataset?.page !== "reports") return;
    bindProtectedChrome();
    const classSelect = document.querySelector("#reports-class-select");
    const meta = document.querySelector("#reports-meta");
    const kpis = document.querySelector("#reports-kpis");
    const alerts = document.querySelector("#reports-alerts");
    const exportButton = document.querySelector("#reports-export-pdf");
    if (!classSelect || !meta || !kpis || !alerts || !exportButton) return;

    const render = () => {
      const requestedClassId = getRequestedClassId();
      const classes = [...app.classes].sort((a, b) => getClassNavLabel(a).localeCompare(getClassNavLabel(b), "fr"));
      classSelect.innerHTML = classes.map((classItem) => `<option value="${classItem.id}">${classItem.name}</option>`).join("");
      classSelect.value = classes.some((item) => item.id === classSelect.value)
        ? classSelect.value
        : (classes.some((item) => item.id === requestedClassId) ? requestedClassId : (classes[0]?.id || ""));
      const classId = classSelect.value || classes[0]?.id || "";
      const classItem = getClassById(classId);
      const students = getStudentsByClass(classId);
      const activities = getActivitiesByClass(classId);
      const alertsList = getClassAlerts(classId, "all");
      const coherenceItems = skillCatalog.map((skill) => {
        const activityHits = activities.filter((activity) => getActivitySkillIds(activity).includes(skill.id)).length;
        const pfmpHits = students.filter((student) => getPfmpObservationLabels(student.id, skill.id).length > 0).length;
        return activityHits === 0 && pfmpHits === 0;
      }).filter(Boolean).length;
      const readyExam = students.filter((student) => getStudentDispatchState(student.id).finalized).length;
      const evidenceCount = (app.evidencePortfolio || []).filter((entry) => students.some((student) => student.id === entry.studentId)).length;

      meta.textContent = `${classItem?.name || ""} // ${students.length} eleve(s) // ${activities.length} seance(s)`;
      kpis.innerHTML = `
        <article class="stat-card"><span class="stat-value">${students.length}</span><span class="stat-label">Eleves suivis</span></article>
        <article class="stat-card"><span class="stat-value">${activities.length}</span><span class="stat-label">Seances actives</span></article>
        <article class="stat-card"><span class="stat-value">${evidenceCount}</span><span class="stat-label">Preuves</span></article>
        <article class="stat-card"><span class="stat-value">${readyExam}</span><span class="stat-label">Dossiers finalises</span></article>
        <article class="stat-card"><span class="stat-value">${coherenceItems}</span><span class="stat-label">Competences a surveiller</span></article>
      `;
      alerts.innerHTML = alertsList.length ? alertsList.map((item) => `
        <article class="directory-row compact">
          <div>
            <strong>${escapeHtml(item.title)}</strong>
            <p>${escapeHtml(item.detail || item.meta || "")}</p>
          </div>
        </article>
      `).join("") : `<article class="summary-card"><h3>Aucune alerte</h3><p class="muted-copy">La classe ne presente pas d'alerte majeure sur cette vue.</p></article>`;
    };

    render();
    if (!classSelect.dataset.reportsBound) {
      classSelect.dataset.reportsBound = "true";
      classSelect.addEventListener("change", render);
      exportButton.addEventListener("click", () => {
        const classItem = getClassById(classSelect.value);
        const domainsHtml = document.querySelector("#reports-domains-content")?.innerHTML || "";
        const archivesHtml = document.querySelector("#reports-archives-content")?.innerHTML || "";
        const html = buildPrintShell(
          `Rapport premium - ${classItem?.name || ""}`,
          `${classItem?.name || ""} // ${new Date().toLocaleDateString("fr-FR")}`,
          `
            <div class="card">
              <p><strong>Classe :</strong> ${escapeHtml(classItem?.name || "-")}</p>
              <p><strong>Annee :</strong> ${escapeHtml(classItem?.year || "-")}</p>
              <p><strong>Indicateurs :</strong> ${kpis.textContent.replace(/\s+/g, " ").trim()}</p>
            </div>
            ${alerts.innerHTML}
            ${domainsHtml ? `<div class="grid"><section class="card"><h2>Equilibre pedagogique</h2>${domainsHtml}</section></div>` : ""}
            ${archivesHtml ? `<div class="grid"><section class="card"><h2>Archives recentes</h2>${archivesHtml}</section></div>` : ""}
          `
        );
        printHtmlDocument(`Rapport premium ${classItem?.name || ""}`, html);
      });
    }
  }

  function renderEvidenceFiltersSafe() {
    if (document.body?.dataset?.page !== "evaluations") return;
    const classSelect = document.querySelector("#eval-class-select");
    const studentSelect = document.querySelector("#eval-student-select");
    const list = document.querySelector("#evidence-list");
    const addButton = document.querySelector("#evidence-add-button");
    if (!classSelect || !studentSelect || !list || !addButton) return;

    let toolbar = document.querySelector("#evidence-filter-toolbar");
    if (!toolbar) {
      toolbar = document.createElement("div");
      toolbar.id = "evidence-filter-toolbar";
      toolbar.className = "mini-grid evidence-filter-toolbar";
      toolbar.innerHTML = `
        <label class="field">
          <span>Filtre competence</span>
          <select id="evidence-filter-skill">
            <option value="all">Toutes</option>
          </select>
        </label>
        <label class="field">
          <span>Filtre type</span>
          <select id="evidence-filter-type">
            <option value="all">Tous</option>
            <option value="Production">Production</option>
            <option value="Observation">Observation</option>
            <option value="Document">Document</option>
            <option value="PFMP">PFMP</option>
            <option value="Commentaire">Commentaire</option>
          </select>
        </label>
        <label class="field">
          <span>Recherche</span>
          <input id="evidence-filter-search" type="text" placeholder="Titre ou note">
        </label>
        <div class="student-badges filter-actions">
          <button id="evidence-export-pdf" class="ghost-button" type="button">Exporter PDF preuves</button>
        </div>
      `;
      list.insertAdjacentElement("beforebegin", toolbar);
    }

    const skillFilter = document.querySelector("#evidence-filter-skill");
    const typeFilter = document.querySelector("#evidence-filter-type");
    const searchFilter = document.querySelector("#evidence-filter-search");
    const exportButton = document.querySelector("#evidence-export-pdf");
    if (!skillFilter || !typeFilter || !searchFilter || !exportButton) return;

    skillFilter.innerHTML = `<option value="all">Toutes</option>${skillCatalog.map((skill) => `<option value="${skill.id}">${skill.code} // ${skill.title}</option>`).join("")}`;

    const render = () => {
      const classId = classSelect.value || app.classes[0]?.id || "";
      const student = getStudentById(studentSelect.value) || getStudentsByClass(classId)[0] || null;
      if (!student) {
        list.innerHTML = `<article class="directory-row"><div><strong>Aucune preuve</strong><p>Aucun eleve selectionne.</p></div></article>`;
        return;
      }
      let entries = (app.evidencePortfolio || []).filter((entry) => entry.studentId === student.id);
      if (skillFilter.value !== "all") entries = entries.filter((entry) => entry.skillId === skillFilter.value);
      if (typeFilter.value !== "all") entries = entries.filter((entry) => entry.type === typeFilter.value);
      if (searchFilter.value.trim()) {
        const needle = normalizeText(searchFilter.value);
        entries = entries.filter((entry) => normalizeText(`${entry.title} ${entry.note} ${entry.url}`).includes(needle));
      }
      entries.sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
      list.innerHTML = entries.length ? entries.map((entry) => {
        const skill = getSkillById(entry.skillId);
        return `
          <article class="directory-row">
            <div>
              <strong>${escapeHtml(entry.title || "Preuve")}</strong>
              <p>${escapeHtml(skill?.code || entry.skillId || "-")} // ${escapeHtml(skill?.title || "Competence")} // ${escapeHtml(entry.type || "-")}</p>
              <p>${escapeHtml(entry.date || "-")} // ${escapeHtml(entry.note || "Sans commentaire")}</p>
              ${entry.url ? `<p><a href="${escapeHtml(entry.url)}" target="_blank" rel="noreferrer">Ouvrir la preuve</a></p>` : ""}
            </div>
            <div class="student-badges">
              <button class="ghost-button evidence-delete-button" type="button" data-id="${entry.id}">Supprimer</button>
            </div>
          </article>
        `;
      }).join("") : `<article class="directory-row"><div><strong>Aucune preuve</strong><p>Aucune preuve ne correspond aux filtres actifs.</p></div></article>`;
      list.querySelectorAll(".evidence-delete-button").forEach((button) => {
        button.addEventListener("click", () => {
          app.evidencePortfolio = (app.evidencePortfolio || []).filter((entry) => entry.id !== button.dataset.id);
          persistAppData();
          window.setTimeout(render, 0);
        });
      });
    };

    if (!classSelect.dataset.evidenceFilterBound) {
      classSelect.dataset.evidenceFilterBound = "true";
      classSelect.addEventListener("change", () => window.setTimeout(render, 0));
    }
    if (!studentSelect.dataset.evidenceFilterBound) {
      studentSelect.dataset.evidenceFilterBound = "true";
      studentSelect.addEventListener("change", () => window.setTimeout(render, 0));
    }
    [skillFilter, typeFilter, searchFilter].forEach((input) => {
      if (input.dataset.evidenceFilterBound) return;
      input.dataset.evidenceFilterBound = "true";
      input.addEventListener("input", render);
      input.addEventListener("change", render);
    });
    if (!addButton.dataset.evidenceFilterBound) {
      addButton.dataset.evidenceFilterBound = "true";
      addButton.addEventListener("click", () => window.setTimeout(render, 0));
    }
    if (!exportButton.dataset.evidenceFilterBound) {
      exportButton.dataset.evidenceFilterBound = "true";
      exportButton.addEventListener("click", () => {
        const classId = classSelect.value || app.classes[0]?.id || "";
        const student = getStudentById(studentSelect.value) || getStudentsByClass(classId)[0] || null;
        if (!student) return;
        const html = buildPrintShell(
          `Portefeuille de preuves - ${student.name}`,
          `${getClassById(student.classId)?.name || ""} // ${student.name}`,
          list.innerHTML
        );
        printHtmlDocument(`Preuves ${student.name}`, html);
      });
    }
    render();
  }

  function exportArchiveSessionJsonSafe(archiveId) {
    const archive = (app.archives || []).find((entry) => entry.id === archiveId);
    if (!archive) return;
    const blob = new Blob([JSON.stringify(archive, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slugify(archive.label || "archive")}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function exportArchiveSessionPdfSafe(archiveId) {
    const archive = (app.archives || []).find((entry) => entry.id === archiveId);
    if (!archive) return;
    const html = buildPrintShell(
      `Archive - ${archive.label}`,
      `${archive.sessionYear || ""} // ${new Date(archive.archivedAt).toLocaleDateString("fr-FR")}`,
      `
        <div class="card">
          <p><strong>Session :</strong> ${escapeHtml(archive.label || "-")}</p>
          <p><strong>Note :</strong> ${escapeHtml(archive.summary || "-")}</p>
          <p><strong>Classes :</strong> ${archive.classes.length}</p>
          <p><strong>Eleves :</strong> ${archive.students.length}</p>
          <p><strong>Seances :</strong> ${archive.evaluationActivities.length}</p>
          <p><strong>Preuves :</strong> ${(archive.evidencePortfolio || []).length}</p>
        </div>
        <table>
          <thead><tr><th>Eleve</th><th>Classe</th><th>Progression</th></tr></thead>
          <tbody>
            ${(archive.students || []).map((student) => `<tr><td>${escapeHtml(student.name)}</td><td>${escapeHtml(archive.classes.find((item) => item.id === student.classId)?.name || "-")}</td><td>${getStudentProgress(student)}%</td></tr>`).join("")}
          </tbody>
        </table>
      `
    );
    printHtmlDocument(`Archive ${archive.label}`, html);
  }

  function enrichReportsPageSafe() {
    if (document.body?.dataset?.page !== "reports") return;
    const main = document.querySelector("main.dashboard-layout");
    const classSelect = document.querySelector("#reports-class-select");
    if (!main || !classSelect) return;

    let domainsPanel = document.querySelector("#reports-domains-panel");
    if (!domainsPanel) {
      domainsPanel = document.createElement("section");
      domainsPanel.id = "reports-domains-panel";
      domainsPanel.className = "panel";
      domainsPanel.innerHTML = `
        <div class="section-head">
          <div>
            <p class="eyebrow">Domaines</p>
            <h2>Equilibre pedagogique</h2>
          </div>
        </div>
        <div id="reports-domains-content" class="class-cards"></div>
      `;
      main.appendChild(domainsPanel);
    }

    let archivesPanel = document.querySelector("#reports-archives-panel");
    if (!archivesPanel) {
      archivesPanel = document.createElement("section");
      archivesPanel.id = "reports-archives-panel";
      archivesPanel.className = "panel";
      archivesPanel.innerHTML = `
        <div class="section-head">
          <div>
            <p class="eyebrow">Session</p>
            <h2>Resume archivage</h2>
          </div>
        </div>
        <div id="reports-archives-content" class="student-directory"></div>
      `;
      main.appendChild(archivesPanel);
    }

    const domainsContent = document.querySelector("#reports-domains-content");
    const archivesContent = document.querySelector("#reports-archives-content");
    if (!domainsContent || !archivesContent) return;

    const render = () => {
      const classId = classSelect.value || app.classes[0]?.id || "";
      const students = getStudentsByClass(classId);
      domainsContent.innerHTML = referentialDomains.map((domain) => {
        const domainSkills = skillCatalog.filter((skill) => getSkillDomain(skill) === domain);
        const progress = students.length
          ? Math.round(students.reduce((sum, student) => {
              const score = domainSkills.reduce((skillSum, skill) => skillSum + (levelScores[student.skills?.[skill.id]] || 0), 0);
              const max = Math.max(domainSkills.length * (levelScores.acquis || 1), 1);
              return sum + Math.round((score / max) * 100);
            }, 0) / students.length)
          : 0;
        return `
          <article class="summary-card">
            <h3>${escapeHtml(domain)}</h3>
            <p class="muted-copy">${domainSkills.length} competence(s)</p>
            <div class="pfmp-kpis">
              <span class="badge">${progress}%</span>
            </div>
          </article>
        `;
      }).join("");

      const latestArchives = (app.archives || []).slice(0, 3);
      archivesContent.innerHTML = latestArchives.length ? latestArchives.map((archive) => `
        <article class="directory-row compact">
          <div>
            <strong>${escapeHtml(archive.label)}</strong>
            <p>${escapeHtml(archive.summary || "-")}</p>
            <p>${archive.students.length} eleve(s) // ${archive.classes.length} classe(s)</p>
          </div>
        </article>
      `).join("") : `<article class="summary-card"><h3>Aucune archive</h3><p class="muted-copy">Les sessions archivees apparaitront ici.</p></article>`;
    };

    render();
    if (!classSelect.dataset.reportsEnrichedBound) {
      classSelect.dataset.reportsEnrichedBound = "true";
      classSelect.addEventListener("change", render);
    }
  }

  const originalInitBulletinPageSafeLot = initBulletinPage;
  initBulletinPage = function () {
    originalInitBulletinPageSafeLot();
    window.setTimeout(ensureJourneyPanelSafe, 0);
  };

  const originalInitAccountsPageSafeLot = initAccountsPageFinal;
  initAccountsPageFinal = function () {
    originalInitAccountsPageSafeLot();
    window.setTimeout(() => renderArchiveEnhancementSafe(), 0);
  };

  const originalInitCandidatePageSafeLot = initCandidatePageFinal;
  initCandidatePageFinal = function () {
    originalInitCandidatePageSafeLot();
    window.setTimeout(renderExamFinalizationSafe, 0);
    const classSelect = document.querySelector("#candidate-class-select");
    const studentSelect = document.querySelector("#candidate-student-select");
    const inputs = [
      document.querySelector("#candidate-number"),
      document.querySelector("#candidate-date"),
      document.querySelector("#candidate-academy"),
      document.querySelector("#candidate-school"),
      document.querySelector("#candidate-grid-file")
    ].filter(Boolean);
    if (classSelect && !classSelect.dataset.examSafeFinalBound) {
      classSelect.dataset.examSafeFinalBound = "true";
      classSelect.addEventListener("change", () => window.setTimeout(renderExamFinalizationSafe, 0));
    }
    if (studentSelect && !studentSelect.dataset.examSafeFinalBound) {
      studentSelect.dataset.examSafeFinalBound = "true";
      studentSelect.addEventListener("change", () => window.setTimeout(renderExamFinalizationSafe, 0));
    }
    inputs.forEach((input) => {
      if (input.dataset.examSafeFinalBound) return;
      input.dataset.examSafeFinalBound = "true";
      input.addEventListener("change", () => window.setTimeout(renderExamFinalizationSafe, 0));
    });
  };

  const originalInitEvaluationsPageSafeLot = initEvaluationsPageFinal;
  initEvaluationsPageFinal = function () {
    originalInitEvaluationsPageSafeLot();
    window.setTimeout(renderEvidenceFiltersSafe, 0);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      if (document.body?.dataset?.page === "reports") {
        initReportsPageFinalSafe();
        window.setTimeout(enrichReportsPageSafe, 0);
      }
    }, { once: true });
  } else if (document.body?.dataset?.page === "reports") {
    initReportsPageFinalSafe();
    window.setTimeout(enrichReportsPageSafe, 0);
  }
})();

(() => {
  const originalInitEvaluationsPageFinalLastSafe = typeof initEvaluationsPageFinal === "function" ? initEvaluationsPageFinal : null;
  if (!originalInitEvaluationsPageFinalLastSafe) return;

  initEvaluationsPageFinal = function () {
    originalInitEvaluationsPageFinalLastSafe();
    window.setTimeout(() => window.__cielScheduleActivityCardsLayoutSafe?.(), 0);
    window.setTimeout(() => window.__cielScheduleActivityCardsLayoutSafe?.(), 120);
    window.setTimeout(() => window.__cielScheduleActivityCardsLayoutSafe?.(), 260);
  };
})();

(() => {
  function shouldForceVerticalActivityCardsUltimateSafe() {
    if (document.body?.dataset?.page !== "evaluations") return false;
    const matrix = document.querySelector("#activity-matrix");
    if (!matrix) return false;
    if (matrix.querySelector(".activity-student-card")) return false;
    const explicitActivityId = matrix.dataset.renderActivityId || document.querySelector("#activity-select")?.value || "";
    const explicitActivity = getActivityById(explicitActivityId);
    if (explicitActivity && !matrix.children.length) return true;
    return matrix.classList.contains("activity-grid")
      || Boolean(matrix.querySelector(".matrix-header, .matrix-row, .activity-header, .activity-row"));
  }

  function renderVerticalActivityCardsUltimateSafe() {
    if (!shouldForceVerticalActivityCardsUltimateSafe()) return;
    window.__cielRenderActivityCardsLayoutSafe?.();
  }

  let activityCardsUltimateToken = 0;
  function scheduleVerticalActivityCardsUltimateSafe() {
    if (document.body?.dataset?.page !== "evaluations") return;
    const token = ++activityCardsUltimateToken;
    const runner = () => {
      if (token !== activityCardsUltimateToken) return;
      renderVerticalActivityCardsUltimateSafe();
    };
    runner();
    window.requestAnimationFrame(runner);
    [30, 90, 180, 320].forEach((delay) => window.setTimeout(runner, delay));
  }

  function bindVerticalActivityCardsUltimateSafe() {
    if (document.body?.dataset?.page !== "evaluations") return;
    if (document.body.dataset.verticalCardsUltimateBound === "true") return;
    document.body.dataset.verticalCardsUltimateBound = "true";

    const schedule = () => scheduleVerticalActivityCardsUltimateSafe();

    [
      "#activity-select",
      "#session-class-select",
      "#eval-class-select",
      "#eval-student-select",
      "#activity-search-input"
    ].forEach((selector) => {
      const element = document.querySelector(selector);
      if (!element || element.dataset.verticalCardsUltimateBound === "true") return;
      element.dataset.verticalCardsUltimateBound = "true";
      element.addEventListener("change", schedule);
      if (selector === "#activity-search-input") {
        element.addEventListener("input", schedule);
      }
    });

    [
      "#activity-form",
      "#activity-duplicate-button",
      "#activity-edit-button",
      "#activity-delete-button",
      "#activity-cancel-edit",
      "#activity-submit-button"
    ].forEach((selector) => {
      const element = document.querySelector(selector);
      if (!element || element.dataset.verticalCardsUltimateActionBound === "true") return;
      element.dataset.verticalCardsUltimateActionBound = "true";
      element.addEventListener("click", schedule, true);
      if (element instanceof HTMLFormElement) {
        element.addEventListener("submit", schedule, true);
      }
    });

    const bodyObserver = new MutationObserver(() => {
      if (shouldForceVerticalActivityCardsUltimateSafe()) scheduleVerticalActivityCardsUltimateSafe();
    });
    bodyObserver.observe(document.body, { childList: true, subtree: true });

    scheduleVerticalActivityCardsUltimateSafe();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindVerticalActivityCardsUltimateSafe, { once: true });
  } else {
    bindVerticalActivityCardsUltimateSafe();
  }
})();


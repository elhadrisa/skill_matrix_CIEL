(function () {
  const AI_ACTIVITY_STORAGE_KEY = "cielai-last-created-activity-id";
  const AI_CLASS_STORAGE_KEY = "cielai-last-created-class-id";
  const PDF_WORKER_SRC = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

  const AI_SKILL_RULES = {
    c1: {
      keywords: ["communication", "compte rendu", "restitution", "documentation", "présentation", "oral", "support", "consigne", "rapport", "justification"],
      defaults: ["Restituer clairement la démarche et les résultats", "Employer un vocabulaire technique adapté", "Produire une trace écrite exploitable"],
      domain: "Cybersécurité"
    },
    c3: {
      keywords: ["projet", "planning", "jalon", "organisation", "coordination", "livrable", "cahier des charges", "équipe", "étape"],
      defaults: ["Identifier les étapes du projet", "Respecter l'organisation attendue", "Produire un livrable conforme au besoin"],
      domain: "Cybersécurité"
    },
    c4: {
      keywords: ["analyse", "architecture", "matérielle", "logicielle", "structure", "schéma", "adressage", "besoin", "topologie", "préfixe"],
      defaults: ["Analyser la structure matérielle et logicielle", "Identifier les éléments techniques utiles", "Justifier les choix techniques retenus"],
      domain: "Réseau Informatique"
    },
    c6: {
      keywords: ["validation", "conformité", "test", "contrôle", "vérifier", "attendu", "recette", "mesure", "comparaison"],
      defaults: ["Vérifier la conformité au besoin", "Réaliser les tests attendus", "Conclure sur la validité de la solution"],
      domain: "Réseau Informatique"
    },
    c7: {
      keywords: ["prototype", "maquette", "simulation", "preuve de concept", "prototypage", "essai", "montage d'essai"],
      defaults: ["Réaliser une maquette exploitable", "Tester le prototype en conditions définies", "Valider la solution avant déploiement"],
      domain: "Electronique"
    },
    c8: {
      keywords: ["code", "coder", "script", "python", "programme", "automatisation", "fonction", "algorithme", "débogage", "débug"],
      defaults: ["Produire un code lisible et structuré", "Automatiser la tâche demandée", "Valider le fonctionnement du code"],
      domain: "Cybersécurité"
    },
    c9: {
      keywords: ["installation", "installer", "montage", "câblage", "mise en service", "composant", "équipement", "déploiement", "raccordement"],
      defaults: ["Installer les éléments dans le bon ordre", "Réaliser une mise en service cohérente", "Contrôler le fonctionnement après installation"],
      domain: "Electronique"
    },
    c10: {
      keywords: ["réseau", "vlan", "ipv4", "ipv6", "ip", "routage", "switch", "routeur", "broadcast", "passerelle", "masque", "pkt", "adresse"],
      defaults: ["Configurer le réseau conformément au besoin", "Valider le fonctionnement des services réseau", "Analyser le trafic ou l'adressage avec cohérence"],
      domain: "Réseau Informatique"
    },
    c11: {
      keywords: ["maintenance", "diagnostic", "panne", "incident", "erreur", "dépannage", "correction", "résolution", "rétablissement"],
      defaults: ["Diagnostiquer le dysfonctionnement", "Corriger l'incident ou l'erreur constatée", "Vérifier le rétablissement du service"],
      domain: "Réseau Informatique"
    }
  };

  const state = {
    analyzed: false,
    insights: null,
    groupedIndicators: [],
    sourceStats: null
  };

  function safeRepair(value) {
    if (typeof repairDisplaySourceString === "function") return repairDisplaySourceString(String(value || ""));
    return String(value || "");
  }

  function escapeHtmlSafe(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getNodes() {
    return {
      fileInput: document.querySelector("#cielai-file"),
      classSelect: document.querySelector("#cielai-class"),
      startDate: document.querySelector("#cielai-start-date"),
      endDate: document.querySelector("#cielai-end-date"),
      analyzeButton: document.querySelector("#cielai-analyze"),
      createButton: document.querySelector("#cielai-create"),
      createOpenButton: document.querySelector("#cielai-create-open"),
      feedback: document.querySelector("#cielai-feedback"),
      typeSelect: document.querySelector("#cielai-type"),
      titleInput: document.querySelector("#cielai-title"),
      skillsSelect: document.querySelector("#cielai-skills"),
      commentInput: document.querySelector("#cielai-comment"),
      insights: document.querySelector("#cielai-insights"),
      groups: document.querySelector("#cielai-indicators-groups")
    };
  }

  function setFeedback(message) {
    const { feedback } = getNodes();
    if (feedback) feedback.textContent = safeRepair(message);
  }

  function getToday() {
    return new Date().toISOString().slice(0, 10);
  }

  function buildSkillOptionLabel(skill) {
    return `${skill.code} - ${safeRepair(skill.title)}`;
  }

  function populateSkillsSelect(select) {
    if (!select) return;
    select.innerHTML = skillCatalog.map((skill) => `<option value="${skill.id}">${escapeHtmlSafe(buildSkillOptionLabel(skill))}</option>`).join("");
  }

  async function readPdfText(file) {
    if (!window.pdfjsLib) throw new Error("Le lecteur PDF n'est pas disponible.");
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_SRC;
    const buffer = await file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument({ data: buffer }).promise;
    const pages = [];
    for (let pageIndex = 1; pageIndex <= pdf.numPages; pageIndex += 1) {
      const page = await pdf.getPage(pageIndex);
      const content = await page.getTextContent();
      const text = content.items.map((item) => item.str).join(" ");
      pages.push(text);
    }
    return pages.join("\n");
  }

  async function readDocxText(file) {
    if (!window.mammoth) throw new Error("Le lecteur Word n'est pas disponible.");
    const buffer = await file.arrayBuffer();
    const result = await window.mammoth.extractRawText({ arrayBuffer: buffer });
    return result.value || "";
  }

  async function readFileText(file) {
    const name = String(file?.name || "").toLowerCase();
    if (name.endsWith(".pdf")) return readPdfText(file);
    if (name.endsWith(".docx")) return readDocxText(file);
    if (name.endsWith(".txt")) return file.text();
    throw new Error("Format non pris en charge. Utilise un PDF, un DOCX ou un TXT.");
  }

  function normalizeLine(line) {
    return safeRepair(line)
      .replace(/^[\s•\-–—*]+/, "")
      .replace(/^\d+[\.\)]\s+/, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function extractRawLines(text) {
    return String(text || "")
      .split(/\r?\n+/)
      .map(normalizeLine)
      .filter(Boolean);
  }

  function extractUsefulLines(text) {
    const seen = new Set();
    return extractRawLines(text)
      .filter((line) => line.length >= 10 && line.length <= 180)
      .filter((line) => /[a-zàâçéèêëîïôûùüÿñæœ]/i.test(line))
      .filter((line) => {
        const key = normalizeText(line);
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }

  function tokenizeWords(text) {
    return normalizeText(text)
      .split(/[^a-z0-9]+/i)
      .map((item) => item.trim())
      .filter((item) => item.length >= 3);
  }

  function inferType(text, fileName) {
    const haystack = normalizeText(`${text}\n${fileName}`);
    if (/(^|\b)(td|travaux diriges|questionnaire|exercice|exercices)\b/.test(haystack)) return "TD";
    return "TP";
  }

  function inferTitle(lines, fileName, inferredType) {
    const candidate = lines.find((line) =>
      line.length <= 96
      && !/^(nom|prénom|prenom|classe|durée|duree|compétence|competence|objectifs?|consignes?)/i.test(normalizeText(line))
    );
    if (candidate) return candidate;
    const base = safeRepair(fileName || "Séance")
      .replace(/\.[^.]+$/, "")
      .replace(/[_-]+/g, " ")
      .trim();
    return `${inferredType} ${base || "CIEL"}`.trim();
  }

  function scoreSkill(skillId, fullText, lines, fileName) {
    const rule = AI_SKILL_RULES[skillId];
    if (!rule) return 0;
    const haystack = normalizeText(`${fullText}\n${fileName}`);
    let score = 0;
    rule.keywords.forEach((keyword) => {
      const key = normalizeText(keyword);
      const haystackMatches = haystack.includes(key) ? 3 : 0;
      const lineMatches = lines.filter((line) => normalizeText(line).includes(key)).length;
      score += haystackMatches + lineMatches;
    });
    return score;
  }

  function inferSkillScores(text, lines, fileName) {
    return skillCatalog
      .map((skill) => ({
        skillId: skill.id,
        score: scoreSkill(skill.id, text, lines, fileName)
      }))
      .sort((a, b) => b.score - a.score);
  }

  function inferSkillIds(scored) {
    const positive = scored.filter((item) => item.score > 0);
    if (!positive.length) return ["c1"];
    const best = positive[0].score;
    const kept = positive
      .filter((item, index) => index < 4 && item.score >= Math.max(1, best * 0.35))
      .map((item) => item.skillId);
    return kept.length ? kept : [positive[0].skillId];
  }

  function inferSkillForLine(line, selectedSkillIds) {
    if (selectedSkillIds.length === 1) return selectedSkillIds[0];
    const normalized = normalizeText(line);
    let bestSkillId = selectedSkillIds[0] || "";
    let bestScore = -1;
    selectedSkillIds.forEach((skillId) => {
      const rule = AI_SKILL_RULES[skillId];
      const score = (rule?.keywords || []).reduce((sum, keyword) => sum + (normalized.includes(normalizeText(keyword)) ? 1 : 0), 0);
      if (score > bestScore) {
        bestScore = score;
        bestSkillId = skillId;
      }
    });
    return bestSkillId;
  }

  function lineLooksLikeIndicator(line) {
    const normalized = normalizeText(line);
    if (normalized.length < 8) return false;
    if (/^(nom|prenom|classe|date|consignes?|documents?|ressources?|materiel|bar[eè]me|objectif|competence|dur[ée]e)$/.test(normalized)) return false;
    return /(?:configur|verifi|analyse|identifier|installer|mettre en service|coder|documenter|diagnosti|corriger|tester|realiser|utiliser|presenter|organiser|calcul|attribuer|interpreter|detecter|superviser|maintenir)/i.test(normalized);
  }

  function cleanIndicatorLabel(line) {
    return normalizeLine(line)
      .replace(/[.;:]+$/, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function pickIndicatorCandidates(lines, selectedSkillIds) {
    const useful = lines
      .filter(lineLooksLikeIndicator)
      .map(cleanIndicatorLabel)
      .filter(Boolean);

    const grouped = new Map(selectedSkillIds.map((skillId) => [skillId, []]));

    useful.forEach((line) => {
      const skillId = inferSkillForLine(line, selectedSkillIds);
      const current = grouped.get(skillId) || [];
      if (!current.some((item) => normalizeText(item) === normalizeText(line)) && current.length < 6) {
        current.push(line);
      }
      grouped.set(skillId, current);
    });

    selectedSkillIds.forEach((skillId) => {
      const current = grouped.get(skillId) || [];
      const defaults = AI_SKILL_RULES[skillId]?.defaults || [];
      let cursor = 0;
      while (current.length < 3 && defaults[cursor]) {
        const fallback = safeRepair(defaults[cursor]);
        if (!current.some((item) => normalizeText(item) === normalizeText(fallback))) {
          current.push(fallback);
        }
        cursor += 1;
      }
      grouped.set(skillId, current.slice(0, 6));
    });

    return grouped;
  }

  function buildComment(lines, selectedSkillIds) {
    const intro = lines.slice(0, 4).join(" ");
    const skills = selectedSkillIds.map((skillId) => getSkillById(skillId)?.code).filter(Boolean).join(", ");
    return `Séance analysée par CielAI. Compétences pressenties : ${skills || "à vérifier"}.\n${intro}`.trim();
  }

  function buildInsights(lines, selectedSkillIds, scoredSkills, fileName) {
    const topScores = scoredSkills
      .filter((item) => selectedSkillIds.includes(item.skillId))
      .map((item) => {
        const skill = getSkillById(item.skillId);
        return {
          skillId: item.skillId,
          label: skill ? `${skill.code} - ${safeRepair(skill.title)}` : item.skillId,
          score: item.score
        };
      });
    const maxScore = Math.max(...topScores.map((item) => item.score), 1);
    const skillConfidence = topScores.map((item) => ({
      ...item,
      confidence: Math.max(35, Math.min(98, Math.round((item.score / maxScore) * 100)))
    }));

    const domains = [...new Set(selectedSkillIds.map((skillId) => AI_SKILL_RULES[skillId]?.domain || getSkillDomain(getSkillById(skillId))) )].filter(Boolean);
    const tokens = tokenizeWords(lines.join(" "));
    const frequency = new Map();
    tokens.forEach((token) => {
      frequency.set(token, (frequency.get(token) || 0) + 1);
    });
    const cues = [...frequency.entries()]
      .sort((a, b) => b[1] - a[1])
      .filter(([token]) => token.length >= 4)
      .slice(0, 8)
      .map(([token]) => token);

    return {
      domains,
      cues,
      skillConfidence,
      stats: {
        fileName: safeRepair(fileName),
        usefulLines: lines.length
      }
    };
  }

  function analyzeDocument(text, fileName) {
    const repairedText = safeRepair(text).replace(/\u0000/g, " ").trim();
    const lines = extractUsefulLines(repairedText);
    const type = inferType(repairedText, fileName);
    const title = inferTitle(lines, fileName, type);
    const scoredSkills = inferSkillScores(repairedText, lines, fileName);
    const skillIds = inferSkillIds(scoredSkills);
    const groupedIndicatorsMap = pickIndicatorCandidates(lines, skillIds);
    const groupedIndicators = skillIds.map((skillId) => ({
      skillId,
      indicators: groupedIndicatorsMap.get(skillId) || []
    }));

    return {
      type,
      title,
      skillIds,
      groupedIndicators,
      comment: buildComment(lines, skillIds),
      insights: buildInsights(lines, skillIds, scoredSkills, fileName)
    };
  }

  function getGroupedIndicatorsFromEditors() {
    return [...document.querySelectorAll("[data-cielai-skill-group]")]
      .map((section) => {
        const skillId = section.dataset.cielaiSkillGroup || "";
        const textarea = section.querySelector("textarea");
        const indicators = String(textarea?.value || "")
          .split(/\r?\n/)
          .map((line) => cleanIndicatorLabel(line))
          .filter(Boolean);
        return { skillId, indicators };
      })
      .filter((group) => group.skillId && group.indicators.length);
  }

  function renderInsights() {
    const { insights } = getNodes();
    if (!insights) return;
    if (!state.insights) {
      insights.innerHTML = `
        <article class="summary-card">
          <h3>En attente</h3>
          <p class="muted-copy">Charge un document pour obtenir une lecture pédagogique et les compétences pressenties.</p>
        </article>
      `;
      return;
    }

    const domains = state.insights.domains.length
      ? state.insights.domains.map((domain) => `<span class="badge accent">${escapeHtmlSafe(domain)}</span>`).join("")
      : `<span class="badge">À préciser</span>`;

    const cues = state.insights.cues.length
      ? state.insights.cues.map((cue) => `<span class="badge">${escapeHtmlSafe(cue)}</span>`).join("")
      : `<span class="badge">Aucun mot-clé dominant</span>`;

    const confidence = state.insights.skillConfidence.length
      ? state.insights.skillConfidence.map((item) => `
          <article class="summary-card">
            <h3>${escapeHtmlSafe(item.label)}</h3>
            <p class="muted-copy">Confiance estimée</p>
            <span class="stat-value">${item.confidence}%</span>
          </article>
        `).join("")
      : `<article class="summary-card"><h3>Compétences</h3><p class="muted-copy">Aucune compétence détectée.</p></article>`;

    insights.innerHTML = `
      <article class="summary-card">
        <h3>Lecture du document</h3>
        <p class="muted-copy">${escapeHtmlSafe(state.insights.stats.fileName)} // ${state.insights.stats.usefulLines} ligne(s) utiles retenue(s)</p>
        <div class="student-badges">${domains}</div>
      </article>
      <article class="summary-card">
        <h3>Indices détectés</h3>
        <div class="student-badges">${cues}</div>
      </article>
      ${confidence}
    `;
  }

  function renderGroupedIndicators() {
    const { groups } = getNodes();
    if (!groups) return;
    if (!state.groupedIndicators.length) {
      groups.innerHTML = `<article class="summary-card"><h3>Aucun indicateur</h3><p class="muted-copy">Analyse un document pour générer les indicateurs par compétence.</p></article>`;
      return;
    }
    groups.innerHTML = state.groupedIndicators.map((group) => {
      const skill = getSkillById(group.skillId);
      return `
        <article class="summary-card cielai-skill-card" data-cielai-skill-group="${group.skillId}">
          <h3>${escapeHtmlSafe(skill ? `${skill.code} - ${safeRepair(skill.title)}` : group.skillId)}</h3>
          <p class="muted-copy">${group.indicators.length} indicateur(s) proposé(s)</p>
          <label class="field">
            <span>Indicateurs</span>
            <textarea rows="${Math.max(4, group.indicators.length + 1)}">${escapeHtmlSafe(group.indicators.join("\n"))}</textarea>
          </label>
        </article>
      `;
    }).join("");
  }

  function syncStateFromSelectedSkills() {
    const { skillsSelect } = getNodes();
    if (!skillsSelect) return;
    const selectedSkillIds = getSelectedValues(skillsSelect);
    const currentBySkill = new Map(state.groupedIndicators.map((group) => [group.skillId, group.indicators]));
    state.groupedIndicators = selectedSkillIds.map((skillId) => ({
      skillId,
      indicators: currentBySkill.get(skillId)?.length ? currentBySkill.get(skillId) : [...(AI_SKILL_RULES[skillId]?.defaults || [])]
    }));
    renderGroupedIndicators();
  }

  function setAnalysisResult(result) {
    const nodes = getNodes();
    if (!nodes.typeSelect || !nodes.titleInput || !nodes.skillsSelect || !nodes.commentInput) return;
    nodes.typeSelect.value = result.type;
    nodes.titleInput.value = result.title;
    setMultiSelectValues(nodes.skillsSelect, result.skillIds);
    nodes.commentInput.value = result.comment;
    state.groupedIndicators = result.groupedIndicators.map((group) => ({
      skillId: group.skillId,
      indicators: [...group.indicators]
    }));
    state.insights = result.insights;
    state.analyzed = true;
    renderInsights();
    renderGroupedIndicators();
    nodes.createButton.disabled = false;
    nodes.createOpenButton.disabled = false;
  }

  function buildActivityPayload() {
    const nodes = getNodes();
    const selectedSkillIds = getSelectedValues(nodes.skillsSelect);
    const groupedIndicators = getGroupedIndicatorsFromEditors();
    const indicators = normalizeActivityIndicatorsBySkillSafe(
      groupedIndicators.flatMap((group) => group.indicators.map((label, index) => ({
        id: slugify(`${nodes.titleInput.value || "indicator"}-${group.skillId}-${index}-${Date.now()}`),
        label,
        skillId: group.skillId
      }))),
      selectedSkillIds
    );

    return {
      title: (nodes.titleInput.value || "").trim(),
      type: nodes.typeSelect.value || "TP",
      classId: nodes.classSelect.value || "",
      startDate: nodes.startDate.value || "",
      endDate: nodes.endDate.value || nodes.startDate.value || "",
      comment: (nodes.commentInput.value || "").trim(),
      skillIds: selectedSkillIds,
      indicators
    };
  }

  function createActivityFromAi(openAfterCreate) {
    const payload = buildActivityPayload();
    if (!payload.title || !payload.classId || !payload.skillIds.length || !payload.indicators.length) {
      setFeedback("Vérifie le titre, la classe, les compétences et les indicateurs avant création.");
      return;
    }
    if (!payload.startDate || !payload.endDate) {
      setFeedback("Renseigne la date de début et la date de fin.");
      return;
    }

    const activity = hydrateEvaluationActivity({
      id: slugify(`${payload.title}-${Date.now()}`),
      title: payload.title,
      type: payload.type,
      classId: payload.classId,
      skillId: payload.skillIds[0],
      skillIds: payload.skillIds,
      date: payload.startDate,
      startDate: payload.startDate,
      endDate: payload.endDate,
      comment: payload.comment,
      indicators: payload.indicators,
      evaluations: {}
    }, app.evaluationActivities.length);

    app.evaluationActivities.push(activity);
    logAction("Séance créée via CielAI", activity.title, `${activity.type} // ${getClassById(activity.classId)?.name || activity.classId}`);
    persistAppData();
    localStorage.setItem(AI_ACTIVITY_STORAGE_KEY, activity.id);
    localStorage.setItem(AI_CLASS_STORAGE_KEY, activity.classId);
    setFeedback(`Séance créée : ${activity.title}.`);

    if (openAfterCreate) {
      window.location.href = `evaluations.html?class=${encodeURIComponent(activity.classId)}&view=session`;
    }
  }

  async function analyzeSelectedFile() {
    const { fileInput } = getNodes();
    const file = fileInput?.files?.[0];
    if (!file) {
      setFeedback("Choisis d'abord un fichier PDF, DOCX ou TXT.");
      return;
    }
    setFeedback("Analyse en cours...");
    try {
      const extractedText = await readFileText(file);
      const result = analyzeDocument(extractedText, file.name);
      setAnalysisResult(result);
      setFeedback("Document analysé. Vérifie la proposition puis crée la séance.");
    } catch (error) {
      setFeedback(error?.message || "Impossible d'analyser ce document.");
    }
  }

  function initPage() {
    if (window.__cielCielAiPageInitialized) return;
    if (document.body?.dataset?.page !== "cielai") return;
    if (typeof bindProtectedChrome !== "function") return;
    window.__cielCielAiPageInitialized = true;

    const nodes = getNodes();
    if (!nodes.fileInput || !nodes.classSelect || !nodes.skillsSelect) return;

    bindProtectedChrome();
    populateClassSelect(nodes.classSelect);
    populateSkillsSelect(nodes.skillsSelect);

    const requestedClassId = typeof getRequestedClassId === "function" ? getRequestedClassId() : "";
    if (requestedClassId && getClassById(requestedClassId)) nodes.classSelect.value = requestedClassId;
    if (!nodes.startDate.value) nodes.startDate.value = getToday();
    if (!nodes.endDate.value) nodes.endDate.value = nodes.startDate.value;

    nodes.analyzeButton?.addEventListener("click", analyzeSelectedFile);
    nodes.createButton?.addEventListener("click", () => createActivityFromAi(false));
    nodes.createOpenButton?.addEventListener("click", () => createActivityFromAi(true));
    nodes.skillsSelect?.addEventListener("change", syncStateFromSelectedSkills);
    nodes.startDate?.addEventListener("change", () => {
      if (!nodes.endDate.value) nodes.endDate.value = nodes.startDate.value;
    });

    renderInsights();
    renderGroupedIndicators();
  }

  window.__cielInitCielAiPageSafe = initPage;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => window.setTimeout(initPage, 0), { once: true });
  } else {
    window.setTimeout(initPage, 0);
  }
})();

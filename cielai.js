(function () {
  const AI_ACTIVITY_STORAGE_KEY = "cielai-last-created-activity-id";
  const AI_CLASS_STORAGE_KEY = "cielai-last-created-class-id";
  const PDF_WORKER_SRC = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

  const AI_SKILL_RULES = {
    c1: {
      keywords: ["compte rendu", "présentation", "presentation", "restitution", "documentation", "support", "communication", "oral", "client", "consigne"],
      defaults: ["Restituer clairement la démarche et les résultats", "Employer un vocabulaire technique adapté", "Produire une trace écrite exploitable"]
    },
    c3: {
      keywords: ["projet", "jalon", "planning", "équipe", "equipe", "cahier des charges", "organisation", "coordination", "livrable"],
      defaults: ["Identifier les étapes du projet", "Respecter l'organisation et les rôles", "Produire un livrable conforme"]
    },
    c4: {
      keywords: ["analyse", "architecture", "matérielle", "materielle", "logicielle", "structure", "schéma", "schema", "adressage", "plan d'adressage", "besoin"],
      defaults: ["Analyser la structure matérielle et logicielle", "Identifier les éléments techniques utiles", "Justifier les choix techniques retenus"]
    },
    c6: {
      keywords: ["conformité", "conformite", "validation", "vérifier", "verifier", "recette", "test", "contrôle", "controle", "attendu"],
      defaults: ["Vérifier la conformité au besoin", "Réaliser les tests attendus", "Conclure sur la validité de la solution"]
    },
    c7: {
      keywords: ["maquette", "prototype", "proof of concept", "preuve de concept", "simulation", "prototypage", "essai"],
      defaults: ["Réaliser une maquette exploitable", "Tester le prototype en conditions définies", "Valider la solution avant déploiement"]
    },
    c8: {
      keywords: ["code", "coder", "script", "python", "programme", "automatisation", "automatiser", "algorithm", "fonction", "débug", "debug"],
      defaults: ["Produire un code lisible et structuré", "Automatiser la tâche demandée", "Valider le fonctionnement du code"]
    },
    c9: {
      keywords: ["installation", "installer", "montage", "câblage", "cablage", "mise en service", "composant", "équipement", "equipement"],
      defaults: ["Installer les éléments dans le bon ordre", "Réaliser une mise en service cohérente", "Contrôler le fonctionnement après installation"]
    },
    c10: {
      keywords: ["réseau", "reseau", "vlan", "ip", "ipv4", "ipv6", "routage", "switch", "routeur", "supervision", "broadcast", "passerelle", "masque", "pkt"],
      defaults: ["Configurer le réseau conformément au besoin", "Valider le fonctionnement des services réseau", "Analyser le trafic ou l'adressage avec cohérence"]
    },
    c11: {
      keywords: ["maintenance", "maintenir", "diagnostic", "panne", "incident", "dépannage", "depannage", "correction", "erreur", "résolution", "resolution"],
      defaults: ["Diagnostiquer le dysfonctionnement", "Corriger l'incident ou l'erreur constatée", "Vérifier le rétablissement du service"]
    }
  };

  const state = {
    analyzed: false,
    extractedText: "",
    groupedIndicators: []
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
      preview: document.querySelector("#cielai-preview"),
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
      .trim();
  }

  function extractUsefulLines(text) {
    const seen = new Set();
    return String(text || "")
      .split(/\r?\n+/)
      .map(normalizeLine)
      .filter((line) => line.length >= 12 && line.length <= 180)
      .filter((line) => /[a-zàâçéèêëîïôûùüÿñæœ]/i.test(line))
      .filter((line) => {
        const key = normalizeText(line);
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }

  function inferType(text, fileName) {
    const haystack = `${text}\n${fileName}`.toLowerCase();
    if (/(^|\b)(td|travaux dirigés|travaux diriges|questionnaire|exercice|exercices)\b/.test(haystack)) return "TD";
    return "TP";
  }

  function inferTitle(lines, fileName, inferredType) {
    const candidate = lines.find((line) => line.length <= 90 && !/^nom|prénom|prenom|classe|durée|duree|compétence|competence/i.test(line));
    if (candidate) return candidate;
    const base = safeRepair(fileName || "Séance")
      .replace(/\.[^.]+$/, "")
      .replace(/[_-]+/g, " ")
      .trim();
    return `${inferredType} ${base || "CIEL"}`.trim();
  }

  function scoreSkill(skillId, normalizedText, lines) {
    const rule = AI_SKILL_RULES[skillId];
    if (!rule) return 0;
    const haystack = normalizeText(normalizedText);
    let score = 0;
    rule.keywords.forEach((keyword) => {
      const key = normalizeText(keyword);
      if (haystack.includes(key)) score += 2;
      score += lines.filter((line) => normalizeText(line).includes(key)).length;
    });
    return score;
  }

  function inferSkillIds(text, lines) {
    const scored = skillCatalog
      .map((skill) => ({ skillId: skill.id, score: scoreSkill(skill.id, text, lines) }))
      .sort((a, b) => b.score - a.score);
    const selected = scored.filter((item) => item.score > 0).slice(0, 3).map((item) => item.skillId);
    if (selected.length) return selected;
    const fallback = normalizeText(text);
    if (/(vlan|ipv4|ipv6|routeur|switch|reseau|réseau)/.test(fallback)) return ["c10", "c11"];
    if (/(python|script|code|automatisation)/.test(fallback)) return ["c8", "c1"];
    if (/(prototype|maquette|cablage|câblage|montage)/.test(fallback)) return ["c7", "c9"];
    return ["c1"];
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

  function pickIndicatorCandidates(lines, selectedSkillIds) {
    const useful = lines.filter((line) => {
      const normalized = normalizeText(line);
      if (normalized.length < 12) return false;
      if (/^(objectifs?|contexte|consignes?|documents?|ressources?|materiel|durée|duree|nom|prénom|prenom|classe|bar[eè]me)$/i.test(normalized)) return false;
      return /(?:configur|verifi|analyse|identifier|installer|mettre en service|coder|documenter|diagnosti|corriger|tester|r[eé]aliser|utiliser|pr[eé]senter|organiser|calcul)/i.test(normalized);
    });

    const grouped = new Map(selectedSkillIds.map((skillId) => [skillId, []]));
    useful.forEach((line) => {
      const skillId = inferSkillForLine(line, selectedSkillIds);
      if (!grouped.has(skillId)) grouped.set(skillId, []);
      const current = grouped.get(skillId);
      if (current.length < 5) current.push(line);
    });

    selectedSkillIds.forEach((skillId) => {
      const current = grouped.get(skillId) || [];
      const defaults = AI_SKILL_RULES[skillId]?.defaults || [];
      let cursor = 0;
      while (current.length < 3 && defaults[cursor]) {
        if (!current.some((item) => normalizeText(item) === normalizeText(defaults[cursor]))) {
          current.push(defaults[cursor]);
        }
        cursor += 1;
      }
      grouped.set(skillId, current.slice(0, 5));
    });
    return grouped;
  }

  function buildComment(lines, selectedSkillIds) {
    const intro = lines.slice(0, 3).join(" ");
    const skills = selectedSkillIds.map((skillId) => getSkillById(skillId)?.code).filter(Boolean).join(", ");
    return `Séance analysée par CielAI. Compétences pressenties : ${skills || "à vérifier"}.\n${intro}`.trim();
  }

  function analyzeDocument(text, fileName) {
    const repairedText = safeRepair(text).replace(/\u0000/g, " ").trim();
    const lines = extractUsefulLines(repairedText);
    const type = inferType(repairedText, fileName);
    const title = inferTitle(lines, fileName, type);
    const skillIds = inferSkillIds(repairedText, lines);
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
      preview: repairedText
    };
  }

  function getGroupedIndicatorsFromEditors() {
    return [...document.querySelectorAll("[data-cielai-skill-group]")]
      .map((section) => {
        const skillId = section.dataset.cielaiSkillGroup || "";
        const textarea = section.querySelector("textarea");
        const indicators = String(textarea?.value || "")
          .split(/\r?\n/)
          .map((line) => normalizeLine(line))
          .filter(Boolean);
        return { skillId, indicators };
      })
      .filter((group) => group.skillId && group.indicators.length);
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
    if (!nodes.typeSelect || !nodes.titleInput || !nodes.skillsSelect || !nodes.commentInput || !nodes.preview) return;
    nodes.typeSelect.value = result.type;
    nodes.titleInput.value = result.title;
    setMultiSelectValues(nodes.skillsSelect, result.skillIds);
    nodes.commentInput.value = result.comment;
    nodes.preview.textContent = result.preview.slice(0, 12000) || "Aucun texte exploitable.";
    state.extractedText = result.preview;
    state.groupedIndicators = result.groupedIndicators.map((group) => ({
      skillId: group.skillId,
      indicators: [...group.indicators]
    }));
    state.analyzed = true;
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

    renderGroupedIndicators();
  }

  window.__cielInitCielAiPageSafe = initPage;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => window.setTimeout(initPage, 0), { once: true });
  } else {
    window.setTimeout(initPage, 0);
  }
})();

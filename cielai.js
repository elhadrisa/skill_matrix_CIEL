(function () {
  const AI_ACTIVITY_STORAGE_KEY = "cielai-last-created-activity-id";
  const AI_CLASS_STORAGE_KEY = "cielai-last-created-class-id";
  const PDF_WORKER_SRC = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

  const DOMAIN_RULES = {
    network: { label: "Reseau Informatique", keywords: ["reseau", "vlan", "ipv4", "ipv6", "ip", "routeur", "switch", "routage", "broadcast", "passerelle", "masque", "adressage", "pkt", "wireshark"] },
    cyber: { label: "Cybersecurite", keywords: ["cyber", "securite", "durcissement", "pare feu", "pare-feu", "filtrage", "journal", "authentification", "mot de passe", "audit", "risque", "conformite", "script", "python"] },
    electronics: { label: "Electronique", keywords: ["capteur", "carte", "microcontroleur", "electronique", "cablage", "montage", "prototype", "mesure", "tension", "courant", "composant", "acquisition"] }
  };

  const SKILL_RULES = {
    c1: { keywords: ["compte rendu", "restitution", "documentation", "presentation", "oral", "support", "rapport", "justification", "trace ecrite"], defaults: ["Restituer clairement la demarche et les resultats", "Employer un vocabulaire technique adapte", "Produire une trace ecrite exploitable"], domain: "Cybersecurite" },
    c3: { keywords: ["projet", "planning", "jalon", "organisation", "coordination", "livrable", "cahier des charges", "equipe", "etape"], defaults: ["Identifier les etapes du projet", "Respecter l'organisation attendue", "Produire un livrable conforme au besoin"], domain: "Cybersecurite" },
    c4: { keywords: ["analyse", "architecture", "materielle", "logicielle", "structure", "schema", "adressage", "besoin", "topologie", "prefixe"], defaults: ["Analyser la structure materielle et logicielle", "Identifier les elements techniques utiles", "Justifier les choix techniques retenus"], domain: "Reseau Informatique" },
    c6: { keywords: ["validation", "conformite", "test", "controle", "verifier", "attendu", "recette", "mesure", "comparaison"], defaults: ["Verifier la conformite au besoin", "Realiser les tests attendus", "Conclure sur la validite de la solution"], domain: "Reseau Informatique" },
    c7: { keywords: ["prototype", "maquette", "simulation", "preuve de concept", "prototypage", "essai"], defaults: ["Realiser une maquette exploitable", "Tester le prototype en conditions definies", "Valider la solution avant deploiement"], domain: "Electronique" },
    c8: { keywords: ["code", "coder", "script", "python", "programme", "automatisation", "fonction", "algorithme", "debug", "debogage"], defaults: ["Produire un code lisible et structure", "Automatiser la tache demandee", "Valider le fonctionnement du code"], domain: "Cybersecurite" },
    c9: { keywords: ["installation", "installer", "montage", "cablage", "mise en service", "composant", "equipement", "deploiement", "raccordement"], defaults: ["Installer les elements dans le bon ordre", "Realiser une mise en service coherente", "Controler le fonctionnement apres installation"], domain: "Electronique" },
    c10: { keywords: ["reseau", "vlan", "ipv4", "ipv6", "ip", "routage", "switch", "routeur", "broadcast", "passerelle", "masque", "pkt", "adresse"], defaults: ["Configurer le reseau conformement au besoin", "Valider le fonctionnement des services reseau", "Analyser le trafic ou l'adressage avec coherence"], domain: "Reseau Informatique" },
    c11: { keywords: ["maintenance", "diagnostic", "panne", "incident", "erreur", "depannage", "correction", "resolution", "retablissement"], defaults: ["Diagnostiquer le dysfonctionnement", "Corriger l'incident ou l'erreur constatee", "Verifier le retablissement du service"], domain: "Reseau Informatique" }
  };

  const LEVEL_RULES = {
    "2CIEL": { keywords: ["initiation", "decouverte", "prise en main", "prototype", "maquette", "cablage", "montage", "capteur"], skillIds: ["c7", "c9"] },
    "1CIEL": { keywords: ["script", "python", "automatisation", "projet", "validation", "tests", "conformite"], skillIds: ["c3", "c6", "c8"] },
    "TCIEL": { keywords: ["ipv6", "vlan", "wireshark", "diagnostic", "supervision", "incident", "routage", "durcissement", "cybersecurite"], skillIds: ["c10", "c11", "c4"] }
  };

  const CUE_TEMPLATES = [
    { match: /vlan/i, indicators: { c10: ["Configurer le VLAN conformement au plan d'adressage", "Verifier la connectivite du VLAN et la coherence reseau"], c4: ["Analyser la segmentation logique du reseau"] } },
    { match: /ipv6|prefixe|route par defaut/i, indicators: { c10: ["Attribuer une adresse IPv6 coherente", "Verifier la route par defaut et l'absence d'erreur IPv6"], c4: ["Interpreter correctement un prefixe IPv6"] } },
    { match: /wireshark|capture|trame|analyse de trafic/i, indicators: { c10: ["Analyser le trafic reseau de facon coherente"], c11: ["Identifier une anomalie a partir de l'observation reseau"] } },
    { match: /python|script|automatisation/i, indicators: { c8: ["Automatiser la tache attendue par script", "Valider le fonctionnement du code produit"], c1: ["Documenter la logique du script et son usage"] } },
    { match: /prototype|capteur|carte|microcontroleur/i, indicators: { c7: ["Realiser un prototype exploitable", "Tester le prototype dans des conditions definies"], c9: ["Realiser un montage coherent et fonctionnel"] } },
    { match: /diagnostic|incident|panne|correction/i, indicators: { c11: ["Diagnostiquer l'origine du dysfonctionnement", "Corriger l'erreur et verifier le retablissement du service"] } }
  ];

  const state = { analyzed: false, insights: null, groupedIndicators: [] };

  function safeRepair(value) {
    if (typeof repairDisplaySourceString === "function") return repairDisplaySourceString(String(value || ""));
    return String(value || "");
  }

  function escapeHtmlSafe(value) {
    return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function bySelector(selector) {
    return document.querySelector(selector);
  }

  function getNodes() {
    return {
      fileInput: bySelector("#cielai-file"),
      classSelect: bySelector("#cielai-class"),
      startDate: bySelector("#cielai-start-date"),
      endDate: bySelector("#cielai-end-date"),
      analyzeButton: bySelector("#cielai-analyze"),
      createButton: bySelector("#cielai-create"),
      createOpenButton: bySelector("#cielai-create-open"),
      feedback: bySelector("#cielai-feedback"),
      typeSelect: bySelector("#cielai-type"),
      titleInput: bySelector("#cielai-title"),
      skillsSelect: bySelector("#cielai-skills"),
      commentInput: bySelector("#cielai-comment"),
      insights: bySelector("#cielai-insights"),
      pedagogyKit: bySelector("#cielai-pedagogy-kit"),
      inductivePlan: bySelector("#cielai-inductive-plan"),
      groups: bySelector("#cielai-indicators-groups")
    };
  }

  function setFeedback(message) {
    const feedback = getNodes().feedback;
    if (feedback) feedback.textContent = safeRepair(message);
  }

  function getToday() {
    return new Date().toISOString().slice(0, 10);
  }

  function populateSkillsSelect(select) {
    if (!select) return;
    select.innerHTML = skillCatalog.map((skill) => `<option value="${skill.id}">${escapeHtmlSafe(`${skill.code} - ${safeRepair(skill.title)}`)}</option>`).join("");
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
      pages.push(content.items.map((item) => item.str).join(" "));
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
    return safeRepair(line).replace(/^[\s•\-–—*]+/, "").replace(/^\d+[\.\)]\s+/, "").replace(/\s+/g, " ").trim();
  }

  function extractUsefulUnits(text) {
    const seen = new Set();
    return String(text || "")
      .replace(/\r/g, "\n")
      .split(/[\n;:.!?]+/g)
      .map(normalizeLine)
      .filter((line) => line.length >= 10 && line.length <= 220)
      .filter((line) => /[a-z0-9]/i.test(line))
      .filter((line) => {
        const normalized = normalizeText(line);
        if (!normalized || /^(nom|prenom|classe|date|documents?|ressources?|materiel|bareme|page|annexe|duree|objectif|objectifs|competence|consigne|consignes)$/i.test(normalized)) return false;
        if (seen.has(normalized)) return false;
        seen.add(normalized);
        return true;
      });
  }

  function inferType(text, fileName) {
    const haystack = normalizeText(`${text}\n${fileName}`);
    return /(^|\b)(td|travaux diriges|questionnaire|exercice|exercices)\b/.test(haystack) ? "TD" : "TP";
  }

  function inferTitle(units, fileName, inferredType) {
    const candidate = units.find((line) => line.length <= 96 && !/^(nom|prenom|classe|duree|competence|objectifs?|consignes?)/i.test(normalizeText(line)));
    if (candidate) return candidate;
    const base = safeRepair(fileName || "Seance").replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim();
    return `${inferredType} ${base || "CIEL"}`.trim();
  }

  function scoreKeywords(keywords, text, units) {
    const haystack = normalizeText(text);
    return keywords.reduce((sum, keyword) => {
      const key = normalizeText(keyword);
      return sum + (haystack.includes(key) ? 3 : 0) + units.filter((unit) => normalizeText(unit).includes(key)).length;
    }, 0);
  }

  function inferSkillScores(text, units, fileName) {
    return skillCatalog
      .map((skill) => ({
        skillId: skill.id,
        score: scoreKeywords(SKILL_RULES[skill.id]?.keywords || [], `${text}\n${fileName}`, units)
      }))
      .sort((a, b) => b.score - a.score);
  }

  function inferSkillIds(scored) {
    const positive = scored.filter((item) => item.score > 0);
    if (!positive.length) return ["c1"];
    const best = positive[0].score;
    const kept = positive.filter((item, index) => index < 4 && item.score >= Math.max(1, best * 0.35)).map((item) => item.skillId);
    return kept.length ? kept : [positive[0].skillId];
  }

  function estimateLevel(text, units, skillIds) {
    const haystack = normalizeText(text);
    const scores = Object.entries(LEVEL_RULES).map(([level, rule]) => {
      const keywordScore = rule.keywords.reduce((sum, keyword) => {
        const key = normalizeText(keyword);
        return sum + (haystack.includes(key) ? 3 : 0) + units.filter((unit) => normalizeText(unit).includes(key)).length;
      }, 0);
      const skillScore = skillIds.reduce((sum, skillId) => sum + (rule.skillIds.includes(skillId) ? 4 : 0), 0);
      return { level, score: keywordScore + skillScore };
    }).sort((a, b) => b.score - a.score);
    const best = scores[0] || { level: "1CIEL", score: 1 };
    const maxScore = Math.max(...scores.map((item) => item.score), 1);
    return { label: best.level, confidence: Math.max(35, Math.min(97, Math.round((best.score / maxScore) * 100))) };
  }

  function estimateDuration(units, skillIds, dominantDomain, type) {
    let hours = type === "TD" ? 2 : 3;
    if (units.length >= 10) hours += 1;
    if (units.length >= 18) hours += 1;
    if (skillIds.length >= 3) hours += 1;
    if (dominantDomain === "Reseau Informatique" || dominantDomain === "Cybersecurite") hours += 1;
    if (skillIds.includes("c10") || skillIds.includes("c11")) hours += 1;
    hours = Math.max(2, Math.min(6, hours));
    return { hours, label: `${hours}h`, range: hours <= 2 ? "seance courte" : (hours <= 4 ? "seance standard" : "seance longue") };
  }

  function findSuggestedClassId(levelLabel) {
    const levelOrder = levelLabel === "2CIEL" ? 1 : (levelLabel === "1CIEL" ? 2 : 3);
    const matched = (app.classes || []).find((classItem) => getClassLevelOrder(classItem.id) === levelOrder);
    return matched?.id || "";
  }

  function inferSkillForUnit(unit, selectedSkillIds) {
    if (selectedSkillIds.length === 1) return selectedSkillIds[0];
    const normalized = normalizeText(unit);
    let bestSkillId = selectedSkillIds[0] || "";
    let bestScore = -1;
    selectedSkillIds.forEach((skillId) => {
      const score = (SKILL_RULES[skillId]?.keywords || []).reduce((sum, keyword) => sum + (normalized.includes(normalizeText(keyword)) ? 1 : 0), 0);
      if (score > bestScore) {
        bestScore = score;
        bestSkillId = skillId;
      }
    });
    return bestSkillId;
  }

  function lineLooksLikeIndicator(line) {
    const normalized = normalizeText(line);
    return normalized.length >= 10 &&
      /(?:configur|verifi|analyse|identifier|installer|mettre en service|coder|documenter|diagnosti|corriger|tester|realiser|utiliser|presenter|organiser|calcul|attribuer|interpreter|detecter|superviser|maintenir|valider|controler|justifier|ipv4|ipv6|vlan|routeur|switch|script|prototype|capteur|cablage|incident|erreur|adressage)/i.test(normalized);
  }

  function cleanIndicatorLabel(line) {
    return normalizeLine(line)
      .replace(/^(l['’]eleve devra|l['’]eleve doit|l'eleve devra|l'eleve doit|vous devez|il faut|objectif\s*:|consigne\s*:|travail demande\s*:|question\s*\d+\s*[:.)-]?)/i, "")
      .replace(/\s+/g, " ")
      .replace(/[.;:]+$/, "")
      .trim();
  }

  function addUniqueIndicator(target, label) {
    const cleaned = cleanIndicatorLabel(label);
    if (!cleaned || target.some((item) => normalizeText(item) === normalizeText(cleaned))) return;
    target.push(cleaned);
  }

  function pickIndicatorCandidates(units, selectedSkillIds, fullText) {
    const grouped = new Map(selectedSkillIds.map((skillId) => [skillId, []]));
    units.filter(lineLooksLikeIndicator).map(cleanIndicatorLabel).forEach((unit) => {
      addUniqueIndicator(grouped.get(inferSkillForUnit(unit, selectedSkillIds)) || [], unit);
    });

    CUE_TEMPLATES.forEach((template) => {
      if (!template.match.test(fullText)) return;
      Object.entries(template.indicators).forEach(([skillId, indicators]) => {
        const target = grouped.get(skillId);
        if (target) indicators.forEach((label) => addUniqueIndicator(target, label));
      });
    });

    selectedSkillIds.forEach((skillId) => {
      const current = grouped.get(skillId) || [];
      (SKILL_RULES[skillId]?.defaults || []).forEach((label) => {
        if (current.length < 6) addUniqueIndicator(current, label);
      });
      grouped.set(skillId, current.slice(0, 6));
    });

    return grouped;
  }

  function buildDomainConfidence(text, units, selectedSkillIds) {
    const raw = Object.values(DOMAIN_RULES).map((domain) => {
      const keywordScore = scoreKeywords(domain.keywords, text, units);
      const skillScore = selectedSkillIds.reduce((sum, skillId) => sum + ((SKILL_RULES[skillId]?.domain === domain.label) ? 4 : 0), 0);
      return { label: domain.label, score: keywordScore + skillScore };
    }).sort((a, b) => b.score - a.score);
    const maxScore = Math.max(...raw.map((item) => item.score), 1);
    return raw.map((item) => ({ ...item, confidence: Math.max(18, Math.min(99, Math.round((item.score / maxScore) * 100))) }));
  }

  function buildInsights(units, selectedSkillIds, scoredSkills, fileName, text, type) {
    const domainConfidence = buildDomainConfidence(text, units, selectedSkillIds);
    const dominantDomain = domainConfidence[0]?.label || "";
    const levelEstimate = estimateLevel(text, units, selectedSkillIds);
    const durationEstimate = estimateDuration(units, selectedSkillIds, dominantDomain, type);
    const suggestedClassId = findSuggestedClassId(levelEstimate.label);
    const maxSkillScore = Math.max(...scoredSkills.map((item) => item.score), 1);
    const skillConfidence = scoredSkills
      .filter((item) => selectedSkillIds.includes(item.skillId))
      .map((item) => {
        const skill = getSkillById(item.skillId);
        return {
          label: skill ? `${skill.code} - ${safeRepair(skill.title)}` : item.skillId,
          confidence: Math.max(35, Math.min(98, Math.round((item.score / maxSkillScore) * 100)))
        };
      });
    const tokenCounts = new Map();
    tokenizeWords(units.join(" ")).forEach((token) => tokenCounts.set(token, (tokenCounts.get(token) || 0) + 1));
    const cues = [...tokenCounts.entries()].sort((a, b) => b[1] - a[1]).filter(([token]) => token.length >= 4).slice(0, 8).map(([token]) => token);
    return {
      domainConfidence,
      dominantDomain,
      levelEstimate,
      durationEstimate,
      suggestedClassId,
      skillConfidence,
      cues,
      stats: { fileName: safeRepair(fileName), usefulUnits: units.length },
      sourceUnits: units.slice(0, 10)
    };
  }

  function getSkillCode(skillId) {
    const skill = getSkillById(skillId);
    return safeRepair(skill?.code || String(skillId || "").toUpperCase());
  }

  function getPedagogyProfile(domainLabel, type) {
    const isTd = String(type || "").toUpperCase() === "TD";
    const profiles = {
      "Reseau Informatique": {
        trigger: "une situation reseau a rendre fonctionnelle ou conforme au besoin",
        exploration: isTd ? "faire rechercher la logique d'adressage et justifier les calculs" : "faire manipuler l'adressage, la configuration et les tests de connectivite",
        formalization: "stabiliser la methode de configuration et les controles reseau",
        reinvestment: "transferer la methode sur une variante d'architecture ou de parametrage"
      },
      "Cybersecurite": {
        trigger: "une situation de securisation, d'analyse ou d'automatisation a traiter",
        exploration: isTd ? "faire analyser les risques, les traces ou le script attendu" : "faire manipuler l'outil, le script ou la procedure de securisation",
        formalization: "faire emerger les regles, points de vigilance et controles de securite",
        reinvestment: "reutiliser la demarche sur un nouveau cas ou un incident voisin"
      },
      "Electronique": {
        trigger: "une mise en service, un montage ou un prototype a fiabiliser",
        exploration: isTd ? "faire lire le schema et anticiper les choix techniques" : "faire manipuler le montage, la mesure et la mise en service",
        formalization: "institutionnaliser les reglages, mesures et controles attendus",
        reinvestment: "transposer la methode sur un montage ou un reglage voisin"
      }
    };
    return profiles[domainLabel] || {
      trigger: "une situation professionnelle a comprendre puis traiter",
      exploration: isTd ? "faire rechercher et justifier la demarche attendue" : "faire manipuler puis observer pour faire emerger la methode",
      formalization: "faire formaliser la methode et les points de vigilance",
      reinvestment: "proposer une variante pour transferer les acquis"
    };
  }

  function buildDurationSlices(totalHours) {
    const weights = [10, 25, 12, 15, 18, 10, 10];
    const totalMinutes = Math.max(120, Math.min(360, Math.round((Number(totalHours) || 3) * 60)));
    let remaining = totalMinutes;
    return weights.map((weight, index) => {
      if (index === weights.length - 1) return remaining;
      const minRemaining = (weights.length - index - 1) * 10;
      let minutes = Math.max(10, Math.round(((totalMinutes * weight) / 100) / 5) * 5);
      minutes = Math.min(minutes, remaining - minRemaining);
      remaining -= minutes;
      return minutes;
    });
  }

  function formatMinutesLabel(minutes) {
    return `${Math.max(5, Math.round(minutes || 0))} min`;
  }

  function extractPlanFocus(groups, maxCount) {
    return groups
      .flatMap((group) => group.indicators.map((label) => ({
        skillId: group.skillId,
        skillCode: getSkillCode(group.skillId),
        label: safeRepair(label)
      })))
      .slice(0, maxCount);
  }

  function buildTeachingKit(units, groupedIndicators, insights, title, type) {
    const isTd = String(type || "").toUpperCase() === "TD";
    const domain = safeRepair(insights?.dominantDomain || "A confirmer");
    const skillTitles = groupedIndicators
      .map((group) => {
        const skill = getSkillById(group.skillId);
        return safeRepair(skill ? `${skill.code} - ${skill.title}` : group.skillId);
      })
      .slice(0, 4);
    const focusIndicators = extractPlanFocus(groupedIndicators, 5).map((item) => item.label);
    const firstUnit = safeRepair(units[0] || title || "la situation professionnelle");
    const secondUnit = safeRepair(units[1] || "les donnees techniques du document");

    const modality = isTd
      ? {
          title: "TD inductif d'analyse et de formalisation",
          rationale: `Modalite adaptee a un travail de lecture, de justification et de structuration des notions en ${domain}.`
        }
      : {
          title: "TP inductif de manipulation et de validation",
          rationale: `Modalite adaptee a une demarche de test, de configuration et de verification pratique en ${domain}.`
        };

    const objectives = [
      isTd
        ? `Analyser ${firstUnit} et justifier une demarche technique argumentee.`
        : `Realiser ${firstUnit} en respectant une demarche de mise en oeuvre coherente.`,
      `Mobiliser les competences visees : ${skillTitles.join(", ") || "competences a confirmer"}.`,
      isTd
        ? `Formaliser les regles, calculs ou choix techniques a partir de ${secondUnit}.`
        : `Verifier le resultat obtenu et conclure sur la conformite au besoin.`,
      focusIndicators[0]
        ? `Valider en priorite : ${focusIndicators[0]}.`
        : `Produire une trace exploitable en fin de seance.`
    ].filter(Boolean);

    const deliverables = isTd
      ? [
          "reponses argumentees ou tableau d'analyse complete",
          "schema, calculs ou justification des choix techniques",
          "synthese ecrite courte des notions stabilisees"
        ]
      : [
          "fichier de configuration, script ou parametres appliques",
          "captures, mesures ou resultats de tests",
          "compte rendu bref avec validation finale"
        ];

    const traceWriting = isTd
      ? "Construire une trace ecrite en 3 parties : situation, demarche d'analyse, regles ou methode retenue."
      : "Construire une trace ecrite en 3 parties : etapes de mise en oeuvre, controles realises, resultat final valide.";

    const assessmentAdvice = isTd
      ? "Evaluer la qualite du raisonnement, la justesse des justifications et la stabilisation des notions."
      : "Evaluer la qualite de la mise en oeuvre, la validite des tests et la conformite du resultat obtenu.";

    const prerequisites = [
      isTd
        ? `Comprendre les notions de base utiles au sujet : ${domain.toLowerCase()}.`
        : `Savoir prendre en main l'environnement technique lie a ${domain.toLowerCase()}.`,
      skillTitles[0]
        ? `Avoir deja rencontre la competence ${skillTitles[0]}.`
        : "Avoir deja pratique une situation professionnelle voisine.",
      focusIndicators[0]
        ? `Pouvoir expliquer ou realiser : ${focusIndicators[0]}.`
        : "Pouvoir suivre une consigne technique simple et la verbaliser.",
      isTd
        ? "Savoir lire un document technique, un schema ou un tableau de donnees."
        : "Savoir appliquer une procedure de test, de configuration ou de mesure."
    ];

    const differentiation = {
      support: isTd
        ? [
            "Fournir une grille de lecture du document avec les informations a reperer.",
            "Donner un exemple partiellement resolu ou un calcul modele.",
            "Autoriser une mise en commun intermediaire avant la formalisation."
          ]
        : [
            "Fournir une fiche methode pas a pas pour la configuration ou la manipulation.",
            "Preparer un environnement deja partiellement configure.",
            "Reduire le nombre de verifications a conduire en autonomie complete."
          ],
      standard: isTd
        ? [
            "Laisser l'eleve construire sa demarche a partir du document et justifier ses choix.",
            "Exiger une synthese ecrite structuree en fin de seance."
          ]
        : [
            "Laisser l'eleve realiser la procedure complete puis verifier le resultat.",
            "Exiger des preuves de validation : capture, mesure, test ou compte rendu."
          ],
      extension: isTd
        ? [
            "Ajouter une variante de donnees ou une contrainte supplementaire a traiter.",
            "Demander une comparaison entre deux solutions ou deux methodes possibles."
          ]
        : [
            "Ajouter un cas de panne, de variante ou de contrainte supplementaire.",
            "Demander une justification technique des choix et une optimisation finale."
          ]
      };

    return {
      modality,
      objectives,
      deliverables,
      prerequisites,
      differentiation,
      traceWriting,
      assessmentAdvice
    };
  }

  function buildInductivePlan(units, groupedIndicators, insights, title, type) {
    const profile = getPedagogyProfile(insights?.dominantDomain, type);
    const isTd = String(type || "").toUpperCase() === "TD";
    const durations = buildDurationSlices(insights?.durationEstimate?.hours || 3);
    const focusIndicators = extractPlanFocus(groupedIndicators, 6);
    const skillBadges = [...new Set(groupedIndicators.map((group) => getSkillCode(group.skillId)).filter(Boolean))];
    const firstUnit = safeRepair(units[0] || title || "la situation proposee");
    const secondUnit = safeRepair(units[1] || "les donnees techniques du document");
    const thirdUnit = safeRepair(units[2] || "les contraintes de realisation");
    const focusOne = focusIndicators.slice(0, 2).map((item) => `${item.skillCode}: ${item.label}`);
    const focusTwo = focusIndicators.slice(2, 4).map((item) => `${item.skillCode}: ${item.label}`);
    const focusThree = focusIndicators.slice(4, 6).map((item) => `${item.skillCode}: ${item.label}`);
    const formalisationTargets = groupedIndicators
      .map((group) => {
        const skill = getSkillById(group.skillId);
        return safeRepair(skill ? `${skill.code} - ${skill.title}` : group.skillId);
      })
      .slice(0, 3);

    const steps = [
      {
        title: "1. Situation declenchante",
        durationLabel: formatMinutesLabel(durations[0]),
        objective: "Faire emerger le probleme professionnel et donner du sens a la seance.",
        teacherAction: `Presenter ${profile.trigger} en partant de ${firstUnit}. Faire verbaliser ce qu'il faut comprendre, verifier ou produire.`,
        studentAction: `Observer le support, reperer les informations utiles, formuler des hypotheses et identifier le besoin.`,
        output: "Question-probleme reformulee et criteres de reussite identifies.",
        badges: [safeRepair(insights?.dominantDomain || "A confirmer"), ...skillBadges.slice(0, 2)],
        focus: [firstUnit]
      },
      {
        title: "2. Recherche / manipulation guidee",
        durationLabel: formatMinutesLabel(durations[1]),
        objective: "Laisser les eleves chercher, tester et s'approprier la situation avant l'apport magistral.",
        teacherAction: `${profile.exploration}. Guider sans donner tout de suite la procedure complete.`,
        studentAction: isTd
          ? "Chercher, comparer, calculer, argumenter les choix et construire une premiere reponse justifiee."
          : "Manipuler, tester, observer, relever les ecarts et essayer une premiere resolution a partir du TP.",
        output: isTd
          ? "Premieres hypotheses argumentees, calculs et constats notes."
          : "Premiers essais realises, constats notes et traces de manipulation conservees.",
        badges: [...skillBadges.slice(0, 3)],
        focus: focusOne.length ? focusOne : [secondUnit]
      },
      {
        title: "3. Mise en commun",
        durationLabel: formatMinutesLabel(durations[2]),
        objective: "Faire comparer les essais pour faire emerger les regularites et les erreurs utiles.",
        teacherAction: `Organiser la verbalisation des procedures, des reussites et des erreurs observees a partir de ${secondUnit}.`,
        studentAction: `Expliquer la demarche suivie, confronter les resultats et justifier les choix provisoires.`,
        output: "Tableau de constats, erreurs frequentes et bonnes pratiques partagees.",
        badges: [...skillBadges.slice(0, 2)],
        focus: focusTwo.length ? focusTwo : [secondUnit, thirdUnit]
      },
      {
        title: "4. Formalisation / institutionnalisation",
        durationLabel: formatMinutesLabel(durations[3]),
        objective: "Structurer les savoirs et stabiliser la methode professionnelle attendue.",
        teacherAction: `${profile.formalization}. Donner la regle, la methode ou le schema de reference a partir des situations observees.`,
        studentAction: `Reformuler la methode, retenir les points de vigilance et relier la pratique aux competences visees.`,
        output: "Trace ecrite, schema de methode ou synthese de reference.",
        badges: [...skillBadges],
        focus: formalisationTargets.length ? formalisationTargets : [safeRepair(insights?.dominantDomain || "Domaine a confirmer")]
      },
      {
        title: "5. Reinvestissement",
        durationLabel: formatMinutesLabel(durations[4]),
        objective: "Verifier que la methode est transferable sur une situation voisine.",
        teacherAction: `${profile.reinvestment}. Proposer une variante, un autre jeu de donnees ou un cas similaire.`,
        studentAction: `Reutiliser la demarche sur une nouvelle consigne en autonomie progressive.`,
        output: "Resolution d'un second cas, ajustements argumentes et corrections eventuelles.",
        badges: [...skillBadges.slice(0, 3)],
        focus: focusThree.length ? focusThree : [thirdUnit]
      },
      {
        title: "6. Trace ecrite / synthese",
        durationLabel: formatMinutesLabel(durations[5]),
        objective: "Consolider ce qui doit etre retenu et reutilisable.",
        teacherAction: `Faire formaliser une synthese courte : etapes, regles, controles et erreurs a eviter.`,
        studentAction: `Rediger la trace ecrite, le schema, le tableau ou le compte rendu attendu.`,
        output: "Synthese exploitable pour la suite de la progression.",
        badges: ["Trace ecrite", ...skillBadges.slice(0, 2)],
        focus: [safeRepair(title || "Synthese de seance")]
      },
      {
        title: "7. Evaluation / regulation",
        durationLabel: formatMinutesLabel(durations[6]),
        objective: "Observer les acquis et preparer la remediations si besoin.",
        teacherAction: `Observer les indicateurs vises, reguler a chaud et valider les acquis atteints en fin de seance.`,
        studentAction: `Verifier son travail, expliciter ce qui est acquis ou a retravailler.`,
        output: "Validation des indicateurs et points de remediations identifies.",
        badges: ["Evaluation", ...skillBadges.slice(0, 2)],
        focus: focusIndicators.length ? focusIndicators.map((item) => `${item.skillCode}: ${item.label}`).slice(0, 4) : ["Indicateurs de la seance"]
      }
    ];

    return steps;
  }

  function buildGeneratedComment(skillIds, insights, units) {
    const skillCodes = skillIds.map((skillId) => getSkillById(skillId)?.code).filter(Boolean).join(", ") || "a verifier";
    const sequence = (insights?.inductivePlan || []).map((step) => step.title.replace(/^\d+\.\s*/, "")).join(" > ");
    return [
      `Seance analysee par CielAI.`,
      `Dominante pressentie : ${insights?.dominantDomain || "a confirmer"}.`,
      `Competences pressenties : ${skillCodes}.`,
      `Duree conseillee : ${insights?.durationEstimate?.label || "a confirmer"}.`,
      insights?.teachingKit?.modality?.title ? `Modalite conseillee : ${insights.teachingKit.modality.title}.` : "",
      (insights?.teachingKit?.objectives || []).length ? `Objectifs : ${insights.teachingKit.objectives.slice(0, 3).join(" / ")}.` : "",
      sequence ? `Demarche inductive conseillee : ${sequence}.` : "",
      units.slice(0, 3).join(" ")
    ].filter(Boolean).join("\n");
  }

  function analyzeDocument(text, fileName) {
    const repairedText = safeRepair(text).replace(/\u0000/g, " ").trim();
    const units = extractUsefulUnits(repairedText);
    const type = inferType(repairedText, fileName);
    const title = inferTitle(units, fileName, type);
    const scoredSkills = inferSkillScores(repairedText, units, fileName);
    const skillIds = inferSkillIds(scoredSkills);
    const groupedIndicatorsMap = pickIndicatorCandidates(units, skillIds, repairedText);
    const groupedIndicators = skillIds.map((skillId) => ({ skillId, indicators: groupedIndicatorsMap.get(skillId) || [] }));
    const insights = buildInsights(units, skillIds, scoredSkills, fileName, repairedText, type);
    insights.teachingKit = buildTeachingKit(units, groupedIndicators, insights, title, type);
    insights.inductivePlan = buildInductivePlan(units, groupedIndicators, insights, title, type);
    return {
      type,
      title,
      skillIds,
      groupedIndicators,
      comment: buildGeneratedComment(skillIds, insights, units),
      insights
    };
  }

  function buildRubricMap(groups) {
    const entries = groups.flatMap((group) => group.indicators.map((label) => `${group.skillId}::${normalizeText(label)}`));
    const total = entries.length;
    if (!total) return new Map();
    const base = Math.floor(20 / total);
    let remainder = 20 - (base * total);
    const map = new Map();
    entries.forEach((key) => {
      const points = base + (remainder > 0 ? 1 : 0);
      if (remainder > 0) remainder -= 1;
      map.set(key, points);
    });
    return map;
  }

  function renderInsights() {
    const insightsNode = getNodes().insights;
    if (!insightsNode) return;
    if (!state.insights) {
      insightsNode.innerHTML = `<article class="summary-card"><h3>En attente</h3><p class="muted-copy">Charge un document pour obtenir une lecture pedagogique et les competences pressenties.</p></article>`;
      return;
    }
    const suggestedClass = state.insights.suggestedClassId ? getClassById(state.insights.suggestedClassId) : null;
    const domainCards = state.insights.domainConfidence.map((item) => `
      <article class="summary-card">
        <h3>${escapeHtmlSafe(item.label)}</h3>
        <p class="muted-copy">Dominante metier estimee</p>
        <span class="stat-value">${item.confidence}%</span>
      </article>
    `).join("");
    const skillCards = state.insights.skillConfidence.map((item) => `
      <article class="summary-card">
        <h3>${escapeHtmlSafe(item.label)}</h3>
        <p class="muted-copy">Confiance competence</p>
        <span class="stat-value">${item.confidence}%</span>
      </article>
    `).join("");
    const cues = state.insights.cues.length
      ? state.insights.cues.map((cue) => `<span class="badge">${escapeHtmlSafe(cue)}</span>`).join("")
      : `<span class="badge">Aucun mot-cle dominant</span>`;
    insightsNode.innerHTML = `
      <article class="summary-card">
        <h3>Lecture du document</h3>
        <p class="muted-copy">${escapeHtmlSafe(state.insights.stats.fileName)} // ${state.insights.stats.usefulUnits} unite(s) utiles retenue(s)</p>
        <p class="muted-copy">Dominante retenue : ${escapeHtmlSafe(state.insights.dominantDomain || "a confirmer")}</p>
      </article>
      <article class="summary-card">
        <h3>Indices detectes</h3>
        <div class="student-badges">${cues}</div>
      </article>
      <article class="summary-card">
        <h3>Niveau estime</h3>
        <p class="muted-copy">${escapeHtmlSafe(state.insights.levelEstimate.label)} // confiance ${state.insights.levelEstimate.confidence}%</p>
        <span class="stat-value">${escapeHtmlSafe(state.insights.durationEstimate.label)}</span>
        <p class="muted-copy">Duree conseillee (${escapeHtmlSafe(state.insights.durationEstimate.range)})</p>
      </article>
      <article class="summary-card">
        <h3>Classe suggeree</h3>
        <p class="muted-copy">${escapeHtmlSafe(suggestedClass?.name || "Aucune classe correspondante")}</p>
        <p class="muted-copy">${escapeHtmlSafe(suggestedClass ? "Selection automatique possible" : "Selection manuelle requise")}</p>
      </article>
      ${domainCards}
      ${skillCards}
    `;
  }

  function renderTeachingKit() {
    const kitNode = getNodes().pedagogyKit;
    if (!kitNode) return;
    const kit = state.insights?.teachingKit;
    if (!kit) {
      kitNode.innerHTML = `<article class="summary-card"><h3>En attente</h3><p class="muted-copy">L'analyse proposera ici la modalite, les objectifs, le livrable et la trace ecrite.</p></article>`;
      return;
    }
    kitNode.innerHTML = `
      <article class="summary-card">
        <h3>Modalite conseillee</h3>
        <span class="stat-value">${escapeHtmlSafe(kit.modality.title)}</span>
        <p class="muted-copy">${escapeHtmlSafe(kit.modality.rationale)}</p>
      </article>
      <article class="summary-card cielai-kit-list-card">
        <h3>Objectifs de seance</h3>
        <ul class="cielai-kit-list">
          ${kit.objectives.map((item) => `<li>${escapeHtmlSafe(item)}</li>`).join("")}
        </ul>
      </article>
      <article class="summary-card cielai-kit-list-card">
        <h3>Livrables attendus</h3>
        <ul class="cielai-kit-list">
          ${kit.deliverables.map((item) => `<li>${escapeHtmlSafe(item)}</li>`).join("")}
        </ul>
      </article>
      <article class="summary-card cielai-kit-list-card">
        <h3>Prérequis élève</h3>
        <ul class="cielai-kit-list">
          ${(kit.prerequisites || []).map((item) => `<li>${escapeHtmlSafe(item)}</li>`).join("")}
        </ul>
      </article>
      <article class="summary-card cielai-kit-list-card">
        <h3>Trace ecrite conseillee</h3>
        <p class="muted-copy">${escapeHtmlSafe(kit.traceWriting)}</p>
        <h3>Conseil d'evaluation</h3>
        <p class="muted-copy">${escapeHtmlSafe(kit.assessmentAdvice)}</p>
      </article>
      <article class="summary-card cielai-kit-list-card">
        <h3>Différenciation</h3>
        <span class="eyebrow">Aide</span>
        <ul class="cielai-kit-list">
          ${(kit.differentiation?.support || []).map((item) => `<li>${escapeHtmlSafe(item)}</li>`).join("")}
        </ul>
        <span class="eyebrow">Autonomie attendue</span>
        <ul class="cielai-kit-list">
          ${(kit.differentiation?.standard || []).map((item) => `<li>${escapeHtmlSafe(item)}</li>`).join("")}
        </ul>
        <span class="eyebrow">Approfondissement</span>
        <ul class="cielai-kit-list">
          ${(kit.differentiation?.extension || []).map((item) => `<li>${escapeHtmlSafe(item)}</li>`).join("")}
        </ul>
      </article>
    `;
  }

  function renderInductivePlan() {
    const planNode = getNodes().inductivePlan;
    if (!planNode) return;
    const plan = state.insights?.inductivePlan || [];
    if (!plan.length) {
      planNode.innerHTML = `<article class="summary-card"><h3>En attente</h3><p class="muted-copy">L'analyse generera ici un decoupage enseignant selon une demarche inductive.</p></article>`;
      return;
    }
    planNode.innerHTML = plan.map((step, index) => `
      <article class="summary-card cielai-plan-step">
        <div class="cielai-plan-step-head">
          <span class="cielai-plan-step-index">${String(index + 1).padStart(2, "0")}</span>
          <div class="cielai-plan-step-main">
            <h3>${escapeHtmlSafe(step.title)}</h3>
            <p class="muted-copy">${escapeHtmlSafe(step.objective)}</p>
          </div>
          <div class="student-badges">
            <span class="badge accent">${escapeHtmlSafe(step.durationLabel)}</span>
            ${(step.badges || []).map((badge) => `<span class="badge">${escapeHtmlSafe(badge)}</span>`).join("")}
          </div>
        </div>
        ${(step.focus || []).length ? `<div class="student-badges cielai-plan-focus">${step.focus.map((item) => `<span class="badge">${escapeHtmlSafe(item)}</span>`).join("")}</div>` : ""}
        <div class="cielai-plan-step-grid">
          <article class="cielai-plan-box">
            <span class="eyebrow">Prof</span>
            <p>${escapeHtmlSafe(step.teacherAction)}</p>
          </article>
          <article class="cielai-plan-box">
            <span class="eyebrow">Eleves</span>
            <p>${escapeHtmlSafe(step.studentAction)}</p>
          </article>
          <article class="cielai-plan-box">
            <span class="eyebrow">Trace attendue</span>
            <p>${escapeHtmlSafe(step.output)}</p>
          </article>
        </div>
      </article>
    `).join("");
  }

  function rebuildInductivePlanFromCurrentState() {
    if (!state.insights) {
      renderTeachingKit();
      renderInductivePlan();
      return;
    }
    const nodes = getNodes();
    state.insights.teachingKit = buildTeachingKit(
      state.insights.sourceUnits || [],
      state.groupedIndicators,
      state.insights,
      nodes.titleInput?.value || "",
      nodes.typeSelect?.value || "TP"
    );
    state.insights.inductivePlan = buildInductivePlan(
      state.insights.sourceUnits || [],
      state.groupedIndicators,
      state.insights,
      nodes.titleInput?.value || "",
      nodes.typeSelect?.value || "TP"
    );
    renderTeachingKit();
    renderInductivePlan();
  }

  function renderGroupedIndicators() {
    const groupsNode = getNodes().groups;
    if (!groupsNode) return;
    if (!state.groupedIndicators.length) {
      groupsNode.innerHTML = `<article class="summary-card"><h3>Aucun indicateur</h3><p class="muted-copy">Analyse un document pour generer les indicateurs par competence.</p></article>`;
      return;
    }
    const rubricMap = buildRubricMap(state.groupedIndicators);
    groupsNode.innerHTML = state.groupedIndicators.map((group) => {
      const skill = getSkillById(group.skillId);
      const totalPoints = group.indicators.reduce((sum, label) => sum + (rubricMap.get(`${group.skillId}::${normalizeText(label)}`) || 0), 0);
      return `
        <article class="summary-card cielai-skill-card" data-cielai-skill-group="${group.skillId}">
          <h3>${escapeHtmlSafe(skill ? `${skill.code} - ${safeRepair(skill.title)}` : group.skillId)}</h3>
          <p class="muted-copy">${group.indicators.length} indicateur(s) propose(s) // bareme conseille ${totalPoints}/20</p>
          <div class="cielai-rubric-list">
            ${group.indicators.map((label, index) => `
              <div class="cielai-rubric-row">
                <span class="badge">I${index + 1}</span>
                <span class="muted-copy">${escapeHtmlSafe(label)}</span>
                <span class="badge accent">${rubricMap.get(`${group.skillId}::${normalizeText(label)}`) || 0} pt(s)</span>
              </div>
            `).join("")}
          </div>
          <label class="field">
            <span>Indicateurs</span>
            <textarea rows="${Math.max(4, group.indicators.length + 1)}">${escapeHtmlSafe(group.indicators.join("\n"))}</textarea>
          </label>
        </article>
      `;
    }).join("");
  }

  function syncStateFromSelectedSkills() {
    const skillsSelect = getNodes().skillsSelect;
    if (!skillsSelect) return;
    const selectedSkillIds = getSelectedValues(skillsSelect);
    const currentBySkill = new Map(state.groupedIndicators.map((group) => [group.skillId, group.indicators]));
    state.groupedIndicators = selectedSkillIds.map((skillId) => ({
      skillId,
      indicators: currentBySkill.get(skillId)?.length ? currentBySkill.get(skillId) : [...(SKILL_RULES[skillId]?.defaults || [])]
    }));
    rebuildInductivePlanFromCurrentState();
    renderGroupedIndicators();
  }

  function setAnalysisResult(result) {
    const nodes = getNodes();
    if (!nodes.typeSelect || !nodes.titleInput || !nodes.skillsSelect || !nodes.commentInput) return;
    nodes.typeSelect.value = result.type;
    nodes.titleInput.value = result.title;
    setMultiSelectValues(nodes.skillsSelect, result.skillIds);
    nodes.commentInput.value = result.comment;
    state.groupedIndicators = result.groupedIndicators.map((group) => ({ skillId: group.skillId, indicators: [...group.indicators] }));
    state.insights = result.insights;
    state.analyzed = true;
    if (nodes.classSelect && result.insights?.suggestedClassId && getClassById(result.insights.suggestedClassId)) {
      nodes.classSelect.value = result.insights.suggestedClassId;
    }
    renderInsights();
    renderTeachingKit();
    renderInductivePlan();
    renderGroupedIndicators();
    nodes.createButton.disabled = false;
    nodes.createOpenButton.disabled = false;
  }

  function getGroupedIndicatorsFromEditors() {
    return [...document.querySelectorAll("[data-cielai-skill-group]")]
      .map((section) => {
        const skillId = section.dataset.cielaiSkillGroup || "";
        const textarea = section.querySelector("textarea");
        const indicators = String(textarea?.value || "").split(/\r?\n/).map(cleanIndicatorLabel).filter(Boolean);
        return { skillId, indicators };
      })
      .filter((group) => group.skillId && group.indicators.length);
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
      setFeedback("Verifie le titre, la classe, les competences et les indicateurs avant creation.");
      return;
    }
    if (!payload.startDate || !payload.endDate) {
      setFeedback("Renseigne la date de debut et la date de fin.");
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
    logAction("Seance creee via CielAI", activity.title, `${activity.type} // ${getClassById(activity.classId)?.name || activity.classId}`);
    persistAppData();
    localStorage.setItem(AI_ACTIVITY_STORAGE_KEY, activity.id);
    localStorage.setItem(AI_CLASS_STORAGE_KEY, activity.classId);
    setFeedback(`Seance creee : ${activity.title}.`);
    if (openAfterCreate) {
      window.location.href = `evaluations.html?class=${encodeURIComponent(activity.classId)}&view=session`;
    }
  }

  async function analyzeSelectedFile() {
    const file = getNodes().fileInput?.files?.[0];
    if (!file) {
      setFeedback("Choisis d'abord un fichier PDF, DOCX ou TXT.");
      return;
    }
    setFeedback("Analyse en cours...");
    try {
      const extractedText = await readFileText(file);
      const result = analyzeDocument(extractedText, file.name);
      setAnalysisResult(result);
      setFeedback("Document analyse. Verifie la proposition puis cree la seance.");
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
    nodes.typeSelect?.addEventListener("change", rebuildInductivePlanFromCurrentState);
    nodes.titleInput?.addEventListener("change", rebuildInductivePlanFromCurrentState);
    nodes.startDate?.addEventListener("change", () => {
      if (!nodes.endDate.value) nodes.endDate.value = nodes.startDate.value;
    });

    renderInsights();
    renderTeachingKit();
    renderInductivePlan();
    renderGroupedIndicators();
  }

  window.__cielInitCielAiPageSafe = initPage;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => window.setTimeout(initPage, 0), { once: true });
  } else {
    window.setTimeout(initPage, 0);
  }
})();

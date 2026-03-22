(() => {
  function boot() {
    if (document.body?.dataset?.page !== "evaluations") return;
    if (typeof app === "undefined" || typeof getActivitiesByClass !== "function" || typeof getStudentsByClass !== "function") return;
    if (document.documentElement.dataset.cielEvaluationsFinalBound === "true") return;
    document.documentElement.dataset.cielEvaluationsFinalBound = "true";

    const state = {
      classId: "",
      activityId: "",
      search: "",
      openStudentId: "",
      pendingCreate: null,
      lastSignature: ""
    };

    function repair(value) {
      if (typeof repairDisplaySourceString === "function") return repairDisplaySourceString(value);
      return String(value || "");
    }

    function byId(id) {
      return document.getElementById(id);
    }

    function getSkillIds(activity) {
      const ids = Array.isArray(activity?.skillIds) && activity.skillIds.length
        ? activity.skillIds
        : [activity?.skillId].filter(Boolean);
      return ids.filter((skillId, index) => skillId && ids.indexOf(skillId) === index);
    }

    function getGlobalGrade(activity, studentId) {
      return normalizeGrade(activity?.evaluations?.[studentId]?.__globalGrade);
    }

    function getStatusLabel(status) {
      return repair(levelLabels?.[status] || status || "Non evalue");
    }

    function formatSkillTitle(skillId) {
      const skill = skillId ? getSkillById(skillId) : null;
      if (!skill) return "Indicateurs transversaux";
      const match = String(skill.code || "").match(/^C(\d+)$/i);
      const code = match ? `C${String(match[1]).padStart(2, "0")}` : repair(skill.code || "Competence");
      return `${code} - ${repair(skill.title || "")}`.trim();
    }

    function resolveIndicatorSkillMap(activity) {
      const indicators = Array.isArray(activity?.indicators) ? activity.indicators : [];
      const skillIds = getSkillIds(activity);
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

      let cursor = 0;
      indicators.forEach((indicator) => {
        if (resolved.has(indicator.id)) return;
        resolved.set(indicator.id, skillIds[cursor % skillIds.length]);
        cursor += 1;
      });
      return resolved;
    }

    function getIndicatorGroups(activity) {
      const indicators = Array.isArray(activity?.indicators) ? activity.indicators : [];
      const skillIds = getSkillIds(activity);
      const map = resolveIndicatorSkillMap(activity);
      const groups = [];

      const pushGroup = (skillId, groupIndicators) => {
        if (!groupIndicators.length) return;
        groups.push({
          id: skillId || "common",
          title: formatSkillTitle(skillId),
          indicators: groupIndicators
        });
      };

      if (skillIds.length === 1) {
        pushGroup(skillIds[0], indicators);
        return groups;
      }

      skillIds.forEach((skillId) => {
        pushGroup(skillId, indicators.filter((indicator) => map.get(indicator.id) === skillId));
      });

      pushGroup("", indicators.filter((indicator) => !map.has(indicator.id)));
      if (!groups.length) pushGroup("", indicators);
      return groups;
    }

    function getSummary(activity, studentId, indicators) {
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

    function renderSummaryBadges(summary) {
      return [
        ["acquis", "Acquis", "success"],
        ["partiellement_acquis", "Partiel", "accent"],
        ["en_cours_acquisition", "En cours", "warning"],
        ["non_acquis", "Non acquis", "ghost"],
        ["non_evalue", "Non evalue", "ghost"]
      ]
        .filter(([status]) => summary[status] > 0)
        .map(([status, label, className]) => `<span class="badge ${className}">${summary[status]} ${label}</span>`)
        .join("");
    }

    function distributedStatuses(grade, count) {
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

    function recomputeSkills(activity, studentId) {
      const student = getStudentById(studentId);
      if (!activity || !student) return;
      student.skillGrades = hydrateSkillGrades(student.skillGrades || {});
      const evaluation = activity.evaluations?.[studentId] || {};
      const resolvedMap = resolveIndicatorSkillMap(activity);
      getSkillIds(activity).forEach((skillId) => {
        const relatedIndicators = (activity.indicators || []).filter((indicator) => resolvedMap.get(indicator.id) === skillId);
        if (!relatedIndicators.length) return;
        const scores = relatedIndicators.map((indicator) => levelScores[evaluation[indicator.id]] || 0);
        const averageScore = scores.length ? scores.reduce((sum, value) => sum + value, 0) / scores.length : 0;
        const gradeFromIndicators = Math.round((averageScore / 4) * 20 * 2) / 2;
        student.skillGrades[skillId] = gradeFromIndicators;
        student.skills[skillId] = mapGradeToStatus(gradeFromIndicators);
      });
    }

    function applyGlobalGrade(activity, studentId, rawGrade) {
      const student = getStudentById(studentId);
      if (!activity || !student) return;
      const normalized = normalizeGrade(rawGrade);
      if (!activity.evaluations[studentId]) activity.evaluations[studentId] = {};
      if (normalized === "") {
        delete activity.evaluations[studentId].__globalGrade;
        return;
      }
      activity.evaluations[studentId].__globalGrade = normalized;
      const autoStatus = mapGradeToStatus(normalized);
      const statuses = distributedStatuses(normalized, (activity.indicators || []).length);
      (activity.indicators || []).forEach((indicator, index) => {
        activity.evaluations[studentId][indicator.id] = statuses[index] || autoStatus;
      });
      recomputeSkills(activity, studentId);
    }

    function getVisibleNodes() {
      const selectionPanel = byId("activity-selection-panel");
      const oldForm = selectionPanel?.querySelector(".stack-form");
      const oldSummary = byId("activity-summary");
      const oldMatrix = byId("activity-matrix");
      const oldReport = byId("activity-report");
      const oldSynthesis = byId("activity-synthesis");
      const matrixPanel = byId("activity-matrix-panel");
      const reportPanel = byId("activity-report-panel");
      const synthesisPanel = byId("activity-synthesis-panel");
      if (!selectionPanel || !oldForm || !oldSummary || !oldMatrix || !oldReport || !oldSynthesis || !matrixPanel || !reportPanel || !synthesisPanel) return null;

      ["fresh-evaluation-session-shell", "authoritative-evaluation-session-panel", "fresh-activity-summary", "fresh-activity-matrix", "fresh-activity-report", "fresh-activity-synthesis", "ultra-eval-summary", "ultra-eval-matrix", "ultra-eval-report", "ultra-eval-synthesis"].forEach((id) => {
        const node = byId(id);
        if (node) {
          node.hidden = true;
          node.style.display = "none";
        }
      });

      oldForm.hidden = true;
      oldForm.style.display = "none";
      oldSummary.hidden = true;
      oldSummary.style.display = "none";
      oldMatrix.hidden = true;
      oldMatrix.style.display = "none";
      oldReport.hidden = true;
      oldReport.style.display = "none";
      oldSynthesis.hidden = true;
      oldSynthesis.style.display = "none";

      let shell = byId("evaluations-final-shell");
      if (!shell) {
        shell = document.createElement("div");
        shell.id = "evaluations-final-shell";
        shell.className = "stack-form";
        shell.innerHTML = `
          <label class="field">
            <span>Recherche rapide</span>
            <input id="evaluations-final-search" type="text" placeholder="Titre, compétence, date...">
          </label>
          <label class="field">
            <span>Classe</span>
            <select id="evaluations-final-class"></select>
          </label>
          <label class="field">
            <span>TP / TD</span>
            <select id="evaluations-final-activity"></select>
          </label>
        `;
        oldForm.insertAdjacentElement("afterend", shell);
      }

      let summary = byId("evaluations-final-summary");
      if (!summary) {
        summary = document.createElement("div");
        summary.id = "evaluations-final-summary";
        summary.className = "class-cards";
        oldSummary.insertAdjacentElement("afterend", summary);
      }

      let matrix = byId("evaluations-final-matrix");
      if (!matrix) {
        matrix = document.createElement("div");
        matrix.id = "evaluations-final-matrix";
        matrix.className = "activity-cards-layout";
        oldMatrix.insertAdjacentElement("afterend", matrix);
      }

      let report = byId("evaluations-final-report");
      if (!report) {
        report = document.createElement("div");
        report.id = "evaluations-final-report";
        report.className = "class-cards";
        oldReport.insertAdjacentElement("afterend", report);
      }

      let synthesis = byId("evaluations-final-synthesis");
      if (!synthesis) {
        synthesis = document.createElement("div");
        synthesis.id = "evaluations-final-synthesis";
        synthesis.className = "student-directory";
        oldSynthesis.insertAdjacentElement("afterend", synthesis);
      }

      return {
        shell,
        searchInput: byId("evaluations-final-search"),
        classSelect: byId("evaluations-final-class"),
        activitySelect: byId("evaluations-final-activity"),
        summary,
        matrix,
        report,
        synthesis,
        hiddenSessionClassSelect: byId("session-class-select"),
        hiddenActivitySelect: byId("activity-select"),
        hiddenEvalClassSelect: byId("eval-class-select")
      };
    }

    function ensureVisibleSurface() {
      const nodes = getVisibleNodes();
      if (!nodes) return null;
      [nodes.shell, nodes.summary, nodes.matrix, nodes.report, nodes.synthesis].forEach((node) => {
        if (!node) return;
        node.hidden = false;
        node.style.display = "";
      });
      return nodes;
    }

    function syncHiddenSelectors(classId, activityId) {
      const nodes = getVisibleNodes();
      if (!nodes) return;
      const { hiddenSessionClassSelect, hiddenActivitySelect, hiddenEvalClassSelect } = nodes;
      const classOptions = app.classes.map((classItem) => `<option value="${classItem.id}">${escapeHtml(repair(classItem.name))}</option>`).join("");
      if (hiddenSessionClassSelect) {
        hiddenSessionClassSelect.innerHTML = classOptions;
        hiddenSessionClassSelect.value = classId || "";
      }
      if (hiddenEvalClassSelect) {
        hiddenEvalClassSelect.innerHTML = classOptions;
        hiddenEvalClassSelect.value = classId || "";
        hiddenEvalClassSelect.dispatchEvent(new Event("change", { bubbles: true }));
      }
      if (hiddenActivitySelect) {
        const activities = getActivitiesByClass(classId);
        hiddenActivitySelect.innerHTML = activities.map((activity) => `<option value="${activity.id}">${escapeHtml(`${activity.type} // ${repair(activity.title)}`)}</option>`).join("");
        hiddenActivitySelect.value = activityId || "";
      }
    }

    function chooseClassId(preferredClassId = "", preferredActivityId = "") {
      if (preferredClassId && getClassById(preferredClassId)) return preferredClassId;
      const fromActivity = getActivityById(preferredActivityId)?.classId;
      if (fromActivity && getClassById(fromActivity)) return fromActivity;
      if (state.classId && getClassById(state.classId)) return state.classId;
      return app.classes.find((classItem) => getActivitiesByClass(classItem.id).length)?.id || app.classes[0]?.id || "";
    }

    function chooseActivityId(classId, preferredActivityId = "") {
      const visibleActivities = getVisibleActivities(classId, state.search);
      const allActivities = getActivitiesByClass(classId);
      if (preferredActivityId && visibleActivities.some((activity) => activity.id === preferredActivityId)) return preferredActivityId;
      if (preferredActivityId && allActivities.some((activity) => activity.id === preferredActivityId)) return preferredActivityId;
      if (state.activityId && visibleActivities.some((activity) => activity.id === state.activityId)) return state.activityId;
      if (state.activityId && allActivities.some((activity) => activity.id === state.activityId)) return state.activityId;
      return visibleActivities[0]?.id || allActivities[0]?.id || "";
    }

    function getVisibleActivities(classId, searchTerm = "") {
      const activities = getActivitiesByClass(classId);
      const term = String(searchTerm || "").trim().toLowerCase();
      if (!term) return activities;
      return activities.filter((activity) => {
        const haystack = [
          activity.title,
          activity.type,
          activity.startDate,
          activity.endDate,
          activity.date,
          ...(getActivitySkills(activity).map((skill) => `${skill.code} ${skill.title}`)),
          ...(activity.indicators || []).map((indicator) => indicator.label)
        ].join(" ").toLowerCase();
        return haystack.includes(term);
      });
    }

    function renderSummary(activity, classId) {
      const nodes = ensureVisibleSurface();
      if (!nodes) return;
      const classItem = getClassById(classId);
      if (!activity) {
        nodes.summary.innerHTML = `<article class="summary-card"><h3>Aucune séance</h3><p class="muted-copy">Crée un TP ou un TD pour commencer.</p></article>`;
        return;
      }
      nodes.summary.innerHTML = `
        <article class="summary-card">
          <h3>${escapeHtml(`${activity.type} // ${repair(activity.title)}`)}</h3>
          <p class="muted-copy">${escapeHtml(repair(classItem?.name || ""))} // ${escapeHtml(getActivitySkillLabel(activity))}</p>
          <p class="muted-copy">${escapeHtml(formatActivityDateRange(activity))} // ${(activity.indicators || []).length} indicateur(s)</p>
        </article>
      `;
    }

    function renderReport(activity, classId) {
      const nodes = ensureVisibleSurface();
      if (!nodes) return;
      const students = getStudentsByClass(classId);
      if (!activity) {
        nodes.report.innerHTML = "";
        return;
      }
      const cards = (activity.indicators || []).map((indicator) => `
        <article class="summary-card">
          <h3>${escapeHtml(repair(indicator.label))}</h3>
          <p class="muted-copy">Moyenne: ${getIndicatorAverage(activity, students, indicator.id)}%</p>
          <p class="muted-copy">${escapeHtml(renderIndicatorStatusBreakdown(activity, students, indicator.id))}</p>
        </article>
      `).join("");
      nodes.report.innerHTML = `
        <article class="summary-card">
          <h3>Bilan global</h3>
          <p class="muted-copy">Moyenne de la séance: ${getActivityAverage(activity, students)}%</p>
          <p class="muted-copy">${students.length} élève(s) évalué(s)</p>
        </article>
        ${cards}
      `;
    }

    function renderSynthesis(classId) {
      const nodes = ensureVisibleSurface();
      if (!nodes) return;
      const activities = getActivitiesByClass(classId);
      const students = getStudentsByClass(classId);
      nodes.synthesis.innerHTML = activities.length
        ? activities.map((activity) => `
            <article class="directory-row compact">
              <div>
                <strong>${escapeHtml(`${activity.type} // ${repair(activity.title)}`)}</strong>
                <p>${escapeHtml(getActivitySkillLabel(activity))}</p>
                <p>${escapeHtml(formatActivityDateRange(activity))}</p>
              </div>
              <div class="student-badges">
                <span class="badge">${(activity.indicators || []).length} indicateurs</span>
                <span class="badge">${getActivityAverage(activity, students)}% moyen</span>
              </div>
            </article>
          `).join("")
        : `<article class="summary-card"><h3>Aucune synthèse</h3><p class="muted-copy">Aucune séance enregistrée pour cette classe.</p></article>`;
    }

    function renderMatrix(activity, classId) {
      const nodes = ensureVisibleSurface();
      if (!nodes) return;
      const matrix = nodes.matrix;
      if (!activity) {
        matrix.innerHTML = `<article class="summary-card"><h3>Aucune séance</h3><p class="muted-copy">Sélectionne ou crée une séance pour commencer l'évaluation.</p></article>`;
        return;
      }
      const students = getStudentsByClass(classId);
      if (!students.length) {
        matrix.innerHTML = `<article class="summary-card"><h3>Aucun élève</h3><p class="muted-copy">La classe associée à cette séance ne contient aucun élève.</p></article>`;
        return;
      }
      const groups = getIndicatorGroups(activity);
      if (!state.openStudentId || !students.some((student) => student.id === state.openStudentId)) {
        state.openStudentId = students[0]?.id || "";
      }

      matrix.innerHTML = students.map((student) => {
        const isOpen = student.id === state.openStudentId;
        const globalGrade = getGlobalGrade(activity, student.id);
        const overallStatus = mapGradeToStatus(globalGrade);
        return `
          <article class="activity-student-card${isOpen ? " is-open" : ""}" data-student-id="${student.id}">
            <div class="activity-student-toggle" role="button" tabindex="0" aria-expanded="${isOpen ? "true" : "false"}">
              <div class="activity-student-card-head">
                <div class="activity-student-head-main">
                  <h3>${escapeHtml(repair(student.name))}</h3>
                  <p>${getStudentProgress(student)}% validé // ${escapeHtml(repair(getClassById(student.classId)?.name || ""))}</p>
                </div>
                <div class="activity-student-card-meta">
                  <span class="badge">${groups.length} bloc(s)</span>
                  <span class="badge accent">${escapeHtml(getStatusLabel(overallStatus))}</span>
                </div>
              </div>
            </div>
            <div class="activity-student-groups">
              <section class="activity-skill-group activity-global-grade-box">
                <div class="activity-global-grade-actions">
                  <label class="field compact-field">
                    <span>Note globale /20</span>
                    <input class="activity-student-global-grade" type="text" inputmode="decimal" data-activity-id="${activity.id}" data-student-id="${student.id}" value="${globalGrade === "" ? "" : globalGrade}" placeholder="Ex. 13.5">
                    <small class="activity-global-grade-hint">${escapeHtml(getStatusLabel(overallStatus))}</small>
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
                    <div class="activity-skill-group-summary">${renderSummaryBadges(getSummary(activity, student.id, group.indicators))}</div>
                  </div>
                  <div class="activity-indicator-list">
                    ${group.indicators.map((indicator) => `
                      <label class="activity-indicator-row">
                        <span class="activity-indicator-row-index">I${(activity.indicators || []).findIndex((item) => item.id === indicator.id) + 1}</span>
                        <span class="activity-indicator-row-body">
                          <span class="activity-indicator-card-label">${escapeHtml(repair(indicator.label))}</span>
                        </span>
                        <select class="activity-status-select" data-no-custom-select="true" data-activity-id="${activity.id}" data-student-id="${student.id}" data-indicator-id="${indicator.id}"${hasPermission("edit_evaluations") ? "" : " disabled"}>
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
    }

    function render(preferredClassId = "", preferredActivityId = "") {
      const nodes = ensureVisibleSurface();
      if (!nodes) return;
      const classOptions = app.classes.map((classItem) => `<option value="${classItem.id}">${escapeHtml(repair(classItem.name))}</option>`).join("");
      nodes.classSelect.innerHTML = classOptions;
      const classId = chooseClassId(preferredClassId, preferredActivityId);
      state.classId = classId;
      if (classId && [...nodes.classSelect.options].some((option) => option.value === classId)) {
        nodes.classSelect.value = classId;
      }

      if (typeof state.search !== "string") state.search = "";
      if (nodes.searchInput.value !== state.search) {
        nodes.searchInput.value = state.search;
      }

      const visibleActivities = getVisibleActivities(classId, state.search);
      nodes.activitySelect.innerHTML = visibleActivities.length
        ? visibleActivities.map((activity) => `<option value="${activity.id}">${escapeHtml(`${activity.type} // ${repair(activity.title)}`)}</option>`).join("")
        : `<option value="">Aucune séance</option>`;

      const activityId = chooseActivityId(classId, preferredActivityId);
      state.activityId = activityId;
      if (activityId && [...nodes.activitySelect.options].some((option) => option.value === activityId)) {
        nodes.activitySelect.value = activityId;
      }

      const activity = getActivityById(activityId) || null;
      syncHiddenSelectors(activity?.classId || classId, activityId);
      renderSummary(activity, activity?.classId || classId);
      renderMatrix(activity, activity?.classId || classId);
      renderReport(activity, activity?.classId || classId);
      renderSynthesis(activity?.classId || classId);
    }

    function bind() {
      const nodes = ensureVisibleSurface();
      if (!nodes) return;

      nodes.searchInput.addEventListener("input", () => {
        state.search = String(nodes.searchInput.value || "");
        render(nodes.classSelect.value || "", nodes.activitySelect.value || "");
      }, true);

      nodes.classSelect.addEventListener("change", () => {
        state.classId = nodes.classSelect.value || "";
        state.activityId = "";
        state.openStudentId = "";
        render(state.classId, "");
      }, true);

      nodes.activitySelect.addEventListener("change", () => {
        state.activityId = nodes.activitySelect.value || "";
        state.openStudentId = "";
        render(nodes.classSelect.value || "", state.activityId);
      }, true);

      nodes.matrix.addEventListener("click", (event) => {
        const toggle = event.target.closest(".activity-student-toggle");
        if (toggle) {
          const card = toggle.closest(".activity-student-card");
          const studentId = card?.dataset?.studentId || "";
          state.openStudentId = state.openStudentId === studentId ? "" : studentId;
          render(state.classId, state.activityId);
          return;
        }

        const applyButton = event.target.closest(".activity-global-grade-apply");
        if (applyButton) {
          if (!hasPermission("edit_evaluations")) return;
          const activity = getActivityById(applyButton.dataset.activityId || state.activityId);
          const studentId = applyButton.dataset.studentId || "";
          const input = applyButton.closest(".activity-global-grade-actions")?.querySelector(".activity-student-global-grade");
          if (!activity || !studentId || !input) return;
          state.openStudentId = studentId;
          applyGlobalGrade(activity, studentId, String(input.value || "").replace(",", "."));
          persistAppData();
          render(activity.classId, activity.id);
        }
      }, true);

      nodes.matrix.addEventListener("change", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLSelectElement)) return;
        if (!target.matches(".activity-status-select")) return;
        if (!hasPermission("edit_evaluations")) return;
        const activity = getActivityById(target.dataset.activityId || state.activityId);
        const studentId = target.dataset.studentId || "";
        if (!activity || !studentId) return;
        state.openStudentId = studentId;
        setActivityIndicatorStatus(activity.id, studentId, target.dataset.indicatorId, target.value);
        recomputeSkills(activity, studentId);
        persistAppData();
        render(activity.classId, activity.id);
      }, true);

      nodes.matrix.addEventListener("keydown", (event) => {
        const target = event.target;
        if (event.key === "Enter" && target instanceof HTMLInputElement && target.matches(".activity-student-global-grade")) {
          event.preventDefault();
          target.closest(".activity-global-grade-actions")?.querySelector(".activity-global-grade-apply")?.click();
        }
        if ((event.key === "Enter" || event.key === " ") && target instanceof HTMLElement && target.classList.contains("activity-student-toggle")) {
          event.preventDefault();
          target.click();
        }
      }, true);

      const submitButton = byId("activity-submit-button");
      submitButton?.addEventListener("pointerdown", () => {
        state.pendingCreate = {
          knownIds: new Set(app.evaluationActivities.map((activity) => activity.id)),
          classId: byId("activity-class")?.value || state.classId || ""
        };
      }, true);

      submitButton?.addEventListener("click", () => {
        window.setTimeout(() => {
          const snapshot = state.pendingCreate;
          if (!snapshot) return;
          const created = [...app.evaluationActivities].reverse().find((activity) => !snapshot.knownIds.has(activity.id) && (!snapshot.classId || activity.classId === snapshot.classId))
            || [...app.evaluationActivities].reverse().find((activity) => !snapshot.knownIds.has(activity.id))
            || null;
          state.pendingCreate = null;
          render(created?.classId || snapshot.classId || state.classId, created?.id || state.activityId);
        }, 180);
      }, true);

      ["activity-duplicate-button", "activity-delete-button", "activity-edit-button", "activity-cancel-edit"].forEach((id) => {
        byId(id)?.addEventListener("click", () => {
          window.setTimeout(() => render(state.classId, state.activityId), 220);
        }, true);
      });

      window.__cielRefreshEvaluationSessionPanelSafe = (classId = "", activityId = "") => render(classId || state.classId, activityId || state.activityId);
      window.__cielScheduleActivityCardsLayoutSafe = () => render(state.classId, state.activityId);
      window.__cielRenderActivityCardsLayoutSafe = () => render(state.classId, state.activityId);

      render();
      window.setTimeout(() => render(state.classId, state.activityId), 120);
      window.setTimeout(() => render(state.classId, state.activityId), 260);
    }

    bind();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();

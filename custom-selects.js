(() => {
  if (window.__cielCustomSelectsBound) return;
  window.__cielCustomSelectsBound = true;

  const states = new WeakMap();

  function repair(text) {
    const value = String(text ?? "");
    if (typeof window.repairDisplaySourceString === "function") {
      return window.repairDisplaySourceString(value);
    }
    return value
      .replace(/Ã©/g, "é")
      .replace(/Ã¨/g, "è")
      .replace(/Ã /g, "à")
      .replace(/Ãª/g, "ê")
      .replace(/Ã«/g, "ë")
      .replace(/Ã®/g, "î")
      .replace(/Ã¯/g, "ï")
      .replace(/Ã´/g, "ô")
      .replace(/Ã¶/g, "ö")
      .replace(/Ã¹/g, "ù")
      .replace(/Ã»/g, "û")
      .replace(/Ã¼/g, "ü")
      .replace(/Ã§/g, "ç")
      .replace(/Å“/g, "œ")
      .replace(/Â°/g, "°")
      .replace(/â€™/g, "’")
      .replace(/â€“/g, "–")
      .replace(/â€”/g, "—")
      .replace(/â€¦/g, "…");
  }

  function isEligible(select) {
    return select instanceof HTMLSelectElement
      && !select.multiple
      && Number(select.size || 1) <= 1
      && !select.dataset.noCustomSelect
      && !select.closest(".cmx-select");
  }

  function closeAll(except = null) {
    document.querySelectorAll(".cmx-select.is-open").forEach((wrapper) => {
      if (wrapper === except) return;
      wrapper.classList.remove("is-open");
      const trigger = wrapper.querySelector(".cmx-select-trigger");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
      const select = wrapper.querySelector("select.cmx-native-select-source");
      const state = select ? states.get(select) : null;
      if (state?.menu) state.menu.style.display = "none";
    });
  }

  function positionMenu(select) {
    const state = states.get(select);
    if (!state) return;
    const { wrapper, menu } = state;
    const rect = wrapper.getBoundingClientRect();
    menu.style.width = `${rect.width}px`;
    menu.style.left = `${rect.left + window.scrollX}px`;
    menu.style.top = `${rect.bottom + window.scrollY + 8}px`;
  }

  function getSnapshot(select) {
    const options = [...select.options].map((option) => [
      option.value,
      option.textContent,
      option.disabled ? "1" : "0",
      option.selected ? "1" : "0"
    ].join("::")).join("||");
    return [
      select.value,
      select.selectedIndex,
      select.disabled ? "1" : "0",
      select.hidden ? "1" : "0",
      select.style.display || "",
      options
    ].join("##");
  }

  function setValue(select, value) {
    if (select.value === value) {
      syncSelect(select);
      closeAll();
      return;
    }
    select.value = value;
    const eventOptions = { bubbles: true };
    select.dispatchEvent(new Event("input", eventOptions));
    select.dispatchEvent(new Event("change", eventOptions));
    syncSelect(select);
    closeAll();
  }

  function renderOptions(select) {
    const state = states.get(select);
    if (!state) return;
    const { menu } = state;
    const fragment = document.createDocumentFragment();

    [...select.children].forEach((node) => {
      if (node.tagName === "OPTGROUP") {
        const group = document.createElement("div");
        group.className = "cmx-select-group";
        group.textContent = repair(node.label || "");
        fragment.appendChild(group);
        [...node.children].forEach((option) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "cmx-select-option";
          if (option.selected) button.classList.add("is-selected");
          if (option.disabled) button.disabled = true;
          button.textContent = repair(option.textContent || "");
          button.dataset.value = option.value;
          button.addEventListener("click", () => setValue(select, option.value));
          fragment.appendChild(button);
        });
        return;
      }

      if (node.tagName === "OPTION") {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "cmx-select-option";
        if (node.selected) button.classList.add("is-selected");
        if (node.disabled) button.disabled = true;
        button.textContent = repair(node.textContent || "");
        button.dataset.value = node.value;
        button.addEventListener("click", () => setValue(select, node.value));
        fragment.appendChild(button);
      }
    });

    menu.replaceChildren(fragment);
  }

  function syncSelect(select) {
    const state = states.get(select);
    if (!state) return;
    const { wrapper, trigger, label } = state;
    const selectedOption = select.options[select.selectedIndex] || select.options[0];
    label.textContent = repair(selectedOption?.textContent || "");
    trigger.disabled = !!select.disabled;
    wrapper.classList.toggle("is-disabled", !!select.disabled);
    wrapper.hidden = !!select.hidden;
    wrapper.style.display = select.style.display === "none" ? "none" : "";
    if (wrapper.hidden || wrapper.style.display === "none") {
      wrapper.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      state.menu.style.display = "none";
    }
    renderOptions(select);
    state.snapshot = getSnapshot(select);
  }

  function enhanceSelect(select) {
    if (!isEligible(select) || states.has(select)) return;

    const wrapper = document.createElement("div");
    wrapper.className = "cmx-select";

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "cmx-select-trigger";
    trigger.setAttribute("aria-expanded", "false");

    const label = document.createElement("span");
    label.className = "cmx-select-label";
    const caret = document.createElement("span");
    caret.className = "cmx-select-caret";
    caret.setAttribute("aria-hidden", "true");
    caret.textContent = "▾";

    trigger.append(label, caret);

    const menu = document.createElement("div");
    menu.className = "cmx-select-menu";
    menu.style.display = "none";

    select.classList.add("cmx-native-select-source");

    select.parentNode.insertBefore(wrapper, select);
    wrapper.append(select, trigger);
    document.body.appendChild(menu);

    const observer = new MutationObserver(() => syncSelect(select));
    observer.observe(select, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["disabled", "hidden", "style"]
    });

    trigger.addEventListener("click", () => {
      if (select.disabled) return;
      const willOpen = !wrapper.classList.contains("is-open");
      closeAll(wrapper);
      wrapper.classList.toggle("is-open", willOpen);
      trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
      if (willOpen) {
        positionMenu(select);
        menu.style.display = "grid";
      } else {
        menu.style.display = "none";
      }
    });

    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        wrapper.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
      }
    });

    select.addEventListener("change", () => syncSelect(select));

    states.set(select, {
      wrapper,
      trigger,
      label,
      menu,
      observer,
      snapshot: ""
    });

    syncSelect(select);
  }

  function enhanceAll(root = document) {
    root.querySelectorAll("select").forEach(enhanceSelect);
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest(".cmx-select")) return;
    closeAll();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAll();
  });

  window.addEventListener("resize", () => {
    document.querySelectorAll("select.cmx-native-select-source").forEach((select) => {
      const state = states.get(select);
      if (state?.wrapper.classList.contains("is-open")) positionMenu(select);
    });
  });

  window.addEventListener("scroll", () => {
    document.querySelectorAll("select.cmx-native-select-source").forEach((select) => {
      const state = states.get(select);
      if (state?.wrapper.classList.contains("is-open")) positionMenu(select);
    });
  }, true);

  const bodyObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.matches?.("select")) enhanceSelect(node);
        enhanceAll(node);
      });
    });
  });

  function pollSync() {
    document.querySelectorAll("select.cmx-native-select-source").forEach((select) => {
      const state = states.get(select);
      if (!state) return;
      const snapshot = getSnapshot(select);
      if (snapshot !== state.snapshot) syncSelect(select);
    });
  }

  function boot() {
    enhanceAll(document);
    if (document.body) {
      bodyObserver.observe(document.body, { childList: true, subtree: true });
    }
    window.setInterval(pollSync, 250);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();

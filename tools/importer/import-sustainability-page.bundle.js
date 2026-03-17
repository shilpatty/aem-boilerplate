var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-sustainability-page.js
  var import_sustainability_page_exports = {};
  __export(import_sustainability_page_exports, {
    default: () => import_sustainability_page_default
  });

  // tools/importer/parsers/hero-climate.js
  function parse(element, { document: document2 }) {
    let bgImage = element.querySelector(":scope > img, :scope > picture img");
    if (!bgImage) {
      const cs = window.getComputedStyle(element);
      const bgStyle = cs.backgroundImage || element.style.backgroundImage;
      if (bgStyle && bgStyle !== "none") {
        const urlMatch = bgStyle.match(/url\(["']?(.*?)["']?\)/);
        if (urlMatch && urlMatch[1]) {
          bgImage = document2.createElement("img");
          bgImage.src = urlMatch[1];
        }
      }
    }
    const heading = element.querySelector(".panels-hero-header h1, h1");
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (contentCell.length > 0) {
      cells.push(contentCell);
    }
    const childBlockTables = [...element.querySelectorAll(":scope table")].map((t) => t.closest("div") || t);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-climate", cells });
    element.replaceWith(block);
    childBlockTables.forEach((cb) => {
      block.after(cb);
    });
  }

  // tools/importer/parsers/columns-stats.js
  function parse2(element, { document: document2 }) {
    const panels = element.querySelectorAll(".hero-panels-panel");
    const row = [];
    panels.forEach((panel) => {
      const cellContent = [];
      const title = panel.querySelector(".text-panel-title");
      if (title && title.textContent.trim()) {
        const h = document2.createElement("p");
        h.textContent = title.textContent.trim();
        h.style.fontWeight = "bold";
        cellContent.push(h);
      }
      const body = panel.querySelector(".text-panel-body");
      if (body) {
        const paragraphs = body.querySelectorAll("p");
        paragraphs.forEach((p) => {
          if (p.textContent.trim()) {
            cellContent.push(p);
          }
        });
      }
      if (cellContent.length > 0) {
        row.push(cellContent);
      }
    });
    const cells = [];
    if (row.length > 0) {
      cells.push(row);
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "columns-stats", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-climate.js
  function parse3(element, { document: document2 }) {
    const sections = element.querySelectorAll(".jmaccrdn__section");
    const cells = [];
    sections.forEach((section) => {
      const titleSpan = section.querySelector(".jmaccrdn__title-text");
      const title = titleSpan ? titleSpan.textContent.trim() : "";
      const body = section.querySelector(".jmaccrdn__body");
      const titleCell = document2.createElement("p");
      titleCell.textContent = title;
      const bodyCell = [];
      if (body) {
        const paragraphs = body.querySelectorAll(".jmaccrdn__answer-sec p, p");
        paragraphs.forEach((p) => {
          if (p.textContent.trim()) {
            bodyCell.push(p);
          }
        });
      }
      if (title) {
        cells.push([titleCell, bodyCell.length > 0 ? bodyCell : ""]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "accordion-climate", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/matthey-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        // Header: <header id="banner" class="jmheader--fixed">
        "header#banner",
        // Navigation: <nav id="navigation" class="jmheader__navbar">
        "nav#navigation",
        // Skip nav: <nav class="quick-access-nav">
        "nav.quick-access-nav",
        // Mobile nav toggle
        ".nav__toggler",
        // Breadcrumbs: <nav id="breadcrumbs">
        "nav#breadcrumbs",
        // Footer: <div class="container-fluid bg--theme">
        ".bg--theme",
        // Hidden form
        "form.hide",
        // Safe element cleanup
        "noscript",
        "link",
        "iframe"
      ]);
    }
  }

  // tools/importer/transformers/matthey-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const template = payload && payload.template;
      if (!template || !template.sections || template.sections.length < 2) return;
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-sustainability-page.js
  var PAGE_TEMPLATE = {
    name: "sustainability-page",
    description: "Sustainability topic page covering climate-related content and initiatives",
    urls: [
      "https://matthey.com/sustainability/climate"
    ],
    blocks: [
      {
        name: "hero-climate",
        instances: [".panels-hero"]
      },
      {
        name: "columns-stats",
        instances: [".panels-hero-panels"]
      },
      {
        name: "accordion-climate",
        instances: [".jmaccrdn"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Section",
        selector: ".panels-hero",
        style: null,
        blocks: ["hero-climate", "columns-stats"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Emissions and Net Zero Content",
        selector: ".jmrich--text-inner",
        style: null,
        blocks: [],
        defaultContent: [".rich--text-details h4", ".rich--text-details p", ".rich--text-details picture"]
      },
      {
        id: "section-3",
        name: "Accordion Section",
        selector: ".jmaccrdn",
        style: null,
        blocks: ["accordion-climate"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Call to Action",
        selector: ".jmlistblock",
        style: "grey",
        blocks: [],
        defaultContent: [".jmlistblock__title", ".jmlistblock__summary", ".jmlistblock__link"]
      }
    ]
  };
  var parsers = {
    "hero-climate": parse,
    "columns-stats": parse2,
    "accordion-climate": parse3
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function getDepth(el) {
    let depth = 0;
    let node = el;
    while (node.parentElement) {
      depth += 1;
      node = node.parentElement;
    }
    return depth;
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document2.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element
          });
        });
      });
    });
    pageBlocks.sort((a, b) => getDepth(b.element) - getDepth(a.element));
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_sustainability_page_default = {
    transform: (payload) => {
      const { document: document2, url, html, params } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document: document2, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document2.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document2.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_sustainability_page_exports);
})();

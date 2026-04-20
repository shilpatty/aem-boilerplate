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

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-saga.js
  function parse(element, { document }) {
    const bgImage = element.querySelector(".hero-banner__img, .promotional-banner__img");
    const heading = element.querySelector(".hero-banner__title, .promotional-banner__title, h1, h2");
    const body = element.querySelector(".hero-banner__body, .promotional-banner__body");
    const cta = element.querySelector(".hero-banner__cta, .promotional-banner__cta, a.button");
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentWrapper = document.createElement("div");
    if (heading) contentWrapper.append(heading);
    if (body) contentWrapper.append(body);
    if (cta) contentWrapper.append(cta);
    if (contentWrapper.childNodes.length > 0) {
      cells.push([contentWrapper]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-saga", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-campaign.js
  function parse2(element, { document }) {
    const cards = element.querySelectorAll(".card.campaign-pod");
    const cells = [];
    cards.forEach((card) => {
      const image = card.querySelector(".card__image img");
      const title = card.querySelector(".card__title");
      const body = card.querySelector(".card__body");
      const cta = card.querySelector("a.expanded-link, a.card__cta");
      const imageCell = document.createElement("div");
      if (image) imageCell.append(image);
      const textCell = document.createElement("div");
      if (title) {
        const heading = document.createElement("strong");
        heading.textContent = title.textContent.trim();
        textCell.append(heading);
      }
      if (body) {
        const p = document.createElement("p");
        p.textContent = body.textContent.trim();
        textCell.append(p);
      }
      if (cta) textCell.append(cta);
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-campaign", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-tiles.js
  function parse3(element, { document }) {
    const tiles = element.querySelectorAll(".bu-tile");
    const cells = [];
    tiles.forEach((tile) => {
      const image = tile.querySelector(".bu-image img");
      const title = tile.querySelector(".bu-text h3");
      const body = tile.querySelector(".bu-text p");
      const cta = tile.querySelector(".bu-cta a");
      const imageCell = document.createElement("div");
      if (image) imageCell.append(image);
      const textCell = document.createElement("div");
      if (title) {
        const heading = document.createElement("strong");
        heading.textContent = title.textContent.trim();
        textCell.append(heading);
      }
      if (body) {
        const p = document.createElement("p");
        p.textContent = body.textContent.trim();
        textCell.append(p);
      }
      if (cta) textCell.append(cta);
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-tiles", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-articles.js
  function parse4(element, { document }) {
    const cards = element.querySelectorAll(".mag-article-feed__card");
    const cells = [];
    cards.forEach((card) => {
      const image = card.querySelector(".card__image img");
      const titleLink = card.querySelector(".card__title a.expanded-link");
      const imageCell = document.createElement("div");
      if (image) imageCell.append(image);
      const textCell = document.createElement("div");
      if (titleLink) {
        const heading = document.createElement("strong");
        const link = document.createElement("a");
        link.href = titleLink.href;
        link.textContent = titleLink.textContent.trim();
        heading.append(link);
        textCell.append(heading);
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-articles", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-trust.js
  function parse5(element, { document }) {
    const title = element.querySelector(".trust-panel__title, h2");
    const description = element.querySelector(".trust-panel__description");
    const logoItems = element.querySelectorAll(".trust-panel__logo-item");
    const textCol = document.createElement("div");
    if (title) textCol.append(title);
    if (description) textCol.append(description);
    const logosCol = document.createElement("div");
    logoItems.forEach((item) => {
      const img = item.querySelector(".trust-panel__logo, img");
      if (img) {
        const link = document.createElement("a");
        link.href = item.href || "#";
        link.append(img);
        logosCol.append(link);
      }
    });
    const cells = [[textCol, logosCol]];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-trust", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/form.js
  function parse6(element, { document }) {
    var _a;
    const title = element.querySelector(".form-subscribe__title, h3, legend");
    const description = (_a = element.querySelector(".form-subscribe__content")) == null ? void 0 : _a.previousElementSibling;
    const contentCell = document.createElement("div");
    if (title) {
      const heading = document.createElement("h3");
      heading.textContent = title.textContent.trim();
      contentCell.append(heading);
    }
    const descP = element.querySelector("fieldset > .container--sm > p");
    if (descP) {
      const p = document.createElement("p");
      p.textContent = descP.textContent.trim();
      contentCell.append(p);
    }
    const cells = [[contentCell]];
    const block = WebImporter.Blocks.createBlock(document, { name: "form", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/saga-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        "#onetrust-banner-sdk",
        '[class*="onetrust"]',
        "#CybotCookiebotDialog",
        ".sticky-newsletter",
        "#adl_params"
      ]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        "nav.meganav",
        "footer.megafoot",
        "noscript",
        "iframe",
        "link"
      ]);
      element.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("data-di-res-id");
        el.removeAttribute("data-di-rand");
        el.removeAttribute("onclick");
      });
    }
  }

  // tools/importer/transformers/saga-sections.js
  function transform2(hookName, element, payload) {
    if (hookName === "afterTransform") {
      const { document } = payload;
      const template = payload.template;
      if (!template || !template.sections || template.sections.length < 2) return;
      const sections = [...template.sections].reverse();
      sections.forEach((section) => {
        let sectionEl = null;
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) return;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (section.id !== "section-1") {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      });
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-saga": parse,
    "cards-campaign": parse2,
    "cards-tiles": parse3,
    "cards-articles": parse4,
    "columns-trust": parse5,
    "form": parse6
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Saga homepage with hero banner, product categories, promotions, and brand messaging",
    urls: ["https://www.saga.co.uk/"],
    blocks: [
      { name: "hero-saga", instances: [".hero-banner", ".promotional-banner"] },
      { name: "cards-campaign", instances: ["main > .container > .campaign-pods"] },
      { name: "cards-tiles", instances: [".new-bu-container"] },
      { name: "cards-articles", instances: [".mag-article-feed"] },
      { name: "columns-trust", instances: [".trust-panel"] },
      { name: "form", instances: [".form-subscribe"] }
    ],
    sections: [
      { id: "section-1", name: "Hero Banner", selector: ".hero-banner", style: null, blocks: ["hero-saga"], defaultContent: [] },
      { id: "section-2", name: "Campaign Pods Top", selector: "main > .container:first-of-type", style: null, blocks: ["cards-campaign"], defaultContent: [] },
      { id: "section-3", name: "Business Unit Tiles", selector: ".nav-tiles", style: null, blocks: ["cards-tiles"], defaultContent: [] },
      { id: "section-4", name: "Promotional Banner", selector: [".container:has(.promotional-banner)", ".promotional-banner"], style: null, blocks: ["hero-saga"], defaultContent: [] },
      { id: "section-5", name: "Campaign Pods Bottom", selector: "main > .container:nth-of-type(4)", style: null, blocks: ["cards-campaign"], defaultContent: [] },
      { id: "section-6", name: "Magazine Article Feed", selector: ".mag-article-feed", style: null, blocks: ["cards-articles"], defaultContent: [] },
      { id: "section-7", name: "Trust Panel", selector: ".trust-panel", style: "dark", blocks: ["columns-trust"], defaultContent: [] },
      { id: "section-8", name: "Newsletter Signup", selector: ".form-subscribe", style: "light-blue", blocks: ["form"], defaultContent: [] }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element
          });
        });
      });
    });
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();

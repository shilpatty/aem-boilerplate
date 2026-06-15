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

  // tools/importer/import-car-insurance.js
  var import_car_insurance_exports = {};
  __export(import_car_insurance_exports, {
    default: () => import_car_insurance_default
  });

  // tools/importer/parsers/hero-product.js
  function parse(element, { document }) {
    const bgImage = element.querySelector(".hero__image img");
    const heading = element.querySelector(".hero__title, h1");
    const ctas = Array.from(element.querySelectorAll(".hero__ctas a.button"));
    const logos = Array.from(element.querySelectorAll(".hero__logos img"));
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentWrapper = document.createElement("div");
    if (heading) contentWrapper.append(heading);
    ctas.forEach((cta) => contentWrapper.append(cta));
    if (contentWrapper.childNodes.length > 0) {
      cells.push([contentWrapper]);
    }
    if (logos.length > 0) {
      const logosWrapper = document.createElement("div");
      logos.forEach((logo) => logosWrapper.append(logo));
      cells.push([logosWrapper]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-product", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-cta.js
  function parse2(element, { document }) {
    const grids = element.querySelectorAll(".content-double__grid");
    const cells = [];
    if (grids.length >= 2) {
      const row = [];
      grids.forEach((grid) => {
        const cell = document.createElement("div");
        const title = grid.querySelector(".content-double__title, h3");
        const desc = grid.querySelector(".content-double__description");
        const ctas = Array.from(grid.querySelectorAll(".content-double__cta a.button"));
        if (title) cell.append(title);
        if (desc) cell.append(desc);
        ctas.forEach((cta) => cell.append(cta));
        row.push(cell);
      });
      cells.push(row);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-cta", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-award.js
  function parse3(element, { document }) {
    const image = element.querySelector(".accreditation-callout__image");
    const title = element.querySelector(".accreditation-callout__title");
    const body = element.querySelector(".accreditation-callout__body");
    const cells = [];
    const imageCell = document.createElement("div");
    if (image) imageCell.append(image);
    const textCell = document.createElement("div");
    if (title) textCell.append(title);
    if (body) textCell.append(body);
    cells.push([imageCell, textCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-award", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-features.js
  function parse4(element, { document }) {
    const items = element.querySelectorAll(".content-group__item");
    const cells = [];
    items.forEach((item) => {
      const icon = item.querySelector(".content-group__item-icon img");
      const title = item.querySelector(".content-group__item-title");
      const desc = item.querySelector(".content-group__item-description");
      const imageCell = document.createElement("div");
      if (icon) imageCell.append(icon);
      const textCell = document.createElement("div");
      if (title) textCell.append(title);
      if (desc) textCell.append(desc);
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-features", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/table-compare.js
  function parse5(element, { document }) {
    const table = element.querySelector("table.table--comparison");
    if (!table) return;
    const cells = [];
    const headerRow = table.querySelector("thead tr");
    if (headerRow) {
      const headerCells = Array.from(headerRow.querySelectorAll("th")).map((th) => {
        var _a, _b;
        const badge = th.querySelector(".table__badge");
        const cellContent = document.createElement("div");
        cellContent.textContent = th.textContent.trim();
        if (badge) {
          const em = document.createElement("em");
          em.textContent = badge.textContent.trim();
          cellContent.textContent = ((_b = (_a = th.childNodes[0]) == null ? void 0 : _a.textContent) == null ? void 0 : _b.trim()) || th.textContent.replace(badge.textContent, "").trim();
          cellContent.append(document.createElement("br"), em);
        }
        return cellContent;
      });
      cells.push(headerCells);
    }
    const bodyRows = table.querySelectorAll("tbody tr");
    bodyRows.forEach((tr) => {
      const rowCells = Array.from(tr.querySelectorAll("td")).map((td) => {
        var _a;
        const subTitle = td.querySelector(".table__subheader-title");
        const subDesc = td.querySelector(".table__subheader-description");
        const icon = td.querySelector(".table__cmp-icon img");
        const text = td.querySelector(".table__cmp-text");
        if (subTitle) {
          const cell = document.createElement("div");
          const strong = document.createElement("strong");
          strong.textContent = subTitle.textContent.trim();
          cell.append(strong);
          if (subDesc) {
            const p = document.createElement("p");
            p.textContent = subDesc.textContent.trim();
            cell.append(p);
          }
          return cell;
        } else if (icon) {
          const title = icon.querySelector("title") || ((_a = icon.closest("svg")) == null ? void 0 : _a.querySelector("title"));
          const altText = title ? title.textContent.trim() : icon.alt || "";
          const isTick = altText.toLowerCase().includes("tick") || icon.closest(".table__cmp-icon--tick") !== null;
          return isTick ? "\u2713" : "\u2014";
        } else if (text) {
          return text.textContent.trim();
        }
        return "";
      });
      if (rowCells.length > 0) {
        cells.push(rowCells);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "table-compare", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-panels.js
  function parse6(element, { document }) {
    const panels = element.parentElement.querySelectorAll(".content-panel.content-panel--alt");
    const cells = [];
    panels.forEach((panel) => {
      const image = panel.querySelector(".content-panel__image");
      const title = panel.querySelector(".content-panel__title");
      const body = panel.querySelector(".content-panel__body");
      const cta = panel.querySelector("a.button");
      const imageCell = document.createElement("div");
      if (image) imageCell.append(image);
      const textCell = document.createElement("div");
      if (title) textCell.append(title);
      if (body) textCell.append(body);
      if (cta) textCell.append(cta);
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-panels", cells });
    element.replaceWith(block);
    panels.forEach((panel) => {
      if (panel !== element && panel.parentElement) {
        panel.remove();
      }
    });
  }

  // tools/importer/parsers/accordion-faq.js
  function parse7(element, { document }) {
    const items = element.querySelectorAll(".accordion__item");
    const cells = [];
    items.forEach((item) => {
      const title = item.querySelector(".accordion__title");
      const description = item.querySelector(".accordion__description");
      const titleCell = document.createElement("div");
      if (title) titleCell.textContent = title.textContent.trim();
      const contentCell = document.createElement("div");
      if (description) {
        Array.from(description.children).forEach((child) => {
          contentCell.append(child.cloneNode(true));
        });
      }
      cells.push([titleCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-links.js
  function parse8(element, { document }) {
    const items = element.querySelectorAll(".group-icon-button__list li");
    const cells = [];
    items.forEach((item) => {
      const link = item.querySelector("a");
      const icon = item.querySelector("img");
      const imageCell = document.createElement("div");
      if (icon) imageCell.append(icon);
      const textCell = document.createElement("div");
      if (link) {
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = link.textContent.trim();
        textCell.append(a);
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-links", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-reviews.js
  function parse9(element, { document }) {
    const cards = element.querySelectorAll(".testimonial__card");
    const cells = [];
    cards.forEach((card) => {
      const quotes = card.querySelectorAll("p");
      const name = card.querySelector(".testimonial__name");
      const imageCell = document.createElement("div");
      const textCell = document.createElement("div");
      quotes.forEach((p) => {
        if (!p.querySelector(".testimonial__name")) {
          const quote = document.createElement("p");
          quote.textContent = p.textContent.trim();
          textCell.append(quote);
        }
      });
      if (name) {
        const nameP = document.createElement("p");
        const em = document.createElement("em");
        em.textContent = name.textContent.trim();
        nameP.append(em);
        textCell.append(nameP);
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-reviews", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-articles.js
  function parse10(element, { document }) {
    let cards = element.querySelectorAll(".mag-article-feed__card");
    if (cards.length === 0) {
      cards = element.querySelectorAll(".card");
    }
    const cells = [];
    cards.forEach((card) => {
      const image = card.querySelector(".card__image img");
      const titleLink = card.querySelector(".card__title a.expanded-link, .card__title a");
      const body = card.querySelector(".card__body");
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
      if (body) {
        textCell.append(body);
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-articles", cells });
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
        "nav.anchor-nav",
        ".utility-bar",
        ".breadcrumb-container",
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

  // tools/importer/import-car-insurance.js
  var parsers = {
    "hero-product": parse,
    "columns-cta": parse2,
    "columns-award": parse3,
    "cards-features": parse4,
    "table-compare": parse5,
    "cards-panels": parse6,
    "accordion-faq": parse7,
    "cards-links": parse8,
    "carousel-reviews": parse9,
    "cards-articles": parse10
  };
  var transformers = [transform];
  var PAGE_TEMPLATE = {
    name: "car-insurance",
    description: "Car insurance product page with hero, comparison table, features, FAQs, testimonials, and article cards",
    urls: ["https://www.saga.co.uk/car-insurance"],
    blocks: [
      { name: "hero-product", instances: [".hero.hero--large"] },
      { name: "columns-cta", instances: [".content-double"] },
      { name: "columns-award", instances: [".accreditation-callout"] },
      { name: "cards-features", instances: [".content-group.content-group--lg"] },
      { name: "table-compare", instances: [".table.table--comparison"] },
      { name: "cards-panels", instances: [".content-panel.content-panel--alt"] },
      { name: "accordion-faq", instances: [".accordion.accordion--stacked", "#anchor_FAQs .accordion"] },
      { name: "cards-links", instances: [".group-icon-button"] },
      { name: "carousel-reviews", instances: [".testimonial"] },
      { name: "cards-articles", instances: [".card-carousel"] }
    ],
    sections: [
      { id: "section-1", name: "Hero Banner", selector: ".hero.hero--large", style: null, blocks: ["hero-product"], defaultContent: [] },
      { id: "section-2", name: "Important Notice and Introduction", selector: ".container:has(.alert.alert--large)", style: null, blocks: [], defaultContent: [".alert.alert--large.alert--white", "#anchor_Carinsurance .rich-text"] },
      { id: "section-3", name: "New and Existing Customer CTA", selector: ".content-double", style: null, blocks: ["columns-cta"], defaultContent: [] },
      { id: "section-4", name: "Which Accreditation Callout", selector: ".container:has(.accreditation-callout):nth-of-type(1)", style: null, blocks: ["columns-award"], defaultContent: [] },
      { id: "section-5", name: "Coverage Details and Features", selector: [".rich-text.rich-text__8-col", ".content-group.content-group--lg"], style: null, blocks: ["cards-features"], defaultContent: [] },
      { id: "section-6", name: "Provider Information Alert", selector: ".container:has(.alert__title)", style: null, blocks: [], defaultContent: [] },
      { id: "section-7", name: "Compare Cover Table", selector: ["#anchor_Comparecover", ".table.table--comparison"], style: null, blocks: ["table-compare"], defaultContent: ["#anchor_Comparecover", ".table__post-text"] },
      { id: "section-8", name: "Product Feature Panels", selector: ".content-panel.content-panel--alt", style: null, blocks: ["cards-panels"], defaultContent: [] },
      { id: "section-9", name: "What is Car Insurance Accordion", selector: "#anchor_Whatiscarinsurance", style: null, blocks: ["accordion-faq"], defaultContent: [".marble-divider"] },
      { id: "section-10", name: "Help Links", selector: ".group-icon-button", style: null, blocks: ["cards-links"], defaultContent: [] },
      { id: "section-11", name: "Customer Reviews", selector: "#anchor_Reviews", style: null, blocks: ["carousel-reviews"], defaultContent: [] },
      { id: "section-12", name: "Defaqto Accreditation Callout", selector: ".container:has(.accreditation-callout):last-of-type", style: null, blocks: ["columns-award"], defaultContent: [] },
      { id: "section-13", name: "Car Insurance FAQs", selector: "#anchor_FAQs", style: null, blocks: ["accordion-faq"], defaultContent: [] },
      { id: "section-14", name: "Bottom CTA Banner", selector: ".content-single.content-single__accent", style: "champagne-accent", blocks: [], defaultContent: [".content-single.content-single__accent"] },
      { id: "section-15", name: "More from Saga Cards", selector: ".card-carousel", style: null, blocks: ["cards-articles"], defaultContent: [] }
    ]
  };
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
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    return pageBlocks;
  }
  var import_car_insurance_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
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
      transform2.call(null, "afterTransform", main, __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE }));
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
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
  return __toCommonJS(import_car_insurance_exports);
})();

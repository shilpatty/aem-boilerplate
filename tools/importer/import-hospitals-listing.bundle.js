/* eslint-disable */
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

  // tools/importer/import-hospitals-listing.js
  var import_hospitals_listing_exports = {};
  __export(import_hospitals_listing_exports, {
    default: () => import_hospitals_listing_default
  });

  // tools/importer/parsers/hero-banner.js
  function parse(element, { document }) {
    const cells = [];
    let img = element.querySelector(
      ".hero-location-finder__inner > img, .hero-location-finder__inner img, picture img, picture, img"
    );
    if (!img) {
      const inner = element.querySelector(".hero-location-finder__inner");
      let bgUrl = "";
      if (inner && inner.style && inner.style.backgroundImage) {
        const m = inner.style.backgroundImage.match(/url\((['"]?)(.*?)\1\)/);
        if (m) bgUrl = m[2];
      }
      if (!bgUrl) {
        const styleEl = element.querySelector("style");
        if (styleEl) {
          const m = styleEl.textContent.match(/background-image:\s*url\((['"]?)(.*?)\1\)/);
          if (m) bgUrl = m[2];
        }
      }
      if (bgUrl) {
        img = document.createElement("img");
        img.setAttribute("src", bgUrl);
      }
    }
    const heading = element.querySelector(
      ".hero-location-finder__title, h1, h2"
    );
    const desc = element.querySelector(".hero-location-finder__desc");
    const descParagraphs = desc ? Array.from(desc.children) : Array.from(element.querySelectorAll(".hero-location-finder__copy > p, :scope p"));
    const imageCell = document.createElement("div");
    if (img) {
      const imageFrag = document.createDocumentFragment();
      imageFrag.appendChild(document.createComment(" field:image "));
      imageFrag.appendChild(img);
      imageCell.appendChild(imageFrag);
    }
    cells.push([imageCell]);
    const textCell = document.createElement("div");
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(" field:text "));
    if (heading) textFrag.appendChild(heading);
    descParagraphs.forEach((node) => textFrag.appendChild(node));
    textCell.appendChild(textFrag);
    cells.push([textCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-features.js
  function parse2(element, { document }) {
    const cells = [];
    let cardCells = Array.from(element.querySelectorAll(":scope > .grid__cell"));
    if (cardCells.length === 0) {
      cardCells = Array.from(element.querySelectorAll(".grid__cell"));
    }
    if (cardCells.length === 0 && element.classList.contains("grid__cell")) {
      cardCells = [element];
    }
    cardCells.forEach((cell) => {
      const img = cell.querySelector(".image-gallery__hero img, .image-gallery img, img");
      const bodyNodes = [];
      const serviceCardContent = cell.querySelector(".service-card__content");
      if (serviceCardContent) {
        Array.from(serviceCardContent.children).forEach((child) => bodyNodes.push(child));
      } else {
        Array.from(cell.querySelectorAll(":scope > p")).forEach((p) => bodyNodes.push(p));
      }
      const imageCell = document.createElement("div");
      if (img) {
        const imageFrag = document.createDocumentFragment();
        imageFrag.appendChild(document.createComment(" field:image "));
        imageFrag.appendChild(img);
        imageCell.appendChild(imageFrag);
      }
      const textCell = document.createElement("div");
      if (bodyNodes.length) {
        const textFrag = document.createDocumentFragment();
        textFrag.appendChild(document.createComment(" field:text "));
        bodyNodes.forEach((node) => textFrag.appendChild(node));
        textCell.appendChild(textFrag);
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-features", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-tiles.js
  function parse3(element, { document }) {
    const galleries = Array.from(element.querySelectorAll(".image-gallery"));
    const cells = [];
    galleries.forEach((gallery) => {
      const hero = gallery.querySelector(".image-gallery__hero") || gallery;
      const img = hero.querySelector("img");
      const imageLink = img ? img.closest("a") : null;
      const imageCell = [];
      imageCell.push(document.createComment(" field:image "));
      if (img) {
        imageCell.push(imageLink || img);
      }
      const tileRoot = gallery.parentElement || gallery;
      const textNodes = Array.from(tileRoot.children).filter(
        (child) => child !== gallery && !child.classList.contains("image-gallery") && (child.tagName === "P" || child.tagName === "H2" || child.tagName === "H3" || child.tagName === "H4" || /heading|title/i.test(child.className || ""))
      );
      const textCell = [];
      if (textNodes.length) {
        textCell.push(document.createComment(" field:text "));
        textCell.push(...textNodes);
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-tiles", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-locations.js
  function parse4(element, { document }) {
    const cards = Array.from(element.querySelectorAll(".location-finder__card"));
    const cells = [];
    cards.forEach((card) => {
      const imageCell = [];
      const textCell = [];
      const headingLink = card.querySelector('.location-finder__card__heading, a[class*="heading"]');
      const heading = card.querySelector(".js-location-name, .location-finder__card__heading h3, h3");
      const address = card.querySelector(".location-finder__address");
      const phone = card.querySelector('.location-finder__number, [class*="__number"]');
      const textContent = [];
      if (headingLink) {
        const a = document.createElement("a");
        a.setAttribute("href", headingLink.getAttribute("href") || "");
        const nameText = (heading ? heading.textContent : headingLink.textContent || "").replace(/ /g, " ").trim();
        a.textContent = nameText;
        const h3 = document.createElement("h3");
        h3.appendChild(a);
        textContent.push(h3);
      } else if (heading) {
        const nameText = heading.textContent.replace(/ /g, " ").trim();
        const h3 = document.createElement("h3");
        h3.textContent = nameText;
        textContent.push(h3);
      }
      if (address) textContent.push(address);
      if (phone) {
        const phoneText = phone.textContent.replace(/ /g, " ").trim();
        if (phoneText) {
          const p = document.createElement("p");
          p.textContent = phoneText;
          textContent.push(p);
        }
      }
      if (textContent.length) {
        textCell.push(document.createComment(" field:text "));
        textCell.push(...textContent);
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-locations", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse5(element, { document }) {
    const items = Array.from(element.querySelectorAll(":scope > li"));
    const cells = [];
    items.forEach((li) => {
      const question = li.querySelector(".toggle .question, .question, .toggle");
      const titleCell = document.createElement("div");
      if (question) {
        const labelText = question.textContent.replace(/ /g, " ").trim();
        if (labelText) {
          const titleFrag = document.createDocumentFragment();
          titleFrag.appendChild(document.createComment(" field:title "));
          const heading = document.createElement("h3");
          heading.textContent = labelText;
          titleFrag.appendChild(heading);
          titleCell.appendChild(titleFrag);
        }
      }
      const panel = li.querySelector(".inner.panel, .panel, .inner");
      const textCell = document.createElement("div");
      if (panel) {
        const textFrag = document.createDocumentFragment();
        const wrapper = document.createElement("div");
        Array.from(panel.childNodes).forEach((node) => wrapper.appendChild(node));
        if (wrapper.textContent.replace(/ /g, " ").trim() || wrapper.querySelector("a, img, ul, ol")) {
          textFrag.appendChild(document.createComment(" field:text "));
          textFrag.appendChild(wrapper);
          textCell.appendChild(textFrag);
        }
      }
      cells.push([titleCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-about.js
  function parse6(element, { document }) {
    let gridCells = Array.from(element.querySelectorAll(":scope > .grid__cell"));
    if (gridCells.length === 0) {
      gridCells = Array.from(element.querySelectorAll(".grid__cell"));
    }
    let imageCell = null;
    let contentCell = null;
    gridCells.forEach((cell) => {
      const hasImage = cell.querySelector(".image-gallery, picture, img");
      if (hasImage && !imageCell) {
        imageCell = cell;
      } else if (!contentCell) {
        contentCell = cell;
      }
    });
    if (!imageCell && gridCells.length) [imageCell] = gridCells;
    if (!contentCell && gridCells.length > 1) {
      contentCell = gridCells.find((c) => c !== imageCell) || null;
    }
    const imageColumn = document.createElement("div");
    if (imageCell) {
      const img = imageCell.querySelector(".image-gallery__hero img, .image-gallery img, picture, img");
      if (img) imageColumn.appendChild(img);
    }
    const contentColumn = document.createElement("div");
    if (contentCell) {
      Array.from(contentCell.children).forEach((child) => {
        const text = child.textContent.replace(/ /g, " ").trim();
        const hasLink = child.querySelector("a");
        const hasImage = child.querySelector("picture, img");
        if (text || hasLink || hasImage) {
          contentColumn.appendChild(child);
        }
      });
    }
    const cells = [[imageColumn, contentColumn]];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-about", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/form.js
  function parse7(element, { document }) {
    const rawName = (element.getAttribute("name") || element.id || "form").trim();
    const sanitized = rawName.toLowerCase().replace(/[^a-z0-9-_]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "form";
    const jsonFile = `${sanitized}.json`;
    const link = document.createElement("a");
    link.href = jsonFile;
    link.textContent = jsonFile;
    const cells = [[link]];
    const block = WebImporter.Blocks.createBlock(document, { name: "form", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-articles.js
  function parse8(element, { document }) {
    const cells = [];
    let cardEls = Array.from(element.querySelectorAll(".promo-editorial-wrapper > .promo-editorial"));
    if (cardEls.length === 0) {
      cardEls = Array.from(element.querySelectorAll(".promo-editorial"));
    }
    if (cardEls.length === 0 && element.classList.contains("promo-editorial")) {
      cardEls = [element];
    }
    cardEls.forEach((card) => {
      const img = card.querySelector("picture img, img");
      const link = card.querySelector("a.promo-editorial__link, a[href]");
      const headingEl = card.querySelector(".promo-editorial__heading, h2, h3, h4");
      const titleSpan = headingEl ? headingEl.querySelector("span") : null;
      const titleText = (titleSpan ? titleSpan.textContent : headingEl ? headingEl.textContent : "").replace(/\s+/g, " ").trim();
      const imageCell = document.createElement("div");
      {
        const imageFrag = document.createDocumentFragment();
        imageFrag.appendChild(document.createComment(" field:image "));
        if (img) imageFrag.appendChild(img);
        imageCell.appendChild(imageFrag);
      }
      const imageAltCell = document.createElement("div");
      {
        const altFrag = document.createDocumentFragment();
        altFrag.appendChild(document.createComment(" field:imageAlt "));
        const altText = img && img.getAttribute("alt") ? img.getAttribute("alt").trim() : titleText;
        if (altText) altFrag.appendChild(document.createTextNode(altText));
        imageAltCell.appendChild(altFrag);
      }
      const textCell = document.createElement("div");
      {
        const textFrag = document.createDocumentFragment();
        textFrag.appendChild(document.createComment(" field:text "));
        if (titleText) {
          const heading = document.createElement("h3");
          const href = link ? link.getAttribute("href") : null;
          if (href) {
            const a = document.createElement("a");
            a.setAttribute("href", href);
            a.textContent = titleText;
            heading.appendChild(a);
          } else {
            heading.textContent = titleText;
          }
          textFrag.appendChild(heading);
        }
        textCell.appendChild(textFrag);
      }
      cells.push([imageCell, imageAltCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-articles", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/nuffield-cleanup.js
  var TransformHook = {
    beforeTransform: "beforeTransform",
    afterTransform: "afterTransform"
  };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#ccc",
        // cookie-consent container (includes #ccc-overlay, #ccc-notify, .ccc-*)
        "#ccc-overlay",
        "#ccc-notify",
        ".browser-notification"
        // legacy IE upgrade prompt (homepage line 1035: #action_insert_*)
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".nav",
        "#nav",
        ".nav__skiplink",
        "#focus-on-nav",
        ".footer",
        "#sprite",
        ".pac-container"
      ]);
      WebImporter.DOMUtils.remove(element, [
        'iframe[id^="destination_publishing_iframe"]',
        ".aamIframeLoaded",
        "#AWIN_CDT",
        'img[src*="lantern.roeye.com"]',
        "iframe.doctify-widget",
        ".g-recaptcha",
        ".g-recaptcha-bubble-arrow",
        'iframe[src*="recaptcha"]'
      ]);
      WebImporter.DOMUtils.remove(element, [
        'iframe[src="about:blank"]',
        "noscript",
        "link"
      ]);
    }
  }

  // tools/importer/transformers/nuffield-sections.js
  var TransformHook2 = {
    beforeTransform: "beforeTransform",
    afterTransform: "afterTransform"
  };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const template = payload && payload.template;
      const sections = template && template.sections;
      if (!sections || sections.length < 2) {
        return;
      }
      const doc = element.ownerDocument;
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (!section || !section.selector) {
          continue;
        }
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) {
          continue;
        }
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(doc, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(metaBlock);
        }
        if (i > 0) {
          const hr = doc.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-hospitals-listing.js
  var parsers = {
    "hero-banner": parse,
    "cards-features": parse2,
    "cards-tiles": parse3,
    "cards-locations": parse4,
    "accordion-faq": parse5,
    "columns-about": parse6,
    form: parse7,
    "cards-articles": parse8
  };
  var PAGE_TEMPLATE = {
    name: "hospitals-listing",
    description: "Hospitals listing page presenting Nuffield Health hospital locations, search/filter, and supporting content",
    urls: [
      "https://www.nuffieldhealth.com/hospitals?ref=main-nav"
    ],
    blocks: [
      { name: "hero-banner", instances: [".hero-location-finder"] },
      { name: "cards-features", instances: ["#why-nuffield .grid--2"] },
      { name: "cards-tiles", instances: ["#how-can-we-help-you .grid--4"] },
      { name: "cards-locations", instances: ["#our-locations .location-finder"] },
      { name: "accordion-faq", instances: ["#your-journey .pcof-accordion", "#faqs .accordion"] },
      { name: "columns-about", instances: ["#ways-to-pay .grid--2"] },
      { name: "form", instances: ["form.form"] },
      { name: "cards-articles", instances: ["#articles .promo-editorial-scroller"] }
    ],
    sections: [
      {
        id: "hero",
        name: "Hero",
        selector: ".hero-location-finder",
        style: null,
        blocks: ["hero-banner"],
        defaultContent: []
      },
      {
        id: "why-nuffield",
        name: "Why choose Nuffield Health",
        selector: "#why-nuffield",
        style: "light",
        blocks: ["cards-features"],
        defaultContent: ["#why-nuffield .rich-text h2"]
      },
      {
        id: "how-can-we-help-you",
        name: "How can we help you today",
        selector: "#how-can-we-help-you",
        style: "light",
        blocks: ["cards-tiles"],
        defaultContent: ["#how-can-we-help-you .rich-text h2"]
      },
      {
        id: "our-locations",
        name: "Our locations",
        selector: "#our-locations",
        style: "light",
        blocks: ["cards-locations"],
        defaultContent: ["#our-locations .grid--1 h2"]
      },
      {
        id: "your-journey",
        name: "Your Nuffield Health journey",
        selector: "#your-journey",
        style: "limestone",
        blocks: ["accordion-faq"],
        defaultContent: ["#your-journey .cms-headings-h2"]
      },
      {
        id: "ways-to-pay",
        name: "Ways to pay",
        selector: "#ways-to-pay",
        style: "light",
        blocks: ["columns-about"],
        defaultContent: ["#ways-to-pay .rich-text .cms-headings-h2"]
      },
      {
        id: "faqs",
        name: "Frequently asked questions",
        selector: "#faqs",
        style: "light",
        blocks: ["accordion-faq"],
        defaultContent: ["#faqs .cms-headings-h2"]
      },
      {
        id: "ask-a-question",
        name: "Ask a question",
        selector: "#contact-us-form",
        style: "accent",
        blocks: ["form"],
        defaultContent: []
      },
      {
        id: "related-articles",
        name: "Related articles",
        selector: "#articles",
        style: "light",
        blocks: ["cards-articles"],
        defaultContent: []
      }
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
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
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
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_hospitals_listing_default = {
    transform: (payload) => {
      const {
        document,
        url,
        html,
        params
      } = payload;
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
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
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
  return __toCommonJS(import_hospitals_listing_exports);
})();

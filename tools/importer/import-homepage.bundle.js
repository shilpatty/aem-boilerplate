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

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
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

  // tools/importer/parsers/cards-services.js
  function parse3(element, { document }) {
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
      const textParagraphs = Array.from(cell.querySelectorAll(":scope > p"));
      const imageCell = document.createElement("div");
      if (img) {
        const imageFrag = document.createDocumentFragment();
        imageFrag.appendChild(document.createComment(" field:image "));
        imageFrag.appendChild(img);
        imageCell.appendChild(imageFrag);
      }
      const textCell = document.createElement("div");
      if (textParagraphs.length) {
        const textFrag = document.createDocumentFragment();
        textFrag.appendChild(document.createComment(" field:text "));
        textParagraphs.forEach((p) => textFrag.appendChild(p));
        textCell.appendChild(textFrag);
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-services", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-tiles.js
  function parse4(element, { document }) {
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

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-banner": parse,
    "cards-features": parse2,
    "cards-services": parse3,
    "cards-tiles": parse4
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Nuffield Health homepage with hero banner, service navigation, promotional content, and brand messaging",
    urls: [
      "https://www.nuffieldhealth.com/"
    ],
    blocks: [
      {
        name: "hero-banner",
        instances: [".hero-location-finder"]
      },
      {
        name: "cards-features",
        instances: ["#more-than-just-a-gym .grid--3"]
      },
      {
        name: "cards-services",
        instances: ["#gyms .grid--2", "#hospitals .grid--2"]
      },
      {
        name: "cards-tiles",
        instances: ["#more-from-nuffield .grid--4"]
      }
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
        id: "more-than-just-a-gym",
        name: "Welcome to Nuffield Health",
        selector: "#more-than-just-a-gym",
        style: null,
        blocks: ["cards-features"],
        defaultContent: ["#more-than-just-a-gym .rich-text h2", "#more-than-just-a-gym .rich-text p"]
      },
      {
        id: "gyms",
        name: "Fitness and Wellbeing Clubs",
        selector: "#gyms",
        style: null,
        blocks: ["cards-services"],
        defaultContent: ["#gyms .rich-text"]
      },
      {
        id: "hospitals",
        name: "Hospitals",
        selector: "#hospitals",
        style: null,
        blocks: ["cards-services"],
        defaultContent: ["#hospitals .rich-text"]
      },
      {
        id: "more-from-nuffield",
        name: "More from Nuffield Health",
        selector: "#more-from-nuffield",
        style: null,
        blocks: ["cards-tiles"],
        defaultContent: ["#more-from-nuffield .rich-text h2"]
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
  var import_homepage_default = {
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

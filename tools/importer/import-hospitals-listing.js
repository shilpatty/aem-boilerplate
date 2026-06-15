/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroBannerParser from './parsers/hero-banner.js';
import cardsFeaturesParser from './parsers/cards-features.js';
import cardsTilesParser from './parsers/cards-tiles.js';
import cardsLocationsParser from './parsers/cards-locations.js';
import accordionFaqParser from './parsers/accordion-faq.js';
import columnsAboutParser from './parsers/columns-about.js';
import formParser from './parsers/form.js';
import cardsArticlesParser from './parsers/cards-articles.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/nuffield-cleanup.js';
import sectionsTransformer from './transformers/nuffield-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-banner': heroBannerParser,
  'cards-features': cardsFeaturesParser,
  'cards-tiles': cardsTilesParser,
  'cards-locations': cardsLocationsParser,
  'accordion-faq': accordionFaqParser,
  'columns-about': columnsAboutParser,
  form: formParser,
  'cards-articles': cardsArticlesParser,
};

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'hospitals-listing',
  description: 'Hospitals listing page presenting Nuffield Health hospital locations, search/filter, and supporting content',
  urls: [
    'https://www.nuffieldhealth.com/hospitals?ref=main-nav',
  ],
  blocks: [
    { name: 'hero-banner', instances: ['.hero-location-finder'] },
    { name: 'cards-features', instances: ['#why-nuffield .grid--2'] },
    { name: 'cards-tiles', instances: ['#how-can-we-help-you .grid--4'] },
    { name: 'cards-locations', instances: ['#our-locations .location-finder'] },
    { name: 'accordion-faq', instances: ['#your-journey .pcof-accordion', '#faqs .accordion'] },
    { name: 'columns-about', instances: ['#ways-to-pay .grid--2'] },
    { name: 'form', instances: ['form.form'] },
    { name: 'cards-articles', instances: ['#articles .promo-editorial-scroller'] },
  ],
  sections: [
    {
      id: 'hero', name: 'Hero', selector: '.hero-location-finder', style: null,
      blocks: ['hero-banner'], defaultContent: [],
    },
    {
      id: 'why-nuffield', name: 'Why choose Nuffield Health', selector: '#why-nuffield', style: 'light',
      blocks: ['cards-features'], defaultContent: ['#why-nuffield .rich-text h2'],
    },
    {
      id: 'how-can-we-help-you', name: 'How can we help you today', selector: '#how-can-we-help-you', style: 'light',
      blocks: ['cards-tiles'], defaultContent: ['#how-can-we-help-you .rich-text h2'],
    },
    {
      id: 'our-locations', name: 'Our locations', selector: '#our-locations', style: 'light',
      blocks: ['cards-locations'], defaultContent: ['#our-locations .grid--1 h2'],
    },
    {
      id: 'your-journey', name: 'Your Nuffield Health journey', selector: '#your-journey', style: 'limestone',
      blocks: ['accordion-faq'], defaultContent: ['#your-journey .cms-headings-h2'],
    },
    {
      id: 'ways-to-pay', name: 'Ways to pay', selector: '#ways-to-pay', style: 'light',
      blocks: ['columns-about'], defaultContent: ['#ways-to-pay .rich-text .cms-headings-h2'],
    },
    {
      id: 'faqs', name: 'Frequently asked questions', selector: '#faqs', style: 'light',
      blocks: ['accordion-faq'], defaultContent: ['#faqs .cms-headings-h2'],
    },
    {
      id: 'ask-a-question', name: 'Ask a question', selector: '#contact-us-form', style: 'accent',
      blocks: ['form'], defaultContent: [],
    },
    {
      id: 'related-articles', name: 'Related articles', selector: '#articles', style: 'light',
      blocks: ['cards-articles'], defaultContent: [],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
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
          section: blockDef.section || null,
        });
      });
    });
  });
  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const {
      document, url, html, params,
    } = payload;

    const main = document.body;

    // 1. beforeTransform cleanup
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block
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

    // 4. afterTransform cleanup + section breaks/metadata
    executeTransformers('afterTransform', main, payload);

    // 5. WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};

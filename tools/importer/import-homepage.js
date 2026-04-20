/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroSagaParser from './parsers/hero-saga.js';
import cardsCampaignParser from './parsers/cards-campaign.js';
import cardsTilesParser from './parsers/cards-tiles.js';
import cardsArticlesParser from './parsers/cards-articles.js';
import columnsTrustParser from './parsers/columns-trust.js';
import formParser from './parsers/form.js';

// TRANSFORMER IMPORTS
import sagaCleanupTransformer from './transformers/saga-cleanup.js';
import sagaSectionsTransformer from './transformers/saga-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-saga': heroSagaParser,
  'cards-campaign': cardsCampaignParser,
  'cards-tiles': cardsTilesParser,
  'cards-articles': cardsArticlesParser,
  'columns-trust': columnsTrustParser,
  'form': formParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Saga homepage with hero banner, product categories, promotions, and brand messaging',
  urls: ['https://www.saga.co.uk/'],
  blocks: [
    { name: 'hero-saga', instances: ['.hero-banner', '.promotional-banner'] },
    { name: 'cards-campaign', instances: ['main > .container > .campaign-pods'] },
    { name: 'cards-tiles', instances: ['.new-bu-container'] },
    { name: 'cards-articles', instances: ['.mag-article-feed'] },
    { name: 'columns-trust', instances: ['.trust-panel'] },
    { name: 'form', instances: ['.form-subscribe'] },
  ],
  sections: [
    { id: 'section-1', name: 'Hero Banner', selector: '.hero-banner', style: null, blocks: ['hero-saga'], defaultContent: [] },
    { id: 'section-2', name: 'Campaign Pods Top', selector: 'main > .container:first-of-type', style: null, blocks: ['cards-campaign'], defaultContent: [] },
    { id: 'section-3', name: 'Business Unit Tiles', selector: '.nav-tiles', style: null, blocks: ['cards-tiles'], defaultContent: [] },
    { id: 'section-4', name: 'Promotional Banner', selector: ['.container:has(.promotional-banner)', '.promotional-banner'], style: null, blocks: ['hero-saga'], defaultContent: [] },
    { id: 'section-5', name: 'Campaign Pods Bottom', selector: 'main > .container:nth-of-type(4)', style: null, blocks: ['cards-campaign'], defaultContent: [] },
    { id: 'section-6', name: 'Magazine Article Feed', selector: '.mag-article-feed', style: null, blocks: ['cards-articles'], defaultContent: [] },
    { id: 'section-7', name: 'Trust Panel', selector: '.trust-panel', style: 'dark', blocks: ['columns-trust'], defaultContent: [] },
    { id: 'section-8', name: 'Newsletter Signup', selector: '.form-subscribe', style: 'light-blue', blocks: ['form'], defaultContent: [] },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  sagaCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sagaSectionsTransformer] : []),
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
 * Find all blocks on the page based on template configuration
 */
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
        });
      });
    });
  });
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    // 1. Execute beforeTransform transformers
    executeTransformers('beforeTransform', main, payload);

    // 2. Find and parse blocks
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

    // 3. Execute afterTransform transformers (cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 4. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 5. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
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

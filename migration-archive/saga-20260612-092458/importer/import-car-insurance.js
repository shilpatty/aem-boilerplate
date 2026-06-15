/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroProductParser from './parsers/hero-product.js';
import columnsCtaParser from './parsers/columns-cta.js';
import columnsAwardParser from './parsers/columns-award.js';
import cardsFeaturesParser from './parsers/cards-features.js';
import tableCompareParser from './parsers/table-compare.js';
import cardsPanelsParser from './parsers/cards-panels.js';
import accordionFaqParser from './parsers/accordion-faq.js';
import cardsLinksParser from './parsers/cards-links.js';
import carouselReviewsParser from './parsers/carousel-reviews.js';
import cardsArticlesParser from './parsers/cards-articles.js';

// TRANSFORMER IMPORTS
import sagaCleanupTransformer from './transformers/saga-cleanup.js';
import sagaSectionsTransformer from './transformers/saga-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-product': heroProductParser,
  'columns-cta': columnsCtaParser,
  'columns-award': columnsAwardParser,
  'cards-features': cardsFeaturesParser,
  'table-compare': tableCompareParser,
  'cards-panels': cardsPanelsParser,
  'accordion-faq': accordionFaqParser,
  'cards-links': cardsLinksParser,
  'carousel-reviews': carouselReviewsParser,
  'cards-articles': cardsArticlesParser,
};

// TRANSFORMER REGISTRY
const transformers = [sagaCleanupTransformer];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'car-insurance',
  description: 'Car insurance product page with hero, comparison table, features, FAQs, testimonials, and article cards',
  urls: ['https://www.saga.co.uk/car-insurance'],
  blocks: [
    { name: 'hero-product', instances: ['.hero.hero--large'] },
    { name: 'columns-cta', instances: ['.content-double'] },
    { name: 'columns-award', instances: ['.accreditation-callout'] },
    { name: 'cards-features', instances: ['.content-group.content-group--lg'] },
    { name: 'table-compare', instances: ['.table.table--comparison'] },
    { name: 'cards-panels', instances: ['.content-panel.content-panel--alt'] },
    { name: 'accordion-faq', instances: ['.accordion.accordion--stacked', '#anchor_FAQs .accordion'] },
    { name: 'cards-links', instances: ['.group-icon-button'] },
    { name: 'carousel-reviews', instances: ['.testimonial'] },
    { name: 'cards-articles', instances: ['.card-carousel'] },
  ],
  sections: [
    { id: 'section-1', name: 'Hero Banner', selector: '.hero.hero--large', style: null, blocks: ['hero-product'], defaultContent: [] },
    { id: 'section-2', name: 'Important Notice and Introduction', selector: '.container:has(.alert.alert--large)', style: null, blocks: [], defaultContent: ['.alert.alert--large.alert--white', '#anchor_Carinsurance .rich-text'] },
    { id: 'section-3', name: 'New and Existing Customer CTA', selector: '.content-double', style: null, blocks: ['columns-cta'], defaultContent: [] },
    { id: 'section-4', name: 'Which Accreditation Callout', selector: '.container:has(.accreditation-callout):nth-of-type(1)', style: null, blocks: ['columns-award'], defaultContent: [] },
    { id: 'section-5', name: 'Coverage Details and Features', selector: ['.rich-text.rich-text__8-col', '.content-group.content-group--lg'], style: null, blocks: ['cards-features'], defaultContent: [] },
    { id: 'section-6', name: 'Provider Information Alert', selector: '.container:has(.alert__title)', style: null, blocks: [], defaultContent: [] },
    { id: 'section-7', name: 'Compare Cover Table', selector: ['#anchor_Comparecover', '.table.table--comparison'], style: null, blocks: ['table-compare'], defaultContent: ['#anchor_Comparecover', '.table__post-text'] },
    { id: 'section-8', name: 'Product Feature Panels', selector: '.content-panel.content-panel--alt', style: null, blocks: ['cards-panels'], defaultContent: [] },
    { id: 'section-9', name: 'What is Car Insurance Accordion', selector: '#anchor_Whatiscarinsurance', style: null, blocks: ['accordion-faq'], defaultContent: ['.marble-divider'] },
    { id: 'section-10', name: 'Help Links', selector: '.group-icon-button', style: null, blocks: ['cards-links'], defaultContent: [] },
    { id: 'section-11', name: 'Customer Reviews', selector: '#anchor_Reviews', style: null, blocks: ['carousel-reviews'], defaultContent: [] },
    { id: 'section-12', name: 'Defaqto Accreditation Callout', selector: '.container:has(.accreditation-callout):last-of-type', style: null, blocks: ['columns-award'], defaultContent: [] },
    { id: 'section-13', name: 'Car Insurance FAQs', selector: '#anchor_FAQs', style: null, blocks: ['accordion-faq'], defaultContent: [] },
    { id: 'section-14', name: 'Bottom CTA Banner', selector: '.content-single.content-single__accent', style: 'champagne-accent', blocks: [], defaultContent: ['.content-single.content-single__accent'] },
    { id: 'section-15', name: 'More from Saga Cards', selector: '.card-carousel', style: null, blocks: ['cards-articles'], defaultContent: [] },
  ],
};

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
 * Find all blocks on the page using template selectors
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
          section: blockDef.section || null,
        });
      });
    });
  });
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;
    const main = document.body;

    // 1. Execute beforeTransform (cleanup)
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

    // 3. Execute afterTransform (site chrome removal + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 4. Section breaks and metadata (via section transformer)
    sagaSectionsTransformer.call(null, 'afterTransform', main, { ...payload, template: PAGE_TEMPLATE });

    // 5. Apply WebImporter built-in rules
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

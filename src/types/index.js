/**
 * JSDoc Type Definitions for better IDE support
 * @typedef {Object} Tool
 * @property {string} name - Tool name
 * @property {string} description - Tool description in markdown
 * @property {string[]} tags - Tool tags
 * @property {string} [url] - Tool URL
 * @property {number} [rating] - Tool rating (0-10)
 * @property {string} [price] - Price tier
 */

/**
 * @typedef {Object} ContentItem
 * @property {string} subtitle - Section subtitle
 * @property {string[]} text - Array of markdown content lines
 */

/**
 * @typedef {Object} Category
 * @property {string} title - Category title
 * @property {ContentItem[]} content - Category content items
 */

/**
 * @typedef {Object} HeroMetadata
 * @property {string} [totalTools] - Total tools count
 * @property {string} [lastUpdated] - Last update date
 * @property {string} [version] - Version number
 */

/**
 * @typedef {Object} ContentData
 * @property {Object} hero - Hero section data
 * @property {string} hero.title - Hero title
 * @property {string} hero.subtitle - Hero subtitle
 * @property {HeroMetadata} hero.metadata - Hero metadata
 * @property {Tool[]} topTools - Top tools array
 * @property {Category[]} categories - Categories array
 */

export {};

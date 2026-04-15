/**
 * Utility functions for the application
 */

/**
 * Safely extract rating from tool tags
 * @param {string[]} tags - Tool tags array
 * @returns {number} - Rating value (default 0)
 */
export function extractRating(tags) {
  if (!Array.isArray(tags)) return 0;
  
  const ratingTag = tags.find(t => t.includes('/10'));
  if (!ratingTag) return 0;
  
  const match = ratingTag.match(/(\d+\.?\d*)\/10/);
  return match ? parseFloat(match[1]) : 0;
}

/**
 * Safely extract price from tool tags
 * @param {string[]} tags - Tool tags array
 * @returns {string} - Price string (default 'Consultar')
 */
export function extractPrice(tags) {
  if (!Array.isArray(tags)) return 'Consultar';
  
  const priceTag = tags.find(t => 
    t.includes('Pago') || 
    t.includes('Gratis') || 
    t.includes('$') ||
    t.includes('Free') ||
    t.includes('Premium')
  );
  
  return priceTag || 'Consultar';
}

/**
 * Format tool name by removing special characters
 * @param {string} name - Raw tool name
 * @returns {string} - Cleaned tool name
 */
export function formatToolName(name) {
  if (!name) return 'Unknown Tool';
  return name.replace(/#/g, '').trim();
}

/**
 * Generate unique ID for list items
 * @param {any} item - Item to generate ID for
 * @param {number} index - Item index
 * @returns {string} - Unique ID
 */
export function generateId(item, index) {
  if (item?.id) return String(item.id);
  if (item?.name) return item.name.toLowerCase().replace(/\s+/g, '-');
  return `item-${index}`;
}

/**
 * Validate content data structure
 * @param {any} data - Data to validate
 * @returns {{ valid: boolean, errors: string[] }} - Validation result
 */
export function validateContentData(data) {
  const errors = [];
  
  if (!data) {
    errors.push('Content data is null or undefined');
    return { valid: false, errors };
  }
  
  if (!data.hero) {
    errors.push('Missing hero section');
  } else {
    if (!data.hero.title) errors.push('Hero title is missing');
    if (!data.hero.subtitle) errors.push('Hero subtitle is missing');
  }
  
  if (!Array.isArray(data.categories)) {
    errors.push('Categories must be an array');
  }
  
  if (!Array.isArray(data.topTools)) {
    errors.push('topTools must be an array');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Get default content when data fails to load
 * @returns {Object} - Default content structure
 */
export function getDefaultContent() {
  return {
    hero: {
      title: 'Herramientas de IA 2026',
      subtitle: 'Guía completa de herramientas de inteligencia artificial',
      metadata: {}
    },
    topTools: [],
    categories: []
  };
}

/**
 * Check if value is safely accessible
 * @param {any} value - Value to check
 * @returns {boolean} - True if value is safe to use
 */
export function isSafeValue(value) {
  return value !== null && value !== undefined && value !== '';
}

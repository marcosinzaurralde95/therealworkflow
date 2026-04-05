import { describe, it, expect } from 'vitest';
import { extractRating, extractPrice, formatToolName, generateId, validateContentData, getDefaultContent } from '../utils/helpers';

describe('Utility Functions', () => {
  describe('extractRating', () => {
    it('should extract rating from tags', () => {
      expect(extractRating(['Rating:9.5/10', 'Premium'])).toBe(9.5);
    });

    it('should return 0 when no rating found', () => {
      expect(extractRating(['Premium', 'Open Source'])).toBe(0);
    });

    it('should handle empty array', () => {
      expect(extractRating([])).toBe(0);
    });
  });

  describe('extractPrice', () => {
    it('should extract price info from tags', () => {
      expect(extractPrice(['$20/mes', 'Premium'])).toBe('$20/mes');
    });

    it('should return default when no price found', () => {
      expect(extractPrice(['Open Source'])).toBe('Consultar');
    });
  });

  describe('formatToolName', () => {
    it('should remove # characters', () => {
      expect(formatToolName('#ChatGPT')).toBe('ChatGPT');
    });

    it('should handle null/undefined', () => {
      expect(formatToolName(null)).toBe('Unknown Tool');
    });
  });

  describe('validateContentData', () => {
    it('should validate correct data', () => {
      const validData = {
        hero: { title: 'Test', subtitle: 'Test' },
        categories: [],
        topTools: []
      };
      expect(validateContentData(validData).valid).toBe(true);
    });

    it('should detect missing hero', () => {
      expect(validateContentData({}).valid).toBe(false);
    });
  });
});

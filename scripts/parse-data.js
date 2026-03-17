
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawPath = path.join(__dirname, '../src/data/raw.md');
const outputPath = path.join(__dirname, '../src/data/content.json');

const content = fs.readFileSync(rawPath, 'utf-8');
const lines = content.split('\n');

const data = {
    hero: {
        title: "HERRAMIENTAS DE INTELIGENCIA ARTIFICIAL 2026",
        subtitle: "Guía Completa, Detallada y Exhaustiva",
        metadata: {}
    },
    topTools: [],
    categories: [],
    glossary: []
};

let currentSection = null;
let currentTool = null;
let buffer = [];

function parseMetadata(line) {
    const [key, value] = line.split(':').map(s => s.trim());
    if (key && value) {
        data.hero.metadata[key.replace('**', '').replace('**', '')] = value;
    }
}

let inTopTools = false;
let inCategory = false;
let categoryName = "";

lines.forEach(line => {
    const trimmed = line.trim();

    // Metadata parsing at the start
    if (trimmed.startsWith('**') && !inTopTools && !inCategory) {
        parseMetadata(trimmed);
        return;
    }

    // Section Headers
    if (trimmed.startsWith('## ')) {
        const title = trimmed.replace('## ', '').trim();

        if (title.includes('TOP 20 HERRAMIENTAS')) {
            inTopTools = true;
            inCategory = false;
        } else if (title.includes('GLOSARIO')) {
            inTopTools = false;
            inCategory = false;
            // Handle glossary separately if needed, for now just skip strictly structured parsing
        } else {
            inTopTools = false;
            inCategory = true;
            categoryName = title.replace(/^[^\w]+/, ''); // Remove leading emojis/numbers
            data.categories.push({
                title: title,
                content: []
            });
        }
    }

    // Tool Parsing (H3)
    if (trimmed.startsWith('### ')) {
        const title = trimmed.replace('### ', '').trim();

        // If it's a tool in Top 20
        if (inTopTools && title.startsWith('#')) {
            if (currentTool) {
                // Save previous tool
                data.topTools.push(currentTool);
            }
            currentTool = {
                name: title,
                details: [],
                tags: []
            };
        } else if (inCategory) {
            // It's a sub-section in a category
            const currentCat = data.categories[data.categories.length - 1];
            currentCat.content.push({
                subtitle: title,
                text: []
            });
        }
    }

    // Content Parsing
    if (inTopTools && currentTool) {
        if (!trimmed.startsWith('###')) {
            currentTool.details.push(trimmed);
            // Extract tags crudely
            if (trimmed.includes('**Tipo:**')) {
                const parts = trimmed.split('|');
                parts.forEach(p => {
                    const [k, v] = p.split(':');
                    if (v) currentTool.tags.push(v.trim());
                });
            }
        }
    } else if (inCategory) {
        const currentCat = data.categories[data.categories.length - 1];
        if (currentCat && currentCat.content.length > 0) {
            currentCat.content[currentCat.content.length - 1].text.push(trimmed);
        }
    }
});

// Push last tool
if (currentTool) {
    data.topTools.push(currentTool);
}

// Clean up tool details
data.topTools.forEach(tool => {
    tool.description = tool.details.join('\n').trim();
});

fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

console.log('Parsed content saved to src/data/content.json');

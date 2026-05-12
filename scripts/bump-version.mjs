import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function writeJson(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
}

function replaceInFile(p, oldStr, newStr) {
  const content = fs.readFileSync(p, 'utf8');
  const newContent = content.replaceAll(oldStr, newStr);
  fs.writeFileSync(p, newContent);
}

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Usage: node scripts/bump-version.mjs <new-version>');
  process.exit(1);
}

const newVersion = args[0];

// Update gemini-extension.json
const geminiPath = path.join(REPO_ROOT, 'gemini-extension.json');
const gemini = readJson(geminiPath);
const currentVersionFull = gemini.version;
const currentVersion = currentVersionFull.split('-')[0];

gemini.version = `${newVersion}-1`;

// Update MCP server version in args
gemini.mcpServers.coree.args = gemini.mcpServers.coree.args.map(arg => 
  arg.includes('@coree-ai/coree@') ? `@coree-ai/coree@${newVersion}` : arg
);

writeJson(geminiPath, gemini);

// Update hooks.json
const hooksPath = path.join(REPO_ROOT, 'hooks/hooks.json');
replaceInFile(hooksPath, currentVersion, newVersion);

console.log(`Bumped Gemini extension to ${newVersion}-1`);
console.log(`Updated MCP server reference to @coree-ai/coree@${newVersion}`);

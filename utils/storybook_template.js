import path from 'path';
import fs from 'fs';

const sbTemplates = path.join(__dirname, '../node_modules/@storybook/core/src/server/templates');
const interpolate = (string, data = {}) => Object.entries(data)
  .reduce((acc, [k, v]) => acc
    .replace(new RegExp(`%${k}%`, 'g'), v), string);

export function getPreviewBodyHtml() {
  return fs.readFileSync(
    path.resolve(path.join(`${sbTemplates}/base-preview-body.html`)),
    'utf8',
  );
}

export function getPreviewHeadHtml(configDirPath, interpolations) {
  const base = fs.readFileSync(
    path.resolve(path.join(`${sbTemplates}/base-preview-head.html`)),
    'utf8',
  );

  const headHtmlPath = path.resolve(configDirPath, 'preview-head.html');
  let result = base;

  if (fs.existsSync(headHtmlPath)) {
    result += fs.readFileSync(headHtmlPath, 'utf8');
  }
  return interpolate(result, interpolations);
}

export function getManagerHeadHtml(configDirPath, interpolations) {
  const base = fs.readFileSync(
    path.resolve(__dirname, `${sbTemplates}/base-manager-head.html`),
    'utf8',
  );

  const scriptPath = path.resolve(configDirPath, 'manager-head.html');
  let result = base;

  if (fs.existsSync(scriptPath)) {
    result += fs.readFileSync(scriptPath, 'utf8');
  }

  return interpolate(result, interpolations);
}

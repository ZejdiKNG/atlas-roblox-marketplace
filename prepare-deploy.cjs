const fs = require('fs');
const path = require('path');

const root = __dirname;
const ignored = ['node_modules', '.git', 'dist', '.DS_Store', 'deploy-payload.json', 'prepare-deploy.cjs', 'package-lock.json'];

function getFiles(dir, prefix = '') {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (ignored.includes(file)) continue;
    const fullPath = path.join(dir, file);
    const relPath = prefix ? prefix + '/' + file : file;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(fullPath, relPath));
    } else {
      results.push({
        file: relPath.replace(/\\/g, '/'),
        data: fs.readFileSync(fullPath, 'utf-8'),
        encoding: 'utf-8'
      });
    }
  }
  return results;
}

const files = getFiles(root);
console.log('Total files found:', files.length);

const payload = {
  requestBody: {
    name: 'atlas-roblox-marketplace',
    project: 'prj_yBo8QwBVhZivFszYhr2KWlD8ti1k',
    target: 'production',
    projectSettings: {
      framework: 'vite',
      outputDirectory: 'dist'
    },
    files: files
  }
};

fs.writeFileSync(path.join(root, 'deploy-payload.json'), JSON.stringify(payload));
console.log('Wrote deploy-payload.json. Total size:', fs.statSync(path.join(root, 'deploy-payload.json')).size, 'bytes');

const ghpages = require('gh-pages');
const path = 'build';

console.log('Deploy was started...');
ghpages.publish(path, {
  dest: 'sybon-view',
  repo: 'https://github.com/Ploffi/ploffi.github.io.git',
  branch: 'master'
}, (e) => e ? console.error(e) : console.log('hockey'));
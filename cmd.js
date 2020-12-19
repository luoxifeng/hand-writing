const glob = require('glob')
const debug = true;
const createMap= () => {
  if (!debug) new Map();
  const res = {};
  Object.defineProperties(res, {
    set: {
      value: function (k, v) {
        this[k] = v;
      },
    },
    get: {
      value: function (k) {
        return this[k];
      }
    }
  })
  return res;
};

function generateMarkdown(title) {
  glob('./!(node_modules)**/**/*.md', (err, files) => {
    const map = createMap();
    map.set('path', '.');
    map.set('title', title);
    map.set('mdTitle', `# ${title}`);
    map.set('root', true);

  
    const common = (map, [level0, level1, level2, ...list], isRoot) => {
      const level0Map = map.get(level0) || createMap();
      if (level0Map) {
        level0Map.set('path', `${map.get('path')}/${level0}`)
        level0Map.set('title', )
        isRoot && level0Map.set('mdTitle', `## ${level0}`);
        // isRoot
        map.set(level0, level0Map);
      }
      if (level1 === 'readme.md') {
        level0Map.set('hasReadme', true);
        level0Map.set('readmeLink', true);


      } else if (/.*?\.md/.test(level1)) {
        level0Map.set(level1, level1);
      }
  
      if (!list.length) return
  
      common(level0Map, [level1, level2, ...list], false);
    }
    const paths = files.map(path => path.split('\/').splice(1));
  
    paths.forEach(pathArr => {
  
      common(map, pathArr, true)
  
  
    })
    console.log(JSON.stringify(map, null, 2), paths);
  
  })
}

generateMarkdown('手写实现');
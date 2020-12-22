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

const createNode = (title = 'dddd', level = 0, path = '.', filter = t => t) => {
  const isFile = /\.md$/.test(title);
  return filter({
    title: isFile ? title.replace(/\.md$/, '') : title,
    level,
    path,
    isFile,
    hasReadme: false,
    readmePath: '',
    children: [],
  })
}

function generateMarkdown(title) {
  glob('./!(node_modules)**/**/*.md', (err, files) => {
    const root = createNode(title, 0, '.');
    const map = new Map();
  
    const common = (parent, [level0, level1, ...list]) => {
      const currentPath = `${parent.path}/${level0}`;
      const currentLevel= parent.level + 1;
      let currentNode = map.get(currentPath);
      if (!currentNode) {
        currentNode = createNode(level0, currentLevel, currentPath);
        map.set(currentPath, currentNode);
        parent.children.push(currentNode);
      }

      if (level1 === 'readme.md') {
        currentNode['hasReadme'] = true;
        currentNode['readmePath'] = `${currentPath}/readme.md`;
        // currentNode.set('readmeLink', true);


      } else if (/.*?\.md/.test(level1)) {
        currentNode.children.push(createNode(level1, currentLevel + 1, `${currentPath}/${level1}`));
      }
  
      if (list.length) {
        common(currentNode, [level1, ...list])
      }
    }
    const paths = files.map(path => path.split('\/').splice(1));

    paths.forEach(pathArr => common(root, pathArr));

    const wrapper = (_root) => {
      let curr = _root;
      function codeGenerator(node) {
        let pre = curr;
        curr = node;
        let res = ``;
  
        if (node.level === 0) {
  
        }
         
        node.map(child => {
          return codeGenerator(child);
        })
  
        node = pre
        return res;
      }

      codeGenerator(_root);

    }
   

    // console.log()


    console.log(JSON.stringify(root, null, 2), paths, wrapper(root));
  
  })
}

generateMarkdown('手写实现');
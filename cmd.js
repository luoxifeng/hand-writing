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

const createNode = (title = '', level = 0, path = '.', filter = t => t) => {
  const isFile = /\.md$/.test(title);
  const displayTitle = title.replace(/\.md$/, '')
  return filter({
    title: isFile ? displayTitle : title,
    level,
    path,
    isFile,
    readme: '',
    link: `[${displayTitle}](${path})`,
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

      currentNode['path'] = `${currentPath}`;

      if (level1 === 'readme.md') {
        currentNode['readme'] = `${currentPath}/readme.md`;
        currentNode['link'] = `[${currentNode.title}](${currentPath}/readme.md)`
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
      let target = _root;
      function codeGenerator(node) {
        let res = `\n`;
        let end = '';
  
        if (node.level - target.level === 0) {
          res += `# ${node.title}\n`
        } else if (node.level - target.level === 1) {
          res += `## ${node.title}\n`
        } else if (node.level - target.level >= 2) {
          // <details for="Object">
          //   <summary><a href="./javascript/Object/readme.md">🦆 Object</a></summary>

          //   - [new](./javascript/Object/new/readme.md)
          //   - [instanceof](./javascript/Object/instanceof/readme.md)
          // </details>
          if (!node.children.length) {
            res += `- [${node.title}](${node.path || node.readmePath})`
          } else {
            res += `<details for="${node.title}">\n`;
            res += `<summary>`;
            res += node.hasReadme ? `<a href="${node.path}">${node.title}</a>` : node.title;
            res += `</summary>\n`;
            end = '</details>\n'
          }
        } else {
          res += `- [${node.title}](${node.readmePath})\n`
        }
         
        res += node.children.map(child => {
          // !child.isFile && child.children.length && wrapper(child);

          return codeGenerator(child);
        }).join('\n') + end;
  
        // return res;
      }

      return codeGenerator(_root);

    }
   

    // console.log()


    console.log(JSON.stringify(root, null, 2), paths, wrapper(root));
  
  })
}

generateMarkdown('手写实现');
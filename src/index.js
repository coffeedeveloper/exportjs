const defaults = {
  mime: 'data:text/csv;charset=utf-8;',
  fileName: 'data.csv',
  columns: [],
  data: [],
  el: null,
  auto: true,
};

const extend = (target, ...args) => {
  for (let arg of args)
    for (let p in arg)
      target[p] = arg[p]
  return target;
};

const escapeContent = content => {
  content = String(content);
  content.replace(/"/g, '""');
  if (content.search(/("|,|\n)/g) > 0)
    content = `"${content}"`;
  return content;
};

const toCSV = options => {
  let opts = extend({}, defaults, options);

  let head = '';
  opts.columns.map(d => {
    head += d.title + ','
  });
  head = head.substr(0, head.length - 1);

  let content = '';
  opts.data.map(info => {
    if (Array.isArray(info)) {

    } else if (typeof info == 'object'){
      let str = '';
      opts.columns.map(p => {
        if (p.key in info) {
          str += escapeContent(info[p.key]) + ',';
        } else {
          console.warn(`property ${p.key} didn't in `, info);
        }
      });
      str = str.substr(0, str.length - 1);
      content += str + '\n';
    }
  });

  let blob = new Blob([head + '\n' + content], { type: opts.mime });

  if (opts.el) {
    opts.el.setAttribute('href', URL.createObjectURL(blob));
    opts.el.setAttribute('download', opts.fileName);
  }

  if (opts.auto) {
    let link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', opts.fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return blob;
};

const support = () => {
  if (typeof Blob == 'undefined') return false;
  if (typeof URL == 'undefined' || !'createObjectURL' in URL) return false;
  let link = document.createElement('a');
  if (!'download' in link) return false;
  return true;
};

export default {
  toCSV,
  support,
};
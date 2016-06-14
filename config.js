module.exports = {

  // specify versions you want to compare
  versions: [
    'csjs@1.0.0',
    // 'csjs@1.0.1',
    // 'csjs@1.0.2',
    // 'csjs@1.0.3',
    'csjs@1.0.4',
    ['https://github.com/scott113341/csjs/tarball/extract-extends-performance', 'scott113341@extract-extends-performance'],
  ],

  // specify fixtures you want to run
  // this.runAll takes precedence
  runAll: true,
  fixtures: [
    // '10-rules.css',
    // '10000-char-comment.css',
    // 'extends.css',
    // 'extends-tree.css',
    'simple.css',
  ],

};

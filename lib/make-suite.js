const Benchmark = require('benchmark');


module.exports = makeSuite;

function makeSuite() {
  const suite = new Benchmark.Suite;
  return suite
    .on('cycle', event => console.log(event.target.toString()))
    .on('error', err => console.log(err))
    .on('complete', () => {
      const fastest = suite.filter('fastest').map('name');
      const is_are = fastest.length === 1 ? 'is' : 'are';
      console.log(`Fastest ${is_are} ${fastest.join(', ')}`);
    });
}

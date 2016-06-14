'use strict';

const Benchmark = require('benchmark');
const fs = require('fs');
const path = require('path');
const niv = require('npm-install-version');

const config = require('./config.js');
config.versions.forEach(version => niv.install(version));


fs.readdirSync('fixtures')
  .filter(file => config.allFixtures || config.fixtures.includes(file))
  .map(file => ({
    name: file,
    suite: makeSuite(),
    css: fs.readFileSync(path.join('fixtures', file)).toString(),
  }))
  .forEach(benchmark => {
    config.versions.forEach(version => {
      const csjs = niv.require(version);
      benchmark.suite.add(version, () => csjs([benchmark.css]));
    });
    console.log(`\nBenchmarking ${benchmark.name}`);
    benchmark.suite.run();
  });


function makeSuite() {
  const suite = new Benchmark.Suite;
  suite
    .on('cycle', event => {
      console.log(event.target.toString());
    })
    .on('error', err => {
      console.log(err);
    })
    .on('complete', () => {
      console.log('Fastest is ' + suite.filter('fastest').map('name'));
    });
  return suite;
}

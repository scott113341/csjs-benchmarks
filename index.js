'use strict';

const fs = require('fs');
const path = require('path');
const niv = require('npm-install-version');

const makeSuite = require('./lib/make-suite.js');

const config = require('./config.js');
config.versions.forEach(version => niv.install(version));


const benchmarks = fs.readdirSync(path.join(__dirname, 'fixtures'))
  .filter(file => config.allFixtures || config.fixtures.includes(file))
  .map(file => ({
    name: file,
    suite: makeSuite(),
    css: fs.readFileSync(path.join(__dirname, 'fixtures', file)).toString(),
  }))
  .map(benchmark => {
    config.versions.forEach(version => {
      const csjs = niv.require(version);
      benchmark.suite.add(version, () => csjs([benchmark.css]));
    });
    console.log(`\nBenchmarking ${benchmark.name}`);
    benchmark.suite.run();
    return benchmark;
  });


config.versions.forEach(version => {
  const fastestBenchmarks = benchmarks.filter(benchmark => {
    return benchmark.suite.filter('fastest').map('name').includes(version);
  });
  const fastestCount = fastestBenchmarks.length;

  console.log(`\n${version} is fastest for ${fastestCount} benchmark${fastestCount === 1 ? '' : 's'}`);
  fastestBenchmarks.forEach(benchmark => console.log(` - ${benchmark.name}`));
});

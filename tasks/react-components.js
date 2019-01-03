import del from 'del';
import gulp from 'gulp';
import svgToJs from 'svg-to-jsx';
import fs from 'fs';
import {promisify} from 'util';
import loadPlugins from 'gulp-load-plugins';

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const plugins = loadPlugins();
const COPYRIGHT = '/*(c) Copyright 2018 Pivotal Software, Inc. All Rights Reserved.*/\n';
const srcFolder = 'src/react';
const buildFolder = 'dist/react';
const iconsPath = `${srcFolder}/iconography/icons.js`;

gulp.task('react-build-src', () => gulp.src(`${srcFolder}/**/*.js`)
  .pipe(plugins.plumber())
  .pipe(plugins.babel())
  .pipe(plugins.header(COPYRIGHT))
  .pipe(gulp.dest(buildFolder)));

gulp.task('react-build-svgs', async () => {
  const items = await readdir('./src/css/iconography/svgs');

  const svgInfos = items.map(item => ({
    item,
    promise: readFile(`./src/css/iconography/svgs/${item}`)
  }));

  const svgs = [];

  for (let i = 0; i < svgInfos.length; i++) {
    const {item, promise} = svgInfos[i];
    const name = item.replace(/\.svg$/, '');
    if (name.startsWith('.')) continue;

    const svg = await promise;
    svgs.push({name, svg});
  }

  const jsxInfos = svgs.map(({name, svg}) => ({name, promise: svgToJs(svg)}));
  const jsxs = [];

  for (let i = 0; i < jsxInfos.length; i++) {
    const {name, promise} = jsxInfos[i];
    jsxs.push(`  '${name}': (${(await promise).toString()})`);
  }

  const icons = '/*eslint quotes: 0*/\n'
    + 'import React from \'react\';\n\n'
    + `export default {\n${jsxs.join(',\n')}\n};`;

  await writeFile(iconsPath, icons);
});

gulp.task('react-clean', callback => del([buildFolder], callback));

gulp.task('react-build', gulp.series('react-clean', 'react-build-svgs', 'react-build-src'));
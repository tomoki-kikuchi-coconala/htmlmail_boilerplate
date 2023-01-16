import { src, dest } from 'gulp'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import gulpIf from 'gulp-if'
import sourcemaps from 'gulp-sourcemaps'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
const sass = gulpSass(dartSass)
import postcss from 'gulp-postcss'
import browserSync from 'browser-sync'
import cssnano from 'cssnano'
import packageImporter from 'node-sass-package-importer'
import postcssGapProperties from 'postcss-gap-properties'
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes'
import postcss100vhFix from 'postcss-100vh-fix'
import autoprefixer from 'autoprefixer'
import mqpacker from 'css-mqpacker'

import { isProduction, PATHS } from './config'

/**
 * SASSのコンパイルを実行する
 * @returns {*}
 */
export function sassCompileTask() {
  const outDir = isProduction ? PATHS.dest : PATHS.root
  const postCssPlugins = [
    postcssGapProperties(),
    postcssFlexbugsFixes(),
    postcss100vhFix(),
    autoprefixer({
      grid: true,
      cascade: false,
    }),
    mqpacker({
      sort: true,
    }),
  ]
  if (isProduction) {
    postCssPlugins.push(cssnano())
  }
  return (
    src(`${PATHS.src}**/*.{sass,scss}`)
      .pipe(
        plumber({
          errorHandler: notify.onError('<%- error.message %>'),
        })
      )
      // 開発時はソースマップを出力する
      .pipe(gulpIf(!isProduction, sourcemaps.init()))
      .pipe(
        sass({
          importer: packageImporter({
            extensions: ['.scss', '.css'],
          }),
          outputStyle: 'expanded',
        })
      )
      .pipe(postcss(postCssPlugins))
      // .pipe(csscomb())
      // プロダクション版はminify化してファイル名を*.min.cssに変更する
      // .pipe(gulpIf(isProduction, cleanCSS()))
      // .pipe(gulpIf(isProduction, rename({ extname: '.min.css' })))
      // .pipe(
      //   rename((path) => {
      //     path.dirname = path.dirname.replace('/scss', '/css') // 出力先をcssフォルダに変更
      //   })
      // )
      .pipe(gulpIf(!isProduction, dest(outDir, { sourcemaps: './_sourcemaps' })))
      .pipe(gulpIf(isProduction, dest(outDir)))
      .pipe(browserSync.stream())
  )
}

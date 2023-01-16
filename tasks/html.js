import { src, dest } from 'gulp'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import htmlbeautify from 'gulp-html-beautify'

import { isProduction, PATHS } from './config'

export function htmlTask() {
  const outDir = isProduction ? PATHS.dest : PATHS.root
  return src([`${PATHS.src}/**/*.html`])
    .pipe(
      plumber({
        errorHandler: notify.onError('<%- error.message %>'),
      })
    )
    .pipe(
      htmlbeautify({
        /* eslint-disable camelcase */
        indent_size: 2,
        indent_char: ' ',
        max_preserve_newlines: 0,
        indent_inner_html: false,
      })
    )
    .pipe(dest(`${outDir}/`))
}

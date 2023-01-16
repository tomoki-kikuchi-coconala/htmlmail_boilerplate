import { src, dest } from 'gulp'
import { imagePath, isProduction, PATHS } from './config'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import inlineCss from 'gulp-inline-css'
import gulpIf from 'gulp-if'
import replace from 'gulp-replace'

const inlineCssOption = {
  applyStyleTags: false,
  removeStyleTags: false,
  applyTableAttributes: true,
  removeHtmlSelectors: true,
}

export function inlineCssTask() {
  const outDir = isProduction ? PATHS.dest : PATHS.root

  return (
    src(`${PATHS.root}/**/*.html`)
      .pipe(
        plumber({
          errorHandler: notify.onError('<%- error.message %>'),
        })
      )
      .pipe(inlineCss(inlineCssOption))
      // プロダクション版は画像のドメインをproduction用に変更する
      .pipe(gulpIf(isProduction, replace(imagePath.dev, imagePath.production)))
      .pipe(dest(`${outDir}/`))
  )
}

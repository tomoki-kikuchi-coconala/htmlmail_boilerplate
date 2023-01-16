// Gulp
import { series, watch } from 'gulp'

// Tasks
import { cleanTask } from './tasks/clean'
import { sassCompileTask } from './tasks/sass'
import { browserSyncTask, reloadTask } from './tasks/server'

import { PATHS } from './tasks/config'
import { inlineCssTask } from './tasks/inline_css'
import { htmlTask } from './tasks/html'
import { copyImageTask } from './tasks/image'

function watchTask(callback) {
  watch([`${PATHS.src}**/*.html`, '!node_modules'], series(htmlTask, reloadTask))
  watch([`${PATHS.src}**/*.{jpg,jpeg,gif,png,svg}`], copyImageTask)
  watch([`${PATHS.src}**/*.{sass,scss}`, '!node_modules'], series(sassCompileTask, htmlTask, reloadTask))
  callback()

  console.log(
    '\n' +
      '-------------------------------------------------\n' +
      "🧐  < OK, I'm watching now...\n" +
      '-------------------------------------------------\n'
  )
}

export const dev = series(copyImageTask, sassCompileTask, htmlTask, watchTask, browserSyncTask)
export const build = series(cleanTask, copyImageTask, sassCompileTask, htmlTask, inlineCssTask)

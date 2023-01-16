import { src, dest } from 'gulp'

import { isProduction, PATHS } from './config'

export function copyImageTask() {
  const outDir = isProduction ? PATHS.dest : PATHS.root
  return src(`${PATHS.src}**/*.{jpg,jpeg,gif,png,svg,mp4,m4v}`).pipe(dest(outDir))
}

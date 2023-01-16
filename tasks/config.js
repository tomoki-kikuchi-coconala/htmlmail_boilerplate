const env = process.env.NODE_ENV || 'development'

export const isProduction = env === 'production'

// 入出力パス
export const PATHS = {
  src: './src/',
  root: './public_html/',
  dest: './build/',
}

export const imagePath = {
  dev: './',
  production: '[画像アップロードドメイン]/',
}

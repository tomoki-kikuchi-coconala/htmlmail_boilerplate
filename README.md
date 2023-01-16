# HTMLメール実装の基本セット

## ディレクトリ構成


```
root
　├build        -> ビルド時に納品用ファイルが出力されるディレクトリ
　│
　├mailer
　│ └send_mail.ts　　-> テストメール送信用のメールクライアント
　│
　├public_html      -> 開発時のルートディレクトリ
　│
　├src          -> 開発用ファイルのディレクトリ
　│ ├assets
　│ │  └scss   -> 共通scssファイルを格納するディレクトリ
　│ │
　│ └[ディレクトリ名]　　-> 各HTMLメールのリソースファイルを格納するディレクトリ
　│    ├css
　│    │ └XXXX.scss
　│    ├images
　│    └index.html
　│
　├tasks               -> Gulpタスクなどが入っているディレクトリ
　├gulpfile.babel.js   -> Gulpの実行ファイル
　└package.json
```

## コマンド

### 開発時

```
npm run dev
```
or
```
yarn dev
```

public_html 配下をサーバーが参照し、ビルドしたファイルがコピーされ、ファイルが watch 状態に突入します。


### 納品時

```
npm run build
```
or
```
yarn build
```

各クラスに記述したCSSをインラインスタイルとしてHTMLファイルに展開し、画像URLの本番用のドメインのURLに置換します。
置換するURLは `tasks/config.js` に定義している `imagePath` の内容に置換されます。

### テストメール送信
```
npm run sendmail
```
or
```
yarn sendmail
```

指定したメールアドレス宛にテストメールを送信します。

#### メール設定

メールの設定はルート直下の `.env` ファイルに記載します。
ファイルが存在しない場合は以下のような内容でファイルを作成します。

```dotenv
MAIL_FROM=送信元メールアドレス
MAIL_TO=送信先メールアドレス
MAIL_SUBJECT=メールタイトル
GMAIL_USER_ID=Gmailのメールアドレス
GMAIL_USER_PASSWORD=Gmailのアプリパスワード
```
※アプリパスワードの発行方法については以下のURLを参照

https://support.google.com/accounts/answer/185833?hl=ja

`mailer/send_mail.ts` のテンプレートのパスの値をbuildして生成したhtmlファイルを指定しいます。

```typescript
// HTMLメールのメールテンプレートファイルのパス
const templatePath = path.resolve(__dirname, '../build/template/index.html')
const htmlTemplate = fs.readFileSync(templatePath, 'utf8')
```
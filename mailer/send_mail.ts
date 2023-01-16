require('dotenv').config()
import { createTransport } from 'nodemailer'

const fs = require('fs')
const path = require('path')

// HTMLメールのメールテンプレートファイルのパス
const templatePath = path.resolve(__dirname, '../build/template/index.html')
const htmlTemplate = fs.readFileSync(templatePath, 'utf8')

//メールの内容
const mailObject = {
  from: process.env.MAIL_FROM,
  to: process.env.MAIL_TO,
  subject: process.env.MAIL_SUBJECT,
  text: `
  テストのメールです。
  テストなので、返信不要です。
  `, //マルチパートのテキスト形式のメール本文
  html: htmlTemplate, //html形式のメール本文
}

const transporter = createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER_ID, // Gメールアドレス
    pass: process.env.GMAIL_USER_PASSWORD, // パスワード
  },
})

transporter.sendMail(mailObject, (error, info) => {
  if (error) {
    console.error(error)
  } else {
    console.log(`Email sent: ${info.response}`)
  }
})

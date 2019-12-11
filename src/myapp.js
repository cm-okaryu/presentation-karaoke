import { html, render } from 'lit-html'
import { images } from './images.js'

let slideIndex
let slides

// 共通テンプレート
const template = app => html`
  <div>
    ${app}
  </div>
`

// 画像のINDEX表示
const index = () => html`
  <div style="text-align: right">
    ${slideIndex + 1}/5
  </div>
`

// 配列をインクリメントしてプレゼンページを再描画
const nextImg = () => {
  slideIndex++
  renderApp()
}

// プレゼン画像の表示
const img = src => html`
  <div @click=${nextImg} style="text-align: center;background: black;">
    <img src="./images/${src}" height="600px" />
    <div></div>
  </div>
`

// プレゼンページ表示
const App = () => {
  if (slideIndex > 4) {
    return template(html`
      <p @click=${init}>終了！！！！</p>
    `)
  } else {
    return template(html`
      ${index()} ${img(slides[slideIndex])}
    `)
  }
}

const renderApp = () => render(App(), document.body)

const startApp = () => render(startPage(), document.body)

// カウントダウンを開始してプレゼンページ呼び出し
const start = () => renderApp()

// 先頭ページ表示
const startPage = () =>
  template(html`
    <p @click=${start}>プレゼン開始！！！！</p>
  `)

// 配列をシャッフルする
const shuffleImages = imgs =>
  imgs
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1])

// 初期化して先頭ページ呼び出し
const init = () => {
  slideIndex = 0
  slides = shuffleImages(images)
  startApp()
}

init()

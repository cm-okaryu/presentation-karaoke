import { html, render } from 'lit-html'
import { images } from './images.js'

const MAX_SLIDES = 5

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
  renderSlidePage()
}

// プレゼン画像の表示
const slideImage = src => html`
  <div @click=${nextImg} style="text-align: center;background: black;">
    <img src="./images/${src}" height="600px" />
    <div></div>
  </div>
`

// プレゼンページ表示
const slidePage = () => {
  if (slideIndex => MAX_SLIDES) {
    return template(html`
      <p @click=${init}>終了！！！！</p>
    `)
  } else {
    return template(html`
      ${index()} ${slideImage(slides[slideIndex])}
    `)
  }
}

const renderTitlePage = () => render(titlePage(), document.body)

const renderSlidePage = () => render(slidePage(), document.body)

// 先頭ページ表示
const titlePage = () =>
  template(html`
    <p @click=${renderSlidePage}>プレゼン開始！！！！</p>
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
  renderTitlePage()
}

init()

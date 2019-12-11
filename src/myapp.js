import { html, render } from 'lit-html'
import { images } from './images.js'

const MAX_SLIDES = 5

let slideIndex
let slides

// 配列をシャッフルする
const shuffleImages = imgs =>
  imgs
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1])

// https://qiita.com/ryohey/items/f9fe94c1952fc761a743
const createStore = initialState => {
  let state = initialState

  return newState => {
    if (newState) {
      state = { ...state, ...newState }
      renderApp()
    }
    console.debug('store: slideIndex:', slideIndex)
    return state
  }
}

const store = createStore({
  slideIndex: undefined,
  slides: shuffleImages(images),
})

// 画像のINDEX表示
const pageInfo = () => html`
  <div style="text-align: right">
    ${slideIndex + 1}/5
  </div>
`

// プレゼン画像の表示
const slideImage = src => {
  const { slideIndex } = store()

  return html`
    <div
      @click=${() => store({ slideIndex: slideIndex + 1 })}
      style="text-align: center;background: black;"
    >
      <img src="./images/${src}" height="600px" />
      <div></div>
    </div>
  `
}

const page = () => {
  const { slideIndex, slides } = store()

  if (slideIndex === undefined) {
    return html`
      <p @click=${() => store({ slideIndex: 0 })}>プレゼン開始！！！！</p>
    `
  } else if (slideIndex < MAX_SLIDES) {
    return html`
      ${pageInfo()} ${slideImage(slides[slideIndex])}
    `
  } else {
    return html`
      <p @click=${() => store({ slideIndex: undefined })}>終了！！！！</p>
    `
  }
}

function renderApp() {
  return render(page(), document.body)
}

renderApp()

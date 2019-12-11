import { html, render } from 'lit-html'
import { images } from './images.js'

const MAX_SLIDES = 5

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
    return state
  }
}

const store = createStore({
  slideIndex: undefined,
  slides: shuffleImages(images),
})

const startSlide = () => {
  store({ slideIndex: 0 })
}

const nextSlide = () => {
  const { slideIndex } = store()

  store({ slideIndex: slideIndex + 1 })
}

const backToTitle = () => {
  store({ slideIndex: undefined })
}

const slidePage = () => {
  const { slideIndex, slides } = store()

  return html`
    <div style="text-align: right">
      ${slideIndex + 1}/${MAX_SLIDES}
    </div>
    <div @click=${nextSlide} style="text-align: center;background: black;">
      <img src="./images/${slides[slideIndex]}" height="600px" />
      <div></div>
    </div>
  `
}

const page = () => {
  const { slideIndex, slides } = store()

  if (slideIndex === undefined) {
    return html`
      <p @click=${startSlide}>プレゼン開始！！！！</p>
    `
  } else if (slideIndex < MAX_SLIDES) {
    return html`
      ${slidePage()}
    `
  } else {
    return html`
      <p @click=${backToTitle}>終了！！！！</p>
    `
  }
}

function renderApp() {
  return render(page(), document.body)
}

renderApp()

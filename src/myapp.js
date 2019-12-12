import { html, render } from 'lit-html'
import { images } from './images.js'

const MAX_SLIDES = 4 // 5

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
      if (newState.slideIndex === undefined) {
        state = { ...state, ...newState, slides: shuffleImages(images) }
      } else {
        state = { ...state, ...newState }
      }
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
  const path = `./images/${slides[slideIndex]}`
  const style = `
    position: absolute; 
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    background-image: url("${path}"); 
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  `
  console.debug('image path:', path)

  return html`
    <div style="color: white; text-align: right;">
      ${slideIndex + 1}/${MAX_SLIDES}
    </div>
    <div @click=${nextSlide} style=${style} />
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

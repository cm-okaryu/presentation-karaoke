import { html, render } from 'lit-html'
import { images } from './images.js'

const MAX_SLIDES = 5

// 配列をシャッフルする
const shuffleImages = imgs => {
  const hoge = imgs
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => `./images/${a[1]}`)

  // セッションタイトル用画像を0枚目に用意
  hoge.unshift('./resources/PPK_first.png')
  console.debug(hoge)
  return hoge
}

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

  if (slideIndex < MAX_SLIDES) {
    store({ slideIndex: slideIndex + 1 })
  } else {
    console.error(`Not have next slide. index = ${slideIndex}`)
  }
}

const prevSlide = () => {
  const { slideIndex } = store()

  if (slideIndex > 0) {
    store({ slideIndex: slideIndex - 1 })
  } else {
    console.error(`Not have prev slide. index = ${slideIndex}`)
  }
}

const backToTitle = () => {
  store({ slideIndex: undefined })
}

const slideStyle = path => {
  return `
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
}

const slidePage = () => {
  const { slideIndex, slides } = store()

  console.debug('image path:', slides[slideIndex])

  return html`
    <div style="color: white; text-align: right;">
      ${slideIndex + 1}/${MAX_SLIDES}
    </div>
    <div @click=${nextSlide} style=${slideStyle(slides[slideIndex])} />
  `
}

const page = () => {
  const { slideIndex, slides } = store()

  if (slideIndex === undefined) {
    return html`
      <div
        @click=${startSlide}
        style=${slideStyle('./resources/PPK_titleback.png')}
      />
    `
  } else if (slideIndex < MAX_SLIDES) {
    return html`
      ${slidePage()}
    `
  } else {
    return html`
      <div
        @click=${backToTitle}
        style=${slideStyle('./resources/PPK_end.png')}
      />
    `
  }
}

function renderApp() {
  return render(page(), document.body)
}

document.addEventListener('keydown', e => {
  const key = e.key
  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowDown':
    case 'Enter':
      nextSlide()
      break
    case 'ArrowLeft':
    case 'ArrowUp':
      prevSlide()
      break
  }
})

renderApp()

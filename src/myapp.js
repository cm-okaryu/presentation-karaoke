import { html, render } from 'lit-html'
import { images } from './images.js'

const MAX_SLIDES = 4

// 配列をシャッフルしてMAX_SLIDES枚返す
const shuffleImages = imgs => {
  const shuffledImgs = imgs
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map((a, i) => {
      return { path: `./images/${a[1]}`, pageNo: i + 1 }
    })

  return shuffledImgs.slice(0, MAX_SLIDES)
}

// https://qiita.com/ryohey/items/f9fe94c1952fc761a743
const createStore = () => {
  let state = {}

  return newState => {
    if (!state.slides || newState) {
      if (!state.slides || newState.slideIndex === undefined) {
        const slides = [
          { path: './resources/PPK_first.png', first: true },
          ...shuffleImages(images),
          { path: './resources/PPK_end.png', last: true },
        ]
        state = { ...state, ...newState, slides }
      } else {
        state = { ...state, ...newState }
      }
      renderApp()
    }
    return state
  }
}

const store = createStore()

const startSlide = () => {
  store({ slideIndex: 0 })
}

const nextSlide = () => {
  const { slideIndex, slides } = store()

  const slide = slides[slideIndex]
  if (slide && slide.last === undefined) {
    store({ slideIndex: slideIndex + 1 })
  } else {
    console.warn(`Not have next slide. index = ${slideIndex}`)
  }
}

const prevSlide = () => {
  const { slideIndex } = store()

  if (slideIndex > 0) {
    store({ slideIndex: slideIndex - 1 })
  } else {
    console.warn(`Not have prev slide. index = ${slideIndex}`)
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

  console.debug('image:', slides[slideIndex])

  const path = slides[slideIndex].path
  const pageNo = slides[slideIndex].pageNo

  const pageInfo = html`
    <div
      style="color: white; text-align: right; position: relative; z-index: 100;"
    >
      ${pageNo}/${MAX_SLIDES}
    </div>
  `
  return html`
    ${pageNo && pageInfo}
    <div
      @click=${slides[slideIndex].last ? backToTitle : nextSlide}
      style=${slideStyle(path)}
    />
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
  } else {
    return html`
      ${slidePage()}
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

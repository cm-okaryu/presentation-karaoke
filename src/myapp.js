import {html, render} from 'lit-html';
import {images} from './images.js';


let count;
let slide;

// 初期化して先頭ページ呼び出し
const init = () => {
  count = 0;
  slide = shuffleImages(images);
  startApp();
};

// 配列をシャッフルする
const shuffleImages = (imgs) => imgs.map(a => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map(a => a[1]);

// 共通テンプレート
const template = (app) => html`
  <h1>Presentation KARAOKE</h1>
  <div>
    ${app}
  </div>
`;

// 先頭ページ表示
const startPage = () => template(html`
    <p @click=${start}>プレゼン開始！！！！</p>
`);

// カウントダウンを開始してプレゼンページ呼び出し
const start = () => renderApp();

// プレゼンページ表示
const App = () => {
 if(count > 4) {
   return template(html`
      <p @click=${init}>終了！！！！</p>
   `);
 }else {
   return template(html`
     ${index()}
     ${img(slide[count])}
  `);
 }
};

// 画像のINDEX表示
const index = () => html`
  <div style="text-align: right">
    ${count + 1}/5
  </div>
`;
// プレゼン画像の表示
const img = (src) => html`
  <div @click=${nextImg} style="text-align: center;background: black;">
    <img src="./images/${src}" height="600px"/>
  <div>
`;

// 配列をインクリメントしてプレゼンページを再描画
const nextImg = () => {
  count++;
  renderApp();
}

const renderApp = () => render(App(), document.body)

const startApp = () => render(startPage(), document.body)

init()

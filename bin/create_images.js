const fs = require('fs');

// 画像ディレクトリ
const path = "./images";
// ファイル名の一覧
const filenames = fs.readdirSync(path);
const filtered_file_names = filenames.filter( (e, i, a) => ( e != ".DS_Store" && e != ".gitkeep")).map(image => `"${image}"`)
console.log(filtered_file_names);
try {
    console.log('write start');
    fs.writeFileSync("./src/images.js", `export let images=[${filtered_file_names}];`);
    console.log('write end');
}catch(e){
    console.log(e);
}

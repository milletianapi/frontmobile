import decode_item from "./decode_item.json";
import {decode} from "./decode.js";

const url1 = 'https://open.api.nexon.com/static/mabinogi/img/'
const url4 = '87464e'
const url6 = '8a5042'

export function decoding(item) {
    let image_url = url1 + decode_item[item.item_name];
    const colorTables = ['a', 'b', 'c'];
    const colorComponents = ['r', 'g', 'b'];

    colorTables.forEach((colorTable, i) => {
        let part = '';
        colorComponents.forEach((ct, j) => {
            let ar = item.color[colorTable][ct];
            let up = Math.floor(ar / 16);
            let dn = ar % 16;
            let key1 = decode[colorTable][j + 1]['upper'][up];
            let key2 = decode[colorTable][j + 1]['lower'][dn];
            part += `${key1}${key2}`;
        });
        image_url += part;
        if (i === 0) image_url += url4;
        if (i === 1) image_url += url6;
    });
    return image_url
}
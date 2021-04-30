var Iconv  = require('iconv').Iconv;
// EUC-KR -> UTF-8
var iconv = new Iconv('EUC-KR', 'utf-8//translit//ignore');
console.log(iconv.convert('Hello Iconvㅋㅋㅋ').toString());
// <Buffer 48 65 6c 6c 6f 20 49 63 6f 6e 76>

const fs = require("fs");


let ProudctJSON = fs.readFileSync("./product.json");
console.log(ProudctJSON.toString())

module.exports = ProudctJSON
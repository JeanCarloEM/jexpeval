import { tests } from "./tests.js";
console.log("Iniciando");
var onGroup = function (name) { return void {}; };
var onGoupFinish = function (name, r) { return void {}; };
var onItem = function (name, r) { return void {}; };
console.log('teste4');
window.fetch("tests.json")
    .then(function (r) { return r.json(); })
    .then(function (r) {
    console.log("json baixado com sucesso");
    console.log(r);
    tests.run(r, onItem, onGroup, onGoupFinish);
})
    .catch(function (r) {
    console.log("Falha ao baixar json.");
});
//# sourceMappingURL=nav.js.map
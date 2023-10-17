import { tests } from "./tests.js";
var navtests = (function () {
    function navtests() {
    }
    navtests.onGroup = function (name) { };
    navtests.onGoupFinish = function (name, r) { };
    navtests.onItem = function (name, r) { };
    navtests.run = function () {
        var _this = this;
        console.log("Inicializando testes.");
        window
            .fetch("tests.json")
            .then(function (r) { return r.json(); })
            .then(function (r) {
            console.log("json baixado com sucesso");
            console.log(r);
            tests.run(r, _this.onItem, _this.onGroup, _this.onGoupFinish);
        })
            .catch(function (r) {
            console.log("Falha ao baixar json.");
        });
    };
    return navtests;
}());
export { navtests };
//# sourceMappingURL=nav.js.map
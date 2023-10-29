import { h, render } from "preact";
import ItemView from "./item/item.js";
import { createTest, load } from "../testsRun.js";
var main = (function () {
    function main() {
    }
    main.onStatusItemChange = function (id, resp, item) {
        switch (resp) {
            case "running":
                console.log("Running '".concat(item && item.title, "'."));
                break;
            case true:
                break;
            case false:
                break;
            default:
                break;
        }
    };
    main.run = function () {
        var _this = this;
        load()
            .then(function (r1) { return createTest(r1); })
            .then(function (r) {
            render(h(ItemView, {
                source: r,
                onStatusChange: _this.onStatusItemChange,
            }), document.querySelector("body > div.root"));
        });
    };
    return main;
}());
export { main };
//# sourceMappingURL=index.js.map
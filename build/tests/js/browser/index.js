import { h, render } from "preact";
import ItemView from "./item/item.js";
import { createTest, load } from "../testsRun.js";
var main = (function () {
    function main() {
    }
    main.onStatusItemChange = function (targetId, targetStatus, partial, ref) {
        switch (targetStatus) {
            case "running":
                console.log("Running '".concat(ref && ref.title, "'."));
                break;
            case true:
                console.log("OK '".concat(ref && ref.title, "'."));
                break;
            case false:
                console.error("FAIL '".concat(ref && ref.title, "'."));
                break;
            default:
                break;
        }
    };
    main.run = function () {
        var _this = this;
        load()
            .then(function (r1) { return createTest(r1, [], 1000); })
            .then(function (r) {
            render(h(ItemView, {
                source: r,
                onStatusChange: _this.onStatusItemChange,
            }), document.querySelector("body > div.root"));
            setTimeout(function () {
                r.run();
            }, 10);
        });
    };
    return main;
}());
export { main };
//# sourceMappingURL=index.js.map
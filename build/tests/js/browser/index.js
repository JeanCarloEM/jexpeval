import { h, render } from "preact";
import ItemView from "./item/item.js";
import { load } from "../testsRun.js";
var main = (function () {
    function main() {
    }
    main.onStatusItemChange = function (targetId, targetStatus, partial, ref) {
        if (partial)
            return;
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
        load([], 500).then(function (r) {
            var SRC = r;
            render(h(ItemView, {
                source: SRC,
                onStatusChange: _this.onStatusItemChange,
            }), document.querySelector("body > div.root"));
            setTimeout(function () {
                SRC.run();
            }, 10);
        });
    };
    return main;
}());
export { main };
//# sourceMappingURL=index.js.map
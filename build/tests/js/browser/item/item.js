import { jsx as _jsx } from "preact/jsx-runtime";
import { useEffect, useState } from "preact/hooks";
export default function ItemView(_a) {
    var source = _a.source, _b = _a.caption, caption = _b === void 0 ? null : _b;
    var _c = useState("not_started"), status = _c[0], setStatus = _c[1];
    var stt = "";
    useEffect(function () {
        switch (status) {
            case "running":
                stt = "1";
                break;
            case true:
                stt = "2";
                break;
            case false:
                stt = "3";
                break;
            default:
                break;
        }
    }, [status]);
    return (_jsx("li", { "data-ok": stt, children: _jsx("span", { children: caption }) }));
}
//# sourceMappingURL=item.js.map
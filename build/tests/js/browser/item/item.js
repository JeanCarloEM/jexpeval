import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { useEffect, useState } from "preact/hooks";
export default function ItemView(_a) {
    var creator = _a.creator, source = _a.source, _b = _a.onStatusChange, onStatusChange = _b === void 0 ? undefined : _b;
    var _c = useState("not_started"), status = _c[0], setStatus = _c[1];
    function onSolverChange(id, resp, item) {
        setStatus(resp);
        onStatusChange && onStatusChange(id, resp, item);
    }
    if (!creator) {
        console.log(creator);
        throw "undefined creator in ItemView";
    }
    var test = useState(Array.isArray(source) ? creator(source, onSolverChange) : source)[0];
    var isGroup = test.isGroup();
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
    return (_jsxs("div", { "data-ok": stt, "data-group": isGroup && "1", className: "testItemView ".concat(isGroup && "1"), children: [_jsx("label", { for: test.id, children: _jsx("span", { children: test.title }) }), isGroup && _jsx("input", { type: "checkbox", id: test.id }), isGroup && (_jsx("div", { children: test.map(function (item) {
                    _jsx(ItemView, { creator: creator, source: item, onStatusChange: onStatusChange });
                }) }))] }));
}
//# sourceMappingURL=item.js.map
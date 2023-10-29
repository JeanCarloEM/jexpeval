import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { useEffect, useState } from "preact/hooks";
export default function ItemView(_a) {
    var source = _a.source, _b = _a.creator, creator = _b === void 0 ? undefined : _b, _c = _a.onStatusChange, onStatusChange = _c === void 0 ? undefined : _c;
    var _d = useState("not_started"), status = _d[0], setStatus = _d[1];
    function onSolverChange(id, resp, item) {
        setStatus(resp);
        onStatusChange && onStatusChange(id, resp, item);
    }
    function _creator() {
        if (typeof source !== "object") {
            throw "[ItemView] source isn't object.";
        }
        if (Array.isArray(source)) {
            if (!creator) {
                throw "[ItemView] creator is invalid for source array.";
            }
            return creator(source, onSolverChange);
        }
        source.setOnStatusChange(onSolverChange);
        return source;
    }
    var test = useState(_creator())[0];
    var isGroup = test.isGroup();
    var hasId = test.id.trim().length > 0;
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
    return (_jsxs("div", { "data-ok": stt, "data-group": isGroup && "1", className: "testItemView ".concat(isGroup ? "testGroupView" : ""), children: [isGroup && hasId && _jsx("input", { type: "checkbox", id: test.id }), hasId && (_jsx("label", { for: test.id, children: _jsx("span", { children: test.title }) })), isGroup && (_jsx("div", { class: "subgroup", children: test.map(function (item) {
                    return (_jsx(ItemView, { creator: creator, source: item, onStatusChange: onStatusChange }));
                }) }))] }));
}
//# sourceMappingURL=item.js.map
import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { useEffect, useState } from "preact/hooks";
import * as TT from "../../models/tester.js";
export default function ItemView(_a) {
    var solver = _a.solver, source = _a.source, _b = _a.onStatusChange, onStatusChange = _b === void 0 ? undefined : _b;
    var _c = useState("not_started"), status = _c[0], setStatus = _c[1];
    function onSolverChange(id, resp) {
        setStatus(resp);
        onStatusChange && onStatusChange(id, resp);
    }
    var test = useState(Array.isArray(source)
        ? new TT.testSolver(source, solver, onSolverChange)
        : source)[0];
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
                    _jsx(ItemView, { solver: solver, source: item, onStatusChange: onStatusChange });
                }) }))] }));
}
//# sourceMappingURL=item.js.map
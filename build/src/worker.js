export var jcemWorkerCreator;
(function (jcemWorkerCreator) {
    function scriptWorker(starter) {
        var started = false;
        function CONSOLE(msg, type) {
            self.postMessage({
                type: "CONSOLE",
                mode: type,
                msg: msg,
            });
            return true;
        }
        function LOG(msg) {
            CONSOLE(msg, "log");
        }
        function WARN(msg) {
            CONSOLE(msg, "warn");
        }
        function ERROR(msg) {
            return CONSOLE(msg, "error");
        }
        function hasBasicMessageError(e) {
            if (typeof e !== "object") {
                return ERROR("[jcemWorkerCreator][runAsWorker][worker] message isnot object.");
            }
            if (!e.hasOwnProperty("data")) {
                return ERROR("[jcemWorkerCreator][runAsWorker][worker] message dont contain 'data' proprerty.");
            }
            if (typeof e.data !== "object") {
                return ERROR("[jcemWorkerCreator][runAsWorker][worker] data of message isnot object.");
            }
            return false;
        }
        function hasBasicMessageChildError(e, key, type, checkEmpty) {
            if (checkEmpty === void 0) { checkEmpty = false; }
            key = key.trim();
            type = type.trim();
            if (key.length === 0) {
                return ERROR("[jcemWorkerCreator][runAsWorker][worker][basicMessageChildCheck] 'key' parameter is empty.");
            }
            if (type.length === 0) {
                return ERROR("[jcemWorkerCreator][runAsWorker][worker][basicMessageChildCheck] 'type' parameter is empty.");
            }
            if (!e.hasOwnProperty(key)) {
                return ERROR("[jcemWorkerCreator][runAsWorker][worker][basicMessageChildCheck] message don't contain '".concat(key, "' proprerty."));
            }
            if (typeof e[key] !== type) {
                return ERROR("[jcemWorkerCreator][runAsWorker][worker][basicMessageChildCheck] property '".concat(key, "' is not a valid '").concat(type, "'."));
            }
            if (checkEmpty &&
                (typeof e[key] !== "string" || Array.isArray(e[key])) &&
                e[key].length === 0) {
                return ERROR("[jcemWorkerCreator][runAsWorker][worker][basicMessageChildCheck] property '".concat(key, "' is empty."));
            }
            return false;
        }
        var uuid = function () {
            return "uid10000000100040008000100000000000".replace(/[018]/g, function (x) {
                var c = x;
                return (c ^
                    (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16);
            });
        };
        function inWorkerGetCallResponseFromWindow(caller, args) {
            var id = uuid();
            var __terminated = false;
            return new Promise(function (R0, R_0) {
                self.addEventListener("message", function (e) {
                    if (__terminated) {
                        return;
                    }
                    if (hasBasicMessageError(e)) {
                        return;
                    }
                    if (hasBasicMessageChildError(e.data, "return", "string", true)) {
                        return;
                    }
                    if (e.data.id !== id) {
                        return;
                    }
                    __terminated = true;
                    R0(e.data.return);
                });
                self.postMessage({ caller: caller, args: args, id: id });
            });
        }
        function inWorkerGetFromWindowSide(name, args) {
            return new Promise(function (R0, R_0) {
                inWorkerGetCallResponseFromWindow(name, args)
                    .catch(function (e) { return R_0(e); })
                    .then(function (r) { return R0(r); });
            });
        }
        self.addEventListener("message", function (e) {
            if (e.data === "start") {
                started = true;
                starter(inWorkerGetFromWindowSide);
            }
        });
    }
    jcemWorkerCreator.scriptWorker = scriptWorker;
    function createWorkerFromFunction(starter) {
        var source = window.URL.createObjectURL(new Blob(["(", scriptWorker.toString(), ")(", starter.toString(), ")"], {
            type: "text/javascript",
        }));
        console.warn(source);
        return new Worker(source);
    }
    jcemWorkerCreator.createWorkerFromFunction = createWorkerFromFunction;
    function windowSideWorkerManagement(w, windowSideHooks) {
        return new Promise(function (R0, R_0) {
            w.addEventListener("message", function (e) {
                if (typeof e !== "object") {
                    throw "[jcemWorkerCreator][runAsWorker][window] message isnot object.";
                }
                if (!e.hasOwnProperty("data")) {
                    throw "[jcemWorkerCreator][runAsWorker][window] message dont contain 'data' proprerty.";
                }
                if (typeof e.data !== "object") {
                    throw "[jcemWorkerCreator][runAsWorker][window] data of message isnot object.";
                }
                if (e.data.hasOwnProperty("return")) {
                    w.terminate();
                    return R0(e.data.return);
                }
                if (!e.data.hasOwnProperty("type")) {
                    throw "[jcemWorkerCreator][runAsWorker][window] message dont contain 'type' proprerty.";
                }
                if (typeof e.data.type !== "string") {
                    throw "[jcemWorkerCreator][runAsWorker][window] message type is not string.";
                }
                var T = e.data.type.trim().toUpperCase();
                if (T === "CONSOLE") {
                    if (!e.data.hasOwnProperty("msg")) {
                        throw "[jcemWorkerCreator][runAsWorker][window] message of LOG dont exists.";
                    }
                    if (typeof e.data.msg !== "string") {
                        throw "[jcemWorkerCreator][runAsWorker][window] message of LOG isnot string.";
                    }
                    if (!e.data.hasOwnProperty("type")) {
                        throw "[jcemWorkerCreator][runAsWorker][window] type of message LOG dont exists.";
                    }
                    if (typeof e.data.type !== "string") {
                        throw "[jcemWorkerCreator][runAsWorker][window] typeo of message LOG isnot string.";
                    }
                    switch (e.data.type.trim().toLowerCase()) {
                        case "log":
                            console.log(e.data.msg);
                            break;
                        case "warn":
                            console.warn(e.data.msg);
                            break;
                        case "error":
                            console.error(e.data.msg);
                            break;
                        default:
                            throw "[jcemWorkerCreator][runAsWorker][window] typeo of message LOG is not valid type.";
                            break;
                    }
                    return;
                }
                if (T === "CALLER") {
                    if (e.data.hasOwnProperty("caller")) {
                        if (typeof e.data.caller !== "string") {
                            throw "[jcemWorkerCreator][runAsWorker][window] caller of message isnot string.";
                        }
                        e.data.caller = e.data.caller.trim();
                        if (e.data.caller.length === 0) {
                            throw "[jcemWorkerCreator][runAsWorker][window] caller of message is empty.";
                        }
                        if (!windowSideHooks.hasOwnProperty(e.data.caller)) {
                            throw "[jcemWorkerCreator][windowSideWorkerManagement][window] the caller name does not exist.";
                        }
                        if (typeof windowSideHooks[e.data.caller] !== "function") {
                            throw "[jcemWorkerCreator][windowSideWorkerManagement][window] caller name is not a function.";
                        }
                        if (!e.data.hasOwnProperty("id")) {
                            throw "[jcemWorkerCreator][windowSideWorkerManagement][window] caller of message dont contain id.";
                        }
                        if (typeof e.data.id !== "string") {
                            throw "[jcemWorkerCreator][windowSideWorkerManagement][window] caller of message isnot string.";
                        }
                        if (e.data.caller.id === 0) {
                            throw "[jcemWorkerCreator][windowSideWorkerManagement][window] caller id of message is empty.";
                        }
                        var args = {};
                        if (e.data.hasOwnProperty("args")) {
                            if (typeof e.data.args !== "object") {
                                throw "[jcemWorkerCreator][windowSideWorkerManagement][window] optional args is not a object.";
                            }
                            args = e.data.args;
                        }
                        return windowSideHooks[e.data.caller](args).then(function (r) {
                            w.postMessage({ return: r, id: e.data.id });
                        });
                    }
                    return;
                }
                throw "[jcemWorkerCreator][runAsWorker][window] It was not expected that the execution would reach this line.";
            });
            w.postMessage({
                start: true,
            });
        });
    }
    function createWorker(windowSideHooks, workerSideFunction) {
        if (!window) {
            throw "[jcemWorkerCreator] worker only avaliable on browser: window dont exists.";
        }
        if (!Worker) {
            throw "[jcemWorkerCreator] worker only avaliable on browser: Worker dont exists.";
        }
        var w = createWorkerFromFunction(workerSideFunction);
        return windowSideWorkerManagement(w, windowSideHooks);
    }
    jcemWorkerCreator.createWorker = createWorker;
})(jcemWorkerCreator || (jcemWorkerCreator = {}));
//# sourceMappingURL=worker.js.map
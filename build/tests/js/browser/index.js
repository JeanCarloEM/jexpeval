var main = (function () {
    function main() {
    }
    main.prototype.onStatusItemChange = function (id, resp) {
        switch (resp) {
            case "running":
                console.log();
                break;
            case true:
                break;
            case false:
                break;
            default:
                break;
        }
    };
    main.run = function () { };
    return main;
}());
export { main };
//# sourceMappingURL=index.js.map
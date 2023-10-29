var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var TIterator = (function () {
    function TIterator(__items) {
        this.__items = __items;
        if (typeof __items !== "object" || !Array.isArray(__items)) {
            throw "[TIterator] items parameter isn't object array.";
        }
    }
    TIterator.prototype.incorporate = function (from) {
        this.__items = this.__items.concat(from);
        return this;
    };
    TIterator.prototype.recreateFrom = function (from) {
        this.__items = __spreadArray([], from, true);
        return this;
    };
    Object.defineProperty(TIterator.prototype, "length", {
        get: function () {
            return this.__items.length;
        },
        enumerable: false,
        configurable: true
    });
    TIterator.prototype.at = function (index) {
        return this.__items.at(index);
    };
    TIterator.prototype.entries = function () {
        return this.__items.entries();
    };
    TIterator.prototype.keys = function () {
        return this.__items.keys();
    };
    TIterator.prototype.values = function () {
        return this.__items.values();
    };
    TIterator.prototype.toLocaleString = function () {
        return this.__items.toLocaleString();
    };
    TIterator.prototype.pop = function () {
        return this.__items.pop();
    };
    TIterator.prototype.push = function () {
        var _a;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return (_a = this.__items).push.apply(_a, items);
    };
    TIterator.prototype.concat = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return this.__items.concat(items);
    };
    TIterator.prototype.join = function (separator) {
        return this.__items.join(separator);
    };
    TIterator.prototype.reverse = function () {
        return this.reverse();
    };
    TIterator.prototype.shift = function () {
        return this.__items.shift();
    };
    TIterator.prototype.slice = function (start, end) {
        return this.__items.slice(start, end);
    };
    TIterator.prototype.sort = function (compareFn) {
        this.__items.sort(compareFn);
        return this;
    };
    TIterator.prototype.splice = function (start, deleteCount) {
        var _a;
        var items = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            items[_i - 2] = arguments[_i];
        }
        if (typeof items !== "undefined") {
            return (_a = this.__items).splice.apply(_a, __spreadArray([start, deleteCount], items, false));
        }
        if (typeof deleteCount !== "undefined") {
            return this.__items.splice(start, deleteCount);
        }
        return this.__items.splice(start);
    };
    TIterator.prototype.unshift = function () {
        var _a;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return (_a = this.__items).unshift.apply(_a, items);
    };
    TIterator.prototype.indexOf = function (searchElement, fromIndex) {
        return this.__items.indexOf(searchElement, fromIndex);
    };
    TIterator.prototype.lastIndexOf = function (searchElement, fromIndex) {
        return this.__items.lastIndexOf(searchElement, fromIndex);
    };
    TIterator.prototype.every = function (predicate, thisArg) {
        return this.__items.every(predicate, thisArg);
    };
    TIterator.prototype.some = function (predicate, thisArg) {
        return this.__items.some(predicate, thisArg);
    };
    TIterator.prototype.forEach = function (callbackfn, thisArg) {
        return this.__items.forEach(callbackfn, thisArg);
    };
    TIterator.prototype.map = function (callbackfn, thisArg) {
        return this.__items.map(callbackfn, thisArg);
    };
    TIterator.prototype.filter = function (predicate, thisArg) {
        return this.__items.filter(predicate, thisArg);
    };
    TIterator.prototype.reduce = function (callbackfn, initialValue) {
        return this.__items.reduce(callbackfn, initialValue);
    };
    TIterator.prototype.reduceRight = function (callbackfn, initialValue) {
        return this.__items.reduceRight(callbackfn, initialValue);
    };
    return TIterator;
}());
export { TIterator };
//# sourceMappingURL=iterator.js.map
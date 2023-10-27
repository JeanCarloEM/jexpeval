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
    function TIterator(_items) {
        this._items = _items;
        if (typeof _items !== "object" || !Array.isArray(_items)) {
            throw "[TIterator] items parameter isn't object array.";
        }
    }
    TIterator.prototype.incorporate = function (from) {
        this._items = this._items.concat(from);
        return this;
    };
    TIterator.prototype.recreateFrom = function (from) {
        this._items = __spreadArray([], from, true);
        return this;
    };
    Object.defineProperty(TIterator.prototype, "length", {
        get: function () {
            return this._items.length;
        },
        enumerable: false,
        configurable: true
    });
    TIterator.prototype.at = function (index) {
        return this._items.at(index);
    };
    TIterator.prototype.entries = function () {
        return this._items.entries();
    };
    TIterator.prototype.keys = function () {
        return this._items.keys();
    };
    TIterator.prototype.values = function () {
        return this._items.values();
    };
    TIterator.prototype.toLocaleString = function () {
        return this._items.toLocaleString();
    };
    TIterator.prototype.pop = function () {
        return this._items.pop();
    };
    TIterator.prototype.push = function () {
        var _a;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return (_a = this._items).push.apply(_a, items);
    };
    TIterator.prototype.concat = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return this._items.concat(items);
    };
    TIterator.prototype.join = function (separator) {
        return this._items.join(separator);
    };
    TIterator.prototype.reverse = function () {
        return this.reverse();
    };
    TIterator.prototype.shift = function () {
        return this._items.shift();
    };
    TIterator.prototype.slice = function (start, end) {
        return this._items.slice(start, end);
    };
    TIterator.prototype.sort = function (compareFn) {
        this._items.sort(compareFn);
        return this;
    };
    TIterator.prototype.splice = function (start, deleteCount) {
        var _a;
        var items = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            items[_i - 2] = arguments[_i];
        }
        if (typeof items !== "undefined") {
            return (_a = this._items).splice.apply(_a, __spreadArray([start, deleteCount], items, false));
        }
        if (typeof deleteCount !== "undefined") {
            return this._items.splice(start, deleteCount);
        }
        return this._items.splice(start);
    };
    TIterator.prototype.unshift = function () {
        var _a;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return (_a = this._items).unshift.apply(_a, items);
    };
    TIterator.prototype.indexOf = function (searchElement, fromIndex) {
        return this._items.indexOf(searchElement, fromIndex);
    };
    TIterator.prototype.lastIndexOf = function (searchElement, fromIndex) {
        return this._items.lastIndexOf(searchElement, fromIndex);
    };
    TIterator.prototype.every = function (predicate, thisArg) {
        return this._items.every(predicate, thisArg);
    };
    TIterator.prototype.some = function (predicate, thisArg) {
        return this._items.some(predicate, thisArg);
    };
    TIterator.prototype.forEach = function (callbackfn, thisArg) {
        return this._items.forEach(callbackfn, thisArg);
    };
    TIterator.prototype.map = function (callbackfn, thisArg) {
        return this._items.map(callbackfn, thisArg);
    };
    TIterator.prototype.filter = function (predicate, thisArg) {
        return this._items.filter(predicate, thisArg);
    };
    TIterator.prototype.reduce = function (callbackfn, initialValue) {
        return this._items.reduce(callbackfn, initialValue);
    };
    TIterator.prototype.reduceRight = function (callbackfn, initialValue) {
        return this._items.reduceRight(callbackfn, initialValue);
    };
    return TIterator;
}());
export { TIterator };
//# sourceMappingURL=iterator.js.map
export abstract class TIterator<T> {
  constructor(private readonly items: T[]) {}

  /**
   *
   */
  public get length(): number {
    return this.items.length;
  }

  /**
   * Takes an integer value and returns the item at that index,
   * allowing for positive and negative integers.
   * Negative integers count back from the last item in the array.
   */
  public at(index: number): T | undefined {
    return this.items.at(index);
  }

  /**
   * Returns a string representation of an array.
   */
  public abstract toString(): string;

  /*! *****************************************************************************
  The method/function definitions below, as well as their comments, were obtained
  from a third source and may be under a different license than the license for
  this file. The implementation of the methods/functions maintains the license of
  this file.
  *********************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */

  /**
   * Returns an iterable of key, value pairs for every entry in the array
   */
  public entries(): IterableIterator<[number, T]> {
    return this.items.entries();
  }

  /**
   * Returns an iterable of keys in the array
   */
  public keys(): IterableIterator<number> {
    return this.items.keys();
  }

  /**
   * Returns an iterable of values in the array
   */
  public values(): IterableIterator<T> {
    return this.items.values();
  }

  /**
   * Returns a string representation of an array. The elements are converted to string using their toLocaleString methods.
   */
  public toLocaleString(): string {
    return this.items.toLocaleString();
  }

  /**
   * Removes the last element from an array and returns it.
   * If the array is empty, undefined is returned and the array is not modified.
   */
  public pop(): T | undefined {
    return this.items.pop();
  }

  /**
   * Appends new elements to the end of an array, and returns the new length of the array.
   * @param items New elements to add to the array.
   */
  public push(...items: T[]): number {
    return this.items.push(...items);
  }

  /**
   * Combines two or more arrays.
   * This method returns a new array without modifying any existing arrays.
   * @param items Additional arrays and/or items to add to the end of the array.
   */
  public concat(...items: ConcatArray<T>[]): T[];
  public concat(...items: (T | ConcatArray<T>)[]): T[];
  public concat(...items: any[]): T[] {
    return this.items.concat(items);
  }

  /**
   * Adds all the elements of an array into a string, separated by the specified separator string.
   * @param separator A string used to separate one element of the array from the next in the resulting string. If omitted, the array elements are separated with a comma.
   */
  public join(separator?: string): string {
    return this.items.join(separator);
  }

  /**
   * Reverses the elements in an array in place.
   * This method mutates the array and returns a reference to the same array.
   */
  public reverse(): T[] {
    return this.reverse();
  }

  /**
   * Removes the first element from an array and returns it.
   * If the array is empty, undefined is returned and the array is not modified.
   */
  public shift(): T | undefined {
    return this.items.shift();
  }

  /**
   * Returns a copy of a section of an array.
   * For both start and end, a negative index can be used to indicate an offset from the end of the array.
   * For example, -2 refers to the second to last element of the array.
   * @param start The beginning index of the specified portion of the array.
   * If start is undefined, then the slice begins at index 0.
   * @param end The end index of the specified portion of the array. This is exclusive of the element at the index 'end'.
   * If end is undefined, then the slice extends to the end of the array.
   */
  public slice(start?: number, end?: number): T[] {
    return this.items.slice(start, end);
  }

  /**
   * Sorts an array in place.
   * This method mutates the array and returns a reference to the same array.
   * @param compareFn Function used to determine the order of the elements. It is expected to return
   * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
   * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
   * ```ts
   * [11,2,22,1].sort((a, b) => a - b)
   * ```
   */
  public sort(compareFn?: (a: T, b: T) => number): this {
    this.items.sort(compareFn);
    return this;
  }

  /**
   * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
   * @param start The zero-based location in the array from which to start removing elements.
   * @param deleteCount The number of elements to remove.
   * @param items Elements to insert into the array in place of the deleted elements.
   * @returns An array containing the elements that were deleted.
   */
  public splice(start: number, deleteCount?: number): T[];
  public splice(start: number, deleteCount: number, ...items: T[]): T[];
  public splice(start: number, deleteCount?: any, ...items: T[]): T[] {
    if (typeof items !== "undefined") {
      return this.items.splice(start, deleteCount, ...items);
    }

    if (typeof deleteCount !== "undefined") {
      return this.items.splice(start, deleteCount);
    }

    return this.items.splice(start);
  }

  /**
   * Inserts new elements at the start of an array, and returns the new length of the array.
   * @param items Elements to insert at the start of the array.
   */
  public unshift(...items: T[]): number {
    return this.items.unshift(...items);
  }

  /**
   * Returns the index of the first occurrence of a value in an array, or -1 if it is not present.
   * @param searchElement The value to locate in the array.
   * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
   */
  public indexOf(searchElement: T, fromIndex?: number): number {
    return this.items.indexOf(searchElement, fromIndex);
  }

  /**
   * Returns the index of the last occurrence of a specified value in an array, or -1 if it is not present.
   * @param searchElement The value to locate in the array.
   * @param fromIndex The array index at which to begin searching backward. If fromIndex is omitted, the search starts at the last index in the array.
   */
  public lastIndexOf(searchElement: T, fromIndex?: number): number {
    return this.items.lastIndexOf(searchElement, fromIndex);
  }

  /**
   * Determines whether all the members of an array satisfy the specified test.
   * @param predicate A function that accepts up to three arguments. The every method calls
   * the predicate function for each element in the array until the predicate returns a value
   * which is coercible to the Boolean value false, or until the end of the array.
   * @param thisArg An object to which the this keyword can refer in the predicate function.
   * If thisArg is omitted, undefined is used as the this value.
   */
  public every<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any,
  ): this is S[];
  public every(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any,
  ): boolean;
  public every(
    predicate: (value: T, index: number, array: T[]) => any,
    thisArg?: any,
  ): any {
    return this.items.every(predicate, thisArg);
  }

  /**
   * Determines whether the specified callback function returns true for any element of an array.
   * @param predicate A function that accepts up to three arguments. The some method calls
   * the predicate function for each element in the array until the predicate returns a value
   * which is coercible to the Boolean value true, or until the end of the array.
   * @param thisArg An object to which the this keyword can refer in the predicate function.
   * If thisArg is omitted, undefined is used as the this value.
   */
  some(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any,
  ): boolean {
    return this.items.some(predicate, thisArg);
  }

  /**
   * Performs the specified action for each element in an array.
   * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
   * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   */
  public forEach(
    callbackfn: (value: T, index: number, array: T[]) => void,
    thisArg?: any,
  ): void {
    return this.items.forEach(callbackfn, thisArg);
  }

  /**
   * Calls a defined callback function on each element of an array, and returns an array that contains the results.
   * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   */
  public map<U>(
    callbackfn: (value: T, index: number, array: T[]) => U,
    thisArg?: any,
  ): U[] {
    return this.items.map(callbackfn, thisArg);
  }
  /**
   * Returns the elements of an array that meet the condition specified in a callback function.
   * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
   */
  public filter<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any,
  ): S[];
  public filter(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any,
  ): T[];
  public filter(
    predicate: (value: T, index: number, array: T[]) => any,
    thisArg?: any,
  ): any {
    return this.items.filter(predicate, thisArg);
  }

  /**
   * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
   * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
   */
  public reduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[],
    ) => T,
  ): T;
  public reduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[],
    ) => T,
    initialValue: T,
  ): T;
  public reduce<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[],
    ) => U,
    initialValue: U,
  ): U;
  public reduce(
    callbackfn: (
      previousValue: any,
      currentValue: T,
      currentIndex: number,
      array: any[],
    ) => any,
    initialValue?: any,
  ): any {
    return this.items.reduce(callbackfn, initialValue);
  }

  /**
   * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
   * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
   */
  public reduceRight(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[],
    ) => T,
  ): T;
  public reduceRight(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[],
    ) => T,
    initialValue: T,
  ): T;
  public reduceRight<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[],
    ) => U,
    initialValue: U,
  ): U;
  public reduceRight(
    callbackfn: (
      previousValue: any,
      currentValue: T,
      currentIndex: number,
      array: T[],
    ) => any,
    initialValue?: any,
  ): any {
    return this.items.reduceRight(callbackfn, initialValue);
  }
}

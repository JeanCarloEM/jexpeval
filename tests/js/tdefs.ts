import * as D from "../../src/definitions.js"

export type TOnGroup = (name: string) => void;
export type TOnFinish = (name: string, r: boolean) => void;
export type TOnItem = (name: string, r: boolean) => void;

export type jsep = (val: string | D.Expression) => D.Expression;

export type TItemTest = [string, string | number] | [string, string | number, D.TStringKeyMap];

export type TItemGroup = {
  name: string,
  t: TItemTest[]
}


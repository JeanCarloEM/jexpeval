import jsep from "jsep";

export const ExpressionTypeNames = [
  "Compound",
  "Identifier",
  "MemberExpression",
  "Literal",
  "ThisExpression",
  "CallExpression",
  "UnaryExpression",
  "BinaryExpression",
  "ConditionalExpression",
  "ArrayExpression",
];

export type TDefaultBaseType = null | string | number | boolean;
//export type TTypesProcessor = (input: ExpressionType) => Promise<TDefaultBaseType>;

export type TGetCaller = (
  name: string,
  args: any[],
) => Promise<TDefaultBaseType>;
export type TGetValue = (
  name: string,
  args: any[],
) => Promise<TDefaultBaseType>;
export type TExpParser = (input: string) => Promise<jsep.Expression>;

export interface TStringKeyMap {
  [key: string]: TDefaultBaseType;
}

export interface TTypesProcessor {
  eval(input: string | jsep.Expression): Promise<TDefaultBaseType>;
}

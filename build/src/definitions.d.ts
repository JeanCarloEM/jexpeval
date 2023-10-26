import * as unknowParser from "./unknowParser.js";
export type TPrimitivePrintableTypes = string | number | bigint;
export type TPrimitiveTypes = TPrimitivePrintableTypes | boolean | symbol | null | object | undefined;
export type TEvalResult = TPrimitiveTypes;
export type TPrintableEvalResult = TPrimitivePrintableTypes;
export type TGetCaller = (name: string, args: any[]) => Promise<TEvalResult>;
export type TGetValue = (name: string, args: any[]) => Promise<TEvalResult>;
export type TExpParser = (input: string) => Promise<unknowParser.Expression>;
export interface TStringKeyMap {
    [key: string]: TEvalResult;
}
export interface TTypesProcessor {
    eval(input: string | unknowParser.Expression): Promise<TEvalResult>;
}
//# sourceMappingURL=definitions.d.ts.map
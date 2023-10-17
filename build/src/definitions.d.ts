import * as unknowParser from "./unknowParser.js";
export type TDefaultBaseType = null | string | number | boolean;
export type TGetCaller = (name: string, args: any[]) => Promise<TDefaultBaseType>;
export type TGetValue = (name: string, args: any[]) => Promise<TDefaultBaseType>;
export type TExpParser = (input: string) => Promise<unknowParser.Expression>;
export interface TStringKeyMap {
    [key: string]: TDefaultBaseType;
}
export interface TTypesProcessor {
    eval(input: string | unknowParser.Expression): Promise<TDefaultBaseType>;
}
//# sourceMappingURL=definitions.d.ts.map
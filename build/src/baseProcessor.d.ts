import * as D from "./definitions.js";
export declare abstract class baseProcessor implements D.TTypesProcessor {
    protected readonly _parser: D.TExpParser;
    protected readonly _caller: D.TGetCaller;
    protected readonly _values: D.TGetValue;
    constructor(_parser: D.TExpParser, _caller: D.TGetCaller, _values: D.TGetValue);
    static getType(input: any): null | D.ExpressionType;
    abstract eval(input: string | D.Expression): Promise<D.TDefaultBaseType>;
}

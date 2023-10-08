import * as D from "./definitions";
import jsep from "jsep";
export declare abstract class baseProcessor implements D.TTypesProcessor {
    protected readonly _parser: D.TExpParser;
    protected readonly _caller: D.TGetCaller;
    protected readonly _values: D.TGetValue;
    constructor(_parser: D.TExpParser, _caller: D.TGetCaller, _values: D.TGetValue);
    static getType(input: any): null | jsep.ExpressionType;
    abstract eval(input: string | jsep.Expression): Promise<D.TDefaultBaseType>;
}
//# sourceMappingURL=baseProcessor.d.ts.map
import * as D from "./definitions";
import * as unknowParser from "./unknowParser";
export declare abstract class baseProcessor implements D.TTypesProcessor {
    protected readonly _parser: D.TExpParser;
    protected readonly _caller: D.TGetCaller;
    protected readonly _values: D.TGetValue;
    constructor(_parser: D.TExpParser, _caller?: D.TGetCaller, _values?: D.TGetValue);
    abstract eval(input: string | unknowParser.Expression): Promise<D.TDefaultBaseType>;
    static genericCallerSolver(name: string, args: any[]): Promise<D.TDefaultBaseType>;
    static genericValuesSolver(name: string): Promise<D.TDefaultBaseType>;
    static genericCallerUnknowParser(f: unknowParser.unknowParserCaller, i: string): Promise<unknowParser.Expression>;
    static getType(input: any): null | unknowParser.ExpressionType;
}
//# sourceMappingURL=baseProcessor.d.ts.map
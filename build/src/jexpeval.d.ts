import * as D from "./definitions";
import { baseProcessor } from "./baseProcessor";
import * as unknowParser from "./unknowParser";
export declare class jexpeval extends baseProcessor {
    static convertToPrintable(input: D.TEvalResult): D.TPrintableEvalResult;
    eval(input: string | unknowParser.Expression, printable?: boolean): Promise<D.TEvalResult | D.TPrintableEvalResult>;
    static run(str: string, printable: boolean | undefined, parser: D.TExpParser, caller?: D.TGetCaller, values?: D.TGetValue): Promise<D.TEvalResult>;
    static runAsWorker(str: string, printable: boolean | undefined, parser: D.TExpParser, caller?: D.TGetCaller, values?: D.TGetValue): Promise<D.TEvalResult>;
}
//# sourceMappingURL=jexpeval.d.ts.map
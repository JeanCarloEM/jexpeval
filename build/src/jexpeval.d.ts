import * as D from "./definitions";
import { baseProcessor } from "./baseProcessor";
import * as unknowParser from "./unknowParser";
import { jcemWorkerCreator } from "../@types/worker.js";
type externWorkerCreator = jcemWorkerCreator.ICreateWorker;
export declare class jexpeval extends baseProcessor {
    static convertToPrintable(input: D.TEvalResult): D.TPrintableEvalResult;
    eval(input: string | unknowParser.Expression, printable?: boolean): Promise<D.TEvalResult | D.TPrintableEvalResult>;
    static run(str: string, printable: boolean | undefined, parser: D.TExpParser, caller?: D.TGetCaller, values?: D.TGetValue): Promise<D.TEvalResult>;
    static runAsWorker(str: string, printable: boolean | undefined, _parser: D.TExpParser, _workerCreator?: null | externWorkerCreator, _caller?: D.TGetCaller, _values?: D.TGetValue): Promise<D.TEvalResult>;
}
export {};
//# sourceMappingURL=jexpeval.d.ts.map
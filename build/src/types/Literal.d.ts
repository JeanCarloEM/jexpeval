import * as D from "../definitions";
import * as unknowParser from "../unknowParser.js";
import { jexpeval } from "../jexpeval";
export declare class Literal extends jexpeval implements D.TTypesProcessor {
    eval(input: string | unknowParser.Expression): Promise<D.TDefaultBaseType>;
}
//# sourceMappingURL=Literal.d.ts.map
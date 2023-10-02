import * as D from "../definitions";
import jsep from "jsep";
import { jexpeval } from "../jexpeval";
export declare class Literal extends jexpeval implements D.TTypesProcessor {
    eval(input: string | jsep.Expression): Promise<D.TDefaultBaseType>;
}
//# sourceMappingURL=Literal.d.ts.map
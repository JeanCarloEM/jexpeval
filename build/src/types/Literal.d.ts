import * as D from "../definitions.js";
import { jexpeval } from "../jexpeval.js";
export declare class Literal extends jexpeval implements D.TTypesProcessor {
    eval(input: string | D.Expression): Promise<D.TDefaultBaseType>;
}

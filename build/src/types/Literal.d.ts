import * as D from "../definitions";
import { jexpeval } from "../jexpeval";
export declare class Literal extends jexpeval implements D.TTypesProcessor {
    eval(input: string | D.Expression): Promise<D.TDefaultBaseType>;
}

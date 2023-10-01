import * as D from "./definitions.js";
import { baseProcessor } from "./baseProcessor.js";
export declare class jexpeval extends baseProcessor {
    eval(input: string | D.Expression): Promise<D.TDefaultBaseType>;
}

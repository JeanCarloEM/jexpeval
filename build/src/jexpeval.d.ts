import * as D from "./definitions";
import { baseProcessor } from "./baseProcessor";
export declare class jexpeval extends baseProcessor {
    eval(input: string | D.Expression): Promise<D.TDefaultBaseType>;
}

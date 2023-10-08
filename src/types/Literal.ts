import * as D from "../definitions";
import jsep from "jsep";
import { baseProcessor } from "../baseProcessor";
import { jexpeval } from "../jexpeval";

export class Literal extends jexpeval implements D.TTypesProcessor {
  public eval(input: string | jsep.Expression): Promise<D.TDefaultBaseType> {
    return new Promise<D.TDefaultBaseType>((R0, R_0) => {});
  }
}

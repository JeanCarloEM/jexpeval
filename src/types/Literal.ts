import * as D from "../definitions";
import * as unknowParser from "../unknowParser.js";
import { baseProcessor } from "../baseProcessor";
import { jexpeval } from "../jexpeval";

export class Literal extends jexpeval implements D.TTypesProcessor {
  public eval(
    input: string | unknowParser.Expression,
  ): Promise<D.TDefaultBaseType> {
    return new Promise<D.TDefaultBaseType>((R0, R_0) => {});
  }
}

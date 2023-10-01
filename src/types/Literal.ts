import * as D from "../definitions.js"
import { baseProcessor } from "../baseProcessor.js"
import { jexpeval } from "../jexpeval.js"

export class Literal extends jexpeval implements D.TTypesProcessor {
  public eval(input: string | D.Expression): Promise<D.TDefaultBaseType> {
    return new Promise<D.TDefaultBaseType>((R0, R_0) => {
    });
  }
}
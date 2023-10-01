import * as D from "../definitions"
import { baseProcessor } from "../baseProcessor"
import { jexpeval } from "../jexpeval"

export class Literal extends jexpeval implements D.TTypesProcessor {
  public eval(input: string | D.Expression): Promise<D.TDefaultBaseType> {
    return new Promise<D.TDefaultBaseType>((R0, R_0) => {
    });
  }
}
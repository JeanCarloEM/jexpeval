import * as D from "../definitions";
import * as unknowParser from "../unknowParser.js";
import { baseProcessor } from "../baseProcessor";

namespace jexpeval {
  export class Literal extends baseProcessor implements D.TTypesProcessor {
    public eval(
      input: string | unknowParser.Expression,
    ): Promise<D.TEvalResult> {
      return new Promise<D.TEvalResult>((R0, R_0) => {});
    }
  }
}

import * as D from "./definitions.js"
import { baseProcessor } from "./baseProcessor.js"
import { Literal } from "./types/Literal.js"
 console.log("xxxx");

/**
 * https://ericsmekens.github.io/jsep/
 */
export class jexpeval extends baseProcessor {
  /**
   *
   * @param input
   * @returns
   */
  public eval(input: string | D.Expression): Promise<D.TDefaultBaseType> {
    if (typeof input !== 'string') {
      throw "Eval input in jexpeval isnot string";
    }

    return new Promise<D.TDefaultBaseType>((R0, R_0) => {
      this._parser(input)
        .then((r: any) => {
          let tp: null | D.ExpressionType = (this.constructor as typeof jexpeval).getType(r);

          if (tp === null) {
            throw "Invalid type in lex eval."
          }

          (<baseProcessor>(new (<any>window)[tp](this._parser, this._caller, this._values)))
            .eval(<D.Expression>r)
            .then(r1 => R0(r1))
            .catch(r2 => R_0(r2));
        });
    });
  }
}
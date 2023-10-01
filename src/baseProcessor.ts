import * as D from "./definitions"
import { Literal } from "./types/Literal"


/**
 * https://ericsmekens.github.io/jsep/
 */
export abstract class baseProcessor implements D.TTypesProcessor {
  constructor(
    protected readonly _parser: D.TExpParser,
    protected readonly _caller: D.TGetCaller,
    protected readonly _values: D.TGetValue
  ) {

  }

  /**
   *
   * @param input
   * @returns
   */
  public static getType(input: any): null | D.ExpressionType {
    if (
      (typeof input === "object") &&
      (input.hasOwnProperty('type')) &&
      (D.ExpressionTypeNames.indexOf(input.type))
    ) {
      return input.type;
    }

    return null;
  }

  /**
   *
   * @param input
   */
  abstract eval(input: string | D.Expression): Promise<D.TDefaultBaseType>;
}
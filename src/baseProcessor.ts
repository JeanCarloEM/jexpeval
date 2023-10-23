import * as D from "./definitions";
import * as unknowParser from "./unknowParser";

/**
 * https://ericsmekens.github.io/jsep/
 */
export abstract class baseProcessor implements D.TTypesProcessor {
  constructor(
    protected readonly _parser: D.TExpParser,
    protected readonly _caller: D.TGetCaller = baseProcessor.genericCallerSolver,
    protected readonly _values: D.TGetValue = baseProcessor.genericValuesSolver,
  ) {}

  /**
   *
   * @param input
   */
  abstract eval(
    input: string | unknowParser.Expression,
  ): Promise<D.TEvalResult>;

  /**
   * Default provided for callers solvers return nothing
   *
   * @param name
   * @param args
   * @returns
   */
  public static genericCallerSolver(
    name: string,
    args: any[],
  ): Promise<D.TEvalResult> {
    return new Promise<D.TEvalResult>((R, R_) => {
      R(`\`${name}\``);
    });
  }

  /**
   * Default provided for values solvers return nothing
   *
   * @param name
   * @param args
   * @returns
   */
  public static genericValuesSolver(name: string): Promise<D.TEvalResult> {
    return new Promise<D.TEvalResult>((R, R_) => {
      R(`\`${name}\``);
    });
  }

  /**
   * Default provided for when the parser (unknowParser) can be invoked as a function
   *
   * @param f a unknowParser function
   * @param i string to parser
   * @returns
   */
  public static genericCallerUnknowParser(
    f: unknowParser.unknowParserCaller,
    i: string,
  ): Promise<unknowParser.Expression> {
    return new Promise<unknowParser.Expression>((R1, R_1) => {
      if (typeof f !== "function") {
        throw "JSEP is not defined";
      }

      let resp: unknowParser.Expression = f(i);

      if (typeof resp !== "object") {
        throw "Value returned in JSEP is not array";
      }

      if (!resp.hasOwnProperty("type")) {
        throw "Value returned in JSEP dont contain 'type' item.";
      }

      R1(resp);
    });
  }

  /**
   *
   * @param input
   * @returns
   */
  public static getType(input: any): null | unknowParser.ExpressionType {
    if (
      typeof input === "object" &&
      input.hasOwnProperty("type") &&
      unknowParser.ExpressionTypeNames.indexOf(input.type)
    ) {
      return input.type;
    }

    return null;
  }
}

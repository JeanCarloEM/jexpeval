import * as D from "./definitions";
import { baseProcessor } from "./baseProcessor";
import { Literal } from "./types/Literal";
import * as unknowParser from "./unknowParser";
import * as WK from "./worker";
import { TPromiseFromBrowserToWorker } from "./worker";


export type createNewWorker = (
  callers: { [key: string]: ({ ...srgs }: any) => Promise<any> },
  starter: (getFromBrowser: TPromiseFromBrowserToWorker) => Promise<any>
) => void;

/**
 * https://ericsmekens.github.io/unknowParser/
 */
export class jexpeval extends baseProcessor {
  public static convertToPrintable(
    input: D.TEvalResult,
  ): D.TPrintableEvalResult {
    return 1;
  }

  /**
   *
   * @param input
   * @returns
   */
  public eval(
    input: string | unknowParser.Expression,
    printable: boolean = false,
  ): Promise<D.TEvalResult | D.TPrintableEvalResult> {
    if (typeof input !== "string") {
      throw "Eval input in jexpeval isnot string";
    }

    return new Promise<D.TEvalResult | D.TPrintableEvalResult>((R0, R_0) => {
      this._parser(input).then((r: any) => {
        let tp: null | unknowParser.ExpressionType = (
          this.constructor as typeof jexpeval
        ).getType(r);

        if (tp === null) {
          throw "Invalid type in lex eval.";
        }

        (<baseProcessor>(
          new (<any>global)[tp](this._parser, this._caller, this._values)
        ))
          .eval(<unknowParser.Expression>r)
          .then((r1) => R0(printable ? jexpeval.convertToPrintable(r1) : r1))
          .catch((r2) => R_0(r2));
      });
    });
  }

  public static run(
    str: string,
    printable: boolean = false,
    parser: D.TExpParser,
    caller: D.TGetCaller = baseProcessor.genericCallerSolver,
    values: D.TGetValue = baseProcessor.genericValuesSolver,
  ): Promise<D.TEvalResult> {
    return new jexpeval(parser, caller, values).eval(str, printable);
  }

  /**
   *
   * @param str
   * @param printable
   * @param parser
   * @param caller
   * @param values
   * @returns
   */
  public static runAsWorker(
    str: string,
    printable: boolean = false,
    parser: D.TExpParser,
    caller: D.TGetCaller = baseProcessor.genericCallerSolver,
    values: D.TGetValue = baseProcessor.genericValuesSolver,
  ): Promise<D.TEvalResult> {
    // @ts-expect-error
    if (!createWorkerNovo || typeof createWorkerNovo !== "function") {
      throw `[runAsWorker] createWorkerNovo is not a function.`
    }

    // @ts-expect-error
    return (<createNewWorker>createWorkerNovo)(
      {
        parser: function (input: string): Promise<Promise<unknowParser.Expression>> {
          return new Promise<Promise<unknowParser.Expression>>((R0, R_1) => {
            R0(1);
          });
        },
        caller: function ({ name: string, ...args: any }): Promise<D.TEvalResult> {
          return new Promise<any>((R0, R_1) => {
            R0(1);
          });
        },
        values: function (name: string): Promise<D.TEvalResult> {
          return new Promise<any>((R0, R_1) => {
            R0(1);
          });
        },
      },
      (getFromBrowser: TPromiseFromBrowserToWorker) => {
        new jexpeval(
          function (input: string): Promise<unknowParser.Expression> {
            return <Promise<unknowParser.Expression>>(
              getFromBrowser("parser", [])
            );
          },
          function (name: string, args: any[]): Promise<D.TEvalResult> {
            return <Promise<D.TEvalResult>>getFromBrowser("caller", [name, [args]);
          },
          function (name: string): Promise<D.TEvalResult> {
            return <Promise<D.TEvalResult>>getFromBrowser("values", [name]);
          },
        )
          .eval(str, printable)
          .catch((e) => { })
          .then((r) => { });
      },
    );
  }
}

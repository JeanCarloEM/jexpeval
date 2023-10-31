import * as D from "./definitions";
import { baseProcessor } from "./baseProcessor";
import * as unknowParser from "./unknowParser";
import { jcemWorkerCreator } from "../@types/worker.js";

type externWorkerCreator = jcemWorkerCreator.ICreateWorker;

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
    _parser: D.TExpParser,
    _workerCreator: null | externWorkerCreator = null,
    _caller: D.TGetCaller = baseProcessor.genericCallerSolver,
    _values: D.TGetValue = baseProcessor.genericValuesSolver,
  ): Promise<D.TEvalResult> {
    if (!window) {
      throw "[jexpeval] worker only avaliable on browser: window dont exists.";
    }

    if (!Worker) {
      throw "[jexpeval] worker only avaliable on browser: Worker dont exists.";
    }

    _workerCreator =
      typeof _workerCreator !== null
        ? <externWorkerCreator>_workerCreator
        : // @ts-expect-error
        window.jcemWorkerCreator &&
          // @ts-expect-error
          typeof window.jcemWorkerCreator === "function"
        ? // @ts-expect-error
          <externWorkerCreator>window.jcemWorkerCreator
        : null;

    if (_workerCreator === null) {
      throw "[runAsWorker] creator dont exists.";
    }

    return _workerCreator(
      /**
       * this run in window sede
       */
      {
        parser: (args: D.TObjectOf<any>): Promise<any> => {
          return new Promise<any>((R0, R_1) => {
            R0({ return: 1, id: "" });
          });
        },
        caller: (args: D.TObjectOf<any>): Promise<any> => {
          return <Promise<any>>_caller(args.name, args.args);
        },
        values: (args: D.TObjectOf<any>): Promise<any> => {
          return <Promise<any>>_values(args.name);
        },
      },
      /**
       * this script run in worker side (converted to string)
       *
       * @param inWorkerGetFromWindowSide
       */
      (
        inWorkerGetFromWindowSide: jcemWorkerCreator.TPromiseFromBrowserToWorker,
      ) => {
        new jexpeval(
          function (input: string): Promise<unknowParser.Expression> {
            return <Promise<unknowParser.Expression>>(
              inWorkerGetFromWindowSide("parser", [])
            );
          },
          function (name: string, args: any[]): Promise<D.TEvalResult> {
            return <Promise<D.TEvalResult>>inWorkerGetFromWindowSide("caller", {
              name: name,
              args: args,
            });
          },
          function (name: string): Promise<D.TEvalResult> {
            return <Promise<D.TEvalResult>>(
              inWorkerGetFromWindowSide("values", { name: name })
            );
          },
        )
          .eval(str, printable)
          .catch((e) => {})
          .then((r) => {});
      },
    );
  }
}

import * as D from "./definitions";

export module jcemWorkerCreator {
  export type TGetterStringType = "TGetCaller" | "TGetValue";

  export type TObjectOf<T> = { [key: string]: T };

  export type TPromiseFromBrowserToWorker = (
    name: string,
    args: TObjectOf<any>,
  ) => Promise<any>;

  export type TWindowResponseToWorkerType = { return: any; id: string };

  export type TWindowResponseToWorker = {
    [key: string]: (args: TObjectOf<any>) => Promise<any>;
  };

  export type TWorkerFunction = (
    inWorkerGetFromWindowSide: TPromiseFromBrowserToWorker,
  ) => void;

  /**
   *
   */
  export function scriptWorker(starter: TWorkerFunction) {
    let started: boolean = false;

    /**
     *
     * @param msg
     * @param type
     */
    function CONSOLE(msg: string, type: "log" | "warn" | "error"): boolean {
      self.postMessage({
        type: "CONSOLE",
        mode: type,
        msg: msg,
      });

      return true;
    }

    /**
     *
     * @param msg
     */
    function LOG(msg: string): void {
      CONSOLE(msg, "log");
    }

    /**
     *
     * @param msg
     */
    function WARN(msg: string): void {
      CONSOLE(msg, "warn");
    }

    /**
     *
     * @param msg
     */
    function ERROR(msg: string): boolean {
      return CONSOLE(msg, "error");
    }

    /**
     *
     * @param e
     * @returns
     */
    function hasBasicMessageError(e: any): boolean {
      if (typeof e !== "object") {
        return ERROR(
          "[jcemWorkerCreator][runAsWorker][worker] message isnot object.",
        );
      }

      if (!e.hasOwnProperty("data")) {
        return ERROR(
          "[jcemWorkerCreator][runAsWorker][worker] message dont contain 'data' proprerty.",
        );
      }

      if (typeof e.data !== "object") {
        return ERROR(
          "[jcemWorkerCreator][runAsWorker][worker] data of message isnot object.",
        );
      }

      return false;
    }

    function hasBasicMessageChildError(
      e: TObjectOf<any>,
      key: string,
      type: string,
      checkEmpty: boolean = false,
    ): boolean {
      key = key.trim();
      type = type.trim();

      if (key.length === 0) {
        return ERROR(
          `[jcemWorkerCreator][runAsWorker][worker][basicMessageChildCheck] 'key' parameter is empty.`,
        );
      }

      if (type.length === 0) {
        return ERROR(
          `[jcemWorkerCreator][runAsWorker][worker][basicMessageChildCheck] 'type' parameter is empty.`,
        );
      }

      if (!e.hasOwnProperty(key)) {
        return ERROR(
          `[jcemWorkerCreator][runAsWorker][worker][basicMessageChildCheck] message don't contain '${key}' proprerty.`,
        );
      }

      if (typeof e[key] !== type) {
        return ERROR(
          `[jcemWorkerCreator][runAsWorker][worker][basicMessageChildCheck] property '${key}' is not a valid '${type}'.`,
        );
      }

      if (
        checkEmpty &&
        (typeof e[key] !== "string" || Array.isArray(e[key])) &&
        e[key].length === 0
      ) {
        return ERROR(
          `[jcemWorkerCreator][runAsWorker][worker][basicMessageChildCheck] property '${key}' is empty.`,
        );
      }

      return false;
    }

    /**
     *
     * @returns
     */
    const uuid = () => {
      return "uid10000000100040008000100000000000".replace(/[018]/g, (x) => {
        const c: any = <any>x;
        return (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16);
      });
    };

    /**
     *
     * @param id
     * @param caller
     * @param args
     * @returns
     */
    function inWorkerGetCallResponseFromWindow(
      caller: string | TGetterStringType,
      args: TObjectOf<any>,
    ): Promise<any> {
      const id: string = uuid();
      let __terminated = false;

      return new Promise<any>((R0, R_0) => {
        self.addEventListener("message", function (e) {
          if (__terminated) {
            return;
          }

          if (hasBasicMessageError(e)) {
            return;
          }

          if (hasBasicMessageChildError(e.data, "return", "string", true)) {
            return;
          }

          if (e.data.id !== id) {
            return;
          }

          __terminated = true;
          R0(e.data.return);
        });

        /* request to window call */
        self.postMessage({ caller: caller, args: args, id: id });
      });
    }

    function inWorkerGetFromWindowSide(
      name: string,
      args: {
        [key: string]: any;
      },
    ): Promise<any> {
      return new Promise<any>((R0, R_0) => {
        inWorkerGetCallResponseFromWindow(name, args)
          .catch((e) => R_0(e))
          .then((r) => R0(r));
      });
    }

    self.addEventListener("message", function (e) {
      if (e.data === "start") {
        started = true;
        starter(inWorkerGetFromWindowSide);
      }
    });
  }

  /**
   *
   * @returns
   */
  export function createWorkerFromFunction(starter: TWorkerFunction): Worker {
    const source = window.URL.createObjectURL(
      new Blob(["(", scriptWorker.toString(), ")(", starter.toString(), ")"], {
        type: "text/javascript",
      }),
    );

    console.warn(source);

    return new Worker(source);
  }

  /**
   *
   * window side work Management
   *
   * @param w
   * @param windowSideHooks
   * @returns
   */
  function windowSideWorkerManagement(
    w: Worker,
    windowSideHooks: TWindowResponseToWorker,
  ): Promise<D.TEvalResult> {
    return new Promise<D.TEvalResult>((R0, R_0) => {
      w.addEventListener("message", function (e) {
        if (typeof e !== "object") {
          throw "[jcemWorkerCreator][runAsWorker][window] message isnot object.";
        }

        if (!e.hasOwnProperty("data")) {
          throw "[jcemWorkerCreator][runAsWorker][window] message dont contain 'data' proprerty.";
        }

        if (typeof e.data !== "object") {
          throw "[jcemWorkerCreator][runAsWorker][window] data of message isnot object.";
        }

        /**
         * has error or return
         */
        if (e.data.hasOwnProperty("return")) {
          w.terminate();

          return R0(e.data.return);
        }

        /**
         * another messages type
         */

        if (!e.data.hasOwnProperty("type")) {
          throw "[jcemWorkerCreator][runAsWorker][window] message dont contain 'type' proprerty.";
        }

        if (typeof e.data.type !== "string") {
          throw "[jcemWorkerCreator][runAsWorker][window] message type is not string.";
        }

        const T: string = e.data.type.trim().toUpperCase();

        if (T === "CONSOLE") {
          if (!e.data.hasOwnProperty("msg")) {
            throw "[jcemWorkerCreator][runAsWorker][window] message of LOG dont exists.";
          }
          if (typeof e.data.msg !== "string") {
            throw "[jcemWorkerCreator][runAsWorker][window] message of LOG isnot string.";
          }

          if (!e.data.hasOwnProperty("type")) {
            throw "[jcemWorkerCreator][runAsWorker][window] type of message LOG dont exists.";
          }

          if (typeof e.data.type !== "string") {
            throw "[jcemWorkerCreator][runAsWorker][window] typeo of message LOG isnot string.";
          }

          switch (e.data.type.trim().toLowerCase()) {
            case "log":
              console.log(e.data.msg);
              break;

            case "warn":
              console.warn(e.data.msg);
              break;

            case "error":
              console.error(e.data.msg);
              break;

            default:
              throw "[jcemWorkerCreator][runAsWorker][window] typeo of message LOG is not valid type.";
              break;
          }

          return;
        }

        if (T === "CALLER") {
          if (e.data.hasOwnProperty("caller")) {
            if (typeof e.data.caller !== "string") {
              throw "[jcemWorkerCreator][runAsWorker][window] caller of message isnot string.";
            }

            e.data.caller = e.data.caller.trim();

            if (e.data.caller.length === 0) {
              throw "[jcemWorkerCreator][runAsWorker][window] caller of message is empty.";
            }

            if (!windowSideHooks.hasOwnProperty(e.data.caller)) {
              throw "[jcemWorkerCreator][windowSideWorkerManagement][window] the caller name does not exist.";
            }

            if (typeof windowSideHooks[e.data.caller] !== "function") {
              throw "[jcemWorkerCreator][windowSideWorkerManagement][window] caller name is not a function.";
            }

            if (!e.data.hasOwnProperty("id")) {
              throw "[jcemWorkerCreator][windowSideWorkerManagement][window] caller of message dont contain id.";
            }

            if (typeof e.data.id !== "string") {
              throw "[jcemWorkerCreator][windowSideWorkerManagement][window] caller of message isnot string.";
            }

            if (e.data.caller.id === 0) {
              throw "[jcemWorkerCreator][windowSideWorkerManagement][window] caller id of message is empty.";
            }

            let args = {};

            if (e.data.hasOwnProperty("args")) {
              if (typeof e.data.args !== "object") {
                throw "[jcemWorkerCreator][windowSideWorkerManagement][window] optional args is not a object.";
              }

              args = e.data.args;
            }

            return windowSideHooks[e.data.caller](args).then((r: any) => {
              w.postMessage({ return: r, id: e.data.id });
            });
          }

          return;
        }

        throw "[jcemWorkerCreator][runAsWorker][window] It was not expected that the execution would reach this line.";
      });

      /* start */
      w.postMessage({
        start: true,
      });
    });
  }

  /**
   *
   * @param windowSideHooks named function object that will run in window scope
   * @param workerSideFunction function that will be converted into a string and will be executed within the Worker (must be compatible)
   * @returns
   */

  export type ICreateWorker = (
    windowSideHooks: TWindowResponseToWorker,
    workerSideFunction: TWorkerFunction,
  ) => Promise<D.TEvalResult>;

  export function createWorker(
    windowSideHooks: TWindowResponseToWorker,
    workerSideFunction: TWorkerFunction,
  ): Promise<D.TEvalResult> {
    if (!window) {
      throw "[jcemWorkerCreator] worker only avaliable on browser: window dont exists.";
    }

    if (!Worker) {
      throw "[jcemWorkerCreator] worker only avaliable on browser: Worker dont exists.";
    }

    /* create worker */
    const w: Worker = createWorkerFromFunction(workerSideFunction);

    /* create window side worker Managements */
    return windowSideWorkerManagement(w, windowSideHooks);
  }
}

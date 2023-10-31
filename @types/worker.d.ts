import * as D from "./definitions";
export declare namespace jcemWorkerCreator {
    type TGetterStringType = "TGetCaller" | "TGetValue";
    type TObjectOf<T> = {
        [key: string]: T;
    };
    type TPromiseFromBrowserToWorker = (name: string, args: TObjectOf<any>) => Promise<any>;
    type TWindowResponseToWorkerType = {
        return: any;
        id: string;
    };
    type TWindowResponseToWorker = {
        [key: string]: (args: TObjectOf<any>) => Promise<any>;
    };
    type TWorkerFunction = (inWorkerGetFromWindowSide: TPromiseFromBrowserToWorker) => void;
    function scriptWorker(starter: TWorkerFunction): void;
    function createWorkerFromFunction(starter: TWorkerFunction): Worker;
    type ICreateWorker = (windowSideHooks: TWindowResponseToWorker, workerSideFunction: TWorkerFunction) => Promise<D.TEvalResult>;
    function createWorker(windowSideHooks: TWindowResponseToWorker, workerSideFunction: TWorkerFunction): Promise<D.TEvalResult>;
}
//# sourceMappingURL=worker.d.ts.map
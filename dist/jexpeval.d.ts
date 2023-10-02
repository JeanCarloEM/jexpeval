declare module 'jexpeval/src/baseProcessor' {
  import * as D from "jexpeval/src/definitions";
  import jsep from "jsep";
  export abstract class baseProcessor implements D.TTypesProcessor {
      protected readonly _parser: D.TExpParser;
      protected readonly _caller: D.TGetCaller;
      protected readonly _values: D.TGetValue;
      constructor(_parser: D.TExpParser, _caller: D.TGetCaller, _values: D.TGetValue);
      static getType(input: any): null | jsep.ExpressionType;
      abstract eval(input: string | jsep.Expression): Promise<D.TDefaultBaseType>;
  }
  //# sourceMappingURL=baseProcessor.d.ts.map
}
declare module 'jexpeval/src/baseProcessor.d.ts' {
  {"version":3,"file":"baseProcessor.d.ts","sourceRoot":"","sources":["file:///D:/TRAMPO/boothtml/src/vendor/strtransformjs/src/vendor/expeval/src/baseProcessor.ts"],"names":[],"mappings":"AAAA,OAAO,KAAK,CAAC,MAAM,eAAe,CAAA;AAClC,OAAO,IAAI,MAAM,MAAM,CAAC;AAOxB,8BAAsB,aAAc,YAAW,CAAC,CAAC,eAAe;IAE5D,SAAS,CAAC,QAAQ,CAAC,OAAO,EAAE,CAAC,CAAC,UAAU;IACxC,SAAS,CAAC,QAAQ,CAAC,OAAO,EAAE,CAAC,CAAC,UAAU;IACxC,SAAS,CAAC,QAAQ,CAAC,OAAO,EAAE,CAAC,CAAC,SAAS;gBAFpB,OAAO,EAAE,CAAC,CAAC,UAAU,EACrB,OAAO,EAAE,CAAC,CAAC,UAAU,EACrB,OAAO,EAAE,CAAC,CAAC,SAAS;WAU3B,OAAO,CAAC,KAAK,EAAE,GAAG,GAAG,IAAI,GAAG,IAAI,CAAC,cAAc;IAgB7D,QAAQ,CAAC,IAAI,CAAC,KAAK,EAAE,MAAM,GAAG,IAAI,CAAC,UAAU,GAAG,OAAO,CAAC,CAAC,CAAC,gBAAgB,CAAC;CAC5E"}
}
declare module 'jexpeval/src/definitions' {
  import jsep from "jsep";
  export const ExpressionTypeNames: string[];
  export type TDefaultBaseType = null | string | number | boolean;
  export type TGetCaller = (name: string, args: any[]) => Promise<TDefaultBaseType>;
  export type TGetValue = (name: string, args: any[]) => Promise<TDefaultBaseType>;
  export type TExpParser = (input: string) => Promise<jsep.Expression>;
  export interface TStringKeyMap {
      [key: string]: TDefaultBaseType;
  }
  export interface TTypesProcessor {
      eval(input: string | jsep.Expression): Promise<TDefaultBaseType>;
  }
  //# sourceMappingURL=definitions.d.ts.map
}
declare module 'jexpeval/src/definitions.d.ts' {
  {"version":3,"file":"definitions.d.ts","sourceRoot":"","sources":["file:///D:/TRAMPO/boothtml/src/vendor/strtransformjs/src/vendor/expeval/src/definitions.ts"],"names":[],"mappings":"AAAA,OAAO,IAAI,MAAM,MAAM,CAAC;AAExB,eAAO,MAAM,mBAAmB,UAW/B,CAAC;AAEF,MAAM,MAAM,gBAAgB,GAAG,IAAI,GAAG,MAAM,GAAG,MAAM,GAAG,OAAO,CAAC;AAGhE,MAAM,MAAM,UAAU,GAAG,CAAC,IAAI,EAAE,MAAM,EAAE,IAAI,EAAE,GAAG,EAAE,KAAK,OAAO,CAAC,gBAAgB,CAAC,CAAC;AAClF,MAAM,MAAM,SAAS,GAAG,CAAC,IAAI,EAAE,MAAM,EAAE,IAAI,EAAE,GAAG,EAAE,KAAK,OAAO,CAAC,gBAAgB,CAAC,CAAC;AACjF,MAAM,MAAM,UAAU,GAAG,CAAC,KAAK,EAAE,MAAM,KAAK,OAAO,CAAC,IAAI,CAAC,UAAU,CAAC,CAAC;AAErE,MAAM,WAAW,aAAa;IAAG,CAAC,GAAG,EAAE,MAAM,GAAG,gBAAgB,CAAC;CAAE;AAEnE,MAAM,WAAW,eAAe;IAC9B,IAAI,CAAE,KAAK,EAAE,MAAM,GAAG,IAAI,CAAC,UAAU,GAAG,OAAO,CAAC,gBAAgB,CAAC,CAAC;CACnE"}
}
declare module 'jexpeval/src/jexpeval' {
  import * as D from "jexpeval/src/definitions";
  import { baseProcessor } from "jexpeval/src/baseProcessor";
  import jsep from "jsep";
  export class jexpeval extends baseProcessor {
      eval(input: string | jsep.Expression): Promise<D.TDefaultBaseType>;
  }
  //# sourceMappingURL=jexpeval.d.ts.map
}
declare module 'jexpeval/src/jexpeval.d.ts' {
  {"version":3,"file":"jexpeval.d.ts","sourceRoot":"","sources":["file:///D:/TRAMPO/boothtml/src/vendor/strtransformjs/src/vendor/expeval/src/jexpeval.ts"],"names":[],"mappings":"AAAA,OAAO,KAAK,CAAC,MAAM,eAAe,CAAA;AAClC,OAAO,EAAE,aAAa,EAAE,MAAM,iBAAiB,CAAA;AAE/C,OAAO,IAAI,MAAM,MAAM,CAAC;AAKxB,qBAAa,QAAS,SAAQ,aAAa;IAMlC,IAAI,CAAC,KAAK,EAAE,MAAM,GAAG,IAAI,CAAC,UAAU,GAAG,OAAO,CAAC,CAAC,CAAC,gBAAgB,CAAC;CAqB1E"}
}
declare module 'jexpeval/src/types/Literal' {
  import * as D from "jexpeval/src/definitions";
  import jsep from "jsep";
  import { jexpeval } from "jexpeval/src/jexpeval";
  export class Literal extends jexpeval implements D.TTypesProcessor {
      eval(input: string | jsep.Expression): Promise<D.TDefaultBaseType>;
  }
  //# sourceMappingURL=Literal.d.ts.map
}
declare module 'jexpeval/src/types/Literal.d.ts' {
  {"version":3,"file":"Literal.d.ts","sourceRoot":"","sources":["file:///D:/TRAMPO/boothtml/src/vendor/strtransformjs/src/vendor/expeval/src/types/Literal.ts"],"names":[],"mappings":"AAAA,OAAO,KAAK,CAAC,MAAM,gBAAgB,CAAA;AACnC,OAAO,IAAI,MAAM,MAAM,CAAC;AAExB,OAAO,EAAE,QAAQ,EAAE,MAAM,aAAa,CAAA;AAEtC,qBAAa,OAAQ,SAAQ,QAAS,YAAW,CAAC,CAAC,eAAe;IACzD,IAAI,CAAC,KAAK,EAAE,MAAM,GAAG,IAAI,CAAC,UAAU,GAAG,OAAO,CAAC,CAAC,CAAC,gBAAgB,CAAC;CAI1E"}
}
declare module 'jexpeval/tests/js/nav' {
  export {};
  //# sourceMappingURL=nav.d.ts.map
}
declare module 'jexpeval/tests/js/nav.d.ts' {
  {"version":3,"file":"nav.d.ts","sourceRoot":"","sources":["file:///D:/TRAMPO/boothtml/src/vendor/strtransformjs/src/vendor/expeval/tests/js/nav.ts"],"names":[],"mappings":""}
}
declare module 'jexpeval/tests/js/tdefs' {
  import * as D from "jexpeval/src/definitions.js/index";
  export type TOnGroup = (name: string) => void;
  export type TOnFinish = (name: string, r: boolean) => void;
  export type TOnItem = (name: string, r: boolean) => void;
  export type TItemTest = [string, string | number] | [string, string | number, D.TStringKeyMap];
  export type TItemGroup = {
      name: string;
      t: TItemTest[];
  };
  //# sourceMappingURL=tdefs.d.ts.map
}
declare module 'jexpeval/tests/js/tdefs.d.ts' {
  {"version":3,"file":"tdefs.d.ts","sourceRoot":"","sources":["file:///D:/TRAMPO/boothtml/src/vendor/strtransformjs/src/vendor/expeval/tests/js/tdefs.ts"],"names":[],"mappings":"AAAA,OAAO,KAAK,CAAC,MAAM,0BAA0B,CAAA;AAE7C,MAAM,MAAM,QAAQ,GAAG,CAAC,IAAI,EAAE,MAAM,KAAK,IAAI,CAAC;AAC9C,MAAM,MAAM,SAAS,GAAG,CAAC,IAAI,EAAE,MAAM,EAAE,CAAC,EAAE,OAAO,KAAK,IAAI,CAAC;AAC3D,MAAM,MAAM,OAAO,GAAG,CAAC,IAAI,EAAE,MAAM,EAAE,CAAC,EAAE,OAAO,KAAK,IAAI,CAAC;AAEzD,MAAM,MAAM,SAAS,GAAG,CAAC,MAAM,EAAE,MAAM,GAAG,MAAM,CAAC,GAAG,CAAC,MAAM,EAAE,MAAM,GAAG,MAAM,EAAE,CAAC,CAAC,aAAa,CAAC,CAAC;AAE/F,MAAM,MAAM,UAAU,GAAG;IACvB,IAAI,EAAE,MAAM,CAAC;IACb,CAAC,EAAE,SAAS,EAAE,CAAA;CACf,CAAA"}
}
declare module 'jexpeval/tests/js/tests' {
  import * as T from "jexpeval/tests/js/tdefs.js/index";
  export class tests {
      static run_item(input: T.TItemTest[], onItem?: null | T.TOnItem, pre_r?: boolean): Promise<boolean>;
      static run(input: T.TItemGroup[], onItem?: null | T.TOnItem, onGroup?: null | T.TOnGroup, onGoupFinish?: null | T.TOnFinish, pre_r?: boolean): Promise<boolean>;
  }
  //# sourceMappingURL=tests.d.ts.map
}
declare module 'jexpeval/tests/js/tests.d.ts' {
  {"version":3,"file":"tests.d.ts","sourceRoot":"","sources":["file:///D:/TRAMPO/boothtml/src/vendor/strtransformjs/src/vendor/expeval/tests/js/tests.ts"],"names":[],"mappings":"AACA,OAAO,KAAK,CAAC,MAAM,YAAY,CAAA;AAO/B,qBAAa,KAAK;WAOF,QAAQ,CACpB,KAAK,EAAE,CAAC,CAAC,SAAS,EAAE,EACpB,MAAM,GAAE,IAAI,GAAG,CAAC,CAAC,OAAc,EAC/B,KAAK,GAAE,OAAc,GACpB,OAAO,CAAC,OAAO,CAAC;WAqGL,GAAG,CACf,KAAK,EAAE,CAAC,CAAC,UAAU,EAAE,EACrB,MAAM,GAAE,IAAI,GAAG,CAAC,CAAC,OAAc,EAC/B,OAAO,GAAE,IAAI,GAAG,CAAC,CAAC,QAAe,EACjC,YAAY,GAAE,IAAI,GAAG,CAAC,CAAC,SAAgB,EACvC,KAAK,GAAE,OAAc,GACpB,OAAO,CAAC,OAAO,CAAC;CAiCpB"}
}
declare module 'jexpeval' {
  import main = require('jexpeval/src/jexpeval');
  export = main;
}
import { h, Component, render } from "preact";
import htm from "htm";
import {
  ItestSolver,
  testSolver,
  TTestResult,
  TTestSource,
} from "../models/tester.js";
import ItemView from "./item/item";
import { createTest, load } from "../testsRun.js";
import { TPrintableEvalResult } from "../../../src/definitions.js";

export abstract class main {
  /**
   *
   * @param name
   * @returns
   */
  public static onStatusItemChange(
    targetId: string,

    targetStatus: TTestResult,

    partial: boolean,

    ref?: ItestSolver,
  ) {
    if (partial) return;

    switch (targetStatus) {
      case "running":
        console.log(`Running '${ref && ref.title}'.`);
        break;

      case true:
        console.log(`OK '${ref && ref.title}'.`);
        break;

      case false:
        console.error(`FAIL '${ref && ref.title}'.`);
        break;

      default:
        break;
    }
  }
  /**
   *
   */
  public static run(): void {
    load([], 500).then((r) => {
      const SRC: testSolver = <testSolver>r;
      render(
        h(ItemView, {
          source: SRC,
          onStatusChange: this.onStatusItemChange,
        }),
        <Element>document.querySelector("body > div.root"),
      );

      setTimeout(() => {
        SRC.run();
      }, 10);
    });
  }
}

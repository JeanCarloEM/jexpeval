import { h, Component, render } from "preact";
import htm from "htm";
import { ItestSolver, TTestResult, TTestSource } from "../models/tester.js";
import ItemView from "./item/item";
import { createTest, load } from "../testsRun.js";

export abstract class main {
  /**
   *
   * @param name
   * @returns
   */
  public static onStatusItemChange(
    id: string,
    resp: TTestResult,
    item?: ItestSolver,
  ) {
    switch (resp) {
      case "running":
        console.log(`Running '${item && item.title}'.`);
        break;

      case true:
        break;

      case false:
        break;

      default:
        break;
    }
  }
  /**
   *
   */
  public static run(): void {
    load().then((r) => {
      render(
        h(ItemView, {
          creator: createTest,
          source: <TTestSource>r,
          onStatusChange: this.onStatusItemChange,
        }),
        <Element>document.querySelector("body > div.root"),
      );
    });
  }
}

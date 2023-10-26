import { h, Component, render } from "preact";
import htm from "htm";
import { TTestResult } from "../models/tester.js";
//import testItem from "./browser/item.js";

export abstract class main {
  /**
   *
   * @param name
   * @returns
   */
  public onStatusItemChange(id: string, resp: TTestResult) {
    switch (resp) {
      case "running":
        console.log();
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
  public static run(): void {}
}

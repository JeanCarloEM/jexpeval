import * as T from "./tdefs.js";
import { tests } from "./tests.js";

export abstract class navtests {
  /**
   *
   * @param name
   * @returns
   */
  public static onGroup(name: string): void {}

  /**
   *
   * @param name
   * @param r
   * @returns
   */
  public static onGoupFinish(name: string, r: boolean): void {}

  /**
   *
   * @param name
   * @param r
   * @returns
   */
  public static onItem(name: string, r: boolean): void {}

  /**
   *
   */
  public static run(): void {
    console.log("Inicializando testes.");

    window
      .fetch("tests.json")
      .then((r: any) => r.json())
      .then((r: object) => {
        console.log("json baixado com sucesso");
        console.log(r);

        tests.run(
          <T.TItemGroup[]>r,
          this.onItem,
          this.onGroup,
          this.onGoupFinish,
        );
      })
      .catch((r: any) => {
        console.log("Falha ao baixar json.");
      });
  }
}

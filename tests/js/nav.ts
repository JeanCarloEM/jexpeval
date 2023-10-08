import * as T from "./tdefs.js";
import { tests } from "./tests.js";

console.log("Iniciando");

/**
 *
 * @param name
 * @returns
 */
const onGroup = (name: string) => void {};

/**
 *
 * @param name
 * @param r
 * @returns
 */
const onGoupFinish = (name: string, r: boolean) => void {};

/**
 *
 * @param name
 * @param r
 * @returns
 */
const onItem = (name: string, r: boolean) => void {};

console.log('teste4');


/**
 *
 */
window.fetch("tests.json")
  .then((r: any) => r.json())
  .then((r: object) => {
    console.log("json baixado com sucesso");
    console.log(r);

    tests.run(<T.TItemGroup[]>r, onItem, onGroup, onGoupFinish);
  })
  .catch((r: any) => {
    console.log("Falha ao baixar json.");
  });

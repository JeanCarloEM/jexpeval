import { h, Component } from "preact";
import htm from "htm";
import * as TT from "../models/tester.js";

const html = htm.bind(h);

export class testGroup extends Component {
  // Initialise our state. For now we only store the input value
  constructor() {
    super();
  }

  public onInput = (ev: { target: { value: any } }) => {
    // This will schedule a state update. Once updated the component
    // will automatically re-render itself.
    this.setState({ value: ev.target.value });
  };

  public render(caption: string, status: TT.TTestResult): any {
    var stt: string = "";

    switch (status) {
      case "running":
        stt = "1";
        break;

      case true:
        stt = "2";
        break;

      case false:
        stt = "3";
        break;

      default:
        break;
    }

    return (
      <li data-ok={stt}>
        <span>{caption}</span>
      </li>
    );
  }
}

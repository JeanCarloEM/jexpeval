import { h, Component } from "preact";
import htm from "htm";

const html = htm.bind(h);

class testGroup extends Component {
  // Initialise our state. For now we only store the input value
  constructor() {
    super();
  }

  onInput = (ev: { target: { value: any } }) => {
    // This will schedule a state update. Once updated the component
    // will automatically re-render itself.
    this.setState({ value: ev.target.value });
  };

  render(caption: string, state): any {
    const stt: string = status ? "1" : "";
    return (
      <li data-ok={stt}>
        <span>{caption}</span>
      </li>
    );
  }
}

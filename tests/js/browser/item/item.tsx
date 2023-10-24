import { useEffect, useState } from "preact/hooks";
import * as TT from "../../models/tester.js";

export interface IItemViewProps {
  source: TT.TTestItemSource;
  caption?: null | string;
}

export default function ItemView({ source, caption = null }: IItemViewProps) {
  const [status, setStatus] = useState<TT.TTestResult>("not_started");
  var stt: string = "";

  useEffect(() => {
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
  }, [status]);

  return (
    <li data-ok={stt}>
      <span>{caption}</span>
    </li>
  );
}

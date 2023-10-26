import { useEffect, useState } from "preact/hooks";
import * as TT from "../../models/tester.js";

export interface IItemViewProps {
  solver: TT.TSolverCall;
  source: TT.TTestSource | TT.testSolver;
  onStatusChange?: TT.TonTestStatusChange;
}

export default function ItemView({
  solver,
  source,
  onStatusChange = undefined,
}: IItemViewProps) {
  const [status, setStatus] = useState<TT.TTestResult>("not_started");

  function onSolverChange(id: string, resp: TT.TTestResult): void {
    setStatus(resp);

    onStatusChange && onStatusChange(id, resp);
  }

  const [test] = useState<TT.testSolver>(
    Array.isArray(source)
      ? new TT.testSolver(source, solver, onSolverChange)
      : source,
  );

  const isGroup: boolean = test.isGroup();

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
    <div
      data-ok={stt}
      data-group={isGroup && "1"}
      className={`testItemView ${isGroup && "1"}`}
    >
      <label for={test.id}>
        <span>{test.title}</span>
      </label>
      {isGroup && <input type="checkbox" id={test.id}></input>}
      {isGroup && (
        <div>
          {test.map((item) => {
            <ItemView
              solver={solver}
              source={item}
              onStatusChange={onStatusChange}
            ></ItemView>;
          })}
        </div>
      )}
    </div>
  );
}

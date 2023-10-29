import { useEffect, useState } from "preact/hooks";
import * as TT from "../../models/tester.js";

export type creatorTest = (
  tests: TT.testSolver[] | TT.TTestSource,
  onStatusChange: null | TT.TonTestStatusChange,
) => TT.testSolver;

export interface IItemViewProps {
  creator?: creatorTest;
  source: TT.TTestSource | TT.testSolver;
  onStatusChange?: TT.TonTestStatusChange;
}

export default function ItemView({
  source,
  creator = undefined,
  onStatusChange = undefined,
}: IItemViewProps) {
  const [status, setStatus] = useState<TT.TTestResult>("not_started");

  function onSolverChange(
    id: string,
    resp: TT.TTestResult,
    item?: TT.ItestSolver,
  ): void {
    setStatus(resp);

    onStatusChange && onStatusChange(id, resp, item);
  }

  function _creator(): TT.testSolver {
    if (typeof source !== "object") {
      throw "[ItemView] source isn't object.";
    }

    if (Array.isArray(source)) {
      if (!creator) {
        throw "[ItemView] creator is invalid for source array.";
      }

      return creator(source, onSolverChange);
    }

    source.setOnStatusChange(onSolverChange);

    return source;
  }

  const [test] = useState<TT.testSolver>(_creator());
  const isGroup: boolean = test.isGroup();
  const hasId: boolean = test.id.trim().length > 0;

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
      className={`testItemView ${isGroup ? "testGroupView" : ""}`}
    >
      {isGroup && hasId && <input type="checkbox" id={test.id}></input>}
      {hasId && (
        <label for={test.id}>
          <span>{test.title}</span>
        </label>
      )}
      {isGroup && (
        <div class="subgroup">
          {test.map((item) => {
            return (
              <ItemView
                creator={creator}
                source={item}
                onStatusChange={onStatusChange}
              ></ItemView>
            );
          })}
        </div>
      )}
    </div>
  );
}

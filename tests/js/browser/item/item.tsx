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
  const [hasFalse, setHasFalse] = useState<Boolean>(false);
  const [status, setStatus] = useState<TT.TTestResult>("not_started");

  function onSolverChange(
    id: string,
    resp: TT.TTestResult,
    item?: TT.ItestSolver,
  ): void {
    onStatusChange && onStatusChange(id, resp, item);
    setStatus(test.status);
    setHasFalse(hasFalse || resp === false);
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

  useEffect(() => {}, [status, hasFalse]);

  return (
    <div
      data-ok={
        status === "running"
          ? "run"
          : status === true
          ? "true"
          : status === false
          ? "false"
          : ""
      }
      className={`testItemView ${isGroup ? "testGroupView" : ""} ${
        hasFalse ? "fail" : ""
      }`}
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
                onStatusChange={onSolverChange}
              ></ItemView>
            );
          })}
        </div>
      )}
    </div>
  );
}

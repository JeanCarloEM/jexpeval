import * as TT from "../../models/tester.js";
export interface IItemViewProps {
    solver: TT.TSolverCall;
    source: TT.TTestSource | TT.testSolver;
    onStatusChange?: TT.TonTestStatusChange;
}
export default function ItemView({ solver, source, onStatusChange, }: IItemViewProps): import("preact").JSX.Element;
//# sourceMappingURL=item.d.ts.map
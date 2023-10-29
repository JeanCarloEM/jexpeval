import * as TT from "../../models/tester.js";
export type creatorTest = (tests: TT.testSolver[] | TT.TTestSource, onStatusChange: null | TT.TonTestStatusChange) => TT.testSolver;
export interface IItemViewProps {
    creator?: creatorTest;
    source: TT.TTestSource | TT.testSolver;
    onStatusChange?: TT.TonTestStatusChange;
}
export default function ItemView({ source, creator, onStatusChange, }: IItemViewProps): import("preact").JSX.Element;
//# sourceMappingURL=item.d.ts.map
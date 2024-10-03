import { DragEvent, memo, HTMLAttributes, ReactElement } from "react";

interface CellProps {
  onDragOver: (e: DragEvent<HTMLTableCellElement>) => void;
  style: React.DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >["style"];
}

let i = 0;

function MemoizedCell({ onDragOver, style }: CellProps): ReactElement | null {
  i++;
  // Do not use styled-components here, but on the table component instead for performance reasons
  return <div className="cell" onDragOver={onDragOver} style={style} />;
}
setInterval(() => {
  console.log(i);
}, 1000);

export const Cell = memo(MemoizedCell, () => true);

import { DragEvent, memo, ReactElement, useCallback } from "react";
import { Cell } from "./cell";
import styled from "styled-components";
import { WindowScroller, Grid, GridCellProps } from "react-virtualized";

interface TableProps {
  width: number;
  height: number;
  rows: number;
  columns: number;
  rowsHeights: Record<number, number>;
}

function MemoizedTable({
  width,
  height,
  rows,
  columns,
  rowsHeights,
}: TableProps): ReactElement | null {
  const onDragOver = useCallback(
    (e: DragEvent<HTMLTableCellElement>) => e.preventDefault(),
    [],
  );

  const cellRenderer = useCallback(
    ({ key, style }: GridCellProps): ReactElement | null => (
      <Cell key={key} onDragOver={onDragOver} style={style} />
    ),
    [onDragOver],
  );

  return (
    <WindowScroller>
      {({ isScrolling, onChildScroll, scrollTop }) => (
        <StyledGrid
          isScrolling={isScrolling}
          onScroll={onChildScroll}
          scrollTop={scrollTop}
          cellRenderer={cellRenderer}
          columnCount={columns}
          columnWidth={40}
          height={height}
          rowCount={rows}
          rowHeight={({ index }: { index: number }) => rowsHeights[index]}
          width={width}
        />
      )}
    </WindowScroller>
  );
}

const StyledGrid = styled(Grid)`
  border: 1px solid black;
  border-width: 1px 1px 0 0;

  div.cell {
    border: 1px solid black;
    border-width: 0 0 1px 1px;
    box-sizing: border-box;
    width: 40px;
    height: 30px;
    margin: 0;
    padding: 0;
    position: relative;

    &:hover {
      background-color: lightgray;
    }
  }
`;

export const Table = memo(
  MemoizedTable,
  (p, n) =>
    p.columns === n.columns &&
    p.rows === n.rows &&
    p.rowsHeights === n.rowsHeights &&
    p.width === n.width &&
    p.height === n.height,
);

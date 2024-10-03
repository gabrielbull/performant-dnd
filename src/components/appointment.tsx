import { DragEvent, ReactElement } from "react";

interface AppointmentProps {
  end: number;
  id: number;
  index: number;
  row: number;
  start: number;
  onDragStart: (e: DragEvent<HTMLDivElement>) => void;
  onDrag: (e: DragEvent<HTMLDivElement>) => void;
}

export function Appointment({
  end,
  id,
  index,
  row,
  start,
  onDragStart,
  onDrag,
}: AppointmentProps): ReactElement | null {
  // Do not use styled-components here, but on the table component instead for performance reasons
  return (
    <div
      draggable="true"
      onDragStart={onDragStart}
      onDrag={onDrag}
      className="appointment"
      data-id={id}
      style={{
        top: `${row * 30 + index * 30}px`,
        height: "31px",
        left: `${start * 40}px`,
        width: `${(end + 1 - start) * 40 + 1}px`,
      }}
    />
  );
}

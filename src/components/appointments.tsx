import { DragEvent, ReactElement, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { Table } from "./table";
import { Appointment } from "./appointment";
import { Appointment as AppointmentType } from "../typings/appointment";
import { Item } from "../typings/item";

const rows = 100;
const columns = 400;

export function Appointments(): ReactElement | null {
  const [appointments, setAppointments] = useState<AppointmentType[]>([
    { id: 1, row: 1, start: 1, end: 1 },
    { id: 2, row: 2, start: 2, end: 4 },
    { id: 3, row: 2, start: 2, end: 4 },
  ]);

  const onDragStart = useCallback((e: DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const id = target.getAttribute("data-id");
    console.log("Dragging appointment", id);
  }, []);

  const onDrag = useCallback((e: DragEvent<HTMLDivElement>) => {
    console.log(e.clientY, e.clientX);
  }, []);

  const [rowsHeights, items] = useMemo(() => {
    const cells: Record<number, Record<number, AppointmentType[]>> = {};
    appointments.forEach((appointment) => {
      const { row, start, end } = appointment;
      for (let i = start; i <= end; i++) {
        if (!cells[row]) cells[row] = {};
        if (!cells[row][i]) cells[row][i] = [appointment];
        else cells[row][i].push(appointment);
      }
    });
    const rowsHeights = Array.from({ length: rows }, (_, i) =>
      cells[i]
        ? Math.max(...Object.values(cells[i]).map((a) => a.length)) * 30
        : 30,
    );
    const items: Item[] = appointments.map((appointment) => {
      let index = 0;
      for (let i = appointment.start; i <= appointment.end; i++) {
        index = Math.max(
          index,
          cells[appointment.row][i].findIndex((a) => a.id === appointment.id),
        );
      }
      return {
        ...appointment,
        index: index,
      };
    });
    console.log(items);
    return [rowsHeights, items];
  }, [appointments]);

  const [width, height] = useMemo(() => {
    const width = columns * 40;
    const height = rowsHeights.reduce((acc, height) => acc + height, 0);
    return [width, height];
  }, [rowsHeights]);

  return (
    <>
      <button
        onClick={() => {
          setAppointments([
            { id: 1, row: 1, start: 1, end: 1 },
            { id: 2, row: 2, start: 2, end: 4 },
            { id: 3, row: 3, start: 2, end: 4 },
          ]);
        }}
      >
        Change appointments
      </button>
      <Container width={width} height={height}>
        <Table
          width={width}
          height={height}
          rows={rows}
          columns={columns}
          rowsHeights={rowsHeights}
        />
        {items.map((item) => (
          <Appointment
            key={item.id}
            onDragStart={onDragStart}
            onDrag={onDrag}
            end={item.end}
            id={item.id}
            index={item.index}
            row={item.row}
            start={item.start}
          />
        ))}
      </Container>
    </>
  );
}

interface ContainerProps {
  width: number;
  height: number;
}

const Container = styled("div").withConfig({
  shouldForwardProp: (prop) => prop !== "width" && prop !== "height",
})<ContainerProps>`
  margin: 100px;
  position: relative;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;

  .appointment {
    position: absolute;
    background-color: lightblue;
    border: 1px solid black;
    z-index: 1;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;

import { PropsWithChildren, ReactElement } from "react";

export function DndProvider({
  children,
}: PropsWithChildren): ReactElement | null {
  return <>{children}</>;
}

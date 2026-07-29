import { UserI } from "../../../types";

export interface TopbarProps {
  title: string;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  user: UserI;
}
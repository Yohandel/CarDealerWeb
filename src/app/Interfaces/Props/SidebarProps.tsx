import { Page, Role, UserI } from "../../../types";
import type { Dispatch, SetStateAction } from "react";

export interface SidebarProps {
  page: Page;
  setPage: Dispatch<SetStateAction<Page>>

  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;

  user: UserI | null;

  onLogout: () => void;

  role: Role;
}
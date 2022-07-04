import React from "react";
import { IUser } from "./IUser";

export interface IAuthContext {
  user: IUser
  onSignOut: () => void
}

export const authContext = React.createContext<IAuthContext>({
  user: {
    name: "",
    email: "",
  },
  onSignOut: () => undefined,
})
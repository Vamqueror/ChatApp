import { createContext, FC, useContext, useEffect, useState } from "react";

const UsernameContext = createContext<string>("");
const SetUsernameContext = createContext<Function>(() => {});

export function useUsername() {
  return useContext(UsernameContext);
}

export function useSetUsername() {
  return useContext(SetUsernameContext);
}

export const UsernameProvider: FC<{ username: string; children: any }> = (
  props
) => {
  const [username, setUsername] = useState(props.username);

  return (
    <UsernameContext.Provider value={username}>
      <SetUsernameContext.Provider value={setUsername}>
        {props.children}
      </SetUsernameContext.Provider>
    </UsernameContext.Provider>
  );
};

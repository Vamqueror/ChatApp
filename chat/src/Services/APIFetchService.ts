import Group from "../classes/Group";
const PORT = 4001;
const USER_URL = `http://localhost:${PORT}/user`;

export const fetchUserData = async (username: string):Promise<{groups:Group[],username:string}> => {
  const rawResponse = await fetch(`${USER_URL}/user-data/`, {
    method: "POST",
    mode:'cors',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({username}),
  });
  return await rawResponse.json();
};

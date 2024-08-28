import { GLOBAL_URL } from "./globalUrl";

export const login = async (username, password) => {
  const data = { username, password };
  const response = await fetch(GLOBAL_URL + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include", // Ensure credentials (cookies) are included
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const logout = async () => {
  const response = await fetch(GLOBAL_URL + "logoutt", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
    credentials: "include", // Ensure credentials (cookies) are included
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

import { v4 as uuidv4 } from "uuid";

export const generateUUID = (): string => {
  const uuid = uuidv4();
  return uuid;
};

import { Item } from "../models/item";

export const items: Item[] = [];
export let nextId = 1;

export function generateId(): number {
  return nextId++;
}
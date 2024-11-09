export type CategoryTypes = "home" | "work" | "one day";
export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  category: CategoryTypes;
}

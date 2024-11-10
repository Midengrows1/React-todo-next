export type CategoryTypes = "all" | "home" | "work" | "one day";
export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  category: CategoryTypes;
}

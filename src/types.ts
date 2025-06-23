export type RecipeItem = {
  name: string;
  amount: number;
}

export type Recipe = {
  id: number,
  input: RecipeItem[],
  output: RecipeItem,
}

export interface Message {
  text: string,
  timeout: number,
  color: string,
}
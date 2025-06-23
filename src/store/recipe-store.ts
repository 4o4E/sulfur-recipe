import { defineStore } from 'pinia'
import type { Recipe } from "@/types.ts";

export const useRecipeStore = defineStore('recipe', {
  state: () => ({
    recipes: [] as Recipe[],
    rowRecipes: '',
  }),

  getters: {
    allInput(state): string[] {
      return Array.from(
        new Set(state.recipes.flatMap(recipe => recipe.input.map(item => item.name)))
      );
    },
    allOutput(state): string[] {
      return Array.from(
        new Set(state.recipes.map(recipe => recipe.output.name))
      );
    },
  },

  actions: {
    loadFromLocalStorage() {
      const row = localStorage.getItem('recipes');
      if (row) {
        try {
          this.recipes = JSON.parse(row) as Recipe[];
        } catch (e) {
          console.error('解析 recipes 失败:', e);
          this.recipes = [];
        }
      } else {
        this.recipes = [];
      }
      this.rowRecipes = localStorage.getItem('row-recipes') || '';
    },

    saveToLocalStorage() {
      localStorage.setItem('recipes', JSON.stringify(this.recipes));
      localStorage.setItem('row-recipes', this.rowRecipes);
    },

    setRecipes(newRecipes: Recipe[], rowRecipes: string) {
      this.recipes = newRecipes;
      this.rowRecipes = rowRecipes;
      this.saveToLocalStorage();
    }
  }
});
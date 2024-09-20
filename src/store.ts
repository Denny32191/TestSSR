import { defineStore } from 'pinia';
import axios from 'axios';

interface SearchResult {
  place_id: string;
  display_name: string;
}

export const useStore = defineStore('search', {
  state: () => {
    return {
      results: [] as SearchResult[],
    };
  },
  actions: {
    async fetchResults(query: string) {
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1`);
        this.results = response.data || [];
      } catch (error) {
        console.error('Ошибка при поиске:', error);
      }
    },
    clearResults() {
      this.results = [];
    }
  }
});
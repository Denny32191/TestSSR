<template>
  <div class="search-container">
    <input
      type="text"
      placeholder="Введите адрес..."
      @keyup="handleSearch"
      v-model="query"
    />
    <div v-if="loading" class="loading-indicator">Загрузка...</div> 
    <div v-if="error" class="error-message">{{ error }}</div> 
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '../store';

export default defineComponent({
  setup() {
    const query = ref('');
    const store = useStore();
    const loading = ref(false); 
    const error = ref(''); 

    const handleSearch = async () => {
      loading.value = true;
      error.value = ''; 
      
      try {
        if (query.value) {
          await store.fetchResults(query.value);
        } else {
          store.clearResults();
        }
      } catch (err) {
        error.value = 'Не удалось получить данные. Попробуйте еще раз.'; 
      } finally {
        loading.value = false; 
      }
    };

    return { query, handleSearch, loading, error };
  }
});
</script>

<style lang="scss" scoped>
.search-container {
  margin: 0 auto;
  margin-bottom: 15px; 
}

input {
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #66afe9;
    box-shadow: 0 0 5px rgba(102, 175, 233, 0.6);
    outline: none;
  }
}

.loading-indicator {
  margin-top: 10px;
  color: #007bff; 
}

.error-message {
  margin-top: 10px;
  color: red; 
}
</style>

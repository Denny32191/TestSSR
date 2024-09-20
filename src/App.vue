<template>
  <div class="app">
    <div class="search-container">
      <div>
        <SearchComponent />
      </div>
      <div>
        <ResultsList :results="results" />
      </div>
      
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from './store';
import SearchComponent from './components/SearchComponent.vue';
import ResultsList from './components/ResultsList.vue';

export default defineComponent({
  components: {
    SearchComponent,
    ResultsList
  },
  setup() {
    const store = useStore();
    const results = computed(() => store.results);
    return { results };
  }
});
</script>

<style lang="scss">
.app {
  padding: 20px;
}

.search-container {
  display: flex;
  flex-direction: column; 
}

</style>
<template>
  <div class="container">
    <ul class="results-list">
      <li v-for="item in results" :key="item.place_id">
        {{ item.display_name }}
      </li>
    </ul>
  </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  
  export default defineComponent({
    props: {
      results: {
        type: Array as PropType<Array<{ place_id: string, display_name: string }>>,
        required: true
      }
    }
  });
  </script>
  
  <style scoped>
  .container {
    width: 1000px;
    min-height: 600px;
  }
  .results-list {
    list-style-type: none;
    padding: 0;
    max-height: 300px; 
    overflow-y: auto;
  }
  li {
    margin: 5px 0;
    padding: 10px;
    border: 1px solid #ccc;
  }
  </style>
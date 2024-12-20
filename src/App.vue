<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import DynamicDialog from 'primevue/dynamicdialog';

</script>

<template>
  <div>
    <RouterView />
  	<DynamicDialog />
  </div>
</template>
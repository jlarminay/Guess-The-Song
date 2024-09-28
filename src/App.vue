<script setup lang="ts"></script>

<template>
  <div class="tw_w-full tw_max-w-[400px] tw_h-0 tw_min-h-screen tw_mx-auto">
    <router-view :key="$route.path" />
  </div>
</template>

<style scoped lang="postcss"></style>

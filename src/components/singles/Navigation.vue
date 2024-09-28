<script setup lang="ts"></script>

<template>
  <div class="tw_fixed tw_bottom-0 tw_left-0 tw_w-full tw_bg-slate-950 tw_rounded-t-lg">
    <div class="tw_flex tw_justify-around">
      <RouterLink
        v-for="(button, i) in [
          { icon: 'sym_o_grid_view', to: '/dashboard' },
          { icon: 'sym_o_queue_music', to: '/dashboard' },
          { icon: 'sym_o_person', to: '/account' },
        ]"
        :key="i"
        class="tw_w-1/3 tw_flex tw_flex-col tw_items-center tw_p-4 tw_text-white"
        :class="{ 'tw_text-[#179443]': $route.path === button.to }"
        :to="button.to"
      >
        <q-icon :name="button.icon" size="26px" class="tw_mb-1" />
      </RouterLink>
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>

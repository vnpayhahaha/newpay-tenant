<!--
 - MineAdmin is committed to providing solutions for quickly building web applications
 - Please view the LICENSE file that was distributed with this source code,
 - For the full copyright and license information.
 - Thank you very much for using MineAdmin.
 -
 - @Author X.Mo<root@imoi.cn>
 - @Link   https://github.com/mineadmin
-->
<script setup lang="tsx">
import WorkbenchFast from "./components/workbench/workbench-fast.vue";
import WorkbenchLogin from "~/base/views/welcome/components/workbench/workbench-login.vue";


defineOptions({ name: 'welcome' })
const userinfo = useUserStore().getUserInfo()

</script>

<template>
  <div class="mine-layout">
    <div class="flex justify-between bg-white p-3 dark-bg-dark-8">
      <div class="flex gap-x-5">
        <el-avatar :src="userinfo?.avatar" :size="80">
          <span v-if="!userinfo?.avatar" class="text-5xl">{{ userinfo.username[0].toUpperCase() }}</span>
        </el-avatar>
        <div class="flex flex-col justify-center gap-y-2">
          <span class="text-xl">早安，{{
            userinfo.username
          }}！</span>
        </div>
      </div>
    </div>
    <WorkbenchFast />
    <WorkbenchLogin />
  </div>
</template>

<style lang="scss" scoped>
.run-list {
  @apply b-1 b-solid b-gray-1 dark-b-dark-3 p-3 b-l-0 b-t-0 b-r-0 lg:b-r-1
  transition-all duration-300
  hover-shadow dark-hover-shadow-dark-3
  ;

  .desc {
    @apply mt-3 text-sm leading-6 dark-text-[#888] text-gray-5
  }
}

.ma-link li {
  @apply flex items-center py-1.5;
}
</style>

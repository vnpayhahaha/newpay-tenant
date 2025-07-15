<script setup lang="ts">
import type { MaProTableExpose } from '@mineadmin/pro-table'
import type { TableColumnRenderer } from '@mineadmin/table'
import type { Switch } from '../../types'

// 接收父组件传递的 props
const { data, proxy, props } = defineProps<{
  data: TableColumnRenderer
  proxy: MaProTableExpose
  props?: {
    type?: string
    props?: Switch
    prop?: string | null
    dictName?: string | ''
  }
}>()

const modelValue = computed(() => {
  return props?.prop ? data.row[props.prop] : null
})

// 统一事件处理函数
function handleEvent(eventHandlers: Record<string, (...args: any[]) => void> = {}) {
  const handlerMap = {}
  Object.keys(eventHandlers).forEach((event) => {
    handlerMap[event] = (...args: any[]) => {
      const rowData = data.row
      eventHandlers[event](...args, rowData, proxy)
    }
  })
  return handlerMap
}
</script>

<template>
  <el-switch
    v-bind="props?.props"
    v-model="modelValue"
    v-on="handleEvent(props?.props?.on)"
  />
</template>

<style scoped lang="scss">

</style>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { ElCard, ElRow, ElCol, ElStatistic, ElTooltip } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const userInfo = ref({ ...useUserStore().getUserInfo() })

interface Balances {
  income_balance_available: number
  income_balance_frozen: number
  pay_balance_available: number
  pay_balance_frozen: number
}

const balances = ref<Balances>({
  income_balance_available: 0,
  income_balance_frozen: 0,
  pay_balance_available: 0,
  pay_balance_frozen: 0,
})

// 监听 userInfo.tenant_account 变化
watch(() => userInfo.value.tenant_account, (tenantAccounts) => {
  // 重置 balances
  balances.value = {
    income_balance_available: 0,
    income_balance_frozen: 0,
    pay_balance_available: 0,
    pay_balance_frozen: 0,
  }

  // 判断 tenant_account 数组是否存在且不为空
  if (tenantAccounts && Array.isArray(tenantAccounts) && tenantAccounts.length > 0) {
    // 循环每一项，根据 account_type 赋值
    tenantAccounts.forEach((account) => {
      if (account.account_type === 1) { // 收款账户
        balances.value.income_balance_available = Number(account.balance_available || 0)
        balances.value.income_balance_frozen = Number(account.balance_frozen || 0)
      } else if (account.account_type === 2) { // 付款账户
        balances.value.pay_balance_available = Number(account.balance_available || 0)
        balances.value.pay_balance_frozen = Number(account.balance_frozen || 0)
      }
    })
  }
}, { immediate: true })

function formatCurrency(value: number): string {
  if (value === 0) {
    return '0'
  }
  return new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: 2
  }).format(value)
}

onMounted(() => {
  // memberUserAccount.statistics().then((res) => {
  //   balances.value = res.data
  // })
})
</script>

<template>
  <div class="mine-card">
    <ElRow :gutter="10">
      <ElCol :span="12">
        <ElCard shadow="hover" class="custom-card" :body-style="{ padding: 0, height: '65px' }">
          <div class="h-full flex justify-between">
            <ElTooltip class="item" effect="dark" :content="t('balance.tooltip.income')" placement="bottom-start">
              <div class="en-title bg-blue-600">{{ t('balance.income') }}</div>
            </ElTooltip>
            <div class="h-full w-full">
              <ElRow class="h-full">
                <ElCol :span="12" class="h-full">
                  <div class="h-full flex items-center justify-center">
                    <ElStatistic
                      group-separator=","
                      :precision="2"
                      :value="balances.income_balance_available"
                      :title="t('balance.available_balance')"
                    />
                  </div>
                </ElCol>
                <ElCol :span="12" class="h-full">
                  <div class="h-full flex items-center justify-center">
                    <ElStatistic
                      group-separator=","
                      :precision="2"
                      :value="balances.income_balance_frozen"
                      :title="t('balance.frozen_balance')"
                    />
                  </div>
                </ElCol>
              </ElRow>
            </div>
          </div>
        </ElCard>
      </ElCol>
      <ElCol :span="12">
        <ElCard shadow="hover" class="custom-card" :body-style="{ padding: 0, height: '65px' }">
          <div class="h-full flex justify-between">
            <ElTooltip class="item" effect="dark" :content="t('balance.tooltip.payment')" placement="bottom-start">
              <div class="en-title bg-red-600">{{ t('balance.payment') }}</div>
            </ElTooltip>
            <div class="h-full w-full">
              <ElRow class="h-full">
                <ElCol :span="12" class="h-full">
                  <div class="h-full flex items-center justify-center">
                    <ElStatistic
                      group-separator=","
                      :precision="2"
                      :value="balances.pay_balance_available"
                      :title="t('balance.available_balance')"
                    />
                  </div>
                </ElCol>
                <ElCol :span="12" class="h-full">
                  <div class="h-full flex items-center justify-center">
                    <ElStatistic
                      group-separator=","
                      :precision="2"
                      :value="balances.pay_balance_frozen"
                      :title="t('balance.frozen_balance')"
                    />
                  </div>
                </ElCol>
              </ElRow>
            </div>
          </div>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<style scoped>
.custom-card {
  border-radius: 0.25rem;
  height: 65px;
}

.en-title {
  width: 75px;
  color: #fff;
  text-align: center;
  line-height: 65px;
  font-weight: bold;
  font-size: 1.3em;
  border-radius: 2px 0 0 2px;
}
</style>
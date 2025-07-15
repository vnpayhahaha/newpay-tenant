/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo<root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */
import type { MaProTableColumns, MaProTableExpose } from '@mineadmin/pro-table'
import type { ChannelAccountDailyStatsVo } from '~/channel/api/ChannelAccountDailyStats.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/channel/api/ChannelAccountDailyStats.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: ChannelAccountDailyStatsVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
    { label: () => t('ChannelAccountDailyStats.channel_account_id'), prop: 'channel_account_id' },
    { label: () => t('ChannelAccountDailyStats.bank_account_id'), prop: 'bank_account_id' },
    { label: () => t('ChannelAccountDailyStats.channel_id'), prop: 'channel_id' },
    { label: () => t('ChannelAccountDailyStats.stat_date'), prop: 'stat_date' },
    { label: () => t('ChannelAccountDailyStats.transaction_count'), prop: 'transaction_count' },
    { label: () => t('ChannelAccountDailyStats.success_count'), prop: 'success_count' },
    { label: () => t('ChannelAccountDailyStats.failure_count'), prop: 'failure_count' },
    { label: () => t('ChannelAccountDailyStats.receipt_amount'), prop: 'receipt_amount' },
    { label: () => t('ChannelAccountDailyStats.payment_amount'), prop: 'payment_amount' },
    { label: () => `${t('ChannelAccountDailyStats.success_rate')}(%)`, prop: 'success_rate' },
    { label: () => `${t('ChannelAccountDailyStats.avg_process_time')}(ms)`, prop: 'avg_process_time' },
    { label: () => t('ChannelAccountDailyStats.limit_status'), prop: 'limit_status' },
    { label: () => t('ChannelAccountDailyStats.created_at'), prop: 'created_at', width: '180px', hide: true },
    { label: () => t('ChannelAccountDailyStats.updated_at'), prop: 'updated_at', width: '180px', hide: true },

    // 操作列
    {
      type: 'operation',
      label: () => t('crud.operation'),
      width: '260px',
      operationConfigure: {
        type: 'tile',
        actions: [
          {
            name: 'edit',
            icon: 'i-heroicons:pencil',
            show: ({ row }) => showBtn('channel:channel_account_daily_stats:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('channel:channel_account_daily_stats:delete', row),
            icon: 'i-heroicons:trash',
            text: () => t('crud.delete'),
            onClick: ({ row }, proxy: MaProTableExpose) => {
              msg.delConfirm(t('crud.delDataMessage')).then(async () => {
                const response = await deleteByIds([row.id])
                if (response.code === ResultCode.SUCCESS) {
                  msg.success(t('crud.delSuccess'))
                  await proxy.refresh()
                }
              })
            },
          },
        ],
      },
    },
  ]
}

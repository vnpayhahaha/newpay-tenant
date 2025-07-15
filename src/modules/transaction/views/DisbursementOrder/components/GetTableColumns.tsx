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
import type { DisbursementOrderVo } from '~/transaction/api/DisbursementOrder.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/transaction/api/DisbursementOrder.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: DisbursementOrderVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
    { label: () => t('disbursement_order.platform_order_no'), prop: 'platform_order_no' },
    { label: () => t('disbursement_order.merchant_order_no'), prop: 'merchant_order_no' },
    { label: () => t('disbursement_order.upstream_order_no'), prop: 'upstream_order_no' },
    { label: () => t('disbursement_order.pay_time'), prop: 'pay_time' },
    { label: () => t('disbursement_order.order_source'), prop: 'order_source' },
    { label: () => t('disbursement_order.disbursement_channel_id'), prop: 'disbursement_channel_id' },
    { label: () => t('disbursement_order.disbursement_bank_id'), prop: 'disbursement_bank_id' },
    { label: () => t('disbursement_order.amount'), prop: 'amount' },
    { label: () => t('disbursement_order.paid_amount'), prop: 'paid_amount' },
    { label: () => t('disbursement_order.fixed_fee'), prop: 'fixed_fee' },
    { label: () => t('disbursement_order.rate_fee'), prop: 'rate_fee' },
    { label: () => t('disbursement_order.total_fee'), prop: 'total_fee' },
    { label: () => t('disbursement_order.settlement_amount'), prop: 'settlement_amount' },
    { label: () => t('disbursement_order.upstream_fee'), prop: 'upstream_fee' },
    { label: () => t('disbursement_order.upstream_settlement_amount'), prop: 'upstream_settlement_amount' },
    { label: () => t('disbursement_order.payment_type'), prop: 'payment_type' },
    { label: () => t('disbursement_order.payee_bank_name'), prop: 'payee_bank_name' },
    { label: () => t('disbursement_order.payee_bank_code'), prop: 'payee_bank_code' },
    { label: () => t('disbursement_order.payee_account_name'), prop: 'payee_account_name' },
    { label: () => t('disbursement_order.payee_account_no'), prop: 'payee_account_no' },
    { label: () => t('disbursement_order.payee_upi'), prop: 'payee_upi' },
    { label: () => t('disbursement_order.utr'), prop: 'utr' },
    { label: () => t('disbursement_order.tenant_id'), prop: 'tenant_id' },
    { label: () => t('disbursement_order.app_id'), prop: 'app_id' },
    { label: () => t('disbursement_order.description'), prop: 'description' },
    { label: () => t('disbursement_order.status'), prop: 'status' },
    { label: () => t('disbursement_order.expire_time'), prop: 'expire_time' },
    { label: () => t('disbursement_order.callback_url'), prop: 'callback_url' },
    { label: () => t('disbursement_order.callback_count'), prop: 'callback_count' },
    { label: () => t('disbursement_order.notify_status'), prop: 'notify_status' },
    { label: () => t('disbursement_order.channel_transaction_no'), prop: 'channel_transaction_no' },
    { label: () => t('disbursement_order.error_code'), prop: 'error_code' },
    { label: () => t('disbursement_order.error_message'), prop: 'error_message' },
    { label: () => t('disbursement_order.request_id'), prop: 'request_id' },
    { label: () => t('disbursement_order.created_at'), prop: 'created_at' },

    // 操作列
    {
      type: 'operation',
      label: () => t('crud.operation'),
      width: '160px',
      operationConfigure: {
        type: 'tile',
        actions: [
          {
            name: 'edit',
            icon: 'i-heroicons:pencil',
            show: ({ row }) => showBtn('transaction:disbursement_order:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('transaction:disbursement_order:delete', row),
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

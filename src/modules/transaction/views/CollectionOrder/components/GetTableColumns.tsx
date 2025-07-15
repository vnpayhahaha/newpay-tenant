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
import type { CollectionOrderVo } from '~/transaction/api/CollectionOrder.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/transaction/api/CollectionOrder.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: CollectionOrderVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
    { label: () => t('collection_order.platform_order_no'), prop: 'platform_order_no' },
    { label: () => t('collection_order.merchant_order_no'), prop: 'merchant_order_no' },
    { label: () => t('collection_order.upstream_order_no'), prop: 'upstream_order_no' },
    { label: () => t('collection_order.amount'), prop: 'amount' },
    { label: () => t('collection_order.payable_amount'), prop: 'payable_amount' },
    { label: () => t('collection_order.paid_amount'), prop: 'paid_amount' },
    { label: () => t('collection_order.fixed_fee'), prop: 'fixed_fee' },
    { label: () => t('collection_order.rate_fee'), prop: 'rate_fee' },
    { label: () => t('collection_order.total_fee'), prop: 'total_fee' },
    { label: () => t('collection_order.upstream_fee'), prop: 'upstream_fee' },
    { label: () => t('collection_order.upstream_settlement_amount'), prop: 'upstream_settlement_amount' },
    { label: () => t('collection_order.settlement_amount'), prop: 'settlement_amount' },
    { label: () => t('collection_order.settlement_type'), prop: 'settlement_type' },
    { label: () => t('collection_order.collection_type'), prop: 'collection_type' },
    { label: () => t('collection_order.collection_channel_id'), prop: 'collection_channel_id' },
    { label: () => t('collection_order.pay_time'), prop: 'pay_time' },
    { label: () => t('collection_order.expire_time'), prop: 'expire_time' },
    { label: () => t('collection_order.order_source'), prop: 'order_source' },
    { label: () => t('collection_order.recon_type'), prop: 'recon_type' },
    { label: () => t('collection_order.callback_url'), prop: 'callback_url' },
    { label: () => t('collection_order.callback_count'), prop: 'callback_count' },
    { label: () => t('collection_order.notify_status'), prop: 'notify_status' },
    { label: () => t('collection_order.checkout_url'), prop: 'checkout_url' },
    { label: () => t('collection_order.return_url'), prop: 'return_url' },
    { label: () => t('collection_order.tenant_id'), prop: 'tenant_id' },
    { label: () => t('collection_order.app_id'), prop: 'app_id' },
    { label: () => t('collection_order.payer_name'), prop: 'payer_name' },
    { label: () => t('collection_order.payer_account'), prop: 'payer_account' },
    { label: () => t('collection_order.payer_bank'), prop: 'payer_bank' },
    { label: () => t('collection_order.payer_ifsc'), prop: 'payer_ifsc' },
    { label: () => t('collection_order.payer_upi'), prop: 'payer_upi' },
    { label: () => t('collection_order.description'), prop: 'description' },
    { label: () => t('collection_order.status'), prop: 'status' },
    { label: () => t('collection_order.channel_transaction_no'), prop: 'channel_transaction_no' },
    { label: () => t('collection_order.error_code'), prop: 'error_code' },
    { label: () => t('collection_order.error_message'), prop: 'error_message' },
    { label: () => t('collection_order.request_id'), prop: 'request_id' },
    { label: () => t('collection_order.created_at'), prop: 'created_at' },
    { label: () => t('collection_order.updated_at'), prop: 'updated_at' },
    { label: () => t('collection_order.payment_proof_photo'), prop: 'payment_proof_photo' },
    { label: () => t('collection_order.platform_transaction_no'), prop: 'platform_transaction_no' },
    { label: () => t('collection_order.utr'), prop: 'utr' },
    { label: () => t('collection_order.customer_submitted_utr'), prop: 'customer_submitted_utr' },

    // 操作列
    {
      type: 'operation',
      label: () => t('crud.operation'),
      width: '160px',
      fixed: 'right',
      operationConfigure: {
        type: 'tile',
        actions: [
          {
            name: 'edit',
            icon: 'i-heroicons:pencil',
            show: ({ row }) => showBtn('transaction:collection_order:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('transaction:collection_order:delete', row),
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

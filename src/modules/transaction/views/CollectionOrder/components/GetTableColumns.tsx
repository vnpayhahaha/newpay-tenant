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
import { cancel } from '~/transaction/api/CollectionOrder.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'
import MaCopy from '@/components/ma-copy/index.vue'
import tool from '@/utils/tool.ts'
import { selectStatus } from '@/modules/Common'

import { trim } from 'lodash-es'

export default function getTableColumns(
  dialog: UseDialogExpose,
  formRef: any,
  t: any,
): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: CollectionOrderVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    {
      type: 'selection',
      showOverflowTooltip: false,
      label: () => t('crud.selection'),
    },
    // 索引序号列
    { type: 'index' },
    // 普通列
    {
      label: () => t('collection_order.channel'),
      prop: 'channel',
      width: 220,
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <el-avatar shape="square" src={row.channel.channel_icon} />
            <div class="ml-5" style={{ flex: 1, minWidth: 0 }}>
              <p>
                <el-text class="mx-1" type="primary">
                  {row.channel.channel_code}
                </el-text>
              </p>
              <p>
                <el-text class="mx-1" truncated>
                  {row.channel.channel_name}
                </el-text>
              </p>
              {row.bank_account?.branch_name && (
                <p>
                  <el-text class="mx-1" truncated>
                    {row.bank_account?.branch_name}
                  </el-text>
                </p>
              )}
              {row.channel_account?.merchant_id && (
                <p>
                  <el-text class="mx-1" truncated>
                    {row.channel_account?.merchant_id}
                  </el-text>
                </p>
              )}
            </div>
          </div>
        )
      },
    },
    {
      label: () => t('collection_order.branch_name'),
      prop: 'branch_name',
      width: '120px',
      hide: true,
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {row.bank_account?.branch_name && (
              <p>
                <el-text class="mx-1" truncated>
                  {row.bank_account?.branch_name}
                </el-text>
              </p>
            )}
          </div>
        )
      },
    },
    {
      label: () => t('collection_order.collection_type'),
      prop: 'collection_type',
      minWidth: '120px',
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          api: () =>
            new Promise(resolve =>
              resolve(selectStatus('collection_order', 'collection_type_list')),
            ),
          dataHandle: (response: any) => {
            return response.data?.map((item: Common.StatusOptionItem) => {
              return { label: `${item.label}`, value: item.value }
            })
          },
          props: {
            effect: 'dark',
          },
        },
      },
    },
    {
      label: () => t('collection_order.order_no'),
      prop: 'platform_order_no',
      type: 'merge',
      minWidth: '260px',
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>
                {t('collection_order.platform_order_no')}
                :
              </p>
              <p class="ml-2">
                <MaCopy class="color-blue" content={row.platform_order_no} />
              </p>
              <p>
                {t('collection_order.tenant_order_no')}
                :
              </p>
              <p class="ml-2">
                <MaCopy class="color-green" content={row.tenant_order_no} />
              </p>
              <p>
                {t('collection_order.upstream_order_no')}
                :
              </p>
              <p class="ml-2">
                <MaCopy class="color-red" content={row.upstream_order_no} />
              </p>
            </div>
          </div>
        )
      },
    },
    {
      label: () => t('collection_order.platform_order_no'),
      prop: 'platform_order_no',
      minWidth: '260px',
      hide: true,
    },
    {
      label: () => t('collection_order.tenant_order_no'),
      prop: 'tenant_order_no',
      minWidth: '220px',
      hide: true,
    },
    {
      label: () => t('collection_order.upstream_order_no'),
      prop: 'upstream_order_no',
      minWidth: '220px',
      hide: true,
    },
    {
      label: () => t('collection_order.status'),
      prop: 'status',
      minWidth: 100,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          api: () =>
            new Promise(resolve =>
              resolve(selectStatus('collection_order', 'status_list')),
            ),
          dataHandle: (response: any) => {
            return response.data?.map((item: Common.StatusOptionItem) => {
              if (item.value === 20) {
                return {
                  label: `${item.label}`,
                  value: item.value,
                  color: 'success',
                }
              }
              return { label: `${item.label}`, value: item.value }
            })
          },
          props: {
            effect: 'dark',
          },
        },
      },
    },
    {
      label: () => t('collection_order.amount_info'),
      prop: 'amount',
      type: 'merge',
      minWidth: '180px',
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>
                {t('collection_order.amount')}
                :
                {' '}
                <MaCopy
                  class="color-blue"
                  content={tool.formatMoney(row.amount)}
                />
              </p>
              <p>
                {t('collection_order.payable_amount')}
                :
                {' '}
                <MaCopy
                  class="color-green"
                  content={tool.formatMoney(row.payable_amount)}
                />
              </p>
              <p>
                {t('collection_order.paid_amount')}
                :
                {' '}
                <MaCopy
                  class="color-red"
                  content={tool.formatMoney(row.paid_amount)}
                />
              </p>
            </div>
          </div>
        )
      },
    },
    {
      label: () => t('collection_order.amount'),
      prop: 'amount',
      minWidth: '120px',
      hide: true,
    },
    {
      label: () => t('collection_order.payable_amount'),
      prop: 'payable_amount',
      minWidth: '120px',
      hide: true,
    },
    {
      label: () => t('collection_order.paid_amount'),
      prop: 'paid_amount',
      minWidth: '120px',
      hide: true,
    },
    {
      label: () => t('collection_order.fee'),
      prop: 'fee',
      minWidth: '220px',
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>
                {t('collection_order.fixed_fee')}
                :
                {' '}
                <MaCopy content={tool.formatMoney(row.fixed_fee)} />
              </p>
              <p>
                {t('collection_order.rate_fee')}
                :
                {' '}
                <MaCopy content={`${tool.formatMoney(row.rate_fee)}%`} />
                {' '}
                *
                {' '}
                <MaCopy
                  class="color-red"
                  content={tool.formatMoney(row.amount)}
                />
              </p>
              <p>
                {t('collection_order.total_fee')}
                :
                {' '}
                <MaCopy
                  class="color-blue"
                  content={tool.formatMoney(row.total_fee)}
                />
              </p>
            </div>
          </div>
        )
      },
    },
    {
      label: () => t('collection_order.fixed_fee'),
      prop: 'fixed_fee',
      width: '120px',
      hide: true,
    },
    {
      label: () => t('collection_order.rate_fee'),
      prop: 'rate_fee',
      width: '120px',
      hide: true,
    },
    {
      label: () => t('collection_order.total_fee'),
      prop: 'total_fee',
      width: '120px',
      hide: true,
    },
    {
      label: () => t('collection_order.settlement_type'),
      prop: 'settlement_type',
      minWidth: '120px',
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          api: () =>
            new Promise(resolve =>
              resolve(selectStatus('collection_order', 'settlement_type_list')),
            ),
          dataHandle: (response: any) => {
            return response.data?.map((item: Common.StatusOptionItem) => {
              return { label: `${item.label}`, value: item.value }
            })
          },
          props: {
            effect: 'dark',
          },
        },
      },
    },
    {
      label: () => t('collection_order.settlement_amount'),
      prop: 'settlement_amount',
      minWidth: '120px',
      cellRender: ({ row }) => {
        return tool.formatMoney(row.settlement_amount)
      },
    },
    {
      label: () => t('collection_order.upstream_settlement_info'),
      prop: 'upstream_settlement_info',
      minWidth: '120px',
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>
                <MaCopy
                  content={tool.formatMoney(row.upstream_settlement_amount)}
                />
              </p>
              {row.upstream_fee && (
                <p>
                  (
                  {t('collection_order.fee')}
                  :
                  {tool.formatMoney(row.upstream_fee)}
                  )
                </p>
              )}
            </div>
          </div>
        )
      },
    },
    {
      label: () => t('collection_order.upstream_settlement_amount'),
      prop: 'upstream_settlement_amount',
      width: '120px',
      hide: true,
    },
    {
      label: () => t('collection_order.upstream_fee'),
      prop: 'upstream_fee',
      width: '120px',
      hide: true,
    },
    {
      label: () => t('collection_order.paid_info'),
      prop: 'paid_info',
      minWidth: '180px',
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>{row.pay_time}</p>
              {trim(row.utr) !== '' && (
                <p>
                  UTR:
                  {' '}
                  <MaCopy content={row.utr} class="color-blue" />
                </p>
              )}
            </div>
          </div>
        )
      },
    },
    {
      label: () => t('collection_order.pay_time'),
      prop: 'pay_time',
      width: '180px',
      hide: true,
    },
    {
      label: () => t('collection_order.utr'),
      prop: 'utr',
      minWidth: 120,
      hide: true,
    },
    {
      label: () => t('collection_order.cancel_info'),
      prop: 'cancel_info',
      minWidth: '180px',
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>{row.cancelled_at}</p>
              {row.cancel_operator?.id && (
                <p>
                  {row.cancel_operator?.nickname}
                  :
                  {' '}
                  <MaCopy
                    content={row.cancel_operator?.username}
                    class="color-blue"
                  />
                </p>
              )}
            </div>
          </div>
        )
      },
    },
    {
      label: () => t('collection_order.cancelled_at'),
      prop: 'cancelled_at',
      width: '180px',
      hide: true,
    },
    {
      label: () => t('collection_order.cancelled_by'),
      prop: 'cancelled_by',
      minWidth: 100,
      hide: true,
    },
    {
      label: () => t('collection_order.customer_submitted_utr'),
      prop: 'customer_submitted_utr',
      minWidth: 120,
    },
    {
      label: () => t('collection_order.expire_time'),
      prop: 'expire_time',
      width: '190px',
    },
    {
      label: () => t('collection_order.order_source'),
      prop: 'order_source',
      width: '180px',
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>
                <MaCopy content={row.created_at} class="color-blue" />
              </p>
              <p>
                <MaCopy content={row.order_source} />
              </p>
              <p>
                <MaCopy content={row.tenant_id} />
              </p>
            </div>
          </div>
        )
      },
    },
    {
      label: () => t('collection_order.tenant_id'),
      prop: 'tenant_id',
      width: 100,
      hide: true,
    },
    {
      label: () => t('collection_order.app_id'),
      prop: 'app_id',
      width: 100,
      hide: true,
    },
    {
      label: () => t('collection_order.recon_type'),
      prop: 'recon_type',
      minWidth: '120px',
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          api: () =>
            new Promise(resolve =>
              resolve(selectStatus('collection_order', 'recon_type_list')),
            ),
          dataHandle: (response: any) => {
            return response.data?.map((item: Common.StatusOptionItem) => {
              return { label: `${item.label}`, value: item.value }
            })
          },
          props: {
            effect: 'dark',
          },
        },
      },
    },
    {
      label: () => t('collection_order.notify_url'),
      prop: 'notify_url',
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t('collection_order.notify_count'),
      prop: 'notify_count',
      width: 100,
    },
    {
      label: () => t('collection_order.notify_status'),
      prop: 'notify_status',
      minWidth: '120px',
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'tag',
          api: () =>
            new Promise(resolve =>
              resolve(selectStatus('collection_order', 'notify_status_list')),
            ),
          dataHandle: (response: any) => {
            return response.data?.map((item: Common.StatusOptionItem) => {
              return { label: `${item.label}`, value: item.value }
            })
          },
          props: {
            effect: 'dark',
          },
        },
      },
    },
    {
      label: () => t('collection_order.pay_url'),
      prop: 'pay_url',
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t('collection_order.return_url'),
      prop: 'return_url',
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t('collection_order.payer_info'),
      prop: 'payer_info',
      minWidth: 240,
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p>
                {t('collection_order.payer_name')}
                :
                {' '}
                <MaCopy content={row.payer_name} />
              </p>
              <p>
                {t('collection_order.payer_account')}
                :
                {' '}
                <MaCopy content={row.payer_account} />
              </p>
              <p>
                {t('collection_order.payer_bank')}
                :
                {' '}
                <MaCopy content={row.payer_bank} />
              </p>
              <p>
                {t('collection_order.payer_ifsc')}
                :
                {' '}
                <MaCopy content={row.payer_ifsc} />
              </p>
              <p>
                {t('collection_order.payer_upi')}
                :
                {' '}
                <MaCopy content={row.payer_upi} />
              </p>
            </div>
          </div>
        )
      },
    },
    {
      label: () => t('collection_order.payer_name'),
      prop: 'payer_name',
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t('collection_order.payer_account'),
      prop: 'payer_account',
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t('collection_order.payer_bank'),
      prop: 'payer_bank',
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t('collection_order.payer_ifsc'),
      prop: 'payer_ifsc',
      minWidth: 100,
      hide: true,
    },
    {
      label: () => t('collection_order.payer_upi'),
      prop: 'payer_upi',
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t('collection_order.description'),
      prop: 'description',
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t('collection_order.channel_transaction_no'),
      prop: 'channel_transaction_no',
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t('collection_order.error_code'),
      prop: 'error_code',
      minWidth: 100,
      hide: true,
    },
    {
      label: () => t('collection_order.error_message'),
      prop: 'error_message',
      minWidth: 150,
      hide: true,
    },
    {
      label: () => t('collection_order.request_id'),
      prop: 'request_id',
      minWidth: 200,
      hide: true,
    },
    {
      label: () => t('collection_order.created_at'),
      prop: 'created_at',
      minWidth: 180,
      hide: true,
    },
    {
      label: () => t('collection_order.updated_at'),
      prop: 'updated_at',
      minWidth: 180,
      hide: true,
    },
    {
      label: () => t('collection_order.payment_proof_photo'),
      prop: 'payment_proof_photo',
      width: 120,
      cellRender: ({ row }) => {
        return (
          <div
            class="text-align-left"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <el-avatar shape="square" size={80} src={row.payment_proof_photo} />
          </div>
        )
      },
    },
    {
      label: () => t('collection_order.platform_transaction_no'),
      prop: 'platform_transaction_no',
      minWidth: 220,
    },
    // 操作列
    {
      type: 'operation',
      label: () => t('crud.operation'),
      width: '200px',
      fixed: 'right',
      operationConfigure: {
        type: 'tile',
        actions: [
          {
            name: 'submitted_utr',
            icon: 'i-tabler:square-rounded-letter-u',
            show: ({ row }) =>
              showBtn('transaction:collection_order:update', row),
            disabled: ({ row }) => (row.status > 10 && row.status !== 43) || trim(row.customer_submitted_utr) !== '',
            text: () => t('collection_order.submitted_utr'),
            onClick: ({ row }) => {
              dialog.setTitle(t('collection_order.submitted_utr'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'cancel',
            show: ({ row }) =>
              showBtn('transaction:collection_order:update', row),
            disabled: ({ row }) => row.status > 10,
            icon: 'i-material-symbols:cancel-outline-rounded',
            text: () => t('crud.cancel'),
            onClick: ({ row }, proxy: MaProTableExpose) => {
              msg.delConfirm(t('crud.cancelDataMessage')).then(async () => {
                const response = await cancel([row.id])
                if (response.code === ResultCode.SUCCESS) {
                  msg.success(t('crud.cancelSuccess'))
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

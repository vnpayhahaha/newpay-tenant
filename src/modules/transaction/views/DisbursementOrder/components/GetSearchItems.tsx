/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo <root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */

import type { MaSearchItem } from '@mineadmin/search'

export default function getSearchItems(t: any): MaSearchItem[] {
  return [
    {
      label: () => t('disbursement_order.platform_order_no'),
      prop: 'platform_order_no',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('disbursement_order.platform_order_no'),
      },
    },
    {
      label: () => t('disbursement_order.merchant_order_no'),
      prop: 'merchant_order_no',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('disbursement_order.merchant_order_no'),
      },
    },
    {
      label: () => t('disbursement_order.upstream_order_no'),
      prop: 'upstream_order_no',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('disbursement_order.upstream_order_no'),
      },
    },
    {
      label: () => t('disbursement_order.pay_time'),
      prop: 'pay_time',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('disbursement_order.pay_time'),
      },
    },
    {
      label: () => t('disbursement_order.order_source'),
      prop: 'order_source',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('disbursement_order.order_source'),
      },
    },
    {
      label: () => t('disbursement_order.disbursement_channel_id'),
      prop: 'disbursement_channel_id',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('disbursement_order.disbursement_channel_id'),
      },
    },
    {
      label: () => t('disbursement_order.disbursement_bank_id'),
      prop: 'disbursement_bank_id',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('disbursement_order.disbursement_bank_id'),
      },
    },
    {
      label: () => t('disbursement_order.payment_type'),
      prop: 'payment_type',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('disbursement_order.payment_type'),
      },
    },
    {
      label: () => t('disbursement_order.payee_bank_name'),
      prop: 'payee_bank_name',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('disbursement_order.payee_bank_name'),
      },
    },
    {
      label: () => t('disbursement_order.payee_bank_code'),
      prop: 'payee_bank_code',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('disbursement_order.payee_bank_code'),
      },
    },
    {
      label: () => t('disbursement_order.payee_account_name'),
      prop: 'payee_account_name',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('disbursement_order.payee_account_name'),
      },
    },
    {
      label: () => t('disbursement_order.payee_account_no'),
      prop: 'payee_account_no',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('disbursement_order.payee_account_no'),
      },
    },
    {
      label: () => t('disbursement_order.payee_upi'),
      prop: 'payee_upi',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('disbursement_order.payee_upi'),
      },
    },
    {
      label: () => t('disbursement_order.utr'),
      prop: 'utr',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('disbursement_order.utr'),
      },
    },
    {
      label: () => t('disbursement_order.tenant_id'),
      prop: 'tenant_id',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('disbursement_order.tenant_id'),
      },
    },
    {
      label: () => t('disbursement_order.app_id'),
      prop: 'app_id',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('disbursement_order.app_id'),
      },
    },
    {
      label: () => t('disbursement_order.status'),
      prop: 'status',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('disbursement_order.status'),
      },
    },
    {
      label: () => t('disbursement_order.expire_time'),
      prop: 'expire_time',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('disbursement_order.expire_time'),
      },
    },
    {
      label: () => t('disbursement_order.notify_status'),
      prop: 'notify_status',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('disbursement_order.notify_status'),
      },
    },
    {
      label: () => t('disbursement_order.channel_transaction_no'),
      prop: 'channel_transaction_no',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('disbursement_order.channel_transaction_no'),
      },
    },
    {
      label: () => t('disbursement_order.request_id'),
      prop: 'request_id',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('disbursement_order.request_id'),
      },
    },
  ]
}

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
      label: () => t('collection_order.platform_order_no'),
      prop: 'platform_order_no',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('collection_order.platform_order_no'),
      },
    },
    {
      label: () => t('collection_order.merchant_order_no'),
      prop: 'merchant_order_no',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('collection_order.merchant_order_no'),
      },
    },
    {
      label: () => t('collection_order.upstream_order_no'),
      prop: 'upstream_order_no',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('collection_order.upstream_order_no'),
      },
    },
    {
      label: () => t('collection_order.settlement_type'),
      prop: 'settlement_type',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('collection_order.settlement_type'),
      },
    },
    {
      label: () => t('collection_order.collection_type'),
      prop: 'collection_type',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('collection_order.collection_type'),
      },
    },
    {
      label: () => t('collection_order.collection_channel_id'),
      prop: 'collection_channel_id',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('collection_order.collection_channel_id'),
      },
    },
    {
      label: () => t('collection_order.pay_time'),
      prop: 'pay_time',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('collection_order.pay_time'),
      },
    },
    {
      label: () => t('collection_order.expire_time'),
      prop: 'expire_time',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('collection_order.expire_time'),
      },
    },
    {
      label: () => t('collection_order.order_source'),
      prop: 'order_source',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('collection_order.order_source'),
      },
    },
    {
      label: () => t('collection_order.recon_type'),
      prop: 'recon_type',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('collection_order.recon_type'),
      },
    },
    {
      label: () => t('collection_order.notify_status'),
      prop: 'notify_status',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('collection_order.notify_status'),
      },
    },
    {
      label: () => t('collection_order.tenant_id'),
      prop: 'tenant_id',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('collection_order.tenant_id'),
      },
    },
    {
      label: () => t('collection_order.app_id'),
      prop: 'app_id',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('collection_order.app_id'),
      },
    },
    {
      label: () => t('collection_order.payer_name'),
      prop: 'payer_name',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('collection_order.payer_name'),
      },
    },
    {
      label: () => t('collection_order.payer_account'),
      prop: 'payer_account',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('collection_order.payer_account'),
      },
    },
    {
      label: () => t('collection_order.payer_bank'),
      prop: 'payer_bank',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('collection_order.payer_bank'),
      },
    },
    {
      label: () => t('collection_order.payer_ifsc'),
      prop: 'payer_ifsc',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('collection_order.payer_ifsc'),
      },
    },
    {
      label: () => t('collection_order.payer_upi'),
      prop: 'payer_upi',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('collection_order.payer_upi'),
      },
    },
    {
      label: () => t('collection_order.status'),
      prop: 'status',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('collection_order.status'),
      },
    },
    {
      label: () => t('collection_order.channel_transaction_no'),
      prop: 'channel_transaction_no',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('collection_order.channel_transaction_no'),
      },
    },
    {
      label: () => t('collection_order.request_id'),
      prop: 'request_id',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('collection_order.request_id'),
      },
    },
    {
      label: () => t('collection_order.platform_transaction_no'),
      prop: 'platform_transaction_no',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('collection_order.platform_transaction_no'),
      },
    },
    {
      label: () => t('collection_order.utr'),
      prop: 'utr',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('collection_order.utr'),
      },
    },
    {
      label: () => t('collection_order.customer_submitted_utr'),
      prop: 'customer_submitted_utr',
      render: () => <el-input />,
      renderProps: {
        placeholder: t('collection_order.customer_submitted_utr'),
      },
    },
  ]
}

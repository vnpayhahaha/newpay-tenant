/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo<root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */
import type { MaFormItem } from '@mineadmin/form'
import type { CollectionOrderVo } from '~/transaction/api/CollectionOrder.ts'
import useUserStore from '@/store/modules/useUserStore.ts'
import { min } from 'lodash-es'

const userStore = useUserStore()
export default function getFormItems(formType: 'add' | 'edit' = 'add', t: any, model: CollectionOrderVo): MaFormItem[] {
  // 新增默认值
  if (formType === 'add') {
    model.tenant_id = userStore.getUserInfo().tenant_id
    return [
      {
        label: t('collection_order.tenant_order_no'),
        prop: 'tenant_order_no',
        itemProps: {
          required: true,
        },
        render: () => <el-input />,
        renderProps: {
          placeholder: t('collection_order.tenant_order_no'),
          clearable: true,
        },
      },
      {
        label: t('collection_order.amount'),
        prop: 'amount',
        itemProps: {
          required: true,
        },
        render: () => <el-input-number />,
        renderProps: {
          placeholder: t('collection_order.amount'),
          min: 0.01,
          max: 99999999,
          precision: 2,
          class: 'w-full',
        },
      },
      {
        label: t('collection_order.notify_url'),
        prop: 'notify_url',
        render: () => <el-input />,
        renderProps: {
          placeholder: t('common.placeholder_url'),
          clearable: true,
          type: 'textarea',
        },
      },
      {
        label: t('collection_order.return_url'),
        prop: 'return_url',
        render: () => <el-input />,
        renderProps: {
          placeholder: t('common.placeholder_url'),
          clearable: true,
          type: 'textarea',
        },
      },
    ]
  }
  console.log(formType)
  // 编辑默认值
  if (formType === 'edit') {
    return [
      {
        label: t('collection_order.submitted_utr'),
        prop: 'customer_submitted_utr',
        itemProps: {
          required: true,
        },
        render: () => <el-input />,
        renderProps: {
          placeholder: t('collection_order.submitted_utr'),
          clearable: true,
        },
      },
    ]
  }

  return [

  ]
}

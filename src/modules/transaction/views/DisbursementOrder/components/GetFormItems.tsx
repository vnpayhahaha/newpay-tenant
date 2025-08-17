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
import type { DisbursementOrderVo } from '~/transaction/api/DisbursementOrder.ts'
import useUserStore from '@/store/modules/useUserStore.ts'
import { selectStatus } from '@/modules/Common'
import { tr } from 'element-plus/es/locale/index.mjs'

const userStore = useUserStore()
export default function getFormItems(formType: 'add' | 'edit' = 'add', t: any, model: DisbursementOrderVo): MaFormItem[] {
  // 新增默认值
  if (formType === 'add') {
    model.tenant_id = userStore.getUserInfo().tenant_id
    return [
      {
        label: t('disbursement_order.tenant_order_no'),
        prop: 'tenant_order_no',
        itemProps: {
          required: true,
        },
        render: () => <el-input />,
        renderProps: {
          placeholder: t('disbursement_order.tenant_order_no'),
          clearable: true,
        },
      },
      {
        label: t('disbursement_order.amount'),
        prop: 'amount',
        itemProps: {
          required: true,
        },
        render: () => <el-input-number />,
        renderProps: {
          placeholder: t('disbursement_order.amount'),
          min: 0.01,
          max: 99999999,
          precision: 2,
          class: 'w-full',
        },
      },
      {
        label: t('disbursement_order.notify_url'),
        prop: 'notify_url',
        render: () => <el-input />,
        renderProps: {
          placeholder: t('common.placeholder_url'),
          clearable: true,
          type: 'textarea',
        },
      },
      {
        label: t('disbursement_order.payment_type'),
        prop: 'payment_type',
        render: () => <ma-remote-select filterable />,
        renderProps: {
          api: () =>
            new Promise(resolve =>
              resolve(selectStatus('disbursement_order', 'payment_type_list')),
            ),
          dataHandle: (response: any) => {
            return response.data?.map((item: Common.StatusOptionItem) => {
              return { label: `${item.label}`, value: item.value }
            })
          },
          placeholder: t('disbursement_order.payment_type'),
        },
        itemProps: {
          required: true,
        },
      },
      {
        label: t('disbursement_order.payee_upi'),
        prop: 'payee_upi',
        hide: () => model.payment_type !== 2,
        render: () => <el-input />,
        renderProps: {
          placeholder: t('disbursement_order.payee_upi'),
          clearable: true,
        },
      },
      {
        label: t('disbursement_order.payee_account_name'),
        prop: 'payee_account_name',
        cols: { md: 12, xs: 24 },
        hide: () => model.payment_type !== 1,
        render: () => <el-input />,
        renderProps: {
          placeholder: t('disbursement_order.payee_account_name'),
          clearable: true,
        },
      },
      {
        label: t('disbursement_order.payee_phone'),
        prop: 'payee_phone',
        cols: { md: 12, xs: 24 },
        hide: () => model.payment_type !== 1,
        render: () => <el-input />,
        renderProps: {
          placeholder: t('disbursement_order.payee_phone'),
          clearable: true,
        },
      },
      {
        label: t('disbursement_order.payee_bank_name'),
        prop: 'payee_bank_name',
        cols: { md: 12, xs: 24 },
        hide: () => model.payment_type !== 1,
        render: () => <el-input />,
        renderProps: {
          placeholder: t('disbursement_order.payee_bank_name'),
          clearable: true,
        },
      },
      {
        label: `${t('disbursement_order.payee_bank_code')}(IFSC)`,
        prop: 'payee_bank_code',
        cols: { md: 12, xs: 24 },
        hide: () => model.payment_type !== 1,
        render: () => <el-input />,
        renderProps: {
          placeholder: t('disbursement_order.payee_bank_code'),
          clearable: true,
        },
      },
      {
        label: t('disbursement_order.payee_account_no'),
        prop: 'payee_account_no',
        cols: { md: 12, xs: 24 },
        hide: () => model.payment_type !== 1,
        render: () => <el-input />,
        renderProps: {
          placeholder: t('disbursement_order.payee_account_no'),
          clearable: true,
        },
      },
    ]
  }

  // 编辑默认值
  if (formType === 'edit') {
    // todo...
  }

  return [
  ]
}

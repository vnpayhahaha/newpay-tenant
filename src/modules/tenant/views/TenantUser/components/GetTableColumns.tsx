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
import type { TenantUserVo } from '~/tenant/api/TenantUser.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds, realDelete, recovery, save } from '~/tenant/api/TenantUser.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: TenantUserVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
    {
      label: () => t('tenant.tenantId'), prop: 'tenant_id',
      cellRender: (row: any) => {
        return (
          <div class="text-align-left">
            <p class="cell-ellipsis">
              {row.row.tenant_id}
            </p>
            <p>
              {row.row.tenant.company_name}
            </p>
          </div>
        )
      },
    },
    { label: () => t('tenantUser.username'), prop: 'username' },
    { label: () => t('tenantUser.phone'), prop: 'phone' },
    {
      label: () => t('tenantUser.avatar'), prop: 'avatar',
      width: 100,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'avatar',
          props: {
            shape: 'circle',
          },
        },
      },
    },
    {
      label: () => t('tenantUser.status'), prop: 'status',
      width: 80,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'switch',
          prop: 'status',
          props: {
            size: 'small',
            activeValue: true,
            inactiveValue: false,
            on: {
              change: (value: boolean, row: any, proxy: MaProTableExpose) => {
                console.log('value', row, value)
                save(row.user_id, {
                  ...row,
                  status: value,
                }).then((res) => {
                  if (res.code === ResultCode.SUCCESS) {
                    msg.success(t('crud.updateSuccess'))
                    proxy.refresh()
                  }
                  else {
                    msg.error(t('crud.updateError'))
                  }
                })
              },
            },
          },
        },
      },
    },
    { label: () => t('tenantUser.is_enabled_google'), prop: 'is_enabled_google' },
    { label: () => t('tenantUser.remark'), prop: 'remark' },

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
            show: ({ row }) => showBtn('tenant:tenant_user:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'recovery',
            icon: 'i-heroicons:arrow-left-start-on-rectangle',
            show: ({ row }) => showBtn('tenant:tenantApp:recovery', row) && row.deleted_at !== null,
            text: () => t('crud.restore'),
            onClick: ({ row }, proxy: MaProTableExpose) => {
              msg.confirm(t('crud.restoreMessage')).then(async () => {
                const response = await recovery([row.user_id])
                if (response.code === ResultCode.SUCCESS) {
                  msg.success(t('crud.restoreSuccess'))
                  await proxy.refresh()
                }
              })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('tenant:tenant_user:delete', row),
            icon: 'i-heroicons:trash',
            text: () => t('crud.delete'),
            onClick: ({ row }, proxy: MaProTableExpose) => {
              if (row?.deleted_at !== null && showBtn('tenant:tenantApp:realDelete', row)) {
                msg.delConfirm(t('crud.realDeleteDataMessage')).then(async () => {
                  const response = await realDelete([row.user_id])
                  if (response.code === ResultCode.SUCCESS) {
                    msg.success(t('crud.delSuccess'))
                    await proxy.refresh()
                  }
                })
              }
              else {
                msg.delConfirm(t('crud.delDataMessage')).then(async () => {
                  const response = await deleteByIds([row.user_id])
                  if (response.code === ResultCode.SUCCESS) {
                    msg.success(t('crud.delSuccess'))
                    await proxy.refresh()
                  }
                })
              }
            },
          },
        ],
      },
    },
  ]
}

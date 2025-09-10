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
import type { TenantAppVo } from '~/tenant/api/TenantApp.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds, realDelete, recovery, save } from '~/tenant/api/TenantApp.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  return [
    // 多选列
   // { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
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
    { label: () => t('tenantApp.appName'), prop: 'app_name' },
    {
      label: () => t('tenantApp.appKey'), prop: 'app_key',
      width: 160,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'copy',
        },
      },
    },
    {
      label: () => t('tenantApp.appSecret'), prop: 'app_secret',
      minWidth: 380,
      cellRenderTo: {
        name: 'nmCellEnhance',
        props: {
          type: 'copy',
        },
      },
    },
    {
      label: () => t('tenantApp.status'), prop: 'status',
      width: 80,
      cellRender: ({ row }) => {
        return (
          <>
            {row.status ? (
              <ElTag type="success">{t("mineAdmin.plugin.enabled")}</ElTag>
            ) : (
              <ElTag type="info">{t("mineAdmin.plugin.disabled")}</ElTag>
            )}
          </>
        );
      },
    },
    // { label: () => t('tenantApp.description'), prop: 'description' },
    { label: () => t('tenantApp.createdAt'), prop: 'created_at', width: 180 },

  ]
}

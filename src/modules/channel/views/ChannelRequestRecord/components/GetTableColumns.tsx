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
import type { ChannelRequestRecordVo } from '~/channel/api/ChannelRequestRecord.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/channel/api/ChannelRequestRecord.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: ChannelRequestRecordVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
    { label: () => t('channel_request_record.request_id'), prop: 'request_id' },
    { label: () => t('channel_request_record.channel_id'), prop: 'channel_id' },
    { label: () => t('channel_request_record.api_method'), prop: 'api_method' },
    { label: () => t('channel_request_record.request_url'), prop: 'request_url' },
    { label: () => t('channel_request_record.http_method'), prop: 'http_method' },
    { label: () => t('channel_request_record.request_params'), prop: 'request_params' },
    { label: () => t('channel_request_record.request_headers'), prop: 'request_headers' },
    { label: () => t('channel_request_record.request_body'), prop: 'request_body' },
    { label: () => t('channel_request_record.request_time'), prop: 'request_time' },
    { label: () => t('channel_request_record.http_status_code'), prop: 'http_status_code' },
    { label: () => t('channel_request_record.response_status'), prop: 'response_status' },
    { label: () => t('channel_request_record.response_headers'), prop: 'response_headers' },
    { label: () => t('channel_request_record.response_body'), prop: 'response_body' },
    { label: () => t('channel_request_record.error_message'), prop: 'error_message' },
    { label: () => t('channel_request_record.response_time'), prop: 'response_time' },
    { label: () => t('channel_request_record.elapsed_time'), prop: 'elapsed_time' },
    { label: () => t('channel_request_record.created_at'), prop: 'created_at' },

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
            show: ({ row }) => showBtn('channel:channel_request_record:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('channel:channel_request_record:delete', row),
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

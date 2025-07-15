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
import type { ChannelCallbackRecordVo } from '~/channel/api/ChannelCallbackRecord.ts'
import type { UseDialogExpose } from '@/hooks/useDialog.ts'

import { useMessage } from '@/hooks/useMessage.ts'
import { deleteByIds } from '~/channel/api/ChannelCallbackRecord.ts'
import { ResultCode } from '@/utils/ResultCode.ts'
import hasAuth from '@/utils/permission/hasAuth.ts'

export default function getTableColumns(dialog: UseDialogExpose, formRef: any, t: any): MaProTableColumns[] {
  const dictStore = useDictStore()
  const msg = useMessage()

  const showBtn = (auth: string | string[], row: ChannelCallbackRecordVo) => {
    return hasAuth(auth)
  }

  return [
    // 多选列
    { type: 'selection', showOverflowTooltip: false, label: () => t('crud.selection') },
    // 索引序号列
    { type: 'index' },
    // 普通列
    { label: () => t('channel_callback_record.callback_id'), prop: 'callback_id' },
    { label: () => t('channel_callback_record.channel_id'), prop: 'channel_id' },
    { label: () => t('channel_callback_record.original_request_id'), prop: 'original_request_id' },
    { label: () => t('channel_callback_record.callback_type'), prop: 'callback_type' },
    { label: () => t('channel_callback_record.callback_url'), prop: 'callback_url' },
    { label: () => t('channel_callback_record.callback_http_method'), prop: 'callback_http_method' },
    { label: () => t('channel_callback_record.callback_params'), prop: 'callback_params' },
    { label: () => t('channel_callback_record.callback_headers'), prop: 'callback_headers' },
    { label: () => t('channel_callback_record.callback_body'), prop: 'callback_body' },
    { label: () => t('channel_callback_record.callback_time'), prop: 'callback_time' },
    { label: () => t('channel_callback_record.client_ip'), prop: 'client_ip' },
    { label: () => t('channel_callback_record.verification_status'), prop: 'verification_status' },
    { label: () => t('channel_callback_record.response_content'), prop: 'response_content' },
    { label: () => t('channel_callback_record.process_result'), prop: 'process_result' },
    { label: () => t('channel_callback_record.elapsed_time'), prop: 'elapsed_time' },
    { label: () => t('channel_callback_record.created_at'), prop: 'created_at' },

    // 操作列
    {
      type: 'operation',
      hide: true,
      label: () => t('crud.operation'),
      width: '260px',
      operationConfigure: {
        type: 'tile',
        actions: [
          {
            name: 'edit',
            icon: 'i-heroicons:pencil',
            show: ({ row }) => showBtn('channel:channel_callback_record:update', row),
            text: () => t('crud.edit'),
            onClick: ({ row }) => {
              dialog.setTitle(t('crud.edit'))
              dialog.open({ formType: 'edit', data: row })
            },
          },
          {
            name: 'del',
            show: ({ row }) => showBtn('channel:channel_callback_record:delete', row),
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

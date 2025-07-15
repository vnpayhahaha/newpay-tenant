import type { ResponseStruct } from '#/global'

export interface TenantVo {
  // id
  id: number
  // 租户编号
  tenant_id: string
  // 联系人
  contact_user_name: string
  // 联系电话
  contact_phone: string
  // 企业名称
  company_name: string
  // 企业代码
  license_number: string
  // 地址
  address: string
  // 企业简介
  intro: string
  // 域名
  domain: string
  // 用户数量（-1不限制）
  user_num_limit: number
  app_num_limit: number
  // 启用状态(1正常 2停用)
  is_enabled: boolean
  // 操作管理员
  operate_by: number
  // 创建时间
  created_at: string
  // 过期时间
  expired_at: string
  // 更新者
  updated_by: number
  // 更新时间
  updated_at: string
  // 安全等级(0-99)
  safe_level: number
  // 删除者
  deleted_by: number
  // 删除时间
  deleted_at: string
  // 备注
  remark: string
  auto_transfer: boolean
  settlement_type: number
  settlement_delay_days: number
  receipt_fee_type: Array<number>
  receipt_fixed_fee: number
  receipt_fee_rate: number
  payment_fee_type: Array<number>
  payment_fixed_fee: number
  payment_fee_rate: number
}

// 租户管理查询
export function page(params: TenantVo): Promise<ResponseStruct<TenantVo[]>> {
  return useHttp().get('/admin/tenant/tenant/list', { params })
}

// 租户管理新增
export function create(data: TenantVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/admin/tenant/tenant', data)
}

// 租户管理编辑
export function save(id: number, data: TenantVo): Promise<ResponseStruct<null>> {
  return useHttp().put(`/admin/tenant/tenant/${id}`, data)
}

// 租户管理删除
export function deleteByIds(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/tenant/tenant', { data: ids })
}

// 租户管理真删除
export function realDelete(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().delete('/admin/tenant/tenant/real_delete', { data: ids })
}

// 单个或批量恢复在回收站的数据
export function recovery(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().put('/admin/tenant/tenant/recovery', { ids })
}

export interface TenantDictVo {
  id: string
  tenant_id: string
  company_name: string
  contact_user_name: string
  is_enabled: number
  created_by: number
  expired_at: string
}

export function remote(): Promise<ResponseStruct<TenantDictVo[]>> {
  return useHttp().get('/admin/tenant/tenant_dict/remote')
}

export function selectStatus(): Promise<ResponseStruct<Common.StatusOption[]>> {
  return useHttp().get('/public/selectOption?table_name=tenant&field_list=status_list')
}

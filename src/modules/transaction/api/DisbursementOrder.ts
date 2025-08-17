import type { ResponseStruct } from '#/global'

export interface DisbursementOrderVo {
   //
  id: number;
  // 平台订单号
  platform_order_no: string;
  // 下游订单号
  merchant_order_no: string;
  // 上游订单号
  upstream_order_no: string;
  // 支付时间
  pay_time: string;
  // 订单来源:App-API 管理后台 导入
  order_source: string;
  // 代付渠道D
  disbursement_channel_id: number;
  channel_type: number;
  // 代付银行卡ID
  bank_account_id: number;
  channel_account_id: number;
  // 订单金额
  amount: string;
  // 固定手续费
  fixed_fee: string;
  // 费率手续费
  rate_fee: string;
  // 总手续费
  total_fee: string;
  // 租户入账金额
  settlement_amount: string;
  // 上游手续费
  upstream_fee: string;
  // 上游结算金额
  upstream_settlement_amount: string;
  // 付款类型:1-银行卡 2-UPI
  payment_type: number;
  // 收款人银行名称
  payee_bank_name: string;
  // 收款人银行编码
  payee_bank_code: string;
  // 收款人账户姓名
  payee_account_name: string;
  // 收款人银行卡号
  payee_account_no: string;
  // 收款人UPI账号
  payee_upi: string;
  // 预订交易的凭证/UTR
  pre_utr: string;
  // 实际交易的凭证/UTR
  final_utr: string;
  // 租户编号
  tenant_id: string;
  // 应用ID
  app_id: number;
  // 订单描述
  description: string;
  // 订单状态:
  // 0-创建 10-待支付 11-待回填 20-成功 30-挂起
  // 40-失败 41-已取消 43-已失效 44-已退款
  status: string;
  // 订单失效时间
  expire_time: string;
  // 回调地址
  notify_url: string;
  // 回调次数
  notify_count: number;
  // 通知状态:0-未通知 1-通知成功 2-通知失败 3-回调中
  notify_status: string;
  // 渠道交易号
  channel_transaction_no: string;
  // 错误代码
  error_code: string;
  // 错误信息
  error_message: string;
  // 关联API请求ID
  request_id: string;
  //
  created_at: string;
  //
  updated_at: string;
  transaction_voucher_id: number;
  bank_account: {
    //
    id: number;
    // 银行名称
    branch_name: string;
  } | null;
  channel_account: {
    id: number;
    merchant_id: string;
  } | null;
  channel: {
    channel_code: string;
    channel_icon: string;
    channel_name: string;
    id: number;
  };
  cancel_operator: {
    id: number;
    username: string;
    nickname: string;
  } | null;
  down_bill_template_id: string;
  bank_disbursement_download: {
    id: number;
    file_name: string;
    hash: string;
    suffix: string;
  } | null;
  created_customer: {
    id: number;
    username: string;
  } | null;
}

// 付款订单查询
export function page(params: DisbursementOrderVo): Promise<ResponseStruct<DisbursementOrderVo[]>> {
  return useHttp().get('/tenant/transaction/disbursement_order/list', { params })
}

// 付款订单新增
export function create(data: DisbursementOrderVo): Promise<ResponseStruct<null>> {
  return useHttp().post('/tenant/transaction/disbursement_order', data)
}


// 付款订单取消
export function cancel(ids: number[]): Promise<ResponseStruct<null>> {
  return useHttp().put("/tenant/transaction/disbursement_order/cancel", {
    data: ids,
  });
}

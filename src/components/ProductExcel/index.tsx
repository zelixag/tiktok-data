import React, { useEffect, useState } from 'react'
import { getProductList } from '../../services/productServices'
import {exportExcel} from "../../utils/excel"
import './index.css'
import { Button, Input, InputNumber, Select } from 'antd';
import { productHeaders } from '../../utils/tableHeader';
function ProductExcel() {

  const [keyword, setKeyword] = useState<string>('')
  const [dayType, setDayType] = useState<number>(30)
  const [sort, setSort] = useState<string>('duration_volume')
  const [loading, setLoading] = useState(true)
  const [params, setParams] = useState<any>({})

  let list: any[] = []
  useEffect(() => {
    const params = {
      keyword: keyword,
      keyword_type: "",
      page: 1,
      price: "",
      size: 50,
      filter_coupon: 0,
      has_live: 0,
      has_video: 0,
      tb_max_commission_rate: "",
      day_pv_count: "",
      duration_volume: "100-",
      big_category: "",
      first_category: "",
      second_category: "",
      platform: "",
      sort: sort,
      order_by: "desc",
      day_type: dayType,
      most_volume: -1,
      most_aweme_volume: 0,
      most_live_volume: 0,
    };
    setParams(params)
  }, [keyword, dayType, sort])
  const search = async (nextPage: number) => {
    setLoading(false)
    let data = await getProductList({...params, page: nextPage,})
    if(!data) return;
    const {page, totalCount, totalPage } = data.page_info
    list = list.concat(data.list)
    // 总条数大于50，分页等于总页数，则停止搜索
    if(totalCount > 50 && nextPage < totalPage) {
      // 模仿人操作，不然递归太快，会被识别成机器人
      const timer = setTimeout(() => {
        search(page + 1)
        clearTimeout(timer)
      }, 500)
    } else {
      const productList = list.map((item:any) => {
        item.estimated_commission = item.estimated_commission + '%'
        item.duration_product_rate = item.duration_product_rate + '%'
        return item
      });
      const fileName = keyword ?`关于【${keyword}】商品列表.xlsx` : '商品列表.xlsx'
      exportExcel(productHeaders, productList, fileName);
      setLoading(true)
    }
  }
  return (
    <div className="product_excel">
      <h3>商品Excel生成</h3>
      <div className="search-form">
      <div className="form-select-day form-item">
          <span>选择降序排序规则:</span>
          <Select onChange={(value) => {
            setSort(value)
          }}
          style={{ width: 280, marginRight: 16 }}
          options={[{value: 'duration_volume', label: '总销量'},{value: 'duration_aweme_volume', label: "视频销量(件)"},{value: 'duration_live_volume', label: '直播销量（件）'},]} defaultValue={'duration_volume'}>
          </Select>天
        </div>
        <div className="form-select-day form-item">
          <span>选择天数:</span>
          <Select onChange={(value) => {
            setDayType(value)
          }}
          style={{ width: 280, marginRight: 16 }}
          options={[{value: 1, label: 1},{value: 7, label: 7},{value: 30, label: 30},]} defaultValue={30}>
          </Select>天
        </div>
        <div className="form-select-day form-item">
          <span>关键字:</span>
          <Input style={{ width: 280, marginRight: 16 }} placeholder="请输入商品链接、标题或者关键词" onChange={(event) => {
            setKeyword(event.target.value)
          }}></Input>
        </div>
        <Button loading={!loading} type="primary" onClick={() =>{
          search(1)
        }}>{loading ? '导出表格': '请稍等一会儿，表格制作中'}</Button>
      </div>
    </div>
  )
}

export default ProductExcel

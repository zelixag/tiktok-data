import React, { useEffect, useState } from 'react'
import { getProductList } from '../../services/productServices'
import {exportExcel} from "../../utils/excel"
import { Button, Input, InputNumber, Select } from 'antd';
const Search = Input.Search;
function ProductExcel() {

  const [keyword, setKeyword] = useState<string>('')
  const [dayType, setDayType] = useState<number>(30)
  const [count, setCount] = useState<number>(100)
  const [params, setParams] = useState<any>({})

  const [header,ActioHeader]=useState([
    {
        title: '商品',
        dataIndex: 'title',
        key: 'title',
        className: 'text-monospace',
    }, {
      title: '划线价',
      dataIndex: 'market_price',
      key: 'market_price',
    },{
        title: '价格',
        dataIndex: 'final_price',
        key: 'final_price',
    }, {
        title: '商家',
        dataIndex: 'shop_name',
        key: 'shop_name',
    },
    {
      title: '佣金比例',
      dataIndex: 'tb_max_commission_rate',
      key: 'tb_max_commission_rate',
      className: 'text-monospace',
  }, {
    title: '总销量',
    dataIndex: 'day_order_count',
    key: 'day_order_count',
  },{
      title: '直播销量',
      dataIndex: 'duration_live_volume',
      key: 'duration_live_volume',
  }, {
      title: '视频销量（件）',
      dataIndex: 'duration_aweme_volume',
      key: 'duration_aweme_volume',
  },
  {
    title: '转化率',
    dataIndex: 'duration_product_rate',
    key: 'duration_product_rate',
    className: 'text-monospace',
}, {
  title: '关联达人',
  dataIndex: 'duration_author_count',
  key: 'duration_author_count',
},{
    title: '关联直播',
    dataIndex: 'duration_live_count',
    key: 'duration_live_count',
}, {
    title: '关联视频',
    dataIndex: 'duration_video_count',
    key: 'duration_video_count',
}
  ])

  useEffect(() => {
    const params = {
      keyword: keyword,
      keyword_type: "",
      page: 1,
      price: "",
      size: count,
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
      sort: "duration_volume",
      order_by: "desc",
      day_type: dayType,
      most_volume: -1,
      most_aweme_volume: 0,
      most_live_volume: 0,
    };
    setParams(params)
  }, [keyword, dayType, count])
  const search = async () => {
    const data = await getProductList(params)
    const list = data.list.map((item:any) => {
      item.estimated_commission = item.estimated_commission + '%'
      item.duration_product_rate = item.duration_product_rate + '%'
      return item
    });
    const fileName = keyword ?`关于【${keyword}】商品列表.xlsx` : '商品列表.xlsx'
    exportExcel(header, list, fileName);
  }
  return (
    <div className="product_excel">
      <h3>商品Excel生成</h3>
      <div className="display-flex">
      <Select onChange={(value) => {
        setDayType(value)
      }}
      style={{ width: 320, marginRight: 16 }}
      options={[{value: 1, label: 1},{value: 7, label: 7},{value: 30, label: 30},]} defaultValue={30}>
      </Select>天
      <InputNumber min={0} defaultValue={100} onChange={(value: number) => {
        setCount(value)
      }} placeholder="输入数字"></InputNumber>条
      <Search onChange={(event) => {
        debugger
        setKeyword(event.target.value)
      }}></Search>
      <Button type="primary" onClick={() =>{
        search()
      }}>导出表格</Button>
      </div>
    </div>
  )
}

export default ProductExcel

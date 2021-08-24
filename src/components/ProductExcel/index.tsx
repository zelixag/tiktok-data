import React, { useEffect, useState } from 'react'
import { getProductCategory, getProductList } from '../../services/productServices'
import {exportExcel} from "../../utils/excel"
import './index.css'
import { Button, Cascader, Input, InputNumber, Select, Table } from 'antd';
import { productHeaders } from '../../utils/tableHeader';

function ProductExcel() {
  const [pList, setPList] = useState<any[]>([])
  const [maxCount, setMaxCount] = useState<number>(50)
  const [keyword, setKeyword] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [params, setParams] = useState<any>({
    keyword: '',
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
    sort: 'duration_volume',
    order_by: "desc",
    day_type: 30,
    most_volume: -1,
    most_aweme_volume: 0,
    most_live_volume: 0,
  })
  const [category, setCategory] = useState<any[]>([])

  let list: any[] = []
  let isExcel = true
  useEffect(() => {
    (async () => {
      const productCategory = await getProductCategory('all')
      setCategory(productCategory)
    })()
  }, [])
  const search = async (nextPage: number) => {
    loading && setLoading(false)
    let data = await getProductList({...params, page: nextPage,})
    if(!data) return;
    const {page, totalCount, totalPage } = data.page_info
    list = list.concat(data.list)
    setPList(list)
    // 总条数大于50，分页等于总页数，则停止搜索
    if(list.length <= maxCount && maxCount < totalCount ) {
      // 模仿人操作，不然递归太快，会被识别成机器人
      if((totalCount > 50 && nextPage < totalPage)){
        const timer = setTimeout(() => {
          search(page + 1)
          clearTimeout(timer)
        }, 500)
      }
    } else {
      if(isExcel) {
        setLoading(true)
        isExcel = false
        const productList = list.map((item:any) => {
          item.estimated_commission = item.estimated_commission + '%'
          item.duration_product_rate = item.duration_product_rate + '%'
          return item
        });
        const fileName = keyword ?`关于【${keyword}】商品列表.xlsx` : '商品列表.xlsx'
        exportExcel(productHeaders, productList, fileName);
      }
    }
  }
  return (
    <div className="product_excel">
      <h3>商品Excel生成</h3>
      <div className="form-select-day form-item">
          <span>关键字:</span>
          <Input style={{ width: 280, marginRight: 16 }} placeholder="请输入商品链接、标题或者关键词" onChange={(event) => {
            setKeyword(event.target.value)
            setParams((params: any) => {return {...params, keyword: event.target.value}})
          }}></Input>
        </div>
      <div className="search-form">
      <div className="form-select-day form-item">
          <span>搜索条数:</span>
          <Input style={{ width: 90, marginRight: 16 }} defaultValue={100} placeholder="请输入最大条数" onChange={(event) => {
            setMaxCount(+event.target.value)
          }}></Input>
        </div>
      <div className="form-select-day form-item">
          <span>排序:</span>
          <Select onChange={(value) => {
            setParams((params: any) => {return {...params, sort: value}})
          }}
          style={{ width: 140, marginRight: 16 }}
          options={[{value: 'duration_volume', label: '总销量'},{value: 'duration_aweme_volume', label: "视频销量(件)"},{value: 'duration_live_volume', label: '直播销量（件）'},]} defaultValue={'duration_volume'}>
          </Select>天
        </div>
        <div className="form-select-day form-item">
          <span>天数:</span>
          <Select onChange={(value) => {
            setParams((params: any) => {return {...params, day_type: value}})
          }}
          style={{ width: 90, marginRight: 16 }}
          options={[{value: 1, label: 1},{value: 7, label: 7},{value: 30, label: 30},]} defaultValue={30}>
          </Select>天
        </div><br/>
        <div className="form-select-day form-item">
          <span>分类:</span>
          <Cascader fieldNames={{label: 'cat_name', value: 'id', children: 'sub_categories'}} options={category} style={{ width: 280, marginRight: 16 }} placeholder="请输入商品链接、标题或者关键词" onChange={(value) => {
            setParams((params: any) => {return {...params, big_category: value[0], first_category: value[1], second_category: value[2]}})
          }}></Cascader>
        </div>
        <Button loading={!loading} type="primary" onClick={() =>{
          search(1)
        }}>{loading ? '导出表格': '请稍等一会儿，表格制作中'}</Button>
      </div>
      <div style={{marginTop: 24}}>
        <h3>预览表格</h3>
      <Table dataSource={pList} columns={productHeaders} />
      </div>
    </div>
  )
}

export default ProductExcel

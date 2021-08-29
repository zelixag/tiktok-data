import { Button, Cascader, Input, Select, Table } from "antd"
import Cookies from "js-cookie"
import React, { useEffect, useState } from "react"
import { getBrandList, getBrandTalentList } from "../../services/brandService"
import { getProductCategory } from "../../services/productServices"
import { getAwemeOverview, getStarCategory, getTalentInfo, getbrandList, getTalentLiveOverview, productAnalysis } from "../../services/talentServices"
import { exportExcel } from "../../utils/excel"
import { brandTalentHeaders, talentBuyProductHeaders, talentHeaders } from "../../utils/tableHeader"
const MAX_COUNT = 100000
const BrandbrandList = () => {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState<any[]>([])
  const [total, setTotal] = useState<number>(0)
  const [failure, setFailure] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>('')
  const [maxCount, setMaxCount] = useState<number>(MAX_COUNT)
  const [searchParams, setSearchParams] = useState<any>({
    page: 1,
    category: undefined,
    keyword: '阿宽',
    fans_age: undefined,
    fans_gender: -1,
    fans_province: undefined,
    sort: 'day_volume',
    order_by: 'desc',
    size: 50,
    has_aweme_sale: 0,
    has_live_sale: 0,
    interaction_inc_range: undefined,
    amount_range: undefined,
  })
  const brandTalentParams = {
    brand_code: undefined,
    category: undefined,
    reputation_level: -1,
    follower_count: undefined,
    keyword: undefined,
    page: 1,
    size: 100,
    sort: 'volume',
    order_by: 'asc',
    start_time: '2021-05-31',
    end_time: '2021-08-28',
  }
  useEffect(() => {
    if(list.length >0 && (list.length === total) || list.length === maxCount || failure) {
      const fileName ='品牌达人列表.xlsx'
      exportExcel(talentHeaders, list, fileName);
    }
  }, [total, list, failure])
  let brandList: any[] = []
  let talentList: any[] = []
  let time = 0
  const getDetail = async (brandCode: string, nextPage: number) => {
    time += 500
    loading && setLoading(false)
    const data = await getBrandTalentList({...brandTalentParams, page: nextPage, brand_code: brandCode})
    if(!data) return;
    const {page, totalCount, totalPage } = data.page_info
    talentList = talentList.concat(data.list)
    setList(talentList)
    if(totalCount > 50 && nextPage < totalPage) {
      const timer = setTimeout(async () => {
        await getDetail(brandCode, page + 1)
        clearTimeout(timer)
      }, time)
    } else {
      setLoading(true)
    }
    return talentList
  }
  const search = async () => {
    setLoading(false)
    let data = await getBrandList({...searchParams})
    if(!data) return;
    const brandCode = data.list[0]?.brand_code
    getDetail(brandCode, 1)
  }
  return <div>
    <h3>品牌达人列表</h3>
      <div className="search-form">
      <div className="form-select-day form-item">
          <span>关键字:</span>
          <Input style={{ width: 280, marginRight: 16 }} placeholder="请输入商品链接、标题或者关键词" onChange={(event) => {
            setKeyword(event.target.value)
            setSearchParams((params: any) => {return {...params, keyword: event.target.value}})
          }}></Input>
        </div>
        <Button loading={!loading} type="primary" onClick={() =>{
          search(0)
        }}>{loading ? '导出表格': `请稍等一会儿，表格已经完成${(list.length/maxCount * 100).toFixed(2)}%`}</Button>
        <Button style={{marginLeft: 16}} type="primary" onClick={() =>{
          setFailure(true)
        }}>{`现在已经完成${list.length}条，点击可以马上导出数据`}</Button>
      </div>
      <div style={{marginTop: 24}}>
        <h3>预览表格</h3>
      <Table dataSource={list} columns={brandTalentHeaders} />
      </div>
    </div>
}

export default BrandbrandList
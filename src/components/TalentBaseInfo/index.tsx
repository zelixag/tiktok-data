import { Button, Input, Select, Table } from "antd"
import React, { useEffect, useState } from "react"
import { getAwemeOverview, getStarCategory, getTalentInfo, getTalentList, getTalentLiveOverview, productAnalysis } from "../../services/talentServices"
import { exportExcel } from "../../utils/excel"
import { talentBuyProductHeaders, talentHeaders } from "../../utils/tableHeader"
const MAX_COUNT = 100000
const TalentSearch = () => {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState<any[]>([])
  const [talentBuyProductList, setTalentBuyProductList] = useState<any[]>([])
  const [ids, setIds] = useState<string[]>([])
  const [total, setTotal] = useState<number>(0)
  const [sort, setSort] = useState<string>('')
  const [starCategory, setStarCategory] = useState<string>('')
  const [starCategoryList, setStarCategoryList] = useState<any[]>([])
  const [maxCount, setMaxCount] = useState<number>(MAX_COUNT)
  const searchParams = {
    page:1,
    reputation_level:-1,
    star_category:undefined,
    star_sub_category:undefined,
    goods_cat:undefined,
    keyword: undefined,
    gender:-1,
    age:undefined,
    fans_gender:-1,
    fans_age:undefined,
    follower_count:undefined,
    product_platform:undefined,
    province:undefined,
    fans_province:undefined,
    contact:0,
    is_commerce:0,
    is_live:0,
    is_sell_live:0,
    is_star_author:0,
    is_low_fans_high_gmv:0,
    is_brand_self_author:0,
    is_shop_author:0,
    verification_type:0,
    sort:'follower_count',
    order_by:'desc',
    size:100,
    similar_author_id:undefined,
  }
  const talentBuyProductParams = {
    author_id: 2862739114691172,
    sort: 'amount',
    keyword: '',
    page: 1,
    size: 100,
    platform: undefined,
    product_type: 0,
    price: undefined,
    brand_code: undefined,
    big_category: undefined,
    first_category: undefined,
    second_category: undefined,
    orderby: 'desc',
    start_date: '2021-07-23',
    end_date: '2021-08-21',
  }
  useEffect(() => {
    (async () => {
      const starCategory = await getStarCategory()
      setStarCategoryList(starCategory.map(((category: any) => {
        return {
          label: category.id,
          value: category.id,
        }
      })))
    })()
  }, [])
  useEffect(() => {
    if(list.length >0 && (list.length === total) || list.length === maxCount) {
      const fileName = starCategory ?`关于【${starCategory}】达人列表.xlsx` : '达人列表.xlsx'
      exportExcel(talentHeaders, list, fileName);
      if(talentBuyProductList?.length) {
        exportExcel(talentBuyProductHeaders, talentBuyProductList, starCategory ?`关于【${starCategory}】达人带货列表.xlsx` : '达人带货列表.xlsx');
      }
      setLoading(true)
    }
  }, [total, list, talentBuyProductList])
  let talentList: any[] = []
  let time = 0
  const getDetail = (author_id: string, unique_id: string) => {
    time += 3000
    setTimeout(async () => {
      const info = await getTalentInfo(author_id)
      const liveOverview = await getTalentLiveOverview(author_id)
      const awemeOverview = await getAwemeOverview(author_id)
      let productData = await productAnalysis({...talentBuyProductParams, author_id })
      if(info?.reputation) {
        info.reputationScore = info.reputation.score
      }
      setList(list => {return [...list, ...[{...info, ...liveOverview, ...awemeOverview}]]})

      if(!productData?.list?.length) return
      const buyProductList = productData.list.map((item:any) => {
        item.unique_id = unique_id
        return item
      })
      setTalentBuyProductList(pList => {return [...pList, ...buyProductList]} )
    }, time)
  }
  const search = async (nextPage:number) => {
    setLoading(false)
    let data = await getTalentList({...searchParams, page: nextPage,star_category:starCategory, sort })
    if(!data) return;
    const {page, totalCount, totalPage } = data.page_info
    !total && setTotal(totalCount)
    talentList = talentList.concat(data.list)
    if((totalCount > 50 && nextPage < totalPage) && talentList.length <= maxCount) {
      setTimeout(() => {
        search(page + 1)
      }, 1000)
    } else {
      const ids = talentList.map(item => item.author_id)
      setIds(talentList.map(item => item.unique_id))

      for (let i = 0; i < talentList.length; i++) {
        if(i === maxCount) break;
        getDetail(talentList[i].author_id, talentList[i].unique_id)
      }
    }
  }
  return <div>
    <h3>类型搜索搜索达人信息</h3>
      <div className="search-form">
      <div className="form-select-day form-item">
          <span>搜索条数:</span>
          <Input style={{ width: 90, marginRight: 16 }} defaultValue={MAX_COUNT} placeholder="请输入最大条数" onChange={(event) => {
            setMaxCount(+event.target.value)
          }}></Input>
        </div>
      <div className="form-select-day form-item">
          <span>排序:</span>
          <Select options={[{label: '粉丝增量',value: "inc_follower"}, {label: '近30日直播场均销售额',value: "live_average_amount_30"}]} style={{ width: 320, marginRight: 16 }} onChange={(value: any) => {
            setSort(value)
          }}></Select>
        </div>
        <div className="form-select-day form-item">
          <span>类型:</span>
          <Select options={starCategoryList} style={{ width: 220, marginRight: 16 }} onChange={(value: any) => {
            setStarCategory(value)
          }}></Select>
        </div>
        <Button loading={!loading} type="primary" onClick={() =>{
          search(0)
        }}>{loading ? '导出表格': '请稍等一会儿，表格制作中'}</Button>
      </div>
      <div style={{marginTop: 24}}>
        <h3>预览表格</h3>
      <Table dataSource={list} columns={talentHeaders} />
      </div>
      <div style={{marginTop: 24,width: 500}}>
        <h3>抖音IDS</h3>
        <div style={{marginTop: 24,width: 500,display: 'flex', flexDirection: 'column'}}>
          {ids.map((item,index) => {
            if(index > 5) return ''
            return item+','
          })}
        </div>
      </div>
    </div>
}

export default TalentSearch
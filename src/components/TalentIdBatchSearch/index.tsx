import { Button, Input, Table } from "antd"
import React, { useEffect, useState } from "react"
import { getAwemeOverview, getTalentInfo, getTalentList, getTalentLiveOverview } from "../../services/talentServices"
import { exportExcel } from "../../utils/excel"
import { talentHeaders } from "../../utils/tableHeader"
const TalentByIdBatchSearch = () => {
  const [keywords, setKeywords] = useState('')
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState<number>(0)
  const [list, setList] = useState<any[]>([])
  const searchParams = {
    page:1,
    reputation_level:-1,
    star_category:undefined,
    star_sub_category:undefined,
    goods_cat:undefined,
    keyword: '1009408837',
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
    size:52,
    similar_author_id:undefined,
  }
  useEffect(() => {
    if(list.length >0 && (list.length === total || total === 5) || list.length === 5) {
      exportExcel(talentHeaders, list, `关于达人信息列表.xlsx`);
      setLoading(true)
    }
  }, [list])
  let talentList: any[] = []
  let time = 0
  const getDetail = (author_id: string) => {
    if(list.length > 5) return
    time += 1000
    setTimeout(async () => {
      const info = await getTalentInfo(author_id)
      const liveOverview = await getTalentLiveOverview(author_id)
      const awemeOverview = await getAwemeOverview(author_id)
      if(info.reputation) {
        info.reputationScore = info.reputation.score
      }
      setList(list => {return [...list, ...[{...info, ...liveOverview, ...awemeOverview}]]})
    }, time)
  }
  const search = async (index:number) => {
    setLoading(false)
    const kwArray = keywords.includes(',')?keywords.replace(/' '/g, '').split(','):[keywords]
    !total && setTotal(kwArray.length)
    if(index < kwArray.length) {
      const talentInfo = await getTalentList({...searchParams, keyword: kwArray[index]})
      talentList.push(talentInfo.list[0])
      setTimeout(() => {
        search(index + 1)
      }, 500);
    } else {
      const ids = talentList.map(item => item.author_id)

      for (let i = 0; i < ids.length; i++) {
        if(i === 5) break;
        getDetail(ids[i])
      }
    }
  }
  return <div>
    <h3>批量ID搜索达人信息</h3>
      <div className="search-form">
        <div className="form-select-day form-item">
          <span>输入抖音id(使用英文逗号隔开):</span>
          <Input style={{ width: 320, marginRight: 16 }} onChange={(event) => {
            setKeywords(event.target.value)
          }}></Input>
        </div>
        <Button loading={!loading} type="primary" onClick={() =>{
          search(0)
          setList([])
        }}>{loading ? '导出表格': '请稍等一会儿，表格制作中'}</Button>
      </div>
      <div style={{marginTop: 24}}>
        <h3>预览表格</h3>
      <Table dataSource={list} columns={talentHeaders} />
      </div>
    </div>
}

export default TalentByIdBatchSearch
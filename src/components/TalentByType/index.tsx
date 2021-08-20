import { Button, Input, Select, Table } from "antd"
import { throttle } from "lodash"
import React, { useEffect, useState } from "react"
import { getStarCategory, getTalentInfo, getTalentList } from "../../services/talentServices"
import { exportExcel } from "../../utils/excel"
import { talentHeaders } from "../../utils/tableHeader"

const TalentSearch = () => {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState<any[]>([])
  const [ids, setIds] = useState<string[]>([])
  const [total, setTotal] = useState<number>(0)
  const [starCategory, setStarCategory] = useState<string>('')
  const [starCategoryList, setStarCategoryList] = useState<any[]>([])
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
    if(list.length >0 && list.length === total || total === 500) {
      const fileName = starCategory ?`关于【${starCategory}】达人列表.xlsx` : '达人列表.xlsx'
      exportExcel(talentHeaders, list, fileName);
      setLoading(true)
    }
  }, [total])
  let talentList: any[] = []
  let time = 0
  const getDetail = (author_id: string) => {
    time += 1000
    console.log(time)
    setTimeout(async () => {
      const info = await getTalentInfo(author_id)
      console.log(info)
      setList(list => {return [...list, info]})

    }, time)
  }
  const search = async (nextPage:number) => {
    setLoading(false)
    let data = await getTalentList({...searchParams, page: nextPage,star_category:starCategory })
    if(!data) return;
    const {page, totalCount, totalPage } = data.page_info
    !total && setTotal(totalCount)
    talentList = talentList.concat(data.list)
    if(totalCount > 50 && nextPage < (totalPage > 5 ? 5 : totalPage)) {
      setTimeout(() => {
        search(page + 1)
      }, 1000)
    } else {
      const ids = talentList.map(item => item.author_id)
      setIds(ids)
      ids.forEach((id) => {
        console.log(id)
        getDetail(id)
      })
      // talentList = []
    }
  }
  return <div>
    <h3>类型搜索搜索达人信息</h3>
      <div className="search-form">
        <div className="form-select-day form-item">
          <span>输入抖音id(使用英文逗号隔开):</span>
          <Select options={starCategoryList} style={{ width: 320, marginRight: 16 }} onChange={(value: any) => {
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
        </div>
      </div>
    </div>
}

export default TalentSearch
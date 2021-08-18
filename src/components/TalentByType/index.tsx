import { Button, Input, Select, Table } from "antd"
import React, { useEffect, useState } from "react"
import { getStarCategory, getTalentList } from "../../services/talentServices"
import { exportExcel } from "../../utils/excel"
const header = [
  {
    title: '抖音ID',
    dataIndex: 'unique_id',
    key: 'unique_id',
    className: 'text-monospace',
  },
  {
      title: '达人',
      dataIndex: 'nickname',
      key: 'nickname',
      className: 'text-monospace',
  },
  {
      title: '粉丝量',
      dataIndex: 'follower_count',
      key: 'follower_count',
      className: 'text-monospace',
  },
  {
      title: '粉丝增量',
      dataIndex: 'follower_incr',
      key: 'follower_incr',
      className: 'text-monospace',
  },
  {
      title: '视频预期点赞',
      dataIndex: 'aweme_digg_medium',
      key: 'aweme_digg_medium',
      className: 'text-monospace',
  },
  {
      title: '平均占粉比',
      dataIndex: 'aweme_digg_follower_ration',
      key: 'aweme_digg_follower_ration',
      className: 'text-monospace',
  },
  {
      title: '粉丝增量',
      dataIndex: 'follower_incr',
      key: 'follower_incr',
      className: 'text-monospace',
  }]
const TalentSearch = () => {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState<any[]>([])
  const [ids, setIds] = useState<any[]>([])
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
  let talentList: any[] = []
  const search = async (nextPage:number) => {
    setLoading(false)
    let data = await getTalentList({...searchParams, page: nextPage,star_category:starCategory })
    if(!data) return;
    const {page, totalCount, totalPage } = data.page_info
    talentList = talentList.concat(data.list)
    setList(talentList)
    if(totalCount > 50 && nextPage < totalPage) {
      setTimeout(() => {
        search(page + 1)
      }, 2000)
    } else {
      const list = talentList.map(item => {
        item.aweme_digg_follower_ration = item.aweme_digg_follower_ration + '%'
        return item
      })
      setIds(talentList.map(item => item.unique_id))
      const fileName = starCategory ?`关于【${starCategory}】达人列表.xlsx` : '达人列表.xlsx'
      exportExcel(header, list, fileName);
      setLoading(true)
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
      <Table dataSource={list} columns={header} />
      </div>
      <div style={{marginTop: 24,width: 500}}>
        <h3>抖音IDS</h3>
        <div style={{marginTop: 24,width: 500,display: 'flex', flexDirection: 'column'}}>
        </div>
      </div>
    </div>
}

export default TalentSearch
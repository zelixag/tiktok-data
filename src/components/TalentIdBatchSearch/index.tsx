import { Button, Input, Table } from "antd"
import React, { useEffect, useState } from "react"
import { getTalentList } from "../../services/talentServices"
import { exportExcel } from "../../utils/excel"
const header = [
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
  const [keywords, setKeywords] = useState('')
  const [loading, setLoading] = useState(true)
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
  let talentList: any[] = []
  const search = async (index:number) => {
    setLoading(false)
    const kwArray = keywords.includes(',')?keywords.replace(/' '/g, '').split(','):[keywords]
    if(index < kwArray.length) {
      const talentInfo = await getTalentList({...searchParams, keyword: kwArray[index]})
      talentList.push(talentInfo.list[0])
      setList(list => list.concat(talentList))
      setTimeout(() => {
        search(index + 1)
      }, 500);
    } else {
      const list = talentList.map(item => {
        item.aweme_digg_follower_ration = item.aweme_digg_follower_ration + '%'
        return item
      })
      exportExcel(header, list, '达人信息.xlsx');
      setLoading(true)
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
        }}>{loading ? '导出表格': '请稍等一会儿，表格制作中'}</Button>
      </div>
      <div style={{marginTop: 24}}>
        <h3>预览表格</h3>
      <Table dataSource={list} columns={header} />
      </div>
    </div>
}

export default TalentSearch
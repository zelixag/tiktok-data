export const productHeaders = [
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
  dataIndex: 'duration_volume',
  key: 'duration_volume',
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
]

export const talentHeaders = [
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
      title: '近30天直播场次',
      dataIndex: 'month_live_count',
      key: 'month_live_count',
      className: 'text-monospace',
  },
  {
      title: '粉丝增量',
      dataIndex: 'follower_incr',
      key: 'follower_incr',
      className: 'text-monospace',
  }]
import React, { useEffect, useState } from "react";
import {
  getProductCategory,
  getProductList,
} from "../../services/productServices";
import { exportExcel } from "../../utils/excel";
import "./index.less";
import { Button, Cascader, Input, InputNumber, Select, Table } from "antd";
import { awemeHeaders, productHeaders } from "../../utils/tableHeader";
import { getAwemeList, getAwemeProductList } from "../../services/videoService";
import { getStarCategory } from "../../services/talentServices";
import dayjs from "dayjs";
const timeRange = [
  { label: "6小时", value: "6h" },
  { label: "12小时", value: "12h" },
  { label: "24小时", value: "24h" },
  { label: "近3天", value: "3d" },
  { label: "近7天", value: "7d" },
  { label: "近15天", value: "6h" },
  { label: "近30天", value: "30d" },
  { label: "近90天", value: "90d" },
];
const followerRange = [
  { label: "不限", value: "" },
  { label: "<1万", value: "0-10000" },
  { label: "1万~10万", value: "10000-100000" },
  { label: "10万-100万", value: "100000-1000000" },
  { label: "100万~500万", value: "1000000-5000000" },
  { label: "500万~1000万", value: "5000000-10000000" },
  { label: ">1000万", value: "100000000-" },
];
function ProductExcel() {
  const [pList, setPList] = useState<any[]>([]);
  const [maxCount, setMaxCount] = useState<number>(50);
  const [keyword, setKeyword] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState<any>({
    gender_type: -1,
    age_type: undefined,
    province: undefined,
    page: 1,
    star_category: undefined,
    star_sub_category: undefined,
    keyword: "",
    digg: undefined,
    follower_count: "10000-100000",
    duration: undefined,
    sort: "digg_count",
    time: "30d",
    size: 100,
    goods_relatived: 1,
    fans_hottest: 0,
    filter_delete: 1,
    order_by: "desc",
  });
  const [category, setCategory] = useState<any[]>([]);

  let list: any[] = [];
  let isExcel = true;
  useEffect(() => {
    (async () => {
      const starCategory = await getStarCategory();
      setCategory(starCategory);
    })();
  }, []);
  const search = async (nextPage: number) => {
    loading && setLoading(false);
    let data = await getAwemeList({ ...params, page: nextPage });
    if (!data) return;
    const { page, totalCount, totalPage } = data.page_info;
    list = list.concat(
      data.list.map((item: any) => {
        const { author_info, aweme_info } = item;
        const { author_id, nickname, signature, unique_id } = author_info;
        const {
          aweme_title,
          update_time,
          share_count,
          download_count,
          digg_count,
          aweme_id,
          comment_count,
        } = aweme_info;
        return {
          aweme_id,
          author_id,
          nickname,
          signature,
          unique_id,
          aweme_title,
          update_time,
          comment_count,
          share_count,
          download_count,
          digg_count,
        };
      })
    );
    console.log(list);
    const awemeIds = list.map((item) => item.aweme);
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      const data = await getAwemeProductList({
        aweme_id: element.aweme_id,
        start_time: dayjs(),
        end_time: dayjs().subtract(90, "day"),
      });
      const {
        title,
        final_price,
        tb_max_commission_rate,
        estimated_commission,
      } = data[0].product;
      const { amount, volume } = data[0];
      list[index] = {
        ...element,
        title,
        final_price,
        tb_max_commission_rate,
        estimated_commission,
        amount,
        volume,
      };
    }
    setPList(list);
    // 总条数大于50，分页等于总页数，则停止搜索
    if (list.length <= maxCount && maxCount < totalCount) {
      // 模仿人操作，不然递归太快，会被识别成机器人
      if (totalCount > 50 && nextPage < totalPage) {
        const timer = setTimeout(() => {
          search(page + 1);
          clearTimeout(timer);
        }, 500);
      }
    } else {
      if (isExcel) {
        setLoading(true);
        isExcel = false;
        const productList = list.map((item: any) => {
          item.estimated_commission = item.estimated_commission + "%";
          item.duration_product_rate = item.duration_product_rate + "%";
          return item;
        });
        const fileName = keyword
          ? `关于【${keyword}】商品列表.xlsx`
          : "商品列表.xlsx";
        exportExcel(awemeHeaders, productList, fileName);
      }
    }
  };
  return (
    <div className="product_excel">
      <h3>商品视频Excel生成</h3>
      <div className="form-select-day form-item">
        <span>关键字:</span>
        <Input
          style={{ width: 280, marginRight: 8 }}
          placeholder="请输入商品链接、标题或者关键词"
          onChange={(event) => {
            setKeyword(event.target.value);
            setParams((params: any) => {
              return { ...params, keyword: event.target.value };
            });
          }}
        ></Input>
      </div>
      <div className="search-form">
        <div className="form-select-day form-item">
          <span>搜索条数:</span>
          <Input
            style={{ width: 90, marginRight: 8 }}
            defaultValue={100}
            placeholder="请输入最大条数"
            onChange={(event) => {
              setMaxCount(+event.target.value);
            }}
          ></Input>
        </div>
        <div className="form-select-day form-item">
          <span>排序:</span>
          <Select
            onChange={(value) => {
              setParams((params: any) => {
                return { ...params, sort: value };
              });
            }}
            style={{ width: 140, marginRight: 8 }}
            options={[
              { value: "digg_count", label: "点赞数排序" },
              { value: "comment_count", label: "评论数排序" },
              { value: "share_count", label: "转发数排序" },
            ]}
            defaultValue={"digg_count"}
          ></Select>
          天
        </div>
        <div className="form-select-day form-item">
          <span>时间:</span>
          <Select
            onChange={(value) => {
              setParams((params: any) => {
                return { ...params, day_type: value };
              });
            }}
            style={{ width: 90, marginRight: 8 }}
            options={timeRange}
            defaultValue={30}
          ></Select>
          天
        </div>
        <br />
        <div className="form-select-day form-item">
          <span>粉丝数:</span>
          <Select
            onChange={(value) => {
              setParams((params: any) => {
                return { ...params, day_type: value };
              });
            }}
            style={{ width: 120, marginRight: 8 }}
            options={followerRange}
            defaultValue={""}
          ></Select>
          天
        </div>
        <br />
        <div className="form-select-day form-item">
          <span>分类:</span>
          <Cascader
            changeOnSelect
            fieldNames={{
              label: "cat_name",
              value: "id",
              children: "sub_categories",
            }}
            options={category}
            style={{ width: 280, marginRight: 8 }}
            placeholder="请输入商品链接、标题或者关键词"
            onChange={(value: any) => {
              setParams((params: any) => {
                return {
                  ...params,
                  star_category: value[0],
                  star_sub_category: value[1],
                };
              });
            }}
          ></Cascader>
        </div>
        <Button
          loading={!loading}
          type="primary"
          onClick={() => {
            search(1);
          }}
        >
          {loading
            ? "导出表格"
            : `请稍等一会儿，表格已经完成${(pList.length / maxCount) * 100}%`}
        </Button>
      </div>
      <div style={{ marginTop: 24 }}>
        <h3>预览表格</h3>
        <Table dataSource={pList} columns={awemeHeaders} />
      </div>
    </div>
  );
}

export default ProductExcel;

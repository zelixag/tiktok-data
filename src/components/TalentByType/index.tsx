import { Button, Cascader, Input, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { getProductCategory } from "../../services/productServices";
import {
  getAwemeOverview,
  getStarCategory,
  getTalentInfo,
  getTalentList,
  getTalentLiveOverview,
  productAnalysis,
} from "../../services/talentServices";
import { exportExcel } from "../../utils/excel";
import {
  talentBaseInfoHeaders,
  talentBuyProductHeaders,
  talentHeaders,
} from "../../utils/tableHeader";
const MAX_COUNT = 100;
const TalentSearch = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<any[]>([]);
  const [talentBuyProductList, setTalentBuyProductList] = useState<any[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [starCategory, setStarCategory] = useState<string>("");
  const [categoryv, setCategoryv] = useState<string>("");
  const [starCategoryList, setStarCategoryList] = useState<any[]>([]);
  const [maxCount, setMaxCount] = useState<number>(MAX_COUNT);
  const [searchParams, setSearchParams] = useState<any>({
    page: 1,
    reputation_level: -1,
    star_category: undefined,
    star_sub_category: undefined,
    goods_cat: undefined,
    keyword: undefined,
    gender: -1,
    age: undefined,
    fans_gender: -1,
    fans_age: undefined,
    follower_count: undefined,
    product_platform: undefined,
    province: undefined,
    fans_province: undefined,
    contact: 0,
    is_commerce: 0,
    is_live: 0,
    is_sell_live: 0,
    is_star_author: 0,
    is_low_fans_high_gmv: 0,
    is_brand_self_author: 0,
    is_shop_author: 0,
    verification_type: 0,
    sort: "follower_count",
    order_by: "desc",
    size: 100,
    similar_author_id: undefined,
  });
  const [category, setCategory] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const starCategory = await getStarCategory();
      const productCategory = await getProductCategory("all");
      setCategory(productCategory);
      setStarCategoryList(starCategory);
    })();
  }, []);
  let talentList: any[] = [];
  const search = async (nextPage: number) => {
    setLoading(false);
    let data = await getTalentList({ ...searchParams, page: nextPage });
    if (!data) return;
    const { page, totalCount, totalPage } = data.page_info;
    !total && setTotal(totalCount);
    talentList = talentList.concat(data.list);
    setList(talentList);
    if (totalCount === 0) {
      setLoading(true);
      return;
    }
    if (
      totalCount > 50 &&
      nextPage < totalPage &&
      talentList.length <= maxCount
    ) {
      setTimeout(() => {
        search(page + 1);
      }, 1000);
    } else if (
      (talentList.length > 0 && talentList.length === total) ||
      talentList.length >= maxCount
    ) {
      setLoading(true);
      const fileName =
        starCategory || categoryv
          ? `关于【${starCategory}${
              categoryv ? "/" + categoryv : ""
            }】达人列表.xlsx`
          : "达人列表.xlsx";
      exportExcel(talentBaseInfoHeaders, talentList, fileName);
    }
  };
  return (
    <div>
      <h3>类型搜索搜索达人信息</h3>
      <div className="search-form">
        <div className="form-select-day form-item">
          <span>搜索条数:</span>
          <Input
            style={{ width: 90, marginRight: 16 }}
            defaultValue={MAX_COUNT}
            placeholder="请输入最大条数"
            onChange={(event) => {
              setMaxCount(+event.target.value);
            }}
          ></Input>
        </div>
        <div className="form-select-day form-item">
          <span>排序:</span>
          <Select
            options={[
              { label: "粉丝增量", value: "inc_follower" },
              {
                label: "近30日直播场均销售额",
                value: "live_average_amount_30",
              },
            ]}
            style={{ width: 180, marginRight: 16 }}
            onChange={(value: any) => {
              setSearchParams((params: any) => {
                return { ...params, sort: value };
              });
            }}
          ></Select>
        </div>
        <div className="form-select-day form-item">
          <span>选择分类:</span>
          <Cascader
            changeOnSelect
            fieldNames={{
              label: "cat_name",
              value: "id",
              children: "sub_categories",
            }}
            options={starCategoryList}
            style={{ width: 180, marginRight: 16 }}
            placeholder="请输入商品链接、标题或者关键词"
            onChange={(value) => {
              setCategoryv(value.toString().replace(/,/g, "/"));
              setSearchParams((params: any) => {
                return {
                  ...params,
                  star_category: value[0],
                  star_sub_category: value[1],
                };
              });
            }}
          ></Cascader>
        </div>
        <div className="form-select-day form-item">
          <span>带货分类:</span>
          <Cascader
            changeOnSelect
            fieldNames={{
              label: "cat_name",
              value: "id",
              children: "sub_categories",
            }}
            options={category}
            style={{ width: 180, marginRight: 16 }}
            placeholder="请输入商品链接、标题或者关键词"
            onChange={(value) => {
              setStarCategory(value.toString().replace(/,/g, "/"));
              setSearchParams((params: any) => {
                return { ...params, goods_cat: value.toString() };
              });
            }}
          ></Cascader>
        </div>
        <Button
          loading={!loading}
          type="primary"
          onClick={() => {
            search(0);
          }}
        >
          {loading
            ? "导出表格"
            : `请稍等一会儿，表格已经完成${(
                (list.length / (maxCount > total ? total : maxCount)) *
                100
              ).toFixed(2)}%`}
        </Button>{" "}
        <span>总计: {total} </span>
      </div>
      <div style={{ marginTop: 24 }}>
        <h3>预览表格</h3>
        <Table dataSource={list} columns={talentBaseInfoHeaders} />
      </div>
    </div>
  );
};

export default TalentSearch;

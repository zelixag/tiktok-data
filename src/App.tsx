import { Collapse } from 'antd';
import React, { useEffect, useState } from 'react'
import './App.css'
import ProductExcel from './components/ProductExcel/index';
import TalentSearch from './components/TalentIdBatchSearch';
import { login } from './services/userServices';
const { Panel } = Collapse;
function App() {
  useEffect(() => {
    login();
  }, [])
  return (
    <div className="App">
      <Collapse defaultActiveKey={['1', '2', '3']} >
      <Panel showArrow={false} header="商品Excel导出" key="1">
        <ProductExcel />
      </Panel>
      <Panel  showArrow={false} header="基于ID号批量搜索达人信息导出" key="2">
        <TalentSearch />
      </Panel>
      <Panel showArrow={false} header="基于达人分类达人信息导出" key="3">

      </Panel>
    </Collapse>
    </div>
  )
}

export default App

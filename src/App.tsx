import { Collapse, Tabs } from 'antd';
import React, { useEffect, useState } from 'react'
import './App.css'
import ProductExcel from './components/ProductExcel/index';
import TalentByType from './components/TalentByType';
import TalentSearch from './components/TalentIdBatchSearch';
import { login } from './services/userServices';
const { Panel } = Collapse;
const { TabPane } = Tabs;
function App() {
  useEffect(() => {
    login();
  }, [])
  return (
    <div className="App">
      <h1>抖Data</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="数据导出" key="1">
        <Collapse defaultActiveKey={['1', '2', '3']} >
          <Panel showArrow={false} header="商品Excel导出" key="1">
            <ProductExcel />
          </Panel>
          <Panel  showArrow={false} header="基于ID号批量搜索达人信息导出" key="2">
            <TalentSearch />
          </Panel>
          <Panel showArrow={false} header="基于达人分类达人信息导出" key="3">
            <TalentByType/>
          </Panel>
        </Collapse>
        </TabPane>
        <TabPane tab="数据统计与分析" key="2">
          <div style={{width: '1440px'}}>
            <iframe id="chart1" height="300" style={{width: '100%'}} scrolling="no" title="" src="https://codepen.io/peiwen114/embed/vYZBLYL?default-tab=result" frameBorder="no" loading="lazy" allowTransparency={true} allowFullScreen={true}>
              See the Pen <a href=" ">
              </a > by peiwen (<a href="https://codepen.io/peiwen114">@peiwen114</a >)
              on <a href="https://codepen.io">CodePen</a >.
            </iframe>
          <iframe id="chart2" height="300" style={{width: '100%'}} scrolling="no" title="pic1" src="https://codepen.io/peiwen114/embed/YzQKwNW?default-tab=result" frameBorder="no" loading="lazy" allowTransparency={true} allowFullScreen={true}>
            See the Pen <a href=" ">
            pic1</a > by peiwen (<a href="https://codepen.io/peiwen114">@peiwen114</a >)
            on <a href="https://codepen.io">CodePen</a >.
          </iframe>
          <iframe  id="chart3" height="300" style={{width: '100%'}} scrolling="no" title="" src="https://codepen.io/peiwen114/embed/wvewMdp?default-tab=result" frameBorder="no" loading="lazy" allowTransparency={true} allowFullScreen={true}>
            See the Pen <a href=" ">
            </a > by peiwen (<a href="https://codepen.io/peiwen114">@peiwen114</a >)
            on <a href="https://codepen.io">CodePen</a >.
          </iframe>
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default App

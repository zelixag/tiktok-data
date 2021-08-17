function format(s: any, c: any) {
  return s.replace(/{(\w+)}/g, function (m, p) {
    return c[p];
  })
}
export default function json2Excel(jsonData: any) {
  let str = ''
  for (let i = 0; i < jsonData.length; i++) {
    str += '<tr>';
    for (const key in jsonData[i]) {
      // 增加\t为了不让表格显示科学计数法或者其他格式
      str += `<td>${jsonData[i][key] + '\t'}</td>`;
    }
    str += '</tr>';
  }
  // Worksheet名
  const worksheet = 'Sheet1'
  const uri = 'data:application/vnd.ms-excel;base64,';

  // 下载的表格模板数据
  const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
  xmlns:x="urn:schemas-microsoft-com:office:excel" 
  xmlns="http://www.w3.org/TR/REC-html40">
  <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
  <x:Name>${worksheet}</x:Name>
  <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
  </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
  </head><body><table>${str}</table></body></html>`;
  // 输出base64编码
  const base64 = (s: any) => window.btoa(unescape(encodeURIComponent(s)));
  const ctx = { worksheet: '这是' };
  // 下载模板
  if(document.getElementById("dlink")) {
    document.getElementById("dlink").href = uri + base64(format(template, ctx));
    document.getElementById("dlink").download = 'jxhd';//这里是关键所在,当点击之后,设置a标签的属性,这样就可以更改标签的标题了
    document.getElementById("dlink").click();
  }
  
}

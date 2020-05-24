import React from 'react';
import SuyaoMap from './../utils/SuyaoMap';



/**
 * 展示一个命星的星盘
 * @param {Object}} props 
 */
function SuyaoTable (props){
  // todo 输入一些关系，从命星的角度去观察
  const { star, relation } = props;
  let suyao = new SuyaoMap();
  let chart = suyao.getChart(star);

  let theadStyle = ["bg-blue-500", "bg-opacity-75", "text-gray-100"];

  return (
    <table
      className="table-auto text-center"
    >
      <thead
        className={theadStyle.join(' ')}
      >
        <tr>
          {
            chart.map(e => {
              let classNames = ["x-4", "py-2"];
              if(e.distance === '命'){
                classNames.push('bg-green-600')
              }
              return (
                <th key={e.star} className={classNames.join(' ')}>{e.star}</th>
              )
            })
          }
        </tr>
      </thead>
      <tbody
        className="bg-green-500 bg-opacity-25 "
      >
        <tr>
          {
            chart.map(e => {
              let classNames = ["bg-gray-100", "border", "x-4", "py-2"];
              if(e.secret === '命'){
                classNames.push('bg-green-600');
                classNames.push('text-gray-100');
              }
              if(['业', '胎'].includes(e.secret)){
                classNames.push('text-purple-600');
                // classNames.push('text-gray-100');
              }
              return (<td key={e.star} className={classNames.join(' ')} >{e.secret}</td>)
            })
          }
        </tr>
        <tr>
          {
            chart.map(e => {
              let classNames = ["border", "px-4", "py-2", 'bg-green-600'];
              if(e.distance === '命'){
                classNames.push('bg-green-600');
                classNames.push('text-gray-100');
              }
              if(e.distance === '近'){
                classNames.push("bg-opacity-75");
                // classNames.push('bg-green-700');
                classNames.push('text-gray-100');
              }
              if(e.distance === '中'){
                classNames.push("bg-opacity-50");
                // classNames.push('bg-green-400');
                classNames.push('text-gray-100');
              }
              if(e.distance === '远'){
                classNames.push("bg-opacity-25");
                // classNames.push('bg-blue-300');
                classNames.push('text-gray-100');
              }
              return (<td key={e.star} className={classNames.join(' ')} >{e.distance}</td>)
            })
          }
        </tr>
      </tbody>
    </table>
  )
}
export default SuyaoTable;
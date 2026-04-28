import React,{useState} from 'react';
import SuyaoMap from '../utils/SuyaoMap';
import SuyaoTable from "./SuyaoTable";
import SuayoCalendar from "./SuyaoCalendar";

function SimpleSuyaoChart(props){
  let suyao = new SuyaoMap();
  const [value, setValue] = useState('觜');
  let onSelectChange = (e) => {
    console.log('e', e);
    setValue(e.currentTarget.value);
  }

  let onTextChange = (e) => {
    console.log('e', e);
    let dateStr = e.currentTarget.value;
    console.log('dateStr', dateStr);
    if(dateStr.match(/^\d+-\d+$/)){
      console.log('matched', dateStr);
      
      let dateArr = dateStr.split('-');
      setValue(suyao.getStar(dateArr[0], dateArr[1]));
    }
  }
  return (
    <div className="App px-3 sm:px-6 py-4" >
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 sm:gap-4">
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">宿曜</label>
          <select
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={value}
            onChange={onSelectChange}
          >
            {
              suyao.getStarArray().map(star => {
                return (<option key={star} value={star} >{star}</option>)
              })
            }
          </select>
        </div>
        <div className="sm:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">农历</label>
          <input
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="4-2"
            inputMode="numeric"
            onChange={onTextChange}
          ></input>
        </div>
        <div className="sm:col-span-6">
          <div className="rounded-lg border border-gray-200 bg-white p-2 sm:p-4 shadow-sm">
            <SuyaoTable star={value} />
          </div>
        </div>
      </div>
      <div className="mt-4 sm:mt-6">
        <div className="rounded-lg border border-gray-200 bg-white p-2 sm:p-4 shadow-sm">
          <SuayoCalendar />
        </div>
      </div>
    </div>
  );
}

export default SimpleSuyaoChart;
import React,{useState} from 'react';
import SuyaoMap from '../utils/SuyaoMap';
import SuyaoTable from "./SuyaoTable";

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
    <div className="App" >
      <div className="grid grid-cols-6 gap-4">
        <div>
          <label>宿曜：</label>
          <select
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
        <div>
          <label>农历：</label>
          <input type="text" placeholder="4-2" onChange={onTextChange} ></input>
        </div>
        <div className="col-span-6">
          <SuyaoTable star={value} />
        </div>
      </div>
      
    </div>
  );
}

export default SimpleSuyaoChart;
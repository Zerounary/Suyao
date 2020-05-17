import React,{useState} from 'react';
import './App.css';
import './tailwind.min.css'
import SuyaoMap from './utils/SuyaoMap';
import SuyaoTable from "./components/SuyaoTable";


function App() {
  let suyao = new SuyaoMap();
  const [value, setValue] = useState('觜');
  let onChange = (e) => {
    console.log('e', e);
    setValue(e.currentTarget.value);
  }
  return (
    <div className="App" >
      <select
        value={value}
        onChange={onChange}
      >
        {
          suyao.getStarArray().map(star => {
            return (<option key={star} value={star} >{star}</option>)
          })
        }
      </select>
      <SuyaoTable star={value} />
    </div>
  );
}

export default App;

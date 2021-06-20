import React,{useState} from 'react';
import './App.css';
import './tailwind.min.css'
import Divide from "./components/hanyu/Divide";
import SimpleSuyaoChart from "./components/SimpleSuyaoChart";
import { useRequest } from '@umijs/hooks';


function App() {
  return (
    <SimpleSuyaoChart />
  )
}

export default App;

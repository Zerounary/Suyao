import React, { useState } from "react";
import SuyaoMap from "./../utils/SuyaoMap";
import lunar from "lunar";
import moment from "moment";
import { getZangli } from '../utils/zangli'

/**
 * 展示一日的宿曜日历
 * @param {Object} props
 */
function SuyaoDayCell(props) {
  const [todayInfoIndex, setShowTodayInfo] = useState(0);
  const TODAY_INFO_NUM = 3
  const { date } = props;
  let suyao = new SuyaoMap();
  const lunarDate = lunar(date);
  const nowDate = lunar(new Date())
  console.log("🚀 ~ file: SuyaoCalendar.js ~ line 15 ~ SuyaoDayCell ~ nowDate", nowDate)
  console.log("🚀 ~ file: SuyaoCalendar.js ~ line 14 ~ SuyaoDayCell ~ lunarDate", lunarDate)
  let zl = getZangli(date)
  console.log(`🚀 ~ ${date} SuyaoDayCell ~ zl:`, zl)
  let extraInfo = zl.extraInfo
  let extraInfo2 = zl.extraInfo2
  let star = suyao.getStar(lunarDate.month + 1, lunarDate.day);
  let todayClass = '#000';
  if(lunarDate.year === nowDate.year && lunarDate.month === nowDate.month && lunarDate.day === nowDate.day){
    todayClass = '#f00';
  }
  if(extraInfo) {
    todayClass = '#00f';
  }
  const showTodayInfo = () => {
    setShowTodayInfo((todayInfoIndex + 1) % TODAY_INFO_NUM);
  }
  console.log("🚀 ~ file: SuyaoCalendar.js ~ line 39 ~ SuyaoDayCell ~ todayClass", todayClass)
  let todayInfo = ''
  console.log('todayInfoIndex', todayInfoIndex);
  if (todayInfoIndex === 2) {
    todayInfo = (
      <div className=" absolute top-0 right-0 bg-white">
        <div>{extraInfo}</div>
        <div>{extraInfo2}</div>
      </div>
    )
  } else if(todayInfoIndex === 1) {
    let [dayName, isNice, godName, niceTime ] = suyao.getGodName(lunarDate.day)
    todayInfo = (
      <div className=" absolute w-full top-0 right-0 bg-white text-center">
        <div>{dayName} {isNice}</div>
        <div>{godName}</div>
        <div>{niceTime}</div>
      </div>)
  }
  return (
    <div className="border p-3 block w-24 h-24 text-center relative" onClick={showTodayInfo}>
      <p>
        <span style={{ fontSize: "18px", color: todayClass }}>{lunarDate.toDate().getDate()}</span>
        <br />
        <span style={{ fontSize: "12px", color: todayClass}}>
          {lunarDate.day == 1 ? lunarDate.format('M') : lunarDate.format('D')}
        </span>
        <br />
        <span style={{ fontSize: "12px", color: todayClass }}>
          {star}
        </span>
      </p>
      {
        todayInfo
      }
    </div>
  );
}

function yearOptions() {
  let arr = [];
  for (let year = 1900; year <= 2050; year++) {
    arr.push(year);
  }
  return arr;
}

function monthOptions() {
  let arr = [];
  for (let month = 0; month < 12; month++) {
    arr.push(month);
  }
  return arr;
}

function SuyaoCalendar(props) {
  const [startDay, setStartDay] = useState(
    moment()
  );
  const [currentYear, setCurrentYear] = useState(startDay.format('YYYY'));
  const [currentMonth, setCurrentMonth] = useState(startDay.format('M')-1);
  let onYearChange = (e) => {
    let year = e.currentTarget.value;
    let newStartDay = moment(startDay).year(year);
    setCurrentYear(year);
    setStartDay(newStartDay)
  };
  let onMonthChange = (e) => {
    let month = e.currentTarget.value;
    let newStartDay = moment(startDay).month(month);
    setCurrentMonth(month);
    setStartDay(newStartDay)
  };
  let renderDay = moment(startDay).startOf("month").startOf("week");
  console.log(renderDay.format("YYYYMMDD"))
  console.log('currentYear', currentYear);
  console.log('currentMonth', currentMonth);
  return (
    <div>
      <div>
        <select
            value={currentYear}
            onChange={onYearChange}
          >
            {
              yearOptions().map(year => {
                return (<option key={year} value={year} >{year}年</option>)
              })
            }
          </select>
          <select
            value={currentMonth}
            onChange={onMonthChange}
          >
            {
              monthOptions().map(month => {
                return (<option key={month} value={month} >{month+1}月</option>)
              })
            }
          </select>
      </div>
      <div className="grid grid-cols-7 divide-x divide-green-200" style={{ width: "42rem" }}>
        {["一", "二", "三", "四", "五", "六", "日"].map((e) => {
          return <div className="text-center bg-blue-500 text-white" style={{ width: "6rem" }}>{e}</div>;
        })}
        {new Array(6 * 7).fill("").map((e) => {
          renderDay.add(1, "days");
          return <SuyaoDayCell date={renderDay.toDate()} />;
        })}
      </div>
    </div>
  );
}
export default SuyaoCalendar;

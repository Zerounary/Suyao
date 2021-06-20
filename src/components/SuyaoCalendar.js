import React, { useState } from "react";
import SuyaoMap from "./../utils/SuyaoMap";
import Calendar from "@z-yue/calendar";
import moment from "moment";

/**
 * 展示一日的宿曜日历
 * @param {Object} props
 */
function SuyaoDayCell(props) {
  const { date } = props;
  let suyao = new SuyaoMap();
  const calendar = new Calendar(date);
  const { lunar } = calendar;
  let star = suyao.getStar(lunar.month, lunar.date);
  return (
    <div className="border p-3 block w-24 h-24 text-center">
      <p>
        <span style={{ fontSize: "18px" }}>{calendar.date}</span>
        <br />
        <span style={{ fontSize: "12px" }}>
          {lunar.date == 1 ? lunar.lunarMonth : lunar.lunarDate}
        </span>
        <br />
        <span style={{ fontSize: "12px" }}>
          {star}
        </span>
      </p>
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

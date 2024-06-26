// TODO 各类统计数据
// 12 月 星座
// 27 日宿
// 三九秘宿 
// 七曜
// 宿曜一起的 日子
// 黑白月分吉凶
// 农历日 分吉凶

class SuyaoMap {
  constructor(){
    this.stars  = Array.from("角亢氐房心尾箕斗女虚危室壁奎娄胃昂毕觜参井鬼柳星张翼轸");
    this.keys = Array.from("翼角氐心箕女室娄昂觜鬼星"); // 月名
    this.map = this.keys.map((key, i) => {
      return this.renderMap(key);
    });
    this.god = [
      ['建名日', '○', '梵天下'],
      ['得财日', ' ', '造化神下'],
      ['威力日', '○', '那罗延天下'],
      ['猛武日', '●', '阎罗王下', '夜凶恶时'],
      ['圆满日', '○', '月天子下'],
      ['求名日', '●', '魔罗神下'],
      ['友朋日', '○', '北斗天下'],
      ['力战日', ' ', '婆娑善神下', '日凶恶时'],
      ['凶猛日', '●', '毗舍阇鬼王下'],
      ['善法日', '○', '善法神下'],
      ['慈猛日', ' ', '自在天下', '夜凶恶时'],
      ['名闻日', '○', '日天子下'],
      ['最胜日', '●', '大魔王下'],
      ['勇猛日', '○', '药叉大将下'],
      ['吉祥日', ' ', '魂灵神下', '日凶恶时'],
      ['建名日', '○', '梵天下'],
      ['得财日', ' ', '造化神下'],
      ['威力日', '○', '那罗延天下', '夜凶恶时'],
      ['猛武日', ' ', '阎罗王下'],
      ['圆满日', '○', '月天子下'],
      ['求名日', '●', '魔罗神下'],
      ['友朋日', ' ', '北斗天下', '白凶恶时'],
      ['力战日', '○', '婆娑善神下'],
      ['凶猛日', '●', '毗舍阇鬼王下'],
      ['善法日', ' ', '善法神下', '夜凶恶时'],
      ['慈猛日', '○', '自在天下'],
      ['名闻日', '○', '日天子下'],
      ['最胜日', '●', '大魔王下'],
      ['勇猛日', '○', '药叉大将下', '日凶恶时'],
      ['吉祥日', ' ', '魂灵神下'],
    ]
    this.zhai = {
      1: '斋',
      8: '斋',
      14: '斋',
      15: '斋',
      18: '斋',
      23: '斋',
      24: '斋',
      28: '斋',
      29: '斋',
      30: '斋',
    }
  }
  /**
   * 根据月名返回当宿曜月历
   * @param {String} key 
   */
   renderMap(star) {
    let starIndex = this.stars.findIndex(e => e === star);
    let len = 14;
    let m = new Array(30);

    m[14] = star;
    for(let i = 0; i < len; i++){
      m[13-i] = this.stars[(starIndex-i-1+27)%27];
    }
    len = 15;
    for(let i = 0; i < len; i++) {
      //把十五以后的填充好
      m[15+i] = this.stars[(starIndex+i+1)%27];
    }
    return m;
  }

  /***
   * 通过农历年月，获取命宿
   * @param {Integer} month 
   * @param {Integer} day 
   */
  getStar = (month, day) => {
    if(isNaN(month) || isNaN(day) || month < 0 || day < 0){
      console.error(`SuyaoMap.getStar error: month is ${month}, day is ${day}`);
      return null;
    }
    return this.map[month-1][day-1]
  }
  
  /**
   * 获取某个星宿的星盘
   * @param {CharacterData} star
   */
  getChart = (star) => {
    let chart = new Array(27);
    let index = this.stars.indexOf(star);
    for(let i = 0 ; i < this.stars.length; i++){
      chart[(i+27+13-index)%27] = this.stars[i];
    }

    let secrets = ['成','坏','友','亲','胎','荣','衰','安','危','成','坏','友','亲','命', '荣','衰','安','危','成','坏','友','亲','业','荣','衰','安','危'];
    chart = chart.map((star,index) => {
      return {
        star,
        secret: secrets[index]
      }
    });
    let distances = ['远','远','远','远','远','中','中','中','中','近','近','近','近','命','近','近','近','近','中','中','中','中','远','远','远','远','远']
    chart = chart.map((star, index) => {
      return {
        ...star,
        distance: distances[index]
      }
    })
    return chart;
  }

  getStarArray = () => {
    return this.stars;
  }

  getGodName = (day) => {
    return this.god[day-1]
  }
  
  getZhaiName = (day) => {
    return this.zhai[day-1] || ''
  }

}



export default SuyaoMap;
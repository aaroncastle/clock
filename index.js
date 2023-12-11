/**
 * @CreateTime: 2023/12/10 15:51
 * @Project: clock
 * @Author: aaroncastle
 * @GitHub: https://github.com/aaroncastle/clock
 */

const monthText = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],

    dayText = ['一号', '二号', '三号', '四号', '五号', '六号', '七号', '八号', '九号', '十号', '十一号', '十二号', '十三号', '十四号', '十五号', '十六号', '十七号', '十八号', '十九号', '二十号', '二十一号', '二十二号', '二十三号', '二十四号', '二十五号', '二十六号', '二十七号', '二十八号', '二十九号', '三十号', '三十一号'],

    weekText = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],

    hourText = ['零时', '一时', '二时', '三时', '四时', '五时', '六时', '七时', '八时', '九时', '十时', '十一时', '十二时', '十三时', '十四时', '十五时', '十六时', '十七时', '十八时', '十九时', '二十时', '二十一时', '二十二时', '二十三时'],

    minuteText = ['零分', '一分', '二分', '三分', '四分', '五分', '六分', '七分', '八分', '九分', '十分', '十一分', '十二分', '十三分', '十四分', '十五分', '十六分', '十七分', '十八分', '十九分', '二十分', '二十一分', '二十二分', '二十三分', '二十四分', '二十五分', '二十六分', '二十七分', '二十八分', '二十九分', '三十分', '三十一分', '三十二分', '三十三分', '三十四分', '三十五分', '三十六分', '三十七分', '三十八分', '三十九分', '四十分', '四十一分', '四十二分', '四十三分', '四十四分', '四十五分', '四十六分', '四十七分', '四十八分', '四十九分', '五十分', '五十一分', '五十二分', '五十三分', '五十四分', '五十五分', '五十六分', '五十七分', '五十八分', '五十九分'],

    secondText = ['零秒', '一秒', '二秒', '三秒', '四秒', '五秒', '六秒', '七秒', '八秒', '九秒', '十秒', '十一秒', '十二秒', '十三秒', '十四秒', '十五秒', '十六秒', '十七秒', '十八秒', '十九秒', '二十秒', '二十一秒', '二十二秒', '二十三秒', '二十四秒', '二十五秒', '二十六秒', '二十七秒', '二十八秒', '二十九秒', '三十秒', '三十一秒', '三十二秒', '三十三秒', '三十四秒', '三十五秒', '三十六秒', '三十七秒', '三十八秒', '三十九秒', '四十秒', '四十一秒', '四十二秒', '四十三秒', '四十四秒', '四十五秒', '四十六秒', '四十七秒', '四十八秒', '四十九秒', '五十秒', '五十一秒', '五十二秒', '五十三秒', '五十四秒', '五十五秒', '五十六秒', '五十七秒', '五十八秒', '五十九秒'];

    let lock = false;


const monthDom = [], dayDom = [], weekDom = [], hourDom = [], minuteDom = [], secondDom = []
const allText = Array.of( [monthText, monthDom], [dayText, dayDom], [weekText, weekDom], [hourText, hourDom], [minuteText, minuteDom], [secondText, secondDom] )

class Clock {
    static init() {
        const clock = document.getElementsByClassName( 'clock' )[0];
        allText.forEach( item => {
            item[0].forEach( it => {
                const dom = this.createEle( it )
                clock.appendChild( dom )
                item[1].push( dom )
            } )
        } )
    }

    static createEle(text) {
        const element = document.createElement( 'div' )
        element.classList.add( 'label' )
        element.innerText = text
        return element;
    }

    static getCurrentTime() {
        const now = new Date();
        const month = now.getMonth(),
            day = now.getDate() - 1,
            week = now.getDay(),
            hour = now.getHours(),
            minute = now.getMinutes(),
            second = now.getSeconds()
        const time = [month, day, week, hour, minute, second]

        time.forEach( (item,i) => {
            allText[i][1].forEach(item => item.classList.remove('current'))
            allText[i][1][item].classList.add('current')
        })

        return time;
    }
    static changePosition(){
        allText.forEach( (item,index) => {
          item[1].forEach(ele => {
              const offsetX = ele.offsetLeft,offsetY = ele.offsetTop
              setTimeout(() => {
                  ele.style.position = 'absolute';
                  ele.style.left = `${offsetX}px`;
                  ele.style.top = `${offsetY}px`;
              },50)
          })
        })
    }
    static moveElementCoordinate() {
        const width = document.documentElement.clientWidth/2,height = document.documentElement.clientHeight/2;
        const clientMin = Math.min(width,height);
        // 得到月、日、周、时、分、秒的最长字符串的长度
        const maxSet = allText.reduce((previous,item) => {
            previous.push(Math.max(...item[0].map(it => it.length)))
            return previous
        },[])
        // 求出半径内排列元素的最小间距
        const minSpace = (clientMin - maxSet[maxSet.length - 1]*16 - maxSet.reduce((previous,item) => previous + item,0) * 16) / maxSet.length
        allText.forEach( (item,index) => {
            const time = this.getCurrentTime()
            item[1].forEach((ele,i) => {
                const deg = 360 / item[0].length * (i - time[index]) ;
                const r =  minSpace * (index + 1) + maxSet[index] * 16 * index,
                    x = Math.sin(Math.PI/180 * deg ) * r + width,
                    y = Math.cos(Math.PI/180 * deg ) * r + height;
                ele.style.position = 'absolute'
                ele.style.left = `${x}px`;
                ele.style.top = `${y}px`;
                ele.style.transform = `rotate(${90 - deg}deg)`;
                ele.style.color = `hsl(${deg},100%,50%)`
                if (Object.is( i, time[index] )) {
                    ele.style.color = '#fff'
                }
            })
        })
        document.getElementsByClassName('clock')[0].style.transform = 'rotate(-90deg)'
    }
}


window.onload = function () {
    Clock.init()

    if (!lock) {
        Clock.changePosition()
        setTimeout(() => {
            setInterval(() => {
                Clock.moveElementCoordinate()
                lock = true
            },200)
        },2000)
    }
    setInterval( () => {
        Clock.getCurrentTime()
    }, 100 )
}

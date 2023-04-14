<script>
export default {
    name: "kaza-cals",

}
</script>
<script setup>
import { onMounted, ref, computed, TransitionGroup, onUpdated } from 'vue';
// import kazatodo from './kazaTodoCard.vue';
const props = defineProps({
    data: Object,
})
const calsyymmdd = ref(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`)
const getCalsyymmdd = () => {
    return calsyymmdd.value
}

const currentDate = new Date()
const today = ref(currentDate.getDate())
const Month = ref(currentDate.getMonth() + 1)
const Year = ref(currentDate.getFullYear())
const dayInMonth = computed(() => {
    let res = new Date(Year.value, Month.value, 0).getDate()
    return res
})
const firstDayOfMonth = computed(() => {
    return new Date(Year.value, Month.value - 1, 1).getDay()
})
const days = computed(() => {
    const dayArr = []
    const monthArr = []
    const yearArr = []
    const prevYear = Year.value - 1
    const nextYear = Year.value + 1
    const prevMonth = Month.value - 1 < 1 ? 12 : Month.value - 1
    const nextMonth = Month.value + 1 > 12 ? 1 : Month.value + 1
    const prevMonthDays = new Date(Year.value, prevMonth, 0).getDate()
    const nextMonthDays = new Date(Year.value, nextMonth, 0).getDate()
    // console.log(prevMonth)
    for (let i = 1; i < dayInMonth.value + 1; i++) {
        dayArr.push(i)
        monthArr.push(Month.value)
        yearArr.push(Year.value)
    }
    for (let i = 0; i < firstDayOfMonth.value - 1; i++) {
        dayArr.unshift(prevMonthDays - i)
        monthArr.unshift(prevMonth)
        // yearArr.unshift(Year.value)
        if (Month.value - 1 < 1) {
            yearArr.push(prevYear)
        } else {
            yearArr.push(Year.value)
        }

    }
    // console.log(42 - dayInMonth.value - firstDayOfMonth.value -1)
    for (let i = 1; i < 42 - dayInMonth.value - firstDayOfMonth.value + 2; i++) {
        dayArr.push(i)
        monthArr.push(nextMonth)
        // yearArr.push(Year.value)
        if (Month.value + 1 > 12) {
            yearArr.push(nextYear)
        } else {
            yearArr.push(Year.value)
        }
    }

    dayArr.length = 42
    monthArr.length = 42
    yearArr.length = 42


    return {
        day: dayArr,
        month: monthArr,
        year: yearArr
    }
})



const cals = ref(null)
const show = () => {
    return cals.value
}

const monthCheck = () => {
    if (Month.value > 12) {
        Month.value = 1
        Year.value += 1
    } else if (Month.value < 1) {
        Month.value = 12
        Year.value -= 1
    }
}

const prev = () => {
    Month.value--
    monthCheck()
}

const next = () => {

    Month.value++
    monthCheck()
}
const reset = () => {

    Month.value = currentDate.getMonth() + 1
    Year.value = currentDate.getFullYear()
}

const daySelected = ref(Year.value + "-" + Month.value + "-" + today.value)
const getDaySelected = () => {
    return daySelected.value
}

function eMonitor() {
    let res = cals.value
    // console.log(cals.value.length)
    res.forEach((item, index) => {
        item.classList.remove('hastodo')
        item.classList.remove('hastodo02')
        item.classList.remove('hastodo03')

        let temp = ''
        let year = item.getAttribute('year')
        let month = item.getAttribute('month')
        let day = item.getAttribute('day')
        temp = year + "-" + month + "-" + day
        // 遍历props.data，如果temp等于item，就将对应的日期的待办事项数量添加到对应的日期上
        Object.keys(props.data).forEach(item => {
            if (temp === item) {
                // 如果temp等于item，就将对应的日期的待办事项数量添加到对应的日期上
                if (props.data[temp].todo.length <= 2) {
                    res[index].classList.add('hastodo02')
                } else if (props.data[temp].todo.length <= 8) {
                    res[index].classList.add('hastodo03')
                } else {
                    res[index].classList.add('hastodo')
                }

            }
        })

    })
}



defineExpose({
    // 当前选中的日期
    daySelected,
    // 是否显示
    show,
    // 下一个月
    nextMonth() {
        Month.value++
        monthCheck()
    },
    // 上一个月
    prevMonth() {
        Month.value--
        monthCheck()
    },
    // 重置
    reset() {
        Month.value = currentDate.getMonth() + 1
        Year.value = currentDate.getFullYear()
    },
    eMonitor//外部更新待办事项数量
})

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const mouseSelected = ref('today')


const emit = defineEmits(["clickItem"]);
// 添加鼠标选中日期的自动更新
const clickauto = (data) => {
    const index = data.indexOf('-')
    mouseSelected.value = data.substring(index + 1)
    calsyymmdd.value = data
}

// 添加鼠标选中日期的自动更新
const clickItem = (data) => {
    clickauto(data) // 鼠标选中日期的自动更新
    emit("clickItem", data) // 触发clickItem事件
}
// const calsHeight = ref(getHeight())

const getHeight = () => {
    let calsmaintop = document.querySelector('.calsmain').parentNode
    console.log(Number(calsmaintop.offsetHeight) * .8)
    let res = String(Number(calsmaintop.offsetHeight) * .8)
//获取父级元素的高度
    // let calsmainHeight = calsmain.offsetHeight
    return res  + 'px'
}

// 这段代码用于让一个 div 宽度变成其父级 div 宽度的 20%
// calsmaintop 是父级 div
// res 是子 div 的宽度
// 三元运算符用于确保子 div 至少是 200px 宽

const getWidth = () =>{
    let calsmaintop = document.querySelector('.calsmain').parentNode
    // console.log(Number(calsmaintop.offsetWidth) * .2)
    let res = String(Number(calsmaintop.offsetWidth) * .2) < 200 ? 200 : String(Number(calsmaintop.offsetWidth) * .2)
    return res + 'px'
}

const getTodo = computed(()=>{ // computed 获取todo列表
    return (date)=>{ // 返回一个函数
        let res = null // 定义一个变量
        Object.keys(props.data).forEach((item)=>{ // 循环props.data key
            if(item === date){ // 匹配日期
                res = props.data[item].todo // 获取todo列表
            }
        })
        return res // 返回todo列表
    }
})
// const getTodo = computed(()=>{
//     return (date)=>{
//         let res
//         Object.keys(props.data).forEach((item)=>{
//             if(item === date){
//                 res = props.data[item].todo
//             }
//         })
//         return res
//     }
// })



onMounted(() => {
    eMonitor()
    

})

onUpdated(() => {
    eMonitor()
})




</script >

<template>
    <div class="calsmain">
        <div class="calsbody" >
        <div class="top">
            <div class="year">
                🗓️{{ Year }}
            </div>
            <div class="month">
                TODAY {{ new Date().getMonth() + 1 }} / {{ new Date().getDate() }}
            </div>
            <div class="dayselect">{{ mouseSelected }}</div>
        </div>



        <div class="container">
            <div class="side">
                <div v-for="i in weekDays" :class="['sidebox', i === 'Sun' ? 'lastbox' : '']">{{ i }}</div>
            </div>
            <div class="calbox">
                <div v-for=" (d, index) in days.day" class="day">
                    <div @click="clickItem(days.year[index] + '-' + days.month[index] + '-' + d)"
                        :class="['item', days.month[index] === Month ? '' : 'xmonth', days.day[index] === new Date().getDate() && days.month[index] === new Date().getMonth() + 1 && days.year[index] === new Date().getFullYear() ? 'today' : '']"
                        :year="days.year[index]" :month="days.month[index]" :day="d" :key="index" ref="cals">{{ d  }}

                    </div>
                </div>
            </div>
        </div>

        <div class="footer">
            <div class="prev" @click="prev">prev</div>
            <div class="reset" @click="reset">reset</div>
            <div class="next" @click="next">next</div>
        </div>
        
    </div>
    <!-- <div class="calstodo">
        <kazatodo :date="getCalsyymmdd()" :todos="getTodo(getCalsyymmdd()) " ></kazatodo>
        
    </div> -->
    </div>
    
</template>



<style lang='less' scoped>

@width: 50%;
@calsbodyWidth:v-bind(getWidth() );
@calsHeight:v-bind(getHeight() );
.pointer {
    cursor: pointer;
}

.calsmain{
    width: 100%;
    // height: 200px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
}
.calsbody{
    position: relative;
    width: @calsbodyWidth;
    height: @width;
    flex-shrink: 0;
}

.top {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 100%;
    height: 10%;
    padding: 0 2px 0 2px;
    margin-bottom: 3px;

    // background-color: #ccc;
    // border-radius: 10px;
    .year {
        width: 30%;
        background-color: #000;
        color: #fff;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        border-radius: 5px;
        user-select: none;
    }

    .month {
        .year;
        width: 40%;
    }

    .dayselect {
        .year;
        width: 20%;
        background-color: #55E6C1;
        transition: .3s all ease;
    }

}

.footer {
    .top;

    .prev {
        .year;
        width: 32%;
        .pointer;
    }

    .next {
        .prev;
    }

    .reset {
        .prev
    }

}

.container {
    width: 100%;
    // height: @calsHeight;
    height: 180px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    box-sizing: border-box;
    justify-content: start;

    .side {
        width: 15%;
        height: 100%;

        display: flex;
        flex-direction: column;

        .sidebox {
            display: flex;
            width: 100%;
            height: calc(100% / 7);
            font-size: 6px;
            // text-align: center;
            align-items: center;
            justify-content: center;
            letter-spacing: 1px;

        }

        .lastbox {
            color: #FC427B;
        }
    }

    .calbox {
        width: 85%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        box-sizing: border-box;
        // transform: rotateZ(90deg) rotateX(180deg);

        // background-color: #4e4e4e;
        // margin: 0;
        // padding: 0;

        .day {
            width: calc(100% / 6);
            height: calc(100% / 7);
            color: #fff;
            font-size: 12px;
            transition: .5s ease;
            padding: 1px 1px 1px 1px;
            box-sizing: border-box;

            .item {
                width: 80%;
                height: 80%;
                border-radius: 5px;
                background-color: #1B9CFC;
                text-align: center;
                cursor: pointer;
                z-index: 10;

                // opacity: .5;
                &:hover {
                    background-color: #55E6C1;
                    transform: scale(1.25);
                    transition: .5s all ease;
                }
            }

            .xmonth {
                background-color: #4e4e4e;
            }

            .today {
                background-color: #EAB543;
            }



            .hastodo {
                // border-top: 4px solid #FC427B;
                background-color: #FC427B;
            }

            .hastodo02 {
                background-color: #FC427B;
                opacity: .3;
            }

            .hastodo03 {
                background-color: #FC427B;
                opacity: .7;
            }
        }
    }
}

.calstodo{
    width: 80%;
    height: @calsHeight;
}





::-webkit-scrollbar {
  width: 10px;
  height: 3px;
}

/* 滚动条有滑块的轨道部分 */
::-webkit-scrollbar-track-piece {
  background-color: transparent;
  border-radius: 5px;
}

/* 滚动条滑块(竖向:vertical 横向:horizontal) */
::-webkit-scrollbar-thumb {
  cursor: pointer;
  background-color: #f2f2f2;
  border-radius: 5px;
}

/* 滚动条滑块hover */
::-webkit-scrollbar-thumb:hover {
  background-color: #999999;
}

/* 同时有垂直和水平滚动条时交汇的部分 */
::-webkit-scrollbar-corner {
  display: block;
  /* 修复交汇时出现的白块 */
}


// .day:nth-child(even){
//     background-color: #ccc;
// }
</style>

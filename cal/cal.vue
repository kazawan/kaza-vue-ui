<script>
export default {
    name: 'kaza-cal'
}
</script>
<script setup>
import { ref, reactive, onMounted, computed, onUpdated, watchEffect, watch } from 'vue';
const temp = reactive({})
const caltable = ref(null);

/**
 * todo 先显示一个月份的日历
 */

const props = defineProps({
    value: {
        type: Object,
    },


})

const getOffset = computed(() => {
    return Number(props.offset)
})


/** 
 *  *获取月份的总天数
*/
const getTotleDays = (month, year) => {
    let res = new Date(year, month, 0).getDate();
    return res
}
/**
 * *获取月份第一天是星期几
 */
const getMonthfirstday = (month, year) => {
    let res = new Date(year, month - 1, 1).getDay();
    return res
}


/**
 * *月份增加一个月
 */
const addMonth = () => {
    console.log('add')
    month.value += 1

}

// const minMonth = () => {
//     v.value -= 1
// }

const month_offset = ref(1)
const v = ref(0)
const getV = computed(() => {
    return v.value
})
const year = ref(props.value.getFullYear())
const month = ref(props.value.getMonth() + month_offset.value)
const day = ref(props.value.getDate())


const getMonth = computed(() => {
    return month.value
})


const getYear = computed(() => {
    return year.value
})


/**
 * *创建tr表
 */
const createTr = (month, year, weekday) => {
    let tr = document.createElement('tr')
    let totleDay = getTotleDays(month, year)
    let firstdayofWeek = getMonthfirstday(month, year)
    let totleRow = Math.ceil((totleDay + firstdayofWeek) / 7)
    let totlebox = totleRow * 7

    // console.log(totlebox)
    let i = 1;

    for (i += weekday; i < totlebox + 1; i += 7) {
        let day = i - firstdayofWeek;
        // let month = getMonth.value
        // let year = getYear.value
        let td = document.createElement('td')
        let div = document.createElement('div')
        if (i <= firstdayofWeek) {
            div.style.backgroundColor = '#ccc'
            div.style.width = '11px'
            div.style.height = '11px'
            div.setAttribute('date', `${month - 1 === 0 ? year - 1 : year}-${month - 1 === 0 ? 12 : month - 1}-${getTotleDays(month - 1, year) - firstdayofWeek + i}`)
            td.appendChild(div)
        } else {
            div.style.backgroundColor = '#9AECDB'
            div.style.width = '11px'
            div.style.height = '11px'

            if (day === new Date().getDate() && month === new Date().getMonth() + 1 && year === new Date().getFullYear()) {
                div.style.backgroundColor = '#EAB543'
            }
            if (day > totleDay) {
                console.log(i)
                div.style.backgroundColor = '#ccc'
                div.setAttribute('date', `${month + 1 === 13 ? year + 1 : year}-${month + 1 === 13 ? 1 : month + 1}-${day - totleDay}`)
            }
            td.appendChild(div)
        }

        tr.appendChild(td)
    }


    caltable.value.appendChild(tr)
}

onMounted(() => {
    // console.log(month.value)
    // console.log(Math.abs(-1/12))
    for (let i = 0; i < 7; i++) {
        createTr(getMonth.value, year.value, i)
    }
})

onUpdated(() => {
    // console.log('fdm', getMonth.value)
    caltable.value.innerHTML = ''
    for (let i = 0; i < 7; i++) {
        createTr(getMonth.value, year.value, i)
    }
})

/**
 * *月份边界检测
 */
const monthLimit = () => {
    if (month.value > 12) {
        year.value++
        month.value = 1
    } else if (month.value < 1) {
        year.value--
        month.value = 12
    }
}

/**
 * *上一个月
 */
const prevMonth = () => {
    month.value--
    monthLimit()
}
/**
 * *下一个月
 */
const next = () => {
    month.value++
    monthLimit()

}


</script >

<template>
    <div class="calbody">
        <div class="btn">
            <div class="pre" @click="prevMonth">prv</div>
            <div class="thismonth">{{ getYear }} 月</div>
            <div class="nextmonth">{{ getMonth }} 月</div>
            <div class="nextMonth" @click="next">next</div>

        </div>
        <div class="calbox">
            <div class="side">
                <div class="mon">mon</div>
                <div class="mon">tue</div>
                <div class="mon">fri</div>
            </div>
            <table class="caltable" ref="caltable">

            </table>
        </div>

        <!-- <div class="add" @click="addMonth">add</div>
                <div class="min" @click="minMonth">min</div> -->
    </div>
</template>



<style lang='less' scoped>
tr td {
    padding: 0;
    margin: 0;

    box-sizing: border-box;
    text-align: center;

}






.calbody {
    display: flex;
    flex-direction: column;
    width: 100%;
    // background-color: #ccc;
    justify-content: center;
    align-items: center;
    font-size: 10px;

    .calbox {
        display: flex;
        flex-direction: row;

        .side {
            display: flex;
            flex-direction: column;
            width: 30px;
            height: 100%;
            // background-color: #cccccc50; 
            .mon{
                height: 33%;
                // background-color: aqua;
                text-align: center;
               
            }
        }
    }
}

.mon:nth-child(1){
    top: 12px;
}
.mon:nth-child(2){
    top: 7px;
}
.mon:nth-child(3){
    top: 3px;
}

.btn {
    width: 20%;
    background-color: #cccccc50;

    display: flex;
    // flex-direction: row;
    justify-content: center;
    align-items: center;

    .nextmonth {
        width: 100%;
        justify-content: start;
        text-align: center
    }

    .thismonth {
        .nextmonth;
    }
}
</style>

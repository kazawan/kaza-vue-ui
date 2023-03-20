<script>
export default {
    name: 'kaza-cals'
}
</script>
<script setup>
import { onMounted, ref,computed,defineExpose } from 'vue';

const props = defineProps({
    dayday:[Number,String],
    month:[Number,String],
})

const day = ref(42)
const currentDate = new Date()
const today = ref(currentDate.getDate())
const Month = ref(Number(props.month) || currentDate.getMonth() + 1)
const Year = ref(currentDate.getFullYear())
const dayInMonth = computed(()=>{
    let res = new Date(Year.value, Month.value, 0).getDate()
    return res
})
const firstDayOfMonth  = computed(()=>{
    return new Date(Year.value, Month.value-1, 1).getDay()
})
const days = computed(()=>{
    const dayArr = []
    const monthArr = []
    const yearArr = []
    const prevYear = Year.value - 1
    const nextYear = Year.value + 1
    const prevMonth = Month.value - 1 < 1 ? 12 : Month.value - 1
    const nextMonth = Month.value +1 > 12 ? 1 : Month.value + 1
    const prevMonthDays = new Date(Year.value, prevMonth, 0).getDate()
    const nextMonthDays = new Date(Year.value, nextMonth, 0).getDate()
    // console.log(prevMonth)
    for(let i = 1 ; i < dayInMonth.value + 1 ; i++){
        dayArr.push(i)
        monthArr.push(Month.value)
        yearArr.push(Year.value)
    }
    for(let i = 0 ; i < firstDayOfMonth.value -1; i++){
        dayArr.unshift(prevMonthDays - i)
        monthArr.unshift(prevMonth )
        // yearArr.unshift(Year.value)
        if(Month.value - 1 < 1 ){
            yearArr.push(prevYear )
        }else{
            yearArr.push(Year.value)
        }
        
    }
    // console.log(42 - dayInMonth.value - firstDayOfMonth.value -1)
    for(let i = 1 ; i < 42 - dayInMonth.value - firstDayOfMonth.value + 2  ; i++){
        dayArr.push(i)
        monthArr.push(nextMonth)
        // yearArr.push(Year.value)
        if(Month.value + 1 > 12){
            yearArr.push(nextYear)
        }else{
            yearArr.push(Year.value)
        }
    }

   dayArr.length = 42
   monthArr.length =42
   yearArr.length = 42

    
    return {
        day:dayArr,
        month:monthArr,
        year:yearArr
    }
})

// const add = () =>{
//     Month.value++
//     if(Month.value > 12){
//         Month.value = 1
//         Year.value+=1
//     }else if(Month.value < 1){
//         Month.value = 12
//         Year.value-=1
//     }
//     // console.log(days.value)
// }

// const min = () =>{
//     Month.value--
//     if(Month.value > 12){
//         Month.value = 1
//         Year.value+=1
//     }else if(Month.value < 1){
//         Month.value = 12
//         Year.value-=1
//     }
// }

const cals = ref(null)
const show = ()=>{
    return cals.value
}
defineExpose({
    show
})
</script >

<template>
    <!-- <button @click="min">min</button>
    <button @click="add">add</button>{{ Year }}-{{ Month }} -->
    <div class="calbox" style="margin-top: 10px;">
        <div v-for=" (d , index) in days.day" :class="['day',days.month[index] === Month ? '' : 'xmonth' , days.day[index] === new Date().getDate() && days.month[index] === new Date().getMonth() +1  && days.year[index] === new Date().getFullYear() ? 'today' : '']" :year="days.year[index] " :month="days.month[index]" :day="d" :key="index" ref="cals" ></div>
    </div>
    
</template>



<style lang='less' scoped>
.calbox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    transform-origin: center;
    transform: rotateZ(90deg) rotateX(180deg);

    // background-color: #4e4e4e;
    margin: 0;
    padding: 0;

    .day {
        width: calc(100% / 7);
        height: calc(100% / 6);
        background-color: #1B9CFC;    
        // border: 1px solid #fff;
        color: #fff;
        border-radius: 20%;
        text-align: center;
        // transform: rotateZ(-90deg) rotateY(180deg);
        font-size: 12px;
        margin-top: calc(100%/100);
        margin-right: calc(100%/100);
        transition: .5s ease;
        &:hover{
            background-color: #EAB543;
        }
    }
    .xmonth{
        background-color: #4e4e4e;
    }
    .today{
        background-color: #EAB543;
    }

}





// .day:nth-child(even){
//     background-color: #ccc;
// }
</style>

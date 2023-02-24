<template>
    <div class="box inlineBlock">

        <svg class="box chart" viewBox="0 0 600 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="gradient">
                    <stop offset="0" stop-color="#f7f8f8" />
                    <stop offset="33%" stop-color="#43c4da" />
                    <stop offset="65%" stop-color="#e244de" />
                    <stop offset="100%" stop-color="#d9f2f6" />
                </linearGradient>
            </defs>
            <text class="ani" text-anchor="middle" x="570" :y="getLastValueY" fill="#000" font-size="24">{{ getLastValue }}
            </text>
            <g transform="translate(0, 130) scale(1,-1)">
                <path fill="none" class="chart ani" stroke="#50d99f" stroke-width="10" stroke-linejoin="round"
                    stroke-linecap="round" :d='getLine'></path>
                <!-- <path fill="none" class="chart ani" stroke="#50d99f" stroke-width="10" stroke-linejoin="round"
                    stroke-linecap="round" d='M0,0 C50,0 50,100
                                              100,100  C150,100 150,0
                                              200,0 C250,0 250,50 
                                              300,50
                                                '></path> -->
            </g>

        </svg>

    </div>
</template>


<script setup>
import { onMounted, ref, computed, watch, watchEffect } from 'vue';

let debug = true
const isdebug = () => {
    if (debug) {
        console.log(props.options)
        console.log(props.options.value[0])
    }
}
const isdebugRef = (arr, arr2) => {
    if (debug) {
        arr.forEach((element, i) => {
            console.log(arr2[i], element)
        });
    }
}
const lastValue = ref(0)
const lastValueY = ref(0)
const getLastValue = computed(() => {
    return lastValue.value

})

const getLastValueY = computed(() => {
    return 100 - lastValueY.value

})
const props = defineProps(
    {
        options: {
            type: Object,
        }
    }
)
const getWidth = computed(() => {
    return props.options.width + 'px'
})
const getHeight = computed(() => {
    return props.options.height + 'px'
})


const line = ref('M0,0')

const getLine = computed(() => {
    line.value = 'M'
    let data = props.options.value
    let breakPoint = Math.floor(chartWidth / (data.length - 1))
    let middlePoint = (i)=>{
       let res = (breakPoint * i ) - (breakPoint/2)
        return res
    }
    let crulBreakPoint = (i)=>{
        let res = breakPoint * i
        return res
    }
    
    for (let i = 0; i < props.options.value.length; i++) {
        if(i===0){
            line.value = line.value + ' ' + (breakPoint * i) + ',' + data[i] + ' '
        }else{
            line.value = line.value + 'C' + middlePoint(i) + ',' + data[i-1] + ' ' + middlePoint(i) + ',' + data[i] + ' ' + crulBreakPoint(i) + ',' + data[i] + ' '
        }
    }
    isdebugRef([breakPoint, line.value], ['breakPoint', 'line.value'])
    return line.value

})

// watchEffect(() => {
//     isdebugRef([props.options], ['props.optons'])
// })


const chartWidth = 600;




onMounted(() => {

    
})





</script>

<style lang="less" scoped>
// @mainWidth: v-bind(getWidth);
// @mainHeight: v-bind(getHeight);
@mainWidth: v-bind(getWidth);
@mainHeight: v-bind(getHeight);

.inlineBlock {
    // margin-left: 10px;
    // margin-right: 10px;
    // border: 1px solid #ccc;
    overflow: hidden;
}

.box {

    width: @mainWidth;
    height: @mainHeight;
    // vertical-align: middle;
    position: relative;
    background-color: #ffffff00;
    border-radius: 10px;
    margin-bottom: 10px;

}

.chartItem {
    text-align: center;
    font-weight: blod;
}

.chartBoxContainer {
    width: @mainWidth;
    height: @mainHeight;





}

.base {
    width: @mainWidth;
    height: @mainHeight;
}

.chartbox {

    background-color: rgba(236, 236, 236, 0);
    transition: .3s ease-in-out;


}

.ani {
    transition: .1s all ease-in-out;
}
</style>
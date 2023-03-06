<template>
    <div class="bar">
        <div class="text">
            {{ getCount }}
        </div>
        <div class="title">
            {{title}}
        </div>
        <svg class="box1 base" viewBox="0 0 210 210" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle class="c1 ani cc1" id="c1" cx="105" cy="105" r="90" :stroke="getColor" stroke-opacity="0.69"
                stroke-width="20" stroke-linecap="round" />
            <circle class="cc1" cx="105" cy="105" r="100" :stroke="getBoardColor" stroke-opacity="0.69" stroke-width="5"
                stroke-linecap="round" />
            <circle class="cc1" cx="105" cy="105" r="80" :stroke="getBoardColor" stroke-opacity="0.69" stroke-width="5"
                stroke-linecap="round" />
        </svg>
    </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap');



</style> 
<style lang="less" scoped>


@bgcolor: #7e807e00;
@mainwidth: v-bind(width);

@mainheight: v-bind(height);
@COLOR: #1e4adb;

.base {
    
    width: @mainwidth;
    height: @mainheight;
    // background-color: @bgcolor;
    border-radius: 10px;
    // box-shadow: 0 0 5px;
}

.ani {
    transition: .15s all ease-out;
}



.bar {
    position: relative;
    display: inline-block;
    width: @mainwidth;
    height: @mainheight;
    
}
.title{
    font-family: 'Oswald', sans-serif;
    position: absolute;
    top:v-bind(getTitleTop);
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    overflow: hidden;
    font-size: v-bind(getTitleFont_size);
    font-weight: 500;
}

.text {
    font-family: 'Oswald', sans-serif;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    overflow: hidden;
    font-size: v-bind(getFont_size);
    font-weight: 500;

}

.box1 {
    z-index: 0;

    .c1 {
        stroke-dasharray: 564.5732421875;
        stroke-dashoffset: v-bind(getPresent);//变量控制
        transform: rotate(-90deg) rotateX(180deg);
        transform-origin: center;


    }
}
</style>

<script>
export default {
    name:'kazaProgressBar'
}
</script>
  
<script setup>


import { onMounted, watch, ref, computed } from 'vue';
// import { useGetLen } from '../../hooks/SvgGetLen/usegetlen'
let total = 564.5732421875
let per = total / 100


const props = defineProps({
    width: {
        type: String,
        default: '150px',
        required: false
    },
    height: {
        type: String,
        default: '150px',
        required: false
    },
    count: {
        type: Number,
        default: 0,
        required: false
    },
    barColor:{
        type: String,
        default: '#1e4adb',
        required: false
    },
    font_size:{
        type: String,
        default: '35px',
        required: false
    },
    boardColor:{
        type: String,
        default: '#ccc',
        required: false
    },
    title :{
        type: String,
        default: '',
        required: false
    },
    titleTop:{
        type: String,
        default: '35%',
        required: false
    },
    titleFont_size:{
        type: String,
        default: '10px',
        required: false
    }
    

})

const getPresent = computed(()=>{
    let res = total - (per * props.count)
    return res
})

const getCount = computed(()=>{
    return props.count + '%'
})

const getColor = computed(()=>{
    
    return props.barColor
})

const getFont_size = computed(()=>{
    return props.font_size
})

const getBoardColor = computed(()=>{
    // console.log(props.boardColor.startsWith('#'))
    if(!props.boardColor.startsWith('#')){
        return '#' + props.boardColor
    }
    return props.boardColor
    
})

const getTitleTop = computed(()=>{
    return props.titleTop
    
})

const getTitleFont_size = computed(()=>{
    return props.titleFont_size
    
})







</script>

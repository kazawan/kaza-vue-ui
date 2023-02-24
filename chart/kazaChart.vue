<template>
    <div class="box inlineBlock">

        <svg class="box chart" :id="id" viewBox="0 0 600 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="gradient">
                    <stop offset="0" stop-color="#f7f8f8" />
                    <stop offset="33%" stop-color="#43c4da" />
                    <stop offset="65%" stop-color="#e244de" />
                    <stop offset="100%" stop-color="#d9f2f6" />
                </linearGradient>
            </defs>
            <text text-anchor="middle" x="300" y="-20" fill="#fff" font-size="24">{{ title }} </text>
            <g transform="translate(0, 100) scale(1,-1)">
                <path fill="none" class="chart" stroke="#fff" stroke-width="5" stroke-linejoin="round"
                    stroke-linecap="round" :d="refreshdata"></path>
            </g>

        </svg>

    </div>
</template>



<script setup>
//todo 添加item 的value 显示
import { ref, computed, onMounted, watchEffect, watch } from 'vue';

const line = ref("")
const props = defineProps({
    width: {
        type: String,
        default: 300

    },
    height: {
        type: String,
        default: 100

    },
    data: {
        type: Array,
        required: true,

    },
    id: {
        type: String,
        required: true

    },
    min_ranger: {
        type: Number,
        default: 0,
    },
    max_ranger: {
        type: Number,
        default: 100,
    },
    padding: {
        type: Boolean,
        default: true

    },
    scale: {
        type: String,
        default: 'true'
    },
    title: {
        type: String,
        default: ''
    }
})


onMounted(() => {
    getdata()
    
})




let time =0;
//todo 判断数字在范围内的比例
const normalize = () => {
    // console.log(props.data)
    let temp = [];
    // console.log('normalize')
    props.data.forEach((item, i) => {

        //    let temp =  Math.floor((item['value'] / (props.max_ranger - props.min_ranger)) * 100)
        // console.log(typeof props.min_ranger)
        // let temp = testnor(item['value'], Number(props.min_ranger), Number(props.max_ranger))
        let data = testnor(Number(item['value']),Number(props.min_ranger) ,Number(props.max_ranger) )
        

        // item['value'] = parseInt(temp) 
        temp.push({
            "item":item['item'],
            "value":parseInt(data)
            
        })
    })
    // console.log('temp',temp)
    return temp

}

function testnor(num, min, max) {
    // console.log(typeof num)
    if (num < 0) {
        return (Math.abs(Math.abs(num) + min)) / (max - min) * 100
    } else if (num == 0) {
        return (num - min) / (max - min) * 100

    } else {
        return (num - min) / (max - min) * 100

    }
}




function scaleCreate(breakPoint, position) {
    let text1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    let totalHeight = 100
    let offset = 5
    text1.setAttribute('text-anchor', 'middle')
    text1.setAttribute('x', breakPoint / 2);
    text1.setAttribute('fill', '#fff')
    text1.style.fontSize = '8px'
    switch (position) {
        case 'max':
            text1.innerHTML = props.max_ranger
            text1.setAttribute('y', (totalHeight - totalHeight + offset).toString())
            break
        case 'min':
            text1.setAttribute('y', (totalHeight + offset).toString())
            text1.innerHTML = props.min_ranger
            break
        case 'middle':

            text1.setAttribute('y', totalHeight / 2 + offset)
            if (props.min_ranger < 0) {
                text1.innerHTML = props.max_ranger - (props.max_ranger - (props.min_ranger)) / 2
            } else {
                text1.innerHTML =props.max_ranger - ((props.max_ranger - (props.min_ranger)) / 2)
            }
            break
        default:
            break
    }

    return text1
}



const datainit = () => {
    line.value = 'M'
    let temp = normalize()
    // console.log('inittemp',temp)
    // let breakPoint = Math.floor((600 - padding * 2) / data.length);
    let breakPoint = Math.floor(600 / (props.data.length + 1));
    if (props.scale === 'true') {
        document.querySelector('#' + props.id).appendChild(scaleCreate(breakPoint, 'max'))
        document.querySelector('#' + props.id).appendChild(scaleCreate(breakPoint, 'min'))
        document.querySelector('#' + props.id).appendChild(scaleCreate(breakPoint, 'middle'))
    }

    // console.log(breakPoint)
    for (let i = 0; i < props.data.length; i++) {
        // line.value = line.value + (data[i]['id'] * breakPoint) + ',' + data[i]['value'] + ' '
        line.value = line.value + ((i + 1) * breakPoint) + ',' + Math.floor(temp[i]['value']) + ' '
        // console.log(line.value)
        let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('x', (i + 1) * breakPoint);
        text.setAttribute('y', '130')
        text.setAttribute('fill', '#fff')
        text.setAttribute('font-size', '12')
        text.innerHTML = props.data[i]['item']

        text.classList.add(props.id + 'chartItem')
        document.querySelector('#' + props.id).appendChild(text)
    }
}


let timestamp = 0
watch(
    line, () => {
        
        // console.log(line.value,timestamp++)
        let text = document.querySelectorAll('.' + props.id + 'chartItem')
        text.forEach((e, i) => {
            if (e.innerHTML != props.data[i]['item']) {
                e.innerHTML = props.data[i]['item']
            }
        })
    }

)





const getdata = () => {
    datainit()
}


const refreshdata = computed(() => {
    // console.log('refresh')
    
    line.value = 'M'
    let temp = normalize()
    // console.table('reftemp',temp)
    // console.log('props',props.data)
    // let breakPoint = Math.floor((600 - padding * 2) / data.length);
    let breakPoint = Math.floor(600 / (props.data.length + 1));

    // console.log(breakPoint)
    for (let i = 0; i < props.data.length; i++) {
        // line.value = line.value + (data[i]['id'] * breakPoint) + ',' + data[i]['value'] + ' '
        line.value = line.value + ((i + 1) * breakPoint) + ',' + Math.floor(temp[i]['value']) + ' '


    }
    // console.log(line.value)
    
    return line.value
})



const getLine = computed(() => {

    return line.value
})

const getWidth = computed(() => { return props.width + 'px' })
const getHeight = computed(() => { return props.height + 'px' })



</script>

<style lang="less" scoped>
@mainWidth: v-bind(getWidth);
@mainHeight: v-bind(getHeight);

.inlineBlock {



    margin-left: 10px;
    margin-right: 10px;
}

.box {

    width: @mainWidth;
    height: @mainHeight;
    // vertical-align: middle;
    position: relative;
    background-color: #444444;
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

    background-color: rgba(15, 14, 14, 0);
    transition: .3s ease-in-out;


}
</style>
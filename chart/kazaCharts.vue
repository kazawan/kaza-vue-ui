<template>
    <div class=" inlineBlock">
        <svg class="box chart" :id="getData.id" viewBox="0 0 600 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="gradient">
                    <stop offset="0" stop-color="#f7f8f8" />
                    <stop offset="33%" stop-color="#43c4da" />
                    <stop offset="65%" stop-color="#e244de" />
                    <stop offset="100%" stop-color="#d9f2f6" />
                </linearGradient>
            </defs>
            <g v-show='getData.id' transform="translate(0, 100) scale(1,-1)">
                <path fill="none" :stroke="getData.color" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"
                    :d='getLine'></path>

            </g>
            <g :class="getData.id" transform="translate(0, 100) scale(1,-1)" class="ani">

            </g>
            <g v-show="getData.isEmty" class="ani" transform="translate(0, 100) scale(1,-1)">
                <text text-anchor="middle" x="300" y="50" fill="#000000" font-size="32" class="cpuitemdata"
                    style="opacity: .5; transform-origin: center; transform: rotateX(180deg); user-select: none;">No
                    Data</text>
            </g>
            <g v-show="!getData.id && !getData.isEmty" class="ani" transform="translate(0, 100) scale(1,-1)">
                <text text-anchor="middle" x="300" y="50" fill="red" font-size="32" class="cpuitemdata"
                    style="opacity: .5; transform-origin: center; transform: rotateX(180deg); user-select: none;">Error: No id
                    Inputed</text>
            </g>

        </svg>

    </div>
</template>


<script setup>
//TODO 添加字体大小 颜色 
import { onMounted, ref, computed, watch, onUpdated } from 'vue';


function normalize(num, min, max) {
    // console.log(typeof num)
    if (num < 0) {
        return (Math.abs(Math.abs(num) + min)) / (max - min) * 100
    } else if (num == 0) {
        return (num - min) / (max - min) * 100

    } else {
        return (num - min) / (max - min) * 100
    }
}

function getMaxMin(arr) {

    if (arr.length === 1) {
        return {
            max: arr[0],
            min: arr[0] === 0 ? -10 : 0
        }
    }
    let temp = []
    arr.forEach(item => {
        temp.push(item)
    })
    let max;
    let min;
    temp.sort(function (a, b) {
        return a - b
    })
    min = temp[0]
    max = temp[temp.length - 1]

    return {
        max: max,
        min: min
    }
}

const chartWidth = 600;


//这样可以提供默认值，不填也可以。。
const temp = ref({})
const getData = computed(() => {
    temp.value = {
        id: props.options.id || null,
        color: props.options.color || '#000',
        width: props.options.width || 300,
        height: Math.floor(props.options.width / 3),
        autoNormalize: props.options.auto_normalize === true ? true : false,
        value: props.options.value || [],
        isEmty: props.options.value.length === 0 ? true : false,
        fontColor: props.options.fontColor || '#000',
        min_ranger: props.options.auto_normalize === true ? getMaxMin(props.options.value).min : props.options.min_ranger ? props.options.min_ranger : 0,
        max_ranger: props.options.auto_normalize === true ? getMaxMin(props.options.value).max : props.options.max_ranger ? props.options.max_ranger : 100,
    }
    return temp.value
})



let breakPoint = () => {
    return Math.floor(chartWidth / (getData.value.value.length - 1)) === Infinity ? 600 : Math.floor(chartWidth / (getData.value.value.length - 1))
}


const props = defineProps(
    {
        options: {
            type: Object,
        }
    }
)
const getWidth = computed(() => {
    // return props.options.width + 'px'
    return temp.value.width + 'px'
})
const getHeight = computed(() => {
    return temp.value.height + 'px'
})




const addEvent = () => {
    if (getData.value.id === null) {
        return
    }
    let id = getData.value.id
    let blockitem = document.querySelectorAll(`.${id}blockitem`)

    blockitem.forEach((el, i) => {
        let item = document.querySelectorAll(`.${id}item`)
        let itemdata = document.querySelectorAll(`.${id}itemdata`)
        el.addEventListener('mouseenter', (e) => {
            el.setAttribute('fill', '#00000030')
            el.style.opacity = .3
            item[i].style.opacity = 1
            itemdata[i].style.opacity = 1
        })
        el.addEventListener('mouseleave', (e) => {
            el.setAttribute('fill', '#cccccc00')
            el.style.opacity = 0
            item[i].style.opacity = 0
            itemdata[i].style.opacity = 0

        })
    })


}

const createblockitem = (x, w, eltomount) => {
    let block = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    block.setAttribute('x', x)
    block.setAttribute('y', '-50')
    block.setAttribute('width', w)
    block.setAttribute('height', '200')
    block.setAttribute('fill', 'transparent')
    block.classList = `${getData.value.id}blockitem`
    eltomount.appendChild(block)
}

const createline = (bp, i, normalizeData, eltomount) => {
    let line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    line.setAttribute('fill', 'none')
    line.setAttribute('stroke', '#50d99f')
    line.setAttribute('stroke-width', '1')
    line.setAttribute('stroke-linejoin', 'round')
    line.setAttribute('stroke-linecap', 'round')
    // line.setAttribute('d', `M${breakPoint * i},0 ${breakPoint * (i)},100`)
    line.setAttribute('d', `M${bp * i},0 ${bp * i},${normalizeData}`)
    line.classList = `${getData.value.id}item`
    line.style.opacity = 0
    eltomount.appendChild(line)
}

const creattext = (x, normalizeData, data, eltomount) => {
    let t = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    t.setAttribute('text-anchor', 'middle')
    t.setAttribute('x', x)
    t.setAttribute('y', (100 - normalizeData - 20).toString()) //
    t.setAttribute('fill', getData.value.fontColor.toString())
    t.setAttribute('font-size', '32')
    t.classList = `${getData.value.id}itemdata`
    t.innerHTML = data.toString()
    t.style.opacity = 0
    t.style.transformOrigin = 'center'
    t.style.transform = 'rotateX(180deg)'
    eltomount.appendChild(t)
}



const createNode = () => {
    if (getData.value.id === null) {
        return
    }
    let data = getData.value.value
    //获取正常化数据坐标
    let normalizeData = []
    let min = getData.value.min_ranger
    let max = getData.value.max_ranger

    getData.value.value.forEach((item) => {
        normalizeData.push(normalize(item, min, max))
    })

    let fontColor = getData.value.fontColor
    isdebugRef(['data'], [data.length])
    let id = getData.value.id
    let breakPoint = Math.floor(chartWidth / (data.length - 1)) === Infinity ? 600 : Math.floor(chartWidth / (data.length - 1))

    let g = document.querySelector(`.${id}`)
    if (data.length != 0) {
        temp.value.isEmty = false
        if (data.length === 1) {
            creattext('300', normalizeData[0], data[0], g)
            createline(300, 1, normalizeData[0], g)
            createblockitem('0', '600', g)
        } else {
            data.forEach((item, i) => {
                if (i === 0) {
                    creattext((breakPoint * i + (breakPoint / 2)).toString(), normalizeData[i], data[i], g)
                    createline(breakPoint, i, normalizeData[i], g)
                    createblockitem(((breakPoint * i)).toString(), breakPoint.toString(), g)

                } else if (i === data.length - 1) {
                    creattext((breakPoint * i - (breakPoint / 2)).toString(), normalizeData[i], data[i], g)
                    createline(breakPoint, i, normalizeData[i], g)
                    createblockitem(((breakPoint * i) - (breakPoint)).toString(), breakPoint.toString(), g)

                } else {
                    //这是区块
                    // let block = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    // block.setAttribute('x', ((breakPoint * i) - Math.floor(breakPoint / 2)).toString())
                    // block.setAttribute('y', '-50')
                    // block.setAttribute('width', breakPoint.toString())
                    // block.setAttribute('height', '200')
                    // // block.setAttribute('stroke','#000')
                    // // block.setAttribute('stroke-width','2')
                    // block.setAttribute('fill', 'transparent')
                    // block.classList = `${id}blockitem`


                    //这是画竖线
                    // let line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    // line.setAttribute('fill', 'none')
                    // line.setAttribute('stroke', '#50d99f')
                    // line.setAttribute('stroke-width', '1')
                    // line.setAttribute('stroke-linejoin', 'round')
                    // line.setAttribute('stroke-linecap', 'round')
                    // // line.setAttribute('d', `M${breakPoint * i},0 ${breakPoint * (i)},100`)
                    // line.setAttribute('d', `M${breakPoint * i},0 ${breakPoint * (i)},${normalizeData[i]}`)
                    // line.classList = `${id}item`
                    // line.style.opacity = 0

                    //这是画数据
                    // let t = document.createElementNS('http://www.w3.org/2000/svg', 'text')
                    // t.setAttribute('text-anchor', 'middle')
                    // t.setAttribute('x', (breakPoint * i).toString())
                    // // t.setAttribute('y', (100 - data[i] - 20).toString())
                    // t.setAttribute('y', (100 - normalizeData[i] - 20).toString())
                    // t.setAttribute('fill', fontColor.toString())
                    // t.setAttribute('font-size', '32')
                    // t.classList = `${id}itemdata`
                    // t.innerHTML = data[i].toString()
                    // t.style.opacity = 0
                    // t.style.transformOrigin = 'center'
                    // t.style.transform = 'rotateX(180deg)'
                    // g.append(t)
                    // g.appendChild(line)
                    // g.appendChild(block)
                    creattext((breakPoint * i).toString(), normalizeData[i], data[i], g)
                    createline(breakPoint, i, normalizeData[i], g)
                    createblockitem(((breakPoint * i) - Math.floor(breakPoint / 2)).toString(), breakPoint.toString(), g)
                }
            })
        }

    } else {
        temp.value.isEmty = true
    }

}



let debug = !true
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




const line = ref('M0,0')

const getLine = computed(() => {

    line.value = 'M'
    // let data = getData.value.value
    //使用标准化函数标准数据
    let data = [];
    let min = getData.value.min_ranger
    let max = getData.value.max_ranger

    getData.value.value.forEach((item) => {
        data.push(Math.floor(normalize(item, min, max)))
    })



    let breakPoint = Math.floor(chartWidth / (data.length - 1)) === Infinity ? 600 : Math.floor(chartWidth / (data.length - 1))

    let middlePoint = (i) => {
        let res = (breakPoint * i) - (breakPoint / 2)
        return res
    }
    let crulBreakPoint = (i) => {
        let res = breakPoint * i
        return res
    }

    for (let i = 0; i < data.length; i++) {
        if (i === 0) {
            // line.value = line.value + ' ' + (breakPoint * i) + ',' + data[i] + ' '
            line.value = ` ${line.value} ${middlePoint(i)},${data[i]} `
        } else {
            let cPoint = `C${middlePoint(i)},${data[i - 1]} ${middlePoint(i)},${data[i]} `
            let crulPoint = `${crulBreakPoint(i)},${data[i]} `
            line.value = `${line.value}${cPoint} ${crulPoint}`
            // line.value = line.value + 'C' + middlePoint(i) + ',' + data[i-1] + ' ' + middlePoint(i) + ',' + data[i] + ' ' + crulBreakPoint(i) + ',' + data[i] + ' '
        }
    }




    isdebugRef([getData.value.value.length, line.value], ['getData.value', 'line.value'])


    if (data.length === 0) {
        return line.value = 'M0,0'
    } else if (data.length === 1) {
        return line.value = `M0,${data[0]} 600,${data[0]}`
    } else {
        return line.value
    }





})





onMounted(() => {
    createNode()
    addEvent()
    // console.log(props.options.value)
})
onUpdated(() => {
    if (getData.value.id === null) {
        console.log('no id')
        return
    }
    let id = getData.value.id
    let data = getData.value.value
    let lineLength = getData.value.value.length
    let blockitem = document.querySelectorAll(`.${id}blockitem`)
    let blockLength = blockitem.length

    let itemdata = document.querySelectorAll(`.${id}itemdata`)
    let item = document.querySelectorAll(`.${id}item`)


    let g = document.querySelector(`.${id}`)
    if (blockLength != lineLength) {
        g.innerHTML = ''
        createNode()
        addEvent()
    } else {
        blockitem.forEach((el, i) => {
            itemdata[i].setAttribute('y', (100 - data[i] - 20))
            itemdata[i].innerHTML = data[i]
            item[i].setAttribute('d', `M${breakPoint() * i},0 ${breakPoint() * (i)},${data[i]}`)
        })

        addEvent()
    }


})



</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap');
</style>



<style lang="less" scoped>
// @mainWidth: v-bind(getWidth);
// @mainHeight: v-bind(getHeight);
@mainWidth: v-bind(getWidth);
@mainHeight: v-bind(getHeight);


.inlineBlock {
    margin-left: 0px;
    margin-right: 0px;
    width: @mainWidth;
    height: @mainHeight;
    font-family: 'Oswald', sans-serif;

}

.box {
    width: @mainWidth;
    height: @mainHeight;
    // vertical-align: middle;
    position: relative;
    background-color: #ffffff00;
    // margin-bottom: 10px;
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
    transition: .5s all ease-in-out;
}



.item {
    transition: 1s all ease-in-out;
    caret-color: transparent
}

.itemdata {
    &:extend(.item);
    caret-color: transparent;
}
</style>
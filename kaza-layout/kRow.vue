<script>
export default {
    name: 'k-row'
}
</script>

<script setup>
import { computed, reactive, onMounted, onBeforeUnmount, getCurrentInstance, ref, onBeforeMount, onUpdated } from 'vue';
const props = defineProps({
    justify: {
        type: String,
    },
    gutter: {
        type: [String, Number],
    },
    wrap: String,
    mb: [String, Number],
    mt: [String, Number],
})

const kazaRow = ref(null)
const temp = reactive({})
const getTemp = computed(() => {
    temp.value = {
        justify: typeCheck(justifyList, props.justify),
        wrap: typeCheck(wrapList, props.wrap),
        gutter: props.gutter || 0,
        mb: props.mb || 0,
        mt: props.mt || 0,
    }
    return temp
})
//检查是否规定数据里面的数据
const typeCheck = (arr, value) => {
    let res = arr.indexOf(value) === -1 ? arr[0] : value
    return res
}

//justify
const justifyList = ['flex-start', 'flex-end', 'center', 'space-between',]
const getJustify = computed(() => {
    return getTemp.value.value.justify
})

//Gutter
const getGutter = computed(() => {
    // console.log(getTemp.value.value.gutter)
    return getTemp.value.value.gutter / 2
})

//warp
const wrapList = ['wrap', 'nowrap', 'wrap-reverse']
const getWrap = computed(() => {
    return getTemp.value.value.wrap
})

//marginButtom
const getMb = computed(() => {
    return getTemp.value.value.mb + 'px'
})

const getMt = computed(() => {
    return getTemp.value.value.mt + 'px'
})

const setPadding = () => {
    let col = [...kazaRow.value.children]
    // console.log(col[0].className.indexOf('col'))
    col.forEach((item, index) => {
        if (item.className.indexOf('kaza-col') != -1) {
            item.style.padding = `0 ${getGutter.value}px 0 ${getGutter.value}px`
            // console.log(item.style.heigth)
        }
    })
}


onMounted(() => {
    setPadding()
    
    window.addEventListener('resize',setPadding )
})

onBeforeUnmount(() => {
    window.removeEventListener('resize',setPadding)
})

onUpdated(() => {
    setPadding()
    

})
</script>


<template>
    <div class="kaza-row" ref="kazaRow">
        <slot></slot>
    </div>
</template>

<style lang="less" scoped>
@width: 100%;
@justify: v-bind(getJustify);
@wrap: v-bind(getWrap);
@mb: v-bind(getMb);
@mt: v-bind(getMt);
@fontSize :v-bind(getFontSize);

.kaza-row {

    box-sizing: border-box;
    width: @width;
    padding-bottom: @mb;
    padding-top: @mt;
    display: flex;
    flex-direction: row;
    flex-wrap: @wrap;
    justify-content: @justify;
    //此处需要删除
    // background-color: #55E6C1;
}

@media (max-width: 575.98px) {
    html {
        font-size: calc(32px + 2 * (100vw - 575.98px) / 39);
    }


}

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) and (max-width: 767.98px) {}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) and (max-width: 991.98px) {}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) and (max-width: 1199.98px) {}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {}
</style>
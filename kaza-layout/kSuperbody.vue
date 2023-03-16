<script>
export default {
    name: 'k-superbody'
}
</script>


<script setup>
import { onMounted, onUpdated, ref, computed, onBeforeUnmount } from 'vue';
const superbody = ref(null)
const testbar = ref(null)
const props = defineProps({
    iphoneSize: String,
    winSize: String,
    showDevice: Boolean,
    showSize:Boolean,
})
const device = ref('')

const devivesSet = {
    'Win64': {
        name: 'Win...',
        bgcolor: '#1B9CFC',
        fontSize: props.winSize || '16px'
    },
    'iPhone': {
        name: 'iPhone...',
        bgcolor: '#55E6C1',
        fontSize: props.iphoneSize || '24px'
    },
}
const devicesCheck = () => {
    const userAgentDevies = navigator.userAgent
    const html = document.querySelectorAll('html')[0]

    Object.keys(devivesSet).forEach((item, i, Object) => {
        if (userAgentDevies.indexOf(item) != -1) {
            // superbody.value.style.backgroundColor = devivesSet[item].bgcolor
            html.style.fontSize = devivesSet[item].fontSize
            device.value = devivesSet[item].name
            testbar.value.style.backgroundColor = devivesSet[item].bgcolor
        }
    })

}

const supX = ref(0)
const supY = ref(0)

const sssshow = () =>{
    supX.value = window.innerWidth
    supY.value = window.innerHeight
}

const showMonitor = computed(() => {
    supX.value = window.innerWidth
    supY.value = window.innerHeight
    return { supX, supY }
})


onMounted(() => {
    devicesCheck()
    sssshow()
    window.addEventListener('resize', sssshow)
})

onUpdated(() => {
    devicesCheck()
})

onBeforeUnmount(() =>{
    window.removeEventListener('resize', sssshow)
})
</script >

<template>
    <div ref="superbody" class="superbody">
        <div v-if="showDevice" class="testbar" ref="testbar" style="color:#000;">
            suprerbody&#128161:device is {{ device }} <div v-if="showSize" class="superbodyspan">{{ showMonitor.supX }}px : {{ showMonitor.supY }}px</div>
        </div>

        <slot />
    </div>
</template>



<style lang='less' scoped>
@superWidth: 100%;
@superHeight: auto;

.superbody {
    position: relative;
    width: @superWidth;
    height: @superHeight;
    
    .superbodyspan {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 10px 0 10px;
        height: 100%;
        background-color: #303030;
        color: #fff;
        border-radius: 5px;
        justify-content: center;
    }
}
</style>

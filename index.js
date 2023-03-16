import kazaCharts from './chart/kazaCharts.vue'
import kazaProgressBar from './ProgressBar/kazaProgressBar.vue'
import kCol from './kaza-layout/kCol.vue'
import kRow from './kaza-layout/kRow.vue'
import kSuperbody from './kaza-layout/kSuperbody.vue'


export default {
    install:(app)=>{
        app.component('kazaCharts', kazaCharts)
        app.component('kazaProgressBar', kazaProgressBar)
        app.component('k-col',kCol)
        app.component('k-row',kRow)
        app.component('k-superbody',kSuperbody)
    }
}
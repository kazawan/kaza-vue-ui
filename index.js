import kazaCharts from './chart/kazaCharts.vue'
import kazaProgressBar from './ProgressBar/kazaProgressBar.vue'

export default {
    install:(app)=>{
        app.component('kazaCharts', kazaCharts)
        app.component('kazaProgressBar', kazaProgressBar)
    }
}
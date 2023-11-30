<template>
    <div class="weather" v-if="!isLoading">
        <div class="weather__city">{{ city.name }}</div>
        <WeatherIcon v-if="weather" :name="weather.weather[0].icon" day />
        <div class="weather__temp" v-if="weather">{{ weather.main.temp }} &#8451;</div>
        <div class="flex">
            <div class="weather__cond">{{ weather.weather[0].description }}</div>
            <div class="mr-2">5 Days</div>
            <Switcher :checked="!isDay" @change="toggleDay"></Switcher>
        </div>
        <div>
            Fav true/false
        </div>

        <div>
            <highchart :options="chartOptions" />
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import type { PropType } from 'vue'
import Switcher from '~/components/Switcher/Switcher.vue'

const props = defineProps({
    city: {
        required: true,
        type: Object as PropType<iCity>
    }
});
import('highcharts/highcharts').Options;
const { $api } = useNuxtApp();
const weather = ref(null) as unknown;
const forecast = ref(null) as unknown;
const chartOptions = ref({
    title: {
        text: 'Forecast',
        align: 'left'
    },
    xAxis: {
        categories: []
    },
    yAxis: {
        title: {
            text: 'Temperature (°C)'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            // enableMouseTracking: false
        }
    },
    series: [{
        data: []
    }],
});
const isLoading = ref(true);
const isDay = ref(true);

const toggleDay = () => {
    isDay.value = !isDay.value;
    buildGraph();
}
onMounted(async () => {
    try {
        try {
            const res = await $api.getWeather(props.city)
            const data = await res.json();
            weather.value = data;
        } catch (error) {
            console.log(error);
        }
        try {
            const resForecast = await $api.getForecast(props.city)
            const dataForecast = await resForecast.json();
            forecast.value = dataForecast
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
    finally {
        isLoading.value = false;
    }

})
const buildGraph = () => {
    const today = new Date();
    const todayDateString = today.toISOString().split('T')[0];
    if (!isDay.value) {
        const temps = forecast.value.list.map(el => {
            return el.main.temp
        });
        const datas = forecast.value.list.map(el => {
            return el.dt_txt
        });
        chartOptions.value.series = [{
            name: 'Temperature',
            data: temps
        }];
        chartOptions.value.xAxis.categories = datas;
    } else {
        const filteredData = forecast.value.list.filter(el => {
            const itemdDate = new Date(el.dt_txt);
            const itemDateString = itemdDate.toISOString().split('T')[0];
            return itemDateString === todayDateString
        });

        const temps = filteredData.map(el => {
            return el.main.temp
        });
        const datas = filteredData.map(el => {
            return el.dt_txt
        });
        chartOptions.value.series = [{
            name: 'Temperature',
            data: temps
        }];
        chartOptions.value.xAxis.categories = datas;
    }
}
watch(forecast, () => {
    buildGraph();
});
</script>
    
<style>
    
</style>
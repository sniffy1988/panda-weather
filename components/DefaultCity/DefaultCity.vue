<template>
    <div v-if="city && weather" class="weather">
        <div class="weather__city">{{ city }}</div>
        <WeatherIcon v-if="weather" :name="weather.weather[0].icon" day />
        <div class="weather__temp">{{ weather.main.temp }} &#8451;</div>
        <div class="weather__cond">{{ weather.weather[0].description }}</div>
        <div class="flex">
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
import Switcher from '~/components/Switcher/Switcher.vue'
import('highcharts/highcharts').Options;
const ipData = ref(null) as unknown;
const { $api } = useNuxtApp();
const weather = ref(null) as unknown;
const forecast = ref(null) as unknown;
const chartOptions = ref({
    title: {
        text: 'Forecast',
        align: 'left'
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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

const isDay = ref(true);

const toggleDay = () => {
    isDay.value = !isDay.value;
    buildGraph();
}


function filterByToday(array) {
    const today = new Date();
    const todayDateString = today.toISOString().split('T')[0];

    return array.filter(item => {
        const itemDate = new Date(item.date);
        const itemDateString = itemDate.toISOString().split('T')[0];

        return itemDateString === todayDateString;
    });
}

onMounted(async () => {
    try {
        const res = await $api.getIpData()
        const data = await res.json();
        ipData.value = data;
    } catch (error) {
        console.log(error)
    }
});

const city = computed(() => {
    return ipData.value !== null && 'city' in ipData.value ? ipData.value.city : '';
});
watch(city, async (newVal) => {
    try {
        const res = await $api.getWeather(city.value)
        const data = await res.json();
        weather.value = data;
    } catch (error) {
        console.log(error);
    }
    try {
        const resForecast = await $api.getForecast(city.value)
        const dataForecast = await resForecast.json();
        forecast.value = dataForecast
    } catch (error) {
        console.log(error);
    }
});
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
})
</script>
    
<style>
    .weather {
        @apply border-2 rounded-lg p-2 border-blue-800;
        &__city {
            @apply font-bold italic text-lg text-gray-800;
        }
        &__temp {
            @apply text-sm text-gray-700 font-semibold;
        }
    }
</style>
<template>
    <div class="weather" v-if="!isLoading">
        <div class="weather__city">{{ city.name }}</div>
        <WeatherIcon v-if="weather" :name="weather.weather[0].icon" day />
        <div class="weather__temp" v-if="weather">{{ weather.main.temp }} &#8451;</div>
        <div class="weather__cond">{{ weather.weather[0].description }}</div>

        <div class="flex">
            <div class="mr-2">{{ $t('days') }}</div>
            <Switcher :checked="!isDay" @change="toggleDay"></Switcher>
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
        type: Object as PropType<ICity>
    }
});
const { $api, $datefns } = useNuxtApp();
const { t: $t } = useI18n();
const emits = defineEmits(['delete', 'fav'])
const weather = ref(null) as Ref<any>;
const forecast = ref(null) as Ref<any>;
const chartOptions = ref({
    title: {
        text: $t('forecast'),
        align: 'left'
    },
    xAxis: {
        categories: [],
        labels: {
            formatter({ value }: any) {
                return $datefns.format(new Date(value), isDay.value ? "HH:mm" : 'dd-LL HH:mm')
            }
        }

    },
    yAxis: {
        title: {
            text: '°C'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            legend: false
        },
    },
    legend: {
        enabled: false
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
.weather {
    @apply border-2 rounded-lg p-2 border-blue-800 relative;
    &__city {
        @apply font-bold italic text-lg text-gray-800;
    }
    &__temp {
        @apply text-sm text-gray-700 font-semibold;
    }
    &__delete {
        @apply p-2 bg-gray-400 rounded text-sm absolute right-0 top-0;
    }
}
</style>
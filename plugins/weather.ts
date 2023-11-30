export default defineNuxtPlugin(nuxtApp => {
    const API_KEY = nuxtApp.$config.public.NUXT_API_KEY ?? '';
    const IP_KEY = nuxtApp.$config.public.NUXT_IP_KEY ?? '';

    return {
        provide: {
            api: {
                getWeather: async (city: ICity) => {
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&lang=${nuxtApp.$i18n.locale.value}&appid=${API_KEY}`
                    return fetch(url);
                },
                getForecast: (city: ICity) => {
                     const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&lang=${nuxtApp.$i18n.locale.value}&appid=${API_KEY}`
                    return fetch(url);
                },
                getCity: async (city: string) => {
                    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&lang=${nuxtApp.$i18n.locale.value}&appid=${API_KEY}`
                    return fetch(url);
                },
                getIpData: async () => {
                    const url = `https://api.ipdata.co?api-key=${IP_KEY}`;
                    return fetch(url);
                }
            }
        }
    }
})
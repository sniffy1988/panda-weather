export default defineNuxtPlugin(nuxtApp => {
    const API_KEY = nuxtApp.$config.public.NUXT_API_KEY ?? '';
    const IP_KEY = nuxtApp.$config.public.NUXT_IP_KEY ?? '';

    return {
        provide: {
            api: {
                getWeather: async(city: unknown) => {
                    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
                    return fetch(url);
                },
                getForecast: (city: unknown): any => {
                     const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
                    return fetch(url);
                },
                getCity: async (city: string) => {
                    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
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
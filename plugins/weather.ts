export default defineNuxtPlugin(nuxtApp => {
    const API_KEY = nuxtApp.$config.public.NUXT_API_KEY ?? '';

    return {
        provide: {
            api: {
                getWeather: (city: unknown):any => {
                    console.log('rain in ', city)
                },
                getForecast: (city: unknown):any => {
                    console.log('forecast for ', city)
                },
                getCity: (city: string): any => {
                    console.log('looking for city:', city, API_KEY)
                    return city
                }
            }
        }
    }
})
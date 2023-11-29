import { defineStore } from 'pinia';

export const useCityStore = defineStore('city', {
    state: () => ({
        cities: [] as String[],
    }),
    getters: {
        getCities: (state) => state.cities,
    },
    actions: {
        addCity(city:string) {
            this.cities.push(city);
        },
        removeCity(city: string) {
            const indexofCity = this.cities.findIndex((el) => el === city);
            if (indexofCity !== -1) {
                this.cities.splice(indexofCity, 1)
            }
        }
    },
    persist: true,
})
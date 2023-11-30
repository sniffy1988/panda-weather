import { defineStore } from 'pinia';

export const useCityStore = defineStore('city', {
    state: () => ({
        cities: [] as ICity[],
        limit: 5
    }),
    getters: {
        getCities: (state) => state.cities,
    },
    actions: {
        addCity(city:ICity) {
            this.cities.push(city);
        },
        removeCity(city: ICity) {
            const indexofCity = this.cities.findIndex((el) => el.lat === city.lat);
            if (indexofCity !== -1) {
                this.cities.splice(indexofCity, 1)
            }
        }
    },
    persist: true,
})
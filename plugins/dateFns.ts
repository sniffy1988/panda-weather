import {format} from 'date-fns'

const datefns: any={
  format,
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('datefns', datefns)
})
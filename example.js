'use strict'

const monitor = require('.')

const stations = [8011167, 8002553] // array of station ids
const interval = 5 * 1000 // every 10 seconds

monitor(stations, interval)
.on('error', console.error)
.on('data', console.log)

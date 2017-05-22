# db-monitor 🔭

**Fetch departures at DB stations.** (You may get blacklisted.)

[![npm version](https://img.shields.io/npm/v/db-monitor.svg)](https://www.npmjs.com/package/db-monitor)
[![build status](https://img.shields.io/travis/derhuerst/db-monitor.svg)](https://travis-ci.org/derhuerst/db-monitor)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/db-monitor.svg)
[![gitter channel](https://badges.gitter.im/derhuerst/vbb-rest.svg)](https://gitter.im/derhuerst/vbb-rest)


## Installing

```shell
npm install db-monitor
```


## Usage

```js
const monitor = require('db-monitor')

const stations = ['8002553'] // array of station ids
const interval = 10 * 1000 // every 10 seconds

const departures = monitor(stations, interval)
departures.on('error', console.error)
departures.on('data', console.log)

setTimeout(() => {
	departures.stop() // stop querying
}, interval * 3)
```

The [stream](https://nodejs.org/api/stream.html#stream_readable_streams) will emit data like this:

```js
{
	when: '2017-05-22T14:47:00+02:00',
	delay: 480,
	station: {
		type: 'station',
		id: '692757'
		name: 'Bahnhof Altona, Hamburg',
		coordinates: {latitude: 53.551663, longitude: 9.934231},
		products: // …
	},
	line: {
		type: 'line',
		id: 'bus-283',
		name: 'Bus 283',
		mode: 'bus',
		product: 'bus'
	},
	trip: 329143,
	direction: 'Langenfelder Damm, Hamburg'
}
// …
{
	when: '2017-05-22T15:02:00+02:00',
	delay: 0,
	station: {
		type: 'station',
		id: '8098553',
		name: 'Hamburg-Altona(S)',
		coordinates: {latitude: 53.551267, longitude: 9.934698},
		products: // …
	},
	line: {
		type: 'line',
		id: 's-1',
		name: 'S 1',
		mode: 'train',
		product: 'suburban'
	},
	trip: 247000,
	direction: 'Wedel(Holst)'
}
```

*Note:* A stream created by calling `monitor(…)` does not stop calling the API if you `unpipe` it. You need to manually call `departures.stop()`.


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/db-monitor/issues).

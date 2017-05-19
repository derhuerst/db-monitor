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

const stations = [8011167] // array of station ids
const interval = 5 * 1000 // every 10 seconds

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
	when: '2017-05-19T20:18:00.000Z',
	delay: 480,
	station: 730988,
	line: null,
	trip: 1018516,
	direction: 'S+U Zoologischer Garten'
}
{
	when: '2017-05-19T20:15:00.000Z',
	delay: 120,
	station: 730985,
	line: null,
	trip: 1264733,
	direction: 'S+U Jungfernheide'
}
```

*Note:* A stream created by calling `monitor(…)` does not stop calling the API if you `unpipe` it. You need to manually call `departures.stop()`.


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/db-monitor/issues).

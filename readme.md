# db-monitor 🔭

**Deprecated. Use [`hafas-monitor-departures`](https://www.npmjs.com/package/hafas-monitor-departures) with [`db-hafas`](https://www.npmjs.com/package/db-hafas).**

---

**Fetch departures at DB stations.** (You may get blacklisted.)

[![npm version](https://img.shields.io/npm/v/db-monitor.svg)](https://www.npmjs.com/package/db-monitor)
[![build status](https://img.shields.io/travis/derhuerst/db-monitor.svg)](https://travis-ci.org/derhuerst/db-monitor)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/db-monitor.svg)
[![gitter channel](https://badges.gitter.im/derhuerst/vbb-rest.svg)](https://gitter.im/derhuerst/vbb-rest)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


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

The [stream](https://nodejs.org/api/stream.html#stream_readable_streams) will emit [*Friendly Public Transport Format* `1.0.1`](https://github.com/public-transport/friendly-public-transport-format/blob/1.0.1/spec/readme.md) departures.

*Note:* A stream created by calling `monitor(…)` does not stop calling the API if you `unpipe` it. You need to manually call `departures.stop()`.


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/db-monitor/issues).

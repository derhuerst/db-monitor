'use strict'

const test = require('tape')
const sinon = require('sinon')
const isStream = require('is-stream')

const monitor = require('.')



const stations = [8011167, 8002553] // alex & zoo
const interval = 10 * 1000 // 10s

const mockedDeparture = (id, opt) => () => ({
	  station: {id}
	, when: new Date(opt.when + 5 * 1000)
	, delay: 2 * 1000
	, direction: 'foo'
	, product: {line: 123}
	, trip: Math.round(Math.random() * 30000)
})

const mockedDepartures = (id, opt) =>
	new Promise((yay, nay) => {
		setTimeout(() => {
			const deps = new Array(opt.duration).fill(null)
				.map(mockedDeparture(id, opt))
			yay(deps)
		}, 500)
	})

const mockedHafas = () => ({
	departures: sinon.spy(mockedDepartures)
})



test('returns a stream', (t) => {
	t.plan(2)
	const s1 = monitor(stations, interval)
	const s2 = monitor(stations)

	t.ok(isStream(s1))
	t.ok(isStream(s2))

	s1.stop()
	s2.stop()
})



test('starts querying in steps', (t) => {
	t.plan(3)
	const clock = sinon.useFakeTimers()
	const mock = mockedHafas()

	const s = monitor(stations, interval, 50, mock)
	t.equal(mock.departures.callCount, 0)
	clock.tick(1)
	t.equal(mock.departures.callCount, 1)
	clock.tick(50)
	t.equal(mock.departures.callCount, 2)

	s.stop()
	clock.restore()
})



test('checks for every `interval` milliseconds', (t) => {
	t.plan(3)
	const clock = sinon.useFakeTimers()
	const mock = mockedHafas()

	const s = monitor(stations, interval, 1, mock)
	t.equal(mock.departures.callCount, 0)
	clock.tick(1)
	t.equal(mock.departures.callCount, stations.length)
	clock.tick(interval)
	t.equal(mock.departures.callCount, 2 * stations.length)

	s.stop()
	clock.restore()
})



test('clears all intervals on `stop()`', (t) => {
	t.plan(1)
	const clock = sinon.useFakeTimers()
	const mock = mockedHafas()

	const s = monitor(stations, interval, 1, mock)
	clock.tick(1 + 5 * interval)
	const count = mock.departures.callCount

	s.stop()
	clock.tick(5 * interval)
	t.equal(mock.departures.callCount, count)

	clock.restore()
})



test('emits `close` & `end` on `stop()`', (t) => {
	t.plan(2)
	const s = monitor(stations, interval)
	const onClose = sinon.spy()
	const onEnd = sinon.spy()
	s.on('close', onClose)
	s.on('end', onEnd)

	s.stop()
	t.equal(onClose.callCount, 1)
	t.equal(onEnd.callCount, 1)
})



test('emits `end` on `stop()`', (t) => {
	t.plan(1)
	const s = monitor(stations, interval)
	const spy = sinon.spy()
	s.on('end', spy)

	s.stop()
	t.equal(spy.callCount, 1)
})

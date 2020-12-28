import {DomListener} from '@core/Domlistener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []

    this.prepare()
  }

  prepare() {}

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  } 

  init() {
    this.initDOMListener()
  }

  destroy() {
    this.removeDOMListener()
    this.unsubscribers.forEach(listener => listener())
  }
}
import {DomListener} from '@core/Domlistener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
  }

  init() {
    this.initDOMListener()
  }

  destroy() {
    this.removeDOMListener()
  }
}
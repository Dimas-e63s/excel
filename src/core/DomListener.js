import {capitalize} from './utils'
export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener.`)
    }
  this.$root = $root
  this.listeners = listeners
  }

  toHTML() {
    return ''
  }

  initDOMListener() {
    this.listeners.forEach(listener => {
      const method = getMethodName(capitalize(listener))
      if(!this[method]) {
        throw new Error(
          `Method ${method} is not implemented in ${this.name} Component`
        )
      }
      // Bind context "this" to this[method]
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })

  }

  removeDOMListener() {
    this.listeners.forEach(listener => {
      const method = getMethodName(capitalize(listener))
      this.$root.off(listener, this[method])
    })
  }
}

function getMethodName(eventName) {
  return 'on' + eventName
}
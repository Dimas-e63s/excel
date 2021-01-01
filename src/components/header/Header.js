import {ExcelComponent} from "../../core/ExcelComponent";
import {$} from '@core/dom'
import {changeTitle} from '@/redux/actions'
import {performAction} from './header.functions';
import {debounce} from "../../core/utils";
import {createHeader} from "./header.template";
export class Header extends ExcelComponent {
    static className = 'excel__header'
    constructor($root, options) {
      super($root, {
        name: 'Header',
        listeners: ['input', 'click'],
        ...options
      })
    }
    prepare() {
      this.onInput = debounce(this.onInput, 300)
    }
    
    get template() {
      const titleInStore = this.store.getState().title
      return createHeader(titleInStore)
    }

    toHTML() {
      return this.template
    }

    onInput(event) {
      const $target = $(event.target)
      this.$dispatch(changeTitle($target.text()))
    }

    onClick(event) {
      const $target = $(event.target)
      if ($target.data.type === 'button') {
        const action = $target.data.action
        performAction(action)
      }
    }
}
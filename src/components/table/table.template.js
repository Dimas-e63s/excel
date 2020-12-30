import {toInlineStyles} from '@core/utils'
import {defaultStyles} from '@/constants'
import {parse} from '@/core/parse'
const CODES = {
    'A': 65,
    'Z': 90  
}

function createCell(state, row) {
  return function(_, index, ) {
    const id = `${row}:${index}`
    const width = getWidth(state, index)
    const text = state.dataState[id]
    // getText(state, id)
    const styles = toInlineStyles({
        ...defaultStyles,
        ...state.stylesState[id]
    })
      
    return `
      <div 
        class="cell" 
        contenteditable 
        data-type="resizable" 
        data-col="${index}" 
        data-id="${row}:${index}"
        data-value="${text || ''}"
        style="${styles}; width:${width}">
        ${parse(text) || ''}
      </div>`
  }    
}

function toColumn({col,index, width}) {
  return `
  <div class="column" data-type="resizable" data-col="${index}" style="width:${width}">
    ${col}
  <div class="col-resize" data-resize="col"></div>
  </div>
  `
}

function createRow(content, num = '', state = {}) {
  const height = num ? getHeightFrom(state, num) : DEFAULT_HEIGHT
    const resizer = num ? '<div class="row-resize" data-resize="row"></div> ' : ''
    return `
      <div class="row" data-type="resizable" data-row="${num ? num : ''}" style="height:${height}">
        <div class="row-info">
          ${num ? num : ''}
          ${resizer}
        </div>
        <div class="row-data">
          ${content}
          </div>
      </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24
const DEFAULT_TEXT = '';

function getText(state, id) {
  return state.dataState[id] || DEFAULT_TEXT
}
function getWidth(state = {}, index) {
  return(state.colState[index] || DEFAULT_WIDTH)+'px'
}

function withWidthFrom(state) {
  return function(col, index) {
    return {col, index, width: getWidth(state, index)}
  }
}

function getHeightFrom(state, index) {
  return (state.rowState[index] || DEFAULT_HEIGHT)+'px'
}
export function createTable(rowsCount = 15, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = [];
    
    const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state))
    .map(toColumn)
    .join('')
    rows.push(createRow(cols))

    
    for(let row = 0; row < rowsCount; row++) {
      const cells = new Array(colsCount)
      .fill('')
      .map(createCell(state, row))
      .join('')
      
      rows.push(createRow(cells, row + 1, state))
    }

    return rows.join('')
}
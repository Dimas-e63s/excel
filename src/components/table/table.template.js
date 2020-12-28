const CODES = {
    'A': 65,
    'Z': 90  
}
function createCell(row) {
  return function(_, index) {
    return `
      <div 
        class="cell" 
        contenteditable 
        data-type="resizable" 
        data-col="${index}" 
        data-id="${row}:${index}">
      </div>`
  }    
}

function toColumn(el,index) {
  return `
  <div class="column" data-type="resizable" data-col="${index}">
    ${el}
  <div class="col-resize" data-resize="col"></div>
  </div>
  `
}

function createRow(content, num = '') {
    const resizer = num ? '<div class="row-resize" data-resize="row"></div> ' : ''
    return `
      <div class="row" data-type="resizable">
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
export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = [];
    
    const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('')
  
    rows.push(createRow(cols))

    
    for(let row = 0; row < rowsCount; row++) {
      const cells = new Array(colsCount)
      .fill('')
      .map(createCell(row))
      .join('')

      rows.push(createRow(cells, row + 1))
    }

    return rows.join('')
}
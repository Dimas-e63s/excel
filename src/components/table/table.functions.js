import {range} from '@core/utils'
export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isItCell(event) {
  return event.target.dataset.id
}

export function matrix($target, $current) {
  const target = $target.id(true)
  const current = $current.id(true)
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return rows.reduce((acc, row) => {
    cols.forEach((col) => acc.push(`${row}:${col}`))
    return acc
  }, []);
}

export function nextSelector(key, {row, col}) {
  const MIN_VAL = 0
  switch(key) {
  case 'ArrowLeft':
    col = col - 1 < MIN_VAL ? MIN_VAL : col-1
    break
  case 'ArrowRight':
  case 'Tab':
    col++
    break
  case 'ArrowDown':
  case 'Enter':
    row++
    break
  case 'ArrowUp':
    row = row - 1 <= MIN_VAL ? MIN_VAL : row-1
    break
  } 
  return `[data-id="${row}:${col}"]`
}
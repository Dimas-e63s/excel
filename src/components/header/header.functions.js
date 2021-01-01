import {ActiveRoute} from '@core/routes/ActiveRoute'

export function performAction(action) {
  if (action === 'delete') {
    const decision = confirm('Do sure that you want to delete this table?')
    if (decision) {
      localStorage.removeItem('excel:' + ActiveRoute.param)
      ActiveRoute.navigate('')
    }
  } else {
    ActiveRoute.navigate('')
  }
}
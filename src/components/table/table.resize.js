import {$} from '@core/dom'
export function resizeHandler($root,event) {
    const $resizer = $(event.target)
    const type = $resizer.data.resize
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const sideProp = 
      type === 'col' ? 'bottom' : 'right'
    let value

    $resizer.css({
        opacity: 1,
        [sideProp]: -5000 + 'px'
    })

    document.onmousemove = e => { 
      if(type === 'col') {
        const delta = e.pageX - coords.right
        value = delta + coords.width
        $resizer.css({right: -delta + 'px'})
      } else {
        const delta = e.pageY - coords.bottom
        value = delta + coords.height
        $resizer.css({bottom: -delta + 'px'})
      }
    }

    document.onmouseup = () => {
        if(type === 'col') {
          const data = $parent.data.col 
          $root
            .findAll(`[data-col="${data}"]`)
            .forEach(cell => $(cell).css({'width': value + 'px'}))
        } else {
          $parent.css({ 'height': value + 'px'})
        }
        document.onmousemove = null
        document.onmouseup = null

        $resizer.css({
            opacity: 0,
            right: 0, 
            bottom: 0  
        })
        
    }
}


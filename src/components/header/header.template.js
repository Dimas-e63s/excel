function createBtn(el) {
  return `
  <div class="btn" data-type="button">
    <i class="material-icons" data-type="button" data-action="${el}">${el}</i>
  </div>
  `
}

export function createHeader(titleInStore) {
  const title = titleInStore || defaultTitle
  const buttons = ['delete', 'exit_to_app']
  return `
    <input type="text" class="input" value="${title}">
    <div>
        ${buttons.map(createBtn)}
    </div>
  `
}
!function () {

  const { createPopper } = Popper
  const userBtn = document.querySelector('#user-btn')
  const userBtnContextMenu = document.querySelector('#user-context-menu')
  const userBtnPopper = createPopper(userBtn, userBtnContextMenu, {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 5]
        }
      }
    ]
  })
  function toggleUserContextMenu() {
    if (userBtnContextMenu.hasAttribute('hidden')) {
      userBtnContextMenu.removeAttribute('hidden')
      return userBtnPopper.update()
    }
    userBtnContextMenu.setAttribute('hidden', '')
  }
  userBtn.addEventListener('click', toggleUserContextMenu)

  const signoutBtn = document.querySelector('#user-action-signout')

  signoutBtn.addEventListener('click', async function () {
    try {
      const response = await fetch('/user/logout')
      const { error } = await response.json()
      if (error) {
        return modalError(error)
      }
      window.location.reload()
    } catch (error) {
      modalError(error.message)
    }
  })

}()
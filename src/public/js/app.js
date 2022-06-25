!async function () {

  const mainContainer = document.querySelector('#main-container')
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

  function createItem(note) {
    const container = document.createElement('div')
    const header = document.createElement('h1')
    const updated = document.createElement('small')
    container.append(header, updated)
    container.className = 'p-4 m-4 bg-white rounded-md shadow-md'
    header.className = 'font-bold'
    updated.classname = 'text-sm'
    container.dataset.noteId = note._id
    updated.innerText = moment(note.lastUpdated).format('YYYY/MM/DD')
    header.innerText = note.title
    if (note._id) {
      container.addEventListener('click', () => {
        window.location = '/note/update/' + note._id
      })
    } else {
      container.addEventListener('click', () => {
        window.location = '/note/create'
      })
    }
    return container
  }

  try {
    const response = await fetch('/note/fetch')
    const { error, documents } = await response.json()
    if (error) {
      return modalError(error) 
    }
    const collection = documents.map(createItem)
    mainContainer.append(...collection)
    if (collection.length < 1) {
      mainContainer.append(createItem({ title: 'Create your first note!' }))
    }
  } catch (error) {
    modalError(error.message)
  }

}()
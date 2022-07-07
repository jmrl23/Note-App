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
  const signoutBtn = document.querySelector('#user-action-signout')
  const searchInput = document.querySelector('#search-input')

  function toggleUserContextMenu() {
    if (userBtnContextMenu.hasAttribute('hidden')) {
      userBtnContextMenu.removeAttribute('hidden')
      return userBtnPopper.update()
    }
    userBtnContextMenu.setAttribute('hidden', '')
  }
  userBtn.addEventListener('click', toggleUserContextMenu)

  signoutBtn.addEventListener('click', async function () {
    try {
      const response = await fetch('/user/logout')
      const { error } = await response.json()
      if (error) {
        return modalError(error)
      }
      window.location = '/'
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

  searchInput.addEventListener('keyup', filterNotes)

  function filterNotes(e) {
    const input = e.target.value.trim()
    const notes = document.querySelectorAll('#main-container div')
    
    for (const note of notes) {
      note.classList.remove('hidden')
    }

    if (input.length < 1) {
      return
    }

    for (const note of notes) {
      note.classList.add('hidden')
      if (note.innerText.toLowerCase().includes(input.toLowerCase())) {
        note.classList.remove('hidden')
      }
    }

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
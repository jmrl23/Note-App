~function() {
  const id = document.querySelector('#note-id').value
  const noteTitle = document.querySelector('#note-title')
  const editor = new Quill('#editor', {
    modules: {
      toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }, 'bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block', { 'indent': '+1' }, { 'indent': '-1' }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'color': [] }, { 'align': [] }]
      ]
    },
    theme: 'snow',
    placeholder: 'Aa'
  })

  async function fetchData(id) {
    try {
      const response = await fetch('/note/fetch/' + id)
      const { error, document: doc } = await response.json()
      if (error) {
        return modalError(error)
      }
      const { content, title } = doc
      noteTitle.value = title
      editor.setContents(JSON.parse(content))
    } catch (error) {
      modalError(error.message)
    }
  }
  fetchData(id)

  const submitButton = document.querySelector('#submit-btn')
  const deleteButton = document.querySelector('#delete-btn')

  deleteButton.addEventListener('click', () => {
    modalConfirm('Delete this note?', async () => {
      try {
        const response = await fetch('/note/delete/' + id, {
          method: 'delete'
        })
        const { error } = await response.json()
        if (error) {
          return modalError(error)
        }
        window.location = '/'
      } catch (error) {
        modalError(error.message)
      }
    })
  })

  submitButton.addEventListener('click', () => {
    modalConfirm('Update this note?', async () => {
      const title = noteTitle.value.trim()
      const content = JSON.stringify(editor.getContents())
      try {
        const response = await fetch('/note/update/' + id, {
          method: 'PUT',
          headers: { 'content-Type': 'application/json' },
          body: JSON.stringify({ title, content })
        })
        const { error } = await response.json()
        if (error) {
          return modalError(error)
        }
        window.location = '/'
      } catch (error) {
        modalError(error.message)
      }
    })
  })

}()
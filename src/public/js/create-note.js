~function () {
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

  const titleInput = document.querySelector('#note-title')
  const submitButton = document.querySelector('#submit-btn')

  submitButton.addEventListener('click', createNewNote)

  let isCreated = false

  async function createNewNote() {
    const title = titleInput.value.trim() || 'Untitled'
    const content = JSON.stringify(editor.getContents())
    if (isCreated) {
      return
    }
    console.log(JSON.stringify({ title, content }))
    try {
      const response = await fetch('/note/create', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      })
      const { error } = await response.json()
      if (error) {
        return modalError(error)
      }
      modalSuccess('Note Created')
      isCreated = true
      setTimeout(() => {
        window.location = '/'
      }, 1000)
    } catch (error) {
      modalError(error.message)
    }
  }
}()
!function() {

  const form = document.querySelector('form')
  const checkbox = form.querySelector('#show-password')

  form.addEventListener('submit', submitForm)
  
  // show password
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      return form.password.type = 'text'
    }
    form.password.type = 'password'
  })

  let hasProcess = false

  // on form submit
  async function submitForm(e) {
    e.preventDefault()
    if (hasProcess) {
      return modalError('still in process')
    }
    const username = this.username.value.trim()
    const password = this.password.value.trim()
    if (!username || !password) {
      return modalError('empty field')
    }
    try {
      hasProcess = true
      const response = await fetch('/user/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      const { error } = await response.json()
      if (error) {
        return modalError(error)
      }
      window.location = '/'
    } catch (error) {
      modalError(error.message)
    } finally {
      hasProcess = false
    }
  }
}()

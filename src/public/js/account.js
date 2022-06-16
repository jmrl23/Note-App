~function () {
  const form = document.querySelector('form')
  const checkbox = form.querySelector('#show-password')

  let hasProgress = false

  form.addEventListener('submit', submitForm)

  async function submitForm(e) {
    e.preventDefault()
    if (hasProgress) {
      return modalError('still in process')
    }
    const currentPassword = this['current-password'].value
    const newPassword = this['new-password'].value
    if (!currentPassword || !newPassword) {
      return modalError('empty field')
    }
    try {
      const response = await fetch('/user/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentPassword, newPassword })
      })
      const { error } = await response.json()
      if (error) {
        return modalError(error)
      }
      modalSuccess('password updated')
    } catch (error) {
      modalError(error.message)
    } finally {
      this['current-password'].value = ''
      this['new-password'].value = ''
      hasProgress = false
    }
  }

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      return form['new-password'].type = 'text'
    }
    form['new-password'].type = 'password'
  })
}()
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
}()
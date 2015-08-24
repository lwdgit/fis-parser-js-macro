reasy.match('**.js', {
  parser: reasy.plugin('js-macro', {
    define: {
        product: 'mobile'
    }
  })
});

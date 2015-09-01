# A simple js macro for fis & fis3


## Install

    npm install -g fis-parser-js-macro
    
## Demo

```javascript

{{if (define.product=='mobile')}}
    console.log("true");
    {{if (true)}}
        console.log('fsdffs')
        {{if (!false)}}console.log('false'){{else}}
            console.log('success');
        {{/if}}
        console.log('fsdffs true')
    {{/if}}
{{else if (2==12)}}
    console.log('hello');
{{else if (3==3)}}
    console.log("false");
    var c='1';
{{/if}}

```

```javascript
//fis3-conf
fis.match('**.js', {
  parser: fis.plugin('js-macro', {
    define: {
        product: 'mobile'
    }
  })
});

```

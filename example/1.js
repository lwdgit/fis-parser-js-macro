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
'use strict';
function parseJs(code, define) {
    //js模板解析
    
    var promise = {
        data: [],
        len: 0,
        
        get: function() {
            return this.data[this.len - 1];
        },
        getState: function(all) {
            //是否为true
            var l = this.len - 1;
            if (all === true) {
                l++;
            }
            for (var i = 0; i < l; i++) {
                if (!this.data[i])
                    return false;
            }
            return true;
        },
        set: function(state) {
            this.data[this.len - 1] = this.data[this.len - 1] || state;
            return state;
        },
        pop: function() {
            this.len--;
            return this.len > 0 ? this.data.pop() : this.len = 0;
        },
        push: function(state) {
            this.len++;
            return this.data.push(state),
            state;
        }
    };
    
    return function() {
        
        var res = code.replace(/(\{\{.*?\}\})(((?!\{\{)[\s\S])*)/g, function(phrase, condition, codeSniffer) {
            //暂不支持自定义openTag和closeTag
            condition = condition.replace(/(^\{\{|\}\}$)/g, '').trim();
            if (condition.indexOf('=') === 0) {
                return promise.getState(true) ? eval(condition.substring(1)) : '';
            } else {
                var _promise = condition.replace(/^(elseif|else if|\/if|if|else)(.*)/i, function() {
                    var bool = eval(arguments[2]);
                    switch (arguments[1]) {
                    case 'if':
                        promise.push(!!bool);
                        return promise.getState() && !!bool;
                        break;
                    case 'else':
                        return promise.getState() ? promise.get() === false ? true : false : false;
                        break;
                    case 'else if':
                        ;
                    case 'elseif':
                        var old = promise.get();
                        bool = bool && (promise.getState() ? promise.get() === false ? true : false : false);
                        promise.set(bool);
                        return old === false ? bool : false;
                        
                        break;
                    case '/if':
                        promise.pop();
                        return promise.get() && promise.getState();
                        break;
                    }
                }
                );
                
                if (_promise == 'true') {
                    return codeSniffer;
                }
            }
            return '';
        }
        );
        return res;
    }
}


function render(content, data) {
    data = data || {};
    return parseJs(content, data)();
}

module.exports = function(content, file, conf) {
    if (!content) return '';
    if (content.trim() == '') {
        return content;
    }

    var content = render(content, conf.define);

    return content;
};

function Validator(options){
    var formElement = document.querySelector(options.form);
    if (formElement){
        options.rules.forEach( function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            var errorElement = inputElement.parentElement.querySelector('.form-message')
            if (inputElement){
                inputElement.onblur = function(){
                    var errorMessage = rule.test(inputElement.value);
                    if (errorMessage){
                        errorElement.innerText = errorMessage;
                        inputElement.parentElement.classList.add('invalid');
                    } else {
                        errorElement.innerText = '';
                        inputElement.parentElement.classList.remove('invalid');
                    }
                }
            }
        });
    }
};

Validator.isRequired = function(selector, message){
    return{
        selector: selector,
        test: function(value){
            return value.trim() ? undefined : message || 'Vui long nhap truong nay'
        }
    }
}

Validator.isEmail = function(selector, message){
    return{
        selector: selector,
        test: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Truong nay phai la email';
        }
    }
}

Validator.minLength = function(selector, min, message){
    return{
        selector: selector,
        test: function(value){
            return value.length >= min ? undefined : message || `Vui long nhap toi thieu ${min} ki tu`;
        }
    }
}

Validator.isConfirmed = function (selector, getConfirmValue, message){
    return{
        selector: selector,
        test: function(value){
            return value === getConfirmValue() ? undefined : message || 'Gia tri nhap vao khong chinh xac'
        }
    }

}
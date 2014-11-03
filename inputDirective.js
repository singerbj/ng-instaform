var app = angular.module('directives', []);

app.directive('ngInstaform', function($compile) {
     
    var capString = function(string){
        var array = string.split('_');
        for(var i = 0; i < array.length; i++){
            array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
        }
        return array.join(' ');
    }

    return {
        scope: {
            obj: '=obj'
        },
        restrict: 'E',
        link: function(scope, element, attrs) {
            //load in form object from the obj attribute of the instaform element
            this.instaformObj = scope.obj;	
            
            //methods
            var createform = function(){	
                
                var form = document.createElement("form");
                if(this.instaformObj.model){
                    form.setAttribute("id", this.instaformObj.model + "form");
                    form.setAttribute("name", this.instaformObj.model + "form");
                    form.setAttribute("class", this.instaformObj.model + "form");
                    if(this.instaformObj.enterKey && this.instaformObj.enterKey === true){
                        form.setAttribute("ng-enter", "!" + this.instaformObj.model + "form.$invalid ? " + this.instaformObj.model + "formsubmit() : false");
                    }
                    form.setAttribute("novalidate", "");
                }else{
                    throw "No formPlus Attribute: model";  
                }
                
                return form;
                
            }
            
            var createDiv = function(inputParams){	
                var div = document.createElement("div");
                div.setAttribute("class", "form-group");
                div.setAttribute("ng-class", "{ 'has-error' : " + this.instaformObj.model + "form." + this.instaformObj.model + "form" + inputParams.attribute + ".$invalid && " + this.instaformObj.model + "form." + this.instaformObj.model + "form" + inputParams.attribute + ".$dirty }");
                return div;
            }
            
            var createLabel = function(inputParams){	
                var label = document.createElement("label");
                label.setAttribute("for", this.instaformObj.model + "form" + inputParams.attribute);
                label.setAttribute("style", "font-size: 14px;");
                label.innerText = capString(inputParams.attribute);
                return label;
            }
            
            var createInput = function(inputParams){		
                
                var input;
                if(inputParams.type === 'checkbox'){
                         
                    input = document.createElement('input');
                    input.setAttribute("type", inputParams.type);
                    input.setAttribute("style", "margin-bottom: 10px;");
                    input.setAttribute("class", this.instaformObj.model + "form" + inputParams.attribute);
                    input.setAttribute("ng-model", this.instaformObj.model + "." + inputParams.attribute);
                    
                    if(inputParams.changed){
                        input.setAttribute("ng-changed", inputParams.changed);
                    }		 
                
                }else if(inputParams.type === 'radio'){
                  
                  var input = document.createElement('div');
                  input.setAttribute("class", this.instaformObj.model + "form" + inputParams.attribute);
                  
                  for(var i = 0; i < inputParams.options.length; i++){


                    var temp = document.createElement('input');
                    temp.setAttribute("type", inputParams.type);
                    temp.setAttribute("style", "margin-bottom: 10px;");
                    temp.setAttribute("value", inputParams.options[i]);
                    temp.setAttribute("ng-model", this.instaformObj.model + "." + inputParams.attribute);
                  
                    if(inputParams.changed){
                        temp.setAttribute("ng-changed", inputParams.changed);
                    }

                    var tempSpan = document.createElement('span');
                    tempSpan.innerHTML = "&nbsp;" + capString(inputParams.options[i]);


                    var br = document.createElement('br');

                    input.appendChild(temp);
                    input.appendChild(tempSpan);
                    input.appendChild(br);
                  }

                }else{
                    input = document.createElement("input");
                    input.setAttribute("type", inputParams.type);
                    input.setAttribute("name", this.instaformObj.model + "form" + inputParams.attribute);
                    input.setAttribute("id", this.instaformObj.model + "form" + inputParams.attribute);
                    input.setAttribute("class", "form-control " + this.instaformObj.model + "form" + inputParams.attribute);
                    input.setAttribute("placeholder", capString(inputParams.attribute));
                    input.setAttribute("ng-model", this.instaformObj.model + "." + inputParams.attribute);
                        
                    if(inputParams.max){
                        input.setAttribute("ng-max", inputParams.max);
                    }
                    if(inputParams.min){
                        input.setAttribute("ng-min", inputParams.min);
                    }
                    if(inputParams.maxlength){
                        input.setAttribute("ng-maxlength", inputParams.maxlength);
                    }
                    if(inputParams.minlength){
                        input.setAttribute("ng-minlength", inputParams.minlength);
                    }
                    if(inputParams.required){
                        input.setAttribute("ng-required", inputParams.required);
                    }
                    if(inputParams.pattern){
                        input.setAttribute("ng-pattern", inputParams.pattern);
                    }
                    if(inputParams.changed){
                        input.setAttribute("ng-changed", inputParams.changed);
                    }		
                }		
                        
                return input;
            }
            
            var createValidationSpans = function(inputParams){
                
                var spanArray = [];
                
                if(inputParams.max){
                    var span = document.createElement("span");
                    span.setAttribute("class", "help-inline text-danger");
                    span.setAttribute("ng-show", this.instaformObj.model + "form." + this.instaformObj.model + "form" + inputParams.attribute
                        + ".$error.max && " + this.instaformObj.model + "form." + this.instaformObj.model + "form" + inputParams.attribute + ".$dirty");
                    span.innerText = "The " + inputParams.attribute + " is too high.";
                    spanArray.push(span);
                        
                }
                if(inputParams.min){	
                    var span = document.createElement("span");
                    span.setAttribute("class", "help-inline text-danger");
                    span.setAttribute("ng-show", this.instaformObj.model + "form." + this.instaformObj.model + "form" + inputParams.attribute
                        + ".$error.min && " + this.instaformObj.model + "form." + this.instaformObj.model + "form" + inputParams.attribute + ".$dirty");
                    span.innerText = "The " + inputParams.attribute + " is too low.";
                    spanArray.push(span);
                }
                if(inputParams.maxlength){
                    var span = document.createElement("span");
                    span.setAttribute("class", "help-inline text-danger");
                    span.setAttribute("ng-show", this.instaformObj.model + "form." + this.instaformObj.model + "form" + inputParams.attribute
                        + ".$error.maxlength && " + this.instaformObj.model + "form." + this.instaformObj.model + "form" + inputParams.attribute + ".$dirty");
                    span.innerText = "The " + inputParams.attribute + " is too long.";
                    spanArray.push(span);
                }
                if(inputParams.minlength){
                    var span = document.createElement("span");
                    span.setAttribute("class", "help-inline text-danger");
                    span.setAttribute("ng-show", this.instaformObj.model + "form." + this.instaformObj.model + "form" + inputParams.attribute
                        + ".$error.minlength && " + this.instaformObj.model + "form." + this.instaformObj.model + "form" + inputParams.attribute + ".$dirty");
                    span.innerText = "The " + inputParams.attribute + " is too short.";
                    spanArray.push(span);
                }
                if(inputParams.required){	
                    var span = document.createElement("span");
                    span.setAttribute("class", "help-inline text-danger");
                    span.setAttribute("ng-show", this.instaformObj.model + "form." + this.instaformObj.model + "form" + inputParams.attribute
                        + ".$error.required && " + this.instaformObj.model + "form." + this.instaformObj.model + "form" + inputParams.attribute + ".$dirty");
                    span.innerText = "The " + inputParams.attribute + " is required.";
                    spanArray.push(span);
                }
                if(inputParams.pattern){	
                    var span = document.createElement("span");
                    span.setAttribute("class", "help-inline text-danger");
                    span.setAttribute("ng-show", this.instaformObj.model + "form." + this.instaformObj.model + "form" + inputParams.attribute
                        + ".$error.pattern && " + this.instaformObj.model + "form." + this.instaformObj.model + "form" + inputParams.attribute + ".$dirty");
                    span.innerText = "The " + inputParams.attribute + " is invalid.";
                    spanArray.push(span);
                } 
                if(inputParams.type === 'email'){	
                    var span = document.createElement("span");
                    span.setAttribute("class", "help-inline text-danger");
                    span.setAttribute("ng-show", this.instaformObj.model + "form." + this.instaformObj.model + "form" + inputParams.attribute
                        + ".$error.email && " + this.instaformObj.model + "form." + this.instaformObj.model + "form" + inputParams.attribute + ".$dirty");
                    span.innerText = "The " + inputParams.attribute + " is invalid.";
                    spanArray.push(span);
                }   	
                
                return spanArray;
            }
            
            var createSubmitButton = function(){	
                var a = document.createElement("a");
                a.setAttribute("class", "btn btn-default");
                a.setAttribute("ng-disabled", this.instaformObj.model + "form.$invalid");
                a.setAttribute("ng-click", this.instaformObj.model + "formsubmit()");
                a.innerText = "Submit";
                return a;
            }
            
            //create opening form tag with attributes
            var form = createform();
            
            if(this.instaformObj.inputs){
                for(inputData in this.instaformObj.inputs){		
                    if(this.instaformObj.inputs[inputData].type === 'checkbox'){
                        var div = createDiv(this.instaformObj.inputs[inputData]);
                        var label = createLabel(this.instaformObj.inputs[inputData]);
                        var input = createInput(this.instaformObj.inputs[inputData]);

                        var table = document.createElement('table');
                        var tr = document.createElement('tr');
                        var td = document.createElement('td');
                        var td2 = document.createElement('td');
                        var spacer = document.createElement('td');

                        td.appendChild(label);
                        td2.appendChild(input);
                        tr.appendChild(td);
                        tr.appendChild(spacer);
                        spacer.innerHTML = "&nbsp;"
                        tr.appendChild(td2);
                        table.appendChild(tr);
                        
                        div.appendChild(table);
                        form.appendChild(div);
                        //var br = document.createElement("br");
                        //form.appendChild(br);
                    }else if(this.instaformObj.inputs[inputData].type === 'radio'){
                        var div = createDiv(this.instaformObj.inputs[inputData]);
                        var label = createLabel(this.instaformObj.inputs[inputData]);
                        var input = createInput(this.instaformObj.inputs[inputData]);
                        div.appendChild(label);
                        div.appendChild(input);
                        form.appendChild(div);
                    }else{                 
                        //create the div, label, input, and error span elements
                        var div = createDiv(this.instaformObj.inputs[inputData]);
                        var label = createLabel(this.instaformObj.inputs[inputData]);
                        var input = createInput(this.instaformObj.inputs[inputData]);
                        var spans = createValidationSpans(this.instaformObj.inputs[inputData]);
                        var br = document.createElement("br");
                        var br2= document.createElement("br");
                        
                        //append label to div
                        div.appendChild(label);
                        
                        div.appendChild(br);
                        //append input to div
                        div.appendChild(input);
                        //loop and append all error spans
                        for(var i = 0; i < spans.length; i++){
                            div.appendChild(spans[i]);
                        }
                        
                        //append div to form
                        form.appendChild(div);
                        form.appendChild(br2); 
                    }
                    
                }
            }else{
                throw "No formPlus Attribute: inputs"; 
            }
            
            //append submit button
            var submitButton = createSubmitButton();
            form.appendChild(submitButton);	
            
            //hack to get the html of a dom element in pure js
            var tempDiv = document.createElement("div");
            tempDiv.appendChild(form);	
            var html = tempDiv.innerHTML;

            var result = $(form).appendTo(element);
            $compile(result)(scope);
            
        }
    }
	
});




class CalcController {

    constructor() {

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._timeEl = document.querySelector("#hora");
        this._dataEl = document.querySelector("#data");
        this._v1 = document.querySelector("#v1");
        this._x1 = document.querySelector("#x1");
        this._x2 = document.querySelector("#x2");
        this._back = document.querySelector("#back");
        this._truck = document.querySelector("#sinalTruck");
        this._buttonTodo = document.querySelectorAll(".ButtosDisabled button");

        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }

    initialize() {
        this.setDisplayDateTime();

        this.setLastNumberToDisplay();

        this._v1.disabled = true;
        this._x1.disabled = true;
        this._x2.disabled = true;
        this._back.disabled = true;
        this._truck.disabled = true;

    }

    addEventListenerAll(element, events, fn) {

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);

        });
    }

    clearAll() {
        this._operation = [];

        this.setLastNumberToDisplay();
    }

    clearEntry() {

        this._operation.pop();

        this.setLastNumberToDisplay();

    }

    getLastOperation() {

        return this._operation[this._operation.length - 1];

    }

    setLastOperation(value) {
       return this._operation[this._operation.length -1 ] = value;

    }

    isOperator(value) {
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);
    }

    pushOperation(value) {

        this._operation.push(value);

        if(this._operation.length > 3) {

            this.calc();

        }
    }

    calc() {

        let last = '';

        if (this._operation.length > 3) {
            last = this._operation.pop();
        }


        let result = eval(this._operation.join(""));

        if(last == '%') {
            //result = result / 100;
            result /= 100;

            this._operation = [result];
            

        } else {
            this._operation = [result];

            if (last) this._operation.push(last);
        
        }

        this.setLastNumberToDisplay();

    }

    setLastNumberToDisplay() {

        let lastNumber;

        for(let i =  this._operation.length-1; i >= 0; i--) {

            if(!this.isOperator(this._operation[i])) {
                lastNumber = this._operation[i];
                break;
            }
        }

        if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;
    }

    addOperation(value) {

        //console.log('A', value, isNaN(this.getLastOperation()))

        if(isNaN(this.getLastOperation())) {
            //string

            if(this.isOperator(value)) {
                //trocar operador
                this.setLastOperation(value);

            } else if(isNaN(value)) {
                   //outra coisa
                   console.log('Outra coisa ', value);
            } else {
                this.pushOperation(value);

                this.setLastNumberToDisplay();

            }

        } else {
            //Number

            if(this.isOperator(value)) {
                this.pushOperation(value);
            } else {
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

                //atualizar display
                this.setLastNumberToDisplay();

            }

        }

        console.log(this._operation);

    }

    setError() {
        this.displayCalc = "Error";
    }

    execBtn(value) {

        switch (value) {

            case 'C':
                this.clearAll();
                break;
            case 'CE':
                this.clearEntry();
                break;
            case '÷':
                this.addOperation('/');
                break;
            case 'X':
                this.addOperation('*');
                break;
            case '-':
                this.addOperation('-');
                break;
            case '+':
                this.addOperation('+');
                break;
            case '=':
                //this.addOperation('=');
                this.calc();
                break;
            case ',':
                this.addOperation(',');
                break;
            case '%':
                this.addOperation('%');
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();
                break;
        }

    }

    initButtonsEvents() {
        let buttons = document.querySelectorAll("#buttons .row button");

        buttons.forEach((btn, index) => {

            this.addEventListenerAll(btn, 'click drag', e => {

                let textBtn = btn.innerHTML;

                this.execBtn(textBtn);

                //nunca tirar
                console.log(textBtn);
            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {

                btn.style.cursor = "cell";

            });

        })

    }
    
    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        return this._timeEl.innerHTML = value;
    }

    get displayDate() {
        return this._dataEl.innerHTML;
    }

    set displayDate(value) {
        return this._dataEl.innerHTML = value;
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        this._currentDate = value;
    }

}
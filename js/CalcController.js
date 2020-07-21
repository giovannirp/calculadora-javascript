class CalcController {

    constructor() {

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._timeEl = document.querySelector("#hora");
        this._dataEl = document.querySelector("#data");

        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }

    initialize() {
        this.setDisplayDateTime();
    }

    addEventListenerAll(element, events, fn) {

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);

        });
    }

    clearAll() {
        this._operation = [];
    }

    clearEntry() {

        this._operation.pop();

    }

    getLastOperation() {

        return this._operation[this._operation.length - 1];

    }

    setLastOperation(value) {
       return this._operation[this._operation.length -1 ] = value;

    }

    isOperator(value) {
       // return (['+', '-', 'X', '%', '/'].indexOf(value) > - 1);
        return (['+', '-', 'X', '%', '/'].indexOf(value) > -1);
    }

    pushOperation(value) {

        this._operation.push(value);

        if(this._operation.length > 3) {

            this.calc();

        }
    }

    calc() {
        let last = this._operation.pop();

        let result = eval(this._operation.join(""));

        this._operation = [result, last];

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
                this.addOperation('=');
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
class CalcController {

    constructor() {

        this._operation = [];
        this._displayCalcEl = document.querySelector("#display");
        this.initialize();
        this.initButtonsEvents();
    }

    initialize() {

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

    addOperation(value) {
        
        this._operation.push(value);

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
                break;
            case 'X':
                break;
            case '-':
                break;
            case '+':
                break;
            case '=':
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

        buttons.forEach((btn, index)=>{

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

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

}
describe('appController.js', () => {
    let appController;

    beforeEach(() => {
        appController = new AppController();
    });

    //O R D E R
    describe('= O R D E R work =', () => {
        let orderElem;

        beforeEach(() => {
            appController.order.addPizza(new Pizza(['ham'], 'medium'))
            orderElem = document.createElement('div');
            orderElem.classList.add('order');
            document.body.appendChild(orderElem);
        });

        afterEach(() => {
            orderElem.parentNode.removeChild(orderElem);
        });

        describe('renderPizzasInOrder()', () => {

            it('should to have correct binding for pizza', () => {
                appController.renderPizzasInOrder();

                const pizza = document.querySelectorAll('.order .pizza')[0];
                const size =  pizza.querySelector('.size').textContent;
                const toppings =  pizza.querySelector('.toppings').textContent;
                const price =  pizza.querySelector('.price').textContent;

                expect(size).toBe('medium');
                expect(toppings).toBe('ham');
                expect(price).toBe('0.75$');
            });

            it('should to have correct quantity pizzas in order', () => {
                appController.renderPizzasInOrder();
                expect(orderElem.querySelectorAll('.pizza').length).toBe(appController.order.pizzas.length);
            });

            it('should to remove invoke pizza in order', () => {
                window.appController = new AppController();
                const removePizzaSpy = spyOn(window.appController, 'removePizza');

                appController.renderPizzasInOrder();
                const removeBtn = orderElem.querySelectorAll('.pizza')[0].querySelector('button');
                removeBtn.click();

                expect(removePizzaSpy).toHaveBeenCalled();
            });

            it('should to show no pizzas', () => {
                appController.order.pizzas = [];
                appController.renderPizzasInOrder();
                expect(orderElem.textContent).toBe('No pizzas in order');
            });
        });

        describe('initOrder()', () => {
            let responsePizzasMock = [
                {
                    "toppings": ["ham", "bacon"],
                    "size": "large"
                },
                {
                    "toppings": ["corn", "olives"],
                    "size": "medium"
                }
            ];
            it('should to set pizzas to order', async () => {
                const requestSpy = spyOnProperty(appController, 'pizzas').and.returnValue(Promise.resolve(responsePizzasMock));
                const addPizzaSpy = spyOn(appController.order, 'addPizza');

                await appController.initOrder();

                expect(requestSpy).toHaveBeenCalled();
                expect(addPizzaSpy).toHaveBeenCalledTimes(responsePizzasMock.length);
            });
        });

        describe('init()', () => {

            it('should to run init', async () => {
                const requestSpy = spyOn(appController, 'initOrder').and.returnValue(Promise.resolve());
                const renderOrderSpy = spyOn(appController, 'renderOrder');

                await appController.init();

                expect(requestSpy).toHaveBeenCalled();
                expect(renderOrderSpy).toHaveBeenCalled();
            });
        });

        describe('renderOrder()', () => {

            it('should to invoke inside functions', () => {
                const renderPizzasInOrderSpy = spyOn(appController, 'renderPizzasInOrder');
                const renderAddPizzaButtonInOrderSpy = spyOn(appController, 'renderAddPizzaButtonInOrder');
                const renderTotalPriceInOrderSpy = spyOn(appController, 'renderTotalPriceInOrder');

                appController.renderOrder();
                expect(renderPizzasInOrderSpy).toHaveBeenCalled();
                expect(renderAddPizzaButtonInOrderSpy).toHaveBeenCalled();
                expect(renderTotalPriceInOrderSpy).toHaveBeenCalled();
            });
        });

        describe('pizzas()', () =>{

            it('should to run fetch', () => {
                let fetch = appController.pizzas;
                expect(fetch).toBeDefined();
            });
        });

        describe('renderAddPizzaButtonInOrder()', () => {

            it('should to render button', () => {
                appController.renderAddPizzaButtonInOrder();
                const btn = orderElem.querySelector('.button');
                expect(btn).toBeDefined();
                expect(btn.textContent).toBe('Add pizza');
            });

            it('should to add pizza in order', () => {
                window.appController = new AppController();
                const addPizzaSpy = spyOn(window.appController, 'addPizzaForm');
                appController.renderAddPizzaButtonInOrder();
                const btn = orderElem.querySelector('.button');
                btn.click();

                expect(addPizzaSpy).toHaveBeenCalled();
            });
        });

        describe('renderTotalPriceInOrder()', () => {

            it('should to render total price',  () => {
                appController.renderTotalPriceInOrder();
                const totalPrice = orderElem.querySelector('.is-size-2');
                const str = totalPrice.textContent.match(/Total Price:/);
                expect(totalPrice).toBeDefined();
                expect(str[0]).toBe('Total Price:')
            });
        });

        describe('removePizza()', () => {

            it('should to invoke inside functions', () => {
                const orderRemovePizzaSpy = spyOn(appController.order, 'removePizza');
                const renderOrderSpy = spyOn(appController, 'renderOrder');
                const replaceFormSpy = spyOn(appController, 'replaceForm');
                const hideFormSpy = spyOn(appController, 'hideForm');

                appController.removePizza();

                expect(orderRemovePizzaSpy).toHaveBeenCalled();
                expect(renderOrderSpy).toHaveBeenCalled();
                expect(replaceFormSpy).toHaveBeenCalled();
                expect(hideFormSpy).toHaveBeenCalled();
            });
        });


    });

    // FORM
    describe('= F O R M work =', () => {
        let form;
        let radioCheckboxes;

        beforeEach(() => {
            form = document.createElement('form');
            form.classList.add('pizza-editor');
            form.innerHTML = `
            <div class="size mb-15">
                <h5 class="is-size-5">Size:</h5>
                <label class="radio"><input type="radio" name="size" value="small">Small</label>
                <label class="radio"><input type="radio" name="size" value="medium">Medium</label>
            </div>
            <div class="toppings">
                <h5 class="is-size-5">Toppings:</h5>
                <label class="checkbox"><input type="checkbox" value="bacon" name="toppings">Bacon</label>
                <label class="checkbox"><input type="checkbox" value="hum" name="toppings">Hum</label>
            </div>`
            document.body.appendChild(form);

            const sizeRadio = document.querySelector('.pizza-editor').querySelectorAll('input[type=radio]');
            const toppingsCheckboxes = document.querySelector('.pizza-editor').querySelectorAll('input[type=checkbox]');

            radioCheckboxes = {
                sizeRadio,
                toppingsCheckboxes
            }
        });

        afterEach(() => {
            form.parentNode.removeChild(form);
        });

        describe('handleForm()', () => {

            it('should to invoke inside functions', () => {
                const replaceFormSpy = spyOn(appController, 'replaceForm');
                const resetFormElementsSpy = spyOn(appController, 'resetFormElements');
                const setFormElementsSpy = spyOn(appController, 'setFormElements');
                const setFormChangeHandlersSpy = spyOn(appController, 'setFormChangeHandlers');
                const showFormSpy = spyOn(appController, 'showForm');

                appController.handleForm();

                expect(replaceFormSpy).toHaveBeenCalled();
                expect(resetFormElementsSpy).toHaveBeenCalled();
                expect(setFormElementsSpy).toHaveBeenCalled();
                expect(setFormChangeHandlersSpy).toHaveBeenCalled();
                expect(showFormSpy).toHaveBeenCalled();
            });
        });

        describe('resetFormElements()', () => {

            it('should to get form elements ', () => {
                const getFormElementsSpy = spyOn(appController, 'getFormElements').and.returnValue(radioCheckboxes);
                appController.resetFormElements();
                expect(getFormElementsSpy).toHaveBeenCalled();
            });

        });

        describe('setFormElements()', () => {

            it('should to get form elements', () => {
                const getFormElementsSpy = spyOn(appController, 'getFormElements').and.returnValue(radioCheckboxes);
                appController.setFormElements(new Pizza(['ham'], 'medium'));
                expect(getFormElementsSpy).toHaveBeenCalled();
            });
        });

        describe('getFormElements()', () => {

            it('should to return form elements', () => {
                appController.getFormElements();
                expect(appController.getFormElements()).toBeDefined();
                expect(appController.getFormElements()).toBeObject();
                expect(appController.getFormElements()).toBeNonEmptyObject();
            });
        });

        describe('setFormChangeHandlers',  () => {

            it('should to have addEventListener method for input', () => {
                const addEventListenerSpy = spyOn(form.querySelectorAll('input')[0], 'addEventListener');
                appController.setFormChangeHandlers();
                expect(addEventListenerSpy).toHaveBeenCalled();
            });

            it('should invoke renderOrder() because onChange event', () => {
                const renderOrderSpy = spyOn(appController, 'renderOrder');
                appController.setFormChangeHandlers(new Pizza(['ham'], 'medium'));

                const inp = form.querySelectorAll('input')[0];
                const event = new Event('change');
                inp.dispatchEvent(event);
                expect(renderOrderSpy).toHaveBeenCalled();
            });
        });

        describe('serializeForm()', () => {

            it('should to return serialize object', () => {
                const serializeForm = appController.serializeForm(form);
                expect(serializeForm).toBeDefined();
                expect(serializeForm).toBeObject();
                expect(serializeForm).toBeNonEmptyObject();
            });
        });

        describe('addPizzaForm()', () => {

            it('should to invoke inside functions', () => {
                const addPizzaSpy = spyOn(appController.order, 'addPizza')
                const showFormSpy = spyOn(appController, 'showForm');
                const handleForm = spyOn(appController, 'handleForm');
                const renderOrder = spyOn(appController, 'renderOrder');

                appController.addPizzaForm();

                expect(addPizzaSpy).toHaveBeenCalled();
                expect(showFormSpy).toHaveBeenCalled();
                expect(handleForm).toHaveBeenCalled();
                expect(renderOrder).toHaveBeenCalled();
            });
        });

        describe('replaceForm()', () => {

            it('should replace form', () => {
                const replaceFormSpy = spyOn(form.parentNode, 'replaceChild');
                appController.replaceForm();
                expect(replaceFormSpy).toHaveBeenCalled();
            });
        });

        describe('hideForm()', () => {

            it('should to hide form', () => {
                appController.hideForm();
                expect(form.style.display).toBe('none');
            });
        });

        describe('showForm()', () => {

            it('should show Form', () => {
                appController.showForm();
                expect(form.style.display).toBe('block');
            });
        });

    });




});
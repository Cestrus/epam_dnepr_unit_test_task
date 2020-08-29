describe('pizza.js', () => {
    let correctToppings;
    let correctSize;
    let pizza;

    beforeEach(() => {
        correctToppings = ['sausage', 'corn', 'mushrooms']; // 0.5, 0.25, 0.25 = 1.0
        correctSize = 'medium'; //1.5
        pizza = new Pizza(correctToppings, correctSize);
    })
    
    describe('Pizza', () => {

        it('can be instantiated class Pizza ', () => {
            let pizza2 = new Pizza(correctToppings, correctSize);
            expect(pizza).toBeDefined();
            expect(pizza2).toBeTruthy();
            expect(pizza).toEqual(pizza2);
        });

    });

    describe('pizzaPrice()', () => {

        it('has pizzaPrice method', () => {
            expect(pizza.pizzaPrice).toBeDefined();
        });

        it('should called toppingPrice getter in pizzaPrice', () => {
            let toppingsPriceSpy = spyOnProperty(pizza, 'toppingsPrice');
            pizza.pizzaPrice;
            expect(toppingsPriceSpy).toHaveBeenCalled();
        })

        it('return correct pizza price', () => {
            expect(pizza.pizzaPrice).toBe(1.5);
        });

        it('handle incorrect size', () => {
            let incorrectSize = 'big';
            let pizza = new Pizza(correctToppings, incorrectSize);
            expect(pizza.pizzaPrice).toBe(0);
            expect(pizza.pizzaPrice).toBeFalsy();
        });
    });

    describe('toppingsPrice()', () => {

        it('has pizzaPrice method', () => {
            expect(pizza.toppingsPrice).toBeDefined();
        });

        it('return correct topping price', () => {
            expect(pizza.toppingsPrice).toBe(1);
        });

        it('handle incorrect topping', () => {
            let incorrectToppings = ['cat'];
            let pizza = new Pizza(incorrectToppings, correctSize);
            expect(() => pizza.toppingsPrice).toThrow();
            expect(() => pizza.toppingsPrice).toThrowError(Error, `Topping ${incorrectToppings[0]} can't find`);
        });

        xit('handle without toppings', () => {
            window.toppings = {};
            expect(() => pizza.toppingsPrice).toThrow();
            expect(() => pizza.toppingsPrice).toThrowError(Error, `Toppings can't find`);
        })
    });
})
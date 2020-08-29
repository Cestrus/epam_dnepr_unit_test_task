describe('order.js', () => {
    let order;

    beforeEach(() => {
        order = new Order();
    });
    
    describe('Order', () => {

        it('can be instantiated class Order ', () => {
            let order2 = new Order()
            expect(order).toBeDefined();
            expect(order2).toBeTruthy();
            expect(order2).toEqual(order);
        });

        it('should initialize pizzas array', () => {
            expect(order.pizzas).toBeDefined();
            expect(order.pizzas).toBeArray();
        } );  
    });

    describe('addPizza()', () => {
        let pizza;

        beforeEach(() => {
            pizza = new Pizza();
        });

        it('has add pizza methods', () => {
            expect(order.addPizza).toBeDefined();
        });

        it('should add object pizza', () => {
            let addPizzaSpy = spyOn(order, 'addPizza');
            order.addPizza(pizza);
            expect(addPizzaSpy).toHaveBeenCalledWith(pizza);
        });

        it('should invoke push method', () => {
            let pushSpy = spyOn(order.pizzas, 'push');
            order.addPizza(pizza);
            expect(pushSpy).toHaveBeenCalled();
            expect(pushSpy).toHaveBeenCalledWith(pizza);
        })
        
        it('should add pizza to order', () => {
            let length = order.pizzas.length;
            order.addPizza(pizza);            
            expect(order.pizzas.length - length).toBe(1);
        });
    });

    describe('removePizza()', () => {

        it('has remove pizzas methods', () => {
            expect(order.removePizza).toBeDefined();
        });

        it('should remove pizza to order', () => { 
            order.pizzas = [new Pizza()];
            order.removePizza(0);;            
            expect(order.pizzas.length).toBe(0);
        });
    });

    describe('totalPrice()', () => {

        beforeEach(() => {
            order.pizzas = [
                {pizzaPrice: 10}, 
                {pizzaPrice: 5}
            ];
        });              

        it('has totalPrice method', () => {
            expect(order.totalPrice).toBeDefined();
        });

        it('return correct pizzas price', () => {
            expect(order.totalPrice).toBe(15);
        });

        it('handles cost 0', () => {
            order.pizzas[1] = {pizzaPrice: 0};
            expect(order.totalPrice).toBe(10);
        });

        it('handler incorrect value price', () => {
            order.pizzas[1] = {pizzaPrice: ''};
            expect(order.totalPrice).toBe(10);
        });        
    });
})
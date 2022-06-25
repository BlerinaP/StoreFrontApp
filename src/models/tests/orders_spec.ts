import {Orders, STOREFRONT_ORDERS} from "../order";
const store = new STOREFRONT_ORDERS()


describe("Orders Model", () => {
    const OrderCreated = {
        id: 1,
        user_id: 1,
        status: 'shipped'
    };
    async  function createOrder (order){
        return store.create(order)
    }

    async function deleteOrder (id:string){
        return store.delete(id)
    }

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have an create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have an show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have an delete method', () => {
        expect(store.delete).toBeDefined();
    });
    it("Index Method should return a list of users", async () => {
        const newOrder = await createOrder(OrderCreated)
        const list = await store.index();
        expect(list).toEqual([newOrder])
        await deleteOrder(String(newOrder.id))
    });
    it('Should create a order',  async () => {
        const newOrder = await createOrder(OrderCreated)
        if(newOrder){
            expect(newOrder.user_id).toBeDefined();
            expect(newOrder.status).toEqual(OrderCreated.status)
        }
        await deleteOrder(String(newOrder.id))
    });
    it('Should show a order', async() => {
        const newOrder = await createOrder(OrderCreated)
        const orderDb = await store.show(String(newOrder.id));
        expect(orderDb).toEqual(newOrder)
        await deleteOrder(String(newOrder.id))
    });
    it('delete method should remove the user', async () => {
        const newOrder = await createOrder(OrderCreated)
        await deleteOrder(String(newOrder.id))
        const list = await store.index();

        expect(list).toEqual([]);
    });
});


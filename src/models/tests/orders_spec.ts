import {Orders, STOREFRONT_ORDERS} from "../order";
const store = new STOREFRONT_ORDERS()
const OrderCreated = {
    user_id: 1,
    status: 'shipped'
};
describe("Orders Model", () => {
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
        const res = await store.index();
        expect(Array.isArray(res)).toBe(true);
    });
    it('Should create a order',  async () => {
        const res = await store.create({
            user_id: OrderCreated.user_id,
            status: OrderCreated.status
        });
        expect(res.user_id).toBeDefined();
        expect(res.status).toEqual(OrderCreated.status)
    });
    it('Should show a user', async() => {
        const res = await store.show(`1`);
        expect(res.user_id).toBeDefined();
        expect(res.status).toEqual(OrderCreated.status)
    });
    it('delete method should remove the user', async () => {
        store.delete(`1`);
        const res = await store.index();

        expect(Array.isArray(res)).toBe(true);
    });
});


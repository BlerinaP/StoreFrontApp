import {Products, STOREFRONT_PRODUCTS} from "../products";
const store = new STOREFRONT_PRODUCTS();
const ProductCreated = {
    id: 1,
    name: 'shoes',
    price: 12
};
describe("Products Model", () => {
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
    it('Should create a product',  async () => {
        const res = await store.create({
            id: ProductCreated.id,
            name: ProductCreated.name,
            price: ProductCreated.price
        });
        expect(res.id).toBeDefined();
        expect(res.name).toEqual(ProductCreated.name);
        expect(res.price).toEqual(ProductCreated.price)
    });
    it('Should show a product', async() => {
        const res = await store.show(`1`);
        expect(res.id).toBeDefined();
        expect(res.price).toEqual(ProductCreated.price);
        expect(res.name).toEqual(ProductCreated.name);
    });
    it('delete method should remove the user', async () => {
        store.delete(`1`);
        const res = await store.index();

        expect(Array.isArray(res)).toBe(true);
    });
});


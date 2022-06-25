import {Products, STOREFRONT_PRODUCTS} from "../products";
const store = new STOREFRONT_PRODUCTS();



describe("Products Model", () => {
    const ProductCreated = {
        id: 1,
        name: 'shoes',
        price: 12
    };
    async  function createProduct (product){
        return store.create(product)
    }
    async function deleteProduct (id:string){
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
        const newProduct = await createProduct(ProductCreated);
        const list = await store.index()
        expect(list).toEqual([newProduct])
        await deleteProduct(String(newProduct.id))
    });
    it('Should create a product',  async () => {
        const newProduct = await createProduct(ProductCreated);
        if(newProduct){
            expect(newProduct.name).toEqual(ProductCreated.name);
            expect(newProduct.price).toEqual(ProductCreated.price)
        }
        await deleteProduct(String(newProduct.id))
    });
    it('Should show a product', async() => {
        const newProduct = await createProduct(ProductCreated);
        const prodDb = await store.show(String(newProduct.id));
        expect(prodDb).toEqual(newProduct)
        await deleteProduct(String(newProduct.id))
    });
    it('delete method should remove the user', async () => {
        const newProduct = await createProduct(ProductCreated);
        await deleteProduct(String(newProduct.id))
        const list = await store.index()

        expect(list).toEqual([])
    });
});


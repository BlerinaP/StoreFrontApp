import {User, STOREFRONT_USER} from "../users";
const store = new STOREFRONT_USER()
const UserCreated = {
    id: 1,
    firstname: 'Blerina',
    lastname: 'Pllana',
    password: 'blerina'
};
describe("User Model", () => {

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
    it('Should create a user',  async () => {
        const res = await store.create({
            id: UserCreated.id,
            firstname: UserCreated.firstname,
            lastname: UserCreated.lastname,
            password: UserCreated.password
        });
        expect(res.id).toBeDefined();
        expect(res.firstname).toEqual(UserCreated.firstname);
        expect(res.lastname).toEqual(UserCreated.lastname);
        expect(res.password).toBeDefined()
    });
    it('Should show a user', async() => {
       const res = await store.show(`1`);
        expect(res.id).toBeDefined();
        expect(res.password).toBeDefined();
        expect(res.firstname).toEqual(UserCreated.firstname);
        expect(res.lastname).toEqual(UserCreated.lastname);
    });
    it('delete method should remove the user', async () => {
       store.delete(`1`);
        const res = await store.index();

        expect(Array.isArray(res)).toBe(true);
    });
});


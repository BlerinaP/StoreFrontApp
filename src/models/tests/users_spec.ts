import {User, STOREFRONT_USER} from "../users";
const store = new STOREFRONT_USER()


describe("User Model", () => {
    const UserCreated = {
        id: 1,
        firstname: 'Blerina',
        lastname: 'Pllana',
        password: 'blerina'
    };
    async  function createUser (user){
        return store.create(user)
    }

    async function deleteUser (id:string){
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
        const newUser = await createUser(UserCreated);
        const list = await store.index();
        expect(list).toEqual([newUser])
        await deleteUser(String(newUser.id))
    });
    it('Should create a user',  async () => {
        const newUser = await createUser(UserCreated);
        if(newUser) {
            expect(newUser.firstname).toEqual(UserCreated.firstname);
            expect(newUser.lastname).toEqual(UserCreated.lastname);
            expect(newUser.password).toBeDefined()
        }
        await deleteUser(String(newUser.id))
    });
    it('Should show a user', async() => {
        const newUser = await createUser(UserCreated);
        const dbUser = await store.show(String(newUser.id));
        expect(dbUser).toEqual(newUser)
        await deleteUser(String(newUser.id))
    });
    it('delete method should remove the user', async () => {
        const newUser = await createUser(UserCreated);
        await deleteUser(String(newUser.id))
        const list = await store.index()
        expect(list).toEqual([])
    });
});


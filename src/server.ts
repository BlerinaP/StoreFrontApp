import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import users_routes from "./handlers/users";
import products_routes from "./handlers/products"
import order_routes from "./handlers/order";

export const app: express.Application = express();
const port: number = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
});

users_routes(app);
products_routes(app);
order_routes(app);

app.listen(port, function () {
    console.log(`starting app on: ${port}`)
});

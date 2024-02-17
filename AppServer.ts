import dotenv from 'dotenv';
import {App} from './App';

dotenv.config();

const port = process.env.PORT;
let server: any = new App().express;
server.listen(port);
console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
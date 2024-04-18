import { config } from "dotenv";
config();
import './database'

import { CreateApplication } from "./utils/function";


const PORT = process.env.PORT || 3000;

async function main() {
    try {
        const app = CreateApplication()
        console.clear()
        app.listen(PORT, () => { console.log(`Launched at http://localhost:${PORT}`) })
        // console.log(`Running in ${process.env.ENVIRONMENT} mode...`);
    } catch (error) {
        console.log(error)
    }
}

main();
//hola
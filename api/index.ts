import express from "express";
import messagesRouter from "./routers/messages";
import fs = require("fs");
import fileMessage from "./fileMessage";

const app = express();
const port = 8000;

app.use(express.json());
app.use('/messages', messagesRouter);

const run = async () => {

    if (fs.existsSync('./messages.json')) {
        await fileMessage.init();
    } else {
        fs.writeFileSync('./messages.json', JSON.stringify([]));
    }

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
}

run().catch(err => console.error(err));
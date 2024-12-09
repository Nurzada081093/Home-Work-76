import express from 'express';
import fileMessage from "../fileMessage";
import {ISendMessage} from "../types";

const messagesRouter = express.Router();

messagesRouter.get("/", async (req, res) => {

    const allMessages = await fileMessage.getMessages();

    const queryDate = req.query.datetime as string;

    if (queryDate) {
        const date = new Date(queryDate);

        if (isNaN(date.getTime())) {
            res.status(400).send({ error: "Invalid date!" });
            return;
        }

        const lastMessagesDate = allMessages.filter((message) => {
            const messageDate = new Date(message.datetime);
            return messageDate.getTime() > date.getTime();
        });

        res.send(lastMessagesDate);
        return;
    } else {
        const lastMessages = allMessages.reverse().slice(0, 30);
        res.send(lastMessages);
    }

});

messagesRouter.post("/", async (req, res) => {

    if (req.body.message && req.body.author) {
        const message: ISendMessage = {
            message: req.body.message,
            author: req.body.author,
        }

        res.send(await fileMessage.postMessage(message));
    } else {
        res.status(400).send({error : "Author and message must be present in the request"});
    }

});

export default messagesRouter;
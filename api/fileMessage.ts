import {promises as fs} from  'fs';
import crypto from 'crypto';
import {IMessage, ISendMessage} from "./types";

const fileName = './messages.json';
let messages: IMessage[] = [];

const fileMessage = {
    async init() {
        try {
            const fileContent = await fs.readFile(fileName);
            messages = JSON.parse(fileContent.toString()) as IMessage[];
        } catch (e) {
            console.log(e);
        }
    },

    async getMessages() {
        return messages;
    },

    async postMessage(message: ISendMessage) {
        const id = crypto.randomUUID();
        const datetime = new Date().toISOString();
        const userMessage = {
            ...message,
            id,
            datetime,
        };
        messages.push(userMessage);
        await this.saveMessages();
        return userMessage;
    },

    async saveMessages() {
        return fs.writeFile(fileName, JSON.stringify(messages));
    }
}

export default fileMessage;
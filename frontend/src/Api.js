import axios from "axios";

const baseUrl = 'http://localhost:8000';

function getUser(name) {
    return axios.get(`${baseUrl}/users?name=${name}`);
}

function sendMessage(userId, content) {
    return axios.post(`${baseUrl}/messages`, {
        authorId: userId,
        content: content,
        timeSent: new Date()
    });
}

function getAllMessages() {
    return axios.get(`${baseUrl}/messages`);
}

function editMessage(id, content) {
    return axios.put(`${baseUrl}/messages?id=${id}`, {
        content: content,
        timeEdited: new Date()
    });
}

function deleteMessage(id) {
    return axios.delete(`${baseUrl}/messages?id=${id}`);
}

function sendReply(userId, messageId, content) {
    return axios.post(`${baseUrl}/messages/replies`, {
        authorId: userId,
        messageId: messageId,
        content: content,
        timeSent: new Date()
    });
}

export {
    getUser,
    sendMessage,
    getAllMessages,
    deleteMessage,
    editMessage,
    sendReply
};
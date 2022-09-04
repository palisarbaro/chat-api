export default class Message{
    id: number
    author: string
    text: string
    date: Date
    constructor(id: number, author: string, text: string, date: Date){
        this.id = id
        this.author = author
        this.text = text
        this.date = date
    }
}
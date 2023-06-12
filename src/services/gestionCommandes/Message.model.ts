export class Message{
        constructor(
            public type?: string,
            public senderID?: any,
            public receiverID?: any,
            
            public data?: any
        ){}
}
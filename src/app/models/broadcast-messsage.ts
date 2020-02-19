export class BroadcastMesssage {
    message: string;
    messageType: MessageType;
}

export enum MessageType {
    Data,
    Signout
}
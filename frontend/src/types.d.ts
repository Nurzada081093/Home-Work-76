export interface IMessage {
  message: string;
  author: string;
  datetime: string;
  id: string;
}

export interface INewMessage {
  message: string;
  author: string;
}

export interface DataTime {
  data: string;
  time: string;
}
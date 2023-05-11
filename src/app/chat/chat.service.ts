import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http'
import { ApiAiClient } from 'api-ai-javascript';


import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// Message class for displaying messages in the component
export class Message {

  constructor(public content: string, public sentBy: string) { }
}

@Injectable()
export class ChatService {

  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({ accessToken: this.token });

  conversation = new BehaviorSubject<Message[]>([]);


  constructor(private http: Http){}

    botmsg;
    bettle;

 //Send and recieve message to chatbot
 getMessages(msg:string): Promise<string>{
  return this.http.get('http://localhost:3000/connect/'+msg)
              .toPromise()
              .then(response=> response.json().data)
              .catch(this.handleError)
}

  // Sends and receives messages via DialogFlow
  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);

    return this.client.textRequest(msg)
      .then(res => {
        this.getMessages(msg).then(botmsg=>this.botmsg=botmsg);
        console.log(this.bettle);
        const speech=this.botmsg;
        const botMessage = new Message(speech, 'bot');
        this.update(botMessage);
      });
  }

 

  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }

  
  private handleError (error: any) : Promise<any>{
    console.error('An error occured',error);
    return Promise.reject(error.message||error);
}



}

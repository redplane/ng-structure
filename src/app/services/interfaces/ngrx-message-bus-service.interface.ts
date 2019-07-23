import {Observable, Subject} from 'rxjs';
import {INgRxMessageBusOptions} from "../../interfaces/ngrx-message-bus-option.interface";

// A small message queue channels - messages management.
// This service which helps modules to send and receive messages asynchronously.
export interface INgRxMessageBusService {

    //#region Methods

    /*
    * Add a message channel to message bus.
    * */
    addMessageChannel<T>(channelName: string, eventName: string): Subject<T>;

    /*
    * Hook message event.
    * Specifying auto create will trigger channel creation if it is not available.
    * Auto create option can cause concurrent issue, such as parent channel can be replaced by child component.
    * Therefore, it should be used wisely.
    * */
    hookMessageChannel<T>(channelName: string, eventName: string, autoCreateChannel?: boolean, messageBusOptions?: INgRxMessageBusOptions): Observable<T>;

    /*
    * Publish message to event stream.
    * Channel will be created automatically if it isn't available.
    * */
    addMessage<T>(channelName: string, eventName: string, data?: T): void;

    /*
    * Publish a message when a channel is created.
    * */
    readonly channelAddedEvent: Observable<{channelName: string, eventName: string}>;

    //#endregion

}

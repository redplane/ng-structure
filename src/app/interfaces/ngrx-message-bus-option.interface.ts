export interface INgRxMessageBusOptions {

  //#region Properties

  /*
  * Number of time that hookMessageChannel tries subscribing to a specific channel.
  * */
  channelSubscriptionAttemptTimes?: number;

  /*
  * How long should the hookMessageChannel tries to subscribe to a specific channel.
  * */
  channelSubscriptionAttemptDuration?: number;

  /*
  * Mode of subscription attempt.
  * */
  subscriptionAttemptMode: 'times' | 'duration' | 'infinite';

  /*
  * Amount of time between 2 connection retries.
  * */
  channelConnectionAttemptDelay?: number;

  //#endregion
}

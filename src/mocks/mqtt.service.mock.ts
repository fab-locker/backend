export class MqttServiceMock {
  getReceivedMessage = jest.fn().mockResolvedValue('Message received');
  publishMessage = jest.fn().mockResolvedValue('Message published');
}
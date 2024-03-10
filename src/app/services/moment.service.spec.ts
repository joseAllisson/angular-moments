import { MessagesService } from './messages.service';

describe('MessagesService', () => {
  let service: MessagesService;

  beforeEach(() => {
    service = new MessagesService();
  });

  it('should add a message and clear it after 4 seconds', (done) => {
    const message = 'Test Message';
    service.add(message);

    expect(service.message).toBe(message);

    setTimeout(() => {
      expect(service.message).toBe('');
      done();
    }, 4000);
  });

  it('should clear the message', () => {
    service.message = 'Test Message';
    service.clear();

    expect(service.message).toBe('');
  });
});

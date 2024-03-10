import { NewMomentComponent } from './new-moment.component';
import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { momentMock } from 'src/app/mock/Moment';

describe('NewMomentComponent', () => {
  let component: NewMomentComponent;
  let momentService: jasmine.SpyObj<MomentService>;
  let messagesService: jasmine.SpyObj<MessagesService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    momentService = jasmine.createSpyObj('MomentService', ['createMoment']);
    messagesService = jasmine.createSpyObj('MessagesService', ['add']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    component = new NewMomentComponent(momentService, messagesService, router);
  });

  it('should create a new moment successfully', async () => {
    // const moment = { title: 'Test Moment', description: 'Test Description', image: null };
    const formData = new FormData();
    formData.append('title', momentMock.title);
    formData.append('description', momentMock.description);

    momentService.createMoment.and.returnValue(of(formData));

    await component.createHandler(momentMock);

    expect(momentService.createMoment).toHaveBeenCalledWith(formData);
    expect(messagesService.add).toHaveBeenCalledWith('Momento compartilhado com sucesso!');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});

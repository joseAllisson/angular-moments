import { EditMomentComponent } from './edit-moment.component';
import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Moment } from 'src/app/interfaces/Moment';

describe('EditMomentComponent', () => {
  let component: EditMomentComponent;
  let momentService: jasmine.SpyObj<MomentService>;
  let messagesService: jasmine.SpyObj<MessagesService>;
  let route: jasmine.SpyObj<ActivatedRoute>;
  let router: jasmine.SpyObj<Router>;

  const momentMock: Moment = {
    id: 1,
    title: 'Test Moment 1',
    description: 'Test Description 1',
    image: 'Test Image 1',
    created_at: '2021-01-01T00:00:00.000Z',
    updated_at: '2021-01-01T00:00:00.000Z',
    comments: [{ text: 'Test Comment 1', username: 'Test User 1' }]
  }

  beforeEach(() => {
    momentService = jasmine.createSpyObj('MomentService', ['getMoment', 'updateMoment']);
    messagesService = jasmine.createSpyObj('MessagesService', ['add']);
    route = jasmine.createSpyObj('ActivatedRoute', [], { snapshot: { paramMap: { get: () => '1' } }});
    router = jasmine.createSpyObj('Router', ['navigate']);

    component = new EditMomentComponent(momentService, route, messagesService, router);
    component.moment = momentMock;
  });

  it('should edit a moment successfully', async () => {
    const formData = new FormData();
    formData.append('title', momentMock.title);
    formData.append('description', momentMock.description);

    momentService.updateMoment.and.returnValue(of(formData));

    await component.editHandler(momentMock);

    expect(momentService.updateMoment).toHaveBeenCalledWith(Number(momentMock.id), formData);
    expect(messagesService.add).toHaveBeenCalledWith(`Momento ${momentMock.id} editado com sucesso!`);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});

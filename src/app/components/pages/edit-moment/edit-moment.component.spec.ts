import { EditMomentComponent } from './edit-moment.component';
import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { momentMock } from 'src/app/mock/Moment';

describe('EditMomentComponent', () => {
  let component: EditMomentComponent;
  let momentService: jasmine.SpyObj<MomentService>;
  let messagesService: jasmine.SpyObj<MessagesService>;
  let route: jasmine.SpyObj<ActivatedRoute>;
  let router: jasmine.SpyObj<Router>;

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

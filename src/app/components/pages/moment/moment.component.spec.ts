import { MomentComponent } from './moment.component';
import { MomentService } from 'src/app/services/moment.service';
import { CommentService } from 'src/app/services/comment.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { momentMock } from 'src/app/mock/Moment';

describe('MomentComponent', () => {
  let component: MomentComponent;
  let momentService: jasmine.SpyObj<MomentService>;
  let commentService: jasmine.SpyObj<CommentService>;
  let messagesService: jasmine.SpyObj<MessagesService>;
  let route: jasmine.SpyObj<ActivatedRoute>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    momentService = jasmine.createSpyObj('MomentService', ['getMoment', 'removeMoment']);
    commentService = jasmine.createSpyObj('CommentService', ['createComment']);
    messagesService = jasmine.createSpyObj('MessagesService', ['add']);
    route = jasmine.createSpyObj('ActivatedRoute', [], { snapshot: { paramMap: { get: () => '1' } }});
    router = jasmine.createSpyObj('Router', ['navigate']);

    component = new MomentComponent(momentService, commentService, route, messagesService, router);

    // Inicialize a propriedade moment com um objeto Moment válido
    component.moment = momentMock;
  });

  it('should remove a moment successfully', async () => {
    const formData = new FormData();
    momentService.removeMoment.and.returnValue(of(formData));

    await component.removeHandler(1);

    expect(momentService.removeMoment).toHaveBeenCalledWith(1);
    expect(messagesService.add).toHaveBeenCalledWith('Momento excluído com sucesso!');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});

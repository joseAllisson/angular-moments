import { MomentComponent } from './moment.component';
import { MomentService } from 'src/app/services/moment.service';
import { CommentService } from 'src/app/services/comment.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { FormGroupDirective } from '@angular/forms';
import { Moment } from 'src/app/interfaces/Moment';
import { Comment } from 'src/app/interfaces/Comment';

describe('MomentComponent', () => {
  let component: MomentComponent;
  let momentService: jasmine.SpyObj<MomentService>;
  let commentService: jasmine.SpyObj<CommentService>;
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

  const commentMock: Comment = {
    id: '1',
    text: 'Test Comment',
    username: 'Test User',
    momentId: 1
  }

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

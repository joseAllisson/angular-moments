import { CommentService } from './comment.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Comment } from '../interfaces/Comment';
import { environment } from 'src/environments/environment';

describe('CommentService', () => {
  let service: CommentService;
  let http: jasmine.SpyObj<HttpClient>;

  let baseApiUrl = environment.baseApiUrl;
  let apiUrl = `${baseApiUrl}/api/moments`;

  const commentMock: Comment = {
    text: 'Test Comment',
    username: 'Test User',
    momentId: 1
  };

  beforeEach(() => {
    http = jasmine.createSpyObj('HttpClient', ['post']);
    service = new CommentService(http);
  });

  it('should create a comment successfully', () => {
    const response = { success: true, data: commentMock };

    http.post.and.returnValue(of(response));

    service.createComment(commentMock).subscribe((res) => {
      expect(res).toEqual(response);
      expect(http.post).toHaveBeenCalledWith(`${apiUrl}/${commentMock.momentId}/comments`, commentMock);
    });
  });
});

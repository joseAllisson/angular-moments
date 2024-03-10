import { HomeComponent } from './home.component';
import { MomentService } from 'src/app/services/moment.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let momentService: jasmine.SpyObj<MomentService>;

  const mockData = { data: [{
    id: 1,
    title: 'Test Moment 1',
    description: 'Test Description 1',
    image: 'Test Image 1',
    created_at: '2021-01-01T00:00:00.000Z',
    updated_at: '2021-01-01T00:00:00.000Z',
    comments: [{ text: 'Test Comment 1', username: 'Test User 1' }]
  }] };

  beforeEach(() => {
    momentService = jasmine.createSpyObj('MomentService', ['getMoments']);

    component = new HomeComponent(momentService);
  });

  it('should populate allMoments and moments in ngOnInit', () => {
    momentService.getMoments.and.returnValue(of(mockData));

    component.ngOnInit();

    expect(component.allMoments).toEqual(mockData.data);
    expect(component.moments).toEqual(mockData.data);
  });

  it('should filter moments based on search term in search function', () => {
    component.allMoments = mockData.data;
    component.searchTerm = 'Test Moment 1';

    const event = { target: { value: 'Test Moment 1' } } as unknown as Event;
    component.search(event);

    expect(component.moments.length).toBe(1);
  });
});

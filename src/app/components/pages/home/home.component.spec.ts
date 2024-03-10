import { HomeComponent } from './home.component';
import { MomentService } from 'src/app/services/moment.service';
import { of } from 'rxjs';
import { momentResponseApiMock } from 'src/app/mock/MomentResponseApi';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let momentService: jasmine.SpyObj<MomentService>;

  beforeEach(() => {
    momentService = jasmine.createSpyObj('MomentService', ['getMoments']);

    component = new HomeComponent(momentService);
  });

  it('should populate allMoments and moments in ngOnInit', () => {
    momentService.getMoments.and.returnValue(of(momentResponseApiMock));

    component.ngOnInit();

    expect(component.allMoments).toEqual(momentResponseApiMock.data);
    expect(component.moments).toEqual(momentResponseApiMock.data);
  });

  it('should filter moments based on search term in search function', () => {
    component.allMoments = momentResponseApiMock.data;
    component.searchTerm = 'Test Moment 1';

    const event = { target: { value: 'Test Moment 1' } } as unknown as Event;
    component.search(event);

    expect(component.moments.length).toBe(1);
  });
});

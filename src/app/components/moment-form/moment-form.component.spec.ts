import { MomentFormComponent } from './moment-form.component';

describe('MomentFormComponent', () => {
  let component: MomentFormComponent;

  beforeEach(() => {
    component = new MomentFormComponent();
  });

  it('should create a form with default values', () => {
    component.ngOnInit();

    expect(component.momentForm).toBeDefined();
    expect(component.title.value).toBe('');
    expect(component.description.value).toBe('');
    expect(component.momentForm.valid).toBeFalsy();
  });

  it('should update image control when file is selected', () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const event = { target: { files: [file] } } as unknown as Event;

    component.ngOnInit();
    component.onFileSelected(event);

    expect(component.momentForm.get('image')!.value).toBe(file);
  });

  it('should emit onSubmit event when form is submitted', () => {
    const moment = { id: '1', title: 'Test Moment', description: 'Test Description', image: null };

    component.ngOnInit();
    component.momentForm.patchValue(moment);

    let emittedMoment: any;
    component.onSubmit.subscribe((value) => {
      emittedMoment = value;
    });

    component.submit();

    expect(emittedMoment).toEqual(moment);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStudentFormComponent } from './teacher-student-form.component';

describe('TeacherStudentFormComponent', () => {
  let component: TeacherStudentFormComponent;
  let fixture: ComponentFixture<TeacherStudentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherStudentFormComponent]
    });
    fixture = TestBed.createComponent(TeacherStudentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

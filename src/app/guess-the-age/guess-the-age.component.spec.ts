import { DebugElement } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { GuessTheAgeService } from "../services/guess-the-age.service";
import { GuessTheAgeComponent } from "./guess-the-age.component";

describe('GuessTheAgeComponent', () => {

    let component: GuessTheAgeComponent;
    let fixture: ComponentFixture<GuessTheAgeComponent>;
    let element: DebugElement;
    let guessTheAgeServiceSpy: any;

    beforeEach(async () => {

        guessTheAgeServiceSpy = jasmine.createSpyObj('GuessTheAgeService', ['getAge']);

        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule
            ],
            providers: [
                { provide: GuessTheAgeService, useValue: guessTheAgeServiceSpy }
            ],
            declarations: [
                GuessTheAgeComponent
            ]
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(GuessTheAgeComponent);
                component = fixture.componentInstance;
                element = fixture.debugElement;
                fixture.autoDetectChanges();
            });
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('should hide predictedAge when not valid', fakeAsync(() => {
        // Arrange
        const nameWithoutAge = 'someToughName'
        guessTheAgeServiceSpy.getAge.and.returnValue(null);

        //Act + await
        component.nameControl.setValue(nameWithoutAge);
        fixture.detectChanges();

        tick(component.NAME_INPUT_WAIT_TIME);
        fixture.detectChanges();

        //Assert
        fixture.whenStable().then(() => {
            var predictedAgeEl = element.query(By.css('#predictedAge'));
            expect(predictedAgeEl).toBeNull();
        });
    }));

    it('should show predictedAge when valid', fakeAsync(() => {
        // Arrange
        const newPredictedAge = 2;
        const nameWithAge = 'someEasyName'
        guessTheAgeServiceSpy.getAge.and.returnValue(newPredictedAge);

        //Act + await
        component.nameControl.setValue(nameWithAge);
        fixture.detectChanges();

        tick(component.NAME_INPUT_WAIT_TIME);
        fixture.detectChanges();

        //Assert
        fixture.whenStable().then(() => {
            var predictedAgeEl = element.query(By.css('#predictedAge'));

            expect(predictedAgeEl).not.toBeNull();
            expect(predictedAgeEl.nativeElement.innerText).toContain(newPredictedAge);
        })
    }));

});

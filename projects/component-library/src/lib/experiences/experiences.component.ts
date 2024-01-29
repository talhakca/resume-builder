import { Component, Input, OnInit } from '@angular/core';
import { ResumeExperience } from 'src/app/content-editor/utils/resume-experience.interface';

@Component({
  selector: 'lib-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent implements OnInit {

  @Input() experiences: ResumeExperience[];

  constructor() { }

  ngOnInit(): void {
  }

}

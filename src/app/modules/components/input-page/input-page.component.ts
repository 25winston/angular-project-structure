import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import _ from 'lodash';
import CryptoJS from 'crypto-js';
import * as fs from 'fs';
import fileExists from 'file-exists';
import moment from 'moment';
import cheerio from 'cheerio';

const GET_DATA = gql`
  query GetGradeLevels {
    getGradeLevels {
      gradeLevelKey
      gradeLevelCode
      gradeLevelNameTH
      gradeLevelNameEN
      gradeLevelShortNameTH
      gradeLevelShortNameEN
      schoolSelectable
      educationLevelCode
      gradeNumber
      EDCFullName
      EDCCode
      isActive
      startdateMT
      enddateMT
    }
  }
`;

@Component({
  templateUrl: './input-page.component.html',
  styleUrls: ['./input-page.component.scss'],
})
export class InputPageComponent implements OnInit {
  private queryData1: Subscription;
  //---
  selectedValue = 'lucy';
  listOfOption = [];

  //---
  loadingData1: boolean = false;
  optionData1 = [];
  selectedData1 = '';

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    // console.log('lodash ', _);
    // console.log('CryptoJS ', CryptoJS);
    // console.log('fs ', fs);
    // console.log('fileExists ', fileExists);
    // console.log('moment ', moment);
    console.log('cheerio ', cheerio);

    //---

    setTimeout(() => {
      this.setValueOption();
    }, 5000);
    //---
    this.getOptionFromApi();
    setTimeout(() => {
      this.selectedData1 = '113';
    }, 5000);
  }

  setValueOption(): void {
    this.listOfOption = [
      { label: 'Jack', value: 'jack' },
      { label: 'Lucy', value: 'lucy' },
      { label: 'disabled', value: 'disabled', disabled: true },
    ];
  }

  //https://apollo-angular.com/docs/data/queries
  getOptionFromApi() {
    this.loadingData1 = true;
    this.queryData1 = this.apollo
      .watchQuery<any>({
        query: GET_DATA,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.optionData1 = data.getGradeLevels.map((item) => {
          return {
            label: item.gradeLevelNameTH,
            value: item.gradeLevelCode,
          };
        });
        this.loadingData1 = loading;
      });
  }

  handleChange(data) {
    console.log('onChange: ', data);
  }

  ngOnDestroy() {
    this.queryData1.unsubscribe();
  }
}

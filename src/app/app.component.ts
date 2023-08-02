import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'table-filter';

  items = dataExample;

  _itemGroups : string[] | null = null;
  get itemGroups() {
    if(!this._itemGroups) {
      this._itemGroups = [...new Set(this.items.map( item => item.features.map(feature => feature.group ) ).flat())];
    }
    return this._itemGroups;
  }

  _itemScores : string[] | null = null;
  get itemScores() {
    if(!this._itemScores)
      this._itemScores = [...new Set(this.items.map( item => item.features.map(feature => feature.score ) ).flat())];
    return this._itemScores;
  }

  getScoreCountByGroup(score: string, group: string) {
    return this.items.map( item => item.features.filter(feature => (feature.score.toLowerCase() === score.toLowerCase() && feature.group.toLowerCase() === group.toLowerCase())) ).flat().length;
  }
  getFeatureNameByGroup(item: any, group: string) {
    return item.features.filter( (feature:any) => feature.group.toLowerCase() === group.toLowerCase()).map( (f:any) => f.name);
  }
  getFeatureScoreByGroup(item: any, group: string) {
    return item.features.filter( (feature:any) => feature.group.toLowerCase() === group.toLowerCase()).map( (f:any) => f.score);
  }


  hiddenElements : Array<{group:string, score:string}> = [];
  onFilterControlChange(event: Event,group: string, score:string) {
    if((event.target as HTMLInputElement).checked) {
      this.hiddenElements = this.hiddenElements.filter( g => !(g.group === group && g.score === score));
      return;
    }
    this.hiddenElements.push({group, score});
  }


  canDisplayItem(item:any) {
    const hiddenGroups = this.hiddenElements.filter( g => g.score === '*').map( g => g.group);
    const visibleFeatures = item.features.filter( (f:any) => !hiddenGroups.includes(f.group) );
    for(const feature of visibleFeatures) {
      if( this.hiddenElements.filter( h => h.group === feature.group && h.score === feature.score).length )
        return false;
    }
    return true;
  }

  canDisplayGroup(group:string) {
    return !this.hiddenElements.filter( g => g.group === group && g.score === '*').length;
  }

}

export const dataExample = [
  {
    name: 'item 1',
    features: [
      {
        name: 'abc',
        score: 'low',
        group: 'feature group 1'
      },{
        name: 'abc',
        score: 'low',
        group: 'feature group 2'
      },{
        name: 'abc',
        score: 'low',
        group: 'feature group 3'
      },{
        name: 'abc',
        score: 'low',
        group: 'feature group 4'
      }
    ]
  },{
    name: 'item 2',
    features: [
      {
        name: 'abc',
        score: 'high',
        group: 'feature group 1'
      },{
        name: 'abc',
        score: 'medium',
        group: 'feature group 2'
      },{
        name: 'abc',
        score: 'low',
        group: 'feature group 3'
      },{
        name: 'abc',
        score: 'low',
        group: 'feature group 4'
      }
    ]
  },{
    name: 'item 3',
    features: [
      {
        name: 'abc g1',
        score: 'low',
        group: 'feature group 1'
      },{
        name: 'abc g2',
        score: 'low',
        group: 'feature group 2'
      },{
        name: 'abc g3',
        score: 'low',
        group: 'feature group 3'
      },{
        name: 'abc g4',
        score: 'low',
        group: 'feature group 4'
      }
    ]
  }
];

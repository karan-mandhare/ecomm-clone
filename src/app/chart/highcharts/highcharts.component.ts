import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { PlotSeriesDataLabelsOptions, SeriesPieOptions,PointOptionsObject } from 'highcharts';


@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.css']
})
export class HighchartsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public chart = new Chart({    
    chart: {
      type: 'pie'
  },
  title: {
      text: 'Egg Yolk Composition'
  },
  tooltip: {
      valueSuffix: '%'
  },
  subtitle: {
      text:
      'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
  },
  plotOptions: {
      series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
              enabled: true,
              distance: 20
          } as PlotSeriesDataLabelsOptions, {
              enabled: true,
              distance: -40,
              format: '{point.percentage:.1f}%',
              style: {
                  fontSize: '1.2em',
                  textOutline: 'none',
                  opacity: 0.7
              } ,
              filter: {
                  operator: '>',
                  property: 'percentage',
                  value: 10
              } 
          } as PlotSeriesDataLabelsOptions,]
      }
  },
  series: [
      {
        type:'pie',
          name: 'Percentage',
          colorByPoint: true,
          data: [
              {
                  name: 'Water',
                  y: 55.02
              } as PointOptionsObject,
              {
                  name: 'Fat',
                  sliced: true,
                  selected: true,
                  y: 26.71
              } as PointOptionsObject,
              {
                  name: 'Carbohydrates',
                  y: 1.09
              } as PointOptionsObject,
              {
                  name: 'Protein',
                  y: 15.5
              } as PointOptionsObject,
              {
                  name: 'Ash',
                  y: 1.68
              } as PointOptionsObject
            ]  
                
      } as SeriesPieOptions,
    ]
  })

}

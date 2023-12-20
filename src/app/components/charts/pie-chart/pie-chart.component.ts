import { Component, Input, ViewChild } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent {

  title = 'ng2-charts-demo';

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input() public streamData = [{
    data: ""
  }];

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  
  @Input() public pieChartLabels: Array<any> = [];
  // public pieChartDatasets = [ {
  //   data: this.dataSetInput
  // } ];


  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
  }

  adicionar() {

  }
}

import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { ActivatedRoute, Router,ParamMap } from '@angular/router';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  public id;
  public stocks;
  public price;
  public chart;
  public days = [' ','01/07',' ','02/07',' ','03/07',' ','04/07',' ','05/07',' ','06/07',' ','07/07',' ']
  constructor(private stock:StockService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params : ParamMap)=>
    {
     let id = parseInt(params.get('id'))
     this.id = id;
    });
    this.stocks = this.stock.getStockId(this.id);
    this.price = this.stock.getPrice(this.id);
  
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.days,
        datasets: [
          { 
            data: this.price,
            borderColor: "#ffffff",
            backgroundColor:"rgba(255,255,255,0.1)",
            fill: true,
            lineTension:0
          },
        ]
      },
      options: {
        responsive:true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        elements: {
          point:{
              radius: 0
          }
      },
        scales: {
          xAxes: [{
            display: true,
            barPercentage:0.4,
             gridLines:
             {
               display:false,
               color:'rgba(255,255,255,0.1)'
             },
             scaleLabel: {
              display: true,
              labelString: 'DAYS OF TRADE',
              fontColor:'#ffffff'
            },
            scaleBreaks: {
              autoCalculate: true
            },
            ticks: {
              fontColor: "white",
              fontSize: 14
          }
          }],
          yAxes: [{
            display: true,
            barPercentage:0.5,
            gridLines:
             {
               zeroLineColor: 'white',
               color:'rgba(255,255,255,0.1)'
             },
             scaleLabel: {
              display: false,
              // labelString: 'STOCK IN  RS',
              // fontColor:'#ffffff'
            },
            ticks: {
              fontColor: "white",
              fontSize: 14,
              stepSize: 20,
              min: 0,
              max: 100
          }
          }],
        }
      }
    });
  }

  back()
  {
    this.router.navigate(['../../'],{relativeTo : this.route})
  }
}

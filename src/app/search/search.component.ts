import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public price = [];
  public chart = [];
  public weekReport=[];
  public symbol;
  public name;
  public image;
  public flag=false;
  public time;
  public past=[];
  public show = false;
  public days = [' ','01/07',' ','02/07',' ','03/07',' ','04/07',' ','05/07',' ','06/07',' ','07/07',' ']
  constructor(private stock:StockService,private routes:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    
    this.past = this.stock.getPast();
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
  public func(value)
  {
    this.price = this.stock.getStocks(value);
    this.symbol=this.stock.getSymbol(value);
    this.name=this.stock.getName(value);
    this.image=this.stock.getImage(value);
    this.time=this.stock.getTime(value);
    this.stock.addPast(value);
    this.weekReport=this.stock.getWeekReport(value);
    if(this.price!=null)
    this.flag=true;
    else if(this.price==null)
    this.flag=false;
  }

  public viewPage(id)
  {
     this.router.navigate(['view',id],{relativeTo:this.routes});
  }
}

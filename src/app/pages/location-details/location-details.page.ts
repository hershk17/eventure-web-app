import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { poiDetail } from 'src/app/models/poiDetail.module';
import { ApiService } from 'src/app/services/api.service';
import { NavExtrasService } from 'src/app/services/navextraservice.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.page.html',
  styleUrls: ['./location-details.page.scss'],
})
export class LocationDetailsPage implements OnInit {
  id:string = null;
  loc:any;
  locDetail:poiDetail;
  money:string = "";
  constructor(
    private activatedRoute: ActivatedRoute, 
    private api: ApiService,
    private router: Router,
    private navExtras: NavExtrasService
    ) { 
      this.activatedRoute.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.locDetail= this.router.getCurrentNavigation().extras.state.loc;
        }
      });
      console.log("Receiving: " + this.locDetail);
    }

  ngOnInit() {
    this.api.getPOIdetails(this.activatedRoute.snapshot.paramMap.get('id'))
    .subscribe((data)=> {
      this.locDetail = data.result;
      console.log(this.locDetail);
    });
    this.loc = this.navExtras.getExtras();
    console.log(this.loc);
    
      for(let i = 0; i<this.locDetail.priceRange.value; i++){
        this.money += "$";
      }
    
  }
}


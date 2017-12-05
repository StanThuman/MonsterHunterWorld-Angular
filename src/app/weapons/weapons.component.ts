import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WeaponService } from '../core/weapon.service';

@Component({

  templateUrl: './weapons.component.html',
  styles: [`
    .my-margin-bottom {
      margin-bottom: 20px;
    }
    [class^="card"]{

    }
    a, a:link, a:visited {
      text-decoration: none;
      color:black;
    }
    `]


})



export class WeaponsComponent {


  bladeMasterTypes: string[] = [
    "great sword", "long sword", "sword n shield", "dual blades",
    "hammer", "hunting horn", "lance", "gunlance", "switch axe",
    "charge blade", "insect glaive"];

  gunnerTypes: string[] = [
    "light bowgun", "heavy bowgun", "bow"];

  linkTypes: string[] = [];

  weaponTypeTitle: string;

  // constructor(private router: Router){}

  @Input() currentWeaponType: string[];

  constructor(private router: Router, private route: ActivatedRoute, private weaponService: WeaponService){
    //console.log(route);


    //changes data if on the same route
    route.params.subscribe(route => {

      this.weaponTypeTitle = route.weaponType;
      this.loadWeaponType(route.weaponType);
      //temp fix
      if(this.weaponTypeTitle === 'blademaster')
        this.currentWeaponType = this.bladeMasterTypes;

      if(this.weaponTypeTitle === 'gunner')
        this.currentWeaponType = this.gunnerTypes;


      for(let i = 0; i < this.currentWeaponType.length; i++)
        this.linkTypes.push(this.currentWeaponType[i].replace(/\s/g, ''));

    })
  }

  ngOnInit(): void {
    //console.log(this.route)
  }

  //changes weapon data loaded
  loadWeaponType(urlPath: string): void{

    //temp fix
    if(urlPath === "/weapons/blademaster"){
      this.currentWeaponType = this.bladeMasterTypes;
      this.weaponTypeTitle = "blademaster";
    }

    if(urlPath === "/weapons/gunner"){
      this.currentWeaponType = this.gunnerTypes;
      this.weaponTypeTitle = "gunner";
    }

  }

  //saves weapon selection to service for next page
  setWeapon(weapon: string){
    //console.log(weapon);
    this.weaponService.setWeapon(weapon);
    weapon = weapon.replace(/\s/g, '');
  }
}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
declare var AFRAME;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public player: any;
  constructor(public navCtrl: NavController) {
    this.init();
  }

  init(){
    this.clickComponentVideo1();
    
  }
  ionViewDidLoad(){
    this.player = document.getElementById('video');
    console.log(this.player);
  }
  clickComponentVideo1(){
    let parent = this;
    AFRAME.registerComponent('click-home',{
      init: function(){
        this.el.addEventListener('click',function(evt){
          parent.player.src = "assets/video/inicio.mp4"
        })
      }
    });
  
    AFRAME.registerComponent('click-huerta',{
        init: function(){
          this.el.addEventListener('click',function(evt){
            console.log('click-huerta');
            parent.player.src = "assets/video/huerta.mp4"
          })
        }
      });
    
    AFRAME.registerComponent('click-cultura',{
        init: function(){
          this.el.addEventListener('click',function(evt){
            console.log('click-huerta');
            parent.player.src = "assets/video/cultura.mp4"
          })
        }
      });
  }

}

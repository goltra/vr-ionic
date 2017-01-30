import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeAudio } from 'ionic-native';
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
    this.clickEventMenu();
    NativeAudio.preloadSimple('musica1','assets/audio/musica.mp3').then(
      (success)=>{
        NativeAudio.loop('musica1').then(
          (success)=>{console.log('sonando musica')},
          (error)=>{console.log("error al reproducir música"); console.log(error)}
        );
      },  
      (error)=>{
        console.log('Error al cargar música ');
        console.log(error)
      }
    );
  }
  ionViewDidLoad(){
    this.player = document.getElementById('video');
    console.log(this.player);
  }
  clickEventMenu(){
    let parent = this;
   
    AFRAME.registerComponent('click-menu-videos',{
        init: function(){
          this.el.addEventListener('click',function(evt){
            var e = evt.srcElement.id
            var video = "";
            switch (e) {
              case 'img-hondo':
                video = "assets/video/hondo.mp4";
                break;
              case 'img-cultura':
                video = "assets/video/cultura.mp4";
                break;
              case 'img-huerta':
                video = "assets/video/huerta.mp4";
                break;
              case 'img-inicio':
                video = "assets/video/inicio.mp4";
                break;
              case 'img-mochila':
                
                var menu = document.getElementById("menu");
                var ev;
                var scale:any = menu.getAttribute('scale');
                console.log(scale);
                // console.log(isVisible);
                if(scale.x==0 && scale.y==0 && scale.x==0)
                     ev = new Event('muestraMenu');
                 else
                     ev = new Event('ocultaMenu');

                menu.dispatchEvent(ev);
                console.log('click img-mochila')
              default:
                //video = "assets/video/inicio.mp4";
                break;
            }
            parent.player.src =video;
          })
        }
      });
  }

}

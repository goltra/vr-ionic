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
  public oldPosition: any;
  public newPosition: any;
  public texto:string="Catral";
  counter:number=1;

  constructor(public navCtrl: NavController) {
    this.init();
  }

  init(){
    this.registerEventsBeforeView();
  }
  checkView(count:number){
    console.log(count);
    console.log(this.oldPosition);
    console.log(this.newPosition);
    if(count==1){
      this.oldPosition=this.newPosition;  
    }
    let e = <any>document.querySelector('#txtAvisoMenu');
    //e.setAttribute('text', 'value',count.toString());
    if(count==5){
      if(this.oldPosition==this.newPosition){
        e.setAttribute('visible',"true");  
      } else {
        e.setAttribute('visible',"false");  
      }
      this.counter=1;
    }
  }
  ionViewDidEnter(){
    console.log('ionViewDidEnter');
    this.player = document.getElementById('video');
    
    this.registerEventsAfterView();
    setInterval(()=>this.checkView(this.counter++),2000);
    
    //this.playMusic();
    //console.log(this.player);
  }
  playMusic(){
    console.log('preparando musica');
    NativeAudio.preloadComplex('musica1','assets/audio/musica.mp3',1,1,0).then(
      (success)=>{
        NativeAudio.play('musica1').then(
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
  move(){

    //  console.log(this.scene.querySelector('#camera1').getAttribute('rotation'));
    //  console.log(this.scene.querySelector('#camera1').querySelector('[camera]'));
  }
  
  registerEventsAfterView(){
    let el = document.querySelector('a-camera');
    let parent = this;

    el.addEventListener('componentchanged',function (evt:any) {
      if (evt.detail.name=='rotation' && evt.detail.oldData.x!=evt.detail.newData.x){
        parent.newPosition = evt.detail.newData.x 
      }
    });
  }
  registerEventsBeforeView(){
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

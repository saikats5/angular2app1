import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  //selector: '[app-servers]',
  //selector: '.app-servers',
  //template: '<app-server></app-server><app-server></app-server>',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = "Server not created";
  serverName = '';
  constructor() { 
    setTimeout(()=>{
      this.allowNewServer = true;
    },3000)
  }

  onCreateServer(){
    this.serverCreationStatus = "Server created";
  }

  onUpdateServerName(event: Event){
    //this.serverName = event.target.value;
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  ngOnInit() {
  }

}

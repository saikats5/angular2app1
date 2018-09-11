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
  serverCreated = false;
  servers = ['server1', 'server2'];

  constructor() { 
    setTimeout(()=>{
      this.allowNewServer = true;
    },3000)
  }

  onCreateServer(){
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = "Server created";
  }

  onUpdateServerName(event: Event){
    //this.serverName = event.target.value;
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  ngOnInit() {
  }

}

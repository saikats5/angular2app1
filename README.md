# angular2app1

Angular is a javascript framework which allows you to create reactive Single-page-applications(SPAs)

AngularJS -> Angular1
Angular -> Angular2,4,5,6

npm install -g @angular/cli@latest
ng new my-first-app
ng serve

npm install --save bootstrap

change the css config on angular.json and then styles for bootstrap

platformBrowserDynamic().bootstrapModule(AppModule); bootstrap angular application //main.ts
bootstrap: [AppComponent] in app.module.ts //list all the components

Angular changes DOM in runtime

@element //decorator

@angular/core provides basic angular features
@NgModule declarations to add all component so that it can be bundled properly using webpack and transpiled by typescript else it will unable to transpile it from typescript and ceate a module of all components

ng generate component servers
ng g c servers

for template we can use back tick ` we can make it multi line string
styles can be used instead of styleUrls for inline styling

selector by default is element it can be used as attribute and class selector

string interpolation doesn't support multi-line, block expression(if for else), ternary operators can be used, resolve everything to string in the end

dont add curly brackets for property binding

npm install @angular/forms
unlike structural directive, attribute directives don't add or remove elements. They only change the element they are placed on.

ng g c recipes --spec false
ng g c recipes/recipe-list --spec false

Angular Augury for analyzing angular app

@Input() creates custom events from angular/core
when iterating element in child component using ngFor it will not work in child as we can't bind local property directly with parent component, it can be done using @Input()

alias of property can be used outside by @Input("aliasName") element: {};

custom event
(customevent) = "onCustomEvent($event)"

serverCreated = new EventEmitter<>({serverName: string, serverContent: string});
EventEmitter imported from angular/core
onAddServer(){
    this.serverCreated.emit({
        serverName: this.newServerName,
        serverContent: this.newServerContent
    });
}

@Output is similiar to @Input

Lifecycle contains ngOnChanges, ngOnInit, ngOnDoCheck, ngAfterContentInit, ngAfterContentChecked, ngAfterViewInit, ngAfterViewChecked, ngOnDestroy

(input) = "onDataChange($event)";
onDataChange(event: any){
    this.name = (<HTMLInputElement>event.target).name;
}
{{name}}

[(ngModel)]="name" //require to import FormsModule
import {FormsModule}   from '@angular/forms';

 Directives are instructions in the DOM
 Components are also directive

 *ngIf="nameChanged" -- structural directive - * for structural directive - changes the structure of DOM

 # -- local reference
 <ng-template></ng-template>

 structural directives add/remove elements
 attribute directive change the element they are placed in
 ngStyle
 [ngStyle] for binding -- [ngStyle]="{background: getColor()}"

 ngClass
 [ngClass]="{online: serverStatus === 'online'}"

 *ngFor="let server of servers; let i = index"

Adding bootstrap in angular.json to access it globally

ng g c recipes/recipe-list/recipe-item --spec false

<app-server-element *ngFor="let serverElement of serverElements" [srvElement]="serverElements"></app-server-element>
@Input('srvElement') element: {type: string};
import {Component, OnInit, Input } from '@angular/core';

custom events
<app-cockpit (serverCreated)="onServerAdded($event)" (bpCreated)="onBlueprintAdded($event)"></app-cockpit>
on parent component
onServerAdded(serverData: {serverName: string, serverContent: string}){
    this.serverElements.push({
        type: 'server',
        name: serverData.serverName,
        content: serverData.serverContent
    });
}
onBlueprintAdded(blueprintData: {serverName: string, serverContent: string}){
    this.serverElements.push({
        type: 'blueprint',
        name: blueprintData.serverName,
        content: blueprintData.serverContent
    });
}
on child component
@Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
@Output('bpCreated') bluePrintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
import {Component, OnInit, Output, EventEmitter } from '@angular/core';

onAddServer(){
    this.serverCreated.emit({
        serverName: this.newServerName,
        serverContent: this.newServerContent
    });
}
onAddBlueprint(){
    this.bluePrintCreated.emit({
        serverName: this.newServerName,
        serverContent: this.newServerContent
    });
}


Angular provide view encapsulation that means css for parents will not work on children as it's supposed to work like that again in each component it add attribute by itself  so that the style should not implement and if added the same style on children it will be with that attribute name(p[xyz]{color: pink}) in the DOM

@Component({
    encapsulation: ViewEncapsulation.Emulated //default //None //to make the style global //Native //gives same result as Emulated but it works on browsers that supports shadow DOM technology
})

local reference in template
<input type="text" #serverNameInput>
<button (click)="onchangeClick(serverNameInput)">BUTTON</button>
onChangeClick(nameInput: HTMLInputElement){}
but only in template not in typescript, get the input element itself

it can be passed directly to ts by @ViewChild('serverNameInput') serverContentInput: ElementRef; //even component can be passed, type-->ElementRef
//both ViewChild and ElementRef needs to be imported from @angular/core
this.serverContentInput.nativeElement.value
//this.serverContentInput.nativeElement.value = "something"; //not to do at this way

angular will remove the mid part i.e., @@@ <ab>@@@</ab> from DOM by default
<ng-content></ng-content>

ngOnChanges - called after a bound input property changes i.e., @Input
ngOnInt - called once the component is initialized
ngDoCheck - called during every change detection run, on every check angular makes, even on click,timer
ngAfterContentInit - called after content(ng-content) has been projected in to view
ngAfterContentChecked - called every time the projected content has been checked 
ngAfterViewInit - called after the component's view (and the child views) has been initialized  
ngAfterViewChecked - called every time the view (and the child views) has been checked
ngOnDestroy - called once the component is about to be destroyed

//even though without it it works //implements OnInit, OnChanges

ngOnChanges(cahnges: SimpleChanges){} //import {SimpleChanges} from '@angular/core';
here it will show 'element' property from code to console with currentValue, firstChange,previousValue

in dev mode ngDoCheck() will execute twice in prod once after init

ngDoCheck, ngAfterContentChecked, ngAfterViewChecked called after page render also

local element value can be acces after viewinit hook not before that

@ContentChild similiar to @ViewChild but here the local reference will be from ng-content

more than 1 structral directive(*ngFor / *ngIf) on the same element

creating a directive
import {Directive} from "@angular/core";
@Directive({
    selector: '[appSelect]'
})
export class baseAppDirective implements OnInit{
    constructor(private elementRef: ElementRef){}
    ngOnInit(){
        this.elementRef.nativeElement.style.background = 'green';
    }
};
<p appSelect></p>
directives need to be add to declarations in module

ng g d directivecreate

import {Directive, OnInit, ElementRef, Renderer2, HostListener} from "@angular/core";
@Directive({
    selector: '[appSelect]'
})
export class baseAppDirective implements OnInit{
    constructor(private elementRef: ElementRef, private renderer: Renderer2){}
    ngOnInit(){
       //this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue', false, false);
    }
    @HostListener('mouseenter') mouseenter(eventData: Event){
        this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue', false, false);
    } 
    @HostListener('mouseleave') mouseleave(eventData: Event){
        this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent', false, false);
    } 
};
//renderer should be used as angular not only runs on browser but also on service workers(push notification, background sync)

@HostListener --- events will work on elements

import {Directive, OnInit, ElementRef, Renderer2, HostListener, HostBinding} from "@angular/core";
@Directive({
    selector: '[appSelect]'
})
export class baseAppDirective implements OnInit{
    @HostBinding('style.backgroundColor') backgroundColorCls: string = 'transparent'; 
    constructor(private elementRef: ElementRef, private renderer: Renderer2){}
    ngOnInit(){
       //this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue', false, false);
    }
    @HostListener('mouseenter') mouseenter(eventData: Event){
        this.backgroundColorCls = 'blue';
    } 
    @HostListener('mouseleave') mouseleave(eventData: Event){
        this.backgroundColorCls = 'transparent';
    } 
};

import {Directive, OnInit, ElementRef, Renderer2, HostListener, HostBinding} from "@angular/core";
@Directive({
    selector: '[appSelect]'
})
export class baseAppDirective implements OnInit{
    @Input() defaultColor: string = 'transparent';
    @Input() highlightColor: string = 'blue';
    @HostBinding('style.backgroundColor') backgroundColorCls: string = this.defaultColor; 
    constructor(private elementRef: ElementRef, private renderer: Renderer2){}
    ngOnInit(){
        this.backgroundColorCls = this.defaultColor;
       //this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue', false, false);
    }
    @HostListener('mouseenter') mouseenter(eventData: Event){
        this.backgroundColorCls = this.highlightColor;
    } 
    @HostListener('mouseleave') mouseleave(eventData: Event){
        this.backgroundColorCls = this.defaultColor;
    } 
};

<p appSelect [defaultColor]="'yellow'" [highlightColor]="'orange'">Para</p>
//defaultColor="yellow"
//[defaultColorCls]="'yellow'" //@Input('defaultColorCls') defaultColor: string = 'transparent';

<ng-template [ngIf]='!onlyEven'></ng-template>

custom structural directive
import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
@Directive({
    selectors: 'appUnless'
})
export class UnlessDirective{
    @Input() set appUnless(condition: boolean){
        if(!condition){
            this.vcRef.createEmbeddedView(this.templateRef);
        }else{
            this.vcRef.clear();
        }
    }
    constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef){}
}
<div *appUnless="onlyOdd"></div>

<div [ngSwitch]="value">
    <p *ngSwitchCase="5">Value is 5</p>
    <p *ngSwitchCase="10">Value is 10</p>
    <p *ngSwitchCase="100">Value is 100</p>
    <p ngSwitchDefault>Value is Default</p>
</div>

Services in angular can be normal class that performs some kind of action and has to be referenced in constructor of another component who want to use it
@Injectable decorator is not compulsary but it is good practice when we want to add another service in it

Import {Injectable} from '@angular/core';

Services needs to be added on providers


Router
import {Routes, RouterModule} from "@angular/router";
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'users', component: UsersComponent},
    {path: 'servers', component: ServersComponent}
]

path should be without "/"
RouterModule has to be added on imports
imports: [RouterModule.forRoot(appRoutes)] //registering routes to the app

<router-outlet></router-outlet> for the routing section in template

<a href="/">Home</a>
<a href="/users">Home</a>
<a href="/servers">Home</a>
import { Component, Input, ViewChild, type OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TotsListResponse } from '@tots/core';
import { StringFieldComponent, SubmitButtonFieldComponent, TotsFormModalService, TotsModalConfig } from '@tots/form';
import { MoreMenuColumnComponent, StringColumnComponent, TotsActionTable,TotsColumn,TotsTableComponent, TotsTableConfig } from '@tots/table';
import { Observable, delay, map, of, tap } from 'rxjs';
import { Client } from 'src/app/entities/client';
import { NewClient } from 'src/app/interfaces/client.intarface';
import { ClientService } from 'src/app/services/client.service';
import { RemoveClientPopUpComponent } from '../remove-client-pop-up/remove-client-pop-up.component';

@Component({
  selector: 'app-table',
  templateUrl: './Table.component.html',
  styleUrls: ['./Table.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChild('tableComp') tableComp!: TotsTableComponent;
  config = new TotsTableConfig();
  @Input() hasPagination: boolean = true;
  items : Client[] = [];
  $clientData!: Observable<Client> ;
  formGroup = new FormGroup({});

  constructor(private clientService : ClientService, protected modalService: TotsFormModalService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getTableList()
  }

  onOrder(column: TotsColumn) {
    let response = new TotsListResponse();

    if(column.order == 'asc'){
      response.data = this.items.sort((a,b) => (a.firstname > b.firstname) ? 1 : ((b.firstname > a.firstname) ? -1 : 0))
    } else {
      response.data = this.items.sort((a,b) => (a.firstname < b.firstname) ? 1 : ((b.firstname < a.firstname) ? -1 : 0))
    }

    // updateamos la tablita con el sort

    this.items = [
      ...this.items,
    ];

    this.config.obs = of(response).pipe(delay(1000));
    this.tableComp.loadItems();
  }

  onTableAction(action: TotsActionTable) {
    switch (action.key) {
        case "remove":
        this.removeItem(action.item);
        break;
        case "edit":
        this.openFormModal(action.item);
        break;
        case "click-order":
        this.onOrder(action.item);
        break;
      default:
        break;
    }
  }

  tableTestConfig() {
    this.config.id = 'table-example';
    this.config.columns = [
      { key: 'title', component: StringColumnComponent, title: 'Nombre', field_key: 'firstname', hasOrder: true, extra: { cutSeparator: ',' } },
      { key: 'subtitle', component: StringColumnComponent, title: 'Apellido', field_key: 'lastname', hasOrder: false, extra: { field_subtitle_key: 'subtitle' } },
      { key: 'include', component: StringColumnComponent, title: 'Email', field_key: 'email', hasOrder: false },
      { key: 'more', component: MoreMenuColumnComponent, title: '', extra: { stickyEnd: true, width: '60px', actions: [{ icon: 'add', title: 'Editar', key: 'edit' },{ icon: 'add', title: 'Eliminar', key: 'remove' }]}},
    ];

    let data = new TotsListResponse();
    data.data = this.items;
    this.config.obs = of(data).pipe(delay(1000));
  }

  addClient(action: any) { 

    const obj : NewClient = {
      email: action?.item?.email,
      firstname: action?.item?.firstname,
      lastname: action?.item?.lastname,
    }

    this.clientService.postClient(obj).subscribe({
      next: (newClient) => {
     this.items = [
       ...this.items,
       { id: newClient.response.id, firstname: newClient.response.firstname, lastname: newClient.response.lastname, email: newClient.response.email} as Client
     ];

     let data = new TotsListResponse();
     data.data = this.items;

     //sort para lograr que el ultimo id venga siempre primero
     data.data = this.items.sort((a,b) => (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0));

     this.config.obs = of(data);
     this.tableComp?.loadItems();

      },
      error: (err: any) => {
          console.error('API Error:', err);
      }
  });
  }

  removeItem(item : any): void { 
    let dialogRef = this.dialog.open(RemoveClientPopUpComponent, { 
      width: '500px',
      panelClass: 'remove-modal'
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      if(result){
        this.clientService.removeClient(item.id).subscribe({
          next: () => {
            this.items = this.items.filter(i=> i.id != item.id)
            let data = new TotsListResponse();
            data.data = this.items;
            this.config.obs = of(data);
            this.tableComp?.loadItems();
          },
          error: (err: any) => {
              console.error('API Error:', err);
          }
      });
      }
    }); 
  } 

  openFormModal(editItem?: any) {
    let config = new TotsModalConfig();

    if(editItem){
    config.title = 'Edit Client';
    } else {
      config.title = 'Add Client';
    }
    
    config.autoSave = true;

    // Con esta linea podemos lograr que edite y cree nuevos clientes al mismo tiempo sin demasiado esfuerzo y sin utilizar el /client/fetch 
    config.item = editItem ? editItem : {}

    config.fields = [
      { key: 'firstname', component: StringFieldComponent, label: 'First Name', validators: [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]},
      { key: 'lastname', component: StringFieldComponent, label: 'Last Name', validators: [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]},
      { key: 'email', component: StringFieldComponent, label: 'Email', validators: [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]},
      { key: 'submit', component: SubmitButtonFieldComponent, label: 'Enviar' }
    ];

    this.modalService.open(config)
    .pipe(tap(action => {
      if(action.key === 'submit'){
        action.modal?.componentInstance.showLoading();
      }
    }))
    .pipe(delay(2000))
    .pipe(tap(action => action.modal?.componentInstance.hideLoading()))
    .subscribe(action => {
      if(action.key === "submit"){
        if(!editItem){
          this.addClient(action)
        }
        //agregamos close
        action.modal?.close();
      }
    });
  }

  private getTableList(){
     this.clientService.getClientList().subscribe({
       next: (clients) => {
        this.items = clients.response.data
        this.tableTestConfig();
       },
       error: (err: any) => {
           console.error('API Error:', err);
       }
   });
  }

}

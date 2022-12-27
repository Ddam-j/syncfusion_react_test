import './App.css';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Edit, Toolbar, NewRowPosition} from '@syncfusion/ej2-react-grids';
import { orderDataSource } from './data';
import { SampleBase } from './sample-base';
import { PropertyPane } from './property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

export class NormalEdit extends SampleBase {
  public toolbarOptions: any = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  public editSettings: any = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Top' };
  public editparams: any = { params: { popupHeight: '300px' } };
  public validationRule: Object = { required: true};
  public orderidRules: Object = { required: true, number: true };
  public pageSettings: Object = { pageCount: 5};
  public format: any = {type:'dateTime',format:'M/d/y hh:mm a'};

  private gridInstance: any;
  private dropDownInstance: any;
  private droplist: { [key: string]: Object }[] = [
    { text: 'Top', value: 'Top' },
    { text: 'Bottom', value: 'Bottom' }
  ];

  actionBegin(args: any): void {
    if (args.requestType === 'save') {
      if (this.gridInstance.pageSettings.currentPage !== 1 && this.gridInstance.editSettings.newRowPosition === 'Top') {
        args.index = (this.gridInstance.pageSettings.currentPage * this.gridInstance.pageSettings.pageSize) - this.gridInstance.pageSettings.pageSize;
      } else if (this.gridInstance.editSettings.newRowPosition === 'Bottom') {
        args.index = (this.gridInstance.pageSettings.currentPage * this.gridInstance.pageSettings.pageSize) - 1;
      }
    }
  }

  private ddChange(): void {
    this.gridInstance.editSettings.newRowPosition = this.dropDownInstance.value as NewRowPosition;
  }
  render() {
    return (
        <div className='control-pane'>
          <div className='control-section'>
            <div className='col-md-9'>
              <GridComponent dataSource={orderDataSource} ref={grid => this.gridInstance = grid} toolbar={this.toolbarOptions} allowPaging={true} editSettings={this.editSettings} pageSettings={this.pageSettings}
                             actionBegin={this.actionBegin.bind(this)}>
                <ColumnsDirective>
                  <ColumnDirective field='OrderID' headerText='Order ID' width='140' textAlign='Right' validationRules={this.orderidRules} isPrimaryKey={true}></ColumnDirective>
                  <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={this.validationRule}></ColumnDirective>
                  <ColumnDirective field='Freight' headerText='Freight' width='140' format='C2' textAlign='Right' editType='numericedit' ></ColumnDirective>
                  <ColumnDirective field='OrderDate' headerText='Order Date' editType='datetimepickeredit' format= {this.format} width='160' ></ColumnDirective>
                  <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150' editType='dropdownedit' edit={this.editparams} ></ColumnDirective>
                </ColumnsDirective>
                <Inject services={[Page, Toolbar, Edit]} />
              </GridComponent>
            </div>

            <div className='col-md-3 property-section'>
              <PropertyPane title='Properties'>
                <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
                  <tr>
                    <td>
                      <div>Add New Row Position</div>
                    </td>
                    <td>
                      <div>
                        <DropDownListComponent id="newRowPosition" width="120px" index={0} change={this.ddChange.bind(this)} ref={d => this.dropDownInstance = d} dataSource={this.droplist} fields={{ text: 'text', value: 'value' }} />
                      </div>
                    </td>
                  </tr>
                </table>
              </PropertyPane>
            </div>
          </div>
        </div>
    )
  }
}
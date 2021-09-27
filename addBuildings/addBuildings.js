import { LightningElement,track } from 'lwc';
import addBuildings1 from '@salesforce/apex/addBuilding.addBuildings';
import buildingName from '@salesforce/schema/Building__c.Name';
import buildingAddress from '@salesforce/schema/Building__c.Address__c';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class AddBuildings extends LightningElement {
   @track buildingid;
    @track error;
    @track BuildingRecord;
    searchValue = '';
    @track getBuildingRecord={
         Name:buildingName ,
         Address__c:buildingAddress
        };
 
    nameInpChange(event)
    {
        this.getBuildingRecord.Name=event.target.value;
    }
 
    addressInpChange(event)
    {
        this.getBuildingRecord.Address__c=event.target.value;
    }
 
    saveBuildingAction()
    {
        //window.console.log('before save' + this.createAccount);
        if(this.Name==null || this.Name=='' && this.Address__c==null || this.Address__c=='')
        {
            
        addBuildings1({buildingObj:this.getBuildingRecord})
        .then(result=>{
            //window.console.log(this.createAccount);
            this.getBuildingRecord={};
            this.buildingid=result.Id;
            //window.console.log('after save' + this.buildingid);
 
            const toastEvent=new ShowToastEvent({
                title:'Success!',
                message:'Building Record created successfully',
                variant:'success'
 
            });
            this.dispatchEvent(toastEvent);
        })
    
        .catch( error=>{
            alert( 'empty text box' );
            const toastEvent=new ShowToastEvent({
                title:'Fail!',
                message:'Building Record Failed',
                variant:'success'
 
            });
            
            this.error=error.message;
           // window.console.log(this.error);
            this.dispatchEvent(toastEvent);
        }
 
        );
        }
    }
    // update searchValue var when input field value change
    searchKeyword(event) {
        this.searchValue = event.target.value;
    }
 
    // call apex method on button click 
    handleSearchKeyword() {
        
        if (this.searchValue !== '') {
            getBuildingList({
                    searchKey: this.searchValue
                })
                .then(result => {
                    // set @track contacts variable with return contact list from server  
                    this.BuildingRecord = result;
                })
                .catch(error => {
                   
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                    // reset contacts var with null   
                    this.BuildingRecord = null;
                });
        } else {
            // fire toast event if input field is blank
            const event = new ShowToastEvent({
                variant: 'error',
                message: 'Search text missing..',
            });
            this.dispatchEvent(event);
        }
    }
 
}
public with sharing class addBuilding {
    @AuraEnabled
    public static Building__c addBuildings1(Building__c buildingObj){
        try {
            insert buildingObj;
            return buildingObj;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}

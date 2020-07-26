public with sharing class Lwc_AsyncController {
    @AuraEnabled
    public static string methodFirst() {
        for(Integer i = 0 ; i < 1000000; i++){
            
        }
        return 'Message from methodFirst';
    }

    @AuraEnabled
    public static string methodSecond() {
        return 'Message from methodSecond';
    }

    @AuraEnabled
    public static string methodThird() {
        return 'Message from methodThird';
    }
}

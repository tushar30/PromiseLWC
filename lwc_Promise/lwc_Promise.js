import { LightningElement } from 'lwc';
import methodFirst from '@salesforce/apex/Lwc_AsyncController.methodFirst';
import methodSecond from '@salesforce/apex/Lwc_AsyncController.methodSecond';
import methodThird from '@salesforce/apex/Lwc_AsyncController.methodThird';

export default class Lwc_Promise extends LightningElement {
    

    anyOrder() {
        console.log('\n\n Any Order');
        methodFirst()
            .then(result => {
                console.log('======Success=======',result);
            })
            .catch(error => {
                console.log(error);
                console.log('======Error=======', error);
            });

        methodSecond()
            .then(result => {
                console.log('======Success=======',result);
            })
            .catch(error => {
                console.log(error);
                console.log('======Error=======', error);
            });

        methodThird()
            .then(result => {
                console.log('======Success=======',result);
            })
            .catch(error => {
                console.log(error);
                console.log('======Error=======', error);
            });
    }

    promiseChain() {
        console.log('\n\n Promise Chain');
        this.promiseHelper("A")
			.then(methodName => {
				console.log(`${methodName} Success`);
				return this.promiseHelper("B");
			})
			.then(methodName => {
				console.log(`${methodName} Success`);
				return this.promiseHelper("C");
			})
			.then(methodName => {
				console.log(`${methodName} Success`);
			})
			.catch(methodName => {
				console.log(`${methodName}`);
			});
    }

    promiseHelper(methodName) {

        if(methodName == 'A') {
            return new Promise((resolve, reject) => {
                methodFirst()
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
        }

        if(methodName == 'B') {
            return new Promise((resolve, reject) => {
                methodSecond()
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
        }

        if(methodName == 'C') {
            return new Promise((resolve, reject) => {
                methodThird()
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
        }
    }
    

	allPromises() {
		console.log('\n\n All Promise');
		let promises = [];
		promises.push(this.promiseHelper("A"));
		promises.push(this.promiseHelper("B"));
		promises.push(this.promiseHelper("C"));
		Promise.all(promises).then(result => {
			console.log(`${JSON.stringify(result)}  Success`);
		});
    }

    racePromises() {
		console.log('\n\n Race Promise');
		let promises = [];
		promises.push(this.promiseHelper("A"));
		promises.push(this.promiseHelper("B"));
		promises.push(this.promiseHelper("C"));
		Promise.race(promises).then(result => {
			console.log(`${JSON.stringify(result)}  Success`);
		});
    }
}

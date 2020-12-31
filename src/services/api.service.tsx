
class JobAPI {
    url = "http://techdino.tk/api/";
    // user/login/

    post(endPoint:string,data:any, callback?:any) {
        // console.log('data to api: '  ,JSON.stringify(data));
            return fetch(this.url + endPoint, {
                method: "POST",
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
                }),
                body: data
            }).then((result) => {
                result.json().then((resp) => {
                    // console.log('result in api: ' + JSON.stringify(resp));
                    if(callback){
                    callback(resp);
                    }
                })
            })
        }



    // welcome() {
    //     return fetch(this.url + 'welcome', {
    //         method: "GET",
    //     });
    // }

    // city() {
    //     return fetch(this.url + 'city?lid=' + null, {
    //         method: "GET",
    //     });
    // }

    // updateCity(data) {
    //     return fetch(this.url + 'rate', {
    //         body: JSON.stringify(data)
    //     });
    // }

    // homepage(city_id?: any) {
    //     // // console.log(this.url + 'homepage/' + city_id)
    //     return fetch(this.url + 'homepage/' + city_id, {
    //         method: "GET",
    //     });
    // }

    // getCart(cartNo, callback: (resp: any) => void) {
    //     // return this.http.get(this.url + 'getCart/' + cartNo)
    //     //     .pipe(map(results => results));

    //     return fetch(this.url + 'getCart/' + cartNo, {
    //         method: "GET"
    //     }).then((result) => {
    //         result.json().then((resp) => {
    //             callback && callback(resp)
    //         })
    //     })
    // }

    // cartCount(cartNo, callback: (resp: any) => void) {
    //     // return this.http.get(this.url + 'cartCount/' + cartNo)
    //     //     .pipe(map(results => results));
        
    //     return fetch(this.url + 'cartCount/' + cartNo, {
    //         method: "GET"
    //     }).then((result) => {
    //         result.json().then((resp) => {
    //             callback && callback(resp)
    //         })
    //     })
    // }


    // addToCart(data, callback) {
    //     return fetch(this.url + 'addToCart', {
    //         method: "POST",
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     }).then((result) => {
    //         result.json().then((resp) => {
    //             callback && callback(resp)
    //         })
    //     })
    // }

    // loginWithPhone(data, callback) {

    //     return fetch(this.url + 'loginWithPhone', {
    //         method: "POST",
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     }).then((result) => {
            
    //         result.json().then((resp) => {
    //             callback && callback(resp)
    //         })
    //     })
    // }

    // updateInfo(data, id, callback) {
    //     // return this.http.post(this.url + 'updateInfo/' + id, data)
    //     //   .pipe(map(results => results));
        
    //     return fetch(this.url + 'updateInfo/' + id, {
    //         method: "POST",
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     }).then((result) => {
            
    //         result.json().then((resp) => {
    //             callback && callback(resp)
    //         })
    //     })
    // }

    // updateCart(id, type, callback) {
    //     return fetch(this.url + 'updateCart/' + id + '/' + type, {
    //         method: "GET"
    //     }).then((result) => {
    //         result.json().then((resp) => {
    //             callback && callback(resp)
    //         })
    //     })
    // }

    // getOffer(cartNo, callback) {
    //     // return this.http.get(this.url + 'getOffer/' + cartNo)
    //     //   .pipe(map(results => results));
        
    //     return fetch(this.url + 'getOffer/' + cartNo, {
    //         method: "GET"
    //     }).then((result) => {
    //         result.json().then((resp) => {
    //             callback && callback(resp)
    //         })
    //     })

    // }

    // applyCoupen(id, cartNo, callback) {
    //     // return this.http.get(this.url + 'applyCoupen/' + id + '/' + cartNo)
    //     //     .pipe(map(results => results));
    //     return fetch(this.url + 'applyCoupen/' + id + '/' + cartNo, {
    //         method: "GET"
    //     }).then((result) => {
    //         result.json().then((resp) => {
    //             callback && callback(resp)
    //         })
    //     })
    // }

    // getAddress(id, callback) {
    //     // return this.http.get(this.url + 'getAddress/' + id)
    //     //     .pipe(map(results => results));
    //     return fetch(this.url + 'getAddress/' + id, {
    //         method: "GET"
    //     }).then((result) => {
    //         result.json().then((resp) => {
    //             callback && callback(resp)
    //         })
    //     })
    // }


    // order(data, callback) {
    //     // return this.http.post(this.url + 'order', data)
    //     //     .pipe(map(results => results));
    //     return fetch(this.url + 'order', {
    //         method: "POST",
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     }).then((result) => {
            
    //         result.json().then((resp) => {
    //             callback && callback(resp)
    //         })
    //     })
    // }

    // getStatus(id, callback) {
    //     // return this.http.get(this.url + 'getStatus/' + id).pipe(
    //     //   map(results => results)
    //     // );
    //     return fetch(this.url + 'getStatus/' + id, {
    //         method: "GET"
    //     }).then((result) => {
    //         result.json().then((resp) => {
    //             callback && callback(resp)
    //         })
    //     })
    // }

    // saveAddress(data, callback) {
    //     // return this.http.post(this.url + 'addAddress', data)
    //     //     .pipe(map(results => results));
    //     return fetch(this.url + 'addAddress', {
    //         method: "POST",
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     }).then((result) => {
             
    //         result.json().then((resp) => {
    //             callback && callback(resp)
    //         })
    //     })
    // }

    // myOrder(id, callback) {
    //     // return this.http.get(this.url + 'myOrder/' + id)
    //     //     .pipe(map(results => results));
    //     return fetch(this.url + 'myOrder/' + id, {
    //         method: "GET"
    //     }).then((result) => {
    //         result.json().then((resp) => {
    //             callback && callback(resp)
    //         })
    //     })
    // }

    // cancelOrder(id, uid, callback) {
    //     // return this.http.get(this.url + 'cancelOrder/' + id + '/' + uid)
    //     //     .pipe(map(results => results));
    //     return fetch(this.url + 'cancelOrder/' + id + '/' + uid, {
    //         method: "GET"
    //     }).then((result) => {
    //         result.json().then((resp) => {
    //             callback && callback(resp)
    //         })
    //     })
    // }

    // pages(callback) {
    //     return fetch(this.url + 'pages?lid=' + 0, {
    //         method: "GET"
    //     }).then((result) => {
    //         result.json().then((resp) => {
    //             callback && callback(resp)
    //         })
    //     })
    // }

    // rating(data, callback) {
    //     // return this.http.post(this.url + 'rate', data)
    //     //   .pipe(map(results => results));

    //     return fetch(this.url + 'rate', {
    //         method: "POST",
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     }).then((result) => {
             
    //         result.json().then((resp) => {
    //             callback && callback(resp)
    //         })
    //     })
    // }

    // removeAddress(data, callback) {
    //     return fetch(this.url + 'deleteAddress', {
    //         method: "POST",
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     }).then((result) => {
             
    //         result.json().then((resp) => {
    //             callback && callback(resp)
    //         })
    //     })
    // }

    // giveRiderRating(data, callback) {
    //     return fetch(this.url + 'staffreview', {
    //         method: "POST",
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     }).then((result) => {
             
    //         result.json().then((resp) => {
    //             callback && callback(resp)
    //         })
    //     })
    // }

    // cancelOrder(id, uid) {
    //     return this.http.get(this.url + 'cancelOrder/' + id + '/' + uid)
    //       .pipe(map(results => results));
    //   }

}

const jobApi = new JobAPI();
export default jobApi;
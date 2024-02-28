const API = 'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RVeE5USTNMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuOHJnWG5OcXJuSDJHbTRjNUNuRlVfWVE3azBXZjgtT0Z3U1lLZjJEUnFEM2x1MmVDZXRheVZrVVo0WHk0YWhVUUd5cWhsOTdaR1BjWll0aUFTZXE4WXc=';

let price = '5000'; 
let first_name = 'ISlam'; 
let last_name = 'Khaled';
let email = 'is@gmail.com';
let phone = '01112998573';
let address = '6 ش الشعراوي الملكة - فيصل';
let city = 'Giza';
let country = 'EGYPt';


async function fireststep() {
    let data = {
        "api_key": API
    };

    let request = await fetch('https://accept.paymob.com/api/auth/tokens', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    let response = await request.json();
    // console.log(response);

    let token = response.token;

    secondtstep(token);

}

async function secondtstep(token) {
    let data = {
        "auth_token": token,
        "delivery_needed": "false",
        "amount_cents": price,
        "currency": "EGP",
        "items": [],
    };

    let request = await fetch('https://accept.paymob.com/api/ecommerce/orders', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    let response = await request.json();
    let id = request.id;
    thirdstep(token, id);
}

async function thirdstep(token, id) {
    let data = {
        "auth_token": token,
        "amount_cents": price,
        "expiration": 3600,
        "order_id": id,
        "billing_data": {
            "apartment": "NA",
            "email": email,
            "floor": "NA",
            "first_name": first_name,
            "street": address,
            "building": "NA",
            "phone_number": phone,
            "shipping_method": "PKG",
            "postal_code": "01898",
            "city": city,
            "country": country,
            "last_name": last_name,
            "state": "NA"
        },
        "currency": "EGP",
        "integration_id": 4432292
    };

    let request = await fetch('https://accept.paymob.com/api/acceptance/payment_keys', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    let response = await request.json();
    let theToken = response.token;

    // console.log(theToken);
    cardPayment(theToken);
}

async function cardPayment(token) {
    let iframURL = `https://accept.paymob.com/api/acceptance/iframes/814170?payment_token=${token}`;
    location.href = iframURL;
}

// fireststep();
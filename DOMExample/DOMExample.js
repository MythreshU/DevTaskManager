function subscribe(){
    const buttonElement = document.querySelector('.js-subscribe-button');

    if(buttonElement.innerText === 'Subscribe'){
        buttonElement.innerHTML = 'Subscribed';
        buttonElement.classList.add('is-subscribed');
    }else{
        buttonElement.innerHTML = 'Subscribe';
        buttonElement.classList.remove('is-subscribed');
    }
}
function calculate(){
    const inputElement = document.querySelector('.js-input-value');
    let cost = Number(inputElement.value);
    if(cost < 40){
        cost = cost + 10;
    }
    document.querySelector('.js-total-cost').innerHTML =`$${cost}`;
}
function handleKey(){
    if(event.key === 'Enter'){
        calculate();
    }
}
let busketObject = {
    //id: [количество, цена, name]
}
let total = document.querySelector('.feguf')

document.addEventListener('DOMContentLoaded', function() {
    const busketMeals = document.querySelector('.busketMeals');

    function sms(obj) {
        let sumOfProducts = 0;
        
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const value = obj[key];
                sumOfProducts += value[0] * value[1];
            }
        }
        total.textContent = `${sumOfProducts}₽`
        return sumOfProducts;
    }

    function drawbusket(name, count, price, id) {
        let busketItem = `
        <div class="mealLine" id=${id}>
            <h3>${name}</h3>
            <div class="countBlock">
                <button class="minus">-</button>
                <h3 class="pm_counter">${count}</h3>
                <button class="plus">+</button>
            </div>
            <h3>${price}</h3>
        </div>`;
        busketMeals.insertAdjacentHTML('beforeend', busketItem);
        const mealLine = busketMeals.lastElementChild;
        const minusButton = mealLine.querySelector('.minus');
        const plusButton = mealLine.querySelector('.plus');
        const counterElement = mealLine.querySelector('.pm_counter');
        minusButton.addEventListener('click', () => {
            let count = parseInt(counterElement.textContent);
            if (count > 1) {
                count--;
                counterElement.textContent = count;
                busketObject[id][0] = count; 
                sms(busketObject)
            } else {
                delete busketObject[id]; 
                busketMeals.removeChild(mealLine); 
                sms(busketObject)
            }
        });

        plusButton.addEventListener('click', () => {
            let count = parseInt(counterElement.textContent);
            count++;
            counterElement.textContent = count;
            busketObject[id][0] = count; 
            sms(busketObject)
        });
    }

    const addButtons = document.querySelectorAll('.addBusket');
    
    addButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            const card = this.closest('.card');
            const value = card.querySelector('.underBlock h1').textContent;
            const name = card.querySelector('.nameProduct').textContent;
            const id = card.querySelector('.nameProduct').id;

            if (Object.keys(busketObject).includes(id)) {
                busketObject[id][0] += 1;
            } else {
                //создание нового
                busketObject[id] = [1, value, name];
            }            
            
            busketMeals.innerHTML = "";

            for (const key in busketObject) {
                if (Object.hasOwnProperty.call(busketObject, key)) {
                    const value = busketObject[key];
                    drawbusket(value[2], value[0], value[1], key);
                }
            }
            
            sms(busketObject);
            event.preventDefault();
        });
    });
});

let busketObject = {
    //name: [количество, цена, id]
}

document.addEventListener('DOMContentLoaded', function() {
    const busketMeals = document.querySelector('.busketMeals');

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
                busketObject[name][0] = count; 
                console.log(busketObject)
            } else {
                delete busketObject[name]; 
                busketMeals.removeChild(mealLine); 
                console.log(busketObject)
            }
        });

        plusButton.addEventListener('click', () => {
            let count = parseInt(counterElement.textContent);
            count++;
            counterElement.textContent = count;
            busketObject[name][0] = count; 
        });
    }

    const addButtons = document.querySelectorAll('.addBusket');
    
    addButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            const card = this.closest('.card');
            const value = card.querySelector('.underBlock h1').textContent;
            const name = card.querySelector('.nameProduct').textContent;
            const id = card.querySelector('.nameProduct').id

            if (Object.keys(busketObject).includes(name)) {
                busketObject[name][0] += 1

            } else{
                //создание нового
                busketObject[name] = [1, value, id];
            }            
            console.log(busketObject)
            
            busketMeals.innerHTML = "";

            for (const key in busketObject) {
                if (Object.hasOwnProperty.call(busketObject, key)) {
                    const value = busketObject[key];
                    drawbusket(key, value[0], value[1], value[2])
                }
            }

            event.preventDefault();
        });
    });
});


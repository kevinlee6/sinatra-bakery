const updateClosure = () => {
  let totalPrice = 0;

  return (price) => {
      totalPrice += price;
      total.innerText = totalPrice.toFixed(2);
  };
};

const updateTotal = updateClosure();

const cartRemove = id => {
    const toRemove = document.getElementById(id),
          price = cartList[id].price * cartList[id].quantity;
    cart.removeChild(toRemove);
    updateTotal(-price);

    delete cartList[id];
    store(cartList);
};

const template = (id, img, desc, price, quantity, itemTotal) => {
    return `
        <button onclick="cartRemove(${id})" class="cart-delete btn btn-danger">X</button>
        <div class="img-container card-img-top">
          <img class="cart-item" src=${img} alt=${desc} />
        </div>
        <div class="product-info card-body">
          <h5 class="card-title">${desc}</h5>
          <div class="price-container">
            <span class="card-text">$${price} x ${quantity}</span>
          </div>
          <span class="total">= $${itemTotal.toFixed(2)}</span>
        </div>`;
};

const cartAdd = (id, img, desc, price, quantity) => {
    const itemTotal = price * quantity;
    updateTotal(itemTotal);

    cartList[id] = {
        id,
        img,
        desc,
        price,
        quantity
    };
    store(cartList);

    let div = document.createElement('div');
    div.id = id;
    div.classList.add('card');
    div.classList.add('fadein');
    div.innerHTML = template(id, img, desc, price, quantity, itemTotal);
    // cart.insertBefore(div, cart.childNodes[0]);
    cart.appendChild(div);
};

const addCartHandler = (event, id, img, desc, price) => {
    event.preventDefault();

    if (cartList[id]) {
        return alert('This item is already in your cart.')
    }

    const product = document.getElementById(`product-${id}`),
          select = product.querySelector('select'),
          quantity = select.value;

    cartAdd(id, img, desc, price, quantity);
};

const store = obj =>
    localStorage.setItem(keyStore, JSON.stringify(obj));

const retrieve = () =>
    JSON.parse(localStorage.getItem(keyStore));

const constructCart = () => {
    const objs = retrieve();

    if (objs) {
        for (let obj in objs) {
            const innerObj = objs[obj];
            cartAdd(
                innerObj.id,
                innerObj.img,
                innerObj.desc,
                innerObj.price,
                innerObj.quantity
            );
        }
    }
};
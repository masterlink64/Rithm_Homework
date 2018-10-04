const express = require('express'); // require express
const router = express.Router(); // create an instance of express.Router
// const items = ['Carrots', 'Chicken', 'Corn Dog', 'Snickers', 'Apples'];
//const locus = require('locus');
let id = 6;
const items = [
  { name: 'Carrots', price: 3, id: 1 },
  { name: 'Chicken', price: 4, id: 2 },
  { name: 'Corn Dog', price: 2, id: 3 },
  { name: 'Snickers', price: 1, id: 4 },
  { name: 'French Fries', price: 3, id: 5 },
  { name: 'Apples', price: 5, id: 6 }
];
// replace app with router

router.get('', (req, res) => {
  let mapItems = items.map(item => {
    return item.name;
  });
  return res.json(mapItems);
});

// http POST localhost:3000/items name=test price=2
router.post('', (req, res) => {
  const newItem = { name: req.body.name, price: req.body.price, id: ++id };
  items.push(newItem);
  return res.json(items);
});

router.get('/:id', (req, res) => {
  //display a single item's name and price
  // req.params.query
  // eval(require('locus'));
  let id = +req.params.id;
  let found_item = items.filter(item => {
    return item.id === id;
  });
  // for (let key of items) {
  //   if (items[key] === id) {
  //   }
  // }
  //eval(require('locus'));
  let results = `Item: ${found_item[0].name}, Price: ${found_item[0].price}`;
  return res.json(results);
});

// 4) patch
router.patch('/:id', (req, res) => {
  // body
  // req.body
  // req.params
  let id = +req.params.id;
  // modify a single item
  // find items in array
  let found_item = items.find(item => {
    return item.id === id;
  });
  found_item.name = req.body.name;
  found_item.price = req.body.price;
  return res.json(found_item);
});

// 5) delete
router.delete('/:id', (req, res, next) => {
  let id = +req.params.id;
  // if index not found then error handle with middle ware
  let idx = items.findIndex(item => {
    return item.id === id;
  });
  if (idx === -1) {
    return next('NO ID FOUND');
  }
  items.splice(idx, 1);
  //eval(require('locus'));
  return res.json(items);
});
// export out the router
module.exports = router;

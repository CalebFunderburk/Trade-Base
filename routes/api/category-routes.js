const router = require('express').Router();
const { Category, Product } = require('../../models');

// Get all categories
router.get('/', (req, res) => {
  // Find all categories and include the following properties
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  // Return the promise as json
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

// Get one category
router.get('/:id', (req, res) => {
  // Find one category that meets the following criteria
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(categoryData => {
    // Display an error if there is no such category with the specified id
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id' })
      return
    }
    // Return the promise as json
    res.json(categoryData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

// Create a category
router.post('/', (req, res) => {
  // Create a category with the defined data
  Category.create({
    category_name: req.body.category_name
  })
  // Return the promise as json
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

// Update a category
router.put('/:id', (req, res) => {
  // Update a category that meets the following cirteria
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(categoryData => {
    // Display an error if there is no such category with the specified id
    if(!categoryData[0]) {
      res.status(404).json({ message: 'No category found with this id' })
      return
    }
    // Return the promise as json
    res.json(categoryData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

// Delete a category
router.delete('/:id', (req, res) => {
  // Delete a category that meets the following criteria
  Category.destroy({
    where: {
      id:req.params.id
    }
  })
  .then(categoryData => {
    // Display an error if there is no such category with the specified id
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id' })
      return
    }
    // Return the promise as json
    res.json(categoryData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

module.exports = router;

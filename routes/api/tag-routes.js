const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Get all tags
router.get('/', (req, res) => {
  // Find all tags and include the following properties
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  // Return the promise as json
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

// Get one tag
router.get('/:id', (req, res) => {
  // Find one tag that meets the following criteria
  Tag.findOne({
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
  .then(tagData => {
    // Display an error if there is no such tag with the specified id
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id' })
      return
    }
    // Return the promise as json
    res.json(tagData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

// Create a tag
router.post('/', (req, res) => {
  // Create a tag with the defined data
  Tag.create({
    tag_name: req.body.tag_name
  })
  // Return the promise as json
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

// Update a tag
router.put('/:id', (req, res) => {
  // Update a tag that meets the following criteria
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    // Display an error if there is no such category with the specified id
    if (!tagData[0]) {
      res.status(404).json({ message: 'No category found with this id' })
      return
    }
    // Return the promise as json
    res.json(tagData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

// Delete a tag
router.delete('/:id', (req, res) => {
  // Delete a tag that meets the following criteria
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    // Display an error if there is no such category with the specified id
    if (!tagData) {
      res.status(404).json({ message: 'No category found with this id' })
      return
    }
    // Return the promise as json
    res.json(tagData)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

module.exports = router;

Sure, here's a tabular chart of common Mongoose commands with their functionalities, including examples based on the provided JSON data.

| Command               | Functionality                                                                 | Example                                                                                         |
|-----------------------|-------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| `mongoose.connect`    | Connects to the MongoDB database.                                             | `mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });` |
| `Schema`              | Defines the structure of documents within a collection.                       | ```const productSchema = new mongoose.Schema({ name: String, price: Number, company: String, rating: Number, featured: Boolean });``` |
| `model`               | Creates a model based on a schema.                                            | `const Product = mongoose.model('Product', productSchema);`                                     |
| `create`              | Inserts a new document into the collection.                                   | `Product.create({ name: 'accent chair', price: 25, company: 'marcos', rating: 4 });`            |
| `find`                | Retrieves documents that match the query criteria.                            | `Product.find({ company: 'liddy' });`                                                           |
| `findOne`             | Retrieves a single document that matches the query criteria.                  | `Product.findOne({ name: 'accent chair' });`                                                    |
| `findById`            | Retrieves a document by its unique ID.                                        | `Product.findById('60d0fe4f5311236168a109ca');`                                                 |
| `updateOne`           | Updates a single document that matches the query criteria.                    | `Product.updateOne({ name: 'accent chair' }, { price: 30 });`                                   |
| `updateMany`          | Updates multiple documents that match the query criteria.                     | `Product.updateMany({ company: 'liddy' }, { rating: 4.5 });`                                    |
| `findByIdAndUpdate`   | Finds a document by its ID and updates it.                                    | `Product.findByIdAndUpdate('60d0fe4f5311236168a109ca', { price: 35 });`                         |
| `deleteOne`           | Deletes a single document that matches the query criteria.                    | `Product.deleteOne({ name: 'accent chair' });`                                                  |
| `deleteMany`          | Deletes multiple documents that match the query criteria.                     | `Product.deleteMany({ company: 'marcos' });`                                                    |
| `findByIdAndDelete`   | Finds a document by its ID and deletes it.                                    | `Product.findByIdAndDelete('60d0fe4f5311236168a109ca');`                                        |
| `save`                | Saves a new instance of a document.                                           | `const product = new Product({ name: 'sofa', price: 200, company: 'ikea' }); product.save();`    |
| `countDocuments`      | Counts the number of documents that match the query criteria.                 | `Product.countDocuments({ company: 'ikea' });`                                                  |
| `aggregate`           | Performs aggregation operations like grouping, sorting, and filtering.        | `Product.aggregate([{ $match: { company: 'liddy' } }, { $group: { _id: '$company', averageRating: { $avg: '$rating' } } }]);` |

### Example Usage

Here are a few examples using the provided JSON data:

1. **Connecting to MongoDB:**
    ```javascript
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/furnitureStore', { useNewUrlParser: true, useUnifiedTopology: true });
    ```

2. **Defining a Schema:**
    ```javascript
    const productSchema = new mongoose.Schema({
        name: String,
        price: Number,
        company: String,
        rating: Number,
        featured: Boolean
    });
    ```

3. **Creating a Model:**
    ```javascript
    const Product = mongoose.model('Product', productSchema);
    ```

4. **Inserting Documents:**
    ```javascript
    Product.create({ name: 'accent chair', price: 25, company: 'marcos', rating: 4 });
    Product.create({ name: 'albany sectional', price: 109, company: 'liddy', rating: 5 });
    ```

5. **Finding Documents:**
    ```javascript
    Product.find({ company: 'liddy' }).then(products => console.log(products));
    ```

6. **Updating Documents:**
    ```javascript
    Product.updateOne({ name: 'accent chair' }, { price: 30 }).then(result => console.log(result));
    ```

7. **Deleting Documents:**
    ```javascript
    Product.deleteOne({ name: 'accent chair' }).then(result => console.log(result));
    ```

8. **Aggregation Example:**
    ```javascript
    Product.aggregate([
        { $match: { company: 'liddy' } },
        { $group: { _id: '$company', averageRating: { $avg: '$rating' } } }
    ]).then(result => console.log(result));
    ```

These examples demonstrate basic CRUD operations and more complex queries like aggregation in Mongoose, using the JSON data provided.
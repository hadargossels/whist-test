let Product = require("../models/product")
const faker = require('faker');

exports.findAll = function (req, res) {
    Product.find({},function (err, products) {
        if (err)
            {res.send(err)
            console.log(err)}
        else {
            res.setHeader('Content-Range', `${products.length}`)
            res.send(products)
        }
    })
}


exports.addProduct = function (req, res) {

    let ProductData = req.body

    Product.create({...ProductData}, function (err) {
        if (err)
            res.send(err)

        else
            res.json({error:false, message: 'Product Added successfully'})
    })
}

exports.findOneProduct = function (req, res) {
    Product.findOne({ id: req.params.id}, function (err, products) {
        if (err)
            res.send(err)
        else{
            res.send(products)
        }
    })
}

exports.update = function (req, res) {

    let ProductData = req.body

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        if(req.method === 'PATCH'){
            Product.patchUpdate(req.params.id, new Product({...ProductData}), function (err, product) {
                if (err)
                    return res.send({
                        error: true,
                        message: err.message
                    });

                res.json({
                    error: false,
                    message: 'Product successfully updated'
                });

            });
        }else{
            Product.findOneAndUpdate({id: req.params.id}, {$set: ProductData},{ useFindAndModify: false }, function (err, products) {
                if (err)
                    return res.send({
                        error: true,
                        message: err.message
                    });
                res.send(products)

            });
        }
    }
};

exports.deleteProduct = function (req, res) {
    Product.findOneAndDelete({id: req.params.id},{ useFindAndModify: false }, function (err, product) {
        if (err)
            res.send({
                error: true,
                message: err.message
            });
        else

        res.json({
            error: false,
            message: 'Product successfully deleted'
        });
    });
};

exports.seed = async function (req, res) {

    try {
        let Products = [];
            for (let j = 0; j < 50; j++) {
                let newProduct = new Product({
                    id: j,
                    img: faker.image.image(),                
                    title: faker.commerce.productName(),                
                    desc: faker.commerce.productDescription(),                
                    price: faker.commerce.price()                  
                });
                let product = await newProduct.save();
                Products.push(product);
            }
        

        res.status(200).json({Products, message: 'Database seeded!'});
    } catch (error) {
        res.status(500).json({message: "seed error " + error.message});
    }

};



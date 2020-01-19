const express = require('express');
const router = express.Router();

//get
router.get('/', (req,res,next) => {
    res.status(200).json({
        message: 'Orders'
    });
});
//post
router.post('/', (req,res,next) => {
    const order = {
        productId: req.body.productId,
        ammount: req.body.ammount
    }
    res.status(201).json({      //201 get created
        message: 'Order was created',
        order: order
    });
});
/////////////odrerId/////////

//get
router.get('/:orderId', (req,res,next) => {
    res.status(200).json({      
        message: 'Order Id',
        orderId: req.params.orderId
    });
});
//delete
router.delete('/:orderId', (req,res,next) => {
    res.status(200).json({      
        message: 'Order Id has been deleted',
        orderId: req.params.orderId
    });
});

module.exports = router;
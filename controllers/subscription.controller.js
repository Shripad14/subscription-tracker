import Subscription from "../models/subscription.model.js";

// create a subscription
export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        })

        res.status(201).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
}

// GET a users all subscriptions
export const getUserSubscriptions = async (req, res, next) => {
    
    try {
        // Check if user is same as of token.
        if(req.user.id !== req.params.id){
            const error = new Error('this is not your account.');
            error.statuCode = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });

        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error)
    }
}

// GET all available subscriptions
export const getAllSubscriptions = async (req, res, next) => {

    try {
        const subscriptions = await Subscription.find();

        res.status(200).json({
            success: true,
            count: subscriptions.count,
            data: subscriptions,
        })
    } catch (error) {
        next(error);
    }
}

// GET a subscription by id
export const getSubscriptionById = async (req, res, next) => {
    
    try {
        let id = req.params.id;
        const subscription = await Subscription.findById(id);

        if(!subscription){
            const error = new Error('This subscription does not exists');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: subscription
        })
    } catch (error) {
        next(error)
    }

}

// UPDATE a subscription 
export const updateSubscription = async (req, res, next) => {
    
    try {
        const id = req.params.id;
        const subscription = await Subscription.findById(id);

        if(!subscription){
            const error = new Error('This subscription does not exist');
            error.statusCode = 404;
            throw error;
        }

        // Verify ownership
        if(subscription.user.toString() !== req.user._id.toString()){
            const error = new Error('Access denied. Not your account.');
            error.statusCode = 403;
            throw error;
        }

        // Update subscription
        const updatedSubscription = await Subscription.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }  
        );

        res.status(200).json({
            success: true,
            data: updatedSubscription,
        });
    } catch (error) {
        next(error);
    }
}

export const deleteSubscription = async (req, res, next) => {

    try {
        const id = req.params.id;
        const subscription = await Subscription.findById(id);
        
        if(!subscription){
            const error = new Error('this subscription does not exist');
            error.statusCode = 404;
            throw error;
        }

        // Verify ownership
        if(subscription.user.toString() !== req.user._id.toString()){
            const error = new Error('Access denied. Not your account');
            error.statusCode = 403;
            throw error;
        }

        // Delete subscription
        const deletedSubscription = await Subscription.findByIdAndDelete(id);
        
        res.status(200).json({
            success: true,
            data: deletedSubscription
        })
    } catch (error) {
        next(error);
    }
}

export const cancelSubscription = async (req, res, next) => {

    try {
        const id = req.params.id;
        const subscription = await Subscription.findById(id);

        if(!subscription){
            const error = new Error('this subscription does not exist');
            error.statuCode = 404;
            throw error;
        }

        // verify owner
        if(subscription.user.toString() !== req.user._id.toString()){
            const error = new Error('Access denied. Not your account');
            error.statuCode = 404;
            throw error;
        }

        // Cancel subscription
        subscription.status = 'cancelled';
        subscription.cancelledAt = Date.now();

        // Save changes
        const cancelledSubscription = await Subscription.save();

        res.status(200).json({
            success: true,
            data: cancelledSubscription,
        });

    } catch (error) {
        next(error);
    }
}


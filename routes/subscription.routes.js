import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import { 
    cancelSubscription,
    createSubscription, 
    deleteSubscription, 
    getAllSubscriptions, 
    getSubscriptionById, 
    getUserSubscriptions, 
    updateSubscription
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

// related to subscriptions
subscriptionRouter.get("/", authorize, getAllSubscriptions);    //GET all subs

subscriptionRouter.get("/:id", authorize, getSubscriptionById);  // GET a sub by id

subscriptionRouter.post("/", authorize, createSubscription);    // CREATE a sub 

subscriptionRouter.put("/:id", authorize, updateSubscription);  // UPDATE sub details

subscriptionRouter.delete("/:id", authorize, deleteSubscription );  // DELETE a sub

// related to user-subscriptions
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);   // GET a users all subs

subscriptionRouter.post("/:id/cancel", authorize, cancelSubscription)   // Cancel a sub (for user)

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
    res.send({title: "GET upcoming renewal details"});
});

export default subscriptionRouter;
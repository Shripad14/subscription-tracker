import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import { 
    createSubscription, 
    getAllSubscriptions, 
    getSubscriptionById, 
    getUserSubscriptions 
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

// related to subscriptions
subscriptionRouter.get("/", authorize, getAllSubscriptions);    //GET all subs

subscriptionRouter.get("/:id", authorize, getSubscriptionById);  // GET a sub by id

subscriptionRouter.post("/", authorize, createSubscription);    // create a sub 

subscriptionRouter.put("/:id", (req, res) => {             
    res.send({title: "UPDATE a subscription"});
});

subscriptionRouter.delete("/:id", (req, res) => {
    res.send({title: "DELETE a subscription"});
});

// related to user-subscriptions
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.post("/:id/cancel", (req, res) => {
    res.send({title: "Cancel a subscription"});
})

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
    res.send({title: "GET upcoming renewal details"});
});

export default subscriptionRouter;
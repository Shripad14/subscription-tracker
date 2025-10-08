import { Router } from "express";

const subscriptionRouter = Router();

// related to subscriptions
subscriptionRouter.get("/", (req, res) => {
    res.send({title: "GET all subs"});
});

subscriptionRouter.get("/:id", (req, res) => {
    res.send({title: "GET subscription details"});
});

subscriptionRouter.post("/", (req, res) => {
    res.send({title: "CREATE new subscription"});
});

subscriptionRouter.put("/:id", (req, res) => {
    res.send({title: "UPDATE a subscription"});
});

subscriptionRouter.delete("/:id", (req, res) => {
    res.send({title: "DELETE a subscription"});
});

// related to user-subscriptions
subscriptionRouter.get("/user/:id", (req, res) => {
    res.send({title: "GET subscription details of user"});
});

subscriptionRouter.post("/:id/cancel", (req, res) => {
    res.send({title: "Cancel a subscription"});
})

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
    res.send({title: "GET upcoming renewal details"});
});

export default subscriptionRouter;
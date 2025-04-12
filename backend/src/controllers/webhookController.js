import { Webhook } from "svix";
import User from "../models/User.js";

const webhookController = async (req, res) => {
  try {
    const webhook = new Webhook(process.env.WEBHOOK_SECRET_KEY);
    await webhook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          name: data.first_name + " " + data.last_name,
          email: data.email_addresses[0].email_address,
          resume: data.resume,
          image: data.image_url,
        };

        const user = new User(userData);
        await user.save();

        res.json({});
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }

      case "user.updated": {
        const userData = {
          name: data.first_name + " " + data.last_name,
          email: data.email_addresses[0].email_address,
          image: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }

      default:
        res
          .status(400)
          .json({ success: false, message: "Unhandled event type" });
        break;
    }
  } catch (error) {
    console.log("Webhook verification failed:", error.message);
    res
      .status(400)
      .json({ success: false, message: "Webhook verification failed" });
  }
};

export default webhookController;

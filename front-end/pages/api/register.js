import { PrismaClient } from "@prisma/client";
import api from "../../lib/api";

export default async (req, res) => {
  if (req.method === "POST") {
    const { name, email, password, phone, emergency_contact } = req.body;

    try {
      await api.post("/api_user/createUser", {
        name: name,
        email: email,
        password: password,
        phone: phone,
        emergency_contact: emergency_contact,
      });

      return res.status(200).end();
    } catch (err) {
      return res.status(503).json({ err: err.toString() });
    }
  } else {
    return res
      .status(405)
      .json({ error: "This request only supports POST requests" });
  }
};

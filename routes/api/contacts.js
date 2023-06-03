const express = require("express");

const Joi = require("joi");

const contactsService = require("../../models/contacts");

const { HttpError } = require("../../helpers");

const router = express.Router();

const contactAddScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
    // res.status(500).json({ massage: "Server error" });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contact with ${id} not found`);

      // const error = new Error(`Contact with ${id} not found`);
      // error.status = 404;
      // throw error;

      // return res.status(404).json({ message: `Contact with ${id} not found` });
    }
    res.json(result);
  } catch (error) {
    next(error);

    // const { status = 500, message = "Server error" } = error;
    // res.status(status).json({ message });

    // res.status(500).json({ massage: "Server error" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactAddScheme.validate(req.body);
    if (error) {
      throw HttpError(404, "missing required name field");
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw HttpError(404, `Contact with ${id} not found`);
    }
    res.json({ message: `contact with ${id} deleted` });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactAddScheme.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }
    const { id } = req.params;
    const result = await contactsService.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, `Contact with ${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

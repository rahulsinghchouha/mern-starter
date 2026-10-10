import Item from "../models/Item.js";

export async function getItems(_request, response, next) {
  try {
    const items = await Item.find().sort({ createdAt: -1 }).lean();
    response.json(items);
  } catch (error) {
    next(error);
  }
}

export async function createItem(request, response, next) {
  try {
    const name = typeof request.body.name === "string" ? request.body.name.trim() : "";
    if (!name) {
      return response.status(400).json({ message: "Item name is required." });
    }

    if (name.length > 120) {
      return response.status(400).json({
        message: "Item name must be 120 characters or fewer.",
      });
    }

    const item = await Item.create({ name });
    response.status(201).json(item);
  } catch (error) {
    next(error);
  }
}

export async function getItem(request, response, next) {
  try {
    const item = await Item.findById(request.params.id).lean();
    if (!item) {
      return response.status(404).json({ message: "Item not found." });
    }

    response.json(item);
  } catch (error) {
    next(error);
  }
}

export async function updateItem(request, response, next) {
  try {
    const name = typeof request.body.name === "string" ? request.body.name.trim() : "";
    if (!name) {
      return response.status(400).json({ message: "Item name is required." });
    }

    if (name.length > 120) {
      return response.status(400).json({
        message: "Item name must be 120 characters or fewer.",
      });
    }

    const item = await Item.findByIdAndUpdate(
      request.params.id,
      { name },
      { new: true, runValidators: true },
    );
    if (!item) {
      return response.status(404).json({ message: "Item not found." });
    }

    response.json(item);
  } catch (error) {
    next(error);
  }
}

export async function deleteItem(request, response, next) {
  try {
    const item = await Item.findByIdAndDelete(request.params.id);
    if (!item) {
      return response.status(404).json({ message: "Item not found." });
    }

    response.json({ message: "Item deleted." });
  } catch (error) {
    next(error);
  }
}

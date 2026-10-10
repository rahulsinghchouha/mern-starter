export function errorHandler(error, _request, response, _next) {
  console.error(error);

  if (error.name === "ValidationError") {
    return response.status(400).json({ message: error.message });
  }

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).json({ message: "Invalid item ID." });
  }

  response.status(500).json({ message: "An unexpected server error occurred." });
}

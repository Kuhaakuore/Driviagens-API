import httpStatus from "http-status";

export default function errorHandler(error, req, res, next) {
  console.log(error);

  switch (error.type) {
    case "conflict":
      return res.status(httpStatus.CONFLICT).send(error.message);

    case "notFound":
      return res.status(httpStatus.NOT_FOUND).send(error.message);

    case "incompleteData":
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);

    case "invalidId":
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);

    case "invalidDates":
      return res.status(httpStatus.BAD_REQUEST).send(error.message);

    default:
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send("Sorry, something went wrong 😢");
  }
}

import httpStatus from "http-status";
import passengersService from "../services/passengers-service.js";

async function createPassenger(req, res) {
    const { body } = req;
    
    await passengersService.createPassenger(body);
    return res.sendStatus(httpStatus.CREATED);
}

const passengersController = { createPassenger };

export default passengersController;
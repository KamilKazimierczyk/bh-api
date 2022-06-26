const conf = require('../config');
const {eventValidator} = require('../utils/validators');

const getAllEvents = async (request, response) => {
    conf.DB.query('SELECT * FROM event', (error, results) => {
        if (!error) {
            const data = {
                status: 'success',
                message: results.rows.length ? 'Events has been fetched' : 'No events had been found'
            };
            if(results.rows.length) data.data = results.rows;
            response.status(200).send(data);
        } else {
            response.status(500).send({
                status: 'error',
                message: 'Error occured while fetching data from database'
            });
        }
    })
};

const getEventById = async (request, response) => {
    const id = parseInt(request.params.id);
    conf.DB.query(`SELECT * FROM event WHERE id = ${id}`, (error, results) => {
        if (!error) {
            const data = {
                status: 'success',
                message: results.rows.length ? 'Event has been fetched' : 'Event with specific id has not been found'
            };
            if(results.rows.length) data.data = results.rows[0];
            response.status(200).send(data);
        } else {
            response.status(500).send({
                status: 'error',
                message: 'Error occured while fetching data from database'
            });
        }
    })
};

const createEvent = async (request, response) => {
    const { firstName, lastName, email, date } = request.body;
    if(eventValidator({firstName,lastName,email,date})) {
        conf.DB.query(`INSERT INTO public.event(first_name, last_name, email, date) VALUES ('${firstName}', '${lastName}', '${email}', to_timestamp(${Date.parse(date)} / 1000.0));`, (error, results) => {
            if (!error) {
                const data = {
                    status: 'success',
                    message: 'Event has been added'
                };
                response.status(200).send(data);
            } else {
                response.status(500).send({
                    status: 'error',
                    message: 'Error occured while fetching data from database'
                });
            }
        })
    } else {
        response.status(400).send({
            status: 'error',
            message: 'Please provaide correct data'
        });
    }
};

module.exports = {
    getAllEvents,
    getEventById,
    createEvent
}

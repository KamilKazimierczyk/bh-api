const eventValidator = (event) => {
    if(!(typeof event?.firstName === 'string' && event?.firstName.trim().length && event.firstName)) return false;
    if(!(typeof event?.lastName === 'string' && event?.lastName.trim().length && event.lastName)) return false;
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(!(event.email?.match(pattern) && event.email?.trim().length && event.email)) return false;
    if(isNaN(Date.parse(event?.date)) || !event.date) return false;
    return true;
}

module.exports = {eventValidator}
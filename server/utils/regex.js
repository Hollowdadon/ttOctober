const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const ssnRegex = /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/; // format: 000-00-0000

module.exports = {
  emailRegExp,
  ssnRegex,
}

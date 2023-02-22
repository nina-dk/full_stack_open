const mongoose = require("mongoose");
const URL = process.env.MONGODB_URL;

mongoose.set("strictQuery",false);
mongoose.connect(URL)
    .then(res => {
        console.log(`connected to: ${URL}`);
    })
    .catch(err => {
        console.log(`error connecting to: ${URL}`);
        console.log(err.message);
    });

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function(num) {
        return /^((\d{2}-\d{6,})|(\d{3}-\d{5,})|(\d{8,}))$/.test(num);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: true
  }
});

contactSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
});

module.exports = mongoose.model("Contact", contactSchema);
const express = require("express");
const app = express();
const dotEnv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Customer = require("./customers");
const Product = require("./products");
dotEnv.config();

let token;
let isValidNumber = (num) => {
  let len = Math.ceil(Math.log10(num + 1)) - 1;

  if (len === 10) return true;
  else return false;
};

let isValidEmail = (email) => {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
  if (re.test(email)) {
    return true;
  }

  return false;
};

const IsFilledSignUpForm = (name, email, phone, password) => {
  if (
    !name ||
    !email ||
    !phone ||
    !password ||
    !isValidEmail(email) ||
    !isValidNumber(phone) ||
    name.trim().length === 0 ||
    password.trim().length === 0
  ) {
    return false;
  } else {
    return true;
  }
};

const isEmailAlreadyExist = async (email) => {
  let temp = false;
  const customer = await Customer.findOne({ email });

  if (customer) return true;
  else return false;
};

const isFilledLoginForm = (req, res, next) => {
  const { email, password } = req.body;
  if (
    !email ||
    !password ||
    !isValidEmail(email) ||
    password.trim().length === 0
  ) {
    res.json({
      mesage: "Some of your feilds are missing (Or) Enter valid details",
    });
  } else {
    next();
  }
};

const isRegistered = async (req, res, next) => {
  const { email } = req.body;
  const customer = await Customer.findOne({ email });
  if (customer) {
    next();
  } else {
    res.json({
      message:
        "We cant able to find an account registered with this email-id, Sign-up",
    });
  }
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public/`));

app.get("/", (req, res) => {
  res.json({ message: "All system operational!" });
});

app.post("/login", isFilledLoginForm, isRegistered, (req, res) => {
  const { email, password } = req.body;
  Customer.findOne({ email })
    .then(async (customer) => {
      let isMatched = await bcrypt.compare(password, customer.password);
      if (isMatched) {
        token = jwt.sign({ email, password }, process.env.JWT_SECRET);
        res.json({ message: "Logged in" });
      } else {
        res.json({ mesage: "Please enter correct password" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;
  let isAcceptable = IsFilledSignUpForm(name, email, phone, password);
  if (isAcceptable === false) {
    res.json({
      mesage: "Some of your feilds are missing (Or) Enter valid details",
    });
  } else {
    isAcceptable = await isEmailAlreadyExist(email);
    if (isAcceptable === true) {
      res.json({
        mesage: "User with the same email already exist",
      });
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10);
      token = jwt.sign({ email, password }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      await Customer.create({ name, email, phone, password: encryptedPassword })
        .then(() => {
          res.json({ mesage: "Customer created successfully!" });
        })
        .catch((err) => {
          res.json({ "Error in creating customer": err });
        });
    }
  }
});

app.post("/add-products", async (req, res) => {
  let { name, category, logoUrl, linkProduct, desc } = req.body;
  category = category.split(",");
  for (let i = 0; i < category.length; i++) {
    category[i] = category[i].trim();
  }
  let upvotesCount = 0;
  let cLen = 0;
  await Product.create({
    name,
    category,
    logoUrl,
    linkProduct,
    desc,
    upvotesCount,
    cLen,
  })
    .then(() => {
      res.json({ mesage: "Product added!" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/products", async (req, res) => {
  await Product.find()
    .sort({ upvotesCount: -1 })
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
    });
});

// sort by comments length (descending)

app.get("/comments", async (req, res) => {
  // console.log("called");
  await Product.find()
    .sort({ cLen: -1 })
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
    });
});

// throw jwt token

app.get("/get-token", (req, res) => {
  if (!token) {
    res.json({ code: 400, message: "Bad request" });
  } else {
    res.json({ code: 200, message: token });
  }
});

// update count

app.get("/update-upvote-count", async (req, res) => {
  const { count, id } = req.query;
  await Product.findByIdAndUpdate(id, { upvotesCount: count })
    .then((product) => {
      res.json(product);
      // res.redirect('/products');
    })
    .catch((err) => {
      console.log(err);
    });
  // res.json({message: 'updated comment'});
});

// update comments

app.get("/update-comments", async (req, res) => {
  const { keys, values } = req.query;

  // console.log(keys);
  // console.log(values);

  for (let i = 0; i < keys.length; i++) {
    let id = keys[i];
    let comments = values[i];

    await Product.findByIdAndUpdate(id, { comments: comments })
      .then((product) => {
        // res.json(product);
      })
      .catch((err) => {
        console.log(err);
      });
    await Product.findByIdAndUpdate(id, { cLen: comments.length })
      .then((product) => {
        // res.json(product);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  res.json({ message: "updated comment" });
});

app.listen(process.env.SERVER_PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
      console.log(`Server running on port ${process.env.SERVER_PORT}`);
    })
    .catch(() => {
      console.log("Could not connect to MongoDB");
    });
});

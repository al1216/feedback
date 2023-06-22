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

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthbW9oZWQ3MTZAbnphaWYuY29tIiwicGFzc3dvcmQiOiIxMjMiLCJpYXQiOjE2ODc0NjY4MDIsImV4cCI6MTY4NzU1MzIwMn0.plOcrsARdUlRVCcCVj9FnHTYf96Ymq3Y4kqrvvvaqIk";
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
    // res.json({
    //   mesage: "Some of your feilds are missing (Or) Enter valid details",
    // });
    res.redirect(`${process.env.HOST_URL}/missing-details`);
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
    // res.json({
    //   message:
    //     "We cant able to find an account registered with this email-id, Sign-up",
    // });
    res.redirect(`${process.env.HOST_URL}/no-account-found`);
  }
};

let addProductIsFilled = (req, res, next) => {
  let { name, category, logoUrl, linkProduct, desc } = req.body;
  // console.log(name, category, logoUrl, linkProduct, desc);
  if (!name || !category || !logoUrl || !linkProduct || !desc) {
    // res.json({ mesage: "Some of your details are missing or not valid" });
    res.redirect(`${process.env.HOST_URL}/missing-details`);
  } else if (
    name.trim().length === 0 ||
    category.trim().length === 0 ||
    logoUrl.trim().length === 0 ||
    linkProduct.trim().length === 0 ||
    desc.trim().length === 0
  ) {
    // res.json({ mesage: "Some of your details are missing or not valid" });
    res.redirect(`${process.env.HOST_URL}/missing-details`);
  } else {
    next();
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
        // res.json({ message: "Logged in" });
        res.redirect(`${process.env.HOST_URL}/`);
      } else {
        // res.json({ mesage: "Please enter correct password" });
        res.redirect(`${process.env.HOST_URL}/wrong-password`);
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
    // res.json({
    //   mesage: "Some of your feilds are missing (Or) Enter valid details",
    // });
    res.redirect(`${process.env.HOST_URL}/missing-details`);
  } else {
    isAcceptable = await isEmailAlreadyExist(email);
    if (isAcceptable === true) {
      // res.json({
      //   mesage: "User with the same email already exist",
      // });
    res.redirect(`${process.env.HOST_URL}/same-user-already-exist`);

    } else {
      const encryptedPassword = await bcrypt.hash(password, 10);
      token = jwt.sign({ email, password }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      await Customer.create({ name, email, phone, password: encryptedPassword })
        .then(() => {
          // res.json({ mesage: "Customer created successfully!" });
          res.redirect(`${process.env.HOST_URL}/`);
        })
        .catch((err) => {
          res.json({ "Error in creating customer": err });
        });
    }
  }
});

app.post("/add-products", addProductIsFilled, async (req, res) => {
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
      // res.json({ mesage: "Product added!" });
      res.redirect(`${process.env.HOST_URL}/`);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/edit-product/:id", addProductIsFilled, async (req, res) => {
  const { id } = req.params;
  let { name, category, logoUrl, linkProduct, desc } = req.body;
  category = category.split(",");
  for (let i = 0; i < category.length; i++) {
    category[i] = category[i].trim();
  }
  await Product.findByIdAndUpdate(
    { _id: id },
    { name, category, logoUrl, linkProduct, desc }
  )
    .then(() => {
      res.redirect(`${process.env.HOST_URL}/`);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/products", async (req, res) => {
  const { filter } = req.query;

  // console.log(filter);

  if (!filter || filter === "All" || filter === "") {
    await Product.find()
      .sort({ upvotesCount: -1 })
      .then((product) => {
        res.json(product);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    await Product.find({ category: { $in: filter } })
      .then((product) => {
        res.json(product);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

// get product by id

app.get("/product/:id", async (req, res) => {
  const { id } = req.params;

  await Product.findById(id)
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

  for (let i = 0; i < keys.length; i++) {
    let id = keys[i];
    let comments = values[i];

    await Product.findByIdAndUpdate(id, { comments: comments })
      .then((product) => {})
      .catch((err) => {
        console.log(err);
      });
    await Product.findByIdAndUpdate(id, { cLen: comments.length })
      .then((product) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  res.json({ message: "updated comment" });
});

// get feedback filters

app.get("/feed-filters", async (req, res) => {
  let prod = [],
    filters = ["All"];
  await Product.find({})
    .then((product) => {
      prod = product;
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log(prod);
  if (prod)
    prod.map((product) => {
      // console.log(product.category);
      for (let i = 0; i < product.category.length; i++) {
        if (!filters.includes(product.category[i])) {
          filters.push(product.category[i]);
        }
      }
    });
  res.json({ filters });
});

// get filter based product

app.get("/get-filter-product", async (req, res) => {
  const { filter } = req.query;
  // let filter = "Fintech";

  if (filter === "All") {
    res.redirect("/products");
  } else {
    await Product.find({ category: { $in: filter } })
      .then((product) => {
        res.json(product);
      })
      .catch((err) => {
        console.log(err);
      });
  }
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

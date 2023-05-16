if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
//////////////////////////////////////////////////////////////////////
const port = process.env.PORT || 3030;
const express = require("express");
const app = express();
app.listen(port, () => console.log(`server started on port ${port}`));
const os = require('os');
const serverHostname = os.hostname();
const serverOsName = os.platform();
const serverArchName = os.arch()
//   const serverTotalmem = os.totalmem()
//   const serverFreemem = os.freemem()
// const serverRelease = os.release()
//   const serverTmpdir = os.tmpdir()
const serverType = os.type()
//   const serverCpus = JSON.stringify(os.cpus())
const osDetails = {
  'serverHostname': serverHostname,
  'serverOsName': serverOsName,
  'serverArchName': serverArchName,
  // 'serverTotalmem' : serverTotalmem,
  // 'serverFreemem' : serverFreemem,
  // 'serverRelease' : serverRelease,
  // 'serverTmpdir' : serverTmpdir,
  'serverType': serverType,
  // 'serverCpus' : serverCpus,
}
console.log(osDetails)
const { exec } = require('child_process');
function getPublicIp(callback) {
  exec('curl ifconfig.me', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      callback(error, null);
      return;
    }
    const ip = stdout.trim();
    callback(null, ip);
  });
}
getPublicIp((err, ip) => {
  if (err) {
    console.error(`Error getting public IP: ${err}`);
    return;
  }
  console.log(`Public IP address: ${ip}`);
});
/////////////////
app.use(express.static(__dirname + '/public/'));
app.use(express.json({ limit: "1mb" }));
const ejs = require("ejs");
app.set('view engine', 'ejs');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const passport = require("passport")
const initializePassport = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session")
const Datastore = require("nedb");
const siteEnterDatabase = new Datastore({ filename: 'path/to/database.db', autoload: true });
siteEnterDatabase.loadDatabase();
const useragent = require('useragent');
const Joi = require("joi")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://TsankoData:8V6icuAthb74c79kv.jtgvbA98@tsankoyordanovdatabase.za66uid.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
const Bookings = require("./models/Booking")
const User = require("./models/User")

const requireUser = require("./middleware/requireUser");
const traceLogin = require("./middleware/traceLogin");

async function getUserByEmail(email) {
  const user = await User.findOne({ email: email })
  return user
}
async function getUserById(id) {
  const user = await User.findById(id).exec()
  return user
}

initializePassport(passport, getUserByEmail, getUserById)
app.use(flash())

app.use(session({
  secret: process.env.SESSION_SECRET || 'mysecretkeygoeshere2000',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize())
app.use(passport.session())


//Routes
app.get('/', async (req, res, next) => {

  try {
    const isLoggedIn = req.isAuthenticated();
    const text = isLoggedIn ? 'Изход' : 'Вход';
    const link = isLoggedIn ? 'logout' : 'login';
    if (!req.isAuthenticated()) {
      res.render('index', { text: text, link: link, adminPanel: 0 });
    } else {
      const user = JSON.stringify(await req.user);
      const readyUser = JSON.parse(user);
      if (readyUser._id === '64465fef3b2e6a4818797f3a') {
        res.render('index', { text: text, link: link, adminPanel: 1 });
      } else {
        res.render('index', { text: text, link: link, adminPanel: 0 });
      }
    }
  } catch (error) {
    next(error);
  }
});
async function getBookings(quotes) {
  const bookings = [];
  for (const quote of quotes) {
    try {
      const booking = await Bookings.findById(quote);
      if (booking) {
        bookings.push(booking);
      }
    } catch (error) {
      console.error(`Error fetching booking ${quote}: ${error.message}`);
    }
  }
  return bookings;
}

app.get('/manage-booking', async (req, res) => {
  const isLoggedIn = req.isAuthenticated();
  const text = isLoggedIn ? 'Изход' : 'Вход';
  const link = isLoggedIn ? 'logout' : 'login';
  if (!req.isAuthenticated()) {
    res.render('manage-booking', { text: text, link: link, adminPanel: 0, isLoggedIn: isLoggedIn })
  }
  else {
    const user = JSON.stringify(await req.user)
    const readyUser = JSON.parse(user)
    getBookings(readyUser.quotes)
      .then((newArray) => {

        if (readyUser._id === '64465fef3b2e6a4818797f3a') {
          res.render('manage-booking', {
            text: text, link: link,
            adminPanel: 1,
            isLoggedIn: isLoggedIn,
            userQuotes: newArray
          })
        } else {
          res.render('manage-booking', {
            text: text, link: link,
            adminPanel: 0,
            isLoggedIn: isLoggedIn,
            userQuotes: newArray
          })
        }
      })
      .catch((error) => {
        console.error(`Error fetching bookings: ${error.message}`);
      });

  }
})

app.get('/services', async (req, res, next) => {
  const isLoggedIn = req.isAuthenticated();
  const text = isLoggedIn ? 'Изход' : 'Вход';
  const link = isLoggedIn ? 'logout' : 'login';
  if (!req.isAuthenticated()) {
    res.render('services', { text: text, link: link, adminPanel: 0 })
  }
  else {
    const user = JSON.stringify(await req.user)
    const readyUser = JSON.parse(user)
    if (readyUser._id === '64465fef3b2e6a4818797f3a') {
      res.render('services', { text: text, link: link, adminPanel: 1 })
    } else {
      res.render('services', { text: text, link: link, adminPanel: 0 })
    }
  }
})
app.get('/contact', async (req, res) => {
  const isLoggedIn = req.isAuthenticated();
  const text = isLoggedIn ? 'Изход' : 'Вход';
  const link = isLoggedIn ? 'logout' : 'login';
  if (!req.isAuthenticated()) {
    res.render('contact', { text: text, link: link, adminPanel: 0 })
  }
  else {
    const user = JSON.stringify(await req.user)
    const readyUser = JSON.parse(user)
    if (readyUser._id === '64465fef3b2e6a4818797f3a') {
      res.render('contact', { text: text, link: link, adminPanel: 1 })
    } else {
      res.render('contact', { text: text, link: link, adminPanel: 0 })
    }
  }
})
app.get('/about', async (req, res) => {
  const isLoggedIn = req.isAuthenticated();
  const text = isLoggedIn ? 'Изход' : 'Вход';
  const link = isLoggedIn ? 'logout' : 'login';
  if (!req.isAuthenticated()) {
    res.render('about', { text: text, link: link, adminPanel: 0 })
  }
  else {
    const user = JSON.stringify(await req.user)
    const readyUser = JSON.parse(user)
    if (readyUser._id === '64465fef3b2e6a4818797f3a') {
      res.render('about', { text: text, link: link, adminPanel: 1 })
    } else {
      s
      res.render('about', { text: text, link: link, adminPanel: 0 })
    }
  }
})
app.get('/login', (req, res) => {
  const isLoggedIn = req.isAuthenticated();
  const error = false
  const boxSide = 'front'
  const boxSideHelper = 'back'
  isLoggedIn ? res.redirect('/') :
    res.render('login', {
      text: 'Вход',
      link: 'login',
      error: error,
      boxSide: boxSide,
      boxSideHelper: boxSideHelper,
      deg: 0,
      degHelper: 540,
      adminPanel: 0
    })
})


app.get('/admin-panel', requireUser, async (req, res) => {
  const isLoggedIn = req.isAuthenticated();
  const text = isLoggedIn ? 'Изход' : 'Вход';
  const link = isLoggedIn ? 'logout' : 'login';
  res.render('admin-panel', { text: text, link: link, adminPanel: 1 })
})


//login
app.post('/login', passport.authenticate('local', {
  successRedirect: '/manage-booking',
  failureRedirect: '/login',
  failureFlash: true,
  failureFlash: 'Грешна парола или ймеил.'
}));


//fast login
app.post('/fast-login', (req, res, next) => {
  const url = req.get('referer');
  passport.authenticate('local', {
    successRedirect: url,
    failureRedirect: url,
    failureFlash: true,
    failureFlash: 'Грешна парола или ймеил.'
  })(req, res, next);
});




//logout
app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/')
  })
})

/////////////////////////DATABASE QUOTE REQUESTED /////////////////////////////////

app.get("/quote", async (req, res) => {
  try {
    const isLoggedIn = req.isAuthenticated();
    const text = isLoggedIn ? 'Изход' : 'Вход';
    const link = isLoggedIn ? 'logout' : 'login';
    await siteEnterDatabase.findOne({ _id: req.query.id }, async (err, doc) => {
      if (err) {
        console.log(err)
      } else {
        if (!doc) { // if doc is null or undefined
          res.redirect('/'); // redirect to root URL
          return;
        }
        if (!isLoggedIn) { // if user not logged
          res.render('your-quote', { text: text, link: link, adminPanel: 0, quoteNumber: doc._id, quotePrice: doc.price })
        } else {
          const user = JSON.stringify(await req.user)
          const readyUser = JSON.parse(user)
          if (readyUser._id === '64465fef3b2e6a4818797f3a') {
            res.render('your-quote', { text: text, link: link, adminPanel: 1, quoteNumber: doc._id, quotePrice: doc.price })
          } else {
            res.render('your-quote', { text: text, link: link, adminPanel: 0, quoteNumber: doc._id, quotePrice: doc.price })
          }
        };
      }
    })
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


const schema = Joi.object({
  make: Joi.string().required(),
  model: Joi.string().required(),
  option: Joi.string().required(),
  pickUp: Joi.string().required(),
  dropOff: Joi.string().required(),
  lat: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
  long: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
  time: Joi.string().required(),
  price: Joi.number().required(),
  clientDevice: Joi.string().required(),
  clientIP: Joi.string().required()
});

app.post("/quote", async (req, res) => {
  const timeShow = new Date().toUTCString();
  req.body.time = timeShow;

  const userAgentString = req.headers['user-agent'];
  const userAgent = useragent.parse(userAgentString);
  const userDevice = userAgent.device.toString()

  const randomPercent = Math.random();
  const price = 25 + 275 * randomPercent;
  const readyPrice = Math.round(price * 100) / 100;

  const priceAdded = {
    ...req.body,
    'price': readyPrice,
    'clientDevice': userDevice,
    'clientIP': req.ip
  }
  const { error, value } = schema.validate(priceAdded);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  try {
    await siteEnterDatabase.insert(value);
    await siteEnterDatabase.findOne({
      clientIP: value.clientIP,
      pickUp: value.pickUp,
      time: value.time
    },
      (err, doc) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.status(200).json(doc);
        }
      })
  } catch (e) {
    console.log(e)
  }
});

app.post("/quote/payment", async (req, res) => {
  try {
    await siteEnterDatabase.findOne({ _id: req.body.toString() }, async (err, doc) => {
      if (err) {
        console.log(err)
      } else {
        res.render('layouts/payment-section.ejs', { price: doc.price })
      }
    })
  } catch (e) {
    console.log(e);
    res.status(500).send('Error retrieving data');
  }
});

const schemaPay = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required()
});
async function sendEmail(mailOptions) {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: `ppomosht.bulgaria@gmail.com`,
      pass: `sahxavuaeecnkbil`,
    },
  });

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("New Order Created: " + info.response);
  } catch (error) {
    console.log(error);
  }
}

app.post('/quote/pay', async (req, res) => {
  const { error, value } = schemaPay.validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  try {
    await siteEnterDatabase.findOne({ _id: value.id }, async (err, doc) => {
      if (err) {
        console.log(err)
      } else {
        const saveId = doc._id
        delete doc._id
        doc.traceID = saveId
        doc.name = value.name
        doc.phone = value.phone
        doc.email = value.email
        try {
          const booking = await Bookings.create(doc)
          const randomPassword = crypto.randomBytes(8).toString('hex');
          const hashedPassword = await bcrypt.hash(randomPassword, 10);
          const user = await User.findOne({ email: value.email });
          console.log(booking)

          const mailBookingOptions = {
            from: "ppomosht.bulgaria@gmail.com",
            to: value.email,
            subject: `Поръчка номер: ${booking.traceID.substring(1, 6).toUpperCase()} е потвърдена!`,
            text: `Поръчка номер: ${booking.traceID.substring(1, 6).toUpperCase()} е потвърдена и към вас пътува нас служител.
            Може да следите и управлявате вашата поръчка от нашия лебсайт, необходимо е само да въведете номер на поръчка емайл и да влезете с паролата, която сме Ви изпратили,ако нямате акаунт.
            Детайли:
            Марка:${booking.make}
            Модел:${booking.model} `,
          };
          if (user) {
            user.quotes.push(booking._id.toString());
            await user.save();
            res.status(200).json({ doc });
          } else {
            const mailOptions = {
              from: "ppomosht.bulgaria@gmail.com",
              to: value.email,
              subject: "Благодарим, че избрахте нас!",
              text: `Вашата парола е: ${randomPassword}`,
            };
            await sendEmail(mailOptions);
            await User.create({
              email: value.email,
              password: hashedPassword,
              name: value.name,
              phone: value.phone,
              quotes: [booking._id.toString()]
            });
            const bookingObject = booking.toObject();
            const withPass = { ...bookingObject, 'yourpass': randomPassword }
            res.status(200).json({ withPass });
          }
          return await sendEmail(mailBookingOptions);
        } catch (e) { console.log(e) }
      }
    })
  } catch (e) {
    console.log(e)
  }
});

app.get('/quote/thank-you', async (req, res) => {
  const isLoggedIn = req.isAuthenticated();
  const text = isLoggedIn ? 'Изход' : 'Вход';
  const link = isLoggedIn ? 'logout' : 'login';
  if (!req.isAuthenticated()) {
    res.render('thank-you', { text: text, link: link, adminPanel: 0 })
  }
  else {
    const user = JSON.stringify(await req.user)
    const readyUser = JSON.parse(user)
    if (readyUser._id === '64465fef3b2e6a4818797f3a') {
      res.render('thank-you', { text: text, link: link, adminPanel: 1 })
    } else {
      res.render('thank-you', { text: text, link: link, adminPanel: 0 })
    }
  }
})
////////////////////////////////FIND BOOKING/////////////////////////////////////

app.get('/manage-booking/booking/:id', traceLogin, async (req, res) => {
  const isLoggedIn = req.isAuthenticated();
  const text = isLoggedIn ? 'Изход' : 'Вход';
  const link = isLoggedIn ? 'logout' : 'login';
  try {
    const order = await Bookings.findOne({ traceID: req.params.id })
    if (order && order.length !== 0) {
      if (req.session.passport !== undefined) {
        const uniqueUser = await User.findById(req.session.passport.user)
        if (uniqueUser.email === order.email) {
          return res.render('pages/found-book', {
            text: text,
            link: link,
            adminPanel: 0,
            quote: order,
            pleaseLogin: false
          });
        } else {
          return res.render('pages/found-book', {
            text: text,
            link: link,
            adminPanel: 0,
            quote: order,
            pleaseLogin: true,
            wrongUser: 'Моля влезте с ймейла с който е направена поръчката за да продължите'
          });
        }
      } else {
        return res.render('pages/found-book', {
          text: text,
          link: link,
          adminPanel: 0,
          quote: order,
          pleaseLogin: true
        });
      }
    } else {
      return res.redirect('/')
    }
  } catch (e) { console.log(e) }
})

app.post('/manage-booking/booking/:id', async (req, res) => {
  try {
    const order = await Bookings.findOne({
      $and: [
        {
          $expr: {
            $eq: [
              { $toUpper: { $substrBytes: [{ $toString: "$traceID" }, 1, 5] } },
              req.body.quoteNumberFindValue
            ]
          }
        },
        {
          email: req.body.quoteEmailFindValue
        }
      ]
    });
    if (order && order.length !== 0) {
      return res.json({ success: false, orderID: order.traceID });
    } else {
      return res.json({ success: false, text: 'Грешни детайли' });
    }
  } catch (e) { console.log(e) }
})

//////////////////////////////// POST LLOGINS///////////////////////////

// app.post('/manage-booking', async (req, res) => {
//   const id = req.body.toString();
//   try {
//     const quote = await Bookings.findOne({ traceID: id });
//     console.log(quote);
//     res.json({ success: quote });
//   } catch (e) {
//     console.log(e);
//   }
// });

////////////////////////////////POST CONTACT MESSAGE/////////////////////////////////////
const storeContactMsgController = require('./controllers/storeContactMsg');
app.post('/send-msg', storeContactMsgController);


/////////////////////////////////////////////ADMIN SECURE CONTENT PAGE ROUTES//////////////////////////

app.get('/sections/admin-panel/dashboard', requireUser, function (req, res) {
  res.sendFile(__dirname + '/views/layouts/admin-panel/dashboard.ejs');
});

app.get('/sections/admin-panel/users', requireUser, async (req, res) => {
  const users = await User.find({})
  ejs.renderFile(__dirname + '/views/layouts/admin-panel/all-users.ejs', { users: users }, (err, html) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send(html);
    }
  });
});

app.get('/sections/admin-panel/all-bookings', requireUser, async function (req, res) {
  const orders = await Bookings.find({})
  ejs.renderFile(__dirname + '/views/layouts/admin-panel/all-bookings.ejs', { orders: orders, singleO: false }, (err, html) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(html);
    }
  });
});

app.get('/sections/admin-panel/all-bookings/:id', requireUser, async function (req, res) {
  const singleO = await Bookings.findById(req.params.id);
  ejs.renderFile(__dirname + '/views/layouts/admin-panel/all-bookings.ejs', { singleO: singleO, orders: 0 }, (err, html) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(html);
    }
  });
});

app.put('/sections/admin-panel/all-bookings/:id', requireUser, async function (req, res) {
  const id = req.params.id;
  const { name, phone, option, pickUp, dropOff, process, price } = req.body;

  try {
    // perform the update operation on the database
    const result = await db.updateBooking(id, name, phone, option, pickUp, dropOff, process, price);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the booking.' });
  }
});


app.delete('/sections/admin-panel/all-bookings/:id', requireUser, async function (req, res) {
  try {
    const id = req.params.id;
    const deletedBooking = await Bookings.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).send('Booking not found.');
    }
    res.send('Booking deleted successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
});
app.get('/sections/admin-panel/in-process', requireUser, async (req, res) => {
  ejs.renderFile(__dirname + '/views/layouts/admin-panel/in-process.ejs', (err, html) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(html);
    }
  });
});
app.get('/sections/admin-panel/custom-quote', requireUser, async (req, res) => {
  ejs.renderFile(__dirname + '/views/layouts/admin-panel/custom-quote.ejs', (err, html) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(html);
    }
  });
});
app.get('/sections/admin-panel/settings-panel', requireUser, async (req, res) => {
  ejs.renderFile(__dirname + '/views/layouts/admin-panel/settings-panel.ejs', (err, html) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(html);
    }
  });
});
app.get('/sections/admin-panel/logs', requireUser, async (req, res) => {
  ejs.renderFile(__dirname + '/views/layouts/admin-panel/logs.ejs', (err, html) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(html);
    }
  });
});

///
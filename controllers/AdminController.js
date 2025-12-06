// const express = require("express");
// const router = express.Router();
// const db = require("../models");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// router.post("/", (req, res) => {
//   db.Admin.create(req.body).then((newAdmin) => {
//     res.json(newAdmin);
//   });
// });

// router.get("/allAdmins", (req, res) => {
//   db.Admin.findAll().then((allAdmins) => {
//     res.json(allAdmins);
//   });
// });

// router.get("/viewAdmin", (req, res) => {
//   db.Admin.findAll().then((allAdmins) => {
//     res.send(allAdmins);
//     // console.log(allAdmins);
//   });
// });

// router.post("/adminLogin", (req, res) => {
//   const data = req.body;
//   const email = data.email;
//   const password = data.password;
//   // console.log("Req.Body", req.body);
//   if (!email || !password) {
//     return res.status(422).json({
//       error: true,
//       data: null,
//       message: "Email and Password are required fields!",
//     });
//   } else {
//     // .compare(email, Admin.password)
//     db.Admin.findOne({ where: { email: email } }).then((foundAdmin) => {
//       // console.log("foundU Data", foundAdmin.email);
//       if (!foundAdmin) {
//         return res.status(401).json({
//           error: true,
//           data: foundAdmin,
//           message: "Admin not found.",
//         });
//       }

//       bcrypt.compare(password, foundAdmin.password).then((result) => {
//         if (!result) {
//           return res.status(401).json({
//             error: true,
//             data: null,
//             message: "Invalid Email or Password.",
//           });
//         }

//         // Create token
//         const token = jwt.sign({ id: foundAdmin._id }, process.env.SECRET, {
//           expiresIn: "7d",
//         });

//         // Remove password from output
//         foundAdmin.password = undefined;

//         res.status(200).json({
//           error: false,
//           data: { token: token, admin: foundAdmin },
//           message: null,
//         });
//       });
//     });
//   }
// });

// router.post("/adminSignUp", (req, res) => {
//   const data = req.body;
//   const email = data.email;
//   const password = data.password;

//   if (!email || !password) {
//     res.status(400);
//   } else {
//     bcrypt
//       .hash(req.body.password, 10)
//       .then((hashedPassword) => {
//         db.Admin.create({
//           email: req.body.email,
//           password: hashedPassword,
//         })
//           .then((newAdmin) => {
//             const token = jwt.sign(
//               { email: newAdmin.email },
//               process.env.SECRET
//             );
//             res.json({
//               err: false,
//               data: token,
//               message: "Successfully signed up.",
//             });
//           })
//           .catch((err) => {
//             console.log(err);
//             res.status(500).json({
//               error: true,
//               data: null,
//               message: "Unable to signUp.",
//             });
//           });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json({
//           error: true,
//           data: null,
//           message: "Password?",
//         });
//       });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const db = require("../models");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// // ===============================
// // ADMIN — CREATE
// // ===============================
// router.post("/", (req, res) => {
//   db.Admin.create(req.body).then((newAdmin) => {
//     res.json(newAdmin);
//   });
// });

// // ===============================
// // ADMIN — GET ALL
// // ===============================
// router.get("/allAdmins", (req, res) => {
//   db.Admin.findAll().then((allAdmins) => {
//     res.json(allAdmins);
//   });
// });

// // ===============================
// // ADMIN — VIEW
// // ===============================
// router.get("/viewAdmin", (req, res) => {
//   db.Admin.findAll().then((allAdmins) => {
//     res.send(allAdmins);
//   });
// });

// // ===============================
// // ADMIN — LOGIN
// // ===============================
// router.post("/adminLogin", (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(422).json({
//       error: true,
//       message: "Email and Password are required fields!",
//     });
//   }

//   db.Admin.findOne({ where: { email } }).then((foundAdmin) => {
//     if (!foundAdmin) {
//       return res.status(401).json({
//         error: true,
//         message: "Admin not found.",
//       });
//     }

//     bcrypt.compare(password, foundAdmin.password).then((result) => {
//       if (!result) {
//         return res.status(401).json({
//           error: true,
//           message: "Invalid Email or Password.",
//         });
//       }

//       const token = jwt.sign({ id: foundAdmin.id }, process.env.SECRET, {
//         expiresIn: "7d",
//       });

//       foundAdmin.password = undefined;

//       res.status(200).json({
//         error: false,
//         data: { token, admin: foundAdmin },
//       });
//     });
//   });
// });

// // ===============================
// // ADMIN — SIGNUP
// // ===============================
// router.post("/adminSignUp", (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password)
//     return res.status(400).json({ error: true, message: "Missing fields." });

//   bcrypt
//     .hash(password, 10)
//     .then((hashedPassword) =>
//       db.Admin.create({ email, password: hashedPassword })
//     )
//     .then((newAdmin) => {
//       const token = jwt.sign({ email: newAdmin.email }, process.env.SECRET);
//       res.json({
//         error: false,
//         data: token,
//         message: "Successfully signed up.",
//       });
//     })
//     .catch(() =>
//       res.status(500).json({
//         error: true,
//         message: "Unable to sign up.",
//       })
//     );
// });

// // ========================================================================
// // ========================================================================
// // *** USER PROFILE MANAGEMENT (NEW) ***
// // ========================================================================
// // ========================================================================

// // Utility: Convert "true"/"false" strings into booleans
// function normalizeBooleanFields(payload, fields) {
//   fields.forEach((f) => {
//     if (payload[f] === "true") payload[f] = true;
//     if (payload[f] === "false") payload[f] = false;
//   });
// }

// // Utility: Auto-parse JSON fields if possible
// function normalizeJSONFields(payload, fields) {
//   fields.forEach((f) => {
//     if (payload[f] && typeof payload[f] === "string") {
//       try {
//         payload[f] = JSON.parse(payload[f]);
//       } catch {
//         // leave as string if parsing fails
//       }
//     }
//   });
// }

// // ===============================
// // GET ALL USERS
// // /api/admin/users
// // ===============================
// router.get("/users", async (req, res) => {
//   try {
//     const users = await db.User.findAll();
//     res.json({ error: false, data: users });
//   } catch (err) {
//     console.error("User fetch error:", err);
//     res.status(500).json({ error: true, message: "Unable to fetch users." });
//   }
// });

// // ===============================
// // GET USER BY ID
// // /api/admin/users/:id
// // ===============================
// router.get("/users/:id", async (req, res) => {
//   try {
//     const user = await db.User.findByPk(req.params.id);
//     if (!user)
//       return res.status(404).json({ error: true, message: "User not found" });

//     const safeUser = user.toJSON();
//     delete safeUser.password;

//     res.json({ error: false, data: safeUser });
//   } catch (err) {
//     console.error("User fetch error:", err);
//     res.status(500).json({ error: true, message: "Unable to fetch user." });
//   }
// });

// // ===============================
// // UPDATE USER
// // /api/admin/users/:id
// // ===============================
// router.put("/users/:id", async (req, res) => {
//   try {
//     const user = await db.User.findByPk(req.params.id);
//     if (!user)
//       return res.status(404).json({ error: true, message: "User not found" });

//     const payload = { ...req.body };

//     delete payload.id;
//     delete payload.createdAt;
//     delete payload.updatedAt;

//     // Only hash password IF changed and non-empty
//     if (payload.password && payload.password.trim().length > 0) {
//       payload.password = await bcrypt.hash(payload.password, 10);
//     } else {
//       delete payload.password;
//     }

//     normalizeBooleanFields(payload, [
//       "admin",
//       "developer",
//       "archived",
//       "entrepreneur",
//       "subscribed",
//       "contractor",
//     ]);

//     normalizeJSONFields(payload, [
//       "qrData",
//       "loadDetails",
//       "companyProfile",
//     ]);

//     await user.update(payload);

//     const safeUser = user.toJSON();
//     delete safeUser.password;

//     res.json({
//       error: false,
//       message: "User updated successfully.",
//       data: safeUser,
//     });
//   } catch (err) {
//     console.error("User update error:", err);
//     res.status(500).json({ error: true, message: "Update failed." });
//   }
// });

// // ===============================
// // ARCHIVE USER
// // /api/admin/users/:id/archive
// // ===============================
// router.put("/users/:id/archive", async (req, res) => {
//   try {
//     const user = await db.User.findByPk(req.params.id);
//     if (!user)
//       return res.status(404).json({ error: true, message: "User not found" });

//     await user.update({ archived: true });

//     res.json({ error: false, message: "User archived." });
//   } catch (err) {
//     console.error("Archive error:", err);
//     res.status(500).json({ error: true, message: "Archive failed." });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ===============================
// UTILITY FUNCTIONS
// ===============================

// Convert "true"/"false" strings into booleans
function normalizeBooleanFields(payload, fields) {
  fields.forEach((f) => {
    if (payload[f] === "true") payload[f] = true;
    if (payload[f] === "false") payload[f] = false;
  });
}

// Auto-parse JSON fields if possible
function normalizeJSONFields(payload, fields) {
  fields.forEach((f) => {
    if (payload[f] && typeof payload[f] === "string") {
      try {
        payload[f] = JSON.parse(payload[f]);
      } catch {
        // leave as string if parsing fails
      }
    }
  });
}

// Remove sensitive info from admin/user objects
function sanitizeUser(user) {
  const safeUser = user.toJSON();
  delete safeUser.password;
  return safeUser;
}

// ===============================
// ADMIN ROUTES
// ===============================

// Create new admin
router.post("/", async (req, res) => {
  try {
    const newAdmin = await db.Admin.create(req.body);
    res.json({ error: false, data: sanitizeUser(newAdmin) });
  } catch (err) {
    console.error("Admin creation error:", err);
    res.status(500).json({ error: true, message: "Unable to create admin." });
  }
});

// Get all admins
router.get("/allAdmins", async (req, res) => {
  try {
    const allAdmins = await db.Admin.findAll();
    res.json({ error: false, data: allAdmins.map(sanitizeUser) });
  } catch (err) {
    console.error("Fetch admins error:", err);
    res.status(500).json({ error: true, message: "Unable to fetch admins." });
  }
});

// Admin login
router.post("/adminLogin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .json({ error: true, message: "Email and password are required." });
  }

  try {
    const foundAdmin = await db.Admin.findOne({ where: { email } });
    if (!foundAdmin) {
      return res.status(401).json({ error: true, message: "Admin not found." });
    }

    const passwordMatch = await bcrypt.compare(password, foundAdmin.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: foundAdmin.id, email: foundAdmin.email },
      process.env.SECRET,
      { expiresIn: "7d" }
    );

    res.json({ error: false, data: { token, admin: sanitizeUser(foundAdmin) } });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ error: true, message: "Login failed." });
  }
});

// Admin signup
router.post("/adminSignUp", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: true, message: "Missing fields." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await db.Admin.create({ email, password: hashedPassword });

    const token = jwt.sign(
      { id: newAdmin.id, email: newAdmin.email },
      process.env.SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      error: false,
      message: "Successfully signed up.",
      data: { token, admin: sanitizeUser(newAdmin) },
    });
  } catch (err) {
    console.error("Admin signup error:", err);
    res.status(500).json({ error: true, message: "Unable to sign up." });
  }
});

// ===============================
// USER MANAGEMENT ROUTES
// ===============================

// GET all users
router.get("/users", async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json({ error: false, data: users.map(sanitizeUser) });
  } catch (err) {
    console.error("User fetch error:", err);
    res.status(500).json({ error: true, message: "Unable to fetch users." });
  }
});

// GET user by ID
router.get("/users/:id", async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user)
      return res.status(404).json({ error: true, message: "User not found." });

    res.json({ error: false, data: sanitizeUser(user) });
  } catch (err) {
    console.error("User fetch error:", err);
    res.status(500).json({ error: true, message: "Unable to fetch user." });
  }
});

// UPDATE user
router.put("/users/:id", async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user)
      return res.status(404).json({ error: true, message: "User not found." });

    const payload = { ...req.body };
    delete payload.id;
    delete payload.createdAt;
    delete payload.updatedAt;

    if (payload.password && payload.password.trim()) {
      payload.password = await bcrypt.hash(payload.password, 10);
    } else {
      delete payload.password;
    }

    normalizeBooleanFields(payload, [
      "admin",
      "developer",
      "archived",
      "entrepreneur",
      "subscribed",
      "contractor",
    ]);
    normalizeJSONFields(payload, ["qrData", "loadDetails", "companyProfile"]);

    await user.update(payload);

    res.json({
      error: false,
      message: "User updated successfully.",
      data: sanitizeUser(user),
    });
  } catch (err) {
    console.error("User update error:", err);
    res.status(500).json({ error: true, message: "Update failed." });
  }
});

// ARCHIVE user
router.put("/users/:id/archive", async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user)
      return res.status(404).json({ error: true, message: "User not found." });

    await user.update({ archived: true });

    res.json({ error: false, message: "User archived successfully." });
  } catch (err) {
    console.error("Archive error:", err);
    res.status(500).json({ error: true, message: "Archive failed." });
  }
});

module.exports = router;

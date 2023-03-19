const express = require('express');
const router = express.Router();
const Set = require('../../models/set');
const User = require('../../models/user');
const bcrypt = require("bcrypt");
const Figure = require('../../models/figure')


// test
router.get('/test', async(req, res) => {
  res.send({ message: "Hallo. This is test" });
});
//get all users------------------------------------------------------------------------------
router.get('/users', async (req, res) => {
  const allUsers = await User.find();
  console.log(allUsers);
  res.send(allUsers);
});

// post one user - register
router.post('/adduser', async (req, res) => {
  const existingUsername = await User.findOne({nickname: req.body.nickname});
  const existingEmail = await User.findOne({email: req.body.email});
  //if the nickname or/and email exist, you can't use this nickname or/and email
  if (!existingUsername && !existingEmail) {
    bcrypt.hash(req.body.password, 10).then(
      async (hash) => {
        const newUser = new User({
          // nickname: req.body.nickname,
          password: hash,
          email: req.body.email,
          firstname: req.body.firstname,
          lastname: req.body.lastname
        })
        await newUser.save();
        res.send(newUser);
      }).catch(err => res.status(400).json({error: 'user not created'}))
  } else {
    res.status(400).json({error: 'nickname and/or email exist(s)'});
  }
});

router.post('/login', async(req, res) => {
  const existingUser = await User.findOne( {email: req.body.email});
  if(existingUser) {
    bcrypt.compare(req.body.password, existingUser.password).then((result) => {
      if(result) {
        res.status(201).json({ message: 'logged in' });
      } else {
        res.status(204).send(); // wrong password
      }
    })
      .catch( (err) => res.status(400).json({ error: 'something went wrong' })) // never happens
  } else {
    res.status(400).json({ error: 'username does not exist' });
  }
});



// get one user via name
// router.get('/users/:nickname', async (req, res) => {
//   try {
//     const oneUser = await User.findOne({nickname: req.params.nickname});
//     console.log(req.params);
//     res.send(oneUser);
//   } catch {
//     res.status(404);
//     res.send({
//       error: "User does not exist!"
//     });
//   }
// });

// get one user via id   -------------------------------------------------------
router.get('/users/:id', async (req, res) => {
  const userId = await User.findOne({_id: req.params.id});
  console.log(req.params);
  if (userId) {
    res.send(userId);
  } else {
    res.status(404);
    res.send({
      error: "User does not exist!"
    });
  }
});

// delete one user via id
router.delete('/users/:id', async (req, res) => {
  try {
    await User.deleteOne({_id: req.params.id})
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({error: "User does not exist!"})
  }
});

// update one user
router.put('/users/:id', async (req, res) => {
  try {
    const userUpd = await User.findOne({_id: req.params.id})

    if (req.body.firstname) {
      userUpd.firstname = req.body.firstname
    }

    if (req.body.lastname) {
      userUpd.lastname = req.body.lastname
    }

    if (req.body.password) {
      userUpd.password = req.body.password
    }

    if (req.body.email) {
      userUpd.email = req.body.email
    }

    if (req.body.nickname) {
      userUpd.nickname = req.body.nickname
    }

    await User.updateOne({_id: req.params.id}, userUpd);
    res.send(userUpd)
  } catch {
    res.status(404)
    res.send({error: "User does not exist!"})
  }
});

// get all Sets-----------------------------------------------------------------------------------------
router.get('/allsets', async(req, res) => {
  const allSets = await Set.find();
  res.send(allSets);
});

// post Set
router.post('/set', async(req, res) => {
  const postset = new Set({
    name: req.body.name,
    articleNumber: req.body.articleNumber,
    purchasePrice: req.body.purchasePrice,
    salePrice: req.body.salePrice,
  })
  await postset.save();
  res.send(postset);
});

// get one set via name
router.get('/sets/:name', async (req, res) => {
  try {
    const oneset = await Set.findOne({name: req.params.name});
    console.log(req.params);
    res.send(oneset);
  } catch {
    res.status(404);
    res.send({
      error: "Set does not exist!"
    });
  }
});

// get one set via id   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.get('/allsets/:id', async (req, res) => {
  const setId = await Set.findOne({_id: req.params.id});
  console.log(req.params);
  if (setId) {
    res.send(setId);
  } else {
    res.status(404);
    res.send({
      error: "Set does not exist!"
    });
  }
})

// delete one set via id
router.delete('/sets/:id', async (req, res) => {
  try {
    await Set.deleteOne({_id: req.params.id})
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({error: "Set does not exist!"})
  }
});

// update one set
router.put('/sets/:id', async (req, res) => {
  try {
    const setUpd = await Set.findOne({_id: req.params.id})

    if (req.body.name) {
      setUpd.name = req.body.name
    }

    if (req.body.articleNumber) {
      setUpd.articleNumber = req.body.articleNumber
    }

    if (req.body.purchasePrice) {
      setUpd.purchasePrice = req.body.purchasePrice
    }

    if (req.body.salePrice) {
      setUpd.salePrice = req.body.salePrice
    }

    await Set.updateOne({_id: req.params.id}, setUpd);
    res.send(setUpd)
  } catch {
    res.status(404)
    res.send({error: "Set does not exist!"})
  }
});

// get all Figures-----------------------------------------------------------------------------------
router.get('/allfigures', async(req, res) => {
  const allFigures = await Figure.find();
  console.log(allFigures);
  res.send(allFigures);
});

// post Figure
router.post('/figure', async(req, res) => {
  const fig = new Figure({
    name: req.body.name,
    topic: req.body.topic,
    articleNumber: req.body.articleNumber,
    purchasePrice: req.body.purchasePrice,
    salePrice: req.body.salePrice,
  })
  await fig.save();
  res.send(fig);
});

// get one figure via name
router.get('/figures/:name', async (req, res) => {
  try {
    const oneFigure = await Figure.findOne({name: req.params.name});
    console.log(req.params);
    res.send(oneFigure);
  } catch {
    res.status(404);
    res.send({
      error: "Figure does not exist!"
    });
  }
});

router.get('/allfigures/:id', async (req, res) => {
  const figureId = await Figure.findOne({_id: req.params.id});
  console.log(req.params);
  if (figureId) {
    res.send(figureId);
  } else {
    res.status(404);
    res.send({
      error: "Figure does not exist!"
    });
  }
})

// delete one figure via id
router.delete('/figures/:id', async (req, res) => {
  try {
    await Figure.deleteOne({_id: req.params.id})
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({error: "Figure does not exist!"})
  }
});

// update one figure
router.put('/figures/:id', async (req, res) => {
  try {
    const figureUpd = await Figure.findOne({_id: req.params.id})

    if (req.body.name) {
      figureUpd.name = req.body.name
    }

    if (req.body.articleNumber) {
      figureUpd.articleNumber = req.body.articleNumber
    }

    if (req.body.purchasePrice) {
      figureUpd.purchasePrice = req.body.purchasePrice
    }

    if (req.body.salePrice) {
      figureUpd.salePrice = req.body.salePrice
    }

    await Figure.updateOne({_id: req.params.id}, figureUpd);
    res.send(figureUpd)
  } catch {
    res.status(404)
    res.send({error: "Figure does not exist!"})
  }
});

module.exports = router;

const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// Code supplied by Gary for dealing with query strings
router.use(function(req, res, next){
  Object.assign(res.locals,{
    postData: (req.body ? req.body : false)
  });

  Object.assign(res.locals,{
    getData: (req.query ? req.query : false)
  });

  next();
});

// Branching on the status updates screen

// Session stuff for dynamic 'back links'

// Code from Steven for dealing with variables on list page

router.get('/va/applications-duplicate-ninos', (req, res, next) => {
  if (req.query.origin) {
    req.session.origin = req.query.origin
  };
  res.render('va/applications-duplicate-ninos.html', {origin: req.session.origin});
});

router.get('/va/applications-cancelled', (req, res, next) => {
  if (req.query.origin) {
    req.session.origin = req.query.origin
  };
  res.render('va/applications-cancelled.html', {origin: req.session.origin});
});

router.get('/va/applicant', (req, res, next) => {
  if (req.query.origin) {
    req.session.origin = req.query.origin
  };
  res.render('va/applicant.html', {origin: req.session.origin});
});

// This code works with the code in server.js - Middleware making the origin property accessible to every template (working with Steven)

// End session stuff for dynamic 'back links'


// v2 ROUTING

router.post('/v2/search-entry', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let search = req.session.data['search']

  // fred
  if (search === 'QQ 12 34 56 C' || search === 'QQ123456C') {
    res.redirect('applicant?nino=QQ123456C&status=unverified')
  // lex
  } else if (search === 'QQ 00 11 22 A' || search === 'QQ001122A') {
    res.redirect('applicant?nino=QQ001122A&status=unverified')
  // lois
  } else if (search === 'QQ 11 11 22 B' || search === 'QQ111122B') {
    res.redirect('applicant?nino=QQ111122B&status=unverified')
  // clark
  } else if (search === 'QQ 11 22 33 A' || search === 'QQ112233A') {
    res.redirect('applicant?nino=QQ112233A&status=unverified&sr=true')
  // not found
  } else if (search === 'QQ 12 34 56 Z' || search ==='QQ123456Z') {
    res.redirect('search-not-found?nino=QQ123456Z')
  } else if (search === 'QQ 12 12 12 A' || search ==='QQ121212A') {
    res.redirect('search-not-found?nino=QQ121212A')
  // barney
  } else if (search === 'QQ 11 11 11 Z' || search ==='QQ111111Z') {
    res.redirect('applicant?nino=QQ111111Z&status=unverified')
  // daffy
  } else if (search === 'QQ 22 22 33 V' || search ==='QQ222233V') {
    res.redirect('applicant?nino=QQ222233V&status=verified')
  // sponge bob
  } else if (search === 'QQ 11 22 33 M' || search ==='QQ112233M') {
    res.redirect('applicant?nino=QQ112233M&status=failedtoattend')
  // multiple-results
  } else if (search === 'MM 00 11 22 A' || search ==='MM001122A') {
    res.redirect('search-multiple-results')
  // multiple-results
  } else if (search === 'QQ 11 22 33 Z' || search ==='QQ112233Z') {
    res.redirect('applicant?nino=QQ112233Z&status=unverified')
  // Scrooge
  } else if (search === 'QQ 11 11 22 G' || search ==='QQ111122G') {
    res.redirect('applicant?nino=QQ111122G&status=failedtoattend')
  } else {
    res.redirect('back')
  }
})

router.post('/v2/status-changing', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let status = req.session.data['status']

  let nino = req.session.data['nino']

  if (status === 'failed-to-attend') {
    res.redirect(`status-confirmation?nino=${nino}&status=failedtoattend`)
  } else if (status === 'verified') {
    res.redirect(`pdf?nino=${nino}&status=unverified`)
  } else {
    res.redirect('error')
  }
})

// v3 ROUTING

router.post('/v3/status-changing', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let status = req.session.data['status']

  let nino = req.session.data['nino']

  if (status === 'failed-to-attend') {
    res.redirect(`status-confirmation?nino=${nino}&status=failedtoattend`)
  } else if (status === 'verified') {
    res.redirect(`pdf?nino=${nino}&status=unverified`)
  } else {
    res.redirect('error')
  }
})

// v4 ROUTING

router.post('/v4/search-entry', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let search = req.session.data['search']

  // fred
  if (search === 'QQ 12 34 56 C' || search === 'QQ123456C') {
    res.redirect('applicant?nino=QQ123456C&status=unverified')
  // lex
  } else if (search === 'QQ 00 11 22 A' || search === 'QQ001122A') {
    res.redirect('applicant?nino=QQ001122A&status=unverified')
  // lois
  } else if (search === 'QQ 11 11 22 B' || search === 'QQ111122B') {
    res.redirect('applicant?nino=QQ111122B&status=unverified')
  // clark
  } else if (search === 'QQ 11 22 33 A' || search === 'QQ112233A') {
    res.redirect('applicant?nino=QQ112233A&status=unverified&sr=true')
  // not found
  } else if (search === 'QQ 12 34 56 Z' || search ==='QQ123456Z') {
    res.redirect('search-not-found?nino=QQ123456Z')
  } else if (search === 'QQ 12 12 12 A' || search ==='QQ121212A') {
    res.redirect('search-not-found?nino=QQ121212A')
  // barney
  } else if (search === 'QQ 11 11 11 Z' || search ==='QQ111111Z') {
    res.redirect('applicant?nino=QQ111111Z&status=unverified')
  // daffy
  } else if (search === 'QQ 22 22 33 V' || search ==='QQ222233V') {
    res.redirect('applicant?nino=QQ222233V&status=verified')
  // sponge bob
  } else if (search === 'QQ 11 22 33 M' || search ==='QQ112233M') {
    res.redirect('applicant?nino=QQ112233M&status=failedtoattend')
  // multiple-results
  } else if (search === 'MM 00 11 22 A' || search ==='MM001122A') {
    res.redirect('search-multiple-results')
  // multiple-results
  } else if (search === 'QQ 11 22 33 Z' || search ==='QQ112233Z') {
    res.redirect('applicant?nino=QQ112233Z&status=unverified')
  // Scrooge
  } else if (search === 'QQ 11 11 22 G' || search ==='QQ111122G') {
    res.redirect('applicant?nino=QQ111122G&status=failedtoattend')
  } else {
    res.redirect('back')
  }
})

router.post('/v4/status-changing', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let status = req.session.data['status']

  let nino = req.session.data['nino']

  if (status === 'failed-to-attend') {
    res.redirect(`status-confirmation?nino=${nino}&status=failedtoattend`)
  } else if (status === 'verified') {
    res.redirect(`pdf?nino=${nino}&status=unverified`)
  } else {
    res.redirect('error')
  }
})

// v5 ROUTING

router.post('/v5/search-entry', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let search = req.session.data['search']

  // fred
  if (search === 'QQ 12 34 56 C' || search === 'QQ123456C') {
    res.redirect('applicant?nino=QQ123456C&status=unverified')
  // lex
  } else if (search === 'QQ 00 11 22 A' || search === 'QQ001122A') {
    res.redirect('applicant?nino=QQ001122A&status=unverified')
  // lois
  } else if (search === 'QQ 11 11 22 B' || search === 'QQ111122B') {
    res.redirect('applicant?nino=QQ111122B&status=unverified')
  // clark
  } else if (search === 'QQ 11 22 33 A' || search === 'QQ112233A') {
    res.redirect('applicant?nino=QQ112233A&status=unverified&sr=true')
  // not found
  } else if (search === 'QQ 12 34 56 Z' || search ==='QQ123456Z') {
    res.redirect('search-not-found?nino=QQ123456Z')
  } else if (search === 'QQ 12 12 12 A' || search ==='QQ121212A') {
    res.redirect('search-not-found?nino=QQ121212A')
  // barney
  } else if (search === 'QQ 11 11 11 Z' || search ==='QQ111111Z') {
    res.redirect('applicant?nino=QQ111111Z&status=unverified')
  // daffy
  } else if (search === 'QQ 22 22 33 V' || search ==='QQ222233V') {
    res.redirect('applicant?nino=QQ222233V&status=verified')
  // sponge bob
  } else if (search === 'QQ 11 22 33 M' || search ==='QQ112233M') {
    res.redirect('applicant?nino=QQ112233M&status=failedtoattend')
  // multiple-results
  } else if (search === 'QQ 01 01 01 A' || search ==='QQ010101A') {
    res.redirect('search-multiple-results')
  // multiple-results
  } else if (search === 'QQ 11 22 33 Z' || search ==='QQ112233Z') {
    res.redirect('applicant?nino=QQ112233Z&status=unverified')
  // Scrooge
  } else if (search === 'QQ 11 11 22 G' || search ==='QQ111122G') {
    res.redirect('applicant?nino=QQ111122G&status=failedtoattend')
  } else {
    res.redirect('back')
  }
})

router.post('/v5/status-changing', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let status = req.session.data['status']

  let nino = req.session.data['nino']

  if (status === 'cancelled') {
    res.redirect(`cancelled-reason?nino=${nino}&status=${status}`)
  } else if (status === 'verified') {
    res.redirect(`status-confirmation?status=verified&nino=${nino}`)
  } else if (status === 'fta') {
    res.redirect(`status-confirmation?status=fta&nino=${nino}`)
  } else {
    res.redirect('error')
  }
})

router.post('/v5/cancelled-logic', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let reason = req.session.data['reason']

  let nino = req.session.data['nino']

  if (reason === 'nocontact') {
    res.redirect(`letter?nino=${nino}&status=unverified`)
  } else {
    res.redirect(`status-confirmation?nino=${nino}&status=cancelled`)
  }
})


// wcv1 ROUTING


router.get('/wcv1/home', function (req, res) {
  req.session.destroy()
  res.render('wcv1/home')
})


router.post('/wcv1/search-entry', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let search = req.session.data['search']
  let part2 = req.session.data['part2']

  // Barney Rubble
  if (search === 'QQ 11 11 11 Z' || search === 'QQ111111Z' || search === 'barney rubble' || search === 'Barney Rubble' || search === 'barney' || search === 'Barney' || search === 'rubble' || search === 'Rubble'){
    res.redirect('claimant?nino=QQ111111Z&status=appointmentbooked&ssp1=true&fitnotes=true&pension=true')
  // Clark Kent
  } else if (search === 'QQ 11 22 33 A' || search === 'QQ112233A' || search === 'clark kent' || search === 'Clark Kent' || search === 'clark' || search === 'Clark' || search === 'kent' || search === 'Kent') {
    res.redirect('claimant?nino=QQ112233A&status=appointmentbooked&sr=true&ssp1=true&fitnotes=true')
  // Buzz Lightyear
  } else if (search === 'QQ000011A' || search === 'QQ000011A' || search === 'buzz lightyear' || search === 'Buzz Lightyear' || search === 'buzz' || search === 'Buzz' || search === 'lightyear' || search === 'Lightyear') {
    res.redirect('claimant?nino=QQ000011A&status=appointmentbooked&sr=true&ssp1=true&fitnotes=true')
  // Lois Lane
  } else if (search === 'QQ 11 11 22 B' || search === 'QQ111122B' || search === 'lois lane' || search === 'Lois Lane' || search === 'lois' || search === 'Lois' || search === 'lane' || search === 'Lane') {
    res.redirect('claimant?nino=QQ111122B&status=appointmentbooked&fitnotes=true&pension=true')
  // Micky Mouse
  } else if (search === 'QQ 11 22 33 Z' || search ==='QQ112233Z' || search === 'micky mouse' || search === 'Micky Mouse' || search === 'micky' || search === 'Micky' || search === 'mouse' || search === 'Mouse') {
    if (part2 === 'QQ112233Z') {
      res.redirect('claimant?nino=QQ112233Z&status=newappointmentneeded&ssp1=true&fitnotes=true&pension=true')
    } else {
      res.redirect('claimant?nino=QQ112233Z&status=appointmentbooked&ssp1=true&fitnotes=true&pension=true')
    }
  // Marge Simpson
  } else if (search === 'QQ 23 12 34 Z' || search ==='QQ231234Z' || search === 'marge simpson' || search === 'Marge Simpson' || search === 'marge' || search === 'Marge' || search === 'simpson' || search === 'Simpson') {
    if (part2 === 'QQ231234Z') {
      res.redirect('claimant?nino=QQ231234Z&status=newappointmentneeded&ssp1=true&fitnotes=true&pension=true')
      } else {
      res.redirect('claimant?nino=QQ231234Z&status=appointmentbooked&ssp1=true&fitnotes=true&pension=true')
    }
  // Lex Luther
  } else if (search === 'QQ 00 11 22 A' || search ==='QQ001122A' || search === 'lex luther' || search === 'Lex Luther' || search === 'lex' || search === 'Lex' || search === 'luther' || search === 'Luther') {
    if (part2 === 'QQ001122A') {
      res.redirect('claimant?nino=QQ001122A&status=verified&ssp1=true&fitnotes=true')
      } else {
      res.redirect('claimant?nino=QQ001122A&status=appointmentbooked&ssp1=true&fitnotes=true')
    }
  // Fred Flintstone
  } else if (search === 'QQ 11 22 33 B' || search ==='QQ112233B' || search === 'fred flintstone' || search === 'Fred Flintstone' || search === 'fred' || search === 'Fred' || search === 'flintstone' || search === 'Flintstone') {
    res.redirect('claimant?nino=QQ112233B&status=appointmentbooked&ssp1=true')
  // Homer Simpson
  } else if (search === 'QQ 11 22 33 C' || search ==='QQ112233C' || search === 'homer simpson' || search === 'Homer Simpson' || search === 'homer' || search === 'Homer' || search === 'simpson' || search === 'Simpson') {
    res.redirect('claimant?nino=QQ112233C&status=appointmentbooked&ssp1=true&ssp1=true&fitnotes=true&pension=true')
  // Minnie Mouse
  } else if (search === 'QQ 01 01 01 A' || search ==='QQ010101A' || search === 'minnie mouse' || search === 'Minnie Mouse' || search === 'minnie' || search === 'Minnie' || search === 'mouse' || search === 'Mouse') {
    res.redirect(`multiple-results-minnie?nino=QQ010101A&status=appointmentbooked&ssp1=true&ssp1=true&fitnotes=true&searchterm=${search}`)
  } else {
    res.redirect(`search-not-found?searchterm=${search}`)
  }

})

router.post('/wcv1/status-changing', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let status = req.session.data['status']

  let nino = req.session.data['nino']

  if (status === 'verified') {
    res.redirect(`upload?status=unverified&nino=${nino}`)
  } else if (status === 'newappointmentneeded') {
    res.redirect(`status-confirmation?status=newappointmentneeded&nino=${nino}`)
  } else if (status === 'withdrawn') {
    res.redirect(`status-confirmation?status=withdrawn&nino=${nino}`)
  } else if (status === 'appointmentbooked') {
    res.redirect(`status-confirmation?status=appointmentbooked&nino=${nino}`)
  } else {
    res.redirect('error')
  }
})

router.post('/wcv1/upload-logic', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let file1 = req.session.data['file-upload-1']
  let file2 = req.session.data['file-upload-2']
  let file3 = req.session.data['file-upload-3']

  let nino = req.session.data['nino']

  if (file3) {
    // res.redirect(`yabba`)
    res.redirect(`upload?nino=${nino}&file1=true&filename1=${file1}&file2=true&filename2=${file2}&file3=true&filename3=${file3}`)
  } else if (file2) {
    res.redirect(`upload?nino=${nino}&file1=true&filename1=${file1}&file2=true&filename2=${file2}`)
  } else {
    if (file1) {
      res.redirect(`upload?nino=${nino}&file1=true&filename1=${file1}`)
    } else {
      res.redirect(`upload?nino=${nino}&error=true`)
    }
  }
})

// va ROUTING

router.post('/va/search-entry', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let search = req.session.data['search']

  // fred
  if (search === 'QQ 12 34 56 C' || search === 'QQ123456C') {
    res.redirect('applicant?nino=QQ123456C&status=unverified')
  // lex
  } else if (search === 'QQ 00 11 22 A' || search === 'QQ001122A') {
    res.redirect('applicant?nino=QQ001122A&status=unverified')
  // lois
  } else if (search === 'QQ 11 11 22 B' || search === 'QQ111122B') {
    res.redirect('applicant?nino=QQ111122B&status=unverified')
  // clark
  } else if (search === 'QQ 11 22 33 A' || search === 'QQ112233A') {
    res.redirect('applicant?nino=QQ112233A&status=unverified&sr=true')
  // not found
  } else if (search === 'QQ 12 34 56 Z' || search ==='QQ123456Z') {
    res.redirect('search-not-found?nino=QQ123456Z')
  } else if (search === 'QQ 12 12 12 A' || search ==='QQ121212A') {
    res.redirect('search-not-found?nino=QQ121212A')
  // barney
  } else if (search === 'QQ 11 11 11 Z' || search ==='QQ111111Z') {
    res.redirect('applicant?nino=QQ111111Z&status=unverified')
  // daffy
  } else if (search === 'QQ 22 22 33 V' || search ==='QQ222233V') {
    res.redirect('applicant?nino=QQ222233V&status=verified')
  // sponge bob
  } else if (search === 'QQ 11 22 33 M' || search ==='QQ112233M') {
    res.redirect('applicant?nino=QQ112233M&status=failedtoattend')
  // multiple-results
  } else if (search === 'QQ 01 01 01 A' || search ==='QQ010101A') {
    res.redirect('search-multiple-results')
  // multiple-results
  } else if (search === 'QQ 11 22 33 Z' || search ==='QQ112233Z') {
    res.redirect('applicant?nino=QQ112233Z&status=unverified')
  // Scrooge
  } else if (search === 'QQ 11 11 22 G' || search ==='QQ111122G') {
    res.redirect('applicant?nino=QQ111122G&status=failedtoattend')
  } else {
    res.redirect('back')
  }
})

router.post('/va/status-changing', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let status = req.session.data['status']

  let nino = req.session.data['nino']

  if (status === 'cancelled') {
    res.redirect(`cancelled-reason?nino=${nino}&status=unverified`)
  } else if (status === 'verified') {
    res.redirect(`pdf?nino=${nino}&status=unverified`)
  } else {
    res.redirect('error')
  }
})

router.post('/va/cancelled-logic', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let reason = req.session.data['reason']

  let nino = req.session.data['nino']

  if (reason === 'nocontact') {
    res.redirect(`letter?nino=${nino}&status=unverified`)
  } else {
    res.redirect(`status-confirmation?nino=${nino}&status=cancelled`)
  }
})

router.post('/iteration-1/status-changing', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let status = req.session.data['status']

  let nino = req.session.data['nino']

  if (status === 'failed-to-attend') {
    res.redirect(`status-confirmation?nino=${nino}&status=failedtoattend`)
  } else if (status === 'verified') {
    res.redirect(`pdf?nino=${nino}&status=unverified`)
  } else {
    res.redirect('error')
  }
})




// end branching

module.exports = router
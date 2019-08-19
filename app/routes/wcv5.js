module.exports = function (app) {

  // Code supplied by Gary for dealing with query strings

  app.use(function(req, res, next){
    Object.assign(res.locals,{
      postData: (req.body ? req.body : false)
    });

    Object.assign(res.locals,{
      getData: (req.query ? req.query : false)
    });

    next();
  });

  // WORK COACH V2

  // Destroy the session after coming back to the home screen
  
  app.get('/wcv5/home', function (req, res) {
    req.session.destroy()
    res.render('wcv5/home')
  })

  // SEARCH

  app.post('/wcv5/search-entry', function (req, res) {
    // Get the answer from session data
    // The name between the quotes is the same as the 'name' attribute on the input elements
    // However in JavaScript we can't use hyphens in variable names

    let search = req.session.data['search']
    let part2 = req.session.data['part2']

    // Barney Rubble
    if (search === 'QQ 11 11 11 Z' || search === 'QQ111111Z' || search === 'barney rubble' || search === 'Barney Rubble' || search === 'barney' || search === 'Barney' || search === 'rubble' || search === 'Rubble'){
      if (part2 === 'QQ111111Z') {
        res.redirect('claimant?nino=QQ111111Z&status=verified&ssp1=true&fitnotes=true&pension=true')
      } else {
        res.redirect('claimant?nino=QQ111111Z&status=appointmentbooked&ssp1=true&fitnotes=true&pension=true')
      }
    // Clark Kent
    } else if (search === 'QQ 11 22 33 A' || search === 'QQ112233A' || search === 'clark kent' || search === 'Clark Kent' || search === 'clark' || search === 'Clark' || search === 'kent' || search === 'Kent') {
      res.redirect('claimant?nino=QQ112233A&status=withdrawn&ssp1=true&fitnotes=true')
    // Buzz Lightyear
    } else if (search === 'QQ000011A' || search === 'QQ000011A' || search === 'buzz lightyear' || search === 'Buzz Lightyear' || search === 'buzz' || search === 'Buzz' || search === 'lightyear' || search === 'Lightyear') {
      res.redirect('claimant?nino=QQ000011A&status=appointmentbooked&sr=true&ssp1=true&fitnotes=true')
    // Lois Lane
    } else if (search === 'QQ 11 11 22 B' || search === 'QQ111122B' || search === 'lois lane' || search === 'Lois Lane' || search === 'lois' || search === 'Lois' || search === 'lane' || search === 'Lane') {
      res.redirect('claimant?nino=QQ111122B&status=verified&fitnotes=true&pension=true')
    // Micky Mouse
    } else if (search === 'QQ 11 22 33 Z' || search ==='QQ112233Z' || search === 'micky mouse' || search === 'Micky Mouse' || search === 'micky' || search === 'Micky' || search === 'mouse' || search === 'Mouse') {
      if (part2 === 'QQ112233Z') {
        res.redirect('claimant?nino=QQ112233Z&status=newappointmentbooked&ssp1=true&fitnotes=true')
      } else {
        res.redirect('claimant?nino=QQ112233Z&status=appointmentbooked&ssp1=true&fitnotes=true')
      }
    // Marge Simpson
    } else if (search === 'QQ 23 12 34 Z' || search ==='QQ231234Z' || search === 'marge simpson' || search === 'Marge Simpson' || search === 'marge' || search === 'Marge' || search === 'simpson' || search === 'Simpson') {
      res.redirect('claimant?nino=QQ231234Z&status=unverified&reason=cc&ssp1=true&fitnotes=true')
    // Lex Luther
    } else if (search === 'QQ 00 11 22 A' || search ==='QQ001122A' || search === 'lex luther' || search === 'Lex Luther' || search === 'lex' || search === 'Lex' || search === 'luther' || search === 'Luther') {
      if (part2 === 'QQ001122A') {
        res.redirect('claimant?nino=QQ001122A&status=verified&ssp1=true&fitnotes=true')
        } else {
        res.redirect('claimant?nino=QQ001122A&status=appointmentbooked&ssp1=true&fitnotes=true')
      }
    // Fred Flintstone
    } else if (search === 'QQ 11 22 33 B' || search ==='QQ112233B' || search === 'fred flintstone' || search === 'Fred Flintstone' || search === 'fred' || search === 'Fred' || search === 'flintstone' || search === 'Flintstone') {
      res.redirect('claimant?nino=QQ112233B&status=fta&ssp1=true')

    // Homer Simpson
    } else if (search === 'QQ 11 22 33 C' || search ==='QQ112233C' || search === 'homer simpson' || search === 'Homer Simpson' || search === 'homer' || search === 'Homer' || search === 'simpson' || search === 'Simpson') {
      res.redirect(`multiple-results-homer?nino=QQ112233C&status=appointmentbooked&ssp1=true&ssp1=true&fitnotes=true&pension=true&searchterm=${search}`)
    // Minnie Mouse
    } else if (search === 'QQ 01 01 01 A' || search ==='QQ010101A' || search === 'minnie mouse' || search === 'Minnie Mouse' || search === 'minnie' || search === 'Minnie' || search === 'mouse' || search === 'Mouse') {
      if (part2 === 'QQ010101A') {
        res.redirect('claimant?nino=QQ010101A&status=verified&ssp1=true&fitnotes=true')
        } else {
        res.redirect('claimant?nino=QQ010101A&status=appointmentbooked&ssp1=true&fitnotes=true')
      }
    } else if (search === '') {
      res.redirect(`home?error=empty`)
    } else {
      res.redirect(`search-not-found?searchterm=${search}`)
    }

  })

  // STATUS QUESTIONS

  // Has the claimant attended their appointment?
  app.post('/wcv5/q-attended-logic', function (req, res) {

    let question = req.session.data['question']
    let nino = req.session.data['nino']
    let status = req.session.data['status']

    if (question === 'yes') {
      res.redirect(`q-appointment-checklist?status=${status}&nino=${nino}`)
    } else if (question === 'no') {
      res.redirect(`q-arranged-another?=${status}&nino=${nino}`)
    } else {
      res.redirect('error')
    }

  })

  // Appointment checklist
  app.post('/wcv5/q-appointment-checklist-logic', function (req, res) {

    let question = req.session.data['question']
    let nino = req.session.data['nino']
    let status = req.session.data['status']

    if (question) {
      if (question.includes('identity') && question.includes('commitment') && question.includes('evidence')) {
        res.redirect(`q-upload?status=${status}&nino=${nino}`)
      } else if (question.includes('identity') && question.includes('commitment')) {
        res.redirect(`status-confirmation?status=verified&nino=${nino}`)
      } else if (question.includes('identity')) {
        res.redirect(`q-no-commitment-reason?status=${status}&nino=${nino}`)
      } else if (question.includes('commitment')) {
        res.redirect(`q-book-another?status=${status}&nino=${nino}&justcommitment=true`)
      } else {
        res.redirect(`q-book-another?status=${status}&nino=${nino}`)
      }
    } else {
      res.redirect(`q-book-another?status=${status}&nino=${nino}`)
    }

    

  })

  // Upload logic
  app.post('/wcv5/q-upload-logic', function (req, res) {
    // Get the answer from session data
    // The name between the quotes is the same as the 'name' attribute on the input elements
    // However in JavaScript we can't use hyphens in variable names

    let file1 = req.session.data['file-upload-1']
    let file2 = req.session.data['file-upload-2']
    let file3 = req.session.data['file-upload-3']

    let nino = req.session.data['nino']
    let early = req.session.data['early']
    let status = req.session.data['status']

    if (file3) {
      res.redirect(`q-upload?nino=${nino}&file1=true&filename1=${file1}&file2=true&filename2=${file2}&file3=true&filename3=${file3}&early=${early}&status=${status}`)
    } else if (file2) {
      res.redirect(`q-upload?nino=${nino}&file1=true&filename1=${file1}&file2=true&filename2=${file2}&early=${early}&status=${status}`)
    } else {
      if (file1) {
        res.redirect(`q-upload?nino=${nino}&file1=true&filename1=${file1}&early=${early}&status=${status}`)
      } else {
        res.redirect(`q-upload?nino=${nino}&error=true&early=${early}&status=${status}`)
      }
    }
  })

  // No claimant commitment reason
  app.post('/wcv5/q-no-commitment-reason-logic', function (req, res) {

    let question = req.session.data['question']
    let nino = req.session.data['nino']
    let status = req.session.data['status']

    if (question === 'more-time') {
      res.redirect(`q-book-another?status=${status}&nino=${nino}&justidentity=true`)
    } else if (question === 'not-wanted') {
      res.redirect(`status-confirmation?status=unverified&nino=${nino}`)
    } else {
      res.redirect('error')
    }

  })

  // Book another appointment (to follow)
  app.post('/wcv5/q-book-another-logic', function (req, res) {

    let question = req.session.data['question']
    let nino = req.session.data['nino']
    let status = req.session.data['status']

    if (question === 'yes') {
      res.redirect(`status-confirmation?status=appointmentbooked&nino=${nino}`)
    } else if (question === 'no-someone-else') {
      res.redirect(`status-confirmation?status=newappointmentneeded&nino=${nino}`)
    } else if (question === 'no-not-needed') {
      res.redirect(`status-confirmation?status=unverified&nino=${nino}`)
    }
    else {
      res.redirect('error')
    }

  })

  // Have they arranged another appointment?
  app.post('/wcv5/q-arranged-another-logic', function (req, res) {

    let question = req.session.data['question']
    let nino = req.session.data['nino']
    let status = req.session.data['status']

    if (question === 'yes') {
      res.redirect(`status-confirmation?status=appointmentbooked&nino=${nino}`)
    } else if (question === 'no') {
      res.redirect(`status-confirmation?status=fta&nino=${nino}`)
    } else if (question === 'dont-know') {
      res.redirect(`status-confirmation?status=fta&nino=${nino}`)
    } else {
      res.redirect('error')
    }

  })

  // WITHDRAWN

  app.post('/wcv5/withdrawn-confirmation-logic', function (req, res) {

    let withdraw = req.session.data['withdraw']
    let nino = req.session.data['nino']
    let early = req.session.data['early']

    if (withdraw === 'yes') {
      res.redirect(`status-confirmation?status=withdrawn&nino=${nino}&early=${early}`)
    } else if (withdraw === 'no') {
      res.redirect(`claimant-overview?status=appointmentbooked&nino=${nino}`)
    } else {
      res.redirect('error')
    }
  })

  // END OF WORK COACH V2

}
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

router.post('/v1/search-entry', function (req, res) {
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
    res.redirect('search-not-found')
  // barney
  } else if (search === 'QQ 11 11 11 Z' || search ==='QQ111111Z') {
    res.redirect('applicant?nino=QQ111111Z&status=unverified')
  // daffy
  } else if (search === 'QQ 22 22 33 V' || search ==='QQ222233V') {
    res.redirect('applicant?nino=QQ222233V&status=verified')
  // multiple-results
  } else if (search === 'QQ 01 01 01 A' || search ==='QQ010101A') {
    res.redirect('search-multiple-results')
  } else {
    res.redirect('back')
  }
})



router.post('/v1/status-changing', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let status = req.session.data['status']

  if (status === 'unverified') {
    res.redirect('status-confirmation?unverified=true')
  } else if (status === 'failed-to-attend') {
    res.redirect('status-confirmation?failedtoattend=true')
  } else if (status === 'verified') {
    res.redirect('pdf')
  } else if (status === 'ready-to-be-processed') {
    res.redirect('status-confirmation?readytobeprocessed=true')
  } else if (status === 'processed') {
    res.redirect('status-confirmation?processed=true')
  } else {
    res.redirect('error')
  }
})



// end branching





module.exports = router




// {% if getData.verified %}
//         <h3 class="govuk-heading-m" id="claim-actions-title">Verified</h3>
//         <a href="status?verified=true" class="govuk-button">Update claim status</a>
//       {% elif getData.processed %}
//         <h3 class="govuk-heading-m" id="claim-actions-title">Processed</h3>
//         <a href="status?processed=true" class="govuk-button">Update claim status</a>
//       {% elif getData.failedtoattend %}
//         <h3 class="govuk-heading-m" id="claim-actions-title">Failed to attend</h3>
//         <a href="status?failedtoattend=true" class="govuk-button">Update claim status</a>
//       {% elif getData.readytobeprocessed %}
//         <h3 class="govuk-heading-m" id="claim-actions-title">Ready to be processed</h3>
//         <a href="status?readytobeprocessed=true" class="govuk-button">Update claim status</a>
//       {% else %}
//         <h3 class="govuk-heading-m" id="claim-actions-title">Unverified</h3>
//         <a href="status?unverified=true" class="govuk-button">Update claim status</a>
//       {% endif %}
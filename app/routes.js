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
router.post('/reference/status-changing', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let status = req.session.data['status']

  if (status === 'unverified') {
    res.redirect('status-confirmation?unverified=true')
  } else if (status === 'failed-to-attend') {
    res.redirect('status-confirmation?failedtoattend=true')
  } else if (status === 'verified') {
    res.redirect('status-confirmation?verified=true')
  } else if (status === 'ready-to-be-processed') {
    res.redirect('status-confirmation?ready-to-be-processed=true')
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
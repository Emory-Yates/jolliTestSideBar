/*jshint asi: true, laxbreak: true, laxcomma: true */

(function () {
  setTimeout(function () {
    var a = document.getElementById('avatar')

    a.style.opacity = 0.3;
    setTimeout(function () {
      var a = document.getElementById('avatar')

      a.style.opacity = 1
      a.style.color = '#496e9c'
    }, 2000);
  }, 3000)

  setTimeout(function () {
  var a = document.getElementById('avatar'),
    btn = a.children[0],
    bar = a.children[1]

  console.log(a.children)


  //  Opens the avatar helper...
  btn.onclick = function () {
      a.classList.add('avatar--extended')
      bar.classList.add('avatar-bar--visible')
      bar.children[1].focus();
    }
    //  ...and this closes it.
  bar.children[2].onclick = function () {
      a.classList.remove('avatar--extended')
      bar.classList.remove('avatar-bar--visible')
    }
    //  "ENTER" key up event
  bar.children[1].onkeyup = function (e) {
    //  "ESC" key up event:  Closes the avatar if open.
    if (e.keyCode === 27) {
      a.classList.remove('avatar--extended')
      bar.classList.remove('avatar-bar--visible')
    }

    if (e.keyCode === 13) {
      var input = bar.children[1].value.toLowerCase(),
        which = matches(input)

      console.log('input: ' + input)
        // if we recognize the input
        // TODO: write this

      switch (which) {
      case 'register':
        window.location.href = '/join'
        break;
      case 'events':
        window.location.href = '/calendar'
        break;
      case 'courses':
        window.location.href = '/courses'
        break;
      case 'faq':
        window.location.href = '/faqs'
        break;
      case 'about':
        window.location.href = '/about'
        break;
      case 'newsletter':
        window.location.href = '/newsletter'
        break;
      case 'calendar':
        window.location.href = '/calendar'
        break;
      case 'donate':
        window.location.href = '/donate'
        break;
      case 'contact':
        window.location.href = '/contact'
        break;
      case 'writingourlives':
        window.location.href = '/writingourlives'
        break;
      default:
        bar.children[0].innerHTML = 'I didn\'t get that.';
        bar.children[1].style.outline = '#f00';
        bar.children[1].value = '';
        break;
      }
    }
  }

  var matches = function (i) {

    // # Strategy:
    // Remove unhelpful text. (whitespace, 'help me')
    // Determine all topics that i matches.
    // Pick the one most likely to be desired.
    // OR, if the options are few,
    // Show the user their options.
    // If the chosen topic needs more information,
    //   (e.g. an event or course),
    //   see if there is anything identifying in i.
    //   If not, display the general page for the topic.
    //   Otherwise, display the specific content.

    // # Keywords
    var register = [
        'register', 'join', 'member', 'members', 'joins', 'joining', 'become'
      ],
      events = [
        'event', 'events'
      ],
      courses = [
        'course', 'courses', 'class', 'classes', 'lecture', 'lectures'
      ],
      eventsOrCourses = [
        'when', 'where'
      ],
      faq = [
        'faq', 'what', 'how', 'much', 'question', 'questions', 'ask'
      ],
      garbage = [
        'help', 'me', 'my', 'the'
      ],
      about = [
        'about', 'information', 'informations', 'info', 'infoes', 'infos'
      ],
      newsletter = [
        'newsletter', 'newletters', 'news', 'update', 'updates'
      ],
      calendar = [
       'calendar', 'event', 'events', 'meeting', 'meetings', 'appointment', 'appointments', 'time', 'date', 'schedule', 'place', 'location', 'locations', 'located', 'at'
      ],
      donate = [
        'donate', 'give', 'donation', 'donations', 'giving', 'money', 'funds', 'fund', 'support', 'cash' 
      ],
      contact = [
        'contact', 'info', 'contacts', 'people', 'email', 'emails', 'facebook', 'twitter', 'phone', 'number', 'phonenumber'
      ],
      writingourlives = [
        'file', 'files', 'download', 'downloads', 'paper', 'papers', 'write', 'writing', 'document', 'documents'
      ],
      input

    // # Weights
    , REGISTER_WEIGHT = 2, EVENTS_WEIGHT = 4, COURSES_WEIGHT = 3, EVENTS_OR_COURSES_WEIGHT = 5, FAQ_WEIGHT = 1, ABOUT_WEIGHT = 3, NEWSLETTER_WEIGHT = 2, CALENDAR_WEIGHT = 4, DONATE_WEIGHT = 3, CONTACT_WEIGHT = 3, WRITINGOURLIVES_WEIGHT = 3

    // # Point counts
    , registerPoints = 0, eventsPoints = 0, coursesPoints = 0, faqPoints = 0, aboutPoints = 0, newsletterPoints = 0, calendarPoints = 0, donatePoints = 0, contactPoints = 0, writingourlivesPoints = 0

    for (var g in garbage) {
      if (i.indexOf(g) !== -1) {
        i = i.replace(g, '')
      }
    }

    input = i.split(' ')
    console.log('input: ' + input)

    for (var r in register) {
      if (input.indexOf(register[r]) !== -1) {
        registerPoints += REGISTER_WEIGHT
      }
    }

    for (var e in events) {
      if (input.indexOf(events[e]) !== -1) {
        eventsPoints += EVENTS_WEIGHT
      }
    }

    for (var c in courses) {
      if (input.indexOf(courses[c]) !== -1) {
        coursesPoints += COURSES_WEIGHT
      }
    }

    for (var eorc in eventsOrCourses) {
      if (input.indexOf(eventsOrCourses[eorc]) !== -1) {
        eventsPoints += EVENTS_OR_COURSES_WEIGHT
        coursesPoints += EVENTS_OR_COURSES_WEIGHT
      }
    }

    for (var f in faq) {
      if (input.indexOf(faq[f]) !== -1) {
        faqPoints += FAQ_WEIGHT
      }
    }

    for (var f in about) {
      if (input.indexOf(about[f]) !== -1) {
        aboutPoints += ABOUT_WEIGHT
      }
    }

    for (var f in newsletter) {
      if (input.indexOf(newsletter[f]) !== -1) {
        newsletterPoints += NEWSLETTER_WEIGHT
      }
    }

    for (var f in calendar) {
      if (input.indexOf(calendar[f]) !== -1) {
        calendarPoints += CALENDAR_WEIGHT
      }
    }

    for (var f in donate) {
      if (input.indexOf(donate[f]) !== -1) {
        donatePoints += DONATE_WEIGHT
      }
    }

    for (var f in contact) {
      if (input.indexOf(contact[f]) !== -1) {
        contactPoints += CONTACT_WEIGHT
      }
    }

    for (var f in writingourlives) {
      if (input.indexOf(writingourlives[f]) !== -1) {
        writingourlivesPoints += WRITINGOURLIVES_WEIGHT
      }
    }


    console.log('registerPoints: ' + registerPoints)
    console.log('eventsPoints: ' + eventsPoints)
    console.log('coursesPoints: ' + coursesPoints)
    console.log('faqPoints: ' + faqPoints)
    console.log('aboutPoints: ' + aboutPoints)
    console.log('newsletterPoints: ' + newsletterPoints)
    console.log('calendarPoints: ' + calendarPoints)
    console.log('donatePoints: ' + donatePoints)
    console.log('contactPoints: ' + contactPoints)
    console.log('writingourlivesPoints: ' + writingourlivesPoints)

    var isZero = false;
    if (registerPoints == 0 && eventsPoints == 0 && coursesPoints == 0 && faqPoints == 0 && aboutPoints == 0 && newsletterPoints == 0 && calendarPoints == 0 && donatePoints == 0 && contactPoints == 0 && writingourlivesPoints == 0)
    {
      isZero = true;
    }


    if (isZero) {
        return 'unknown'
    }
    else {
        switch (Math.max(
        registerPoints, eventsPoints, coursesPoints, faqPoints, aboutPoints, newsletterPoints, calendarPoints, donatePoints, contactPoints, writingourlivesPoints
      )) {

            case registerPoints:
                return 'register'

            case eventsPoints:
                return 'events'

            case coursesPoints:
                return 'courses'

            case faqPoints:
                return 'faq'

            case aboutPoints:
                return 'about'

            case newsletterPoints:
                return 'newsletter'

            case calendarPoints:
                return 'calendar'

            case donatePoints:
                return 'donate'

            case contactPoints:
                return 'contact'

            case writingourlivesPoints:
                return 'writingourlives'

            default:
                return 'unknown'
        }
    }


    return false
  }
  });
})()

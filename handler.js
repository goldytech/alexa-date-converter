import Alexa from 'alexa-sdk'
import Messages from './src/Messages'
import getHijriFromGregorian from './src/api'
import R from 'ramda'
export const islamicCalendar = (event, context, callback) => {
  const alexa = Alexa.handler(event, context)
  alexa.appId = 'amzn1.ask.skill.82116f51-611b-4507-9b71-32b34b9af659'
  alexa.registerHandlers(handlers)
  alexa.execute()
}

const handlers = {
  'LaunchRequest': function () {
    this.response
    .speak(Messages.WELCOME)
    .listen(Messages.HELP)
    this.emit(':responseReady')
  },
  'GregorianToHijri': async function () {
    try {
      const dateSlotValue = this.event.request.intent.slots && this.event.request.intent.slots.gDate.value
      console.log(`The date slot value ${dateSlotValue}`)
      const calendar = new Date(dateSlotValue)
      console.log(`The slot value after converting to date and getting getdate and converting to string ${calendar.toDateString()}`)
     // callDirectiveService(this.event)
      const hijriDate = await getHijriFromGregorian(`${calendar.getDate()}-${calendar.getMonth() + 1}-${calendar.getFullYear()}`)
      if (hijriDate) {
        console.log(hijriDate)
        let speechOutput = `<p> For ${calendar.toDateString()}, Hijri date is ${hijriDate.hijriDay} of ${hijriDate.hijriMonth} ${hijriDate.hijriYear} </p>The weekday is ${hijriDate.day}.`
        console.log(speechOutput)
        this.response.speak(speechOutput)
        this.emit(':responseReady')
      } else {
        this.response.speak('Unable to process')
        this.emit(':responseReady')
      }
    } catch (error) {
      console.log(error)
      this.response.speak(Messages.CONNECTERROR)
      this.emit(':responseReady')
    }
  },
  'AMAZON.HelpIntent': function () {
    this.response.speak(Messages.HELP).listen(Messages.HELPREPROMPTTEXT)
    this.emit(':responseReady')
  },
  'AMAZON.CancelIntent': function () {
    this.response.speak(Messages.GOODBYE)
    this.emit(':responseReady')
  },
  'AMAZON.StopIntent': function () {
    this.response.speak(Messages.GOODBYE)
    this.emit(':responseReady')
  },
  'SessionEndedRequest': function () {
    var speechOutput = ''
    this.response.speak(speechOutput)
    this.emit(':responseReady')
  }
}
function callDirectiveService (event) {
  // Call Alexa Directive Service.
  const ds = new Alexa.services.DirectiveService()
  const requestId = event.request.requestId
  console.log(`request id is ${requestId}`)
  const endpoint = event.context.System.apiEndpoint
  console.log(`endpoint  is ${endpoint}`)
  const token = event.context.System.apiAccessToken
  console.log(`token  is ${token
  }`)
  const directive = new Alexa.directives.VoicePlayerSpeakDirective(requestId, Messages.DIRECTIVESERVICEMESSAGE)
  ds.enqueue(directive, endpoint, token)
  .catch((err) => {
    console.log(Messages.DIRECTIVEERRORMESSAGE + err)
  })
}
const checkIfHijriDateIsNotNull = (hijriDate) => {
  return R.compose(R.not(), R.isNil(hijriDate))
}

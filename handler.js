import Alexa from 'alexa-sdk'
import Messages from './src/Messages'
export const islamicCalendar = (event, context, callback) => {
  const alexa = Alexa.handler(event, context)
  // alexa.appId = 'amzn1.ask.skill.01b222ea-fb1c-44b1-a3d1-333badf2ca2c'
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
  'GregorianToHijri': function () {
    const dateSlotValue = this.event.request.intent.slots && this.event.request.intent.slots.gDate.value
    const calendar = dateSlotValue && (isNaN(Date.parse(dateSlotValue)) ? new Date() : new Date(dateSlotValue))
    console.log(calendar.getDate().toString())
    this.response.speak(calendar.getDate().toString())
    this.emit(':responseReady')
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
  }
}

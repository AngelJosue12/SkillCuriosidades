/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const GET_FRASES_MSG="Ponga atencion pa' ...";



const languageStrings = {
    en: {
        translation: {
            WELCOME_MESSAGE: 'From the corridones that we bring totally live, and mark it compa tolo... Welcome pa, what do you want to know about the corridos tumbados',
            GET_FRASES_MSG: 'Pay attention pa ... ',
            REPROMPT: '..., you can ask for another fact... or tell me a curious fact... or, if you want to stop me just say, CT until death... then how can I help you old man?',
            REPROMPT_SHORT: 'Do you want to hear another fact?',
            HELP_MESSAGE: 'You can say "tell me about the corridos tumbados" to get a curious fact about corridos tumbados',
            GOODBYE_MESSAGE: 'And just corrido tumbado old man.... Goodbye!',
            FALLBACK_MESSAGE: 'Sorry, I dont know about that. Please try again.',
            DATA : [
            "Corridos tumbados are a subgenre of regional Mexican music that combines elements of traditional corridos with influences from hip-hop and trap.",
            "Natanael Cano is one of the pioneers and main exponents of corridos tumbados.",
            "Unlike traditional corridos, corridos tumbados often include lyrics about urban life, luxury, and youth.",
            "The term 'tumbado' refers to the relaxed and carefree attitude that characterizes both the music and the lifestyle of its performers.",
            "Corridos tumbados have gained popularity not only in Mexico, but also in the United States, especially among Latino youth.",
            "The mixing of genres in corridos tumbados has allowed for a unique fusion of traditional instruments such as the guitar and accordion with electronic beats.",
            "Despite their recent popularity, corridos tumbados have been the subject of controversy due to their lyrics explicit and controversial themes.",
            "Corridos tumbados have created a new aesthetic and culture in fashion, with artists frequently wearing luxury brands and urban clothing."
            ]
        }
    },
    es: {
        translation: {
            WELCOME_MESSAGE: 'De los corridones que traemos totalmente en vivo, y marquele compa tolo... Bienvenido pa, que quieres saber sobre los corridos tumbados',
            GET_FRASES_MSG: 'Ponga atencion pa ... ',
            REPROMPT: '..., puedes pedir otro dato... o dime un dato curioso ... o, si deseas detenerme solo di, CT hasta la muerte ... entonces ¿cómo te puedo ayudar viejo?',
            REPROMPT_SHORT: '¿Quieres escuchar otro dato?',
            HELP_MESSAGE: 'Puedes decir "cuentame sobre los corridos tumbados" para obtener un dato curioso sobre corridos tumbados',
            GOODBYE_MESSAGE: 'Y puro corrido tumbado viejo.... ¡Adiós!',
            FALLBACK_MESSAGE: 'Lo siento, no sé sobre eso. Por favor, inténtalo de nuevo.',
            DATA : [
            "Los corridos tumbados son un subgénero de la música regional mexicana que combina elementos de los corridos tradicionales con influencias del hip-hop y el trap.",
            "Natanael Cano es uno de los pioneros y principales exponentes de los corridos tumbados.",
            "A diferencia de los corridos tradicionales, los corridos tumbados a menudo incluyen letras sobre la vida urbana, el lujo y la juventud.",
            "El término 'tumbado' se refiere a la actitud relajada y despreocupada que caracteriza tanto la música como el estilo de vida de sus intérpretes.",
            "Los corridos tumbados han ganado popularidad no solo en México, sino también en Estados Unidos, especialmente entre la juventud latina.",
            "La mezcla de géneros en los corridos tumbados ha permitido una fusión única de instrumentos tradicionales como la guitarra y el acordeón con beats electrónicos.",
            "A pesar de su reciente popularidad, los corridos tumbados han sido objeto de controversia debido a sus letras explícitas y temáticas polémicas.",
            "Los corridos tumbados han creado una nueva estética y cultura en la moda, con artistas frecuentemente vistiendo marcas de lujo y ropa urbana."
            ]
        }
    }
};


const corridoIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'corridoIntent';
    },
    handle(handlerInput) {
      const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        
        // Obtener el array de datos del objeto de traducciones
        const frasesArray = requestAttributes.t('DATA');
        
        const frasesIndice = Math.floor(Math.random() * frasesArray.length);
        const randomFrase = frasesArray[frasesIndice];
        
        const speakOutput = requestAttributes.t('GET_FRASES_MSG') + randomFrase + requestAttributes.t('REPROMPT');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(requestAttributes.t('REPROMPT'))
            .getResponse();
    }
};



const EndSkillIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'EndSkillIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .getResponse();
    }
};





const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
         const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'en',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}
/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        corridoIntentHandler,
        EndSkillIntentHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LocalizationInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
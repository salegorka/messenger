import update from 'react-addons-update'
import { SEND_MESSAGE, START_MESSAGES_LOADING, SUCCESS_MESSAGES_LOADING, ERROR_MESSAGES_LOADING } from '../actions/messages_actions.js'

const initialStore = {
    messages: {},
    isLoading: false
}

export default function messageReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MESSAGE: {
            return update(store, {
                messages: { $merge: { [action.messageId]: {text: action.text, sender: action.sender} } },
            });
        }
        case START_MESSAGES_LOADING: {
            return update(store, {
                isLoading: {$set: true},
            })
        }
        case SUCCESS_MESSAGES_LOADING: {
            let messages = {}
            action.payload.forEach(msg => {
                let { text, sender } = msg
                messages[msg.id] = { text, sender }
            })
            return update(store, {
                messages: {$set: messages},
                isLoading: {$set: false}
            })
        }
        case ERROR_MESSAGES_LOADING: {
            return update(store, {
                isLoading: {$set: false}
            })
        }
        default:
            return store;
    }
}
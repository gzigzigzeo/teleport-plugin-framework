import { HandleEvent } from "./event_handler"

// handleEvent is the event handler plugin entry point. It decodes the request and returns the encoded response.
export function handleEvent(requestData: ArrayBuffer): ArrayBuffer {
    let handler = new HandleEvent(requestData);    
    handler.run()
    return handler.getResponse()
}            

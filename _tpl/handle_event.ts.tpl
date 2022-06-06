import { events, types, google, wrappers } from "./teleport/teleport"
import { OneOf as Event } from "./teleport/events"
import { HandleEventRequest as Request, HandleEventResponse as Response } from "./teleport/plugin"
import { Alert, Severity, alert } from './alert';

export { Event };
export { events, types, google, wrappers };
export { Request, Response };
export { Alert, Severity };

export class HandleEventBase {
    private request:Request
    private response:Response

    constructor(private requestData: ArrayBuffer) {
        this.request = Request.decode(this.requestData)
        this.response = new Response()
        this.response.Event = this.request.Event
    }

    run():void {
        const event = this.request.Event

        this.any(event)

        if (this.response.Event == null) {
            return
        }

        switch(event.type_index) {
{{- range . }}        
            case Event.{{.Const}}:
                this.{{.Method}}(event.{{.Type}} as events.{{.Type}})
                break
{{ end }}
        }
    }

    protected skip():void {
        this.response.Event = new events.OneOf()
    }

    protected fail(message:string):void {
        throw new Error(message)
    }

    protected alert(severity: Severity, message: string, event: bool, metadata: Map<string, string>):void {
        const a = new Alert();

        a.Message = message;
        a.Severity = severity;
        a.Metadata = metadata

        if (event) {
            a.Event = this.response.Event;
        }

        alert(a)
    }

    getResponse():ArrayBuffer {
        return this.response.encode()
    }

    any(event: Event):void {
    }
{{ range . }}
    {{.Method}}(event: events.{{.Type}}):void {
    }
{{ end }}
}

export function handleEvent<T extends HandleEventBase>(requestData: ArrayBuffer): ArrayBuffer {
    let handler = instantiate<T>(requestData);    
    handler.run()
    return handler.getResponse()
}            

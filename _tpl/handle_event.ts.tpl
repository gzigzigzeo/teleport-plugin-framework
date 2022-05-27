import * as events from "./teleport/events"

import { Event, OneOf } from "./teleport/events"
export { Event };
export { events };

import { HandleEventRequest as Request, HandleEventResponse as Response } from "./teleport/plugin"
export { Request, Response };

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
            case OneOf.{{.Const}}:
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
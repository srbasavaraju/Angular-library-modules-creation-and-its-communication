import { Component, NgZone, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { WindowsService } from '../services/window.service';
import { AsyncPipe } from '@angular/common';
import { AuthorizationService } from '../services/authorization.service';

@Component({
    selector: 'sender',
    templateUrl: './sender.component.html'
})
export class SenderComponent implements OnDestroy {
    channel: any;
    message: string;
    broadcastMessage: string;
    messages = [];
    broadCastedMessages = [];

    constructor(private windowService: WindowsService, private zone: NgZone, private cr: ChangeDetectorRef, private auth: AuthorizationService) {
        this.subscribeToChannel();
        this.subscribeToCommunicationChannel();
        this.receiveMessage();
    }

    ngOnDestroy(): void {
        if (this.channel) {
            this.channel.close();
        }
    }

    subscribeToChannel() {
        this.channel = new BroadcastChannel('acs_channel');
    }

    postMessageToChild() {
        this.windowService.broadCastEventToChild('receiver', this.message);
    }

    receiveMessage() {
        this.channel.onmessage = (e: MessageEvent) => {
            console.log(e.data);
            this.broadCastedMessages.push(e.data);
            this.cr.detectChanges();
        }
    }

    launchWindow() {

        const window1 = this.windowService.OpenInNewWindow('receiver', '#/receiver?id=mrn3&name=raj', true);
        const window2 = this.windowService.OpenInNewWindow('receiver1', '#/receiver', true);

        setTimeout(function () {
            window1.location.href = '#/receiver?id=mrn1&name=martin';
            //  window1.location.reload();
        }, 5000);
    }

    subscribeToCommunicationChannel() {
        this.windowService.nativeWindow.CommunicationChannel = (message: any) => {
            this.windowService.nativeWindow.SenderComponentObj.zone.run(() => {
                this.windowService.nativeWindow.SenderComponentObj.componentFn(message);
            }
            );
        };

        this.windowService.nativeWindow.SenderComponentObj = {
            zone: this.zone, componentFn: (message: any) => this.showMessage(message), component: this
        };
    }

    showMessage(message: string) {
        console.log(message);
        this.messages.push(message);
    }

    broadCastMessage() {
        this.channel.postMessage(this.broadcastMessage);
    }
}
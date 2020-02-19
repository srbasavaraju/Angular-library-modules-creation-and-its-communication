import { Component, NgZone, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { WindowsService } from '../services/window.service';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'storage-wrapper';

@Component({
    selector: 'receiver',
    templateUrl: './receiver.component.html'
})
export class ReceiverComponent implements OnDestroy {

    channel: any;
    messages = [];
    message: string;
    broadcastReceivedMessages = [];
    bMessage: string;
    patientRecords: Patient[] = [];
    patient = new Patient();
    accessToken: string;

    constructor(private windowService: WindowsService,
        private zone: NgZone,
        private router: ActivatedRoute,
        private cr: ChangeDetectorRef,
        private localStorageService: LocalStorageService) {
        this.getAccessToken();
        this.subscribeToChannel();
        this.initializeData();

        this.receiveMessage();
        this.subscribeToCommunicationChannel();
        this.readQueryParameters();
    }

    ngOnDestroy(): void {
        if (this.channel) {
            this.channel.close();
        }
    }

    getAccessToken() {
        this.accessToken = this.localStorageService.get('access_token');
    }

    subscribeToChannel() {
        this.channel = new BroadcastChannel('acs_channel');
    }

    postMessage(message: string) {
        this.channel.postMessage(message);
    }

    receiveMessage() {
        this.channel.onmessage = (e: MessageEvent) => {
            console.log(e.data);
            this.broadcastReceivedMessages.push(e.data);
            this.cr.detectChanges();
        }
    }

    subscribeToCommunicationChannel() {
        this.windowService.nativeWindow.CommunicationChannel = (message: any) => {

            this.windowService.nativeWindow.ReceiverComponentObj.zone.run(() => {
                this.windowService.nativeWindow.ReceiverComponentObj.componentFn(message);
            }
            );
        };

        this.windowService.nativeWindow.ReceiverComponentObj = {
            zone: this.zone, componentFn: (message: any) => this.showMessage(message), component: this
        };
    }

    showMessage(message: any) {
        console.log(message);
        this.messages.push(message);
    }

    postMessageToParent() {
        this.windowService.broadCastEventToParent(this.message);
    }

    postMessageToParentThroughBroadCast() {
        this.channel.postMessage(this.bMessage);
    }

    initializeData() {
        this.patientRecords = [
            { Id: 'mrn1', Name: 'patient1', Unit: 'unit1', Institution: 'Mercy Health' },
            { Id: 'mrn2', Name: 'patient2', Unit: 'unit2', Institution: 'Mercy Health' },
            { Id: 'mrn3', Name: 'patient3', Unit: 'unit3', Institution: 'Mercy Health' },
            { Id: 'mrn4', Name: 'patient4', Unit: 'unit4', Institution: 'Mercy Health' },
            { Id: 'mrn5', Name: 'patient5', Unit: 'unit5', Institution: 'Mercy Health' }
        ]
    }

    readQueryParameters() {
        this.router.queryParams.subscribe(params => {
            const patientId = params['id'];
            const patientName = params['name'];
            const index = this.patientRecords.findIndex(patient => patient.Id === patientId);
            this.patient.Id = patientId;
            this.patient.Name = patientName;
            this.patient.Unit = this.patientRecords[index].Unit;
            this.patient.Institution = this.patientRecords[index].Institution;
        });
    }

    signOut() {
        this.channel.postMessage('SignOut');
    }
}

export class Patient {
    Id: string;
    Name: string;
    Institution: string;
    Unit: string;
}
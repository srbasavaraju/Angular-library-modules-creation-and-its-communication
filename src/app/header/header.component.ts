import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { PatientSelectionEventService, Patient } from 'mpl';
import { Subscription } from 'rxjs';
import { WindowsService } from '../services/window.service';
import { Router } from '@angular/router';
import { AppshellStateService } from '../services/appshell-state.service';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userName: string;
  channel: any;
  selectedModule: string;
  moduleList: SelectItem[];
  patientSelectionEventSubscription: Subscription;
  private spvWindow: any;
  userNameChangedSubscription: Subscription;

  constructor(private patientSelectionEventService: PatientSelectionEventService,
    private windowService: WindowsService,
    private appShellStateService: AppshellStateService,
    private notifyService: NotifyService,
    private router: Router) {

    this.subscribeToPatientSelectionEvent();
    this.subscribeToChannel();
    this.receiveMessage();
    this.subscribeUserNameChangeEvent();
  }

  private subscribeToPatientSelectionEvent() {
    this.patientSelectionEventService.paitentSelected$.subscribe((patient: Patient) => {
      this.launchSpv(patient);
    });
  }

  ngOnInit() {
    this.moduleList = [
      { label: 'MPL', value: { id: 1, name: '/mpl' } },
      { label: 'SPV', value: { id: 2, name: '/spv' } },
      { label: 'Tour Of Heroes', value: { id: 3, name: '/toh' } },
    ];
  }

  ngOnDestroy(): void {
    if (this.spvWindow) {
      this.spvWindow.close()
    }
    if (this.patientSelectionEventSubscription) {
      this.patientSelectionEventSubscription.unsubscribe();
    }
    if (this.channel) {
      this.channel.close();
    }
    if (this.userNameChangedSubscription) {
      this.userNameChangedSubscription.unsubscribe();
    }
  }

  onModuleSelection(event: any) {
    this.router.navigate([event.value.name]);
  }

  private subscribeUserNameChangeEvent() {
    this.userNameChangedSubscription = this.notifyService.userNameChanged$.subscribe(
      (name: string) => {
        this.userName = this.appShellStateService.userName;
      }
    );
  }

  subscribeToChannel() {
    this.channel = new BroadcastChannel('acs_channel');
  }

  receiveMessage() {
    this.channel.onmessage = (e: MessageEvent) => {
      console.log(e.data);
      if (e.data === 'SignOut') {
        this.spvWindow.close();
      }
    }
  }

  launchSpv(patient: Patient) {
    const url = `#/receiver?id=${patient.id}&name=${patient.name}`;
    if (!this.spvWindow) {
      this.spvWindow = this.windowService.OpenInNewWindow('receiver', url, true);
    } else {
      this.spvWindow.location.href = url;
    }
  }
}

import { Injectable } from '@angular/core';

function _window(): any {
    return window;
}

let _childWindows: Dictionary<string> = {};

function _childs(): any {
    return _childWindows;
}

@Injectable()
export class WindowsService {

    get nativeWindow(): any {
        return _window();
    }

    get childs(): any {
        return _childs();
    }

    OpenInNewWindow(title: string, routerLink: string, isFullscreen = true): any {

        let paramsArr = ['height=' + screen.height, 'width=' + screen.width];

        if (isFullscreen) {
            paramsArr.push('fullscreen=yes');
        }

        let params = paramsArr.join(',');
        let popup = this.nativeWindow.open('about:blank', title, params);

        popup.location = routerLink;
        _childWindows[title] = popup;
        return popup;
    }

    closeChildAllWindows() {
        for (const title in this.childs) {
            if (title) {
                this.closeWindow(title);
            }
        }
        _childWindows = {};
    }

    closeWindow(title: string) {
        if (this.childs[title]) {
            this.childs[title].close();
        }
    }

    // send data to childs
    broadCastEventToChild(windowName: string, data: any) {
        if (this.childs[windowName]) {
            this.childs[windowName].CommunicationChannel(data);
        }
    }

    // send data to parent
    broadCastEventToParent(data: any) {
        if (this.nativeWindow.opener) {
            this.nativeWindow.opener.CommunicationChannel(data);
        }
    }
}

interface Dictionary<T> {
    [K: string]: T;
}

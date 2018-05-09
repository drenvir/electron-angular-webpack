import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import * as SerialPort from "serialport";
import * as fs from "fs";

@Component({
    selector: 'demo-app',
    templateUrl: require('./app.component.html'),
    styleUrls: [require('./app.component.scss')]
})
export class AppComponent implements OnInit {

    electronService: ElectronService = new ElectronService();
    ports: Array<String> = [];
    data: String = '';

    ngOnInit(): void {
        SerialPort.list()
            .then((ports) => {
                this.ports = ports
                console.log('PORTS: ', ports)

                var port = new SerialPort('COM2', {
                    baudRate: 9600
                });

                // The open event is always emitted
                port.on('open', () => {
                    // open logic
                    console.log('On open:');        
                    port.write('Hi Mom!\r\n');
                    port.write(Buffer.from('Hi Father!'));            
                });
                  
                /**
                 * Dữ liệu đổ liên tục vào com
                 * Một lần đổ dữ liệu, mình CẦN giới hạn theo thời gian
                 * Hoặc giới hạn theo ký tự đặc biệt trả về, ví dụ: ~\r\n
                 * ~\r\n là mã hiệu kết thúc một khúc dữ liệu đầy đủ.
                 */
                port.on('data', (data) => {
                    this.data = data.toString()
                    fs.appendFileSync('lis-output.txt', this.data)
                    console.log('Data1:', this.data);
                });            
  
            })
            .catch((err) => {
                console.log('ERROR: ', err)
            })
    }

    openFile() {
        var dialog = this.electronService.remote.dialog;
        var mainWindow = this.electronService.remote.getCurrentWindow();
        dialog.showOpenDialog(mainWindow, {properties: ['openFile', 'openDirectory', 'multiSelections']})
    }
}
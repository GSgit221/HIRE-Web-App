import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { XLSXService } from './../../../core/services/xlsx.service';
// import { AngularFirestore } from 'angularfire2/firestore';

@Component({
    selector: 'app-integrations',
    templateUrl: './integrations.component.html',
    styleUrls: ['./integrations.component.scss']
})
export class IntegrationsComponent implements OnInit {
    file: any;
    showMessage = false;
    constructor(public http: HttpClient, private xlsxService: XLSXService) {}

    ngOnInit() {}

    fileChanged(e) {
        this.file = e.target.files[0];
    }

    uploadDocument() {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            const filedata = fileReader.result;
            const workbook = XLSX.read(filedata, { type: 'binary' });
            const wsname = workbook.SheetNames[0];
            const rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
            console.log(rowObject);
            for (let i = rowObject.length - 1; i >= 0; i--) {
                this.xlsxService.create(rowObject[i]).subscribe(
                    (response: any) => {
                        console.log('success');
                    },
                    (err) => {
                        console.error(err);
                    }
                );
            }
        };
        fileReader.readAsBinaryString(this.file);
    }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { XLSXService } from './../../../core/services/xlsx.service';

@Component({
    selector: 'app-integrations',
    templateUrl: './integrations.component.html',
    styleUrls: ['./integrations.component.scss']
})
export class IntegrationsComponent implements OnInit {
    file: any;
    constructor(public http: HttpClient, private xlsxService: XLSXService) {}

    ngOnInit() {}

    fileChanged(e) {
        this.file = e.target.files[0];
    }

    uploadDocument(file) {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            const filedata = fileReader.result;
            const workbook = XLSX.read(filedata, { type: 'binary' });
            const wsname = workbook.SheetNames[0];
            const rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
            console.log(rowObject);
            this.xlsxService.create(rowObject[0]).subscribe(
                (response: any) => {
                    console.log('success');
                },
                (err) => {
                    console.error(err);
                }
            );
        };
        fileReader.readAsBinaryString(this.file);
    }

    // fileChange(event): void {
    // const fileList: FileList = event.target.files;
    // if (fileList.length > 0) {
    //     const file = fileList[0];
    //     const reader = new FileReader();
    //     console.log(reader);
    //     reader.onload = function(){
    //     	const filedata = reader.result;
    //     	var workbook = XLSX.read(filedata,{type:'binary'});
    //     	// workbook.SheetNames.forEach(function(sheetName)){
    //     	console.log(rowObject);
    //     	// }
    //     }

    //    const target: DataTransfer = <DataTransfer>(event.target.files);
    //    const reader: FileReader = new FileReader();
    // reader.onload = function(){
    //   /* read workbook */
    //   const bstr = reader.result;
    //    console.log(bstr);
    //   const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

    //   /* grab first sheet */
    //   const wsname: string = wb.SheetNames[0];
    //   const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    //   /* save data */
    //   var data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
    // const formData = new FormData();
    // formData.append('file', file, file.name);
    // console.log(formData);

    // const headers = new Headers();
    // It is very important le leave the Content-Type empty, if you set it to 'multipart/form-data' it will not work !
    // do not set headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Authorization', 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9');
    // const options = new RequestOptions({headers: headers});

    // this.http.post('https://api.mysite.com/uploadfile', formData, options)
    //      .map(res => res.json())
    //      .catch(error => Observable.throw(error))
    //      .subscribe(
    //          data => console.log('success'),
    //          error => console.log(error)
    //      );
    // }
}

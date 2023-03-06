import { Pipe, PipeTransform } from "@angular/core";
import { DatePipe } from '@angular/common'



@Pipe({
    name: 'displayDate'
})

export class DisplayDate implements PipeTransform {

    constructor(private datepipe: DatePipe){}

    transform(date: Date): string {
        const myDate = this.datepipe.transform(date, 'short');
        return `${myDate}`;
    }
}
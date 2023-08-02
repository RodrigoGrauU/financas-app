import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
export class DateInputFormatterBoostrap implements NgbDateParserFormatter {
  parse(value: string): NgbDateStruct | null {
    const partes = value.split('/');
    if (partes.length === 3) {
      return {
        day: parseInt(partes[0], 10),
        month: parseInt(partes[1], 10),
        year: parseInt(partes[2], 10)
      };
    }
    return null;
  }
  format(date: NgbDateStruct | null): string {
    const dia = date?.day;
    const mes = date?.month;

    if(dia != null && mes != null) {
      let dataFormatada = '';
      dataFormatada += dia < 10 ? '0' : '';
      dataFormatada += dia + '/';

      dataFormatada += mes < 10 ? '0' : '';
      dataFormatada += mes + '/';

      dataFormatada += date?.year;

      return dataFormatada;
    }

    return '';
  }

}

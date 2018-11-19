import { Directive, Input, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
    selector: '[mascara]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: Mascara,
        multi: true
    }]
})
export class Mascara implements ControlValueAccessor {
    onTouched: any;
    onChange: any;

    @Input('mascara') mascara: string;

    writeValue(obj: any): void {

    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {

    }

    @HostListener('keyup', ['$event'])
    onKeyup($event: any) {
        var valor = $event.target.value.replace(/\D/g, '');
        var pad = this.mascara.replace(/\D/g, '').replace(/9/g, '_');
        var valorMascara = valor + pad.substring(0, pad.length - valor.length);

        // retorna caso pressionado backspace
        if ($event.keyCode === 8) {
            this.onChange(valor);
            return;
        }

        if (valor.length <= pad.length) {
            this.onChange(valor);
        }

        var valorMascaraPos = 0;
        valor = '';
        for (var i = 0; i < this.mascara.length; i++) {
            if (isNaN(parseInt(this.mascara.charAt(i)))) {
                valor += this.mascara.charAt(i);
            } else {
                valor += valorMascara[valorMascaraPos++];
            }
        }

        if (valor.indexOf('_') > -1) {
            valor = valor.substr(0, valor.indexOf('_'));
        }

        $event.target.value = valor;
    }

    @HostListener('blur', ['$event'])
    onBlur($event: any) {
        if ($event.target.value.length === this.mascara.length) {
            return;
        }
        this.onChange('');
        $event.target.value = '';
    }
}
import { Directive, Input, HostListener, ElementRef, Renderer } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
    selector: '[mascara]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: MascaraDirective,
        multi: true
    }]
})
export class MascaraDirective implements ControlValueAccessor {
    onTouched: any;
    onChange: any;

    @Input('mascara') mascara: string;
    mascaraParaAplicacao:string;

    constructor(private element:ElementRef, private render:Renderer){}

    writeValue(obj: any): void {
        this.render.setElementAttribute(this.element.nativeElement, 'value', obj);
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
        this.mascaraParaAplicacao = this.mascara;
        var valor = $event.target.value.replace(/\D/g, '');
        if(this.mascaraParaAplicacao.indexOf('?') > - 1){
            var mascaraSemCaracteresEspeciais = this.mascaraParaAplicacao.replace(/\D/g, '');
            if(valor.length < mascaraSemCaracteresEspeciais.length){
                this.mascaraParaAplicacao = this.mascaraParaAplicacao.replace(
                    this.mascaraParaAplicacao.substring(this.mascaraParaAplicacao.indexOf('?') - 1, this.mascaraParaAplicacao.indexOf('?') + 1), '');
            }else{
                this.mascaraParaAplicacao = this.mascaraParaAplicacao.replace('?', '');
            }
        }
        var pad = this.mascaraParaAplicacao.replace(/\D/g, '').replace(/9/g, '_');
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
        for (var i = 0; i < this.mascaraParaAplicacao.length; i++) {
            if (isNaN(parseInt(this.mascaraParaAplicacao.charAt(i)))) {
                valor += this.mascaraParaAplicacao.charAt(i);
            } else {
                valor += valorMascara[valorMascaraPos++];
            }
        }
        if(valor.indexOf('?') > -1){
            valor = valor.substr(0, valor.indexOf('?'));
        }
        if (valor.indexOf('_') > -1) {
            valor = valor.substr(0, valor.indexOf('_'));
        }

        $event.target.value = valor;
    }

    @HostListener('blur', ['$event'])
    onBlur($event: any) {
        if ($event.target.value.length === this.mascaraParaAplicacao.length) {
            return;
        }
        this.onChange('');
        $event.target.value = '';
    }
}
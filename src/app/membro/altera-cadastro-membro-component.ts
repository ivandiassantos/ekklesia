import { OnInit, Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: './altera-cadastro-membro.component.html'
})
export class AlteraCadastroMembroComponent implements OnInit{
    // identificacaoFormGroup:FormGroup;
    constructor(private route:ActivatedRoute){
        console.log(this.route.params);
    }
    ngOnInit() {
       
    }

}
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Membro } from "./model/membro";
import { MembroService } from "./service/membro.service";

@Component({
    templateUrl: './detalha-cadastro-membro.component.html'
})
export class DetalhaCadastroMembroComponent implements OnInit{
    membro:Observable<Membro>;
    constructor(private route:ActivatedRoute, 
        private membroService:MembroService){
    }
    ngOnInit() {
        this.membro = this.membroService.obterPor(this.route.snapshot.params.idMembro);
    }
}
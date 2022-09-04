import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contato } from '../models/contato';
import { ContatoService } from '../services/contato.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  contatos: Contato[];

  //get em contatos
 constructor(private route: Router, private contatoService : ContatoService) {
   this.contatos= this.contatoService.contatos;
 }

 irParaCadastrar(){
   this.route.navigate(["/cadastrar"]);
 }

 irParaDetalhar(contato:Contato){
   //passa o estado do objeto inteiro de contato,
   this.route.navigateByUrl("/detalhar",{state:{objeto:contato}});
 }

}

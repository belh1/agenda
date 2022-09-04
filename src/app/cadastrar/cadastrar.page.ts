import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato } from '../models/contato';
import { ContatoService } from '../services/contato.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  nome: string;
  telefone: number;
  genero: string;
  data_nacimento: string;
  data: string;
  
  constructor(private alertController: AlertController, private router:Router, private contatoService: ContatoService) { }

//metodo chamado toda vez que inicia a pagina
  ngOnInit() {
    this.data = new Date().toISOString();
  }
  //cadastra contatos
  cadastrar(): void{
    this.data_nacimento = this.data_nacimento.split('T')[0];
    if((this.validar(this.nome))&&
     (this.validar(this.telefone)&&
      (this.validar(this.genero)))&&
      (this.validar(this.data_nacimento))){
      let contato= new Contato(this.nome, this.telefone,this.genero, this.data_nacimento);//cria um novo contato
      this.contatoService.inserir(contato);//inserir novo contato
      this.presentAlert("Agenda","Sucesso","Cadastro realizado");//msg de sucesso dps de preencher todos os dados
      this.router.navigate(["/home"]);//volta para home
    }else{
    this.presentAlert("Agenda","Erro","Todos os campos são obrigatorios");
  }
}

  //nao vai acessar em lugar nenhum a nao ser no cadastrar
  private validar(campo: any) : boolean{//se tem valor nesse campo return true
    if(!campo){
      return false;
    }
    return true;
  }
  //vai executar ate que seja exibido a mensagem,(diparar o await)
  //funcao generica 
  async presentAlert(cabecalho : string, subcabecalho: string,mensagem : string) {
    const alert = await this.alertController.create({
      header: cabecalho,
      subHeader: subcabecalho,
      message: mensagem,
      buttons: ['OK'],
    });

    await alert.present();
  }

  irParaHome(){
    this.router.navigate(["/home"]);
  }
  

}

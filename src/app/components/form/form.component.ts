import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  blockUI: boolean = false;

  newUser: boolean = false;

  campus = ["Campus I - Campina Grande", "Campus II - Lagoa Seca", "Campus III - Guarabira", "Campus IV - Catolé do Rocha", "Campus V - João Pessoa", "Campus VI - Monteiro", "Campus VII - Patos", "Campus VIII - Araruna"];

  lvgc = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

  patentes = ["Global", "Supremo", "Águia 2", "Águia 1", "Xerife", "AK Cruzada", "AK 2", "AK 1", "Ouro 4", "Ouro 3", "Ouro 2", "Ouro 1", "Prata"];

  functionCS = ["IGL", "Awper", "Trader", "Entry fragger", "Support"];

  ranksValorant = ["Radiante", "Imortal 3", "Imortal 2", "Imortal 1", "Ascendente 3", "Ascendente 2", "Ascendente 1", "Diamante 3", "Diamante 2", "Diamante 1", "Platina 3", "Platina 2", "Platina 1", "Ouro 3", "Ouro 2", "Ouro 1", "Prata 3", "Prata 2", "Prata 1", "Bronze 3", "Bronze 2", "Bronze 1", "Ferro"];

  elos = ["Desafiante", "Grão-mestre", "Mestre", "Diamante 1", "Diamante 2", "Diamante 3", "Diamante 4", "Platina 1", "Platina 2", "Platina 3", "Platina 4", "Ouro 1", "Ouro 2", "Ouro 3", "Ouro 4", "Prata 1", "Prata 2", "Prata 3", "Prata 4", "Bronze 1", "Bronze 2", "Bronze 3", "Bronze 4", "Ferro"];

  elosWildRift = ["Desafiante", "Grão-mestre", "Mestre", "Diamante 1", "Diamante 2", "Diamante 3", "Diamante 4", "Esmeralda 1", "Esmeralda 2", "Esmeralda 3", "Esmeralda 4", "Platina 1", "Platina 2", "Platina 3", "Platina 4", "Ouro 1", "Ouro 2", "Ouro 3", "Ouro 4", "Prata 1", "Prata 2", "Prata 3", "Prata 4", "Bronze 1", "Bronze 2", "Bronze 3", "Bronze 4", "Ferro"];

  lanes = ["Top", "Jungle", "Mid", "Adc", "Sup"];

  lanesWildRift = ["Solo", "Selva", "Meio", "Duo", "Suporte"]

  classesValorant = ["Controlador", "Duelista", "Iniciador", "Sentinela"];

  id;

  form = {
    id: null,
    name: "",
    birthday: null,
    course: "",
    registration: "",
    campus: "",
    displayName: "",
    games: [
      {
        id: "clashroyale",
        name: "Clash Royale",
        image: "assets/clash.png",
        rankName: "Troféus",
        answers: ["",],
        nick: "",
        active: false
      },
      {
        id: "csgo",
        name: "CS:GO",
        image: "assets/csgo.png",
        rankName: "Level na GamersClub e Patente",
        answers: [],
        nick: "",
        active: false
      },
      {
        id: "fifa",
        name: "FIFA",
        image: "assets/fifa.png",
        rankName: "Rank na Weekend League",
        answers: [],
        nick: "",
        active: false
      },
      {
        id: "freefire",
        name: "Free Fire",
        image: "assets/freefire.png",
        rankName: "Rank",
        answers: [],
        nick: "",
        active: false
      },
      {
        id: "leagueoflegends",
        name: "League of Legends",
        image: "assets/lol.png",
        rankName: "Elo na fila solo e na flex",
        answers: [],
        nick: "",
        active: false
      },
      {
        id: "poker",
        name: "Poker",
        image: "assets/poker.png",
        rankName: "Link do Sharkscope ou outro gráfico de resultados",
        answers: [],
        nick: "",
        active: false
      },
      {
        id: "valorant",
        name: "Valorant",
        image: "assets/valorant.png",
        rankName: "Rank",
        answers: [],
        nick: "",
        active: false
      },
      {
        id: "wildrift",
        name: "Wild Rift",
        image: "assets/wild.png",
        rankName: "Elo",
        answers: [],
        nick: "",
        active: false
      }
    ],
    whatsapp: "",
    instagram: "",
    facebook: "",
    schedules: ""
  }

  getSubscription: Subscription;

  constructor(private authService: AuthService, private restService: RestService) {
    this.id = this.authService.userLoggedIn.uid;
    this.getSubscription = this.restService.get(this.authService.userLoggedIn.uid).subscribe({
      next: (res: any) => {
        if(res) {this.form = res}
      },
      error: (e) => console.log(e),
      complete: () => console.log("complete")
    });
  }

  ngOnInit(): void {
  }

  async submit() {
    this.blockUI = true;
    this.form.id = this.id;

    await this.restService.create(this.form)
    .then((res) => {
      console.log(res);
      this.blockUI = false;
    })
    .catch((e) => {
      console.log(e);
      this.blockUI = false;
    })
  }

  addGame(index: number) {
    console.log(this.form);
    this.form.games[index].active = !this.form.games[index].active;
  }

  ngOnDestroy() {
    this.getSubscription.unsubscribe();
  }

}

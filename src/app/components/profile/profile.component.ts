import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RestService } from '../../services/rest.service';
import { DomSanitizer } from '@angular/platform-browser';
import html2canvas from 'html2canvas';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  logged: boolean = false;

  id: any;

  user: any;

  photoURL: any = "assets/user_default.jpg";

  gamesActive: any[] = [];

  constructor(private authService: AuthService, private restService: RestService, private router: Router, private sanitizer: DomSanitizer) {
    this.restService.get(this.authService.userLoggedIn.uid).subscribe({
      next: async (res: any) => {
        if(res) {
          this.gamesActive = [];
          for(let game of res.games) {
            if(game.active === true) {
              this.gamesActive.push(game.id);
            }
          }
          this.user = res;
        } else {
          this.router.navigate(['edit']);
        }
      },
      error: (e) => console.log(e),
      complete: () => console.log("complete")
    });
  }

  ngOnInit(): void {
    this.getImage()
  }

  async getImage() {
    this.photoURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.authService.userLoggedIn.photoURL);
  }

  // printToFile() {
  //   const card = document.getElementById("card")
  //   if (card) {
  //     htmlToImage.toPng(card).then((res) => {
  //       this.downloadURI(res, 'my-node.png');
  //     })
  //   }
  // }

  // downloadURI(uri: string, name: string) {
  //   let link = document.createElement("a");
  //   link.download = name;
  //   link.href = uri;
  //   link.click();
  // }

}

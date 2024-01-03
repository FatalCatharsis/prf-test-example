import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-prf';

  async testPrf() {
    const firstSalt = new Uint8Array(new Array(32).fill(1)).buffer
    var newCredential = await navigator.credentials.create({
      publicKey: {
          challenge: new Uint8Array([1, 2, 3, 4]),
          rp: {
              name : "test",
              id: "localhost"
          },
          user: {
              id: new Uint8Array([5, 6, 7, 8]),
              name : "Wyatt",
              displayName : "Wyatt"
          },
          pubKeyCredParams: [
              {alg: -7, type : "public-key"},
              {alg : -8, type : "public-key"},
              {alg : -257, type : "public-key"}
          ],
          authenticatorSelection : {
              userVerification: "required",
              authenticatorAttachment :"cross-platform",
          },
          timeout : 60000,
          attestation : "direct",
          extensions :  {
              prf: {
                  eval: {
                      first: firstSalt
                  }
              }
          } as any
      }
    }) as any

    console.log(newCredential!.getClientExtensionResults())
    if (newCredential!.getClientExtensionResults().prf.enabled) {
      alert("prf extension available")
    } else {
      alert("prf extension not available")
    }
  }
}

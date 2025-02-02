import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as CryptoJS from "crypto-js"

@Injectable()
export class CookieGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(request): boolean{
    var ciphertext = CryptoJS.AES.encrypt('my message1324123456132466123451467235712345', 'secret key 123').toString();
    console.log("ciphertext",ciphertext)
    // Decrypt
    var bytes  = CryptoJS.AES.decrypt(request.cookies.token, 'secret key 123');
    console.log("bytes",bytes)
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log("originalText",originalText); // 'my message'
    console.log("request.cookies", request.cookies); // 'my message'

    return request.cookies ? true : false;
  }
}
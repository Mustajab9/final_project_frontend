import { Injectable } from '@angular/core'
import { CanLoad, Router} from '@angular/router'

import { LoginDtoRes } from '../dto/user/login-dto-res'
import { LoginService } from '../service/login.service'

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad{

    constructor(private router: Router, private loginService: LoginService) {}

    canLoad(): boolean {
        const dataLogin: LoginDtoRes | null = this.loginService.getData()

        if(dataLogin?.data.token){
            return true
        }else{
            this.router.navigateByUrl('/login')
            return false
        }
    }
}
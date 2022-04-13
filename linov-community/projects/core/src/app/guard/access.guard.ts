import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router"
import { LoginService } from "../service/login.service"

@Injectable({
    providedIn: 'root'
})
export class AccessGuard implements CanActivate {
    constructor(private router: Router, private loginService: LoginService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const url: string = state.url
        const roleCode: string | undefined = this.loginService.getData()?.data.roleCode

        if(url.startsWith('/admin') && (roleCode == 'R02' || roleCode == 'R03')){
            this.router.navigateByUrl('/member/dashboard')
            return false
        }
        return true
    }
}
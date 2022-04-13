import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router"

@Injectable({
    providedIn: 'root'
})
export class AccessGuard implements CanActivate {

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        console.log(route)
        console.log(state)

        return true
    }
}
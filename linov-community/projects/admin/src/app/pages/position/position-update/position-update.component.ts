import { Component, OnDestroy, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'

import { Subscription } from 'rxjs'
import { Store } from '@ngrx/store'

import { UpdatePositionDtoReq } from '../../../../../../core/src/app/dto/position/update-position-dto-req'
import { updatePositionAction } from '../../../../../../core/src/app/state/position/position.action'
import { positionSelectorById, positionSelectorUpdate } from '../../../../../../core/src/app/state/position/position.selector'

@Component({
  selector: 'app-position-update',
  templateUrl: './position-update.component.html',
  styleUrls: ['./position-update.component.css']
})
export class PositionUpdateComponent implements OnInit, OnDestroy {

  data: UpdatePositionDtoReq = new UpdatePositionDtoReq()

  activatedRouteSubscription?: Subscription
  getByPositionIdSubscription?: Subscription
  updatePositionSubscription?: Subscription

  constructor(private title: Title, private router: Router, private activatedRoute: ActivatedRoute, private store: Store) {
    this.title.setTitle('Update Position')
  }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
      const id = (result as any).id
      this.getByPositionIdSubscription = this.store.select(positionSelectorById(id)).subscribe(result => {
        this.data = { ...result }
      })
    })
  }

  updateProgress(): void {
    this.updatePositionSubscription = this.store.select(positionSelectorUpdate).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/admin/position/list')
      }
    })
  }

  onSubmit(isValid: boolean): void {
    if (isValid) {
      this.store.dispatch(updatePositionAction({ payload: this.data }))
      this.updateProgress()
    }
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe()
    this.getByPositionIdSubscription?.unsubscribe()
    this.updatePositionSubscription?.unsubscribe()
  }
}

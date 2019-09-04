import { LeaveOrderGuard } from './leave.order.guard';
import { NgModule } from "@angular/core";
import { OrderComponent } from "./order.component";
import { OrderItemsComponent } from "./order-items/order-items.component";
import { DeliveryCostsComponent } from "./delivery-costs/delivery-costs.component";
import { SharedModule } from "app/shared/shared.module";
import { Routes, RouterModule } from "@angular/router";

export const ROUTES: Routes = [
    { path: '', component: OrderComponent, canDeactivate: [ LeaveOrderGuard ] }
]

@NgModule({
    declarations:[
        OrderComponent,
        OrderItemsComponent,
        DeliveryCostsComponent
    ],
    imports:[
        SharedModule,
        RouterModule.forChild(ROUTES)
    ]
})
export class OrderModule{

}
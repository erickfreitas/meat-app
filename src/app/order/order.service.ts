import { Injectable } from "@angular/core";
import { ShoppingCartService } from "app/restaurants/restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "app/restaurants/restaurant-detail/shopping-cart/cart-item.model";
import { Order } from "./order.model";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http/";
import { MEAT_API } from "app/app.api";
import 'rxjs/add/operator/map'

@Injectable()
export class OrderService{

    constructor(private cartService: ShoppingCartService, private http: HttpClient) {
            
    }
    itemsValue(): number{
        return this.cartService.total()
    }

    cartItems(): CartItem[]{
        return this.cartService.items
    }

    increaseQty(item: CartItem){
        this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem){
        this.cartService.decreaseQty(item)
    }

    removeItem(item: CartItem){
        this.cartService.removeItem(item)
    }

    checkOrder(order: Order) : Observable<string>{
        //making a POST call and mapping return to json
        return this.http.post<Order>(`${MEAT_API}/orders`, order)
                        .map(order => order.id)
    }

    clear(){
        this.cartService.clear();
    }
}
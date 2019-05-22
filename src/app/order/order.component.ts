import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option-model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurants/restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router'
import { FormGroup, FormBuilder } from '@angular/forms' 

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup

  paymentOptions: RadioOption[] = [
    { label: "Dinheiro", value: "MON"},
    { label: "Cartão de Débito", value: "DEB"},
    { label: "Cartão Refeição", value: "REF"}
  ]
  delivery: number = 8

  constructor(private orderService: OrderService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control(''),
      email: this.formBuilder.control(''),
      emailConfirmation: this.formBuilder.control(''),
      address: this.formBuilder.control(''),
      number: this.formBuilder.control(''),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('')
    })
  }

  itemsValue(): number{
    return this.orderService.itemsValue()
  }

  cartItems(): CartItem[]{
    return this.orderService.cartItems()
  }

  increaseQty(item: CartItem){
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem){
    this.orderService.decreaseQty(item)
  }

  removeItem(item: CartItem){
    this.orderService.removeItem(item)
  }

  checkOrder(order: Order){
    //mapping CartItem to OrderItem
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))

    //Sending order to backend
    this.orderService.checkOrder(order)
      .subscribe((orderId: string) => {
        console.log(`Compra concluída: ${orderId}.`)
        this.router.navigate(['/order-summary'])
        this.orderService.clear()        
      })

    console.log(order)
  }

}

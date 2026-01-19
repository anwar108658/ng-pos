import { Routes } from '@angular/router';
import { Product } from './pages/product/product';
import { PosScreen } from './pages/pos-screen/pos-screen';
import { Dashboard } from './pages/dashboard/dashboard';
import { Coupon } from './pages/coupon/coupon';
import { Customers } from './pages/customers/customers';

export const routes: Routes = [
    {path:"",component:Dashboard},
    {path:"product",component:Product},
    {path:"coupon",component:Coupon},
    {path:"customers",component:Customers},
    {path:"pos_screen",component:PosScreen}
];

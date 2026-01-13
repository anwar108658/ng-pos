import { Routes } from '@angular/router';
import { Product } from './pages/product/product';
import { Gif } from './pages/gif/gif';
import { PosScreen } from './pages/pos-screen/pos-screen';
import { Dashboard } from './pages/dashboard/dashboard';
import { Coupon } from './pages/coupon/coupon';

export const routes: Routes = [
    {path:"",component:Dashboard},
    {path:"product",component:Product},
    {path:"coupon",component:Coupon},
    {path:"gif",component:Gif},
    {path:"pos_screen",component:PosScreen}
];

import { Routes } from '@angular/router';
import { Product } from './pages/product/product';
import { Discount } from './pages/discount/discount';
import { Gif } from './pages/gif/gif';
import { PosScreen } from './pages/pos-screen/pos-screen';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
    {path:"",component:Dashboard},
    {path:"product",component:Product},
    {path:"discount",component:Discount},
    {path:"gif",component:Gif},
    {path:"pos_screen",component:PosScreen}
];

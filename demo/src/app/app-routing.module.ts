import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule) },
  { path: 'cuenta/:id', loadChildren: () => import('./cuenta/cuenta.module').then(m => m.CuentaPageModule) },
  { path: 'favoritos', loadChildren: () => import('./favoritos/favoritos.module').then(m => m.FavoritosPageModule) },
  { path: 'ajustes', loadChildren: () => import('./ajustes/ajustes.module').then(m => m.AjustesPageModule) },
  { path: 'buscar', loadChildren: () => import('./buscar/buscar.module').then(m => m.BuscarPageModule) },
  { path: 'ayuda', loadChildren: () => import('./ayuda/ayuda.module').then(m => m.AyudaPageModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'comprar/:id',
    loadChildren: () => import('./comprar/comprar.module').then(m => m.ComprarPageModule)
  },
  {
    path: 'assesorios',
    loadChildren: () => import('./assesorios/assesorios.module').then(m => m.AssesoriosPageModule)
  },
  {
    path: 'admin/:id',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule)
  },
  {
    path: 'product-add',
    loadChildren: () => import('./producto/product-add/product-add.module').then(m => m.ProductAddPageModule)
  },
  {
    path: 'product-list',
    loadChildren: () => import('./producto/product-list/product-list.module').then(m => m.ProductListPageModule)
  },
  {
    path: 'product-detail/:id',
    loadChildren: () => import('./producto/product-detail/product-detail.module').then(m => m.ProductDetailPageModule)
  },
  {
    path: 'product-edit/:id',
    loadChildren: () => import('./producto/product-edit/product-edit.module').then(m => m.ProductEditPageModule)
  },
  {
    path: 'product-all',
    loadChildren: () => import('./producto/product-all/product-all.module').then(m => m.ProductAllPageModule)
  },
  {
    path: 'user-add',
    loadChildren: () => import('./usuario/user-add/user-add.module').then(m => m.UserAddPageModule)
  },
  {
    path: 'user-list',
    loadChildren: () => import('./usuario/user-list/user-list.module').then(m => m.UserListPageModule)
  },
  {
    path: 'user-detail/:id',
    loadChildren: () => import('./usuario/user-detail/user-detail.module').then(m => m.UserDetailPageModule)
  },
  {
    path: 'user-edit/:id',
    loadChildren: () => import('./usuario/user-edit/user-edit.module').then(m => m.UserEditPageModule)
  },
  {
    path: 'user-all',
    loadChildren: () => import('./usuario/user-all/user-all.module').then(m => m.UserAllPageModule)
  },
  {
    path: 'employee-add',
    loadChildren: () => import('./empleado/employee-add/employee-add.module').then(m => m.EmployeeAddPageModule)
  },
  {
    path: 'employee-list',
    loadChildren: () => import('./empleado/employee-list/employee-list.module').then(m => m.EmployeeListPageModule)
  },
  {
    path: 'employee-detail/:id',
    loadChildren: () => import('./empleado/employee-detail/employee-detail.module').then(m => m.EmployeeDetailPageModule)
  },
  {
    path: 'employee-edit/:id',
    loadChildren: () => import('./empleado/employee-edit/employee-edit.module').then(m => m.EmployeeEditPageModule)
  },
  {
    path: 'employee-all',
    loadChildren: () => import('./empleado/employee-all/employee-all.module').then(m => m.EmployeeAllPageModule)
  },
  {
    path: 'favorite-add/:id',
    loadChildren: () => import('./favorito/favorite-add/favorite-add.module').then(m => m.FavoriteAddPageModule)
  },
  {
    path: 'favorite-list',
    loadChildren: () => import('./favorito/favorite-list/favorite-list.module').then(m => m.FavoriteListPageModule)
  },
  {
    path: 'favorite-detail/:id',
    loadChildren: () => import('./favorito/favorite-detail/favorite-detail.module').then(m => m.FavoriteDetailPageModule)
  },
  {
    path: 'favorite-edit/:id',
    loadChildren: () => import('./favorito/favorite-edit/favorite-edit.module').then(m => m.FavoriteEditPageModule)
  },
  {
    path: 'favorite-all',
    loadChildren: () => import('./favorito/favorite-all/favorite-all.module').then(m => m.FavoriteAllPageModule)
  },
  {
    path: 'session-add',
    loadChildren: () => import('./sesion/session-add/session-add.module').then(m => m.SessionAddPageModule)
  },
  {
    path: 'session-list',
    loadChildren: () => import('./sesion/session-list/session-list.module').then(m => m.SessionListPageModule)
  },
  {
    path: 'session-detail',
    loadChildren: () => import('./sesion/session-detail/session-detail.module').then(m => m.SessionDetailPageModule)
  },
  {
    path: 'session-edit',
    loadChildren: () => import('./sesion/session-edit/session-edit.module').then(m => m.SessionEditPageModule)
  },
  {
    path: 'session-all',
    loadChildren: () => import('./sesion/session-all/session-all.module').then(m => m.SessionAllPageModule)
  },
  {
    path: 'cart-list/:id',
    loadChildren: () => import('./carrito/cart-list/cart-list.module').then(m => m.CartListPageModule)
  },
  {
    path: 'cart-add',
    loadChildren: () => import('./carrito/cart-add/cart-add.module').then(m => m.CartAddPageModule)
  },
  {
    path: 'cart-detail',
    loadChildren: () => import('./carrito/cart-detail/cart-detail.module').then(m => m.CartDetailPageModule)
  },
  {
    path: 'cart-edit',
    loadChildren: () => import('./carrito/cart-edit/cart-edit.module').then(m => m.CartEditPageModule)
  },
  {
    path: 'cart-all',
    loadChildren: () => import('./carrito/cart-all/cart-all.module').then(m => m.CartAllPageModule)
  },
  {
    path: 'metodo-add/:id',
    loadChildren: () => import('./metodoPago/metodo-add/metodo-add.module').then(m => m.MetodoAddPageModule)
  },
  {
    path: 'metodo-list',
    loadChildren: () => import('./metodoPago/metodo-list/metodo-list.module').then(m => m.MetodoListPageModule)
  },
  {
    path: 'metodo-detail',
    loadChildren: () => import('./metodoPago/metodo-detail/metodo-detail.module').then(m => m.MetodoDetailPageModule)
  },
  {
    path: 'metodo-edit',
    loadChildren: () => import('./metodoPago/metodo-edit/metodo-edit.module').then(m => m.MetodoEditPageModule)
  },
  {
    path: 'metodo-all',
    loadChildren: () => import('./metodoPago/metodo-all/metodo-all.module').then(m => m.MetodoAllPageModule)
  },
  {
    path: 'graficoss',
    loadChildren: () => import('./graphics/graficoss/graficoss.module').then(m => m.GraficossPageModule)
  },
  {
    path: 'feedback-add',
    loadChildren: () => import('./feedback/feedback-add/feedback-add.module').then(m => m.FeedbackAddPageModule)
  },
  {
    path: 'feedback-list',
    loadChildren: () => import('./feedback/feedback-list/feedback-list.module').then(m => m.FeedbackListPageModule)
  },
  {
    path: 'feedback-detail',
    loadChildren: () => import('./feedback/feedback-detail/feedback-detail.module').then(m => m.FeedbackDetailPageModule)
  },
  {
    path: 'feedback-edit',
    loadChildren: () => import('./feedback/feedback-edit/feedback-edit.module').then(m => m.FeedbackEditPageModule)
  },
  {
    path: 'feedback-all',
    loadChildren: () => import('./feedback/feedback-all/feedback-all.module').then(m => m.FeedbackAllPageModule)
  },
  {
    path: 'cuenta-admin/:id',
    loadChildren: () => import('./cuenta-admin/cuenta-admin.module').then(m => m.CuentaAdminPageModule)
  },
  {
    path: 'ver-tarjeta/:numeroTarjeta/:id',
    loadChildren: () => import('./ver-tarjeta/ver-tarjeta.module').then(m => m.VerTarjetaPageModule)
  },
  {
    path: 'ropa-mujer',
    loadChildren: () => import('./ropa-mujer/ropa-mujer.module').then(m => m.RopaMujerPageModule)
  },
  {
    path: 'ropa-hombre',
    loadChildren: () => import('./ropa-hombre/ropa-hombre.module').then(m => m.RopaHombrePageModule)
  },
  {
    path: 'zapatillas-hombre',
    loadChildren: () => import('./zapatillas-hombre/zapatillas-hombre.module').then(m => m.ZapatillasHombrePageModule)
  },
  {
    path: 'zapatillas-mujer',
    loadChildren: () => import('./zapatillas-mujer/zapatillas-mujer.module').then(m => m.ZapatillasHombrePageModule)
  },
  {
    path: 'accesorios-hombre',
    loadChildren: () => import('./accesorios-hombre/accesorios-hombre.module').then(m => m.AccesoriosHombrePageModule)
  },
  {
    path: 'accesorios-mujer',
    loadChildren: () => import('./accesorios-mujer/accesorios-mujer.module').then(m => m.AccesoriosMujerPageModule)
  },
  {
    path: 'deportivo-hombre',
    loadChildren: () => import('./deportivo-hombre/deportivo-hombre.module').then(m => m.DeportivoHombrePageModule)
  },
  {
    path: 'deportivo-mujer',
    loadChildren: () => import('./deportivo-mujer/deportivo-mujer.module').then(m => m.DeportivoMujerPageModule)
  },
  {
    path: 'ropa-unisex',
    loadChildren: () => import('./ropa-unisex/ropa-unisex.module').then(m => m.RopaUnisexPageModule)
  },
  {
    path: 'zapatillas-unisex',
    loadChildren: () => import('./zapatillas-unisex/zapatillas-unisex.module').then(m => m.ZapatillasUnisexPageModule)
  },
  {
    path: 'accesorios-unisex',
    loadChildren: () => import('./accesorios-unisex/accesorios-unisex.module').then(m => m.AccesoriosUnisexPageModule)
  },
  {
    path: 'deportivo-unisex',
    loadChildren: () => import('./deportivo-unisex/deportivo-unisex.module').then(m => m.DeportivoUnisexPageModule)
  },
  {
    path: 'ayudas',
    loadChildren: () => import('./ayudas/ayudas-list/ayudas-list.module').then(m => m.AyudasListPageModule)
  },
  {
    path: 'ayudas-add',
    loadChildren: () => import('./ayudas/ayudas-add/ayudas-add.module').then(m => m.AyudasAddPageModule)
  },
  {
    path: 'ayudas-edit/:id',
    loadChildren: () => import('./ayudas/ayudas-edit/ayudas-edit.module').then(m => m.AyudasEditPageModule)
  },
  {
    path: 'ayudas-list',
    loadChildren: () => import('./ayudas/ayudas-list/ayudas-list.module').then( m => m.AyudasListPageModule)
  },
  {
    path: 'sales-list',
    loadChildren: () => import('./ventas/sales-list/sales-list.module').then( m => m.SalesListPageModule)
  },
  {
    path: 'analisis-all',
    loadChildren: () => import('./analisis/analisis-all/analisis-all.module').then( m => m.AnalisisAllPageModule)
  },
  {
    path: 'transbank',
    loadChildren: () => import('./transbank/transbank.module').then( m => m.TransbankPageModule)
  },
  {
    path: 'retornopagar',
    loadChildren: () => import('./retornopagar/retornopagar.module').then( m => m.RetornopagarPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


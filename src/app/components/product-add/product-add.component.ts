import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../common/category';
import { CategoryService } from '../../services/category.service';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-product-add',
  standalone: false,
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit{

  id : number = 0 ;
  code : string = '514351';
  name : string = '';
  capacidad:number = 0;
  tipo:string = "";
  jacuzzi:boolean= false;
  description : string = '';
  price : number = 0;
  urlImage : string = '';
  userId : string = '1';
  categoryId : string = '1';
  selectFile! : File;
  user: number =0;

  categories : Category [] = []

  constructor(private productService : ProductService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private toastr:ToastrService,
    private categoryService:CategoryService,
    private sessionStorage:SessionStorageService) {


    }

  ngOnInit(): void {

    this.getProductById();
    this.getCategories();
    this.user = this.sessionStorage.getItem('token').id;
    this.userId = this.user.toString();

  }

  addProduct() {
    const formData = new FormData();
    formData.append('code', this.code);
    formData.append('name', this.name);
    formData.append('capacidad', this.capacidad.toString());
    formData.append('tipo', this.tipo);

    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    if (this.selectFile) {
      formData.append('image', this.selectFile);
    }
    formData.append('urlImage', this.urlImage);
    formData.append('userId', this.userId);
    formData.append('categoryId', this.categoryId);

    console.log('Contenido del FormData:');
    console.log(formData);
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    if (this.id === 0) {
      this.productService.createProduct(formData).subscribe(
        data => {
          this.toastr.success('Producto registrado correctamente', 'Productos');
          this.redirectToList();
        },
        error => {
          console.error('Error al crear producto', error);
        }
      );
    } else {
      this.productService.updateProduct(this.id, formData).subscribe(
        data => {
          this.toastr.success('Producto actualizado correctamente', 'Productos');
          this.redirectToList();
        },
        error => {
          console.error('Error al actualizar producto', error);
        }
      );
    }
  }

  redirectToList() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['admin/product']);
    });
  }


  getProductById(){
    this.activatedRoute.params.subscribe(
      prod => {
        let id = prod['id'];
        if(id){
          console .log('el valor de la varible id es: '+id);
          this.productService.getProductById(id).subscribe(
            data => {
              this.id = data.id;
              this.code = data.code;
              this.name = data.name;
              this.capacidad = data.capacidad;
              this.tipo = data.tipo;
              this.jacuzzi = data.jacuzzi;
              this.description = data.description;
              this.price = data.price;
              this.urlImage = data.urlImage;
              this.userId = data.userId;
              this.categoryId = data.categoryId;
            }
          );
        }
      }
    );
  }

  onFileSelect(event :  any){
    this.selectFile = event.target.files[0];
  }

  getCategories(){
    return this.categoryService.getCategoryList().subscribe(
      data =>{
        this.categories = data;
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Category } from '../../../common/category';
import { CategoryService } from '../../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-list',
  standalone: false,
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {

  page: number = 1;

  categories:Category [] = [];

  constructor(private categoryService:CategoryService,private toastr:ToastrService){  }

  ngOnInit(): void {
    this.listCategories();
  }

  listCategories(){
    this.categoryService.getCategoryList().subscribe(
      data => this.categories = data
    );
  }

  deleteCategory(id:any){

    Swal.fire({
          title: "estas seguro?",
          text: "estas seguro de querer eliminar este registro?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Eliminar",
          cancelButtonText: "Cancelar"
        }).then((result) => {
          if (result.isConfirmed) {
            this.categoryService.deleteCategoryById(id).subscribe(
              //despues de eliminar se realiza la llamada del metodo listPorduct()
              ()=>this.listCategories()
            );
            Swal.fire({
              title: "Categoria eliminado!",
              text: "tu registro ha sido eliminado.",
              icon: "success"
            });
          }
        });
  }

}

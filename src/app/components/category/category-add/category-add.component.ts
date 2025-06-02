import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../common/category';

@Component({
  selector: 'app-category-add',
  standalone: false,
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.css'
})
export class CategoryAddComponent implements OnInit{

  id:number = 0;
  name:string = '';

  constructor(
    private categoryService:CategoryService,
    private toastr:ToastrService,
    private router:Router,
    private activatedRoute:ActivatedRoute){

  }

  ngOnInit(): void {

    this.getCategoryById();

    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
        this.categoryService.getCategoryById(this.id).subscribe(category => {
          this.name = category.name;
        });
      }
    });
  }

  addCategory() {
    let category = new Category(this.id, this.name);

    if (this.id && this.id !== 0) {
      // Modo edición
      this.categoryService.createCategory(category).subscribe(
        res => {
          this.toastr.success('Categoría actualizada correctamente', 'Categorías');
          this.router.navigate(['admin/category']);
        }
      );
    } else {
      // Modo creación (sin ID o ID = 0)
      let newCategory = new Category(undefined, this.name); // o simplemente no enviar ID
      this.categoryService.createCategory(newCategory).subscribe(
        res => {
          this.toastr.success('Categoría registrada correctamente', 'Categorías');
          this.router.navigate(['admin/category']);
        }
      );
    }
  }

  getCategoryById(){
    this.activatedRoute.params.subscribe(

      category => {
        let id = category['id'];
        if(id){
          console.log('Valor de la variable id: ' + id);
        }
      }

    );
  }



}
